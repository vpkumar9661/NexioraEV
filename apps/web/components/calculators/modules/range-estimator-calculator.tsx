"use client";

import React, { useState, useMemo } from "react";
import { 
  Gauge, 
  Battery, 
  Wind, 
  Thermometer, 
  Mountain, 
  Car, 
  RotateCcw, 
  SlidersHorizontal,
  Flame,
  Snowflake,
  Activity
} from "lucide-react";
import { 
  CalculatorLayout, 
  CalculatorInputField, 
  CalculatorSlider, 
  CalculatorSelect, 
  CalculatorResultCard, 
  CalculatorComparisonBar 
} from "@/components/calculators";
import { 
  DEFAULT_RANGE_INPUTS, 
  calculateRangeEstimator, 
  validateRangeEstimatorInputs 
} from "@/lib/calculators/range-estimator";
import { RangeEstimatorInputs } from "@/lib/calculators/types";
import { CALCULATORS_CONFIG } from "@/config/calculators";

const config = CALCULATORS_CONFIG.find((c) => c.id === "range-estimator")!;

export function RangeEstimatorCalculator() {
  const [inputs, setInputs] = useState<RangeEstimatorInputs>(DEFAULT_RANGE_INPUTS);

  const handleInputChange = <K extends keyof RangeEstimatorInputs>(key: K, value: RangeEstimatorInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_RANGE_INPUTS);
  };

  const validation = useMemo(() => validateRangeEstimatorInputs(inputs), [inputs]);
  const results = useMemo(() => calculateRangeEstimator(inputs), [inputs]);

  const methodology = {
    formula: `Available Energy (kWh) = Usable Battery Capacity × (Current SOC / 100)
Effective Consumption (kWh/100 km) = Baseline Consumption × F_speed × F_hvac × F_terrain × F_temp × F_profile
Estimated Range (km) = (Available Energy / Effective Consumption) × 100`,
    description: "Estimates realistic drivable range by factoring in quadratic aerodynamic drag at varying cruise speeds, thermal pre-conditioning and cabin climate demands, gravitational elevation resistance, and regenerative energy recovery profiles.",
    assumptions: [
      "Baseline efficiency assumes flat asphalt road in still wind conditions at 60 km/h.",
      "Aerodynamic drag scales quadratically with speed beyond 70 km/h.",
      "Regenerative braking recovers up to 60-70% of deceleration kinetic energy during stop-and-go urban cycles.",
    ],
    limitations: [
      "Extreme headwinds or rain/snow tyre rolling resistance will reduce range further by 10-15%.",
      "Calculated figures are physics-based estimates and do not substitute certified ARAI/WLTP lab test cycles.",
    ],
  };

  return (
    <CalculatorLayout config={config} onReset={handleReset} methodology={methodology}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Controls Panel */}
        <div className="lg:col-span-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                <SlidersHorizontal className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Driving Factors</h3>
                <p className="text-[11px] text-[#94A3B8]">Tune real-time environmental variables</p>
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

          {/* Sliders: Battery & Cruising Speed */}
          <div className="space-y-5">
            <CalculatorSlider
              id="usableCapacity"
              label="Usable Battery Capacity"
              value={inputs.usableCapacityKwh}
              onChange={(v) => handleInputChange("usableCapacityKwh", v)}
              min={15}
              max={120}
              step={1}
              unit="kWh"
              accentColor="cyan"
              marks={[
                { value: 24, label: "24 kWh" },
                { value: 40, label: "40 kWh" },
                { value: 60, label: "60 kWh" },
                { value: 80, label: "80 kWh" },
              ]}
              helperText="Net usable pack capacity (e.g. 40.5 kWh for Nexon EV Long Range)"
            />

            <CalculatorSlider
              id="currentSoc"
              label="Current State of Charge (SOC)"
              value={inputs.currentSocPercent}
              onChange={(v) => handleInputChange("currentSocPercent", v)}
              min={5}
              max={100}
              step={5}
              unit="%"
              accentColor="green"
              marks={[
                { value: 20, label: "20%" },
                { value: 50, label: "50%" },
                { value: 80, label: "80%" },
                { value: 100, label: "100%" },
              ]}
            />

            <CalculatorSlider
              id="averageSpeed"
              label="Average Cruising Speed"
              value={inputs.averageSpeedKmh}
              onChange={(v) => handleInputChange("averageSpeedKmh", v)}
              min={30}
              max={140}
              step={5}
              unit="km/h"
              accentColor="cyan"
              marks={[
                { value: 40, label: "40" },
                { value: 60, label: "60" },
                { value: 90, label: "90" },
                { value: 120, label: "120" },
              ]}
              helperText="Speeds above 80 km/h increase aerodynamic drag substantially"
            />

            <CalculatorSlider
              id="ambientTemp"
              label="Ambient Temperature"
              value={inputs.ambientTempCelsius}
              onChange={(v) => handleInputChange("ambientTempCelsius", v)}
              min={-10}
              max={50}
              step={1}
              unit="°C"
              accentColor="green"
              marks={[
                { value: 0, label: "0°C" },
                { value: 24, label: "24°C" },
                { value: 35, label: "35°C" },
                { value: 45, label: "45°C" },
              ]}
              helperText="Optimal battery chemistry operates best between 20°C and 28°C"
            />
          </div>

          {/* Dropdown Selectors: Profile, HVAC, Terrain */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <CalculatorSelect
              id="drivingProfile"
              label="Driving Profile"
              value={inputs.drivingProfile}
              onChange={(v) => handleInputChange("drivingProfile", v)}
              options={[
                { value: "mixed", label: "Mixed Commute (60% City, 40% Ring Road)" },
                { value: "city", label: "Urban City Only (Frequent Regen Braking)" },
                { value: "highway", label: "Expressway Highway (Sustained High Speed)" },
              ]}
            />

            <CalculatorSelect
              id="hvacLevel"
              label="Air Conditioning / Climate Control"
              value={inputs.hvacLevel}
              onChange={(v) => handleInputChange("hvacLevel", v)}
              options={[
                { value: "moderate", label: "Moderate (Standard 22-24°C Auto AC)" },
                { value: "high", label: "Max / High (Extreme Cooling or Winter Heating)" },
                { value: "off", label: "AC Off (Fan / Natural Ventilation only)" },
              ]}
            />

            <CalculatorSelect
              id="terrain"
              label="Road Elevation & Terrain"
              value={inputs.terrain}
              onChange={(v) => handleInputChange("terrain", v)}
              options={[
                { value: "flat", label: "Flat Plains / City Roads" },
                { value: "mixed", label: "Rolling Hills / Undulating Roads" },
                { value: "hilly", label: "Steep Mountainous Incline / Ghats" },
              ]}
            />

            <CalculatorInputField
              id="baselineEfficiency"
              label="Vehicle Baseline Consumption"
              value={inputs.baselineEfficiencyKwhPer100Km}
              onChange={(v) => handleInputChange("baselineEfficiencyKwhPer100Km", v)}
              min={8}
              max={35}
              step={0.5}
              unit="kWh / 100 km"
              helperText="Manufacturer baseline rating (typical compact EV: 13-16 kWh/100km)"
              error={validation.errors.baselineEfficiencyKwhPer100Km}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Range Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Range Display Hero */}
          <div className="rounded-3xl bg-gradient-to-br from-[#00D4FF]/15 via-black/40 to-[#00E676]/10 border border-[#00D4FF]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] flex items-center gap-1.5">
                  <Activity className="size-3.5" />
                  Estimated Real-World Range
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                    {results.estimatedRemainingRangeKm}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#00E676]">KM</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  At {inputs.currentSocPercent}% SOC with {results.availableEnergyKwh} kWh available energy
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 shrink-0 text-right sm:text-right">
                <div className="text-xs font-semibold text-[#CBD5E1]">Overall Efficiency</div>
                <div className="text-lg font-mono font-black text-[#00E676] mt-0.5">
                  {results.efficiencyKmPerKwh} km / kWh
                </div>
                <div className="text-[11px] text-[#94A3B8]">
                  {results.adjustedConsumptionKwhPer100Km} kWh/100 km
                </div>
              </div>
            </div>

            {/* City vs Highway quick breakdown */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-medium text-[#94A3B8] flex items-center gap-1.5">
                  <Car className="size-3.5 text-[#00E676]" />
                  <span>City Range (Stop & Go)</span>
                </div>
                <div className="text-2xl font-black text-white mt-1.5">
                  {results.estimatedCityRangeKm} <span className="text-xs font-semibold text-[#00E676]">KM</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">Assisted by regenerative braking</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-medium text-[#94A3B8] flex items-center gap-1.5">
                  <Wind className="size-3.5 text-cyan-400" />
                  <span>Expressway Range</span>
                </div>
                <div className="text-2xl font-black text-white mt-1.5">
                  {results.estimatedHighwayRangeKm} <span className="text-xs font-semibold text-cyan-400">KM</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">Reduced by aerodynamic drag</p>
              </div>
            </div>
          </div>

          {/* Range Sensitivity Penalties */}
          <CalculatorComparisonBar
            title="Range Sensitivity Breakdown"
            subtitle="Estimated kilometer reduction relative to optimal laboratory conditions"
            items={[
              {
                label: `Cruising Speed Penalty (${inputs.averageSpeedKmh} km/h)`,
                value: results.speedImpactKm,
                formattedValue: `-${results.speedImpactKm}`,
                color: "#F43F5E",
                secondaryText: "Aerodynamic resistance",
              },
              {
                label: `Climate Control Load (${inputs.hvacLevel} AC)`,
                value: results.hvacImpactKm,
                formattedValue: `-${results.hvacImpactKm}`,
                color: "#FB923C",
                secondaryText: "Thermal compressor draw",
              },
              {
                label: `Elevation / Terrain Factor (${inputs.terrain})`,
                value: results.terrainImpactKm,
                formattedValue: `-${results.terrainImpactKm}`,
                color: "#FBBF24",
                secondaryText: "Gravitational resistance",
              },
              {
                label: `Temperature Deviation (${inputs.ambientTempCelsius}°C)`,
                value: results.tempImpactKm,
                formattedValue: `-${results.tempImpactKm}`,
                color: "#38BDF8",
                secondaryText: "Electrochemical impedance",
              },
            ]}
            unit="KM"
          />

          {/* Driving Tip Advice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 space-y-1.5 text-xs">
              <span className="font-bold text-[#00E676] flex items-center gap-1">
                <Gauge className="size-3.5" />
                <span>Sweet Spot Cruising</span>
              </span>
              <p className="text-[#94A3B8]">
                Maintaining cruising speeds between 60 to 75 km/h rather than 100+ km/h can extend highway range by up to 25% due to reduced wind resistance.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 space-y-1.5 text-xs">
              <span className="font-bold text-[#00D4FF] flex items-center gap-1">
                <Thermometer className="size-3.5" />
                <span>Pre-conditioning</span>
              </span>
              <p className="text-[#94A3B8]">
                Pre-cooling or pre-heating the cabin while the vehicle is plugged into the wall charger saves valuable battery charge for driving range.
              </p>
            </div>
          </div>

        </div>

      </div>
    </CalculatorLayout>
  );
}

