import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charging Stations",
};

export default function ChargingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Charging Stations</h1>
      <p className="mt-2 text-muted-foreground">
        Find EV charging stations across India — map integration coming soon.
      </p>
    </div>
  );
}
