"use client";

import type { PaginatedResponse, VehicleSummary } from "@nexiora/shared";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: () =>
      apiRequest<PaginatedResponse<VehicleSummary>>("/vehicles?page=1&limit=12"),
  });
}
