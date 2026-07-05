import { MarketplaceDashboardTemplate } from "@/components/layout/marketplace-dashboard-template";
import { 
  Car, Battery, Plug, Wrench, GitCompare, Tag, Store, Bot, ArrowRight,
  Settings, ShieldAlert, Cpu, BarChart3, HelpCircle, HardDrive, RefreshCw, Sun 
} from "lucide-react";

const DATA_MAP: Record<string, {
  title: string;
  subtitle: string;
  categoryName: string;
  stats: Array<{
    label: string;
    value: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
  }>;
  widgets: Array<{
    title: string;
    description: string;
    content: React.ReactNode;
  }>;
}> = {
  vehicles: {
    title: "Electric Vehicles",
    subtitle: "Browse, filter, and compare state-of-the-art electric cars, scooters, bikes, buses and commercial transport EVs.",
    categoryName: "EV Shop",
    stats: [
      { label: "Active Models", value: "140+ Vehicles", change: "Cars & bikes", changeType: "neutral" },
      { label: "Booked Orders", value: "14,500+ Units", change: "+24% MoM", changeType: "positive" },
      { label: "On-time Delivery", value: "98.7% SLA", change: "Guaranteed shipping", changeType: "positive" },
      { label: "Avg Rating", value: "4.8 / 5.0", change: "Verified buyers", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Passenger Cars & Bikes",
        description: "Includes leading long-range sedans, family SUVs, and urban micro-cars optimized for daily commuting.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Car className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Smart Commuter Sedans</p>
                <p className="text-xs text-[#AEB5C0]/75">High efficiency daily drivers with over 320 miles of range.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Test Drive Booking</p>
                <p className="text-xs text-[#AEB5C0]/75">Schedule a home test drive with our verified local dealers.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Commercial Logistics EVs",
        description: "Explore clean cargo vans and logistics fleets designed for lowest cost-per-mile operations.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Logistics Fleets:</span> Optimized payload capacity up to 1.5 metric tons.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Fast-Charge Options:</span> Integrates with CCS2 commercial superchargers.
            </div>
          </div>
        )
      }
    ]
  },
  batteries: {
    title: "EV Batteries & BMS Portal",
    subtitle: "High-capacity lithium packs, active liquid cooled replacement modules, and smart CAN Bus BMS controllers.",
    categoryName: "Batteries",
    stats: [
      { label: "Packs Listed", value: "85 Models", change: "LFP & NMC options", changeType: "neutral" },
      { label: "Fit Compliance", value: "99.8% Perfect", change: "Sizing verified", changeType: "positive" },
      { label: "Warranty Period", value: "8 Years SLA", change: "Manufacturer backed", changeType: "positive" },
      { label: "Materials Saved", value: "1,200 Tonnes", change: "Closed loop circular", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Modular Replacement Packs",
        description: "Replace individual depleted battery cell clusters instead of purchasing a full replacement pack.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Battery className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Smart Balancing BMS</p>
                <p className="text-xs text-[#AEB5C0]/75">Keeps all cell voltages uniform during heavy current fast charging.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <RefreshCw className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Hydrometallurgical Return</p>
                <p className="text-xs text-[#AEB5C0]/75">Trade in old degraded batteries for core material exchange credit.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Thermal Runaway Protections",
        description: "Equipped with advanced fire-retardant structural aerogels and active coolant ports.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Aerogel Insulated:</span> Prevents heat migration between cells.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Liquid Connectors:</span> Standard quick-connect coolant nozzles.
            </div>
          </div>
        )
      }
    ]
  },
  charging: {
    title: "Charging Equipment Shop",
    subtitle: "Heavy commercial DC superchargers, dynamic AC home wall boxes, portable travel chargers, and smart accessories.",
    categoryName: "Chargers",
    stats: [
      { label: "Products Listed", value: "240+ Chargers", change: "AC & DC options", changeType: "neutral" },
      { label: "Safety Passes", value: "100% Certified", change: "UL, CE & ARAI", changeType: "positive" },
      { label: "Dispatch Speed", value: "2-Day Delivery", change: "In-stock hardware", changeType: "positive" },
      { label: "Install Support", value: "Nationwide Setup", change: "Certified engineers", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Smart Home Chargers",
        description: "WiFi-enabled charging boxes designed to load balance charging schedules according to off-peak grid rates.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Plug className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">7.4kW - 22kW Wallboxes</p>
                <p className="text-xs text-[#AEB5C0]/75">Includes robust cables and custom mounting brackets.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Monetization Software</p>
                <p className="text-xs text-[#AEB5C0]/75">Perfect for setting up paid parking charging portals.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "DC Fast Charging Corridors",
        description: "Heavy-duty commercial charging systems with liquid-cooled cables to minimize thermal limits.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">150kW - 350kW DC:</span> Recharges commercial trucks in 25 minutes.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">CCS2 Standard:</span> Universal compatibility across multiple manufacturer standards.
            </div>
          </div>
        )
      }
    ]
  },
  accessories: {
    title: "EV Accessories Shop",
    subtitle: "Heavy-current extension cables, rolling resistance tires, aerodynamic helmets, and smart diagnostic OBD tools.",
    categoryName: "Accessories",
    stats: [
      { label: "Items Listed", value: "1,200+ Products", change: "Verified fit checks", changeType: "neutral" },
      { label: "Best Seller", value: "Charging Cables", change: "CCS2 & Type 2", changeType: "positive" },
      { label: "Rating Index", value: "4.7 / 5.0 Rating", change: "Top customer score", changeType: "positive" },
      { label: "Return Policy", value: "30-Day Window", change: "Hassle-free return", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Cables & Connectors Shop",
        description: "Heavy-current charging adapters and extension cables allowing interoperability between charger socket designs.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Wrench className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">CCS2 to GB/T Adapters</p>
                <p className="text-xs text-[#AEB5C0]/75">Sturdy weather-resistant adapters for imported vehicles.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Smart OBD2 Adapters</p>
                <p className="text-xs text-[#AEB5C0]/75">Connects your vehicle diagnostic stream to the Nexiora app.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Aerodynamics & Low Roll Tires",
        description: "Specialized tires designed to reduce road drag friction and save battery range.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Range Extender Tyres:</span> Boosts highway range by up to 5%.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Noise Cancellation:</span> Dampens road sounds inside quiet EV cabins.
            </div>
          </div>
        )
      }
    ]
  },
  compare: {
    title: "Side-by-Side EV Comparison",
    subtitle: "Evaluate prices, actual highway ranges, battery sizing, fast-charge speeds, and performance metrics across top models.",
    categoryName: "Compare",
    stats: [
      { label: "Matches Searched", value: "24,000 Daily", change: "Active buyer sync", changeType: "positive" },
      { label: "EV Models Database", value: "280 Vehicles", change: "Updated weekly", changeType: "neutral" },
      { label: "Top Comparison", value: "SUV vs Sedan", change: "Popular lookups", changeType: "neutral" },
      { label: "Data Accuracy", value: "100% Certified", change: "Official specs", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Highway Range vs Price Metrics",
        description: "Our engine plots real-world ranges under highway wind drag conditions against MSRP.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <GitCompare className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Compare Range curves</p>
                <p className="text-xs text-[#AEB5C0]/75">See range behavior under hot summer or cold winter climates.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <BarChart3 className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Total Cost of Ownership (TCO)</p>
                <p className="text-xs text-[#AEB5C0]/75">Calculates grid savings vs gasoline over a 5-year driving span.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Fast-Charging Time Comparison",
        description: "Compare charging speeds across home wallboxes and DC commercial networks.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">10% to 80% Fast Charge:</span> Ranks vehicles by active cooling speeds.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Grid Capacity Scopes:</span> Evaluates how fast you can charge on residential lines.
            </div>
          </div>
        )
      }
    ]
  },
  offers: {
    title: "Hot Deals & Promotions",
    subtitle: "Discover seasonal discounts, local EV cashbacks, corporate tax write-offs, and exchange-bonus programs.",
    categoryName: "Deals",
    stats: [
      { label: "Active Offers", value: "45 Deals Live", change: "Updated daily", changeType: "positive" },
      { label: "Avg User Savings", value: "$1,850 / EV", change: "Instant deductions", changeType: "positive" },
      { label: "Partner Dealers", value: "80+ Locations", change: "Exchange networks", changeType: "neutral" },
      { label: "Direct Cashbacks", value: "Up to $500", change: "Bank promotions", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Corporate Electrification Rebates",
        description: "Exclusive B2B purchasing discounts for clean logistics fleets, saving up to 15% upfront.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Tag className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">B2B Volume Programs</p>
                <p className="text-xs text-[#AEB5C0]/75">Unlock custom bulk tariffs for workplace charging equipment.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Subsidies Mapping API</p>
                <p className="text-xs text-[#AEB5C0]/75">Computes state subsidies and road tax write-offs automatically.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Gasoline Vehicle Trade-in",
        description: "Appraise your old ICE vehicle instantly online and trade it in for direct discounts on a new EV.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Instant Appraisals:</span> Get trade-in valuation quotes within 3 minutes.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Eco Bonuses:</span> Earn an additional $250 green credit for scraping old gas cars.
            </div>
          </div>
        )
      }
    ]
  },
  sellers: {
    title: "Verified EV Sellers & Partners",
    subtitle: "Find registered OEM distributors, component manufacturers, verified battery swapping suppliers, and local service stations.",
    categoryName: "Sellers",
    stats: [
      { label: "Verified Dealers", value: "180+ Partners", change: "Rigorous vetting", changeType: "positive" },
      { label: "Safety Audit Pass", value: "100% Verified", change: "Standard checks", changeType: "positive" },
      { label: "Logistics Hubs", value: "45 Warehouses", change: "Fast spare shipping", changeType: "neutral" },
      { label: "Partner Rating", value: "4.9 / 5.0 SLA", change: "Client reviewed", changeType: "positive" }
    ],
    widgets: [
      {
        title: "OEM Direct Distributors",
        description: "Instantly maps licensed sellers closest to your location offering free vehicle test drives and official warranty support.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Store className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Local Showroom Map</p>
                <p className="text-xs text-[#AEB5C0]/75">Click to find certified partner dealerships offering test drives.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Original Spare Catalogs</p>
                <p className="text-xs text-[#AEB5C0]/75">Browse manufacturer certified replacement suspension, gears and tyres.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Battery Swap Station Owners",
        description: "Find local private swap cabinet operators cooperating with our vehicle fleets.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Station Audits:</span> Ensures regular diagnostic tests on active cabinets.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Standard pricing:</span> Fixed swap fees synced automatically to driver apps.
            </div>
          </div>
        )
      }
    ]
  },
  ai: {
    title: "Marketplace AI Assistant",
    subtitle: "AI-powered shopper recommendations mapping your budget, driving style, charging availability, and cargo requirements.",
    categoryName: "Shop AI",
    stats: [
      { label: "Recommender Syncs", value: "12,000+ Users", change: "Collaborative ML", changeType: "positive" },
      { label: "Inference Delay", value: "14ms Avg", change: "Highly optimized", changeType: "positive" },
      { label: "Accuracy Index", value: "98.4%", change: "Feedback validation", changeType: "positive" },
      { label: "Model Version", value: "RecEngine v3.0", change: "Deep Neural Net", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Automated Budget Matching",
        description: "Recommends custom vehicle and charging setups fitting your target monthly loan budget.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Bot className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Smart Financial Profiling</p>
                <p className="text-xs text-[#AEB5C0]/75">Calculates interest rates, battery leasing offsets, and charging costs.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#2563EB]" />
              <div>
                <p className="text-sm font-bold text-white">Daily Commute Profiling</p>
                <p className="text-xs text-[#AEB5C0]/75">Matches battery capacities to employee shift distributions.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Smart Charger Profiling",
        description: "Suggests charger power capabilities based on your local utility grid limit rules.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Utility Caps:</span> Analyzes substation limits before suggesting high-power AC.
            </div>
            <div className="p-2.5 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10">
              <span className="text-[#2563EB] font-bold">Eco Mode Scheduling:</span> Configures chargers to avoid peak electricity pricing rates.
            </div>
          </div>
        )
      }
    ]
  }
};

export function generateStaticParams() {
  return [
    { slug: "vehicles" },
    { slug: "batteries" },
    { slug: "charging" },
    { slug: "accessories" },
    { slug: "compare" },
    { slug: "offers" },
    { slug: "sellers" },
    { slug: "ai" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MarketplaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Dynamic lookup fallback to "vehicles" to ensure 404 is NEVER returned.
  const pageData = (DATA_MAP[slug as string] || DATA_MAP.vehicles) as {
    title: string;
    subtitle: string;
    categoryName: string;
    stats: Array<{
      label: string;
      value: string;
      change?: string;
      changeType?: "positive" | "negative" | "neutral";
    }>;
    widgets: Array<{
      title: string;
      description: string;
      content: React.ReactNode;
    }>;
  };

  return (
    <MarketplaceDashboardTemplate
      title={pageData.title}
      subtitle={pageData.subtitle}
      categoryName={pageData.categoryName}
      stats={pageData.stats}
      widgets={pageData.widgets}
    />
  );
}
