import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators",
};

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">EV Calculators</h1>
      <p className="mt-2 text-muted-foreground">
        TCO, range, and savings calculators — coming in the next module.
      </p>
    </div>
  );
}
