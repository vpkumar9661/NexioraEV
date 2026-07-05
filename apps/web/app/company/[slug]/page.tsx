import { CompanyDashboardTemplate } from "@/components/layout/company-dashboard-template";
import { 
  Building, Users, Handshake, Briefcase, Mic, Code, Headphones, Mail, ArrowRight,
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
  about: {
    title: "About NexioraEV",
    subtitle: "Accelerating clean energy transitions and local logistics conversions through smart grid-level optimization.",
    categoryName: "About Us",
    stats: [
      { label: "Founded Year", value: "2024", change: "Established", changeType: "neutral" },
      { label: "Global Footprint", value: "14 Countries", change: "Active operations", changeType: "positive" },
      { label: "Emissions Saved", value: "1.4M Tons CO2", change: "Validated statistics", changeType: "positive" },
      { label: "Active R&D Labs", value: "4 Hubs", change: "Innovating daily", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Brand Vision",
        description: "Building the digital nervous system for clean logistics loops across urban smart city sectors.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Building className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Grid-Scale Electrification</p>
                <p className="text-xs text-[#AEB5C0]/75">Connecting vehicles directly to grid storage buffers.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Closed-Loop Recycling</p>
                <p className="text-xs text-[#AEB5C0]/75">Recovering 95% of active battery core elements.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "ESG & Clean Compliance",
        description: "Details how we maintain carbon-neutral server footprints and execute 100% recyclable battery swaps.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Zero Carbon:</span> 100% solar-backed computational servers.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Ethical Sourcing:</span> Strictly cobalt-free cell chemistry validation.
            </div>
          </div>
        )
      }
    ]
  },
  team: {
    title: "The Team Behind NexioraEV",
    subtitle: "Meet the computer vision researchers, grid engineers, and battery experts building the next generation of logistics software.",
    categoryName: "Our Team",
    stats: [
      { label: "Total Headcount", value: "450+ Members", change: "Engineers & Researchers", changeType: "neutral" },
      { label: "Patents Granted", value: "28 Patents", change: "BMS and V2G algorithms", changeType: "positive" },
      { label: "Diversity Index", value: "48% Women", change: "Global tech team", changeType: "positive" },
      { label: "Retention Rate", value: "96.4% MoM", change: "Annual industry high", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Engineering Divisions",
        description: "Divided into Telematics IoT stream processors, Edge Diagnostics AI, and bidirectional V2G grid loops.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Users className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Telematics IoT Group</p>
                <p className="text-xs text-[#AEB5C0]/75">Manages millions of concurrent telemetry points.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Diagnostics AI Team</p>
                <p className="text-xs text-[#AEB5C0]/75">Predicts battery degradations and cell faults.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Scientific Publications",
        description: "We publish peer-reviewed papers mapping battery behaviors to public databases.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Impedance Curves:</span> Published in the Journal of Battery Science.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Grid Arbitrage:</span> Explores V2G feasibility under winter grid stresses.
            </div>
          </div>
        )
      }
    ]
  },
  partners: {
    title: "Ecosystem Collaborators",
    subtitle: "Partnering with leading battery manufacturers, public utility discoms, state developers, and corporate fleets.",
    categoryName: "Partners",
    stats: [
      { label: "Active Partners", value: "85 Partners", change: "Global collaborators", changeType: "positive" },
      { label: "Utility Integrations", value: "12 DISCOMs", change: "V2G grid test loops", changeType: "positive" },
      { label: "OEM Agreements", value: "8 Automakers", change: "Pre-installed telematics", changeType: "positive" },
      { label: "Partner Rating", value: "4.9 / 5.0 SLA", change: "Client reviewed", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Public Charger Partnerships",
        description: "Collaborating with commercial properties to host high-speed charging infrastructure.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Handshake className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Commercial Hosts</p>
                <p className="text-xs text-[#AEB5C0]/75">Properties earn shared revenue margins on public charging nodes.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Fleet Operators</p>
                <p className="text-xs text-[#AEB5C0]/75">Unlock custom bulk charger booking APIs.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "POWERTRAIN Collaborators",
        description: "Sourcing certified safe motor controllers and battery packs with manufacturer backed warranties.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Cell Partnerships:</span> Access early battery lab prototypes.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Swap Hardware:</span> Cooperating on standard chassis locking pins.
            </div>
          </div>
        )
      }
    ]
  },
  careers: {
    title: "Careers at NexioraEV",
    subtitle: "Join our teams and help build the future of sustainable transportation and automated grids.",
    categoryName: "Careers",
    stats: [
      { label: "Open Positions", value: "24 Roles", change: "Across all offices", changeType: "neutral" },
      { label: "Office Nodes", value: "Delhi, SF, Munich", change: "Hybrid layout", changeType: "neutral" },
      { label: "Education Grant", value: "₹1.5L / Year", change: "Per employee allowance", changeType: "positive" },
      { label: "Satisfaction", value: "4.8 / 5.0 Rating", change: "Internal brand survey", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Engineering Opportunities",
        description: "We are actively recruiting backend, frontend, and data engineers who are passionate about EV grids.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Briefcase className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Rust Backend Engineer</p>
                <p className="text-xs text-[#AEB5C0]/75">Design low-latency MQTT stream parsers.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">AI Diagnostics Engineer</p>
                <p className="text-xs text-[#AEB5C0]/75">Refine thermal cell prediction ML algorithms.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Culture & Compensation",
        description: "Features dedicated volunteer programs, green hackathons, and educational support guidelines.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Hackathons:</span> Annual clean-mobility coding events with cash awards.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Health Cover:</span> Premium health coverage plans for family groups.
            </div>
          </div>
        )
      }
    ]
  },
  media: {
    title: "Press & Branding Kit",
    subtitle: "Access high-resolution corporate logo bundles, press releases, media kits, and corporate announcements.",
    categoryName: "Press Room",
    stats: [
      { label: "Kit Downloads", value: "12,000+ Packs", change: "High-res files", changeType: "positive" },
      { label: "Press Releases", value: "80+ Bulletins", change: "Updated yesterday", changeType: "neutral" },
      { label: "News Mentions", value: "1,140 Quotes", change: "Worldwide publications", changeType: "positive" },
      { label: "Brand Book", value: "v2.0 Guidelines", change: "Official color guide", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Latest PR Announcements",
        description: "Summarizes our latest funding allocations and PM E-Drive software integration deployments.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Mic className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Series B Funding Round</p>
                <p className="text-xs text-[#AEB5C0]/75">Raised capital to scale charging software integrations across India.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Software Hub Launches</p>
                <p className="text-xs text-[#AEB5C0]/75">Unveiled central portals tracking charging slot queues.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Official Brand Assets",
        description: "Download official vector assets, guidelines, and hex layouts.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Logo Package:</span> SVG, PNG formats with dark/light variants.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Brand Fonts:</span> Includes typography licenses for marketing.
            </div>
          </div>
        )
      }
    ]
  },
  developers: {
    title: "Developer Integration Console",
    subtitle: "Explore REST APIs, streaming MQTT telemetry guides, BMS diagnostics tools, and SDKs.",
    categoryName: "Developer Hub",
    stats: [
      { label: "Daily API Hits", value: "18.5M Calls", change: "99.99% Uptime SLA", changeType: "positive" },
      { label: "Active Devs", value: "1,450 Engineers", change: "Custom apps built", changeType: "positive" },
      { label: "SDK Bindings", value: "Python, Go, JS", change: "Official templates", changeType: "neutral" },
      { label: "Edge Latency", value: "12ms Average", change: "High-speed responses", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Telemetry Stream Guide",
        description: "Describes the formatting of battery state metrics emitted via MQTT CAN Bus sockets.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Code className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">JSON Pack Schema</p>
                <p className="text-xs text-[#AEB5C0]/75">Details coordinates, state-of-charge, and voltage fields.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">OAuth 2.0 Auth</p>
                <p className="text-xs text-[#AEB5C0]/75">Secure machine-to-machine integrations using JWT headers.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "API Endpoint Reference",
        description: "Details rate limits, testing consoles, and sandbox configurations.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Query Limits:</span> Standard tier grants 1,000 queries per minute.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Sandbox Keys:</span> Generated instantly inside client settings panels.
            </div>
          </div>
        )
      }
    ]
  },
  support: {
    title: "Support & Help Center",
    subtitle: "Resolve ticket queues, inspect hardware setup guides, and talk to technical assistants.",
    categoryName: "Support",
    stats: [
      { label: "Tickets Resolved", value: "24,000+ Cases", change: "98.7% Happy score", changeType: "positive" },
      { label: "Response Speed", value: "< 10 Mins Avg", change: "Commercial VIP queue", changeType: "positive" },
      { label: "FAQs Published", value: "280 Guides", change: "Hardware & Software", changeType: "neutral" },
      { label: "Chatbot Accuracy", value: "84% Resolved", change: "Resolved by AI Bot", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Hardware Debugging Manuals",
        description: "Read visual steps to resolve local utility phase imbalances and communication drops.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Headphones className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">OCPP Connection Fails</p>
                <p className="text-xs text-[#AEB5C0]/75">Audit internet connections and SSL certificates on the wallbox.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Reset Charge Controllers</p>
                <p className="text-xs text-[#AEB5C0]/75">Instructions to safely power-cycle logic chips on chargers.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Live Ticket Dashboard",
        description: "Track resolved issue benchmarks, SLA response queues, and system audits.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Severity 1 Issues:</span> Instant phone-support line callbacks.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">System Status:</span> All cloud endpoints reporting green operations.
            </div>
          </div>
        )
      }
    ]
  },
  contact: {
    title: "Contact NexioraEV Teams",
    subtitle: "Reach our enterprise sales, partnership developers, or customer support engineers.",
    categoryName: "Contact Us",
    stats: [
      { label: "Inbound channels", value: "Sales, Partner", change: "Fast responses", changeType: "neutral" },
      { label: "SLA Response", value: "Under 4 Hours", change: "SLA backed response", changeType: "positive" },
      { label: "Global Offices", value: "3 Hub Locations", change: "HQ & Regional Hubs", changeType: "neutral" },
      { label: "Meeting booking", value: "100% online", change: "Instant slot bookings", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Enterprise Sales Inquiries",
        description: "Connect with our sales team to deploy fleet management tools or swapping network arrays.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Mail className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Email Address</p>
                <p className="text-xs text-[#AEB5C0]/75">partner@nexioraev.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#EC4899]" />
              <div>
                <p className="text-sm font-bold text-white">Book Video Call</p>
                <p className="text-xs text-[#AEB5C0]/75">Schedule a slot directly on our corporate calendar.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Global Office Directory",
        description: "Addresses and telephone lines for our global offices and engineering zones.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">New Delhi HQ:</span> Aerocity, Technical District, Delhi 110037.
            </div>
            <div className="p-2.5 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/10">
              <span className="text-[#EC4899] font-bold">Munich R&D:</span> Engineering Corridor, Munich 80331.
            </div>
          </div>
        )
      }
    ]
  }
};

export function generateStaticParams() {
  return [
    { slug: "about" },
    { slug: "team" },
    { slug: "partners" },
    { slug: "careers" },
    { slug: "media" },
    { slug: "developers" },
    { slug: "support" },
    { slug: "contact" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Dynamic lookup fallback to "about" to ensure 404 is NEVER returned.
  const pageData = (DATA_MAP[slug as string] || DATA_MAP.about) as {
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
    <CompanyDashboardTemplate
      title={pageData.title}
      subtitle={pageData.subtitle}
      categoryName={pageData.categoryName}
      stats={pageData.stats}
      widgets={pageData.widgets}
    />
  );
}
