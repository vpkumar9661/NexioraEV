"use client";

import { Battery, Plug, Cpu, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const RELATED = [
  { title: "Charging Hub", desc: "AC/DC charging infrastructure, standards, and fast-charging technology.", href: "/evtech/charging-hub", icon: Plug, color: "#3B82F6" },
  { title: "EV Components", desc: "Drivetrain config, motor powertrains, and general EV mechanical layouts.", href: "/evtech/components", icon: Cpu, color: "#F59E0B" },
  { title: "Future Tech", desc: "Solid-state configurations, V2G grids, and automated robot battery swaps.", href: "/evtech/future-tech", icon: Battery, color: "#8B5CF6" },
  { title: "Learning Center", desc: "Interactive training programs, basic EV certifications, and tool manuals.", href: "/evtech/learning-center", icon: Sparkles, color: "#10B981" }
];

export function RelatedModules() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Continue Research</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Explore other segments of modern electric powertrains</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {RELATED.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[18px] border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 p-5 transition-all duration-300 block"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${item.color}12`, borderColor: `${item.color}25` }}>
                <Icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#6EE7B7] transition-colors">{item.title}</h4>
              <p className="text-[12px] text-muted-foreground/55 mt-1.5 leading-relaxed line-clamp-2">{item.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-[#6EE7B7] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Explore Module <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
