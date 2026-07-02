"use client";

import { useVehicles } from "@/hooks/use-vehicles";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function VehiclesPage() {
  const { data, isLoading, isError, error } = useVehicles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">EV Marketplace</h1>
      <p className="mt-2 text-muted-foreground">
        Browse electric vehicles from verified dealers across India.
      </p>

      {isLoading && (
        <p className="mt-8 text-sm text-muted-foreground" role="status">
          Loading vehicles…
        </p>
      )}

      {isError && (
        <p className="mt-8 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load vehicles"}
        </p>
      )}

      {data && data.items.length === 0 && (
        <p className="mt-8 rounded-lg border border-border bg-muted/30 p-8 text-center text-muted-foreground">
          No vehicles listed yet. Dealers can add listings via the API.
        </p>
      )}

      {data && data.items.length > 0 && (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((vehicle) => (
            <li
              key={vehicle.id}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {vehicle.category.replace(/_/g, " ")}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{vehicle.title}</h2>
              <p className="text-sm text-muted-foreground">
                {vehicle.brand} {vehicle.model} · {vehicle.year}
              </p>
              <p className="mt-4 text-xl font-bold">{formatPrice(vehicle.price)}</p>
              {vehicle.rangeKm && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Range: {vehicle.rangeKm} km
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
