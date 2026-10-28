import { redirect, notFound } from "next/navigation";
import { getCalculatorBySlug } from "@/config/calculators";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LegacyCalculatorRedirectPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    // Check if it's a known legacy slug alias
    if (slug === "charging") redirect("/evtech/calculators-tools/charging-cost");
    if (slug === "range") redirect("/evtech/calculators-tools/range-estimator");
    if (slug === "battery") redirect("/evtech/calculators-tools/battery-health");
    if (slug === "emi") redirect("/evtech/calculators-tools/emi-loan");
    if (slug === "tco") redirect("/evtech/calculators-tools/total-cost-of-ownership");
    notFound();
  }

  redirect(calc.canonicalHref);
}

