import { API_PREFIX } from "@nexiora/shared";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { getCorsOrigins } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { vehicleRouter } from "./routes/vehicle.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin: getCorsOrigins(),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  app.get("/", (_req, res) => {
    res.json({
      name: "Nexiora EV API",
      version: "1.0.0",
      docs: `${API_PREFIX}/health`,
    });
  });

  app.use(`${API_PREFIX}/health`, healthRouter);
  app.use(`${API_PREFIX}/auth`, authRouter);
  app.use(`${API_PREFIX}/vehicles`, vehicleRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
