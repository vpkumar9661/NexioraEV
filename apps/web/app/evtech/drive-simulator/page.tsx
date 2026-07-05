"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { 
  PreStartHeader, 
  EnvironmentSelector,
  WeatherModes,
  TelemetryHud,
  PhysicsViewport,
  EndReport,
  SimulatorSetup,
  DrivingEnvironment,
  WeatherEngine,
  TelemetryData
} from "@/components/dashboard/drive-simulator";

export default function DriveSimulatorPage() {
  const [stage, setStage] = useState<"prestart" | "driving" | "report">("prestart");
  const [drivingMode, setDrivingMode] = useState<string>("normal");
  
  const [setup, setSetup] = useState<SimulatorSetup>({
    platform: "sedan",
    chemistry: "nmc",
    capacity: 75,
    motor: "pmsm",
    cooling: "liquid",
    suspension: "wishbone"
  });

  const [selectedEnv, setSelectedEnv] = useState<DrivingEnvironment>({
    id: "city",
    name: "City Driving",
    desc: "Urban traffic congestion, stoplights, low speeds. Ideal for regenerative braking recapture tests.",
    ambientTemp: 25,
    dragCoeff: 1.0,
    grip: 1.0,
    iconColor: "#3B82F6"
  });

  const [weather, setWeather] = useState<WeatherEngine>({
    temp: 25,
    humidity: 50,
    road: "dry"
  });

  const handleWeatherChange = (updates: Partial<WeatherEngine>) => {
    setWeather((prev) => ({ ...prev, ...updates }));
  };

  // Driving session runtime states
  const [speed, setSpeed] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0); // in seconds
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [energyConsumed, setEnergyConsumed] = useState<number>(0); // in kWh
  const [regenRecovered, setRegenRecovered] = useState<number>(0); // in kWh
  
  const [tempCells, setTempCells] = useState<number>(25);
  const [tempMotor, setTempMotor] = useState<number>(25);
  const [tempInverter, setTempInverter] = useState<number>(25);
  const [soc, setSoc] = useState<number>(100);

  const [isAccelerating, setIsAccelerating] = useState<boolean>(false);
  const [isBraking, setIsBraking] = useState<boolean>(false);

  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>("Maintain constant throttle to optimize energy transfer efficiency.");

  // Link weather temperature to environment default initially
  const handleEnvSelect = (env: DrivingEnvironment) => {
    setSelectedEnv(env);
    setWeather((prev) => ({ ...prev, temp: env.ambientTemp }));
  };

  // Main active physics simulation loop
  useEffect(() => {
    if (stage !== "driving") return;

    const interval = setInterval(() => {
      // 1. Time ticks
      setDuration((d) => d + 1);

      // 2. Adjust speeds based on user pedal inputs
      let nextSpeed = speed;
      let powerDraw = 2; // idle auxiliary draw (kW)

      if (isAccelerating) {
        let maxLimit = 220; // km/h
        if (setup.platform === "scooter") maxLimit = 90;
        if (setup.platform === "bus" || setup.platform === "truck") maxLimit = 120;

        nextSpeed = Math.min(maxLimit, speed + 4.5 * selectedEnv.grip);
        powerDraw = (nextSpeed * 1.5) * selectedEnv.dragCoeff; // kW draw
        
        // Temperatures climb under power draw
        setTempCells((t) => Math.min(65, t + 0.15));
        setTempMotor((t) => Math.min(125, t + 0.35));
        setTempInverter((t) => Math.min(105, t + 0.25));
      } else if (isBraking) {
        nextSpeed = Math.max(0, speed - 12);
        // Regen braking recovery (kW)
        if (speed > 5) {
          const recoveryRate = speed * 0.8;
          setRegenRecovered((r) => r + (recoveryRate / 3600)); // convert kWs to kWh
          setSoc((s) => Math.min(100, s + (recoveryRate / 36000)));
        }
        
        setTempMotor((t) => Math.max(weather.temp, t - 0.1));
      } else {
        // Coasting deceleration (wind friction)
        nextSpeed = Math.max(0, speed - 1.2 * selectedEnv.dragCoeff);
        setTempMotor((t) => Math.max(weather.temp, t - 0.05));
        setTempInverter((t) => Math.max(weather.temp, t - 0.05));
      }

      setSpeed(parseFloat(nextSpeed.toFixed(1)));
      if (nextSpeed > maxSpeed) setMaxSpeed(Math.round(nextSpeed));

      // 3. Accumulate travel metrics
      const deltaDistance = (nextSpeed / 3600); // km traveled in 1 second
      setDistance((d) => d + deltaDistance);

      // 4. Energy drain calculations
      if (powerDraw > 0) {
        const deltaEnergy = (powerDraw / 3600); // kWh consumed in 1 second
        setEnergyConsumed((e) => e + deltaEnergy);
        
        // SOC decrease
        const socDelta = (deltaEnergy / setup.capacity) * 100;
        setSoc((s) => Math.max(0, parseFloat((s - socDelta).toFixed(3))));
      }

      // Automatically terminate simulation if battery dies
      if (soc <= 0) {
        setStage("report");
      }

    }, 100);

    return () => clearInterval(interval);
  }, [stage, speed, isAccelerating, isBraking, setup, selectedEnv, weather]);

  // Telemetry updates calculation mapping
  const telemetry = useMemo<TelemetryData>(() => {
    let baseVolts = setup.chemistry === "solid" ? 800 : 400;
    
    // Voltage sag under high speed draw
    const sag = (speed / 260) * 45;
    const voltage = Math.round(baseVolts - sag);

    // Current draw (Amps) = Power (Watts) / Voltage
    let powerKw = 2;
    if (isAccelerating) powerKw = (speed * 1.5) * selectedEnv.dragCoeff;
    const current = Math.round((powerKw * 1000) / voltage);

    const range = Math.round((soc / 100) * (setup.capacity * 5.8));
    const rpm = Math.round(speed * 62);
    const torque = isAccelerating ? 290 : isBraking ? -180 : 0;
    const efficiencyScore = speed > 130 ? 70 : speed > 0 ? 94 : 100;

    return {
      speed,
      rpm,
      torque,
      power: parseFloat(powerKw.toFixed(1)),
      soc: Math.round(soc),
      range,
      voltage,
      current,
      tempCells: Math.round(tempCells),
      tempMotor: Math.round(tempMotor),
      tempInverter: Math.round(tempInverter),
      regenRecovered,
      efficiencyScore
    };
  }, [speed, soc, setup, isAccelerating, isBraking, selectedEnv, tempCells, tempMotor, tempInverter, regenRecovered]);

  // Active cooling system state (trigger cooling fan if cells exceed 40°C)
  const coolingActive = tempCells > 40;

  // Engineering alert queues & AI coaching overlays
  useEffect(() => {
    if (stage !== "driving") return;

    if (tempCells > 42) {
      setCurrentEvent("High thermal warning on pack cells. Active liquid radiator cooling loop activated.");
      setAiAdvice("Switch to Eco driving mode to lower direct current draws and stabilize cell temperature.");
    } else if (isBraking && speed > 20) {
      setCurrentEvent("Regenerative kinetic energy recovery loop active. Redirecting DC charge back into pack cells.");
      setAiAdvice("Excellent braking style. Gradual coasting maximizes regenerative energy recovered.");
    } else if (speed > 140) {
      setCurrentEvent("High aerodynamic drag and power draw detected. Fast acceleration reducing range values.");
      setAiAdvice("Aerodynamic resistance scales cubically with speed. Limit cruising to under 110 km/h to conserve range.");
    } else {
      setCurrentEvent(null);
      setAiAdvice("Maintain constant throttle limits to maximize inverter conversion efficiency.");
    }
  }, [stage, tempCells, isBraking, speed]);

  const handleLaunch = () => {
    // Reset all parameters
    setSpeed(0);
    setDistance(0);
    setDuration(0);
    setMaxSpeed(0);
    setEnergyConsumed(0);
    setRegenRecovered(0);
    setTempCells(weather.temp);
    setTempMotor(weather.temp);
    setTempInverter(weather.temp);
    setSoc(100);
    
    setStage("driving");
  };

  const handleRestart = () => {
    setStage("prestart");
  };

  const handleConfigChange = () => {
    // Prompt to redirect back to Digital EV Studio
    alert("Navigating back to the Digital EV Studio configuration workbench...");
    window.location.href = "/evtech/digital-studio";
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans overflow-hidden">
      {/* Cyan proving grounds mesh background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-[#22D3EE]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb navigation */}
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
            <span className="text-cyan-300 font-bold">NexioraEV Drive Simulator™</span>
          </div>
        </nav>
      </div>

      {/* Main controller workspace */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
        
        {stage === "prestart" && (
          <>
            {/* Summary Setup */}
            <PreStartHeader
              setup={setup}
              onLaunch={handleLaunch}
              onConfigChange={handleConfigChange}
            />

            {/* Selection of environment */}
            <EnvironmentSelector
              selectedEnv={selectedEnv}
              onSelect={handleEnvSelect}
            />

            {/* Weather sliders & driving mode tabs */}
            <WeatherModes
              weather={weather}
              onWeatherChange={handleWeatherChange}
              drivingMode={drivingMode}
              onModeChange={setDrivingMode}
            />
          </>
        )}

        {stage === "driving" && (
          <>
            {/* Live driving toolbar */}
            <div className="w-full p-4 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md flex items-center justify-between z-20">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#AEB5C0]/40 font-bold uppercase block tracking-wider">Active Proving Grounds:</span>
                <strong className="text-white uppercase">{selectedEnv.name}</strong>
              </div>
              <button
                onClick={() => setStage("report")}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                End Proving Run
              </button>
            </div>

            {/* Telemetry counters */}
            <TelemetryHud
              telemetry={telemetry}
              coolingActive={coolingActive}
            />

            {/* Scrolling proving road viewport */}
            <PhysicsViewport
              speed={speed}
              onAccelerate={setIsAccelerating}
              onBrake={setIsBraking}
              currentEvent={currentEvent}
              aiAdvice={aiAdvice}
            />
          </>
        )}

        {stage === "report" && (
          <EndReport
            distance={distance}
            duration={duration}
            maxSpeed={maxSpeed}
            energyConsumed={energyConsumed}
            regenRecovered={regenRecovered}
            onRestart={handleRestart}
          />
        )}

      </main>
    </div>
  );
}
