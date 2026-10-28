import { Metadata } from "next";
import { ChargingCostCalculator } from "@/components/calculators/modules";

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator | NexioraEV",
  description:
    "Calculate exact EV charging costs, home tariff savings, and compare running expenses against petrol and diesel alternatives with NexioraEV.",
};

export default function ChargingCostPage() {
  return <ChargingCostCalculator />;
}

