import { AmortizationScheduleRow, EmiLoanInputs, EmiLoanResults, ValidationResult } from "./types";

export const DEFAULT_EMI_LOAN_INPUTS: EmiLoanInputs = {
  vehicleOnRoadPrice: 1650000,
  downPayment: 350000,
  annualInterestRatePercent: 8.6,
  loanTenureMonths: 60,
  processingFeePercent: 1.0,
  extraPrepaymentPerMonth: 0,
};

export function validateEmiLoanInputs(inputs: EmiLoanInputs): ValidationResult {
  const errors: Record<string, string> = {};

  if (inputs.vehicleOnRoadPrice <= 0 || isNaN(inputs.vehicleOnRoadPrice)) {
    errors.vehicleOnRoadPrice = "Vehicle price must be greater than ₹0";
  }
  if (inputs.downPayment < 0 || isNaN(inputs.downPayment)) {
    errors.downPayment = "Down payment cannot be negative";
  }
  if (inputs.downPayment >= inputs.vehicleOnRoadPrice) {
    errors.downPayment = "Down payment must be less than the vehicle price";
  }
  if (inputs.annualInterestRatePercent < 0 || isNaN(inputs.annualInterestRatePercent)) {
    errors.annualInterestRatePercent = "Interest rate cannot be negative";
  }
  if (inputs.loanTenureMonths <= 0 || isNaN(inputs.loanTenureMonths)) {
    errors.loanTenureMonths = "Loan tenure must be greater than 0 months";
  }
  if (inputs.processingFeePercent < 0 || isNaN(inputs.processingFeePercent)) {
    errors.processingFeePercent = "Processing fee cannot be negative";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateEmiLoan(inputs: EmiLoanInputs): EmiLoanResults {
  const principal = inputs.customLoanAmount !== undefined && inputs.customLoanAmount > 0
    ? inputs.customLoanAmount
    : Math.max(0, inputs.vehicleOnRoadPrice - inputs.downPayment);

  const tenureMonths = Math.max(1, Math.round(inputs.loanTenureMonths));
  const annualRate = inputs.annualInterestRatePercent;
  const monthlyRate = annualRate / 12 / 100;

  let monthlyEmi = 0;
  if (annualRate === 0 || monthlyRate === 0) {
    // Zero-interest loan
    monthlyEmi = principal / tenureMonths;
  } else {
    // Standard EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalLoanRepayment = monthlyEmi * tenureMonths;
  const totalInterestPayable = Math.max(0, totalLoanRepayment - principal);

  const processingFeeAmount = (principal * inputs.processingFeePercent) / 100;
  const totalUpfrontCost = inputs.downPayment + processingFeeAmount;
  const totalCostOfFinancing = inputs.vehicleOnRoadPrice + totalInterestPayable + processingFeeAmount;

  // Build yearly amortization schedule
  const schedule: AmortizationScheduleRow[] = [];
  let currentBalance = principal;
  const totalYears = Math.ceil(tenureMonths / 12);

  for (let year = 1; year <= totalYears; year++) {
    const monthsInThisYear = Math.min(12, tenureMonths - (year - 1) * 12);
    const openingBalance = currentBalance;
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;

    for (let m = 0; m < monthsInThisYear; m++) {
      if (currentBalance <= 0) break;
      const monthInterest = monthlyRate * currentBalance;
      const monthPrincipal = Math.min(currentBalance, monthlyEmi - monthInterest);
      yearInterestPaid += monthInterest;
      yearPrincipalPaid += monthPrincipal;
      currentBalance = Math.max(0, currentBalance - monthPrincipal);
    }

    schedule.push({
      year,
      openingBalance: Math.round(openingBalance),
      principalPaid: Math.round(yearPrincipalPaid),
      interestPaid: Math.round(yearInterestPaid),
      closingBalance: Math.round(currentBalance),
    });
  }

  // Prepayment simulation if user entered extra monthly payment
  let prepaymentSavingsInterest = 0;
  let prepaymentMonthsReduced = 0;

  if (inputs.extraPrepaymentPerMonth && inputs.extraPrepaymentPerMonth > 0 && monthlyRate > 0) {
    let prepayBalance = principal;
    const combinedMonthly = monthlyEmi + inputs.extraPrepaymentPerMonth;
    let monthsTaken = 0;
    let totalPrepayInterest = 0;

    while (prepayBalance > 0 && monthsTaken < tenureMonths) {
      monthsTaken++;
      const interest = monthlyRate * prepayBalance;
      const prin = Math.min(prepayBalance, combinedMonthly - interest);
      totalPrepayInterest += interest;
      prepayBalance -= prin;
    }

    prepaymentSavingsInterest = Math.max(0, Math.round(totalInterestPayable - totalPrepayInterest));
    prepaymentMonthsReduced = Math.max(0, tenureMonths - monthsTaken);
  }

  return {
    loanPrincipal: Math.round(principal),
    monthlyEmi: Math.round(monthlyEmi),
    totalInterestPayable: Math.round(totalInterestPayable),
    totalLoanRepayment: Math.round(totalLoanRepayment),
    processingFeeAmount: Math.round(processingFeeAmount),
    totalUpfrontCost: Math.round(totalUpfrontCost),
    totalCostOfFinancing: Math.round(totalCostOfFinancing),
    schedule,
    prepaymentSavingsInterest,
    prepaymentMonthsReduced,
  };
}

