import { Metadata } from "next";
import { EmiLoanCalculator } from "@/components/calculators/modules";

export const metadata: Metadata = {
  title: "EV Loan EMI & Green Financing Calculator | NexioraEV",
  description:
    "Estimate monthly EV loan installments, total interest charges, Section 80EEB green car tax benefits, and full amortization schedule.",
};

export default function EmiLoanPage() {
  return <EmiLoanCalculator />;
}
