"use client";

import React, { useState, useMemo } from "react";
import { 
  IndianRupee, 
  CreditCard, 
  Calendar, 
  Receipt, 
  Percent, 
  RotateCcw, 
  SlidersHorizontal,
  FileText,
  BadgePercent,
  CheckCircle2
} from "lucide-react";
import { 
  CalculatorLayout, 
  CalculatorInputField, 
  CalculatorSlider, 
  CalculatorResultCard, 
  CalculatorComparisonBar 
} from "@/components/calculators";
import { 
  DEFAULT_EMI_LOAN_INPUTS, 
  calculateEmiLoan, 
  validateEmiLoanInputs 
} from "@/lib/calculators/emi-loan";
import { EmiLoanInputs } from "@/lib/calculators/types";
import { CALCULATORS_CONFIG } from "@/config/calculators";

const config = CALCULATORS_CONFIG.find((c) => c.id === "emi-loan")!;

export function EmiLoanCalculator() {
  const [inputs, setInputs] = useState<EmiLoanInputs>(DEFAULT_EMI_LOAN_INPUTS);
  const [showAmortization, setShowAmortization] = useState(false);

  const handleInputChange = <K extends keyof EmiLoanInputs>(key: K, value: EmiLoanInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_EMI_LOAN_INPUTS);
  };

  const validation = useMemo(() => validateEmiLoanInputs(inputs), [inputs]);
  const results = useMemo(() => calculateEmiLoan(inputs), [inputs]);

  const downPaymentPercent = Math.round((inputs.downPayment / Math.max(1, inputs.vehicleOnRoadPrice)) * 100);

  const methodology = {
    formula: `Monthly EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
Where:
- P = Principal Loan Amount = On-Road Price - Down Payment
- r = Monthly Interest Rate = Annual Rate / 12 / 100
- n = Tenure in Months
Total Interest = (EMI × n) - Principal
Total Upfront Outlay = Down Payment + Processing Fee`,
    description: "Computes fixed-rate monthly installment obligations, cumulative financing interest, and amortized repayment schedules for electric four-wheelers and commercial green vehicle financing.",
    assumptions: [
      "Interest calculated monthly on reducing balance method.",
      "Green auto loan interest rates typically offer 25-50 bps discount compared to standard ICE vehicle loans in India.",
      "Processing fees are subject to 18% GST.",
    ],
    limitations: [
      "Does not factor in state-level EV subsidy rebates that can directly lower the initial ex-showroom invoice.",
      "Bank stamp duty, hypothecation charges, and documentation fees vary across states and lenders.",
    ],
  };

  return (
    <CalculatorLayout config={config} onReset={handleReset} methodology={methodology}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Controls Panel */}
        <div className="lg:col-span-5 rounded-3xl bg-white/3 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
                <SlidersHorizontal className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Loan Parameters</h3>
                <p className="text-[11px] text-[#94A3B8]">Configure auto financing terms</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-[#94A3B8] hover:text-white flex items-center gap-1 transition-colors"
              title="Reset parameters to defaults"
            >
              <RotateCcw className="size-3" />
              <span>Defaults</span>
            </button>
          </div>

          <div className="space-y-4">
            <CalculatorInputField
              id="vehiclePrice"
              label="Vehicle On-Road Price"
              value={inputs.vehicleOnRoadPrice}
              onChange={(v) => handleInputChange("vehicleOnRoadPrice", v)}
              min={100000}
              max={20000000}
              step={25000}
              prefix="₹"
              helperText="Ex-showroom + RTO registration + Insurance"
              error={validation.errors.vehicleOnRoadPrice}
            />

            <CalculatorInputField
              id="downPayment"
              label={`Down Payment (${downPaymentPercent}%)`}
              value={inputs.downPayment}
              onChange={(v) => handleInputChange("downPayment", v)}
              min={0}
              max={inputs.vehicleOnRoadPrice}
              step={10000}
              prefix="₹"
              helperText={`Net Loan Amount: ₹${results.loanPrincipal.toLocaleString("en-IN")}`}
              error={validation.errors.downPayment}
            />

            <CalculatorSlider
              id="interestRate"
              label="Annual Interest Rate"
              value={inputs.annualInterestRatePercent}
              onChange={(v) => handleInputChange("annualInterestRatePercent", v)}
              min={5.0}
              max={16.0}
              step={0.1}
              unit="%"
              accentColor="green"
              marks={[
                { value: 7.0, label: "7.0%" },
                { value: 8.5, label: "8.5%" },
                { value: 10.0, label: "10.0%" },
                { value: 12.0, label: "12.0%" },
              ]}
              helperText="Green car loans range from 8.2% to 9.5% p.a."
            />

            {/* Loan Tenure Quick Buttons */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-[#CBD5E1]">
                <span>Loan Tenure ({inputs.loanTenureMonths} Months / {(inputs.loanTenureMonths / 12).toFixed(1)} Yrs)</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[24, 36, 48, 60, 84].map((tenure) => (
                  <button
                    key={tenure}
                    type="button"
                    onClick={() => handleInputChange("loanTenureMonths", tenure)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      inputs.loanTenureMonths === tenure
                        ? "bg-[#00E676] text-black border-[#00E676] shadow-md shadow-[#00E676]/20"
                        : "bg-white/5 text-[#94A3B8] border-white/10 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tenure / 12} Yrs
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CalculatorInputField
                id="processingFee"
                label="Bank Processing Fee"
                value={inputs.processingFeePercent}
                onChange={(v) => handleInputChange("processingFeePercent", v)}
                min={0}
                max={5}
                step={0.1}
                unit="%"
                helperText={`₹${results.processingFeeAmount.toLocaleString("en-IN")}`}
                error={validation.errors.processingFeePercent}
              />

              <CalculatorInputField
                id="prepayment"
                label="Extra Monthly Prepayment"
                value={inputs.extraPrepaymentPerMonth || 0}
                onChange={(v) => handleInputChange("extraPrepaymentPerMonth", v)}
                min={0}
                max={50000}
                step={1000}
                prefix="₹"
                helperText="Accelerate loan payoff"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Schedule */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Hero EMI Card */}
          <div className="rounded-3xl bg-linear-to-br from-[#00E676]/15 via-black/40 to-[#00D4FF]/10 border border-[#00E676]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E676] flex items-center gap-1.5">
                  <CreditCard className="size-3.5" />
                  Monthly Installment (EMI)
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ₹{results.monthlyEmi.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-semibold text-[#94A3B8]">/ month</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  For {inputs.loanTenureMonths} months @ {inputs.annualInterestRatePercent}% p.a.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 shrink-0 text-left sm:text-right">
                <div className="text-xs font-semibold text-[#CBD5E1]">Total Upfront Outlay</div>
                <div className="text-lg font-mono font-black text-[#00D4FF] mt-0.5">
                  ₹{results.totalUpfrontCost.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-[#94A3B8]">
                  Down payment + processing fee
                </div>
              </div>
            </div>

            {/* Key figures strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-white/3 border border-white/5">
                <div className="text-xs font-medium text-[#94A3B8]">Principal Amount</div>
                <div className="text-lg font-bold text-white mt-1">
                  ₹{results.loanPrincipal.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/3 border border-white/5">
                <div className="text-xs font-medium text-[#94A3B8]">Total Interest</div>
                <div className="text-lg font-bold text-rose-400 mt-1">
                  ₹{results.totalInterestPayable.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/3 border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-xs font-medium text-[#94A3B8]">Total Repayment</div>
                <div className="text-lg font-bold text-[#00E676] mt-1">
                  ₹{results.totalLoanRepayment.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Proportion Bar */}
          <CalculatorComparisonBar
            title="Loan Cost Distribution"
            subtitle="Ratio of borrowed capital to cumulative bank interest charges"
            items={[
              {
                label: "Principal Borrowed",
                value: results.loanPrincipal,
                formattedValue: `₹${results.loanPrincipal.toLocaleString("en-IN")}`,
                color: "#00E676",
                secondaryText: `${Math.round((results.loanPrincipal / results.totalLoanRepayment) * 100)}% of repayment`,
              },
              {
                label: "Total Bank Interest",
                value: results.totalInterestPayable,
                formattedValue: `₹${results.totalInterestPayable.toLocaleString("en-IN")}`,
                color: "#F43F5E",
                secondaryText: `${Math.round((results.totalInterestPayable / results.totalLoanRepayment) * 100)}% financing premium`,
              },
            ]}
          />

          {/* Section 80EEB Tax Benefit Box */}
          <div className="rounded-3xl bg-linear-to-br from-[#00D4FF]/10 via-white/2 to-transparent border border-[#00D4FF]/25 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <BadgePercent className="size-5 text-[#00D4FF]" />
              <h4 className="text-sm font-bold text-white">Income Tax Section 80EEB Benefit</h4>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Individual taxpayers can claim tax deductions up to <strong>₹1,50,000 per financial year</strong> on the interest paid towards an electric vehicle loan under Section 80EEB of the Income Tax Act. Over a 5-year loan tenure, this can deliver up to <strong>₹45,000 - ₹75,000 in net tax savings</strong> depending on your tax bracket.
            </p>
          </div>

          {/* Optional Amortization Schedule Accordion */}
          <div className="rounded-3xl bg-white/3 border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Receipt className="size-4 text-[#00E676]" />
                  <span>Amortization Repayment Schedule</span>
                </h4>
                <p className="text-xs text-[#94A3B8]">Year-by-year principal and interest liquidation</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="text-xs font-semibold text-[#00E676] hover:underline"
              >
                {showAmortization ? "Hide Table" : "View Breakdown"}
              </button>
            </div>

            {showAmortization && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-[#94A3B8]">
                      <th className="py-2">Year</th>
                      <th className="py-2">Opening Balance</th>
                      <th className="py-2 text-[#00E676]">Principal Paid</th>
                      <th className="py-2 text-rose-400">Interest Paid</th>
                      <th className="py-2">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {results.schedule.map((row) => (
                      <tr key={row.year} className="hover:bg-white/2">
                        <td className="py-2.5 font-bold text-white">Year {row.year}</td>
                        <td className="py-2.5 text-[#CBD5E1]">₹{row.openingBalance.toLocaleString("en-IN")}</td>
                        <td className="py-2.5 text-[#00E676] font-semibold">₹{row.principalPaid.toLocaleString("en-IN")}</td>
                        <td className="py-2.5 text-rose-400">₹{row.interestPaid.toLocaleString("en-IN")}</td>
                        <td className="py-2.5 text-[#CBD5E1]">₹{row.closingBalance.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}

