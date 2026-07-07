"use client";

import React, { useEffect, useState } from "react";

export function HeroVehicle() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setCoords({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[480px] pointer-events-none select-none overflow-hidden">
      {/* Floating diagnostic sparkles/particles overlay */}
      <div 
        className="absolute inset-0 z-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${coords.x * 25}px, ${coords.y * 20}px, 0)`
        }}
      >
        <style>{`
          @keyframes float-spark {
            0% { transform: translateY(40px) translateX(0) scale(0.8); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-120px) translateX(20px) scale(1); opacity: 0; }
          }
          .spark-particle {
            position: absolute;
            border-radius: 50%;
            animation: float-spark 6s ease-in-out infinite;
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.35; }
          }
          .glow-pulse-layer {
            animation: glow-pulse 4s ease-in-out infinite;
          }
        `}</style>

        {/* Ambient glow overlays aligned with car and planet */}
        <div className="absolute top-[25%] right-[35%] w-[200px] h-[200px] bg-secondary/8 rounded-full blur-[50px] glow-pulse-layer" />
        <div className="absolute bottom-[20%] left-[25%] w-[250px] h-[90px] bg-[#00F5A0]/10 rounded-full blur-2xl glow-pulse-layer" style={{ animationDelay: "2s" }} />

        {/* Sparks drifting */}
        <div className="spark-particle bg-[#00F5A0] w-1.5 h-1.5 top-[70%] left-[35%]" style={{ animationDelay: "0s", animationDuration: "5s" }} />
        <div className="spark-particle bg-secondary w-1 h-1 top-[55%] left-[50%]" style={{ animationDelay: "2s", animationDuration: "7s" }} />
        <div className="spark-particle bg-accent w-1.5 h-1.5 top-[75%] left-[65%]" style={{ animationDelay: "4s", animationDuration: "6s" }} />
      </div>
    </div>
  );
}

export default HeroVehicle;
