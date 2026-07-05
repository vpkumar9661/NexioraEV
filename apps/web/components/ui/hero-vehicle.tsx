"use client";

import React, { useEffect, useRef, useState } from "react";

export function HeroVehicle() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Slow interpolated coordinates for subtle parallax offset
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setCoords({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 2 & 3 & 4: Deep Ambient Lights & Mesh Gradients */}
      <div className="absolute right-[-15%] top-[-10%] w-[750px] h-[750px] rounded-full bg-radial-gradient from-[#00D26A]/12 to-transparent blur-[140px] opacity-70" />
      <div className="absolute right-[15%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-radial-gradient from-[#00E5FF]/10 to-transparent blur-[120px] opacity-60" />
      <div className="absolute right-[-5%] top-[25%] w-[500px] h-[500px] rounded-full bg-radial-gradient from-[#3B82F6]/10 to-transparent blur-[110px] opacity-50" />

      {/* Skateboard Perspective Garage Grid */}
      <div 
        className="absolute bottom-[2%] right-[-15%] w-[900px] h-[340px] opacity-35"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 255, 136, 0.12) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(0, 255, 136, 0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "45px 45px",
          transform: "perspective(600px) rotateX(72deg) translateZ(0)",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)"
        }}
      />

      {/* Holographic Radar rings */}
      <div 
        className="absolute bottom-[8%] right-[10%] w-[600px] h-[220px] border border-[#00E5FF]/15 rounded-full opacity-25"
        style={{
          transform: "perspective(600px) rotateX(72deg) scale(1.1)",
          boxShadow: "0 0 40px rgba(0, 229, 255, 0.1), inset 0 0 40px rgba(0, 229, 255, 0.05)"
        }}
      />

      {/* Layer 5: Interactive Holographic Wireframe EV Vehicle */}
      <div 
        className="absolute right-[-5%] lg:right-[3%] top-[10%] lg:top-[12%] w-[680px] h-[380px] flex items-center justify-center transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${coords.x * 22}px, ${coords.y * 14}px, 0) rotateY(${coords.x * 4.5}deg) rotateX(${-coords.y * 3.5}deg) scale(1.02)`,
          transformStyle: "preserve-3d"
        }}
      >
        <svg 
          viewBox="0 0 850 400" 
          className="w-full h-full drop-shadow-[0_0_35px_rgba(0,255,136,0.18)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Holographic glowing borders */}
            <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="wheels-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00D26A" stopOpacity="0.4" />
            </linearGradient>

            {/* Sweep light reflections gradient */}
            <linearGradient id="laser-beam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
            </linearGradient>

            {/* Reflection light sweep animation mask */}
            <linearGradient id="reflection-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="35%" stopColor="white" stopOpacity="0.05" />
              <stop offset="50%" stopColor="white" stopOpacity="0.45" />
              <stop offset="65%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
            
            {/* Filter for glow */}
            <filter id="neon-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <style>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -40;
              }
            }
            .flow-line {
              stroke-dasharray: 8, 12;
              animation: dash 2.5s linear infinite;
            }
            @keyframes sweep {
              0% { transform: translateX(-400px) skewX(-20deg); opacity: 0; }
              10% { opacity: 0.8; }
              40% { opacity: 0.8; }
              60% { transform: translateX(800px) skewX(-20deg); opacity: 0; }
              100% { transform: translateX(800px) skewX(-20deg); opacity: 0; }
            }
            .light-reflection {
              animation: sweep 8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
            }
            @keyframes pulse-cells {
              0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 2px rgba(0, 255, 136, 0.2)); }
              50% { opacity: 0.95; filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.7)); }
            }
            .battery-cell {
              animation: pulse-cells 3s ease-in-out infinite;
            }
            @keyframes rotate-spoke {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .spokes {
              transform-origin: center;
              animation: rotate-spoke 18s linear infinite;
            }
            @keyframes vehicle-float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(0.4deg); }
            }
            .floating-chassis {
              animation: vehicle-float 6s ease-in-out infinite;
            }
          `}</style>

          {/* LASER Headlight Beam projecting forward */}
          <polygon points="190,230 40,210 20,290" fill="url(#laser-beam)" />
          <line x1="190" y1="230" x2="30" y2="220" stroke="#00E5FF" strokeWidth="1.2" opacity="0.6" />
          <line x1="188" y1="232" x2="20" y2="260" stroke="#00FF88" strokeWidth="1.2" opacity="0.4" />

          {/* Main Floating Vehicle chassis body */}
          <g className="floating-chassis">
            {/* Glowing outer wireframe outline */}
            <path 
              d="M 160,240 
                 C 170,185 240,165 310,135 
                 C 400,95 530,95 620,135 
                 C 670,160 720,180 750,225
                 L 770,250
                 C 740,270 700,270 670,270
                 C 655,245 635,230 600,230
                 C 565,230 545,245 530,270
                 L 320,270
                 C 305,245 285,230 250,230
                 C 215,230 195,245 180,270
                 C 165,270 155,260 160,240 Z" 
              stroke="url(#neon-glow)" 
              strokeWidth="2.8" 
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neon-blur)"
            />

            {/* Premium holographic glass reflection overlay */}
            <path 
              className="light-reflection"
              d="M 165,238 C 240,163 310,133 390,120 L 400,270 Z" 
              fill="url(#reflection-sweep)" 
            />

            {/* Skateboard battery tray framework */}
            <rect x="315" y="260" width="220" height="15" rx="4" stroke="#00FF88" strokeWidth="1.8" opacity="0.6" />
            
            {/* Battery Cells pulsing inside the skateboard bottom */}
            {Array.from({ length: 9 }).map((_, i) => (
              <rect 
                key={i}
                className="battery-cell"
                x={325 + i * 23} 
                y="263" 
                width="16" 
                height="9" 
                rx="2.5" 
                fill="#00FF88" 
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}

            {/* Skateboard chassis wiring/connections */}
            <path d="M 250,265 L 315,265 M 535,265 L 600,265" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

            {/* Windshield & Cabin Roof arches */}
            <path d="M 330,132 C 400,105 480,105 530,122" stroke="#00E5FF" strokeWidth="1.8" opacity="0.75" />
            <path d="M 390,138 C 440,118 500,118 535,138" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" />
            <path d="M 460,110 L 460,260" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1.2" />

            {/* Window pillars */}
            <line x1="330" y1="132" x2="350" y2="240" stroke="url(#neon-glow)" strokeWidth="1.5" opacity="0.5" />
            <line x1="590" y1="140" x2="570" y2="245" stroke="url(#neon-glow)" strokeWidth="1.5" opacity="0.5" />

            {/* Futuristic neon side-character contour lines */}
            <path d="M 200,210 C 300,185 450,185 580,210" stroke="url(#neon-glow)" strokeWidth="1.5" opacity="0.4" />
            <path d="M 180,230 C 280,205 480,205 600,230" stroke="#00E5FF" strokeWidth="1.2" opacity="0.5" />
            <path d="M 310,135 C 380,165 420,195 440,240" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1.2" />

            {/* Flowing Energy Dashed Particle Lines */}
            <path className="flow-line" d="M 310,265 C 310,245 285,235 250,235" stroke="#00FF88" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path className="flow-line" d="M 540,265 C 540,245 565,235 600,235" stroke="#00E5FF" strokeWidth="1.5" fill="none" opacity="0.8" />

            {/* Tail Light Neon laser strip */}
            <path d="M 748,223 C 758,235 765,245 770,250" stroke="#FF3B30" strokeWidth="3" filter="url(#neon-blur)" opacity="0.85" />
          </g>

          {/* Front Wheel Hub & Spokes (Left) */}
          <g transform="translate(250, 270)">
            <circle r="42" stroke="url(#wheels-glow)" strokeWidth="2.2" opacity="0.3" />
            <circle r="36" stroke="url(#wheels-glow)" strokeWidth="1.5" />
            <g className="spokes">
              {Array.from({ length: 6 }).map((_, i) => (
                <line 
                  key={i}
                  x1="0" 
                  y1="0" 
                  x2={parseFloat((36 * Math.cos((i * Math.PI) / 3)).toFixed(4))} 
                  y2={parseFloat((36 * Math.sin((i * Math.PI) / 3)).toFixed(4))} 
                  stroke="url(#wheels-glow)" 
                  strokeWidth="1.8" 
                  opacity="0.8"
                />
              ))}
            </g>
            <circle r="8" fill="#090B10" stroke="#00FF88" strokeWidth="2" />
          </g>

          {/* Rear Wheel Hub & Spokes (Right) */}
          <g transform="translate(600, 270)">
            <circle r="42" stroke="url(#wheels-glow)" strokeWidth="2.2" opacity="0.3" />
            <circle r="36" stroke="url(#wheels-glow)" strokeWidth="1.5" />
            <g className="spokes">
              {Array.from({ length: 6 }).map((_, i) => (
                <line 
                  key={i}
                  x1="0" 
                  y1="0" 
                  x2={parseFloat((36 * Math.cos((i * Math.PI) / 3)).toFixed(4))} 
                  y2={parseFloat((36 * Math.sin((i * Math.PI) / 3)).toFixed(4))} 
                  stroke="url(#wheels-glow)" 
                  strokeWidth="1.8" 
                  opacity="0.8"
                />
              ))}
            </g>
            <circle r="8" fill="#090B10" stroke="#00FF88" strokeWidth="2" />
          </g>
        </svg>

        {/* Ambient battery sparks & engine particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[38%] left-[24%] w-1.5 h-1.5 rounded-full bg-[#00FF88] opacity-65 animate-ping" style={{ animationDuration: "1.5s" }} />
          <div className="absolute top-[48%] left-[34%] w-1 h-1 rounded-full bg-[#00E5FF] opacity-55 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute bottom-[28%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#00FF88] opacity-65 animate-ping" style={{ animationDuration: "1.8s" }} />
        </div>
      </div>
    </div>
  );
}
