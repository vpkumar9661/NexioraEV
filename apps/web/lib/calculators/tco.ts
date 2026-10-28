import { TcoBreakdownItem, TcoInputs, TcoResults, ValidationResult } from "./types";

export const DEFAULT_TCO_INPUTS: TcoInputs = {
  evPurchasePrice: 1600000,
  icePurchasePrice: 1300000,
  ownershipYears: 5,
  annualDistanceKm: 18000,
  evEfficiencyKmPerKwh: 6.8,
  electricityTariffPerKwh: 8.5,
  iceEfficiencyKmPerLitre: 14.5,
  fuelPricePerLitre: 102,
  annualEvMaintenance: 8500,
  annualIceMaintenance: 26000,
  annualEvInsurance: 34000,
  annualIceInsurance: 31000,
  evResalePercent: 52,
  iceResalePercent: 44,
  batteryReplacementCost: 0,
  otherAnnualExpenses: 3000,
};

export function validateTcoInputs(inputs: TcoInputs): ValidationResult {
  const errors: Record<string, string> = {};

  if (inputs.evPurchasePrice <= 0 || isNaN(inputs.evPurchasePrice)) {
    errors.evPurchasePrice = "EV purchase price must be greater than ₹0";
  }
  if (inputs.icePurchasePrice <= 0 || isNaN(inputs.icePurchasePrice)) {
    errors.icePurchasePrice = "ICE purchase price must be greater than ₹0";
  }
  if (inputs.ownershipYears <= 0 || inputs.ownershipYears > 20 || isNaN(inputs.ownershipYears)) {
    errors.ownershipYears = "Ownership period must be between 1 and 20 years";
  }
  if (inputs.annualDistanceKm <= 0 || isNaN(inputs.annualDistanceKm)) {
    errors.annualDistanceKm = "Annual distance must be greater than 0 km";
  }
  if (inputs.evEfficiencyKmPerKwh <= 0 || isNaN(inputs.evEfficiencyKmPerKwh)) {
    errors.evEfficiencyKmPerKwh = "EV efficiency must be greater than 0 km/kWh";
  }
  if (inputs.electricityTariffPerKwh < 0 || isNaN(inputs.electricityTariffPerKwh)) {
    errors.electricityTariffPerKwh = "Tariff cannot be negative";
  }
  if (inputs.iceEfficiencyKmPerLitre <= 0 || isNaN(inputs.iceEfficiencyKmPerLitre)) {
    errors.iceEfficiencyKmPerLitre = "ICE efficiency must be greater than 0 km/l";
  }
  if (inputs.fuelPricePerLitre < 0 || isNaN(inputs.fuelPricePerLitre)) {
    errors.fuelPricePerLitre = "Fuel price cannot be negative";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateTco(inputs: TcoInputs): TcoResults {
  const years = Math.max(1, Math.round(inputs.ownershipYears));
  const totalDistance = inputs.annualDistanceKm * years;

  // Running costs per km
  const evRunningCostPerKm = inputs.electricityTariffPerKwh / inputs.evEfficiencyKmPerKwh;
  const iceRunningCostPerKm = inputs.fuelPricePerLitre / inputs.iceEfficiencyKmPerLitre;

  // Total energy & fuel
  const totalEvEnergyCost = totalDistance * evRunningCostPerKm;
  const totalIceFuelCost = totalDistance * iceRunningCostPerKm;

  // Maintenance
  const totalEvMaintenance = inputs.annualEvMaintenance * years;
  const totalIceMaintenance = inputs.annualIceMaintenance * years;

  // Insurance
  const totalEvInsurance = inputs.annualEvInsurance * years;
  const totalIceInsurance = inputs.annualIceInsurance * years;

  // Other annual expenses
  const otherCost = (inputs.otherAnnualExpenses || 0) * years;
  const batteryReplCost = inputs.batteryReplacementCost || 0;

  // Resale values
  const evResaleValue = (inputs.evPurchasePrice * inputs.evResalePercent) / 100;
  const iceResaleValue = (inputs.icePurchasePrice * inputs.iceResalePercent) / 100;

  // Gross and Net Costs
  const totalGrossEvCost = inputs.evPurchasePrice + totalEvEnergyCost + totalEvMaintenance + totalEvInsurance + otherCost + batteryReplCost;
  const totalNetEvCost = Math.max(0, totalGrossEvCost - evResaleValue);

  const totalGrossIceCost = inputs.icePurchasePrice + totalIceFuelCost + totalIceMaintenance + totalIceInsurance + otherCost;
  const totalNetIceCost = Math.max(0, totalGrossIceCost - iceResaleValue);

  const netLifetimeSavings = totalNetIceCost - totalNetEvCost;

  // Monthly operating costs
  const monthlyEvOperatingCost = (totalEvEnergyCost + totalEvMaintenance + totalEvInsurance) / (years * 12);
  const monthlyIceOperatingCost = (totalIceFuelCost + totalIceMaintenance + totalIceInsurance) / (years * 12);

  // Break-even analysis (Accounting for higher EV purchase price vs lower running costs)
  const pricePremium = inputs.evPurchasePrice - inputs.icePurchasePrice;
  const annualRunningDiff = (inputs.annualDistanceKm * iceRunningCostPerKm + inputs.annualIceMaintenance + inputs.annualIceInsurance) -
                            (inputs.annualDistanceKm * evRunningCostPerKm + inputs.annualEvMaintenance + inputs.annualEvInsurance);

  let breakEvenKm: number | null = null;
  let breakEvenYears: number | null = null;

  if (pricePremium <= 0) {
    // EV was cheaper or equal upfront
    breakEvenKm = 0;
    breakEvenYears = 0;
  } else if (annualRunningDiff > 0) {
    const yearsFloat = pricePremium / annualRunningDiff;
    breakEvenYears = Math.round(yearsFloat * 10) / 10;
    breakEvenKm = Math.round(yearsFloat * inputs.annualDistanceKm);
  }

  // Yearly cumulative progress
  const yearlyCumulativeEv: number[] = [];
  const yearlyCumulativeIce: number[] = [];
  let cumEv = inputs.evPurchasePrice;
  let cumIce = inputs.icePurchasePrice;

  for (let yr = 1; yr <= years; yr++) {
    cumEv += (inputs.annualDistanceKm * evRunningCostPerKm) + inputs.annualEvMaintenance + inputs.annualEvInsurance + (inputs.otherAnnualExpenses || 0);
    cumIce += (inputs.annualDistanceKm * iceRunningCostPerKm) + inputs.annualIceMaintenance + inputs.annualIceInsurance + (inputs.otherAnnualExpenses || 0);
    yearlyCumulativeEv.push(Math.round(cumEv));
    yearlyCumulativeIce.push(Math.round(cumIce));
  }

  // Category breakdown
  const breakdown: TcoBreakdownItem[] = [
    { category: "Purchase Price", evAmount: inputs.evPurchasePrice, iceAmount: inputs.icePurchasePrice },
    { category: "Energy / Fuel", evAmount: Math.round(totalEvEnergyCost), iceAmount: Math.round(totalIceFuelCost) },
    { category: "Maintenance", evAmount: Math.round(totalEvMaintenance), iceAmount: Math.round(totalIceMaintenance) },
    { category: "Insurance", evAmount: Math.round(totalEvInsurance), iceAmount: Math.round(totalIceInsurance) },
    { category: "Estimated Resale Value (-)", evAmount: -Math.round(evResaleValue), iceAmount: -Math.round(iceResaleValue) },
  ];

  if (batteryReplCost > 0) {
    breakdown.push({ category: "Battery Replacement", evAmount: batteryReplCost, iceAmount: 0 });
  }

  return {
    totalGrossEvCost: Math.round(totalGrossEvCost),
    totalNetEvCost: Math.round(totalNetEvCost),
    totalGrossIceCost: Math.round(totalGrossIceCost),
    totalNetIceCost: Math.round(totalNetIceCost),
    netLifetimeSavings: Math.round(netLifetimeSavings),
    breakEvenKm,
    breakEvenYears,
    evRunningCostPerKm: Math.round(evRunningCostPerKm * 100) / 100,
    iceRunningCostPerKm: Math.round(iceRunningCostPerKm * 100) / 100,
    monthlyEvOperatingCost: Math.round(monthlyEvOperatingCost),
    monthlyIceOperatingCost: Math.round(monthlyIceOperatingCost),
    breakdown,
    yearlyCumulativeEv,
    yearlyCumulativeIce,
  };
}

