import { Metadata } from "next";
import { BatteryHealthCalculator } from "@/components/calculators/modules";

export const metadata: Metadata = {
  title: "EV Battery Health & Degradation Calculator | NexioraEV",
  description:
    "Evaluate EV battery State of Health (SOH), degradation projection curves over 10 years, and cell longevity recommendations.",
};

export default function BatteryHealthPage() {
  return <BatteryHealthCalculator />;
}
