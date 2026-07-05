import Link from "next/link";
import { 
  Landmark, Map, Calculator, Route, Factory, Plug, Newspaper, BadgeCheck, ArrowRight 
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Central Schemes",
    description: "Explore PM E-Drive, FAME, national incentives and central government support.",
    href: "/schemes/central",
    icon: Landmark
  },
  {
    name: "State EV Policies",
    description: "Compare EV subsidies and benefits available across all Indian states.",
    href: "/schemes/state",
    icon: Map
  },
  {
    name: "EV Subsidy Calculator",
    description: "Estimate subsidy amount based on your location, vehicle category and eligibility.",
    href: "/schemes/calculator",
    icon: Calculator
  },
  {
    name: "Road Tax Benefits",
    description: "Road tax exemptions, registration fee waivers and state transport benefits.",
    href: "/schemes/tax-benefits",
    icon: Route
  },
  {
    name: "Commercial Incentives",
    description: "Business incentives, manufacturing support, fleet benefits and MSME programs.",
    href: "/schemes/business",
    icon: Factory
  },
  {
    name: "Charging Grants",
    description: "Government grants and funding for charging station installation.",
    href: "/schemes/charging",
    icon: Plug
  },
  {
    name: "Policy Updates",
    description: "Latest notifications, policy changes, EV regulations and official announcements.",
    href: "/schemes/policy",
    icon: Newspaper
  },
  {
    name: "Eligibility Checker",
    description: "Check your eligibility for subsidies, incentives and government schemes instantly.",
    href: "/schemes/eligibility",
    icon: BadgeCheck
  }
];

export default function SchemesIndexPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-[11px] font-bold uppercase tracking-wider">
            NexioraEV Government Benefits Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-white to-[#4F46E5]/80 bg-clip-text text-transparent">
            Government EV Subsidies & Policies
          </h1>
          <p className="text-[#AEB5C0]/80 text-base sm:text-lg leading-relaxed">
            Everything you need to know about EV Government Benefits. Explore FAME, PM E-Drive, state-level road tax exemptions, and municipal fast-charge infrastructure funding grants.
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
                className="group relative flex flex-col justify-between p-6 h-[220px] rounded-[18px] border border-white/5 bg-white/1 hover:bg-[#4F46E5]/2 hover:border-[#4F46E5]/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.15)] overflow-hidden"
              >
                {/* Visual grid pattern */}
                <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
                
                {/* Micro-interaction highlight glow */}
                <div className="absolute -inset-px bg-linear-to-br from-[#4F46E5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#4F46E5]/40 transition-colors">
                    <Icon className="w-6 h-6 text-[#AEB5C0] group-hover:text-[#4F46E5] group-hover:scale-105 transition-all duration-300" strokeWidth={1.8} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[18px] font-bold text-white group-hover:text-[#4F46E5] transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-[13px] text-[#AEB5C0]/70 line-clamp-3 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#4F46E5] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10 mt-4">
                  Check Policy Details
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
