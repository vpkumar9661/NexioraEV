import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, errorResponse } from "../utils/response.js";

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json(
    errorResponse({
      code: "NOT_FOUND",
      message: "The requested resource was not found",
    }),
  );
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(
      errorResponse({
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      }),
    );
    return;
  }

  if (err instanceof ZodError) {
    const details: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const path = issue.path.join(".") || "body";
      details[path] = [...(details[path] ?? []), issue.message];
    }

    res.status(400).json(
      errorResponse({
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details,
      }),
    );
    return;
  }

  console.error("Unhandled error:", err);

  res.status(500).json(
    errorResponse({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    }),
  );
}
