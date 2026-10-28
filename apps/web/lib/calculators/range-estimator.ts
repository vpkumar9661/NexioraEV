import { RangeEstimatorInputs, RangeEstimatorResults, ValidationResult } from "./types";

export const DEFAULT_RANGE_INPUTS: RangeEstimatorInputs = {
  usableCapacityKwh: 60,
  currentSocPercent: 90,
  averageSpeedKmh: 65,
  drivingProfile: "mixed",
  hvacLevel: "moderate",
  terrain: "flat",
  ambientTempCelsius: 24,
  baselineEfficiencyKwhPer100Km: 15.0,
};

export function validateRangeEstimatorInputs(inputs: RangeEstimatorInputs): ValidationResult {
  const errors: Record<string, string> = {};

  if (inputs.usableCapacityKwh <= 0 || isNaN(inputs.usableCapacityKwh)) {
    errors.usableCapacityKwh = "Battery capacity must be greater than 0 kWh";
  }
  if (inputs.currentSocPercent < 0 || inputs.currentSocPercent > 100 || isNaN(inputs.currentSocPercent)) {
    errors.currentSocPercent = "Current charge must be between 0% and 100%";
  }
  if (inputs.averageSpeedKmh <= 0 || inputs.averageSpeedKmh > 200 || isNaN(inputs.averageSpeedKmh)) {
    errors.averageSpeedKmh = "Speed must be between 10 km/h and 200 km/h";
  }
  if (inputs.ambientTempCelsius < -40 || inputs.ambientTempCelsius > 60 || isNaN(inputs.ambientTempCelsius)) {
    errors.ambientTempCelsius = "Temperature must be between -40°C and 60°C";
  }
  if (inputs.baselineEfficiencyKwhPer100Km <= 0 || isNaN(inputs.baselineEfficiencyKwhPer100Km)) {
    errors.baselineEfficiencyKwhPer100Km = "Baseline consumption must be greater than 0";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateRangeEstimator(inputs: RangeEstimatorInputs): RangeEstimatorResults {
  // Available energy: Usable * SOC / 100
  const availableEnergyKwh = (inputs.usableCapacityKwh * inputs.currentSocPercent) / 100;

  // Aerodynamic speed factor: aerodynamic drag increases quadratically with speed
  // Speed factor anchored at 60 km/h = 1.0
  const speed = inputs.averageSpeedKmh;
  let speedFactor = 1.0;
  if (speed <= 40) speedFactor = 0.88;
  else if (speed <= 60) speedFactor = 0.95;
  else if (speed <= 80) speedFactor = 1.03;
  else if (speed <= 100) speedFactor = 1.18;
  else if (speed <= 120) speedFactor = 1.35;
  else speedFactor = 1.55;

  // HVAC factor
  const hvacFactorMap = {
    off: 1.0,
    moderate: 1.09,
    high: 1.24,
  };
  const hvacFactor = hvacFactorMap[inputs.hvacLevel] || 1.0;

  // Terrain factor
  const terrainFactorMap = {
    flat: 1.0,
    mixed: 1.08,
    hilly: 1.25,
  };
  const terrainFactor = terrainFactorMap[inputs.terrain] || 1.0;

  // Temperature factor: Optimal is 20-28°C
  const temp = inputs.ambientTempCelsius;
  let tempFactor = 1.0;
  if (temp < 0) {
    tempFactor = 1.32; // severe battery heating & chemical resistance
  } else if (temp < 15) {
    tempFactor = 1 + (15 - temp) * 0.015;
  } else if (temp > 32) {
    tempFactor = 1 + (temp - 32) * 0.012; // battery cooling load
  }

  // Driving profile factor
  const profileFactorMap = {
    city: 0.94, // regen braking advantages
    mixed: 1.0,
    highway: 1.15,
  };
  const profileFactor = profileFactorMap[inputs.drivingProfile] || 1.0;

  // Total adjusted consumption in kWh/100 km
  const adjustedConsumptionKwhPer100Km =
    inputs.baselineEfficiencyKwhPer100Km *
    speedFactor *
    hvacFactor *
    terrainFactor *
    tempFactor *
    profileFactor;

  // Estimated range: (Available Energy / Consumption) * 100
  const estimatedRemainingRangeKm = Math.max(
    0,
    (availableEnergyKwh / adjustedConsumptionKwhPer100Km) * 100
  );

  // Efficiency in km/kWh
  const efficiencyKmPerKwh = 100 / adjustedConsumptionKwhPer100Km;

  // Specific city and highway models
  const cityConsumption =
    inputs.baselineEfficiencyKwhPer100Km * 0.92 * hvacFactor * tempFactor;
  const estimatedCityRangeKm = Math.max(
    0,
    (availableEnergyKwh / cityConsumption) * 100
  );

  const highwayConsumption =
    inputs.baselineEfficiencyKwhPer100Km * 1.32 * hvacFactor * tempFactor * terrainFactor;
  const estimatedHighwayRangeKm = Math.max(
    0,
    (availableEnergyKwh / highwayConsumption) * 100
  );

  // Calculate isolated impact in KM
  const baseRange = (availableEnergyKwh / inputs.baselineEfficiencyKwhPer100Km) * 100;
  const hvacImpactKm = Math.max(0, baseRange * (hvacFactor - 1));
  const speedImpactKm = Math.max(0, baseRange * (speedFactor - 1));
  const terrainImpactKm = Math.max(0, baseRange * (terrainFactor - 1));
  const tempImpactKm = Math.max(0, baseRange * (tempFactor - 1));

  return {
    estimatedRemainingRangeKm: Math.round(estimatedRemainingRangeKm),
    availableEnergyKwh: Math.round(availableEnergyKwh * 10) / 10,
    adjustedConsumptionKwhPer100Km: Math.round(adjustedConsumptionKwhPer100Km * 10) / 10,
    efficiencyKmPerKwh: Math.round(efficiencyKmPerKwh * 10) / 10,
    estimatedCityRangeKm: Math.round(estimatedCityRangeKm),
    estimatedHighwayRangeKm: Math.round(estimatedHighwayRangeKm),
    speedImpactKm: Math.round(speedImpactKm),
    hvacImpactKm: Math.round(hvacImpactKm),
    terrainImpactKm: Math.round(terrainImpactKm),
    tempImpactKm: Math.round(tempImpactKm),
  };
}
