import { Router } from "express";
import type { HealthCheckResponse } from "@nexiora/shared";
import { prisma } from "../config/database.js";
import { successResponse } from "../utils/response.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res, next) => {
  try {
    let databaseStatus: HealthCheckResponse["services"]["database"] = "disconnected";

    try {
      await prisma.$queryRaw`SELECT 1`;
      databaseStatus = "connected";
    } catch {
      databaseStatus = "disconnected";
    }

    const payload: HealthCheckResponse = {
      status: databaseStatus === "connected" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      services: { database: databaseStatus },
    };

    const statusCode = payload.status === "ok" ? 200 : 503;
    res.status(statusCode).json(successResponse(payload));
  } catch (error) {
    next(error);
  }
});
