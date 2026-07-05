"use client";

import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Cpu, Zap, Library, Factory, HelpCircle } from "lucide-react";

const STATS = [
  { label: "Battery Chemistries", value: 8, suffix: "+", icon: BrainCircuit },
  { label: "Battery Cell Types", value: 4, suffix: " Types", icon: Cpu },
  { label: "Cycle Life Capacity", value: 6000, suffix: " Cycles", icon: Zap },
  { label: "Charging Standards", value: 6, suffix: "", icon: HelpCircle },
  { label: "Battery Gigafactories", value: 25, suffix: "+", icon: Factory },
  { label: "Research Papers", value: 120, suffix: "+", icon: Library },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && (entry.isIntersecting || entry.intersectionRatio > 0) && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl font-extrabold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function StatsBar() {
  return (
    <section id="stats" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group p-5 rounded-[16px] border border-white/5 bg-white/2 hover:bg-[#10B981]/4 hover:border-[#10B981]/20 transition-all duration-300 cursor-default shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Icon className="w-4 h-4 text-[#6EE7B7]" />
            </div>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <span className="text-[11px] font-semibold text-[#AEB5C0]/55 mt-1 block">
              {stat.label}
            </span>
          </div>
        );
      })}
    </section>
  );
}
