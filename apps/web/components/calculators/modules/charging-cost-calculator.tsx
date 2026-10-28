"use client";

import React, { useState, useMemo } from "react";
import { 
  Zap, 
  BatteryCharging, 
  IndianRupee, 
  Fuel, 
  Clock, 
  Leaf, 
  TrendingUp, 
  SlidersHorizontal,
  RotateCcw
} from "lucide-react";
import { 
  CalculatorLayout, 
  CalculatorInputField, 
  CalculatorSlider, 
  CalculatorResultCard, 
  CalculatorComparisonBar 
} from "@/components/calculators";
import { 
  DEFAULT_CHARGING_COST_INPUTS, 
  calculateChargingCost, 
  validateChargingCostInputs 
} from "@/lib/calculators/charging-cost";
import { ChargingCostInputs } from "@/lib/calculators/types";
import { CALCULATORS_CONFIG } from "@/config/calculators";

const config = CALCULATORS_CONFIG.find((c) => c.id === "charging-cost")!;

export function ChargingCostCalculator() {
  const [inputs, setInputs] = useState<ChargingCostInputs>(DEFAULT_CHARGING_COST_INPUTS);

  const handleInputChange = <K extends keyof ChargingCostInputs>(key: K, value: ChargingCostInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_CHARGING_COST_INPUTS);
  };

  const validation = useMemo(() => validateChargingCostInputs(inputs), [inputs]);
  const results = useMemo(() => calculateChargingCost(inputs), [inputs]);

  const methodology = {
    formula: `Required Energy (kWh) = Battery Capacity × (Target SOC - Current SOC) / 100
Grid Energy Consumed = Required Energy / (Efficiency / 100)
Charging Session Cost = Grid Energy × Electricity Tariff (₹/kWh)
EV Cost / km = Tariff / EV Efficiency
ICE Cost / km = Fuel Price / ICE Mileage
Net Savings = (ICE Cost / km - EV Cost / km) × Distance`,
    description: "Calculates realistic charging cost based on thermal and internal resistance transmission losses, comparing direct electric operating costs against current petrol or diesel fuel tariffs.",
    assumptions: [
      "AC Level 2 home charging efficiency is assumed at 88-92% due to AC-DC onboard conversion losses.",
      "Electricity tariff includes base slab, fixed demand charges, and local electricity duty.",
      "Fuel prices and vehicle fuel efficiencies reflect real-world city and highway driving averages.",
    ],
    limitations: [
      "Public DC fast charging hubs frequently levy convenience, slot booking, or demand surge surcharges (often ₹18-24/kWh) not reflected in standard home grid tariffs.",
      "High ambient temperatures or pre-conditioning can alter battery absorption rates and charging times.",
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
                <h3 className="text-sm font-bold text-white">Parameters</h3>
                <p className="text-[11px] text-[#94A3B8]">Adjust variables to recalculate</p>
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

          {/* Section: Battery & State of Charge */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E676] flex items-center gap-1.5">
              <Zap className="size-3.5" />
              <span>Battery & Session Specs</span>
            </h4>

            <CalculatorInputField
              id="batteryCapacity"
              label="Battery Pack Capacity"
              value={inputs.batteryCapacityKwh}
              onChange={(v) => handleInputChange("batteryCapacityKwh", v)}
              min={10}
              max={200}
              step={1}
              unit="kWh"
              helperText="E.g., 30.2 kWh (Nexon.ev), 60 kWh (Atto 3 / Ioniq 5)"
              error={validation.errors.batteryCapacityKwh}
            />

            <CalculatorSlider
              id="currentSoc"
              label="Starting Charge (Current SOC)"
              value={inputs.currentSocPercent}
              onChange={(v) => handleInputChange("currentSocPercent", v)}
              min={0}
              max={100}
              step={5}
              unit="%"
              accentColor="cyan"
              marks={[
                { value: 10, label: "10%" },
                { value: 20, label: "20%" },
                { value: 50, label: "50%" },
                { value: 80, label: "80%" },
              ]}
            />

            <CalculatorSlider
              id="targetSoc"
              label="Target Charge (Target SOC)"
              value={inputs.targetSocPercent}
              onChange={(v) => handleInputChange("targetSocPercent", v)}
              min={10}
              max={100}
              step={5}
              unit="%"
              accentColor="green"
              marks={[
                { value: 50, label: "50%" },
                { value: 80, label: "80%" },
                { value: 90, label: "90%" },
                { value: 100, label: "100%" },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorInputField
                id="chargingEfficiency"
                label="Charging Efficiency"
                value={inputs.chargingEfficiencyPercent}
                onChange={(v) => handleInputChange("chargingEfficiencyPercent", v)}
                min={70}
                max={99}
                step={1}
                unit="%"
                helperText="AC home charging ~90%"
                error={validation.errors.chargingEfficiencyPercent}
              />
              <CalculatorInputField
                id="chargerPower"
                label="Charger Power"
                value={inputs.chargerPowerKw}
                onChange={(v) => handleInputChange("chargerPowerKw", v)}
                min={1}
                max={150}
                step={0.1}
                unit="kW"
                helperText="3.3 kW socket or 7.4 kW wallbox"
                error={validation.errors.chargerPowerKw}
              />
            </div>
          </div>

          {/* Section: Tariffs & Fuel Comparison */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] flex items-center gap-1.5">
              <IndianRupee className="size-3.5" />
              <span>Tariff & Comparison Model</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorInputField
                id="electricityTariff"
                label="Electricity Tariff"
                value={inputs.electricityTariffPerKwh}
                onChange={(v) => handleInputChange("electricityTariffPerKwh", v)}
                min={1}
                max={40}
                step={0.5}
                prefix="₹"
                unit="/ kWh"
                helperText="Home grid average ₹7 - ₹10"
                error={validation.errors.electricityTariffPerKwh}
              />
              <CalculatorInputField
                id="evEfficiency"
                label="EV Mileage Efficiency"
                value={inputs.evEfficiencyKmPerKwh}
                onChange={(v) => handleInputChange("evEfficiencyKmPerKwh", v)}
                min={2}
                max={12}
                step={0.1}
                unit="km / kWh"
                helperText="Standard EV gives 6 to 8 km/kWh"
                error={validation.errors.evEfficiencyKmPerKwh}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorInputField
                id="fuelPrice"
                label="Comparable Fuel Price"
                value={inputs.fuelPricePerLitre}
                onChange={(v) => handleInputChange("fuelPricePerLitre", v)}
                min={50}
                max={200}
                step={1}
                prefix="₹"
                unit="/ litre"
                helperText="Petrol / Diesel"
                error={validation.errors.fuelPricePerLitre}
              />
              <CalculatorInputField
                id="iceEfficiency"
                label="Comparable ICE Mileage"
                value={inputs.iceEfficiencyKmPerLitre}
                onChange={(v) => handleInputChange("iceEfficiencyKmPerLitre", v)}
                min={5}
                max={40}
                step={0.5}
                unit="km / l"
                helperText="Typical car ~14 to 17 km/l"
                error={validation.errors.iceEfficiencyKmPerLitre}
              />
            </div>

            <CalculatorInputField
              id="dailyDistance"
              label="Daily Commute Distance"
              value={inputs.dailyDistanceKm}
              onChange={(v) => handleInputChange("dailyDistanceKm", v)}
              min={5}
              max={500}
              step={5}
              unit="km / day"
              helperText="Used to project monthly & annual savings"
              error={validation.errors.dailyDistanceKm}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Comparison Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Hero Session Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CalculatorResultCard
              label="Charging Session Cost"
              value={`₹${results.estimatedChargingCost.toLocaleString("en-IN")}`}
              subValue={`${inputs.currentSocPercent}% to ${inputs.targetSocPercent}% SOC`}
              accent="green"
              icon={<Zap className="size-4 text-[#00E676]" />}
              badge={{
                text: `${results.gridEnergyConsumedKwh} kWh from grid`,
                variant: "green",
              }}
            />

            <CalculatorResultCard
              label="Est. Charging Duration"
              value={`${results.estimatedChargingDurationHours}`}
              unit="Hours"
              subValue={`With ${inputs.chargerPowerKw} kW output`}
              accent="cyan"
              icon={<Clock className="size-4 text-[#00D4FF]" />}
              badge={{
                text: `${results.requiredBatteryEnergyKwh} kWh into pack`,
                variant: "cyan",
              }}
            />

            <CalculatorResultCard
              label="Running Cost per KM"
              value={`₹${results.evCostPerKm.toFixed(2)}`}
              unit="/ km"
              subValue={`vs ₹${results.iceCostPerKm.toFixed(2)} / km for petrol`}
              accent="green"
              icon={<TrendingUp className="size-4 text-[#00E676]" />}
              badge={{
                text: `${Math.round(((results.iceCostPerKm - results.evCostPerKm) / results.iceCostPerKm) * 100)}% Cheaper`,
                variant: "emerald",
              }}
            />
          </div>

          {/* Running Cost Comparison Bar */}
          <CalculatorComparisonBar
            title="Running Cost Comparison (Per 100 KM)"
            subtitle="Calculated on specified electricity tariff vs current fuel price"
            items={[
              {
                label: "Electric Vehicle (EV)",
                value: Math.round(results.evCostPerKm * 100),
                formattedValue: `₹${Math.round(results.evCostPerKm * 100)}`,
                color: "#00E676",
                secondaryText: `₹${results.evCostPerKm.toFixed(2)} per km`,
              },
              {
                label: "Petrol / Diesel Vehicle (ICE)",
                value: Math.round(results.iceCostPerKm * 100),
                formattedValue: `₹${Math.round(results.iceCostPerKm * 100)}`,
                color: "#F43F5E",
                secondaryText: `₹${results.iceCostPerKm.toFixed(2)} per km`,
              },
            ]}
          />

          {/* Projected Savings Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#00E676]/10 via-black/40 to-[#00D4FF]/10 border border-[#00E676]/20 p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E676]">
                  Commute Savings Projections
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Save ₹{results.annualSavings.toLocaleString("en-IN")} / year
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Based on your daily commute of {inputs.dailyDistanceKm} km ({inputs.dailyDistanceKm * 365} km/yr)
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/50 border border-white/10 shrink-0">
                <Leaf className="size-5 text-[#00E676]" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {results.co2SavedKgPerYear.toLocaleString("en-IN")} kg CO₂
                  </div>
                  <div className="text-[10px] text-[#94A3B8]">Annual Carbon Offset</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">Daily EV Cost</div>
                <div className="text-base font-bold text-white mt-1">₹{results.dailyEvTripCost}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">Daily Petrol Cost</div>
                <div className="text-base font-bold text-rose-400 mt-1">₹{results.dailyIceTripCost}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">Monthly Savings</div>
                <div className="text-base font-bold text-[#00E676] mt-1">
                  ₹{results.monthlySavings.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">Annual Savings</div>
                <div className="text-base font-bold text-[#00D4FF] mt-1">
                  ₹{results.annualSavings.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Explanatory Banner */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex items-start gap-3 text-xs text-[#94A3B8]">
            <BatteryCharging className="size-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Pro Tip:</strong> Setting home charging schedules during off-peak Time-of-Day (ToD) tariff windows (11 PM - 6 AM) can reduce your charging cost by an additional 15% to 25% in states with time-varying power pricing.
            </p>
          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}

