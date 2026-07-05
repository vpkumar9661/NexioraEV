import { SolutionsDashboardTemplate } from "@/components/layout/solutions-dashboard-template";
import { 
  Plug, Battery, Truck, Building, Activity, Brain, Headphones, 
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
  charging: {
    title: "EV Charging Solutions",
    subtitle: "State-of-the-art charging networks, high-power DC stations, smart load balancing, and localized home charging units.",
    categoryName: "EV Charging",
    stats: [
      { label: "Chargers Deployed", value: "12,450+ Units", change: "+18% MoM", changeType: "positive" },
      { label: "Superchargers", value: "150 - 350 kW", change: "Ultra Fast DC", changeType: "neutral" },
      { label: "Network Uptime", value: "99.98%", change: "SLA Guaranteed", changeType: "positive" },
      { label: "Active Drivers", value: "85,000+", change: "Registered users", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Dynamic Smart Charging",
        description: "Intelligent AC & DC charging hardware optimized for commercial and residential hubs.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Plug className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Dual AC Charger (22kW)</p>
                <p className="text-xs text-[#AEB5C0]/75">Perfect for commercial complexes and workplaces.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Load Balancing Engine</p>
                <p className="text-xs text-[#AEB5C0]/75">Automatically shares available power without upgrading local grid.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "DC Fast Charging",
        description: "High-speed charging corridors for inter-city travel and commercial operations.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">15-min Charge:</span> Replenish up to 80% range for commercial cars.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Liquid Cooled Cables:</span> High-current safety and minimal thermal wear.
            </div>
          </div>
        )
      }
    ]
  },
  battery: {
    title: "Battery Solutions",
    subtitle: "Advanced battery packs, state-of-the-art swapping hubs, active thermal management, and sustainability circular recycling.",
    categoryName: "Battery Lab",
    stats: [
      { label: "Swapping Hubs", value: "340+ Stations", change: "Metro Coverage", changeType: "positive" },
      { label: "Swap Duration", value: "< 2 Minutes", change: "Fully Automated", changeType: "positive" },
      { label: "Pack Durability", value: "3,500 Cycles", change: "LFP & NMC Chemistry", changeType: "neutral" },
      { label: "Recycling Yield", value: "98% Recovery", change: "Eco Circular", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Battery Swapping Networks",
        description: "Zero downtime infrastructure for 2-wheelers, 3-wheelers, and custom last-mile delivery fleets.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Battery className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Smart Swap Cabinets</p>
                <p className="text-xs text-[#AEB5C0]/75">IoT-connected cabinets charging batteries safely.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <RefreshCw className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Hot Swap Feasibility</p>
                <p className="text-xs text-[#AEB5C0]/75">Swap active battery modules instantly without shutting systems off.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Next-Gen Recycling",
        description: "We recover lithium, cobalt, and nickel from degraded EV batteries through hydrometallurgy.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Closed Loop:</span> Reintroducing recovered materials into the supply chain.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Carbon Offset:</span> Reduces mining footprint by up to 70%.
            </div>
          </div>
        )
      }
    ]
  },
  fleet: {
    title: "Fleet Solutions",
    subtitle: "Complete operational telemetry, real-time route optimization, energy dispatching, and cost tracking for commercial transport.",
    categoryName: "Fleet Mgmt",
    stats: [
      { label: "Managed Vehicles", value: "8,500+ EVs", change: "Trucks, Cars, Bikes", changeType: "neutral" },
      { label: "Carbon Offsets", value: "145k Tonnes", change: "Certified Green", changeType: "positive" },
      { label: "ICE Cost Savings", value: "42% Reduction", change: "Direct ROI", changeType: "positive" },
      { label: "Telemetry Delay", value: "< 1 Second", change: "MQTT IoT Pipeline", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Fleet Command Center",
        description: "Centralized live fleet tracker mapping driver efficiency, state of charge, and active delivery routes.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Truck className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Predictive Routing</p>
                <p className="text-xs text-[#AEB5C0]/75">Guides fleets along routes with optimal charging coverage.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <BarChart3 className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Daily Consumption Audits</p>
                <p className="text-xs text-[#AEB5C0]/75">Calculates precise kWh usage per mile for commercial dispatch.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Driver Performance & Telematics",
        description: "Assess driving patterns to optimize regenerative braking efficiency and minimize brake wear.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Safety Scorecards:</span> Highlighting harsh cornering, acceleration and speed warnings.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Range Extender Tips:</span> Coaching drivers on regenerative braking modes.
            </div>
          </div>
        )
      }
    ]
  },
  solar: {
    title: "Solar + EV Integration",
    subtitle: "Rooftop solar panel synchronization, Battery Energy Storage Systems (BESS), microgrids, and off-grid EV charging.",
    categoryName: "Solar + EV",
    stats: [
      { label: "Solar Fractions", value: "82% Direct", change: "Direct Clean Energy", changeType: "positive" },
      { label: "Microgrid Sites", value: "185 Locations", change: "Industrial Hubs", changeType: "neutral" },
      { label: "Solar Capacity", value: "24.5 MWp", change: "Active Generation", changeType: "positive" },
      { label: "BESS Storage", value: "18.2 MWh", change: "Battery Reserves", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Solar PV Synchronization",
        description: "Direct PV solar generation to electric chargers during daylight hours, storing excess energy in high-density batteries.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Sun className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Microgrid Solar Inverters</p>
                <p className="text-xs text-[#AEB5C0]/75">Lossless DC-to-DC charging straight from panels to vehicles.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Sun className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Peak Load Management</p>
                <p className="text-xs text-[#AEB5C0]/75">Decouples peak EV charging from utility grid demands.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "BESS Peak Shaving",
        description: "Saves commercial sites thousands of dollars monthly in utility grid demand surcharges.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Solar Smoothing:</span> Prevents solar dropouts during overcast days.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Backup Power:</span> Powers critical charging infrastructure during blackouts.
            </div>
          </div>
        )
      }
    ]
  },
  business: {
    title: "Business & Enterprise Solutions",
    subtitle: "Turnkey workplace charging systems, multi-family retail chargers, and robust monetization APIs for public charging.",
    categoryName: "Business Hub",
    stats: [
      { label: "Corporate Partners", value: "420+ Enterprises", change: "Workplace & Retail", changeType: "positive" },
      { label: "Parking Ports", value: "3,200 Ports", change: "Smart AC Chargers", changeType: "neutral" },
      { label: "ROI Payback", value: "18 Months", change: "Through Monetization", changeType: "positive" },
      { label: "Avg Occupancy", value: "78% Daily", change: "High Utilisation", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Enterprise Charger Management",
        description: "Easily set corporate pricing tiers, monitor driver usage, and generate custom billing logs.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Building className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Workplace Benefit Plan</p>
                <p className="text-xs text-[#AEB5C0]/75">Provide free or subsidized charging for employees.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Monetization & API Integration</p>
                <p className="text-xs text-[#AEB5C0]/75">Integrate payments with existing parking gates or retail apps.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Retail Attraction",
        description: "Installing EV chargers increases customer dwell time and average cart size.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Premium Visibility:</span> Feature chargers automatically on public navigation apps.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Green Certifications:</span> Earn carbon credits and LEED points.
            </div>
          </div>
        )
      }
    ]
  },
  energy: {
    title: "Smart Energy & Grid Sync",
    subtitle: "Bi-directional Vehicle-to-Grid (V2G) systems, real-time demand-response scheduling, and intelligent energy load optimization.",
    categoryName: "Smart Energy",
    stats: [
      { label: "Managed Capacity", value: "120 MW Grid", change: "Virtual Power Plant", changeType: "neutral" },
      { label: "V2G Active Nodes", value: "1,200 Cars", change: "Bi-directional Grid", changeType: "positive" },
      { label: "Yield Arbitrage", value: "$240k/Month", change: "Distributed Grid", changeType: "positive" },
      { label: "Grid Sync Speed", value: "< 250ms", change: "Frequency Response", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Vehicle-To-Grid (V2G) Systems",
        description: "Allows parked EVs to act as distributed grid batteries, feeding energy back during peak grid stress.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Activity className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Dynamic Grid Matching</p>
                <p className="text-xs text-[#AEB5C0]/75">Adapts output grid current dynamically based on load variations.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Smart Arbitrage Engine</p>
                <p className="text-xs text-[#AEB5C0]/75">Charges at night during cheap tariffs, discharges during peak hours.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Grid Stabilization Services",
        description: "Contribute to local grid frequency control, securing incentives from electricity distribution companies.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Frequency Response:</span> Mitigates sudden power dropouts in localized areas.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Dynamic Curtailed Solar:</span> Absorbs grid-curtailed clean energy quickly.
            </div>
          </div>
        )
      }
    ]
  },
  ai: {
    title: "AI & Diagnostics Hub",
    subtitle: "Predictive BMS battery health monitoring, machine learning charging patterns, anomaly detection, and automated maintenance.",
    categoryName: "AI Diagnostics",
    stats: [
      { label: "BMS Anomaly Accuracy", value: "99.7%", change: "Real-time AI Models", changeType: "positive" },
      { label: "Downtime Avoided", value: "42% Reduction", change: "Early Fault Warns", changeType: "positive" },
      { label: "Deployed Pipelines", value: "12 ML Models", change: "Edge & Cloud Sync", changeType: "neutral" },
      { label: "Data Streams Ingested", value: "14B/Day", change: "IoT Sensor Pings", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Predictive BMS Safety",
        description: "Edge AI algorithms running directly on vehicles and charging units monitor temperature fluctuations to prevent battery thermal runaway.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Brain className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Anomalous Spike Warnings</p>
                <p className="text-xs text-[#AEB5C0]/75">Warns of micro-faults 48 hours before physical manifestation.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Cpu className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Edge AI Processor Sync</p>
                <p className="text-xs text-[#AEB5C0]/75">Real-time local anomaly inference without cloud latency issues.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Intelligent Load Forecasting",
        description: "Analyzes ambient weather, seasonal variables, and historic patterns to optimize next-day grid loads.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Weather adaptation:</span> Slows DC charging current under heavy external heat.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">TCO Optimization:</span> Learns from local utility rate variations dynamically.
            </div>
          </div>
        )
      }
    ]
  },
  consultation: {
    title: "Expert EV Consultation",
    subtitle: "Custom grid integration scoping, fleet electrification roadmaps, local zoning support, and technology benchmarking.",
    categoryName: "Consultation",
    stats: [
      { label: "Projects Completed", value: "640+ Sites", change: "Global Feasibility", changeType: "neutral" },
      { label: "Grid Audits Scoped", value: "150+ Audits", change: "Feasibility Checks", changeType: "positive" },
      { label: "Specialist Advisors", value: "45 Experts", change: "EV Industry Veterans", changeType: "positive" },
      { label: "Compliance Index", value: "100% Pass", change: "Zero Regulatory Risks", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Site Electrification Scoping",
        description: "Detailed grid load calculations, utility power discussions, local zoning approval checks, and layout design blueprints.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Headphones className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">Full Feasibility Audits</p>
                <p className="text-xs text-[#AEB5C0]/75">Detailed grid load assessments before purchasing chargers.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#00D26A]" />
              <div>
                <p className="text-sm font-bold text-white">EV Infrastructure Scoping</p>
                <p className="text-xs text-[#AEB5C0]/75">Custom grid wiring architecture plan scaled for your commercial layout.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Policy & Incentives Advisory",
        description: "We help enterprises maximize green subsidy programs and local government grid incentives.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">Subsidies Mapping:</span> Integrates PM E-Drive and state tax write-offs.
            </div>
            <div className="p-2.5 rounded-lg bg-[#00D26A]/5 border border-[#00D26A]/10">
              <span className="text-[#00D26A] font-bold">LEED & GRIHA Scopes:</span> Standardize operations for premium green ratings.
            </div>
          </div>
        )
      }
    ]
  }
};

export function generateStaticParams() {
  return [
    { slug: "charging" },
    { slug: "battery" },
    { slug: "fleet" },
    { slug: "solar" },
    { slug: "business" },
    { slug: "energy" },
    { slug: "ai" },
    { slug: "consultation" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SolutionsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Dynamic lookup. If the slug doesn't exist, fallback to "charging" to ensure a 404 is NEVER returned.
  const pageData = (DATA_MAP[slug as string] || DATA_MAP.charging) as {
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
    <SolutionsDashboardTemplate
      title={pageData.title}
      subtitle={pageData.subtitle}
      categoryName={pageData.categoryName}
      stats={pageData.stats}
      widgets={pageData.widgets}
    />
  );
}
