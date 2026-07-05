import { SchemesDashboardTemplate } from "@/components/layout/schemes-dashboard-template";
import { 
  Landmark, Map, Calculator, Route, Factory, Plug, Newspaper, BadgeCheck, ArrowRight,
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
  central: {
    title: "Central Government Schemes",
    subtitle: "Nationwide clean transit funding frameworks, PM E-Drive allocation grids, and heavy logistics incentives.",
    categoryName: "Central Govt",
    stats: [
      { label: "PM E-Drive Budget", value: "₹10,900 Cr", change: "Approved funds", changeType: "positive" },
      { label: "Subsidized EVs", value: "2.4M Units", change: "Two/Three Wheelers", changeType: "neutral" },
      { label: "Public Charger Pool", value: "₹2,000 Cr", change: "Infrastructure boost", changeType: "positive" },
      { label: "Ministry Body", value: "MHI India", change: "Heavy Industries", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "PM E-Drive Frameworks",
        description: "Details eligibility criteria for electric two-wheelers (e-2W), three-wheelers (e-3W), and electric buses.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Landmark className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">E-Voucher Subsidies</p>
                <p className="text-xs text-[#AEB5C0]/75">Generated at the time of purchase to give buyers instant cashbacks.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Advanced Battery Testing</p>
                <p className="text-xs text-[#AEB5C0]/75">Subsidized packs must undergo structural thermal testing audits.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Phased Manufacturing Program (PMP)",
        description: "Evaluates domestic value addition criteria required for OEMs to claim central government incentives.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Local Cell Sourcing:</span> Cells must be packaged into local battery assemblies.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">BMS Controls:</span> Hardware assembly must be completed inside domestic nodes.
            </div>
          </div>
        )
      }
    ]
  },
  state: {
    title: "State EV Policies",
    subtitle: "Compare state road tax waivers, registration fee exemptions, and direct purchase subsidies across India.",
    categoryName: "State Policies",
    stats: [
      { label: "Active Policies", value: "26 States", change: "Gazette notified", changeType: "positive" },
      { label: "Max Direct Subsidy", value: "₹1.5 Lakhs", change: "Depends on kWh sizing", changeType: "neutral" },
      { label: "RTO Tax Exemptions", value: "18 States", change: "Save up to ₹80,000", changeType: "positive" },
      { label: "Policy Validity", value: "5-Year Period", change: "Typical timeline", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Regional State Audits",
        description: "Ranks leading states like Maharashtra, Delhi, and Uttar Pradesh based on subsidy payout speed.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Map className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Maharashtra EV Policy</p>
                <p className="text-xs text-[#AEB5C0]/75">Features excellent upfront purchase incentives for electric fleets.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Delhi EV Capital Grant</p>
                <p className="text-xs text-[#AEB5C0]/75">Additional cashbacks linked to scrappage certificates.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Municipal Parking Incentives",
        description: "Lists municipal councils that offer free parking slots and dedicated bays for green-plate EVs.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Free Parking:</span> Green plate parking is 100% free in select metro parking spots.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Dedicated Bays:</span> Features smart chargers reserved for municipal parking EV fleets.
            </div>
          </div>
        )
      }
    ]
  },
  calculator: {
    title: "EV Subsidy Calculator",
    subtitle: "Compute your total upfront savings by feeding in your state location, vehicle classification, and battery capacity specs.",
    categoryName: "Calculator",
    stats: [
      { label: "Incentive Lookups", value: "180,000+ Runs", change: "Daily calculations", changeType: "positive" },
      { label: "Database Vehicles", value: "140 Models", change: "Updated database", changeType: "neutral" },
      { label: "Avg Subsidy Computed", value: "₹22,500 Saved", change: "Across all classes", changeType: "positive" },
      { label: "Formula Accuracy", value: "99.9%", change: "Official policy math", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Incentive Math Processor",
        description: "Enter battery capacity (kWh) to calculate PM E-Drive incentives instantly.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Calculator className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Dynamic Battery Calculator</p>
                <p className="text-xs text-[#AEB5C0]/75">Calculates ₹5,000 per kWh for eligible two-wheeled EVs.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Stacked State Cashback</p>
                <p className="text-xs text-[#AEB5C0]/75">Computes state incentives layered on top of central subsidies.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Central vs State Stacked Benefits",
        description: "Lists how stacking regional tax waivers creates massive upfront capital savings.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">State Subsidy:</span> Stacked benefits up to ₹10,000 for select cities.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">RTO savings:</span> Adds registration fee waivers to lower final vehicle prices.
            </div>
          </div>
        )
      }
    ]
  },
  "tax-benefits": {
    title: "Road Tax & RTO Benefits",
    subtitle: "Explore detailed regional registration waivers, RTO tax exemptions, and personal tax write-offs.",
    categoryName: "Tax Benefits",
    stats: [
      { label: "RTO Fee Waiver", value: "100% Free", change: "In select states", changeType: "positive" },
      { label: "Tax Deduction Law", value: "Section 80EEB", change: "Interest deductions", changeType: "neutral" },
      { label: "Annual Loan Cap", value: "Up to ₹1.5L", change: "For personal loans", changeType: "positive" },
      { label: "Avg Cost Saved", value: "₹35,000 Saved", change: "RTO fee reduction", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Section 80EEB Income Tax Write-off",
        description: "Guides individual taxpayers on claiming interest deductions on loans taken for EV purchases.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Route className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Loan Interest Offsets</p>
                <p className="text-xs text-[#AEB5C0]/75">Claims up to ₹1,50,000 off taxable income for personal EV purchases.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Green License Plates</p>
                <p className="text-xs text-[#AEB5C0]/75">License plates that grant access to toll-free lanes in select cities.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Registration Fee Exemptions",
        description: "RTO rules across India waiving standard processing charges for electric drivetrains.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">RTO Registration:</span> Waived completely across multiple major states.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Commercial Registrations:</span> Discounted road tax fees up to 50% for e-trucks.
            </div>
          </div>
        )
      }
    ]
  },
  business: {
    title: "Commercial EV Incentives",
    subtitle: "MSME grants, local EV park industrial allocations, charging infrastructure hubs, and corporate fleet depreciation benefits.",
    categoryName: "Commercial",
    stats: [
      { label: "Corporate WDV Rate", value: "40% Depreciation", change: "Accelerated write-offs", changeType: "positive" },
      { label: "MSME Capital Grant", value: "Up to ₹50L", change: "Factory setups", changeType: "positive" },
      { label: "Stamp Duty Waiver", value: "100% Free", change: "Industrial land lease", changeType: "positive" },
      { label: "Fleet ROI Factor", value: "3.2x vs ICE", change: "5-year projection", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Accelerated Fleet Depreciation",
        description: "Details how companies write down 40% of the EV cost in year one, yielding large tax savings.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Factory className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Fleet Asset Depreciation</p>
                <p className="text-xs text-[#AEB5C0]/75">Enables faster corporate tax offsets compared to standard ICE assets.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Production Linked Incentives (PLI)</p>
                <p className="text-xs text-[#AEB5C0]/75">Subsidizes large-scale cell chemistries and core powertrain parts.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "State Industrial Park Hubs",
        description: "Government-supported special economic zones dedicated to battery swapping and local assembly.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">EV SEZ Parks:</span> Rent subsidies and grid power priority support.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">MSME Funding:</span> Interest subvention grants on tooling setup loans.
            </div>
          </div>
        )
      }
    ]
  },
  charging: {
    title: "Charging Infrastructure Grants",
    subtitle: "Municipal subsidy codes for setting up residential charger points and public fast-charging nodes.",
    categoryName: "Charging Grants",
    stats: [
      { label: "Public Grants Cap", value: "70% of setup", change: "For DC fast charger rigs", changeType: "positive" },
      { label: "Home Charger Rebates", value: "₹3,000 Fixed", change: "Deducted from utility bills", changeType: "neutral" },
      { label: "Discom Connection", value: "Express Line", change: "Guaranteed in 7 days", changeType: "positive" },
      { label: "Grants Disbursed", value: "12,000+ Nodes", change: "National highway grid", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Highway Charger Subsidies",
        description: "Details central grant limits for setting up public CCS2 DC charging units on national highway grids.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Plug className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">DC Charger Capital Grants</p>
                <p className="text-xs text-[#AEB5C0]/75">Subsidizes upfront equipment procurement up to 70%.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">DISCOM EV Tariff Codes</p>
                <p className="text-xs text-[#AEB5C0]/75">Discounted commercial rates for high-tension lines.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Residential Society Sub-meters",
        description: "Guides housing societies on applying for dedicated EV sub-meters with discounted tariffs.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Society EV Charger:</span> Local municipal cashbacks for shared chargers.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Single-point Connection:</span> One high-voltage line split across parking slots.
            </div>
          </div>
        )
      }
    ]
  },
  policy: {
    title: "Policy Updates & Gazette",
    subtitle: "Real-time RSS feeds, official gazette notifications, government announcements, and clean transit guidelines.",
    categoryName: "Policy Alerts",
    stats: [
      { label: "Monthly Notifications", value: "12 Alerts", change: "Summarized summary", changeType: "positive" },
      { label: "Subscribed Readers", value: "14,000 Users", change: "Automakers & fleets", changeType: "positive" },
      { label: "Avg Read Time", value: "3 Minutes", change: "Quick policy guides", changeType: "neutral" },
      { label: "Source Validity", value: "100% Gazette", change: "Official notification source", changeType: "positive" }
    ],
    widgets: [
      {
        title: "Latest MHI Gazette Notifications",
        description: "Official bulletins detailing PM E-Drive voucher eligibility checks and cell safety specifications.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Newspaper className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">E-Voucher Voucher Rules</p>
                <p className="text-xs text-[#AEB5C0]/75">Requires verified Aadhaar bindings to prevent multiple claims.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">CAFE Compliances</p>
                <p className="text-xs text-[#AEB5C0]/75">Forces automakers to scale electric drivetrain ratios next quarter.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "AIS 156 Battery Safety Codes",
        description: "Important safety amendments requiring active battery sensors to report temperature anomalies.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Overcharge Protections:</span> Mandatory smart relays inside BMS boards.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Ingress Protection:</span> Minimal IP67 waterproofing required for cells.
            </div>
          </div>
        )
      }
    ]
  },
  eligibility: {
    title: "Subsidy Eligibility Checker",
    subtitle: "Scan vehicle registration templates, tax credentials, and local discom codes to check if you qualify for direct subsidies.",
    categoryName: "Eligibility",
    stats: [
      { label: "Users Checked", value: "64,000 Profiles", change: "Instant online checks", changeType: "positive" },
      { label: "Average Pass Rate", value: "88.4% Passed", change: "Meets basic criteria", changeType: "positive" },
      { label: "Processing Speed", value: "< 1 Second", change: "Automated API check", changeType: "positive" },
      { label: "Documents Needed", value: "3 Basic IDs", change: "Aadhaar, Bill, License", changeType: "neutral" }
    ],
    widgets: [
      {
        title: "Upfront Document Verification",
        description: "Check if your billing invoice and RTO registration details align with FAME-II limits.",
        content: (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <BadgeCheck className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Aadhaar Mobile Link</p>
                <p className="text-xs text-[#AEB5C0]/75">Subsidies are mapped dynamically via Aadhaar OTP checks.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <Settings className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <p className="text-sm font-bold text-white">Dealer Registration Check</p>
                <p className="text-xs text-[#AEB5C0]/75">Confirm if the dealership is registered under the PM E-Drive scheme.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "One-Click Aadhaar Sub-OTP Verification",
        description: "Sandboxed Aadhaar validation flow confirming you haven't claimed a similar EV subsidy this year.",
        content: (
          <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">One Subsidy Limit:</span> PM E-Drive policies limit buyers to one subsidy per Aadhaar card.
            </div>
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/5 border border-[#4F46E5]/10">
              <span className="text-[#4F46E5] font-bold">Verification SLA:</span> Yields absolute approval codes in under 10 seconds.
            </div>
          </div>
        )
      }
    ]
  }
};

export function generateStaticParams() {
  return [
    { slug: "central" },
    { slug: "state" },
    { slug: "calculator" },
    { slug: "tax-benefits" },
    { slug: "business" },
    { slug: "charging" },
    { slug: "policy" },
    { slug: "eligibility" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SchemesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Dynamic lookup fallback to "central" to ensure 404 is NEVER returned.
  const pageData = (DATA_MAP[slug as string] || DATA_MAP.central) as {
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
    <SchemesDashboardTemplate
      title={pageData.title}
      subtitle={pageData.subtitle}
      categoryName={pageData.categoryName}
      stats={pageData.stats}
      widgets={pageData.widgets}
    />
  );
}
