import type { USER_ROLES, VEHICLE_CATEGORIES, VEHICLE_STATUSES } from "../constants/index.js";

export type UserRole = (typeof USER_ROLES)[number];
export type VehicleCategory = (typeof VEHICLE_CATEGORIES)[number];
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface VehicleSummary {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  status: VehicleStatus;
  price: number;
  year: number;
  rangeKm: number | null;
  batteryKwh: number | null;
  thumbnailUrl: string | null;
  createdAt: string;
}

export interface HealthCheckResponse {
  status: "ok" | "degraded";
  timestamp: string;
  version: string;
  services: {
    database: "connected" | "disconnected";
  };
}
