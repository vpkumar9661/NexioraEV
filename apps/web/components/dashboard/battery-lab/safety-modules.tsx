"use client";

import { useState } from "react";
import { ShieldAlert, Flame, AlertOctagon, HeartCrack, Ban, LifeBuoy } from "lucide-react";

interface SafetyProtocol {
  id: string;
  title: string;
  icon: typeof ShieldAlert;
  trigger: string;
  action: string;
  desc: string;
  severity: "Critical" | "High" | "Warning";
  color: string;
}

const PROTOCOLS: SafetyProtocol[] = [
  { id: "runaway", title: "Thermal Runaway Containment", icon: Flame, trigger: "Local cell temp > 80°C with rapid temperature rise rate.", action: "Active coolant pumps trigger full speed; venting pyro-fuses separate module links; gas isolation vents activate.", desc: "Exothermic reaction chain where heat triggers further chemical decomposition. Solid state barrier sheets isolate cells to limit propagation.", severity: "Critical", color: "#EF4444" },
  { id: "short", title: "Short Circuit Prevention", icon: AlertOctagon, trigger: "Detection of microsecond impedance drops between terminals.", action: "BMS triggers solid-state pyro switches to isolate the pack in less than 2 milliseconds.", desc: "Caused by metallic lithium dendrites piercing separators or manufacturing cell impurities. Prevented using high-frequency current sensors.", severity: "Critical", color: "#EF4444" },
  { id: "overcharge", title: "Overcharge Voltage Limits", icon: Ban, trigger: "Any cell series node exceeding 4.28V during charging.", action: "BMS opens main charge contactors immediately to cut external current flow.", desc: "Can lead to lithium plating on the anode, thermal instability, and catastrophic casing failures. Dual-layer sensor verification is standard.", severity: "High", color: "#F59E0B" },
  { id: "crash", title: "Crash & Impact Mitigation", icon: HeartCrack, trigger: "Vehicle deceleration exceedances (G-force sensors) or cabin airbag triggers.", action: "Pyro-fuse blows, physically severing the high-voltage bus bar link outside the casing.", desc: "Ensures the chassis remains completely isolated from high-voltage paths, allowing emergency responders to touch the body safely.", severity: "Critical", color: "#EF4444" },
  { id: "fire", title: "Active Fire Suppression", icon: LifeBuoy, trigger: "Presence of particulate carbon-monoxide gases inside casing.", action: "Aerogel insulation blankets isolate cell modules while internal pressure release valves vent smoke.", desc: "Highly stable non-conductive aerogels limit thermal transfer between adjacent cell modules, postponing propagation for hours.", severity: "High", color: "#F59E0B" }
];

export function SafetyModules() {
  const [activeItem, setActiveItem] = useState<SafetyProtocol>(PROTOCOLS[0]!);

  return (
    <section id="safety" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Safety Protocols</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Explore preventative hardware and firmware safeguards built into high-voltage systems</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Navigation list */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {PROTOCOLS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between gap-4 ${
                  isActive
                    ? "bg-white/4"
                    : "bg-white/1 hover:bg-white/2"
                }`}
                style={{ borderColor: isActive ? `${item.color}40` : "rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}25` }}>
                    <Icon className="w-4 h-4 animate-pulse" style={{ color: item.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground/50 block mt-0.5">{item.severity} Protection</span>
                  </div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed action card */}
        <div className="lg:col-span-7 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider">Severity Classification</span>
                <h4 className="text-base font-extrabold text-white mt-1" style={{ color: activeItem.color }}>{activeItem.severity} Trigger Event</h4>
              </div>
            </div>

            <p className="text-sm text-muted-foreground/85 leading-relaxed">{activeItem.desc}</p>

            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-xl bg-red-500/2 border border-red-500/10">
                <span className="text-[10px] text-red-400 font-extrabold uppercase tracking-wider block">Sensor Trigger Condition</span>
                <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">{activeItem.trigger}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-emerald-500/2 border border-emerald-500/10">
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block">Active Mitigation Response</span>
                <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">{activeItem.action}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
