import { z } from "zod";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  USER_ROLES,
  VEHICLE_CATEGORIES,
  VEHICLE_STATUSES,
} from "../constants/index.js";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const vehicleFilterSchema = paginationSchema.extend({
  category: z.enum(VEHICLE_CATEGORIES).optional(),
  status: z.enum(VEHICLE_STATUSES).optional(),
  brand: z.string().trim().min(1).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  search: z.string().trim().min(1).max(100).optional(),
});

export const createVehicleSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  brand: z.string().min(1).max(100).trim(),
  model: z.string().min(1).max(100).trim(),
  category: z.enum(VEHICLE_CATEGORIES),
  price: z.number().positive("Price must be greater than 0"),
  year: z
    .number()
    .int()
    .min(2010)
    .max(new Date().getFullYear() + 1),
  rangeKm: z.number().int().positive().optional(),
  batteryKwh: z.number().positive().optional(),
  description: z.string().max(5000).trim().optional(),
  images: z.array(z.string().url()).max(20).default([]),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type VehicleFilterInput = z.infer<typeof vehicleFilterSchema>;
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;

export { USER_ROLES, VEHICLE_CATEGORIES, VEHICLE_STATUSES };
