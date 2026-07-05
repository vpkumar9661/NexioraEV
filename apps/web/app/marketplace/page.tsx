import Link from "next/link";
import { 
  Car, Battery, Plug, Wrench, GitCompare, Tag, Store, Bot, ArrowRight, ShoppingBag 
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Electric Vehicles",
    description: "Browse and compare electric cars, scooters, bikes, buses and commercial EVs.",
    href: "/marketplace/vehicles",
    icon: Car
  },
  {
    name: "EV Batteries",
    description: "Explore batteries, battery packs, BMS, battery modules and replacement options.",
    href: "/marketplace/batteries",
    icon: Battery
  },
  {
    name: "Charging Equipment",
    description: "Home chargers, wall boxes, portable chargers, DC fast chargers and accessories.",
    href: "/marketplace/charging",
    icon: Plug
  },
  {
    name: "EV Accessories",
    description: "Smart accessories including cables, connectors, tyres, helmets, smart devices and more.",
    href: "/marketplace/accessories",
    icon: Wrench
  },
  {
    name: "Compare Vehicles",
    description: "Compare EV specifications, price, range, battery, charging time and performance.",
    href: "/marketplace/compare",
    icon: GitCompare
  },
  {
    name: "Offers & Deals",
    description: "Latest discounts, launch offers, exchange bonuses and seasonal promotions.",
    href: "/marketplace/offers",
    icon: Tag
  },
  {
    name: "Verified Sellers",
    description: "Find verified dealers, manufacturers, suppliers and trusted EV partners.",
    href: "/marketplace/sellers",
    icon: Store
  },
  {
    name: "Marketplace AI",
    description: "AI-powered product recommendations based on your budget, needs and driving habits.",
    href: "/marketplace/ai",
    icon: Bot
  }
];

export default function MarketplaceIndexPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
            NexioraEV Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-[#2563EB]/80 bg-clip-text text-transparent">
            Electric Mobility Commerce Hub
          </h1>
          <p className="text-[#AEB5C0]/80 text-base sm:text-lg leading-relaxed">
            Everything for Electric Mobility in one place. Discover leading EV models, high-performance battery modules, verified charging hardware, and smart accessories.
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
                className="group relative flex flex-col justify-between p-6 h-[220px] rounded-[18px] border border-white/5 bg-white/[0.01] hover:bg-[#2563EB]/[0.02] hover:border-[#2563EB]/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_12px_40px_-12px_rgba(37,99,235,0.15)] overflow-hidden"
              >
                {/* Visual blueprint texture pattern */}
                <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(37,99,235,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* Micro-interaction highlight glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#2563EB]/40 transition-colors">
                    <Icon className="w-6 h-6 text-[#AEB5C0] group-hover:text-[#2563EB] group-hover:scale-105 transition-all duration-300" strokeWidth={1.8} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[18px] font-bold text-white group-hover:text-[#2563EB] transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-[13px] text-[#AEB5C0]/70 line-clamp-3 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10 mt-4">
                  Explore Marketplace
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
