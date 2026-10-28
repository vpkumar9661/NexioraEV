import { Metadata } from "next";
import { RangeEstimatorCalculator } from "@/components/calculators/modules";

export const metadata: Metadata = {
  title: "Interactive EV Range Estimator | NexioraEV",
  description:
    "Predict real-world EV driving range factoring in speed aerodynamics, cabin HVAC climate loads, terrain gradients, and ambient temperatures.",
};

export default function RangeEstimatorPage() {
  return <RangeEstimatorCalculator />;
}
