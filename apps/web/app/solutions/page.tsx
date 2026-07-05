import Link from "next/link";
import { 
  Plug, Battery, Truck, Sun, Building, Activity, Brain, Headphones, ArrowRight, Box 
} from "lucide-react";

const SOLUTIONS = [
  {
    name: "EV Charging Solutions",
    description: "Home chargers, commercial charging stations, DC fast charging and smart charging infrastructure.",
    href: "/solutions/charging",
    icon: Plug,
    color: "#00D26A"
  },
  {
    name: "Battery Solutions",
    description: "Battery systems, swapping, thermal management, recycling and energy storage.",
    href: "/solutions/battery",
    icon: Battery,
    color: "#00D26A"
  },
  {
    name: "Fleet Solutions",
    description: "Complete EV fleet management for businesses, logistics, ride sharing and commercial transport.",
    href: "/solutions/fleet",
    icon: Truck,
    color: "#00D26A"
  },
  {
    name: "Solar + EV",
    description: "Integrate rooftop solar with EV charging for maximum energy savings.",
    href: "/solutions/solar",
    icon: Sun,
    color: "#00D26A"
  },
  {
    name: "Business Solutions",
    description: "EV infrastructure for offices, industries, apartments and commercial facilities.",
    href: "/solutions/business",
    icon: Building,
    color: "#00D26A"
  },
  {
    name: "Smart Energy",
    description: "Energy monitoring, V2G, smart grid integration and intelligent energy optimization.",
    href: "/solutions/energy",
    icon: Activity,
    color: "#00D26A"
  },
  {
    name: "AI Solutions",
    description: "Predictive maintenance, AI diagnostics, smart charging optimization and analytics.",
    href: "/solutions/ai",
    icon: Brain,
    color: "#00D26A"
  },
  {
    name: "Consultation",
    description: "Expert EV consulting, project planning, technology guidance and implementation support.",
    href: "/solutions/consultation",
    icon: Headphones,
    color: "#00D26A"
  }
];

export default function SolutionsIndexPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-[11px] font-bold uppercase tracking-wider">
            NexioraEV Solutions Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-[#00D26A]/80 bg-clip-text text-transparent">
            Complete EV Solutions
          </h1>
          <p className="text-[#AEB5C0]/80 text-base sm:text-lg leading-relaxed">
            From smart charging stations and high-performance battery swapping to custom fleet management and advanced AI diagnostics, we power the future of electric mobility.
          </p>
        </section>

        {/* Dynamic Solutions Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <Link
                key={solution.name}
                href={solution.href}
                className="group relative flex flex-col justify-between p-6 h-[220px] rounded-[18px] border border-white/5 bg-white/[0.01] hover:bg-[#00D26A]/[0.02] hover:border-[#00D26A]/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_12px_40px_-12px_rgba(0,210,106,0.15)] overflow-hidden"
              >
                {/* Micro-interaction highlight glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#00D26A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#00D26A]/40 transition-colors">
                    <Icon className="w-6 h-6 text-[#AEB5C0] group-hover:text-[#00D26A] group-hover:scale-105 transition-all duration-300" strokeWidth={1.8} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[18px] font-bold text-white group-hover:text-[#00D26A] transition-colors leading-tight">
                      {solution.name}
                    </h3>
                    <p className="text-[13px] text-[#AEB5C0]/70 line-clamp-3 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#00D26A] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10 mt-4">
                  Explore Solution
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </div>
              </Link>
            );
          })}
        </section>

      </div>
    </div>
  );
}
