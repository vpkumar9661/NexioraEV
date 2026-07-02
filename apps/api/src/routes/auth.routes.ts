import { Router } from "express";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "@nexiora/shared/schemas";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(successResponse(result, "Account created successfully"));
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.json(successResponse(result, "Logged in successfully"));
  } catch (error) {
    next(error);
  }
});

authRouter.post("/refresh", validate(refreshTokenSchema), async (req, res, next) => {
  try {
    const result = await refreshAccessToken(req.body.refreshToken);
    res.json(successResponse(result, "Token refreshed successfully"));
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", validate(refreshTokenSchema), async (req, res, next) => {
  try {
    await logoutUser(req.body.refreshToken);
    res.json(successResponse(null, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", authenticate, (req, res) => {
  res.json(successResponse({ user: req.user }));
});
