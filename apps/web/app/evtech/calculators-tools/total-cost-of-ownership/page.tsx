import { Metadata } from "next";
import { TotalCostOfOwnershipCalculator } from "@/components/calculators/modules";

export const metadata: Metadata = {
  title: "Total Cost of Ownership (TCO) Calculator | NexioraEV",
  description:
    "Compare comprehensive lifecycle ownership costs of electric vehicles versus petrol and diesel cars including purchase, fuel, maintenance, and resale.",
};

export default function TotalCostOfOwnershipPage() {
  return <TotalCostOfOwnershipCalculator />;
}
