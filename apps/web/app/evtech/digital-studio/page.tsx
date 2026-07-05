"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { 
  TopToolbar, 
  LeftConfigSidebar, 
  RightTelemetrySidebar, 
  CenterTwin, 
  BottomSimulation, 
  AIReports,
  StudioConfig,
  TelemetryData
} from "@/components/dashboard/digital-studio";

export default function DigitalStudioPage() {
  const [projectName, setProjectName] = useState<string>("Nexiora Studio Project v1");
  const [drivingMode, setDrivingMode] = useState<string>("normal");
  
  const [config, setConfig] = useState<StudioConfig>({
    platform: "sedan",
    chemistry: "nmc",
    capacity: 75,
    motor: "pmsm",
    inverter: "sic",
    charging: "150",
    cooling: "liquid",
    suspension: "wishbone",
    braking: "regenerative",
    tires: "performance",
    aero: 0.24
  });

  const handleConfigChange = (updates: Partial<StudioConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Math equations to model vehicle dynamics in real-time
  const telemetry = useMemo<TelemetryData>(() => {
    // 1. Pack Voltage Sizing
    let voltage = 400;
    if (config.chemistry === "solid" || config.inverter === "sic") voltage = 800; // 800V architecture

    // 2. Battery pack and vehicle base weights
    let baseWeight = 1600; // sedan
    if (config.platform === "scooter") baseWeight = 40;
    if (config.platform === "motorcycle") baseWeight = 120;
    if (config.platform === "hatchback") baseWeight = 1100;
    if (config.platform === "suv") baseWeight = 2100;
    if (config.platform === "pickup") baseWeight = 2400;
    if (config.platform === "bus") baseWeight = 9000;
    if (config.platform === "truck") baseWeight = 11000;

    let cellWeightFactor = 5.2; // NMC kg/kWh
    if (config.chemistry === "lfp") cellWeightFactor = 6.5;
    if (config.chemistry === "sodium") cellWeightFactor = 7.2;
    if (config.chemistry === "solid") cellWeightFactor = 3.2;

    const batteryWeight = config.capacity * cellWeightFactor;
    const weight = Math.round(baseWeight + batteryWeight);

    // 3. Telemetry motors outputs
    let baseRPM = 8500;
    let baseTorque = 320;
    let efficiency = 92;

    if (config.motor === "induction") {
      baseRPM = 10000;
      baseTorque = 280;
      efficiency = 90;
    } else if (config.motor === "reluctance") {
      baseRPM = 12000;
      baseTorque = 250;
      efficiency = 88;
    }

    // 4. Driving modes modifiers
    let modeRangeFactor = 1.0;
    let speedFactor = 1.0;
    let currentVal = 180;

    if (drivingMode === "eco") {
      modeRangeFactor = 1.25;
      speedFactor = 0.8;
      currentVal = 110;
    } else if (drivingMode === "sport") {
      modeRangeFactor = 0.85;
      speedFactor = 1.25;
      currentVal = 260;
    } else if (drivingMode === "track") {
      modeRangeFactor = 0.65;
      speedFactor = 1.5;
      currentVal = 340;
    } else if (drivingMode === "towing") {
      modeRangeFactor = 0.75;
      speedFactor = 0.85;
      currentVal = 290;
    }

    const rpm = baseRPM * speedFactor;
    const torque = baseTorque * speedFactor;

    // 5. top speed and acceleration
    let topSpeed = 220; // km/h
    let accel = 5.2; // 0-100 km/h seconds

    if (config.platform === "scooter") {
      topSpeed = 95;
      accel = 9.5;
    } else if (config.platform === "suv") {
      topSpeed = 200;
      accel = 6.8;
    } else if (config.platform === "truck") {
      topSpeed = 120;
      accel = 12.5;
    }

    if (config.motor === "pmsm" && config.inverter === "sic") {
      accel = parseFloat((accel * 0.75).toFixed(1)); // faster switching acceleration
      topSpeed = Math.round(topSpeed * 1.1);
    }

    // 6. Range prediction
    const aeroFactor = 0.24 / config.aero; // lower drag Cd raises range
    const range = Math.round(config.capacity * 6.2 * modeRangeFactor * aeroFactor);

    // 7. Center of gravity
    let cg = "38% Lower Floor";
    if (config.platform === "bus" || config.platform === "truck") cg = "48% Mid Height";

    return {
      voltage,
      current: currentVal,
      temp: 32, // standard cell temperature
      rpm,
      torque,
      efficiency,
      topSpeed,
      accel,
      range,
      weight,
      cg
    };
  }, [config, drivingMode]);

  const handleRename = () => {
    const name = prompt("Enter new project title name:", projectName);
    if (name) setProjectName(name);
  };

  const handleSave = () => {
    alert("Configuration parameters saved to workspace projects cloud.");
  };

  const handleDuplicate = () => {
    setProjectName(projectName + " (Copy)");
    alert("Project duplicate configuration created.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Studio configurations link copied to clipboard.");
  };

  const handleExport = () => {
    alert("Generating engineering configurations diagnostic summary report JSON/PDF logs...");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans overflow-hidden">
      {/* Cyan energy mesh ambient grid glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-[#22D3EE]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb sticky */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <nav className="sticky top-[72px] z-40 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[12px] font-semibold text-[#AEB5C0]/60">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/evtech" className="hover:text-white transition-colors">
              EVTech
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-300 font-bold">Digital EV Engineering Studio™</span>
          </div>
        </nav>
      </div>

      {/* Main Workspace Frame layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
        
        {/* Top Control bar toolbar */}
        <TopToolbar
          projectName={projectName}
          onRename={handleRename}
          onSave={handleSave}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />

        {/* 3-Column Studio Configurator Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Left configurations bar */}
          <LeftConfigSidebar
            config={config}
            onChange={handleConfigChange}
          />

          {/* Center 3D Digital Twin Viewport */}
          <CenterTwin
            platform={config.platform}
            chemistry={config.chemistry}
            motor={config.motor}
            cooling={config.cooling}
            suspension={config.suspension}
          />

          {/* Right Diagnostics data stats */}
          <RightTelemetrySidebar
            telemetry={telemetry}
          />

        </div>

        {/* Bottom panel simulation driving modes and torque graphs */}
        <BottomSimulation
          drivingMode={drivingMode}
          onModeChange={setDrivingMode}
          platform={config.platform}
          motor={config.motor}
        />

        {/* Bottom AI ratings logs and export reports */}
        <AIReports
          config={config}
          telemetry={telemetry}
          onExport={handleExport}
        />

      </main>
    </div>
  );
}
