import Link from "next/link";
import { 
  Sparkles, LineChart, Battery, Plug, Wand2, Wrench, Lightbulb, Rocket, ArrowRight, Brain 
} from "lucide-react";

const CATEGORIES = [
  {
    name: "AI Assistant",
    description: "Ask EV-related questions and receive intelligent recommendations instantly.",
    href: "/intelligence/assistant",
    icon: Sparkles
  },
  {
    name: "EV Analytics",
    description: "Explore EV market trends, adoption statistics, charging growth, and industry insights.",
    href: "/intelligence/analytics",
    icon: LineChart
  },
  {
    name: "Battery Intelligence",
    description: "Analyze battery health, degradation, charging cycles, lifespan prediction, and efficiency.",
    href: "/intelligence/battery",
    icon: Battery
  },
  {
    name: "Charging Intelligence",
    description: "Find optimal charging times, station availability, charging speed, and energy optimization.",
    href: "/intelligence/charging",
    icon: Plug
  },
  {
    name: "Smart Recommendations",
    description: "Receive personalized EV suggestions based on your driving habits and requirements.",
    href: "/intelligence/recommendations",
    icon: Wand2
  },
  {
    name: "Predictive Maintenance",
    description: "Detect future maintenance needs using AI-powered diagnostics and predictive analysis.",
    href: "/intelligence/maintenance",
    icon: Wrench
  },
  {
    name: "EV Insights",
    description: "Daily EV news, research reports, battery innovations, and future mobility trends.",
    href: "/intelligence/insights",
    icon: Lightbulb
  },
  {
    name: "Future Mobility Lab",
    description: "Explore autonomous driving, V2G, smart cities, robotics, and next-generation mobility technologies.",
    href: "/intelligence/future-lab",
    icon: Rocket
  }
];

export default function IntelligenceIndexPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-[11px] font-bold uppercase tracking-wider">
            NexioraEV Intelligence Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-white to-[#FF8C00]/80 bg-clip-text text-transparent">
            The AI Brain of NexioraEV
          </h1>
          <p className="text-[#AEB5C0]/80 text-base sm:text-lg leading-relaxed">
            Harnessing the power of advanced machine learning and real-time telematics to predict battery health, analyze market trends, and deliver intelligent EV recommendations.
          </p>
        </section>

        {/* Dynamic Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative flex flex-col justify-between p-6 h-[220px] rounded-[18px] border border-white/5 bg-white/1 hover:bg-[#FF8C00]/2 hover:border-[#FF8C00]/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_12px_40px_-12px_rgba(255,140,0,0.15)] overflow-hidden"
              >
                {/* Visual grid pattern */}
                <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(255,140,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.2)_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
                
                {/* Micro-interaction highlight glow */}
                <div className="absolute -inset-px bg-linear-to-br from-[#FF8C00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#FF8C00]/40 transition-colors">
                    <Icon className="w-6 h-6 text-[#AEB5C0] group-hover:text-[#FF8C00] group-hover:scale-105 transition-all duration-300" strokeWidth={1.8} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[18px] font-bold text-white group-hover:text-[#FF8C00] transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-[13px] text-[#AEB5C0]/70 line-clamp-3 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#FF8C00] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10 mt-4">
                  Launch Insight Node
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
