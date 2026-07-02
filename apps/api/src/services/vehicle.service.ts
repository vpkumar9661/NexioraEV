import type { VehicleSummary } from "@nexiora/shared";
import type { CreateVehicleInput, VehicleFilterInput } from "@nexiora/shared/schemas";
import { prisma } from "../config/database.js";
import { AppError, buildPaginationMeta } from "../utils/response.js";

type VehicleRecord = NonNullable<
  Awaited<ReturnType<typeof prisma.vehicle.findFirst>>
>;

function toVehicleSummary(vehicle: VehicleRecord): VehicleSummary {
  return {
    id: vehicle.id,
    title: vehicle.title,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    status: vehicle.status,
    price: Number(vehicle.price),
    year: vehicle.year,
    rangeKm: vehicle.rangeKm,
    batteryKwh: vehicle.batteryKwh ? Number(vehicle.batteryKwh) : null,
    thumbnailUrl: vehicle.images[0] ?? null,
    createdAt: vehicle.createdAt.toISOString(),
  };
}

export async function listVehicles(filters: VehicleFilterInput) {
  const { page, limit, category, status, brand, minPrice, maxPrice, search } = filters;
  const skip = (page - 1) * limit;

  const where = {
    ...(category ? { category } : {}),
    ...(status ? { status } : { status: "ACTIVE" as const }),
    ...(brand ? { brand: { contains: brand, mode: "insensitive" as const } } : {}),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { brand: { contains: search, mode: "insensitive" as const } },
            { model: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.vehicle.count({ where }),
  ]);

  return {
    items: items.map(toVehicleSummary),
    pagination: buildPaginationMeta(page, limit, total),
  };
}

export async function getVehicleById(id: string): Promise<VehicleSummary> {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) {
    throw new AppError(404, "VEHICLE_NOT_FOUND", "Vehicle not found");
  }

  return toVehicleSummary(vehicle);
}

export async function createVehicle(
  sellerId: string,
  input: CreateVehicleInput,
): Promise<VehicleSummary> {
  const vehicle = await prisma.vehicle.create({
    data: {
      title: input.title,
      brand: input.brand,
      model: input.model,
      category: input.category,
      price: input.price,
      year: input.year,
      rangeKm: input.rangeKm,
      batteryKwh: input.batteryKwh,
      description: input.description,
      images: input.images,
      sellerId,
      status: "ACTIVE",
    },
  });

  return toVehicleSummary(vehicle);
}
