import { BatteryHealthInputs, BatteryHealthResults, DegradationProjectionYear, ValidationResult } from "./types";

export const DEFAULT_BATTERY_HEALTH_INPUTS: BatteryHealthInputs = {
  originalCapacityKwh: 64,
  hasMeasuredCapacity: false,
  measuredCapacityKwh: 58.5,
  batteryAgeYears: 3,
  estimatedCycleCount: 420,
  avgTempCategory: "moderate",
  chargingHabit: "mixed",
  batteryChemistry: "nmc",
  annualDegradationAssumptionPercent: 1.8,
};

export function validateBatteryHealthInputs(inputs: BatteryHealthInputs): ValidationResult {
  const errors: Record<string, string> = {};

  if (inputs.originalCapacityKwh <= 0 || isNaN(inputs.originalCapacityKwh)) {
    errors.originalCapacityKwh = "Original capacity must be greater than 0 kWh";
  }
  if (inputs.hasMeasuredCapacity) {
    if (!inputs.measuredCapacityKwh || inputs.measuredCapacityKwh <= 0 || isNaN(inputs.measuredCapacityKwh)) {
      errors.measuredCapacityKwh = "Measured capacity must be greater than 0 kWh";
    } else if (inputs.measuredCapacityKwh > inputs.originalCapacityKwh * 1.05) {
      errors.measuredCapacityKwh = "Measured capacity cannot exceed original capacity";
    }
  }
  if (inputs.batteryAgeYears < 0 || inputs.batteryAgeYears > 30 || isNaN(inputs.batteryAgeYears)) {
    errors.batteryAgeYears = "Battery age must be between 0 and 30 years";
  }
  if (inputs.estimatedCycleCount < 0 || isNaN(inputs.estimatedCycleCount)) {
    errors.estimatedCycleCount = "Cycle count cannot be negative";
  }
  if (inputs.annualDegradationAssumptionPercent < 0 || inputs.annualDegradationAssumptionPercent > 10 || isNaN(inputs.annualDegradationAssumptionPercent)) {
    errors.annualDegradationAssumptionPercent = "Annual degradation rate must be between 0% and 10%";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateBatteryHealth(inputs: BatteryHealthInputs): BatteryHealthResults {
  let sohPercent = 100;
  const isMeasured = inputs.hasMeasuredCapacity && typeof inputs.measuredCapacityKwh === "number";

  if (isMeasured && inputs.measuredCapacityKwh) {
    sohPercent = Math.min(100, Math.max(10, (inputs.measuredCapacityKwh / inputs.originalCapacityKwh) * 100));
  } else {
    // Modelled estimate: Calendar aging + Cycle aging
    // Rated cycles: LFP ~ 3000 cycles for 80% SOH; NMC ~ 1500 cycles for 80% SOH
    const ratedCycles = inputs.batteryChemistry === "lfp" ? 3000 : 1500;
    const cycleDegradationPercent = (inputs.estimatedCycleCount / ratedCycles) * 20;

    // Calendar aging
    const calendarDegradationPercent = inputs.batteryAgeYears * inputs.annualDegradationAssumptionPercent;

    // Environmental multipliers
    const tempMultipliers = {
      cool: 0.9,
      moderate: 1.0,
      hot: 1.25,
    };
    const habitMultipliers = {
      gentle_ac: 0.88,
      mixed: 1.0,
      frequent_dc: 1.28,
    };

    const tempMult = tempMultipliers[inputs.avgTempCategory] || 1.0;
    const habitMult = habitMultipliers[inputs.chargingHabit] || 1.0;

    const totalDegradation = (calendarDegradationPercent + cycleDegradationPercent) * tempMult * habitMult;
    sohPercent = Math.min(100, Math.max(15, 100 - totalDegradation));
  }

  const remainingCapacityKwh = (inputs.originalCapacityKwh * sohPercent) / 100;
  const capacityLostKwh = inputs.originalCapacityKwh - remainingCapacityKwh;

  // Status classification
  let healthStatus: "Excellent" | "Good" | "Moderate" | "Degraded" = "Excellent";
  if (sohPercent >= 92) healthStatus = "Excellent";
  else if (sohPercent >= 84) healthStatus = "Good";
  else if (sohPercent >= 75) healthStatus = "Moderate";
  else healthStatus = "Degraded";

  // 10-Year Timeline Projection
  // Annual degradation slope based on current trajectory
  const currentAge = Math.max(1, inputs.batteryAgeYears);
  const currentTotalLoss = 100 - sohPercent;
  const effectiveAnnualLoss = Math.min(4.0, Math.max(1.0, currentTotalLoss / currentAge));

  const timeline: DegradationProjectionYear[] = [];
  for (let yr = 0; yr <= 10; yr++) {
    const projLoss = yr <= inputs.batteryAgeYears
      ? (currentTotalLoss * (yr / currentAge))
      : (currentTotalLoss + (yr - inputs.batteryAgeYears) * effectiveAnnualLoss);

    const projSoh = Math.max(30, Math.min(100, 100 - projLoss));
    timeline.push({
      year: yr,
      projectedSohPercent: Math.round(projSoh * 10) / 10,
      projectedCapacityKwh: Math.round(((inputs.originalCapacityKwh * projSoh) / 100) * 10) / 10,
    });
  }

  // Actionable recommendations
  const recommendations: string[] = [];
  if (inputs.chargingHabit === "frequent_dc") {
    recommendations.push("Prioritize Level 2 AC slow charging overnight. Frequent high-power DC fast charging accelerates lithium plating and SEI layer growth.");
  } else {
    recommendations.push("Continue regular AC charging at moderate currents to maintain cell balancing.");
  }

  if (inputs.batteryChemistry === "nmc") {
    recommendations.push("For daily driving, cap target state of charge at 80%. Only charge to 100% when starting long road trips.");
  } else {
    recommendations.push("LFP chemistry has high thermal stability; charge to 100% at least once a week to allow the BMS to calibrate cell voltages accurately.");
  }

  if (inputs.avgTempCategory === "hot") {
    recommendations.push("Park in shade or covered garages during hot summer peaks. High ambient heat while battery is above 80% SOC increases calendar fade.");
  }

  recommendations.push("Avoid leaving the vehicle parked at very low charge (<10%) for prolonged periods to prevent deep discharge copper dissolution.");

  return {
    sohPercent: Math.round(sohPercent * 10) / 10,
    remainingCapacityKwh: Math.round(remainingCapacityKwh * 10) / 10,
    capacityLostKwh: Math.round(capacityLostKwh * 10) / 10,
    isMeasured,
    healthStatus,
    projected10YearTimeline: timeline,
    recommendations,
  };
}
