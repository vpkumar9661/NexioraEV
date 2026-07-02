import type { ApiError, ApiResponse } from "@nexiora/shared";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(message ? { message } : {}),
  };
}

export function errorResponse(error: ApiError): ApiResponse {
  return {
    success: false,
    error,
  };
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number,
) {
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
