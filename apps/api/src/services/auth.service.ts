import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { AuthResponse, AuthUser, UserRole } from "@nexiora/shared";
import type { LoginInput, RegisterInput } from "@nexiora/shared/schemas";
import { env } from "../config/env.js";
import { prisma } from "../config/database.js";
import { AppError } from "../utils/response.js";

const SALT_ROUNDS = 12;

interface AccessTokenPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
}

function toAuthUser(user: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

function signAccessToken(user: AuthUser): string {
  const payload: AccessTokenPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

function getRefreshTokenExpiry(): Date {
  const match = env.JWT_REFRESH_EXPIRES_IN.match(/^(\d+)([dhms])$/);

  if (!match) {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  const value = Number(match[1]);
  const unit = match[2] ?? "d";

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + value * multipliers[unit]!);
}

async function createRefreshToken(userId: string): Promise<string> {
  const token = jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return token;
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (existingUser) {
    throw new AppError(409, "EMAIL_EXISTS", "An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      passwordHash,
      name: input.name,
    },
  });

  const authUser = toAuthUser(user);
  const accessToken = signAccessToken(authUser);
  const refreshToken = await createRefreshToken(user.id);

  return {
    user: authUser,
    tokens: { accessToken, refreshToken },
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user || !user.isActive) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const authUser = toAuthUser(user);
  const accessToken = signAccessToken(authUser);
  const refreshToken = await createRefreshToken(user.id);

  return {
    user: authUser,
    tokens: { accessToken, refreshToken },
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
  let payload: jwt.JwtPayload;

  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
  } catch {
    throw new AppError(401, "INVALID_REFRESH_TOKEN", "Invalid or expired refresh token");
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (
    !storedToken ||
    storedToken.expiresAt < new Date() ||
    !storedToken.user.isActive ||
    storedToken.userId !== payload.sub
  ) {
    throw new AppError(401, "INVALID_REFRESH_TOKEN", "Invalid or expired refresh token");
  }

  await prisma.refreshToken.delete({ where: { id: storedToken.id } });

  const authUser = toAuthUser(storedToken.user);
  const accessToken = signAccessToken(authUser);
  const newRefreshToken = await createRefreshToken(storedToken.user.id);

  return {
    user: authUser,
    tokens: { accessToken, refreshToken: newRefreshToken },
  };
}

export async function logoutUser(refreshToken: string): Promise<void> {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
}

export function verifyAccessToken(token: string): AuthUser {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    throw new AppError(401, "UNAUTHORIZED", "Invalid or expired access token");
  }
}
