"use client";

import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  RotateCcw, 
  SlidersHorizontal,
  Car,
  Fuel,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck,
  Percent
} from "lucide-react";
import { 
  CalculatorLayout, 
  CalculatorInputField, 
  CalculatorSlider, 
  CalculatorResultCard, 
  CalculatorComparisonBar 
} from "@/components/calculators";
import { 
  DEFAULT_TCO_INPUTS, 
  calculateTco, 
  validateTcoInputs 
} from "@/lib/calculators/tco";
import { TcoInputs } from "@/lib/calculators/types";
import { CALCULATORS_CONFIG } from "@/config/calculators";

const config = CALCULATORS_CONFIG.find((c) => c.id === "total-cost-of-ownership")!;

export function TotalCostOfOwnershipCalculator() {
  const [inputs, setInputs] = useState<TcoInputs>(DEFAULT_TCO_INPUTS);

  const handleInputChange = <K extends keyof TcoInputs>(key: K, value: TcoInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_TCO_INPUTS);
  };

  const validation = useMemo(() => validateTcoInputs(inputs), [inputs]);
  const results = useMemo(() => calculateTco(inputs), [inputs]);

  const methodology = {
    formula: `Total Net Cost = Purchase Price + Total Fuel/Energy + Maintenance + Insurance + Expenses - Resale Value
Break-even Period = (EV Purchase Price - ICE Purchase Price) / Annual Operational Cost Difference
Where:
- Total Distance = Annual KM × Ownership Years
- Energy Cost = Total Distance × (Tariff / EV Efficiency)
- Fuel Cost = Total Distance × (Fuel Price / ICE Mileage)`,
    description: "Evaluates comprehensive lifecycle expenditure spanning upfront capital cost, fueling economics, periodic drivetrain servicing, comprehensive insurance premiums, and projected residual salvage value.",
    assumptions: [
      "Electric drivetrains contain ~90% fewer moving parts, drastically lowering scheduled lubricant and brake wear costs.",
      "Resale depreciation curves reflect empirical market resale values for 3 to 7 year old electric vs fossil fuel vehicles in India.",
      "Inflation on electricity and fuel prices is assumed parallel over the assessment tenure.",
    ],
    limitations: [
      "Unforeseen out-of-warranty battery or inverter module replacement costs are modeled as optional inputs.",
      "Comprehensive insurance claims or zero-depreciation endorsements vary based on claims history and NCB tier.",
    ],
  };

  return (
    <CalculatorLayout config={config} onReset={handleReset} methodology={methodology}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Controls Panel */}
        <div className="lg:col-span-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
                <SlidersHorizontal className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">TCO Parameters</h3>
                <p className="text-[11px] text-[#94A3B8]">Compare EV vs Petrol/Diesel lifecycle</p>
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
            {/* Purchase Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorInputField
                id="evPrice"
                label="EV On-Road Price"
                value={inputs.evPurchasePrice}
                onChange={(v) => handleInputChange("evPurchasePrice", v)}
                min={200000}
                max={20000000}
                step={25000}
                prefix="₹"
                helperText="E.g., Nexon EV / ZS EV"
                error={validation.errors.evPurchasePrice}
              />

              <CalculatorInputField
                id="icePrice"
                label="ICE On-Road Price"
                value={inputs.icePurchasePrice}
                onChange={(v) => handleInputChange("icePurchasePrice", v)}
                min={200000}
                max={20000000}
                step={25000}
                prefix="₹"
                helperText="Equivalent Petrol / Diesel"
                error={validation.errors.icePurchasePrice}
              />
            </div>

            {/* Ownership Duration Quick Select */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-[#CBD5E1]">
                <span>Ownership Duration ({inputs.ownershipYears} Years)</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 7, 10].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => handleInputChange("ownershipYears", yr)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      inputs.ownershipYears === yr
                        ? "bg-[#00E676] text-black border-[#00E676] shadow-md shadow-[#00E676]/20"
                        : "bg-white/5 text-[#94A3B8] border-white/10 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

            <CalculatorInputField
              id="annualDistance"
              label="Annual Distance Travelled"
              value={inputs.annualDistanceKm}
              onChange={(v) => handleInputChange("annualDistanceKm", v)}
              min={2000}
              max={100000}
              step={1000}
              unit="km / yr"
              helperText={`Total: ${(inputs.annualDistanceKm * inputs.ownershipYears).toLocaleString("en-IN")} km in ${inputs.ownershipYears} years`}
              error={validation.errors.annualDistanceKm}
            />

            {/* Fuel / Energy Efficiency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CalculatorInputField
                id="evEff"
                label="EV Mileage Efficiency"
                value={inputs.evEfficiencyKmPerKwh}
                onChange={(v) => handleInputChange("evEfficiencyKmPerKwh", v)}
                min={2}
                max={15}
                step={0.1}
                unit="km / kWh"
                helperText="₹/km: ₹{(inputs.electricityTariffPerKwh / inputs.evEfficiencyKmPerKwh).toFixed(2)}"
              />

              <CalculatorInputField
                id="iceEff"
                label="ICE Fuel Mileage"
                value={inputs.iceEfficiencyKmPerLitre}
                onChange={(v) => handleInputChange("iceEfficiencyKmPerLitre", v)}
                min={4}
                max={35}
                step={0.5}
                unit="km / l"
                helperText="₹/km: ₹{(inputs.fuelPricePerLitre / inputs.iceEfficiencyKmPerLitre).toFixed(2)}"
              />
            </div>

            {/* Maintenance & Servicing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorInputField
                id="evMaint"
                label="Annual EV Maintenance"
                value={inputs.annualEvMaintenance}
                onChange={(v) => handleInputChange("annualEvMaintenance", v)}
                min={0}
                max={100000}
                step={1000}
                prefix="₹"
                helperText="Minimal fluids & filters"
              />

              <CalculatorInputField
                id="iceMaint"
                label="Annual ICE Maintenance"
                value={inputs.annualIceMaintenance}
                onChange={(v) => handleInputChange("annualIceMaintenance", v)}
                min={0}
                max={150000}
                step={1000}
                prefix="₹"
                helperText="Engine oil, spark plugs, clutch"
              />
            </div>

            {/* Resale Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorSlider
                id="evResale"
                label="EV Resale Value"
                value={inputs.evResalePercent}
                onChange={(v) => handleInputChange("evResalePercent", v)}
                min={20}
                max={80}
                step={2}
                unit="%"
                accentColor="green"
              />

              <CalculatorSlider
                id="iceResale"
                label="ICE Resale Value"
                value={inputs.iceResalePercent}
                onChange={(v) => handleInputChange("iceResalePercent", v)}
                min={20}
                max={80}
                step={2}
                unit="%"
                accentColor="cyan"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Comprehensive Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Savings Hero Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#00E676]/15 via-black/40 to-[#00D4FF]/10 border border-[#00E676]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E676] flex items-center gap-1.5">
                  <TrendingUp className="size-3.5" />
                  Net Lifetime Financial Advantage
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {results.netLifetimeSavings >= 0 ? "+" : "-"}₹{Math.abs(results.netLifetimeSavings).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Net savings over {inputs.ownershipYears} years across {(inputs.annualDistanceKm * inputs.ownershipYears).toLocaleString("en-IN")} km
                </p>
              </div>

              {results.breakEvenYears !== null && (
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 shrink-0 text-left sm:text-right">
                  <div className="text-xs font-semibold text-[#CBD5E1]">Break-Even Point</div>
                  <div className="text-lg font-mono font-black text-[#00E676] mt-0.5">
                    {results.breakEvenYears} Years
                  </div>
                  <div className="text-[10px] text-[#94A3B8]">
                    At ~{results.breakEvenKm?.toLocaleString("en-IN")} KM
                  </div>
                </div>
              )}
            </div>

            {/* Quick Summary comparison */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-medium text-[#94A3B8] flex items-center gap-1.5">
                  <Zap className="size-3.5 text-[#00E676]" />
                  <span>Total Net EV Cost</span>
                </div>
                <div className="text-2xl font-black text-white mt-1.5">
                  ₹{results.totalNetEvCost.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">₹{Math.round(results.monthlyEvOperatingCost)}/mo running cost</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-medium text-[#94A3B8] flex items-center gap-1.5">
                  <Fuel className="size-3.5 text-rose-400" />
                  <span>Total Net ICE Cost</span>
                </div>
                <div className="text-2xl font-black text-white mt-1.5">
                  ₹{results.totalNetIceCost.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">₹{Math.round(results.monthlyIceOperatingCost)}/mo running cost</p>
              </div>
            </div>
          </div>

          {/* Cumulative Total Comparison Bar */}
          <CalculatorComparisonBar
            title="Total Net Expenditure Comparison"
            subtitle={`Includes purchase price, fuel/energy, maintenance, and insurance, minus resale`}
            items={[
              {
                label: "Electric Vehicle (EV)",
                value: results.totalNetEvCost,
                formattedValue: `₹${results.totalNetEvCost.toLocaleString("en-IN")}`,
                color: "#00E676",
                secondaryText: `₹${results.evRunningCostPerKm.toFixed(2)} / km energy`,
              },
              {
                label: "Petrol / Diesel Vehicle (ICE)",
                value: results.totalNetIceCost,
                formattedValue: `₹${results.totalNetIceCost.toLocaleString("en-IN")}`,
                color: "#F43F5E",
                secondaryText: `₹${results.iceRunningCostPerKm.toFixed(2)} / km fuel`,
              },
            ]}
          />

          {/* Detailed Category Breakdown Table */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-5 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="size-4 text-[#00D4FF]" />
                <span>Lifecycle Cost Category Breakdown</span>
              </h4>
              <p className="text-xs text-[#94A3B8]">Side-by-side comparison across all ownership pillars</p>
            </div>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[#94A3B8]">
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5 text-[#00E676]">EV Amount</th>
                    <th className="py-2.5 text-rose-400">ICE Amount</th>
                    <th className="py-2.5 text-right">EV Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {results.breakdown.map((row, idx) => {
                    const diff = row.iceAmount - row.evAmount;
                    return (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 font-sans font-medium text-white">{row.category}</td>
                        <td className="py-2.5 text-[#00E676] font-semibold">
                          {row.evAmount < 0 ? "-" : ""}₹{Math.abs(row.evAmount).toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 text-rose-400 font-semibold">
                          {row.iceAmount < 0 ? "-" : ""}₹{Math.abs(row.iceAmount).toLocaleString("en-IN")}
                        </td>
                        <td className={`py-2.5 text-right font-bold ${diff >= 0 ? "text-[#00E676]" : "text-rose-400"}`}>
                          {diff >= 0 ? `Save ₹${diff.toLocaleString("en-IN")}` : `+₹${Math.abs(diff).toLocaleString("en-IN")}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}
