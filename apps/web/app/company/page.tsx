import Link from "next/link";
import { 
  Building, Users, Handshake, Briefcase, Mic, Code, Headphones, Mail, ArrowRight 
} from "lucide-react";

const CATEGORIES = [
  {
    name: "About NexioraEV",
    description: "Discover our vision, mission and commitment to accelerating electric mobility.",
    href: "/company/about",
    icon: Building
  },
  {
    name: "Our Team",
    description: "Meet the engineers, designers, researchers and innovators behind NexioraEV.",
    href: "/company/team",
    icon: Users
  },
  {
    name: "Partners",
    description: "Technology partners, manufacturers, charging providers and ecosystem collaborators.",
    href: "/company/partners",
    icon: Handshake
  },
  {
    name: "Careers",
    description: "Join our team and help shape the future of sustainable transportation.",
    href: "/company/careers",
    icon: Briefcase
  },
  {
    name: "Press & Media",
    description: "Company announcements, media coverage, brand assets and press releases.",
    href: "/company/media",
    icon: Mic
  },
  {
    name: "Developers",
    description: "Developer APIs, SDKs, documentation and integration resources.",
    href: "/company/developers",
    icon: Code
  },
  {
    name: "Support Center",
    description: "Customer support, FAQs, documentation and technical assistance.",
    href: "/company/support",
    icon: Headphones
  },
  {
    name: "Contact Us",
    description: "Reach our sales, support and partnership teams.",
    href: "/company/contact",
    icon: Mail
  }
];

export default function CompanyIndexPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[11px] font-bold uppercase tracking-wider">
            NexioraEV Corporate Identity Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-[#EC4899]/80 bg-clip-text text-transparent">
            Meet the Team Building the Future
          </h1>
          <p className="text-[#AEB5C0]/80 text-base sm:text-lg leading-relaxed">
            Discover NexioraEV. Learn about our corporate mission to electrify commercial mobility loops, explore job listings, access developer APIs, and get in touch with our partnerships teams.
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
                className="group relative flex flex-col justify-between p-6 h-[220px] rounded-[18px] border border-white/5 bg-white/[0.01] hover:bg-[#EC4899]/[0.02] hover:border-[#EC4899]/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_12px_40px_-12px_rgba(236,72,153,0.15)] overflow-hidden"
              >
                {/* Visual abstract pattern */}
                <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(236,72,153,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* Micro-interaction highlight glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#EC4899]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#EC4899]/40 transition-colors">
                    <Icon className="w-6 h-6 text-[#AEB5C0] group-hover:text-[#EC4899] group-hover:scale-105 transition-all duration-300" strokeWidth={1.8} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[18px] font-bold text-white group-hover:text-[#EC4899] transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-[13px] text-[#AEB5C0]/70 line-clamp-3 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#EC4899] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10 mt-4">
                  Launch Brand Node
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
