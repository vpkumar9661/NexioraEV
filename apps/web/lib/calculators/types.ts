// ─── Calculator Shared Types ───

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// 1. Charging Cost Types
export interface ChargingCostInputs {
  batteryCapacityKwh: number;
  currentSocPercent: number;
  targetSocPercent: number;
  chargingEfficiencyPercent: number;
  electricityTariffPerKwh: number;
  chargerPowerKw: number;
  dailyDistanceKm: number;
  evEfficiencyKmPerKwh: number;
  iceEfficiencyKmPerLitre: number;
  fuelPricePerLitre: number;
}

export interface ChargingCostResults {
  requiredBatteryEnergyKwh: number;
  gridEnergyConsumedKwh: number;
  estimatedChargingCost: number;
  estimatedChargingDurationHours: number;
  evCostPerKm: number;
  iceCostPerKm: number;
  dailyEvTripCost: number;
  dailyIceTripCost: number;
  dailyTripSavings: number;
  monthlyEvCost: number;
  monthlyIceCost: number;
  monthlySavings: number;
  annualEvCost: number;
  annualIceCost: number;
  annualSavings: number;
  co2SavedKgPerYear: number;
}

// 2. Range Estimator Types
export type DrivingProfile = "city" | "mixed" | "highway";
export type HvacLevel = "off" | "moderate" | "high";
export type TerrainType = "flat" | "mixed" | "hilly";

export interface RangeEstimatorInputs {
  usableCapacityKwh: number;
  currentSocPercent: number;
  averageSpeedKmh: number;
  drivingProfile: DrivingProfile;
  hvacLevel: HvacLevel;
  terrain: TerrainType;
  ambientTempCelsius: number;
  baselineEfficiencyKwhPer100Km: number;
}

export interface RangeEstimatorResults {
  estimatedRemainingRangeKm: number;
  availableEnergyKwh: number;
  adjustedConsumptionKwhPer100Km: number;
  efficiencyKmPerKwh: number;
  estimatedCityRangeKm: number;
  estimatedHighwayRangeKm: number;
  speedImpactKm: number;
  hvacImpactKm: number;
  terrainImpactKm: number;
  tempImpactKm: number;
}

// 3. Battery Health Types
export type AmbientTempCategory = "cool" | "moderate" | "hot";
export type ChargingHabit = "gentle_ac" | "mixed" | "frequent_dc";
export type BatteryChemistry = "lfp" | "nmc" | "nca";

export interface BatteryHealthInputs {
  originalCapacityKwh: number;
  hasMeasuredCapacity: boolean;
  measuredCapacityKwh?: number;
  batteryAgeYears: number;
  estimatedCycleCount: number;
  avgTempCategory: AmbientTempCategory;
  chargingHabit: ChargingHabit;
  batteryChemistry: BatteryChemistry;
  annualDegradationAssumptionPercent: number;
}

export interface DegradationProjectionYear {
  year: number;
  projectedSohPercent: number;
  projectedCapacityKwh: number;
}

export interface BatteryHealthResults {
  sohPercent: number;
  remainingCapacityKwh: number;
  capacityLostKwh: number;
  isMeasured: boolean;
  healthStatus: "Excellent" | "Good" | "Moderate" | "Degraded";
  projected10YearTimeline: DegradationProjectionYear[];
  recommendations: string[];
}

// 4. EMI & Loan Types
export interface EmiLoanInputs {
  vehicleOnRoadPrice: number;
  downPayment: number;
  customLoanAmount?: number;
  annualInterestRatePercent: number;
  loanTenureMonths: number;
  processingFeePercent: number;
  extraPrepaymentPerMonth?: number;
}

export interface AmortizationScheduleRow {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface EmiLoanResults {
  loanPrincipal: number;
  monthlyEmi: number;
  totalInterestPayable: number;
  totalLoanRepayment: number;
  processingFeeAmount: number;
  totalUpfrontCost: number;
  totalCostOfFinancing: number;
  schedule: AmortizationScheduleRow[];
  prepaymentSavingsInterest?: number;
  prepaymentMonthsReduced?: number;
}

// 5. Total Cost of Ownership Types
export interface TcoInputs {
  evPurchasePrice: number;
  icePurchasePrice: number;
  ownershipYears: number;
  annualDistanceKm: number;
  evEfficiencyKmPerKwh: number;
  electricityTariffPerKwh: number;
  iceEfficiencyKmPerLitre: number;
  fuelPricePerLitre: number;
  annualEvMaintenance: number;
  annualIceMaintenance: number;
  annualEvInsurance: number;
  annualIceInsurance: number;
  evResalePercent: number;
  iceResalePercent: number;
  batteryReplacementCost?: number;
  otherAnnualExpenses?: number;
}

export interface TcoBreakdownItem {
  category: string;
  evAmount: number;
  iceAmount: number;
}

export interface TcoResults {
  totalGrossEvCost: number;
  totalNetEvCost: number;
  totalGrossIceCost: number;
  totalNetIceCost: number;
  netLifetimeSavings: number;
  breakEvenKm: number | null;
  breakEvenYears: number | null;
  evRunningCostPerKm: number;
  iceRunningCostPerKm: number;
  monthlyEvOperatingCost: number;
  monthlyIceOperatingCost: number;
  breakdown: TcoBreakdownItem[];
  yearlyCumulativeEv: number[];
  yearlyCumulativeIce: number[];
}
