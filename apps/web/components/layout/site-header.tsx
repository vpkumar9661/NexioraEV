"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { APP_NAME, APP_TAGLINE } from "@nexiora/shared";
import { 
  Zap, ChevronDown, Search, Menu, X, Box, Brain, ShoppingCart, Shield, Building,
  BookOpen, Battery, Plug, Cpu, Sparkles, GraduationCap, Calculator, Bot, ArrowRight,
  Truck, Sun, Activity, Headphones, LineChart, TrendingUp, Wand2, Wrench, Lightbulb, Rocket,
  Car, GitCompare, Tag, Store, Rotate3d, Sliders,
  Landmark, Map, Route, Factory, Newspaper, BadgeCheck,
  Users, Handshake, Briefcase, Mic, Code, Mail
} from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "EVTech", icon: Zap },
  { name: "Solutions", icon: Box },
  { name: "Intelligence", icon: Brain },
  { name: "Marketplace", icon: ShoppingCart },
  { name: "Schemes", icon: Shield },
  { name: "Company", icon: Building }
];

const EVTECH_CATEGORIES = [
  {
    name: "EV Basics",
    description: "Learn the fundamentals of Electric Vehicles",
    href: "/evtech/basics",
    icon: BookOpen
  },
  {
    name: "Battery Lab",
    description: "Battery chemistry, BMS, thermal management and safety",
    href: "/evtech/battery-lab",
    icon: Battery
  },
  {
    name: "Battery Digital Twin",
    description: "Build, simulate and analyze virtual battery packs",
    href: "/evtech/digital-twin",
    icon: GitCompare
  },
  {
    name: "Charging Hub",
    description: "Charging types, connectors, stations and infrastructure",
    href: "/evtech/charging-hub",
    icon: Plug
  },
  {
    name: "EV Components",
    description: "Motors, controllers, inverter, drivetrain and architecture",
    href: "/evtech/components",
    icon: Cpu
  },
  {
    name: "Digital EV Studio",
    description: "Build, configure and simulate complete electric vehicles",
    href: "/evtech/digital-studio",
    icon: Rotate3d
  },
  {
    name: "Drive Simulator",
    description: "Virtually drive your custom EV and monitor real-time physics telemetry",
    href: "/evtech/drive-simulator",
    icon: Activity
  },
  {
    name: "Future Tech",
    description: "Solid-state batteries, V2G, autonomous mobility and AI",
    href: "/evtech/future-tech",
    icon: Sparkles
  },
  {
    name: "Learning Center",
    description: "Guides, tutorials, articles and video lessons",
    href: "/evtech/learning-center",
    icon: GraduationCap
  },
  {
    name: "Calculators & Tools",
    description: "Charging cost, range, EMI, battery health and ROI tools",
    href: "/evtech/calculators-tools",
    icon: Calculator
  },
  {
    name: "Engineering Workbench",
    description: "Integrated professional workspace to design battery packs and simulate physics performance",
    href: "/evtech/calculators-tools/workbench",
    icon: Sliders
  },
  {
    name: "AI EV Assistant",
    description: "Ask questions and get intelligent EV guidance",
    href: "/evtech/ai-assistant",
    icon: Bot
  }
];

const SOLUTIONS_CATEGORIES = [
  {
    name: "EV Charging Solutions",
    description: "Home chargers, commercial charging stations, DC fast charging and smart charging infrastructure.",
    href: "/solutions/charging",
    icon: Plug
  },
  {
    name: "Battery Solutions",
    description: "Battery systems, swapping, thermal management, recycling and energy storage.",
    href: "/solutions/battery",
    icon: Battery
  },
  {
    name: "Fleet Solutions",
    description: "Complete EV fleet management for businesses, logistics, ride sharing and commercial transport.",
    href: "/solutions/fleet",
    icon: Truck
  },
  {
    name: "Solar + EV",
    description: "Integrate rooftop solar with EV charging for maximum energy savings.",
    href: "/solutions/solar",
    icon: Sun
  },
  {
    name: "Business Solutions",
    description: "EV infrastructure for offices, industries, apartments and commercial facilities.",
    href: "/solutions/business",
    icon: Building
  },
  {
    name: "Smart Energy",
    description: "Energy monitoring, V2G, smart grid integration and intelligent energy optimization.",
    href: "/solutions/energy",
    icon: Activity
  },
  {
    name: "AI Solutions",
    description: "Predictive maintenance, AI diagnostics, smart charging optimization and analytics.",
    href: "/solutions/ai",
    icon: Brain
  },
  {
    name: "Consultation",
    description: "Expert EV consulting, project planning, technology guidance and implementation support.",
    href: "/solutions/consultation",
    icon: Headphones
  }
];

const INTELLIGENCE_CATEGORIES = [
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

const MARKETPLACE_CATEGORIES = [
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

const SCHEMES_CATEGORIES = [
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

const COMPANY_CATEGORIES = [
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

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEvtechMobileOpen, setIsEvtechMobileOpen] = useState(false);
  const [isSolutionsMobileOpen, setIsSolutionsMobileOpen] = useState(false);
  const [isIntelligenceMobileOpen, setIsIntelligenceMobileOpen] = useState(false);
  const [isMarketplaceMobileOpen, setIsMarketplaceMobileOpen] = useState(false);
  const [isSchemesMobileOpen, setIsSchemesMobileOpen] = useState(false);
  const [isCompanyMobileOpen, setIsCompanyMobileOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [visibleMenus, setVisibleMenus] = useState<string[]>([]);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (activeMenu) {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      setVisibleMenus((prev) => {
        if (prev.includes(activeMenu)) return prev;
        return [...prev, activeMenu];
      });
      const timer = setTimeout(() => {
        setVisibleMenus([activeMenu]);
      }, 180);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleMenus([]);
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [activeMenu]);

  const handleMouseEnter = (menuName: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    setActiveMenu(menuName);
    if (menuName === "evtech") {
      EVTECH_CATEGORIES.forEach((category) => {
        router.prefetch(category.href);
      });
    } else if (menuName === "solutions") {
      SOLUTIONS_CATEGORIES.forEach((category) => {
        router.prefetch(category.href);
      });
    } else if (menuName === "intelligence") {
      INTELLIGENCE_CATEGORIES.forEach((category) => {
        router.prefetch(category.href);
      });
    } else if (menuName === "marketplace") {
      MARKETPLACE_CATEGORIES.forEach((category) => {
        router.prefetch(category.href);
      });
    } else if (menuName === "schemes") {
      SCHEMES_CATEGORIES.forEach((category) => {
        router.prefetch(category.href);
      });
    } else if (menuName === "company") {
      COMPANY_CATEGORIES.forEach((category) => {
        router.prefetch(category.href);
      });
    }
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleLinkClick = () => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsEvtechMobileOpen(false);
    setIsSolutionsMobileOpen(false);
    setIsIntelligenceMobileOpen(false);
    setIsMarketplaceMobileOpen(false);
    setIsSchemesMobileOpen(false);
    setIsCompanyMobileOpen(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --orange: #00D26A;
          --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes liquid-reflection {
          0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          20% { opacity: 0.4; }
          40% { opacity: 0; transform: translateX(250%) skewX(-25deg); }
          100% { transform: translateX(250%) skewX(-25deg); opacity: 0; }
        }
        .animate-liquid-reflection {
          animation: liquid-reflection 10s var(--ease-apple) infinite;
        }
        .liquid-navbar {
          background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%), rgba(9,11,16,0.55);
          backdrop-filter: blur(24px) saturate(190%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 
            0 8px 32px -4px rgba(0,0,0,0.35),
            inset 0 1px 0 0 rgba(255,255,255,0.06);
          transition: all 400ms var(--ease-apple);
        }
        .liquid-navbar.scrolled {
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.005) 100%), rgba(9,11,16,0.75);
          backdrop-filter: blur(32px) saturate(210%);
          box-shadow: 
            0 12px 40px -4px rgba(0,0,0,0.5),
            inset 0 1px 0 0 rgba(255,255,255,0.1);
        }
        .glass-btn {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
          transition: all 400ms var(--ease-apple);
          position: relative;
          overflow: hidden;
        }
        .glass-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15) !important;
          transform: translateY(-1.5px) scale(1.02);
          box-shadow: 
            0 8px 20px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .glass-btn-active {
          background: rgba(0, 210, 106, 0.08);
          border: 1px solid rgba(0, 210, 106, 0.4) !important;
          box-shadow: 
            0 4px 15px rgba(0, 210, 106, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.06);
          transition: all 400ms var(--ease-apple);
        }
        .evtech-nav-btn {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transition: 
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 200ms cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .evtech-nav-btn:hover, .evtech-nav-btn-active {
          background: linear-gradient(135deg, #8B5CF6 0%, #6D4AFF 100%) !important;
          border-color: rgba(167, 139, 250, 0.45) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(139, 92, 246, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          filter: brightness(1.1);
        }
        .evtech-nav-icon {
          color: #AEB5C0;
          opacity: 0.8;
          transition: color 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .evtech-nav-btn:hover .evtech-nav-icon, 
        .evtech-nav-btn-active .evtech-nav-icon {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .evtech-nav-arrow {
          color: rgba(174, 181, 192, 0.6);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .evtech-nav-btn:hover .evtech-nav-arrow, 
        .evtech-nav-btn-active .evtech-nav-arrow {
          color: #FFFFFF !important;
          transform: rotate(180deg);
        }
        .solutions-nav-btn {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transition: 
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 200ms cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .solutions-nav-btn:hover, .solutions-nav-btn-active {
          background: linear-gradient(135deg, #00D26A 0%, #22C55E 100%) !important;
          border-color: rgba(34, 197, 94, 0.45) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(34, 197, 94, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          filter: brightness(1.1);
        }
        .solutions-nav-icon {
          color: #AEB5C0;
          opacity: 0.8;
          transition: color 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .solutions-nav-btn:hover .solutions-nav-icon, 
        .solutions-nav-btn-active .solutions-nav-icon {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .solutions-nav-arrow {
          color: rgba(174, 181, 192, 0.6);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .solutions-nav-btn:hover .solutions-nav-arrow, 
        .solutions-nav-btn-active .solutions-nav-arrow {
          color: #FFFFFF !important;
          transform: rotate(180deg);
        }
        .intelligence-nav-btn {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transition: 
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 200ms cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .intelligence-nav-btn:hover, .intelligence-nav-btn-active {
          background: linear-gradient(135deg, #FF8C00 0%, #FFA726 100%) !important;
          border-color: rgba(255, 140, 0, 0.45) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(255, 140, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          filter: brightness(1.1);
        }
        .intelligence-nav-icon {
          color: #AEB5C0;
          opacity: 0.8;
          transition: color 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .intelligence-nav-btn:hover .intelligence-nav-icon, 
        .intelligence-nav-btn-active .intelligence-nav-icon {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .intelligence-nav-arrow {
          color: rgba(174, 181, 192, 0.6);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .intelligence-nav-btn:hover .intelligence-nav-arrow, 
        .intelligence-nav-btn-active .intelligence-nav-arrow {
          color: #FFFFFF !important;
          transform: rotate(180deg);
        }
        .marketplace-nav-btn {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transition: 
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 200ms cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .marketplace-nav-btn:hover, .marketplace-nav-btn-active {
          background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%) !important;
          border-color: rgba(59, 130, 246, 0.45) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(59, 130, 246, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          filter: brightness(1.1);
        }
        .marketplace-nav-icon {
          color: #AEB5C0;
          opacity: 0.8;
          transition: color 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .marketplace-nav-btn:hover .marketplace-nav-icon, 
        .marketplace-nav-btn-active .marketplace-nav-icon {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .marketplace-nav-arrow {
          color: rgba(174, 181, 192, 0.6);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .marketplace-nav-btn:hover .marketplace-nav-arrow, 
        .marketplace-nav-btn-active .marketplace-nav-arrow {
          color: #FFFFFF !important;
          transform: rotate(180deg);
        }
        .schemes-nav-btn {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transition: 
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 200ms cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .schemes-nav-btn:hover, .schemes-nav-btn-active {
          background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%) !important;
          border-color: rgba(99, 102, 241, 0.45) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(99, 102, 241, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          filter: brightness(1.1);
        }
        .schemes-nav-icon {
          color: #AEB5C0;
          opacity: 0.8;
          transition: color 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .schemes-nav-btn:hover .schemes-nav-icon, 
        .schemes-nav-btn-active .schemes-nav-icon {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .schemes-nav-arrow {
          color: rgba(174, 181, 192, 0.6);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .schemes-nav-btn:hover .schemes-nav-arrow, 
        .schemes-nav-btn-active .schemes-nav-arrow {
          color: #FFFFFF !important;
          transform: rotate(180deg);
        }
        .company-nav-btn {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transition: 
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 200ms cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .company-nav-btn:hover, .company-nav-btn-active {
          background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%) !important;
          border-color: rgba(236, 72, 153, 0.45) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(236, 72, 153, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          filter: brightness(1.1);
        }
        .company-nav-icon {
          color: #AEB5C0;
          opacity: 0.8;
          transition: color 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .company-nav-btn:hover .company-nav-icon, 
        .company-nav-btn-active .company-nav-icon {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .company-nav-arrow {
          color: rgba(174, 181, 192, 0.6);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .company-nav-btn:hover .company-nav-arrow, 
        .company-nav-btn-active .company-nav-arrow {
          color: #FFFFFF !important;
          transform: rotate(180deg);
        }
        .search-glass {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
          transition: all 400ms var(--ease-apple);
          border-radius: 12px;
        }
        .search-glass:focus-within {
          border-color: rgba(0, 210, 106, 0.45);
          box-shadow: 0 0 15px rgba(0, 210, 106, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          background: rgba(255,255,255,0.05);
        }
        .quote-btn {
          background: linear-gradient(135deg, #00D26A 0%, #00E5FF 100%);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 
            0 4px 12px rgba(0, 210, 106, 0.22),
            inset 0 1px 0 rgba(255,255,255,0.2);
          border-radius: 12px;
          transition: all 400ms var(--ease-apple);
          position: relative;
          overflow: hidden;
        }
        .quote-btn:hover {
          transform: translateY(-1.5px) scale(1.03);
          box-shadow: 
            0 8px 24px rgba(0, 210, 106, 0.38),
            0 0 15px rgba(0, 210, 106, 0.25),
            inset 0 1px 0 rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.22);
        }
        .glass-dropdown {
          background: linear-gradient(180deg, rgba(15,17,23,0.85) 0%, rgba(9,11,16,0.95) 100%);
          backdrop-filter: blur(32px) saturate(200%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.04);
        }
        .mega-menu-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: calc(100% - 48px);
          max-width: 1040px;
          height: auto;
          max-height: 340px;
          background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 60%), 
                      linear-gradient(180deg, rgba(12, 15, 22, 0.9) 0%, rgba(12, 15, 22, 0.98) 100%),
                      rgba(139, 92, 246, 0.04);
          backdrop-filter: blur(30px) saturate(210%);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 20px;
          box-shadow: 
            0 20px 48px -10px rgba(139, 92, 246, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.08);
          z-index: 40;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .mega-menu-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .mega-menu-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .solutions-mega-menu-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: calc(100% - 48px);
          max-width: 1040px;
          height: auto;
          max-height: 340px;
          background: radial-gradient(circle at 50% 0%, rgba(0, 210, 106, 0.15) 0%, transparent 60%), 
                      linear-gradient(180deg, rgba(8, 16, 12, 0.92) 0%, rgba(6, 12, 9, 0.98) 100%),
                      rgba(0, 210, 106, 0.03);
          backdrop-filter: blur(30px) saturate(210%);
          border: 1px solid rgba(34, 197, 94, 0.35);
          border-radius: 20px;
          box-shadow: 
            0 20px 48px -10px rgba(34, 197, 94, 0.35),
            inset 0 1px 1px rgba(255, 255, 255, 0.08);
          z-index: 40;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .solutions-mega-menu-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .solutions-mega-menu-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .intelligence-mega-menu-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: calc(100% - 48px);
          max-width: 1040px;
          height: auto;
          max-height: 340px;
          background: radial-gradient(circle at 50% 0%, rgba(255, 140, 0, 0.15) 0%, transparent 60%), 
                      linear-gradient(180deg, rgba(23, 18, 11, 0.92) 0%, rgba(15, 12, 7, 0.98) 100%),
                      rgba(255, 140, 0, 0.03);
          backdrop-filter: blur(30px) saturate(210%);
          border: 1px solid rgba(255, 140, 0, 0.35);
          border-radius: 20px;
          box-shadow: 
            0 20px 48px -10px rgba(255, 140, 0, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.08);
          z-index: 40;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .intelligence-mega-menu-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .intelligence-mega-menu-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .marketplace-mega-menu-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: calc(100% - 48px);
          max-width: 1040px;
          height: auto;
          max-height: 340px;
          background: radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 60%), 
                      linear-gradient(180deg, rgba(12, 18, 32, 0.92) 0%, rgba(8, 12, 22, 0.98) 100%),
                      rgba(37, 99, 235, 0.03);
          backdrop-filter: blur(30px) saturate(210%);
          border: 1px solid rgba(59, 130, 246, 0.35);
          border-radius: 20px;
          box-shadow: 
            0 20px 48px -10px rgba(59, 130, 246, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.08);
          z-index: 40;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .marketplace-mega-menu-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .marketplace-mega-menu-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .schemes-mega-menu-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: calc(100% - 48px);
          max-width: 1040px;
          height: auto;
          max-height: 340px;
          background: radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.15) 0%, transparent 60%), 
                      linear-gradient(180deg, rgba(14, 12, 26, 0.92) 0%, rgba(9, 8, 17, 0.98) 100%),
                      rgba(79, 70, 229, 0.03);
          backdrop-filter: blur(30px) saturate(210%);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 20px;
          box-shadow: 
            0 20px 48px -10px rgba(99, 102, 241, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.08);
          z-index: 40;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .schemes-mega-menu-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .schemes-mega-menu-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .company-mega-menu-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: calc(100% - 48px);
          max-width: 1040px;
          height: auto;
          max-height: 340px;
          background: radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 60%), 
                      linear-gradient(180deg, rgba(26, 10, 18, 0.92) 0%, rgba(17, 7, 12, 0.98) 100%),
                      rgba(236, 72, 153, 0.03);
          backdrop-filter: blur(30px) saturate(210%);
          border: 1px solid rgba(236, 72, 153, 0.35);
          border-radius: 20px;
          box-shadow: 
            0 20px 48px -10px rgba(236, 72, 153, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.08);
          z-index: 40;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .company-mega-menu-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .company-mega-menu-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .glass-dropdown-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          width: 200px;
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.97);
          transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 180ms cubic-bezier(0.16, 1, 0.3, 1), 
                      visibility 180ms;
        }
        .glass-dropdown-panel.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        .glass-dropdown-panel.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(6px) scale(0.97);
        }
        .mega-menu-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.01);
          border-radius: 14px;
          height: 102px;
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mega-menu-card:hover {
          background: rgba(139, 92, 246, 0.06);
          border-color: rgba(139, 92, 246, 0.35) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px -8px rgba(139, 92, 246, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .mega-menu-card:hover .mega-arrow {
          transform: translateX(4px);
          color: #8B5CF6;
        }
        .mega-menu-card:hover .mega-icon {
          transform: scale(1.08);
          color: #8B5CF6;
        }
        .solutions-mega-menu-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.01);
          border-radius: 14px;
          height: 102px;
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .solutions-mega-menu-card:hover {
          background: rgba(0, 210, 106, 0.06);
          border-color: rgba(34, 197, 94, 0.35) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px -8px rgba(34, 197, 94, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .solutions-mega-menu-card:hover .solutions-mega-arrow {
          transform: translateX(4px);
          color: #00D26A;
        }
        .solutions-mega-menu-card:hover .solutions-mega-icon {
          transform: scale(1.05);
          color: #00D26A;
        }
        .intelligence-mega-menu-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.01);
          border-radius: 14px;
          height: 102px;
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .intelligence-mega-menu-card:hover {
          background: rgba(255, 140, 0, 0.06);
          border-color: rgba(255, 140, 0, 0.35) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px -8px rgba(255, 140, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .intelligence-mega-menu-card:hover .intelligence-mega-arrow {
          transform: translateX(4px);
          color: #FF8C00;
        }
        .intelligence-mega-menu-card:hover .intelligence-mega-icon {
          transform: scale(1.05);
          color: #FF8C00;
        }
        .marketplace-mega-menu-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.01);
          border-radius: 14px;
          height: 102px;
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .marketplace-mega-menu-card:hover {
          background: rgba(37, 99, 235, 0.06);
          border-color: rgba(59, 130, 246, 0.35) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px -8px rgba(59, 130, 246, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .marketplace-mega-menu-card:hover .marketplace-mega-arrow {
          transform: translateX(4px);
          color: #2563EB;
        }
        .marketplace-mega-menu-card:hover .marketplace-mega-icon {
          transform: scale(1.05);
          color: #2563EB;
        }
        .schemes-mega-menu-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.01);
          border-radius: 14px;
          height: 102px;
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .schemes-mega-menu-card:hover {
          background: rgba(79, 70, 229, 0.06);
          border-color: rgba(99, 102, 241, 0.35) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px -8px rgba(99, 102, 241, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .schemes-mega-menu-card:hover .schemes-mega-arrow {
          transform: translateX(4px);
          color: #4F46E5;
        }
        .schemes-mega-menu-card:hover .schemes-mega-icon {
          transform: scale(1.05);
          color: #4F46E5;
        }
        .company-mega-menu-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.01);
          border-radius: 14px;
          height: 102px;
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .company-mega-menu-card:hover {
          background: rgba(236, 72, 153, 0.06);
          border-color: rgba(236, 72, 153, 0.35) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 24px -8px rgba(236, 72, 153, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .company-mega-menu-card:hover .company-mega-arrow {
          transform: translateX(4px);
          color: #EC4899;
        }
        .company-mega-menu-card:hover .company-mega-icon {
          transform: scale(1.05);
          color: #EC4899;
        }

        /* Animated Logo branding */
        .logo-glow-bg {
          position: absolute;
          inset: -12px -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 210, 106, 0.22) 0%, transparent 68%);
          filter: blur(10px);
          opacity: 0.65;
          pointer-events: none;
          transition: all 400ms var(--ease-apple);
          animation: logo-glow-pulse 4s ease-in-out infinite;
        }
        .group:hover .logo-glow-bg {
          background: radial-gradient(circle, rgba(0, 210, 106, 0.42) 0%, transparent 68%);
          filter: blur(12px);
          opacity: 0.95;
          transform: scale(1.15);
        }
        @keyframes logo-glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }
        .logo-text-ev {
          background: linear-gradient(135deg, #00D26A 0%, #6BFF95 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 6px rgba(0, 210, 106, 0.3));
          transition: all 400ms var(--ease-apple);
          font-weight: 900;
        }
        .group:hover .logo-text-ev {
          filter: drop-shadow(0 0 10px rgba(0, 210, 106, 0.65)) brightness(1.2);
        }
        .logo-icon-zap {
          color: #00D26A;
          filter: drop-shadow(0 0 4px rgba(0, 210, 106, 0.4));
          transition: all 400ms var(--ease-apple);
        }
        .group:hover .logo-icon-zap {
          color: #6BFF95;
          filter: drop-shadow(0 0 8px rgba(0, 210, 106, 0.8)) brightness(1.2);
          transform: scale(1.12) rotate(8deg);
        }
      `}} />
      
      {/* Subtle Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#090b10]/20 backdrop-blur-[2px] transition-all duration-300 z-30 pointer-events-none ${
          activeMenu === "evtech" || activeMenu === "solutions" || activeMenu === "intelligence" || activeMenu === "marketplace" || activeMenu === "schemes" || activeMenu === "company" ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <div 
        className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pointer-events-none"
        onMouseLeave={handleMouseLeave}
      >
        <header 
          className={`liquid-navbar w-full h-[68px] lg:h-[72px] rounded-b-[16px] rounded-t-none flex items-center justify-between px-6 lg:px-10 relative overflow-visible pointer-events-auto ${
            isScrolled ? "scrolled" : ""
          }`}
        >
          {/* Glass Reflection Animation Layer */}
          <div className="absolute inset-0 pointer-events-none rounded-b-[16px] overflow-hidden mix-blend-overlay">
            <div className="absolute top-0 h-full w-[45%] bg-linear-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent animate-liquid-reflection" />
          </div>

          {/* Noise Texture Layer */}
          <div className="absolute inset-0 pointer-events-none rounded-b-[16px] opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] mix-blend-overlay" />

          {/* Logo */}
          <Link href="/" onClick={handleLinkClick} className="relative flex items-center gap-2 group z-10 shrink-0 transition-all duration-300 hover:opacity-95">
            <div className="logo-glow-bg" />
            <Zap className="logo-icon-zap size-[20px] lg:size-[22px] text-[#00D26A]" aria-hidden="true" strokeWidth={2.2} />
            <span className="text-lg lg:text-[20px] font-bold tracking-wider text-white hidden sm:block font-sans">
              Nexiora<span className="logo-text-ev">EV</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 z-10 self-center">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(`/${item.name.toLowerCase()}`);
              const menuKey = item.name.toLowerCase();
              const isMenuOpen = activeMenu === menuKey;
              
              if (item.name === "EVTech") {
                return (
                  <div 
                    key={item.name} 
                    className="relative flex items-center"
                    onMouseEnter={() => handleMouseEnter("evtech")}
                  >
                    <button
                      onClick={() => {
                        if (activeMenu === "evtech") {
                          setActiveMenu(null);
                        } else {
                          setActiveMenu("evtech");
                        }
                      }}
                      className={`${isActive || isMenuOpen ? 'evtech-nav-btn-active' : 'evtech-nav-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer`}
                    >
                      <Icon className="evtech-nav-icon w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-white font-sans">{item.name}</span>
                      <ChevronDown className={`evtech-nav-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                    </button>
                  </div>
                );
              }

              if (item.name === "Solutions") {
                return (
                  <div 
                    key={item.name} 
                    className="relative flex items-center"
                    onMouseEnter={() => handleMouseEnter("solutions")}
                  >
                    <button
                      onClick={() => {
                        if (activeMenu === "solutions") {
                          setActiveMenu(null);
                        } else {
                          setActiveMenu("solutions");
                        }
                      }}
                      className={`${isActive || isMenuOpen ? 'solutions-nav-btn-active' : 'solutions-nav-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer`}
                    >
                      <Icon className="solutions-nav-icon w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-white font-sans">{item.name}</span>
                      <ChevronDown className={`solutions-nav-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                    </button>
                  </div>
                );
              }

              if (item.name === "Intelligence") {
                return (
                  <div 
                    key={item.name} 
                    className="relative flex items-center"
                    onMouseEnter={() => handleMouseEnter("intelligence")}
                  >
                    <button
                      onClick={() => {
                        if (activeMenu === "intelligence") {
                          setActiveMenu(null);
                        } else {
                          setActiveMenu("intelligence");
                        }
                      }}
                      className={`${isActive || isMenuOpen ? 'intelligence-nav-btn-active' : 'intelligence-nav-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer`}
                    >
                      <Icon className="intelligence-nav-icon w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-white font-sans">{item.name}</span>
                      <ChevronDown className={`intelligence-nav-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                    </button>
                  </div>
                );
              }

              if (item.name === "Marketplace") {
                return (
                  <div 
                    key={item.name} 
                    className="relative flex items-center"
                    onMouseEnter={() => handleMouseEnter("marketplace")}
                  >
                    <button
                      onClick={() => {
                        if (activeMenu === "marketplace") {
                          setActiveMenu(null);
                        } else {
                          setActiveMenu("marketplace");
                        }
                      }}
                      className={`${isActive || isMenuOpen ? 'marketplace-nav-btn-active' : 'marketplace-nav-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer`}
                    >
                      <Icon className="marketplace-nav-icon w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-white font-sans">{item.name}</span>
                      <ChevronDown className={`marketplace-nav-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                    </button>
                  </div>
                );
              }

              if (item.name === "Schemes") {
                return (
                  <div 
                    key={item.name} 
                    className="relative flex items-center"
                    onMouseEnter={() => handleMouseEnter("schemes")}
                  >
                    <button
                      onClick={() => {
                        if (activeMenu === "schemes") {
                          setActiveMenu(null);
                        } else {
                          setActiveMenu("schemes");
                        }
                      }}
                      className={`${isActive || isMenuOpen ? 'schemes-nav-btn-active' : 'schemes-nav-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer`}
                    >
                      <Icon className="schemes-nav-icon w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-white font-sans">{item.name}</span>
                      <ChevronDown className={`schemes-nav-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                    </button>
                  </div>
                );
              }

              if (item.name === "Company") {
                return (
                  <div 
                    key={item.name} 
                    className="relative flex items-center"
                    onMouseEnter={() => handleMouseEnter("company")}
                  >
                    <button
                      onClick={() => {
                        if (activeMenu === "company") {
                          setActiveMenu(null);
                        } else {
                          setActiveMenu("company");
                        }
                      }}
                      className={`${isActive || isMenuOpen ? 'company-nav-btn-active' : 'company-nav-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer`}
                    >
                      <Icon className="company-nav-icon w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-white font-sans">{item.name}</span>
                      <ChevronDown className={`company-nav-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                    </button>
                  </div>
                );
              }

              return (
                <div 
                  key={item.name} 
                  className="relative flex items-center"
                  onMouseEnter={() => handleMouseEnter(menuKey)}
                >
                  <button 
                    onClick={() => {
                      if (activeMenu === menuKey) {
                        setActiveMenu(null);
                      } else {
                        setActiveMenu(menuKey);
                      }
                    }}
                    className={`${isActive || isMenuOpen ? 'glass-btn-active' : 'glass-btn'} flex items-center border border-solid gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] xl:text-[14px] font-semibold cursor-pointer transition-all duration-350`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive || isMenuOpen ? 'text-[#00D26A]' : 'text-[#AEB5C0] opacity-80'}`} strokeWidth={1.5} />
                    <span className="text-white font-sans">{item.name}</span>
                    <ChevronDown className={`dropdown-arrow w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180 text-[#00D26A]' : 'text-[#AEB5C0]/60'}`} strokeWidth={1.5} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {visibleMenus.includes(menuKey) && (
                    <div 
                      className={`glass-dropdown-panel absolute z-50 glass-dropdown p-2 ${
                        isMenuOpen ? "open" : "closed"
                      }`}
                      onMouseEnter={() => handleMouseEnter(menuKey)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link href={`/${menuKey}`} onClick={handleLinkClick} className="block px-4 py-2.5 text-[13px] font-medium text-[#AEB5C0] hover:text-[#00D26A] hover:bg-[rgba(0,210,106,0.08)] rounded-[10px] transition-all duration-300">
                        Overview
                      </Link>
                      <Link href={`/${menuKey}/features`} onClick={handleLinkClick} className="block px-4 py-2.5 text-[13px] font-medium text-[#AEB5C0] hover:text-[#00D26A] hover:bg-[rgba(0,210,106,0.08)] rounded-[10px] transition-all duration-300">
                        Features
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5 z-10 shrink-0 self-center">
            {/* Search Bar */}
            <div className="relative group cursor-pointer hidden xl:block">
              <div className="search-glass flex items-center gap-2 px-3 py-1.5 w-[175px]">
                <Search className="w-3.5 h-3.5 text-[#AEB5C0] group-focus-within:text-[#00D26A] transition-colors" strokeWidth={1.5} />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-[13px] text-white placeholder:text-[#AEB5C0]/60 w-full font-sans py-0 leading-none h-full align-middle"
                />
                <kbd className="hidden lg:inline-flex h-[18px] items-center gap-0.5 rounded-[4px] bg-[rgba(255,255,255,0.04)] px-1.5 font-mono text-[9px] font-medium text-[#AEB5C0] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shrink-0">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Sign In Link */}
            <Link 
              href="/auth/login" 
              onClick={handleLinkClick}
              className="text-[13px] xl:text-[14px] font-medium text-[#AEB5C0] hover:text-white transition-all duration-300 px-2 py-1.5 relative group"
            >
              Sign In
              <span className="absolute bottom-0 left-2 right-2 h-px bg-[#00D26A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </Link>

            {/* Get Quote CTA */}
            <Link 
              href="/quote"
              onClick={handleLinkClick}
              className="quote-btn px-5 py-2 text-[13px] xl:text-[14px] font-bold text-white flex items-center justify-center font-sans"
            >
              <span className="relative z-10 text-white">Get Quote</span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[liquid-reflection_3s_ease_infinite]" />
            </Link>
          </div>

          <button 
            className="lg:hidden relative p-2 bg-muted border border-[rgba(255,255,255,0.06)] rounded-[12px] text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>

          {/* Mega Menu Panel (Desktop only) */}
          {visibleMenus.includes("evtech") && (
            <div 
              className={`mega-menu-panel w-full pointer-events-auto hidden lg:block overflow-hidden ${
                activeMenu === "evtech" ? "open" : "closed"
              }`}
              onMouseEnter={() => handleMouseEnter("evtech")}
              onMouseLeave={handleMouseLeave}
            >
              {/* Purple/EVTech visual grid overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,black_70%,transparent_100%)] opacity-30" />
              <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-[1200px] mx-auto p-5 relative z-10">
                <div className="grid grid-cols-4 gap-[14px] animate-in fade-in zoom-in-95 duration-200">
                {EVTECH_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="mega-menu-card p-4 flex flex-col h-[102px] group/card cursor-pointer relative"
                    >
                      <div className="flex items-center gap-[12px] h-full">
                        <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-[12px] bg-white/5 border border-white/10 group-hover/card:border-[#8B5CF6]/30 transition-colors">
                          <CatIcon className="mega-icon w-5 h-5 text-[#AEB5C0] transition-all duration-300" strokeWidth={1.8} />
                        </div>
                        <div className="flex flex-col justify-center h-full gap-0.5">
                          <span className="text-[18px] font-bold text-white group-hover/card:text-[#8B5CF6] transition-colors leading-tight pr-6">{category.name}</span>
                          <p className="text-[13px] text-[#AEB5C0]/65 leading-tight font-sans line-clamp-2 pr-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="mega-arrow absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/50 transition-transform duration-300" strokeWidth={1.8} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          )}

          {/* Solutions Mega Menu Panel (Desktop only) */}
          {visibleMenus.includes("solutions") && (
            <div 
              className={`solutions-mega-menu-panel w-full pointer-events-auto hidden lg:block overflow-hidden ${
                activeMenu === "solutions" ? "open" : "closed"
              }`}
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-[1200px] mx-auto p-5">
                <div className="grid grid-cols-4 gap-[14px] animate-in fade-in zoom-in-95 duration-200">
                  {SOLUTIONS_CATEGORIES.map((category) => {
                    const CatIcon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={handleLinkClick}
                        prefetch={true}
                        className="solutions-mega-menu-card p-4 flex flex-col h-[102px] group/card cursor-pointer relative"
                      >
                        <div className="flex items-center gap-[12px] h-full">
                          <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-[12px] bg-white/5 border border-white/10 group-hover/card:border-[#00D26A]/30 transition-colors">
                            <CatIcon className="solutions-mega-icon w-5 h-5 text-[#AEB5C0] transition-all duration-300" strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col justify-center h-full gap-0.5">
                            <span className="text-[18px] font-bold text-white group-hover/card:text-[#00D26A] transition-colors leading-tight pr-6">{category.name}</span>
                            <p className="text-[13px] text-[#AEB5C0]/65 leading-tight font-sans line-clamp-2 pr-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="solutions-mega-arrow absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/50 transition-transform duration-300" strokeWidth={1.8} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Intelligence Mega Menu Panel (Desktop only) */}
          {visibleMenus.includes("intelligence") && (
            <div 
              className={`intelligence-mega-menu-panel w-full pointer-events-auto hidden lg:block overflow-hidden ${
                activeMenu === "intelligence" ? "open" : "closed"
              }`}
              onMouseEnter={() => handleMouseEnter("intelligence")}
              onMouseLeave={handleMouseLeave}
            >
              {/* AI/Neural visual grid overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,black_70%,transparent_100%)] opacity-30" />
              <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#FF8C00]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-[1200px] mx-auto p-5 relative z-10">
                <div className="grid grid-cols-4 gap-[14px] animate-in fade-in zoom-in-95 duration-200">
                  {INTELLIGENCE_CATEGORIES.map((category) => {
                    const CatIcon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={handleLinkClick}
                        prefetch={true}
                        className="intelligence-mega-menu-card p-4 flex flex-col h-[102px] group/card cursor-pointer relative"
                      >
                        <div className="flex items-center gap-[12px] h-full">
                          <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-[12px] bg-white/5 border border-white/10 group-hover/card:border-[#FF8C00]/30 transition-colors">
                            <CatIcon className="intelligence-mega-icon w-5 h-5 text-[#AEB5C0] transition-all duration-300" strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col justify-center h-full gap-0.5">
                            <span className="text-[18px] font-bold text-white group-hover/card:text-[#FF8C00] transition-colors leading-tight pr-6">{category.name}</span>
                            <p className="text-[13px] text-[#AEB5C0]/65 leading-tight font-sans line-clamp-2 pr-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="intelligence-mega-arrow absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/50 transition-transform duration-300" strokeWidth={1.8} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Marketplace Mega Menu Panel (Desktop only) */}
          {visibleMenus.includes("marketplace") && (
            <div 
              className={`marketplace-mega-menu-panel w-full pointer-events-auto hidden lg:block overflow-hidden ${
                activeMenu === "marketplace" ? "open" : "closed"
              }`}
              onMouseEnter={() => handleMouseEnter("marketplace")}
              onMouseLeave={handleMouseLeave}
            >
              {/* Commerce visual grid texture and blueprints */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-size-[32px_32px] opacity-35" />
              <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-[1200px] mx-auto p-5 relative z-10">
                <div className="grid grid-cols-4 gap-[14px] animate-in fade-in zoom-in-95 duration-200">
                  {MARKETPLACE_CATEGORIES.map((category) => {
                    const CatIcon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={handleLinkClick}
                        prefetch={true}
                        className="marketplace-mega-menu-card p-4 flex flex-col h-[102px] group/card cursor-pointer relative"
                      >
                        <div className="flex items-center gap-[12px] h-full">
                          <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-[12px] bg-white/5 border border-white/10 group-hover/card:border-[#2563EB]/30 transition-colors">
                            <CatIcon className="marketplace-mega-icon w-5 h-5 text-[#AEB5C0] transition-all duration-300" strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col justify-center h-full gap-0.5">
                            <span className="text-[18px] font-bold text-white group-hover/card:text-[#2563EB] transition-colors leading-tight pr-6">{category.name}</span>
                            <p className="text-[13px] text-[#AEB5C0]/65 leading-tight font-sans line-clamp-2 pr-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="marketplace-mega-arrow absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/50 transition-transform duration-300" strokeWidth={1.8} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Schemes Mega Menu Panel (Desktop only) */}
          {visibleMenus.includes("schemes") && (
            <div 
              className={`schemes-mega-menu-panel w-full pointer-events-auto hidden lg:block overflow-hidden ${
                activeMenu === "schemes" ? "open" : "closed"
              }`}
              onMouseEnter={() => handleMouseEnter("schemes")}
              onMouseLeave={handleMouseLeave}
            >
              {/* Document/Government visual grid overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-size-[28px_28px] opacity-35" />
              <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-[1200px] mx-auto p-5 relative z-10">
                <div className="grid grid-cols-4 gap-[14px] animate-in fade-in zoom-in-95 duration-200">
                  {SCHEMES_CATEGORIES.map((category) => {
                    const CatIcon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={handleLinkClick}
                        prefetch={true}
                        className="schemes-mega-menu-card p-4 flex flex-col h-[102px] group/card cursor-pointer relative"
                      >
                        <div className="flex items-center gap-[12px] h-full">
                          <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-[12px] bg-white/5 border border-white/10 group-hover/card:border-[#4F46E5]/30 transition-colors">
                            <CatIcon className="schemes-mega-icon w-5 h-5 text-[#AEB5C0] transition-all duration-300" strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col justify-center h-full gap-0.5">
                            <span className="text-[18px] font-bold text-white group-hover/card:text-[#4F46E5] transition-colors leading-tight pr-6">{category.name}</span>
                            <p className="text-[13px] text-[#AEB5C0]/65 leading-tight font-sans line-clamp-2 pr-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="schemes-mega-arrow absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/50 transition-transform duration-300" strokeWidth={1.8} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Company Mega Menu Panel (Desktop only) */}
          {visibleMenus.includes("company") && (
            <div 
              className={`company-mega-menu-panel w-full pointer-events-auto hidden lg:block overflow-hidden ${
                activeMenu === "company" ? "open" : "closed"
              }`}
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            >
              {/* Corporate visual pattern and grid overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.02)_1px,transparent_1px)] bg-size-[32px_32px] opacity-35" />
              <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#EC4899]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-[1200px] mx-auto p-5 relative z-10">
                <div className="grid grid-cols-4 gap-[14px] animate-in fade-in zoom-in-95 duration-200">
                  {COMPANY_CATEGORIES.map((category) => {
                    const CatIcon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={handleLinkClick}
                        prefetch={true}
                        className="company-mega-menu-card p-4 flex flex-col h-[102px] group/card cursor-pointer relative"
                      >
                        <div className="flex items-center gap-[12px] h-full">
                          <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-[12px] bg-white/5 border border-white/10 group-hover/card:border-[#EC4899]/30 transition-colors">
                            <CatIcon className="company-mega-icon w-5 h-5 text-[#AEB5C0] transition-all duration-300" strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col justify-center h-full gap-0.5">
                            <span className="text-[18px] font-bold text-white group-hover/card:text-[#EC4899] transition-colors leading-tight pr-6">{category.name}</span>
                            <p className="text-[13px] text-[#AEB5C0]/65 leading-tight font-sans line-clamp-2 pr-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="company-mega-arrow absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/50 transition-transform duration-300" strokeWidth={1.8} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </header>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`lg:hidden absolute top-[70px] left-0 w-full glass-dropdown transition-all duration-500 overflow-hidden origin-top z-40 pointer-events-auto ${
            isMobileMenuOpen ? "max-h-[850px] opacity-100 py-6 scale-y-100" : "max-h-0 opacity-0 py-0 scale-y-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 px-6 max-h-[70vh] overflow-y-auto">
            <div className="xl:hidden mb-2 relative">
               <div className="search-glass flex items-center gap-2 px-3 py-2">
                <Search className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-[#AEB5C0] w-full font-sans"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                
                if (item.name === "EVTech") {
                  return (
                    <button 
                      key={item.name} 
                      onClick={() => setIsEvtechMobileOpen(!isEvtechMobileOpen)}
                      className={`${isEvtechMobileOpen ? 'glass-btn-active' : 'glass-btn'} flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px] w-full text-center`}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                      <span className="text-[13px] font-semibold text-white">{item.name}</span>
                    </button>
                  );
                }

                if (item.name === "Solutions") {
                  return (
                    <button 
                      key={item.name} 
                      onClick={() => setIsSolutionsMobileOpen(!isSolutionsMobileOpen)}
                      className={`${isSolutionsMobileOpen ? 'glass-btn-active' : 'glass-btn'} flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px] w-full text-center`}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                      <span className="text-[13px] font-semibold text-white">{item.name}</span>
                    </button>
                  );
                }

                if (item.name === "Intelligence") {
                  return (
                    <button 
                      key={item.name} 
                      onClick={() => setIsIntelligenceMobileOpen(!isIntelligenceMobileOpen)}
                      className={`${isIntelligenceMobileOpen ? 'glass-btn-active' : 'glass-btn'} flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px] w-full text-center`}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                      <span className="text-[13px] font-semibold text-white">{item.name}</span>
                    </button>
                  );
                }

                if (item.name === "Marketplace") {
                  return (
                    <button 
                      key={item.name} 
                      onClick={() => setIsMarketplaceMobileOpen(!isMarketplaceMobileOpen)}
                      className={`${isMarketplaceMobileOpen ? 'glass-btn-active' : 'glass-btn'} flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px] w-full text-center`}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                      <span className="text-[13px] font-semibold text-white">{item.name}</span>
                    </button>
                  );
                }

                if (item.name === "Schemes") {
                  return (
                    <button 
                      key={item.name} 
                      onClick={() => setIsSchemesMobileOpen(!isSchemesMobileOpen)}
                      className={`${isSchemesMobileOpen ? 'glass-btn-active' : 'glass-btn'} flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px] w-full text-center`}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                      <span className="text-[13px] font-semibold text-white">{item.name}</span>
                    </button>
                  );
                }

                if (item.name === "Company") {
                  return (
                    <button 
                      key={item.name} 
                      onClick={() => setIsCompanyMobileOpen(!isCompanyMobileOpen)}
                      className={`${isCompanyMobileOpen ? 'glass-btn-active' : 'glass-btn'} flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px] w-full text-center`}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                      <span className="text-[13px] font-semibold text-white">{item.name}</span>
                    </button>
                  );
                }
                
                return (
                  <Link 
                    key={item.name} 
                    href={`/${item.name.toLowerCase()}`}
                    className="glass-btn flex flex-col items-center justify-center border border-[rgba(255,255,255,0.06)] gap-2.5 px-3 py-4 hover:text-[#00D26A] rounded-[14px]"
                    onClick={handleLinkClick}
                  >
                    <Icon className="w-[18px] h-[18px] text-[#AEB5C0]" strokeWidth={1.5} />
                    <span className="text-[13px] font-semibold text-white">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile EVTech Sub-menu */}
            {isEvtechMobileOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-3 bg-white/5 border border-white/5 rounded-[16px] transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-full flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-[#00D26A] uppercase">EVTech Categories</span>
                </div>
                {EVTECH_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <CatIcon className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-white">{category.name}</span>
                          <span className="text-[10px] text-[#AEB5C0]/65 line-clamp-1">{category.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AEB5C0]/50" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Solutions Sub-menu */}
            {isSolutionsMobileOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-3 bg-white/5 border border-white/5 rounded-[16px] transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-full flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-[#00D26A] uppercase">Solutions Categories</span>
                </div>
                {SOLUTIONS_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <CatIcon className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-white">{category.name}</span>
                          <span className="text-[10px] text-[#AEB5C0]/65 line-clamp-1">{category.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AEB5C0]/50" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Intelligence Sub-menu */}
            {isIntelligenceMobileOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-3 bg-white/5 border border-white/5 rounded-[16px] transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-full flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-[#FF8C00] uppercase">Intelligence Categories</span>
                </div>
                {INTELLIGENCE_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <CatIcon className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-white">{category.name}</span>
                          <span className="text-[10px] text-[#AEB5C0]/65 line-clamp-1">{category.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AEB5C0]/50" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Marketplace Sub-menu */}
            {isMarketplaceMobileOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-3 bg-white/5 border border-white/5 rounded-[16px] transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-full flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] uppercase">Marketplace Categories</span>
                </div>
                {MARKETPLACE_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <CatIcon className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-white">{category.name}</span>
                          <span className="text-[10px] text-[#AEB5C0]/65 line-clamp-1">{category.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AEB5C0]/50" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Schemes Sub-menu */}
            {isSchemesMobileOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-3 bg-white/5 border border-white/5 rounded-[16px] transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-full flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-[#4F46E5] uppercase">Schemes Categories</span>
                </div>
                {SCHEMES_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <CatIcon className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-white">{category.name}</span>
                          <span className="text-[10px] text-[#AEB5C0]/65 line-clamp-1">{category.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AEB5C0]/50" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Company Sub-menu */}
            {isCompanyMobileOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-3 bg-white/5 border border-white/5 rounded-[16px] transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-full flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-[#EC4899] uppercase">Company Categories</span>
                </div>
                {COMPANY_CATEGORIES.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={handleLinkClick}
                      prefetch={true}
                      className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <CatIcon className="w-4 h-4 text-[#AEB5C0]" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-white">{category.name}</span>
                          <span className="text-[10px] text-[#AEB5C0]/65 line-clamp-1">{category.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AEB5C0]/50" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] my-4" />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/auth/login"
                className="flex-1 px-4 py-2.5 text-[14px] font-medium text-white text-center border border-[rgba(255,255,255,0.08)] rounded-[12px] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                onClick={handleLinkClick}
              >
                Sign In
              </Link>
              <Link 
                href="/quote"
                className="quote-btn flex-1 px-4 py-2.5 text-[14px] font-bold text-white text-center"
                onClick={handleLinkClick}
              >
                <span className="relative z-10 flex items-center justify-center text-white">Get Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
