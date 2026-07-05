"use client";

export function EVArchitecture() {
  return (
    <section id="architecture" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">EV Architecture</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">How energy flows through an Electric Vehicle — from battery to wheel</p>
      </div>

      <div className="rounded-[20px] border border-white/5 bg-white/[0.02] overflow-hidden p-6 sm:p-8 relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] bg-[size:24px_24px]" />

        <svg className="w-full" viewBox="0 0 800 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* --- Node 1: Battery --- */}
          <g transform="translate(20, 30)">
            <rect x="0" y="0" width="120" height="70" rx="14" fill="#131722" stroke="#8B5CF6" strokeWidth="1.5" />
            <rect x="12" y="14" width="96" height="12" rx="4" fill="#8B5CF6" opacity="0.5" />
            <rect x="12" y="32" width="72" height="12" rx="4" fill="#8B5CF6" opacity="0.3" />
            <rect x="12" y="50" width="48" height="12" rx="4" fill="#8B5CF6" opacity="0.15" />
            <text x="60" y="-8" textAnchor="middle" fill="#A78BFA" fontSize="11" fontWeight="bold">Battery Pack</text>
            <text x="60" y="92" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">72 kWh • LFP / NMC</text>
          </g>

          {/* Arrow 1 */}
          <g>
            <line x1="145" y1="65" x2="195" y2="65" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6 3" opacity="0.4">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="1s" repeatCount="indefinite" />
            </line>
            <polygon points="195,58 210,65 195,72" fill="#8B5CF6" opacity="0.6" />
            <text x="178" y="55" textAnchor="middle" fill="#A78BFA" fontSize="8" opacity="0.5">DC</text>
          </g>

          {/* --- Node 2: Inverter/Controller --- */}
          <g transform="translate(215, 30)">
            <rect x="0" y="0" width="120" height="70" rx="14" fill="#131722" stroke="#7C3AED" strokeWidth="1.5" />
            <text x="60" y="32" textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="bold">Inverter</text>
            <text x="60" y="48" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">DC → 3-Phase AC</text>
            <text x="60" y="-8" textAnchor="middle" fill="#C4B5FD" fontSize="11" fontWeight="bold">Controller</text>
            <text x="60" y="92" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">SiC MOSFET • 98%</text>
          </g>

          {/* Arrow 2 */}
          <g>
            <line x1="340" y1="65" x2="390" y2="65" stroke="#7C3AED" strokeWidth="2" strokeDasharray="6 3" opacity="0.4">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.8s" repeatCount="indefinite" />
            </line>
            <polygon points="390,58 405,65 390,72" fill="#7C3AED" opacity="0.6" />
            <text x="373" y="55" textAnchor="middle" fill="#C4B5FD" fontSize="8" opacity="0.5">AC</text>
          </g>

          {/* --- Node 3: Motor --- */}
          <g transform="translate(410, 20)">
            <circle cx="50" cy="45" r="42" fill="#131722" stroke="#A78BFA" strokeWidth="1.5" />
            <circle cx="50" cy="45" r="26" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
            <circle cx="50" cy="45" r="10" fill="#8B5CF6" opacity="0.2" />
            <circle cx="50" cy="45" r="4" fill="#A78BFA" opacity="0.8" />
            <text x="50" y="-3" textAnchor="middle" fill="#A78BFA" fontSize="11" fontWeight="bold">Motor</text>
            <text x="50" y="105" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">PMSM • 200kW</text>
          </g>

          {/* Arrow 3 */}
          <g>
            <line x1="505" y1="65" x2="555" y2="65" stroke="#A78BFA" strokeWidth="2" strokeDasharray="6 3" opacity="0.4">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.9s" repeatCount="indefinite" />
            </line>
            <polygon points="555,58 570,65 555,72" fill="#A78BFA" opacity="0.6" />
          </g>

          {/* --- Node 4: Transmission --- */}
          <g transform="translate(575, 30)">
            <rect x="0" y="0" width="100" height="70" rx="14" fill="#131722" stroke="#06B6D4" strokeWidth="1.5" />
            <text x="50" y="36" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">Single-Speed</text>
            <text x="50" y="52" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">Reduction Gear</text>
            <text x="50" y="-8" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">Transmission</text>
            <text x="50" y="92" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">Ratio 9.7:1</text>
          </g>

          {/* Arrow 4 */}
          <g>
            <line x1="680" y1="65" x2="710" y2="65" stroke="#06B6D4" strokeWidth="2" strokeDasharray="6 3" opacity="0.4">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.1s" repeatCount="indefinite" />
            </line>
            <polygon points="710,58 725,65 710,72" fill="#06B6D4" opacity="0.6" />
          </g>

          {/* --- Node 5: Wheel --- */}
          <g transform="translate(725, 20)">
            <circle cx="30" cy="45" r="35" fill="#07090e" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <circle cx="30" cy="45" r="22" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.3" />
            <circle cx="30" cy="45" r="8" fill="#10B981" opacity="0.3" />
            <text x="30" y="-2" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="bold">Wheel</text>
            <text x="30" y="100" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="9">Torque Output</text>
          </g>

          {/* Regen braking return arrow */}
          <path d="M 735,110 C 735,155 400,160 80,155 L 80,105" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.2">
            <animate attributeName="stroke-dashoffset" values="0;24" dur="2s" repeatCount="indefinite" />
          </path>
          <text x="400" y="170" textAnchor="middle" fill="#6EE7B7" fontSize="9" opacity="0.35">Regenerative Braking — Energy Recovery</text>
        </svg>
      </div>
    </section>
  );
}
