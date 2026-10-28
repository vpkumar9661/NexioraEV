"use client";

import React, { useState, useMemo } from "react";
import { 
  BatteryCharging, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap
} from "lucide-react";
import { 
  CalculatorLayout, 
  CalculatorInputField, 
  CalculatorSlider, 
  CalculatorSelect, 
  CalculatorResultCard 
} from "@/components/calculators";
import { 
  DEFAULT_BATTERY_HEALTH_INPUTS, 
  calculateBatteryHealth, 
  validateBatteryHealthInputs 
} from "@/lib/calculators/battery-health";
import { BatteryHealthInputs } from "@/lib/calculators/types";
import { CALCULATORS_CONFIG } from "@/config/calculators";

const config = CALCULATORS_CONFIG.find((c) => c.id === "battery-health")!;

export function BatteryHealthCalculator() {
  const [inputs, setInputs] = useState<BatteryHealthInputs>(DEFAULT_BATTERY_HEALTH_INPUTS);

  const handleInputChange = <K extends keyof BatteryHealthInputs>(key: K, value: BatteryHealthInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_BATTERY_HEALTH_INPUTS);
  };

  const validation = useMemo(() => validateBatteryHealthInputs(inputs), [inputs]);
  const results = useMemo(() => calculateBatteryHealth(inputs), [inputs]);

  const methodology = {
    formula: `State of Health (SOH %) = (Current Measured Usable Capacity / Original Capacity) × 100
OR (Modelled): 100 - (Calendar Fade + Cycle Aging) × F_temp × F_charging_habit
Where:
- Cycle Aging = (Completed Cycles / Rated Cycles [1500 for NMC, 3000 for LFP]) × 20%
- Calendar Fade = Battery Age (Years) × Annual Degradation Assumption`,
    description: "Evaluates electrochemical cell capacity loss through semi-empirical lithium-ion aging equations incorporating calendar degradation, SEI growth, cyclic depth of discharge, chemistry composition, and ambient thermal stresses.",
    assumptions: [
      "Lithium Iron Phosphate (LFP) delivers ~3,000 equivalent full cycles to 80% SOH; Nickel Manganese Cobalt (NMC) delivers ~1,500 cycles.",
      "Calendar fade follows parabolic time decay, stabilizing after initial electrolyte wetting and forming period.",
      "Excessive high-voltage dwell (holding at 100% SOC) and frequent fast DC charging accelerate capacity fade.",
    ],
    limitations: [
      "Cannot detect internal individual cell imbalances without high-precision OBD-II diagnostic telemetry.",
      "Cold ambient temperatures cause temporary reversible capacity suppression rather than permanent irreversible degradation.",
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
                <h3 className="text-sm font-bold text-white">Diagnostics Input</h3>
                <p className="text-[11px] text-[#94A3B8]">Select method & battery specs</p>
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

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleInputChange("hasMeasuredCapacity", false)}
              className={`py-2 px-3 rounded-xl transition-all ${
                !inputs.hasMeasuredCapacity
                  ? "bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Usage Modeling
            </button>
            <button
              type="button"
              onClick={() => handleInputChange("hasMeasuredCapacity", true)}
              className={`py-2 px-3 rounded-xl transition-all ${
                inputs.hasMeasuredCapacity
                  ? "bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Measured OBD-II
            </button>
          </div>

          <div className="space-y-4">
            <CalculatorInputField
              id="originalCapacity"
              label="Original Factory Capacity"
              value={inputs.originalCapacityKwh}
              onChange={(v) => handleInputChange("originalCapacityKwh", v)}
              min={15}
              max={200}
              step={1}
              unit="kWh"
              helperText="Gross nominal battery capacity when vehicle was new"
              error={validation.errors.originalCapacityKwh}
            />

            {inputs.hasMeasuredCapacity ? (
              <CalculatorInputField
                id="measuredCapacity"
                label="Current Measured Usable Capacity"
                value={inputs.measuredCapacityKwh || 0}
                onChange={(v) => handleInputChange("measuredCapacityKwh", v)}
                min={5}
                max={200}
                step={0.5}
                unit="kWh"
                helperText="Obtained from authorized service center or OBD-II scanner"
                error={validation.errors.measuredCapacityKwh}
              />
            ) : (
              <>
                <CalculatorSlider
                  id="batteryAge"
                  label="Vehicle & Battery Age"
                  value={inputs.batteryAgeYears}
                  onChange={(v) => handleInputChange("batteryAgeYears", v)}
                  min={0.5}
                  max={12}
                  step={0.5}
                  unit="Years"
                  accentColor="cyan"
                  marks={[
                    { value: 1, label: "1 yr" },
                    { value: 3, label: "3 yrs" },
                    { value: 6, label: "6 yrs" },
                    { value: 10, label: "10 yrs" },
                  ]}
                />

                <CalculatorInputField
                  id="cycleCount"
                  label="Estimated Full Charge Cycles"
                  value={inputs.estimatedCycleCount}
                  onChange={(v) => handleInputChange("estimatedCycleCount", v)}
                  min={0}
                  max={5000}
                  step={50}
                  unit="Cycles"
                  helperText="Tip: Total Odometer KM ÷ Real-world full range"
                  error={validation.errors.estimatedCycleCount}
                />

                <CalculatorSelect
                  id="batteryChemistry"
                  label="Cell Chemistry Type"
                  value={inputs.batteryChemistry}
                  onChange={(v) => handleInputChange("batteryChemistry", v)}
                  options={[
                    { value: "lfp", label: "LFP (Lithium Iron Phosphate)", description: "High thermal stability & longevity" },
                    { value: "nmc", label: "NMC (Nickel Manganese Cobalt)", description: "Higher energy density" },
                    { value: "nca", label: "NCA (Nickel Cobalt Aluminum)", description: "Premium long-range density" },
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CalculatorSelect
                    id="chargingHabit"
                    label="Charging Pattern"
                    value={inputs.chargingHabit}
                    onChange={(v) => handleInputChange("chargingHabit", v)}
                    options={[
                      { value: "gentle_ac", label: "Gentle AC Slow" },
                      { value: "mixed", label: "Mixed AC + DC" },
                      { value: "frequent_dc", label: "Frequent DC Fast" },
                    ]}
                  />

                  <CalculatorSelect
                    id="avgTempCategory"
                    label="Operating Climate"
                    value={inputs.avgTempCategory}
                    onChange={(v) => handleInputChange("avgTempCategory", v)}
                    options={[
                      { value: "cool", label: "Cool (< 22°C)" },
                      { value: "moderate", label: "Moderate (22-30°C)" },
                      { value: "hot", label: "Hot Tropics (> 32°C)" },
                    ]}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Health Results & 10-Year Projection */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Health Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalculatorResultCard
              label="State of Health (SOH)"
              value={`${results.sohPercent}%`}
              subValue={inputs.hasMeasuredCapacity ? "Obtained via direct measurement" : "Electrochemical model projection"}
              accent={results.sohPercent >= 84 ? "green" : results.sohPercent >= 75 ? "amber" : "white"}
              icon={<ShieldCheck className="size-4 text-[#00E676]" />}
              badge={{
                text: `${results.healthStatus} Condition`,
                variant: results.sohPercent >= 84 ? "green" : "amber",
              }}
            />

            <CalculatorResultCard
              label="Remaining Pack Capacity"
              value={`${results.remainingCapacityKwh}`}
              unit="kWh"
              subValue={`Originally ${inputs.originalCapacityKwh} kWh`}
              accent="cyan"
              icon={<BatteryCharging className="size-4 text-[#00D4FF]" />}
              badge={{
                text: `${Math.round(results.remainingCapacityKwh * 100 / inputs.originalCapacityKwh)}% Capacity Retained`,
                variant: "cyan",
              }}
            />

            <CalculatorResultCard
              label="Cumulative Capacity Loss"
              value={`${results.capacityLostKwh}`}
              unit="kWh"
              subValue={`${(100 - results.sohPercent).toFixed(1)}% total degradation`}
              accent="white"
              icon={<Clock className="size-4 text-white" />}
              badge={{
                text: `${(results.capacityLostKwh / Math.max(1, inputs.batteryAgeYears)).toFixed(1)} kWh/yr loss`,
                variant: "amber",
              }}
            />
          </div>

          {/* 10-Year Health Projection Timeline */}
          <div className="rounded-3xl bg-white/3 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 space-y-5">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="size-4 text-[#00D4FF]" />
                <span>10-Year Capacity Projection Timeline</span>
              </h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Projected retention based on current degradation velocity and chemistry behavior
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {results.projected10YearTimeline.map((item) => {
                const isCurrent = item.year === Math.round(inputs.batteryAgeYears);
                const isUnderWarranty = item.year <= 8;

                return (
                  <div key={item.year} className="flex items-center gap-3 text-xs">
                    <span className={`w-14 font-mono font-bold ${isCurrent ? "text-[#00E676]" : "text-[#94A3B8]"}`}>
                      {item.year === 0 ? "New" : `Yr ${item.year}`}
                    </span>

                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden flex items-center">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.projectedSohPercent}%`,
                          backgroundColor: item.projectedSohPercent >= 80 ? "#00E676" : item.projectedSohPercent >= 70 ? "#FBBF24" : "#F43F5E",
                          boxShadow: isCurrent ? "0 0 10px #00E676" : "none",
                        }}
                      />
                    </div>

                    <span className="w-16 font-mono text-right font-semibold text-white">
                      {item.projectedSohPercent}%
                    </span>

                    <span className="w-20 text-right text-[10px] text-[#64748B]">
                      {item.projectedCapacityKwh} kWh
                    </span>

                    {isCurrent && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30">
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#94A3B8]">
              <span>Standard OEM Warranty Threshold: <strong>70% SOH at 8 Years / 1,60,000 KM</strong></span>
              <span className="text-[#00E676] font-semibold">
                {results.sohPercent >= 70 ? "Within Warranty Health Standard" : "Eligible for Warranty Review"}
              </span>
            </div>
          </div>

          {/* Actionable Longevity Recommendations */}
          <div className="rounded-3xl bg-linear-to-br from-[#00E676]/5 via-white/2 to-transparent border border-[#00E676]/20 p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E676] flex items-center gap-2">
              <Lightbulb className="size-4" />
              <span>Tailored Battery Longevity Recommendations</span>
            </h4>

            <div className="space-y-2.5">
              {results.recommendations.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                  <CheckCircle2 className="size-4 text-[#00E676] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}

