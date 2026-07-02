import type { NextFunction, Request, Response } from "express";
import type { AuthUser } from "@nexiora/shared";
import { verifyAccessToken } from "../services/auth.service.js";
import { AppError } from "../utils/response.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new AppError(401, "UNAUTHORIZED", "Authentication required"));
    return;
  }

  const token = header.slice(7);
  req.user = verifyAccessToken(token);
  next();
}

export function authorize(...roles: AuthUser["role"][]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "UNAUTHORIZED", "Authentication required"));
      return;
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      next(new AppError(403, "FORBIDDEN", "Insufficient permissions"));
      return;
    }

    next();
  };
}
