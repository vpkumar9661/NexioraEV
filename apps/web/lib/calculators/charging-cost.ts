import { ChargingCostInputs, ChargingCostResults, ValidationResult } from "./types";

export const DEFAULT_CHARGING_COST_INPUTS: ChargingCostInputs = {
  batteryCapacityKwh: 60,
  currentSocPercent: 20,
  targetSocPercent: 80,
  chargingEfficiencyPercent: 90,
  electricityTariffPerKwh: 8.5,
  chargerPowerKw: 7.4,
  dailyDistanceKm: 45,
  evEfficiencyKmPerKwh: 6.5,
  iceEfficiencyKmPerLitre: 15,
  fuelPricePerLitre: 102,
};

export function validateChargingCostInputs(inputs: ChargingCostInputs): ValidationResult {
  const errors: Record<string, string> = {};

  if (inputs.batteryCapacityKwh <= 0 || isNaN(inputs.batteryCapacityKwh)) {
    errors.batteryCapacityKwh = "Battery capacity must be greater than 0 kWh";
  }
  if (inputs.currentSocPercent < 0 || inputs.currentSocPercent > 100 || isNaN(inputs.currentSocPercent)) {
    errors.currentSocPercent = "Current charge must be between 0% and 100%";
  }
  if (inputs.targetSocPercent < 0 || inputs.targetSocPercent > 100 || isNaN(inputs.targetSocPercent)) {
    errors.targetSocPercent = "Target charge must be between 0% and 100%";
  }
  if (inputs.targetSocPercent <= inputs.currentSocPercent) {
    errors.targetSocPercent = "Target charge must be greater than current charge";
  }
  if (inputs.chargingEfficiencyPercent <= 0 || inputs.chargingEfficiencyPercent > 100 || isNaN(inputs.chargingEfficiencyPercent)) {
    errors.chargingEfficiencyPercent = "Efficiency must be between 1% and 100%";
  }
  if (inputs.electricityTariffPerKwh < 0 || isNaN(inputs.electricityTariffPerKwh)) {
    errors.electricityTariffPerKwh = "Electricity tariff cannot be negative";
  }
  if (inputs.chargerPowerKw <= 0 || isNaN(inputs.chargerPowerKw)) {
    errors.chargerPowerKw = "Charger power must be greater than 0 kW";
  }
  if (inputs.dailyDistanceKm < 0 || isNaN(inputs.dailyDistanceKm)) {
    errors.dailyDistanceKm = "Daily distance cannot be negative";
  }
  if (inputs.evEfficiencyKmPerKwh <= 0 || isNaN(inputs.evEfficiencyKmPerKwh)) {
    errors.evEfficiencyKmPerKwh = "EV efficiency must be greater than 0 km/kWh";
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

export function calculateChargingCost(inputs: ChargingCostInputs): ChargingCostResults {
  // Required battery energy: Capacity * (Target - Current) / 100
  const socDelta = Math.max(0, inputs.targetSocPercent - inputs.currentSocPercent);
  const requiredBatteryEnergyKwh = (inputs.batteryCapacityKwh * socDelta) / 100;

  // Grid energy consumed: Required / (Efficiency / 100)
  const effRatio = Math.max(0.01, inputs.chargingEfficiencyPercent / 100);
  const gridEnergyConsumedKwh = requiredBatteryEnergyKwh / effRatio;

  // Estimated charging cost
  const estimatedChargingCost = gridEnergyConsumedKwh * inputs.electricityTariffPerKwh;

  // Charging duration: Required / Charger power
  const chargerPower = Math.max(0.1, inputs.chargerPowerKw);
  const estimatedChargingDurationHours = requiredBatteryEnergyKwh / chargerPower;

  // Running cost per km
  const evCostPerKm = inputs.electricityTariffPerKwh / inputs.evEfficiencyKmPerKwh;
  const iceCostPerKm = inputs.fuelPricePerLitre / inputs.iceEfficiencyKmPerLitre;

  // Daily trip cost
  const dailyEvTripCost = inputs.dailyDistanceKm * evCostPerKm;
  const dailyIceTripCost = inputs.dailyDistanceKm * iceCostPerKm;
  const dailyTripSavings = Math.max(0, dailyIceTripCost - dailyEvTripCost);

  // Monthly & Annual projections
  const monthlyEvCost = dailyEvTripCost * 30;
  const monthlyIceCost = dailyIceTripCost * 30;
  const monthlySavings = dailyTripSavings * 30;

  const annualEvCost = dailyEvTripCost * 365;
  const annualIceCost = dailyIceTripCost * 365;
  const annualSavings = dailyTripSavings * 365;

  // Carbon savings: Average petrol car produces ~0.16 kg CO2/km, EV from grid produces ~0.08 kg CO2/km
  const co2SavedKgPerYear = (inputs.dailyDistanceKm * 365 * 0.08);

  return {
    requiredBatteryEnergyKwh: Math.round(requiredBatteryEnergyKwh * 100) / 100,
    gridEnergyConsumedKwh: Math.round(gridEnergyConsumedKwh * 100) / 100,
    estimatedChargingCost: Math.round(estimatedChargingCost),
    estimatedChargingDurationHours: Math.round(estimatedChargingDurationHours * 10) / 10,
    evCostPerKm: Math.round(evCostPerKm * 100) / 100,
    iceCostPerKm: Math.round(iceCostPerKm * 100) / 100,
    dailyEvTripCost: Math.round(dailyEvTripCost),
    dailyIceTripCost: Math.round(dailyIceTripCost),
    dailyTripSavings: Math.round(dailyTripSavings),
    monthlyEvCost: Math.round(monthlyEvCost),
    monthlyIceCost: Math.round(monthlyIceCost),
    monthlySavings: Math.round(monthlySavings),
    annualEvCost: Math.round(annualEvCost),
    annualIceCost: Math.round(annualIceCost),
    annualSavings: Math.round(annualSavings),
    co2SavedKgPerYear: Math.round(co2SavedKgPerYear),
  };
}

