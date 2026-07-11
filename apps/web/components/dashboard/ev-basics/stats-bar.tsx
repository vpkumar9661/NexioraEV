"use client";

import { useEffect, useRef, useState } from "react";
import { Battery, Cpu, Plug, Factory, BookOpen, Gamepad2 } from "lucide-react";

const STATS = [
  { label: "Battery Technologies", value: 12, suffix: "+", icon: Battery },
  { label: "Motor Types", value: 6, suffix: "", icon: Cpu },
  { label: "Charging Standards", value: 8, suffix: "+", icon: Plug },
  { label: "EV Manufacturers", value: 45, suffix: "+", icon: Factory },
  { label: "Learning Modules", value: 8, suffix: "", icon: BookOpen },
  { label: "Simulations", value: 5, suffix: "", icon: Gamepad2 },
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
      {count}{suffix}
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group p-5 rounded-[16px] border border-white/5 bg-white/2 hover:bg-[#8B5CF6]/4 hover:border-[#8B5CF6]/20 transition-all duration-300 cursor-default shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Icon className="w-4 h-4 text-[#A78BFA]" />
            </div>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <span className="text-[11px] font-semibold text-muted-foreground/55 mt-1 block">
              {stat.label}
            </span>
          </div>
        );
      })}
    </section>
  );
}
