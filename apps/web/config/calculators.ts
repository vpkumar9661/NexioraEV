export interface CalculatorConfig {
  id: string;
  slug: string;
  canonicalHref: string;
  legacyHrefs: string[];
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: "PlugZap" | "Compass" | "BatteryCharging" | "Calculator" | "CircleDollarSign";
  accentColor: string; // Tailwind hex
  badgeText: string;
}

export const CALCULATORS_CONFIG: CalculatorConfig[] = [
  {
    id: "charging-cost",
    slug: "charging-cost",
    canonicalHref: "/evtech/calculators-tools/charging-cost",
    legacyHrefs: ["/calculators/charging-cost"],
    title: "EV Charging Cost Calculator",
    shortTitle: "Charging Cost",
    tagline: "Calculate direct electricity tariffs, session costs, and fossil fuel savings.",
    description: "Accurately project the cost of charging your EV from home, public AC, or DC fast chargers and compare per-kilometer expenditure with conventional petrol or diesel vehicles.",
    iconName: "PlugZap",
    accentColor: "#00E676",
    badgeText: "Energy & Tariff",
  },
  {
    id: "range-estimator",
    slug: "range-estimator",
    canonicalHref: "/evtech/calculators-tools/range-estimator",
    legacyHrefs: ["/calculators/range", "/calculators/range-estimator"],
    title: "Interactive EV Range Estimator",
    shortTitle: "Range Estimator",
    tagline: "Determine real-world driving range across speed, HVAC, terrain, and temperature.",
    description: "Model dynamic driving ranges considering vehicle aerodynamics, cruising velocity, climate control load, topographical elevation changes, and ambient thermal conditions.",
    iconName: "Compass",
    accentColor: "#00D4FF",
    badgeText: "Range & Physics",
  },
  {
    id: "battery-health",
    slug: "battery-health",
    canonicalHref: "/evtech/calculators-tools/battery-health",
    legacyHrefs: ["/calculators/battery", "/calculators/battery-health"],
    title: "EV Battery Health & Degradation Calculator",
    shortTitle: "Battery Health",
    tagline: "Estimate State of Health (SOH) and explore capacity degradation curves over time.",
    description: "Analyze how calendar aging, full equivalent cycle counts, operating temperatures, and charging behavior affect your EV battery pack's remaining usable capacity.",
    iconName: "BatteryCharging",
    accentColor: "#8B5CF6",
    badgeText: "Battery Lab",
  },
  {
    id: "emi-loan",
    slug: "emi-loan",
    canonicalHref: "/evtech/calculators-tools/emi-loan",
    legacyHrefs: ["/calculators/emi", "/calculators/loan", "/calculators/emi-loan"],
    title: "EV Loan & EMI Calculator",
    shortTitle: "EMI & Loan",
    tagline: "Calculate monthly installments, interest schedules, and Section 80EEB tax benefits.",
    description: "Plan your green vehicle financing with exact monthly EMIs, complete loan amortization breakdown, down payment optimization, and tax savings projections.",
    iconName: "Calculator",
    accentColor: "#F59E0B",
    badgeText: "Green Financing",
  },
  {
    id: "total-cost-of-ownership",
    slug: "total-cost-of-ownership",
    canonicalHref: "/evtech/calculators-tools/total-cost-of-ownership",
    legacyHrefs: ["/calculators/tco", "/calculators/total-cost-of-ownership"],
    title: "EV Total Cost of Ownership (TCO) Calculator",
    shortTitle: "Total Cost of Ownership",
    tagline: "Compare multi-year lifecycle expenses between an EV and an ICE vehicle.",
    description: "Comprehensive financial comparison covering purchase price, energy vs fuel, maintenance differential, insurance, resale depreciation, and break-even milestones.",
    iconName: "CircleDollarSign",
    accentColor: "#EC4899",
    badgeText: "Lifecycle ROI",
  },
];

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return CALCULATORS_CONFIG.find(
    (c) => c.slug === slug || c.id === slug || c.legacyHrefs.includes(`/calculators/${slug}`)
  );
}

