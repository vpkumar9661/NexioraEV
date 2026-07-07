"use client";

import React, { useState } from "react";
import { APP_TAGLINE } from "@nexiora/shared";
import { motion } from "framer-motion";
import { 
  ArrowRight, BatteryCharging, Car, MapPin, Newspaper, Zap, 
  Shield, Bot, GraduationCap, Leaf, Activity, Globe, Cpu, Clock, CheckCircle, 
  TrendingUp, Calendar, User, Sparkles, Network, Eye, RefreshCw, Shuffle, 
  Calculator, Percent, HeartPulse, Wallet, Coins, Building, Award, 
  CircleDollarSign, FileText, FileCheck, Search, Filter, Navigation, Compass,
  Atom, Layers, Sliders, Send, MessageSquare, BookOpen, Video, Download, Play,
  Star, Quote, Smartphone, QrCode, Mail, ShieldAlert, Check
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroVehicle } from "@/components/ui/hero-vehicle";

// --- Types & Constants ---
const ECOSYSTEM_CARDS = [
  { title: "EV Technology", desc: "Explore battery tech, powertrains, and state-of-the-art mobility.", icon: Cpu, href: "/evtech" },
  { title: "EV Marketplace", desc: "Compare and buy electric cars, 2-wheelers, and commercial vehicles.", icon: Car, href: "/vehicles" },
  { title: "Charging Network", desc: "Locate AC/DC public charging stations and plan your route.", icon: MapPin, href: "/charging" },
  { title: "Battery Lab", desc: "Analyze thermal characteristics, degradation curves, and cell chemistry.", icon: Atom, href: "/evtech/battery-lab" },
  { title: "Government Schemes", desc: "Check FAME incentives, PM E-Drive, and state road tax waivers.", icon: Shield, href: "/evtech/schemes" },
  { title: "EV News", desc: "Stay informed with daily industry reviews, policy updates, and launches.", icon: Newspaper, href: "/news" },
  { title: "AI Assistant", desc: "Get diagnostic troubleshooting and intelligent purchasing advice.", icon: Bot, href: "/evtech/ai-assistant" },
  { title: "Learning Center", desc: "Courses, tutorials, and certifications for engineers and buyers.", icon: GraduationCap, href: "/evtech/learning-center" }
];

const STATS_ITEMS = [
  { label: "EVs Registered (India)", value: "3,820,400+", key: "ev-reg" },
  { label: "Active Charging Stations", value: "22,450+", key: "stations" },
  { label: "Active Subsidies Listed", value: "32 State Policies", key: "schemes" },
  { label: "Annual CO₂ Saved", value: "1.8M Tons", key: "co2" },
  { label: "Avg Battery Life Cycle", value: "3,200 Cycles", key: "cycles" },
  { label: "Smart Cities Covered", value: "145+ Cities", key: "cities" }
];

const WHY_CARDS = [
  { title: "AI-Powered Platform", desc: "Adaptive recommendation engines and chat diagnostics custom-tailored for your specific vehicle requirements.", icon: Bot },
  { title: "Real-Time Updates", desc: "Live integration with charger APIs, grid constraints, and state incentive trackers across India.", icon: Clock },
  { title: "Verified EV Resources", desc: "Strict verification protocols for listings, battery health certificates, and installer certifications.", icon: CheckCircle },
  { title: "Future-Ready Architecture", desc: "Seamless support for next-gen solid-state configurations, grid V2G telemetry, and robotic swapping.", icon: Cpu }
];

const BRANDS = [
  { name: "Tesla", origin: "US" },
  { name: "BYD", origin: "China" },
  { name: "Tata Motors", origin: "India" },
  { name: "Mahindra", origin: "India" },
  { name: "Ather Energy", origin: "India" },
  { name: "Ola Electric", origin: "India" },
  { name: "Hyundai", origin: "Korea" },
  { name: "MG Motor", origin: "UK/China" },
  { name: "Kia", origin: "Korea" },
  { name: "BMW i", origin: "Germany" },
  { name: "Mercedes-EQ", origin: "Germany" }
];

const NEWS_ARTICLES = [
  {
    category: "Policy",
    date: "July 01, 2026",
    title: "PM E-Drive Scheme Allocations Upgraded",
    summary: "Government increases support allocations for electric two-wheelers and commercial freight corridors in Phase 2 launch.",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=60"
  },
  {
    category: "Technology",
    date: "June 28, 2026",
    title: "Solid-State Battery Swapping Ready for Trials",
    summary: "Leading battery consortium announces standard swapping architecture utilizing sodium-ion and solid-electrolyte cells.",
    img: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=600&auto=format&fit=crop&q=60"
  },
  {
    category: "Infrastructure",
    date: "June 25, 2026",
    title: "National Highway 44 Gets 350kW Fast Chargers",
    summary: "High-speed charging hubs established every 50km on Delhi-Srinagar corridor featuring liquid-cooled connector cables.",
    img: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=600&auto=format&fit=crop&q=60"
  }
];

const TECH_HIGHLIGHTS = [
  { title: "Solid-State Electrolytes", desc: "Eliminates flammable organic liquid solvents. Double energy density.", icon: Shield },
  { title: "Liquid-Cooled Fast Charging", desc: "Continuous 350kW charging capacity without thermal throttling curves.", icon: Zap },
  { title: "Vehicle-to-Grid (V2G)", desc: "Export stored energy back to commercial utility grids during peak pricing hours.", icon: RefreshCw },
  { title: "Sodium-Ion Chemistry", desc: "Low-cost alternative eliminating dependency on scarce lithium/cobalt resources.", icon: Atom },
  { title: "Regenerative Braking 2.0", desc: "High-frequency recovery rates capturing kinetic deceleration energy up to 90%.", icon: Activity },
  { title: "Robotic Battery Swapping", desc: "Fully automated, under-vehicle pack exchanges completed in under 120 seconds.", icon: Shuffle },
  { title: "AI Battery Management (BMS)", desc: "Edge computing systems tracking internal cell impedances and degradation.", icon: Bot },
  { title: "Modular Skateboards", desc: "Universal flat floor architectures optimizing interior configurations.", icon: Layers }
];

const CALCULATORS = [
  { title: "Charging Cost", desc: "Calculate direct tariff savings vs fossil fuel alternatives.", href: "/calculators/charging-cost" },
  { title: "Range Estimator", desc: "Determine battery range based on speed, AC usage, and terrain.", href: "/calculators/range" },
  { title: "Battery Health", desc: "Predict degradation curves and calculate remaining cycle count.", href: "/calculators/battery" },
  { title: "EMI & Loan", desc: "Calculate interest subsidies and tax write-offs for green car loans.", href: "/calculators/emi" },
  { title: "Total Cost of Ownership", desc: "Compare lifecycle cost projections (procurement, service, parts).", href: "/calculators/tco" }
];

const SCHEMES = [
  { name: "FAME India II / PM E-Drive", type: "Central Incentive", benefit: "Direct cash subsidy up to ₹15,000 for 2W and ₹1,50,000 for commercial cars." },
  { name: "Section 80EEB Deductions", type: "Income Tax", benefit: "Additional deduction up to ₹1.5 lakh on interest paid for EV purchasing loans." },
  { name: "Road Tax Exemption", type: "State Policy", benefit: "100% waiver on registration charges and road taxes in over 18 Indian states." },
  { name: "State EV Subsidies", type: "State Incentive", benefit: "Up to ₹10,000/kWh battery capacity incentives given directly to retail accounts." }
];

const TESTIMONIALS = [
  { name: "Aarav Sharma", role: "Fleet Manager, GreenTransit", review: "Upgrading our delivery fleet to EVs using Nexiora's route mapping and battery diagnostic systems reduced our operational overheads by 42%.", rating: 5, company: "GreenTransit" },
  { name: "Priya Patel", role: "EV Enthusiast & Daily Driver", review: "The Range Estimator is incredibly accurate. I was able to plan a Delhi-Jaipur road trip without any range anxiety whatsoever.", rating: 5, company: "Private Owner" },
  { name: "Vikram Malhotra", role: "Battery R&D Lead, CellTech", review: "Nexiora's Battery Lab dashboards have become our primary reference for real-world LFP degradation tracking.", rating: 5, company: "CellTech Labs" }
];

const TIMELINE_STEPS = [
  { title: "Discover EV", desc: "Compare range, battery type, and safety parameters of latest models." },
  { title: "Calculate Savings", desc: "Estimate tax write-offs, state incentives, and fuel savings." },
  { title: "Find Charging", desc: "Locate grid-compatible charging slots near your daily routes." },
  { title: "Purchase & Subsidize", desc: "Apply for direct government schemes and green financing." },
  { title: "Maintain & Monitor", desc: "Track battery diagnostics and swap cycles via Nexiora mobile app." }
];

const CHATBOT_PRESET_RESPONSES: Record<string, string> = {
  "Best EV under ₹15 lakh?": "Tata Punch.ev, Tata Nexon.ev (Medium Range), and MG Windsor EV are currently the top recommendations in India under ₹15 lakh, offering great value, safety, and modern features.",
  "How long does charging take?": "Fast charging (DC) takes about 35–60 minutes from 10% to 80%. Standard home AC charging takes 6–10 hours for a full charge depending on battery size and charger capacity.",
  "LFP vs NMC?": "LFP (Lithium Iron Phosphate) cells offer higher thermal stability, longer cycle life, and are safer, but have lower energy density. NMC (Nickel Manganese Cobalt) cells offer superior range and performance in cold weather but degrade faster.",
  "Battery degradation?": "Modern EV batteries typically lose only 1–2% of capacity per year. Most manufacturers offer an 8-year / 1,60,000 km warranty, ensuring the battery retains at least 70–80% health over its lifetime."
};

export default function HomePage() {
  // --- States ---
  // Chat simulator
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! I am your AI EV Assistant. Ask me anything about electric mobility, charging standards, or government schemes." }
  ]);
  
  // Range calculator state
  const [calcBattery, setCalcBattery] = useState(40);
  const [calcSpeed, setCalcSpeed] = useState(80);
  const [calcAc, setCalcAc] = useState(true);
  const estimatedRange = Math.round((calcBattery * 1000) / (110 + (calcSpeed - 50) * 1.5 + (calcAc ? 15 : 0)));

  // Charging Map Filter
  const [chargerFilter, setChargerFilter] = useState<"all" | "fast" | "ac">("all");

  // --- Handlers ---
  const handleChatQuestion = (question: string) => {
    const userMsg = { sender: "user" as const, text: question };
    const botMsg = { sender: "bot" as const, text: CHATBOT_PRESET_RESPONSES[question] || "Processing..." };
    setChatMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans overflow-hidden">
      {/* CSS Visual Refinements */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Premium Background Themes */
        .theme-graphite {
          --bg-color: #090B10;
          --card-bg: rgba(19, 23, 34, 0.55);
          --card-border: rgba(255, 255, 255, 0.05);
          --card-border-hover: rgba(255, 255, 255, 0.15);
        }

        .theme-midnight {
          --bg-color: #090B10;
          --card-bg: rgba(19, 23, 34, 0.55);
          --card-border: rgba(255, 255, 255, 0.05);
          --card-border-hover: rgba(255, 255, 255, 0.15);
        }

        .theme-emerald {
          --bg-color: #090B10;
          --card-bg: rgba(19, 23, 34, 0.55);
          --card-border: rgba(255, 255, 255, 0.05);
          --card-border-hover: rgba(255, 255, 255, 0.15);
        }

        .theme-purple {
          --bg-color: #090B10;
          --card-bg: rgba(19, 23, 34, 0.55);
          --card-border: rgba(255, 255, 255, 0.05);
          --card-border-hover: rgba(255, 255, 255, 0.15);
        }

        /* Accent Color Theme Overrides */
        .accent-green {
          --accent: #00D26A;
          --accent-rgb: 0, 210, 106;
          --accent-glow: rgba(0, 210, 106, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(0, 210, 106, 0.08) 0%, transparent 70%);
        }

        .accent-blue {
          --accent: #3B82F6;
          --accent-rgb: 59, 130, 246;
          --accent-glow: rgba(59, 130, 246, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
        }

        .accent-green-bright {
          --accent: #6BFF95;
          --accent-rgb: 107, 255, 149;
          --accent-glow: rgba(107, 255, 149, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(107, 255, 149, 0.07) 0%, transparent 70%);
        }

        .accent-cyan {
          --accent: #00E5FF;
          --accent-rgb: 0, 229, 255;
          --accent-glow: rgba(0, 229, 255, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
        }

        .accent-emerald {
          --accent: #10B981;
          --accent-rgb: 16, 185, 129;
          --accent-glow: rgba(16, 185, 129, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
        }

        .accent-purple {
          --accent: #8B5CF6;
          --accent-rgb: 139, 92, 246;
          --accent-glow: rgba(139, 92, 246, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
        }

        .accent-amber {
          --accent: #F59E0B;
          --accent-rgb: 245, 158, 11;
          --accent-glow: rgba(245, 158, 11, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
        }

        .accent-orange {
          --accent: #F97316;
          --accent-rgb: 249, 115, 22;
          --accent-glow: rgba(249, 115, 22, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(249, 115, 22, 0.07) 0%, transparent 70%);
        }

        .accent-indigo {
          --accent: #6366F1;
          --accent-rgb: 99, 102, 241;
          --accent-glow: rgba(99, 102, 241, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
        }

        .accent-pink {
          --accent: #EC4899;
          --accent-rgb: 236, 72, 153;
          --accent-glow: rgba(236, 72, 153, 0.2);
          --ambient-glow: radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%);
        }

        .accent-luxury-purple {
          --accent: #8B5CF6;
          --accent-rgb: 139, 92, 246;
          --accent-glow: rgba(139, 92, 246, 0.22);
          --ambient-glow: radial-gradient(circle, rgba(139, 92, 246, 0.09) 0%, transparent 70%);
        }

        /* Keyword Highlight Gradients */
        .text-gradient-green {
          background: linear-gradient(135deg, #00D26A 0%, #6BFF95 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-cyan {
          background: linear-gradient(135deg, #00E5FF 0%, #00D26A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-blue {
          background: linear-gradient(135deg, #3B82F6 0%, #00E5FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-purple {
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-amber {
          background: linear-gradient(135deg, #F59E0B 0%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Card Styles */
        .card-style-a {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.005) 100%);
          background-color: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-style-a:hover {
          background-color: rgba(255, 255, 255, 0.03);
          border-color: rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(var(--accent-rgb), 0.15);
          transform: translateY(-4px);
        }

        .card-style-b {
          background: linear-gradient(135deg, var(--card-bg) 0%, rgba(5, 5, 8, 0.8) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(var(--accent-rgb), 0.12);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 12px 0 rgba(var(--accent-rgb), 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-style-b:hover {
          border-color: rgba(var(--accent-rgb), 0.45);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 0 16px 0 rgba(var(--accent-rgb), 0.1), 0 0 25px 0 rgba(var(--accent-rgb), 0.15);
          transform: translateY(-4px);
        }

        .card-style-c {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(var(--accent-rgb), 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-style-c:hover {
          border-color: var(--accent);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px 2px rgba(var(--accent-rgb), 0.25);
          transform: translateY(-4px);
        }

        .card-style-d {
          background: linear-gradient(180deg, var(--card-bg) 0%, rgba(10, 12, 18, 0.85) 100%);
          backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-top: 3px solid var(--accent);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-style-d:hover {
          border-color: rgba(var(--accent-rgb), 0.2);
          border-top-color: var(--accent);
          border-top-width: 4px;
          box-shadow: 0 24px 48px -8px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(var(--accent-rgb), 0.15);
          transform: translateY(-4px);
        }

        /* Premium Custom Card Glass Styles */
        .card-dark-glass {
          background: rgba(19, 23, 32, 0.55);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-dark-glass:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(var(--accent-rgb), 0.15);
          transform: translateY(-4px);
        }

        .card-green-glass {
          background: rgba(0, 210, 106, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 210, 106, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(0, 210, 106, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-green-glass:hover {
          background: rgba(0, 210, 106, 0.04);
          border-color: rgba(0, 210, 106, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(0, 210, 106, 0.25);
          transform: translateY(-4px);
        }

        .card-blue-glass {
          background: rgba(59, 130, 246, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(59, 130, 246, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-blue-glass:hover {
          background: rgba(59, 130, 246, 0.04);
          border-color: rgba(59, 130, 246, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(59, 130, 246, 0.25);
          transform: translateY(-4px);
        }

        .card-purple-glass {
          background: rgba(139, 92, 246, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(139, 92, 246, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-purple-glass:hover {
          background: rgba(139, 92, 246, 0.04);
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(139, 92, 246, 0.25);
          transform: translateY(-4px);
        }

        .card-amber-glass {
          background: rgba(245, 158, 11, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 158, 11, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(245, 158, 11, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-amber-glass:hover {
          background: rgba(245, 158, 11, 0.04);
          border-color: rgba(245, 158, 11, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(245, 158, 11, 0.25);
          transform: translateY(-4px);
        }

        /* Section Liquid Glass Badges with Glow */
        .liquid-glass-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1),
                      0 0 12px rgba(var(--accent-rgb), 0.15);
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }
        .liquid-glass-badge::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 60%);
          pointer-events: none;
        }
        .liquid-glass-badge .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          display: inline-block;
        }

        /* Section Dividers */
        .divider-blur-glow {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.25) 50%, transparent);
          position: relative;
        }
        .divider-blur-glow::after {
          content: "";
          position: absolute;
          inset: 0;
          filter: blur(6px);
          background: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.35) 50%, transparent);
        }

        .divider-glass {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.01));
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4);
        }

        .divider-glow {
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, transparent, var(--accent) 50%, transparent);
          filter: drop-shadow(0 0 6px var(--accent));
          opacity: 0.6;
        }

        .divider-soft-glow {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08) 50%, transparent);
        }

        /* Background Layers & Effects */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/200/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.012'/%3E%3C/svg%3E");
        }

        .bg-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Floating background particles */
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-40px) translateX(20px) scale(1.1); opacity: 0.35; }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1.1); opacity: 0.2; }
          50% { transform: translateY(30px) translateX(-30px) scale(0.9); opacity: 0.4; }
        }

        .particle-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle-p1 {
          position: absolute;
          border-radius: 50%;
          background: var(--accent);
          filter: blur(4px);
          animation: float-particle-1 12s ease-in-out infinite;
        }

        .particle-p2 {
          position: absolute;
          border-radius: 50%;
          background: var(--accent);
          filter: blur(6px);
          animation: float-particle-2 15s ease-in-out infinite;
        }

        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* ============================================
           NEW CARD GLASS VARIANTS
           ============================================ */
        .card-cyan-glass {
          background: rgba(0, 212, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(0, 212, 255, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-cyan-glass:hover {
          background: rgba(0, 212, 255, 0.04);
          border-color: rgba(0, 212, 255, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(0, 212, 255, 0.25);
          transform: translateY(-4px);
        }

        .card-orange-glass {
          background: rgba(249, 115, 22, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(249, 115, 22, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(249, 115, 22, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-orange-glass:hover {
          background: rgba(249, 115, 22, 0.04);
          border-color: rgba(249, 115, 22, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(249, 115, 22, 0.25);
          transform: translateY(-4px);
        }

        .card-pink-glass {
          background: rgba(236, 72, 153, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(236, 72, 153, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(236, 72, 153, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-pink-glass:hover {
          background: rgba(236, 72, 153, 0.04);
          border-color: rgba(236, 72, 153, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(236, 72, 153, 0.25);
          transform: translateY(-4px);
        }

        .card-indigo-glass {
          background: rgba(99, 102, 241, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(99, 102, 241, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px 0 rgba(99, 102, 241, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-indigo-glass:hover {
          background: rgba(99, 102, 241, 0.04);
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.55), 0 0 25px 0 rgba(99, 102, 241, 0.25);
          transform: translateY(-4px);
        }

        /* ============================================
           CARD SHIMMER OVERLAY (glass reflection sweep)
           ============================================ */
        .card-dark-glass::after,
        .card-green-glass::after,
        .card-blue-glass::after,
        .card-purple-glass::after,
        .card-amber-glass::after,
        .card-cyan-glass::after,
        .card-orange-glass::after,
        .card-pink-glass::after,
        .card-indigo-glass::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          border-radius: inherit;
        }
        .card-dark-glass:hover::after,
        .card-green-glass:hover::after,
        .card-blue-glass:hover::after,
        .card-purple-glass:hover::after,
        .card-amber-glass:hover::after,
        .card-cyan-glass:hover::after,
        .card-orange-glass:hover::after,
        .card-pink-glass:hover::after,
        .card-indigo-glass:hover::after {
          opacity: 1;
          animation: glass-shimmer 1.5s ease-in-out;
        }

        /* ============================================
           ENERGY SVG LINE ANIMATION
           ============================================ */
        .energy-svg-line {
          stroke-dasharray: 10 6;
          animation: energy-flow 2s linear infinite;
        }

        /* ============================================
           HOLOGRAPHIC SCAN LINE (for AI section)
           ============================================ */
        .holo-scanline {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.06;
        }
        .holo-scanline::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), rgba(0, 212, 255, 0.6), transparent);
          animation: holo-scan 8s linear infinite;
          filter: blur(1px);
        }

        /* ============================================
           SECTION-SPECIFIC MESH BACKGROUND PATTERNS
           ============================================ */
        .section-mesh-green {
          background: radial-gradient(ellipse at 30% 30%, rgba(0, 230, 118, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 70%, rgba(0, 212, 255, 0.03) 0%, transparent 50%);
        }
        .section-mesh-cyan {
          background: radial-gradient(ellipse at 60% 20%, rgba(0, 212, 255, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
        }
        .section-mesh-purple {
          background: radial-gradient(ellipse at 40% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 70%, rgba(0, 212, 255, 0.03) 0%, transparent 50%);
        }
        .section-mesh-blue {
          background: radial-gradient(ellipse at 50% 40%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(0, 212, 255, 0.04) 0%, transparent 50%);
        }
        .section-mesh-amber {
          background: radial-gradient(ellipse at 40% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 30%, rgba(244, 180, 0, 0.03) 0%, transparent 50%);
        }
        .section-mesh-dual-purple-cyan {
          background: radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 70%, rgba(0, 212, 255, 0.05) 0%, transparent 50%);
        }
      `}} />

      {/* --- Rebuilt Hero Section --- */}
      <section 
        className="relative overflow-hidden border-b border-white/5 text-white theme-graphite accent-green pt-24 pb-12 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(4, 8, 15, 0.85) 0%, rgba(4, 8, 15, 0.45) 45%, rgba(4, 8, 15, 0) 80%), linear-gradient(to top, #04080F 0%, rgba(4, 8, 15, 0) 30%), url('/hero-bg-mockup.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right center"
        }}
      >
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[700px] opacity-35 bg-radial-gradient from-[#00D26A]/15 to-transparent filter blur-3xl" />
          <div className="absolute top-0 right-1/4 translate-x-1/2 w-[700px] h-[700px] opacity-35 bg-radial-gradient from-secondary/15 to-transparent filter blur-3xl" />
          <div className="particle-container">
            <div className="particle-p1 w-2 h-2 top-[20%] left-[20%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[60%] left-[75%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          {/* Main 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            {/* Left Column (Content) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Green Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/5 border border-secondary/15 text-xs font-semibold text-white tracking-wide shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
                The Future is Electric. The Future is NexioraEV.
              </div>
              
              {/* Heading */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[54px] text-white leading-tight font-sans">
                Driving the Future <br /> of <span className="bg-linear-to-r from-[#00E676] via-[#00D4FF] to-[#8B5CF6] bg-clip-text text-transparent">Smart Mobility</span>
              </h1>
              
              {/* Tagline */}
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                NexioraEV is your all-in-one platform for EV technology, charging solutions, marketplace, learning, AI tools, government schemes, and everything electric.
              </p>
              
              {/* Button Controls */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" asChild className="bg-linear-to-r from-[#00E676] to-[#00D4FF] text-black hover:scale-105 transition-all duration-300 font-extrabold border-none shadow-[0_4px_20px_rgba(0,230,118,0.25)] rounded-full px-8 py-6">
                  <Link href="/vehicles">
                    Explore EVTech
                    <ArrowRight aria-hidden="true" className="ml-1 size-4" strokeWidth={2.5} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="glass-btn bg-white/3 border border-white/10 hover:bg-white/8 text-white font-bold transition-all duration-300 rounded-full px-8 py-6">
                  <Link href="/auth/register" className="flex items-center gap-2">
                    <Play className="size-4 text-[#00D4FF] fill-[#00D4FF]/20" />
                    Play Platform Tour
                  </Link>
                </Button>
              </div>

              {/* Unified Horizontal Stats Container */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md mt-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)]">
                {/* Stat 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4.5 h-4.5 text-[#00E676]" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">100+</span>
                    <span className="text-[10px] text-muted-foreground/65 block font-medium">EV Technologies</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <User className="w-4.5 h-4.5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">50K+</span>
                    <span className="text-[10px] text-muted-foreground/65 block font-medium">Active Users</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4.5 h-4.5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">200+</span>
                    <span className="text-[10px] text-muted-foreground/65 block font-medium">Expert Guides</span>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF9800]/10 border border-[#FF9800]/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5 text-[#FF9800]" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">24/7</span>
                    <span className="text-[10px] text-muted-foreground/65 block font-medium">AI Assistance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Hero Vehicle Graphics) */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <HeroVehicle />
            </div>
          </div>

          {/* Bottom Grid: 6 Premium Glassmorphic Ecosystem Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16 pt-4 w-full relative z-10">
            {/* Card 1: EV Basics */}
            <Link href="/evtech/learning-center" className="card-green-glass p-5 rounded-[18px] group flex flex-col justify-between h-[155px]">
              <div>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#00E676] group-hover:text-white transition-colors duration-300">
                  <GraduationCap className="size-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#00E676] transition-colors duration-300">EV Basics</h3>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed line-clamp-2">Learn fundamentals of electric vehicles</p>
              </div>
              <div className="flex justify-end mt-1">
                <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-[#00E676] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>

            {/* Card 2: Battery Lab */}
            <Link href="/evtech/battery-lab" className="card-green-glass p-5 rounded-[18px] group flex flex-col justify-between h-[155px]">
              <div>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#00E676] group-hover:text-white transition-colors duration-300">
                  <Atom className="size-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#00E676] transition-colors duration-300">Battery Lab</h3>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed line-clamp-2">Chemistry, BMS, thermal & advanced battery tech</p>
              </div>
              <div className="flex justify-end mt-1">
                <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-[#00E676] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>

            {/* Card 3: Charging Hub */}
            <Link href="/charging" className="card-cyan-glass p-5 rounded-[18px] group flex flex-col justify-between h-[155px]">
              <div>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#00D4FF] group-hover:text-white transition-colors duration-300">
                  <BatteryCharging className="size-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#00D4FF] transition-colors duration-300">Charging Hub</h3>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed line-clamp-2">Charging types, stations, connectors & standards</p>
              </div>
              <div className="flex justify-end mt-1">
                <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>

            {/* Card 4: EV Components */}
            <Link href="/evtech" className="card-blue-glass p-5 rounded-[18px] group flex flex-col justify-between h-[155px]">
              <div>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#3B82F6] group-hover:text-white transition-colors duration-300">
                  <Cpu className="size-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#3B82F6] transition-colors duration-300">EV Components</h3>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed line-clamp-2">Motors, controllers, inverters & more</p>
              </div>
              <div className="flex justify-end mt-1">
                <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>

            {/* Card 5: Future Tech */}
            <Link href="/evtech" className="card-purple-glass p-5 rounded-[18px] group flex flex-col justify-between h-[155px]">
              <div>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                  <Sparkles className="size-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#8B5CF6] transition-colors duration-300">Future Tech</h3>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed line-clamp-2">Solid-state batteries, V2G, autonomous EVs</p>
              </div>
              <div className="flex justify-end mt-1">
                <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>

            {/* Card 6: AI EV Assistant */}
            <Link href="/evtech/ai-assistant" className="card-amber-glass p-5 rounded-[18px] group flex flex-col justify-between h-[155px]">
              <div>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#FF9800] group-hover:text-white transition-colors duration-300">
                  <Bot className="size-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#FF9800] transition-colors duration-300">AI EV Assistant</h3>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed line-clamp-2">Ask questions & get intelligent EV help</p>
              </div>
              <div className="flex justify-end mt-1">
                <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-[#FF9800] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Duplicate EV ECOSYSTEM OVERVIEW removed to match reference image layout exactly */}

      {/* ====================================================
          SECTION 2: LIVE EV STATISTICS
          ==================================================== */}
      <section className="relative theme-graphite bg-[#05070D]/25 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-green">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-50 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {STATS_ITEMS.map((stat) => (
              <div key={stat.key} className="space-y-2 group">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block transition-colors group-hover:text-white duration-300">{stat.label}</span>
                <span className="text-2xl sm:text-3xl font-black text-(--accent) tracking-tight block drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.2)]">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-glass" />

      {/* ====================================================
          SECTION 3: WHY NEXIORAEV
          ==================================================== */}
      <section className="relative theme-graphite accent-cyan bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 section-mesh-cyan pointer-events-none" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] opacity-50 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2 h-2 top-[20%] left-[80%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-3 h-3 top-[65%] left-[15%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Why Choose NexioraEV
          </div>
          
          <div className="mb-12">
            <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight">
              Why Choose <span className="text-gradient-cyan">NexioraEV</span>?
            </h2>
            <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm md:text-base leading-relaxed">
              Discover the values that set us apart as India&apos;s trusted platform for next-generation smart mobility.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CARDS.map((card, idx) => {
              const CardIcon = card.icon;
              const cardStyles = ["card-blue-glass", "card-dark-glass", "card-blue-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-6 rounded-[18px] flex flex-col justify-start h-[190px]`}>
                  <div className="size-9 flex items-center justify-center rounded-lg bg-(--accent)/10 text-(--accent) border border-(--accent)/20 shadow-[0_0_10px_rgba(var(--accent-rgb),0.1)]">
                    <CardIcon className="size-4.5" />
                  </div>
                  <h3 className="text-[17px] font-bold text-white mt-4">{card.title}</h3>
                  <p className="text-[12.5px] text-[#C5CBD7] mt-2 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* ====================================================
          SECTION 4: FEATURED EV BRANDS
          ==================================================== */}
      <section className="relative theme-midnight accent-blue bg-[#05070D]/25 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
        </div>

        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <div className="liquid-glass-badge mx-auto">
            <span className="badge-dot" />
            Featured Brands
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {BRANDS.map((brand, idx) => {
              const cardStyles = ["card-dark-glass", "card-blue-glass", "card-dark-glass", "card-blue-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300`}>
                  <span className="font-bold text-sm text-white">{brand.name}</span>
                  <span className="text-[9px] text-[#94A3B8] mt-1 uppercase tracking-wider">{brand.origin}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-soft-glow" />

      {/* ====================================================
          SECTION 5: LATEST EV NEWS
          ==================================================== */}
      <section className="relative theme-midnight accent-blue bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] opacity-60 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[20%] left-[80%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[60%] left-[15%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Latest News
          </div>
          
          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between">
            <div>
              <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight">
                Latest EV <span className="text-gradient-blue">News & Reviews</span>
              </h2>
              <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm leading-relaxed">
                Daily reporting on policies, cell technology, and infrastructure rollout.
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 sm:mt-0 glass-btn bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-[10px]" asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {NEWS_ARTICLES.map((article, idx) => {
              const cardStyles = ["card-blue-glass", "card-dark-glass", "card-blue-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} rounded-[20px] overflow-hidden flex flex-col h-[380px]`}>
                  <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                    <Image 
                      src={article.img} 
                      alt={article.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-[#94A3B8]">{article.date}</span>
                      <h3 className="font-bold text-[16px] text-white mt-1 leading-snug line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-[#C5CBD7] mt-2 leading-relaxed line-clamp-3">{article.summary}</p>
                    </div>
                    <Link href="/news" className="inline-flex items-center gap-1 text-[12.5px] font-bold text-(--accent) hover:underline mt-2">
                      Read More
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-glass" />

      {/* ====================================================
          SECTION 6: EV TECHNOLOGY HIGHLIGHTS
          ==================================================== */}
      <section className="relative theme-graphite accent-purple bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 section-mesh-purple pointer-events-none" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[15%] left-[25%]" style={{ animationDelay: "0s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[70%] left-[85%]" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Technology Highlights
          </div>
          
          <div className="mb-12">
            <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight">
              EV <span className="text-gradient-purple">Technology Highlights</span>
            </h2>
            <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm md:text-base leading-relaxed">
              State-of-the-art power electronics, modular skateboard chassis architectures, and automated cell systems.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_HIGHLIGHTS.map((tech, idx) => {
              const Icon = tech.icon;
              const cardStyles = ["card-purple-glass", "card-dark-glass", "card-indigo-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-5 rounded-[18px] flex flex-col justify-between h-[160px]`}>
                  <div>
                    <div className="size-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-(--accent) shadow-[0_0_10px_rgba(var(--accent-rgb),0.1)]">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-bold text-[15px] text-white mt-4">{tech.title}</h3>
                    <p className="text-[11.5px] text-[#C5CBD7] mt-1 leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-blur-glow" />

      {/* ====================================================
          SECTION 7: INTERACTIVE EV CALCULATORS
          ==================================================== */}
      <section className="relative theme-emerald accent-green bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2 h-2 top-[30%] left-[80%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-2.5 h-2.5 top-[65%] left-[20%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Interactive Tools
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight">
                Interactive EV <span className="text-gradient-green">Range Estimator</span>
              </h2>
              <p className="text-[#B6BCCB] text-sm leading-relaxed">
                Test dynamic ranges against standard variables. Adjust battery cell size, cruise speeds, and climate controls in real-time.
              </p>

              <div className="space-y-4 p-5 card-green-glass">
                {/* Battery control */}
                <div>
                  <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                    <span>Battery Capacity</span>
                    <span className="text-white font-bold">{calcBattery} kWh</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="120" 
                    value={calcBattery} 
                    onChange={(e) => setCalcBattery(Number(e.target.value))}
                    className="w-full accent-(--accent) cursor-pointer" 
                  />
                </div>

                {/* Speed control */}
                <div>
                  <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                    <span>Average Speed</span>
                    <span className="text-white font-bold">{calcSpeed} km/h</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="140" 
                    value={calcSpeed} 
                    onChange={(e) => setCalcSpeed(Number(e.target.value))}
                    className="w-full accent-(--accent) cursor-pointer" 
                  />
                </div>

                {/* AC control */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-[#94A3B8]">AC & Climate Control</span>
                  <button 
                    onClick={() => setCalcAc(!calcAc)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                      calcAc 
                        ? "bg-[#00D26A]/20 border-[#00D26A]/50 text-white shadow-inner" 
                        : "bg-white/5 border-white/10 text-[#94A3B8]"
                    }`}
                  >
                    {calcAc ? "ON (Extra Load)" : "OFF"}
                  </button>
                </div>

                {/* Estimated output */}
                <div className="h-px bg-white/5 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8] font-medium">Estimated Real-World Range:</span>
                  <span className="text-2xl font-black text-(--accent) tracking-tight drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]">{estimatedRange} KM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 grid-cols-1 sm:grid-cols-2">
              {CALCULATORS.map((calc, idx) => {
                const cardStyles = ["card-green-glass", "card-dark-glass", "card-green-glass", "card-dark-glass"];
                const currentCardStyle = cardStyles[idx % 4];
                return (
                  <div key={idx} className={`${currentCardStyle} p-5 rounded-[18px] flex flex-col justify-between h-[145px]`}>
                    <div>
                      <h3 className="font-bold text-[16px] text-white transition-colors">{calc.title}</h3>
                      <p className="text-[12px] text-[#C5CBD7] mt-2 leading-relaxed">{calc.desc}</p>
                    </div>
                    <Link href={calc.href} className="inline-flex items-center gap-1 text-[11.5px] font-bold text-(--accent) hover:underline mt-2">
                      Launch Calculator
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-glow" />

      {/* ====================================================
          SECTION 8: GOVERNMENT SCHEMES
          ==================================================== */}
      <section className="relative theme-midnight bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-blue">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[20%] left-[80%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[60%] left-[15%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Government Subsidies
          </div>
          
          <div className="mb-12">
            <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight">
              Government <span className="text-gradient-blue">Incentives & Subsidies</span>
            </h2>
            <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm md:text-base leading-relaxed">
              Find listed direct purchase incentives, state waivers, and clean energy subsidies currently active in India.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SCHEMES.map((scheme, idx) => {
              const cardStyles = ["card-blue-glass", "card-dark-glass", "card-blue-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-6 rounded-[20px] space-y-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-(--accent) bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {scheme.type}
                    </span>
                    <FileCheck className="size-5 text-[#94A3B8] group-hover:text-(--accent) transition-colors duration-300" />
                  </div>
                  <h3 className="text-[18px] font-bold text-white leading-tight">{scheme.name}</h3>
                  <p className="text-xs text-[#C5CBD7] leading-relaxed">{scheme.benefit}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-glass" />

      {/* ====================================================
          SECTION 9: CHARGING NETWORK
          ==================================================== */}
      <section className="relative theme-midnight bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-cyan">
        {/* Layered Background Design */}
        <div className="absolute inset-0 section-mesh-cyan pointer-events-none" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[15%] left-[30%]" style={{ animationDelay: "0s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[70%] left-[80%]" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Charging Map
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight">
                Nearby <span className="text-gradient-cyan">Charging Stations</span>
              </h2>
              <p className="text-[#C5CBD7] text-sm leading-relaxed">
                Explore public grid ports. Filter by plug standard, DC charging capacity, and active availability.
              </p>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#94A3B8]">Filter Connector Types</span>
                <div className="flex gap-2">
                  {["all", "fast", "ac"].map((type) => (
                    <button 
                      key={type}
                      onClick={() => setChargerFilter(type as any)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize border transition-all duration-300 ${
                        chargerFilter === type 
                          ? "bg-(--accent) border-(--accent) text-black shadow-lg shadow-secondary/30 font-bold" 
                          : "bg-white/5 border-white/10 text-[#94A3B8] hover:border-(--accent) hover:text-white"
                      }`}
                    >
                      {type === "fast" ? "⚡ DC Fast" : type === "ac" ? "🔌 AC Slow" : "All Ports"}
                    </button>
                  ))}
                </div>
              </div>

              <Button size="lg" asChild className="w-full sm:w-auto bg-secondary text-black hover:bg-[#00D26A] hover:scale-105 transition-all duration-300 font-bold border-none shadow-lg shadow-secondary/20">
                <Link href="/charging">
                  <Compass className="size-4 mr-2" />
                  Open Interactive Map
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-8 relative rounded-[24px] overflow-hidden p-2 card-dark-glass">
              {/* Mock Map UI inside Dark Glass style */}
              <div className="h-[320px] w-full rounded-[18px] bg-slate-950 relative overflow-hidden flex items-center justify-center border border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] bg-size-[16px_16px]" />
                
                {/* Map mockup markers */}
                <div className="absolute top-1/4 left-1/3 p-2.5 rounded-2xl bg-slate-950/90 border border-[#00D26A]/30 flex items-center gap-2 shadow-lg shadow-[#00D26A]/5 animate-pulse">
                  <div className="size-2 rounded-full bg-[#00D26A] shadow-[0_0_6px_#00D26A]" />
                  <span className="text-[10px] font-bold text-white">Hub-1 NH44 (DC 350kW)</span>
                </div>

                <div className="absolute top-1/2 right-1/4 p-2.5 rounded-2xl bg-slate-950/90 border border-secondary/30 flex items-center gap-2 shadow-lg shadow-secondary/5 animate-pulse">
                  <div className="size-2 rounded-full bg-secondary shadow-[0_0_6px_#00E5FF]" />
                  <span className="text-[10px] font-bold text-white">Hub-2 Metro Mall (AC 22kW)</span>
                </div>

                <div className="absolute bottom-1/3 left-1/4 p-2.5 rounded-2xl bg-slate-950/90 border border-[#00D26A]/30 flex items-center gap-2 shadow-lg shadow-[#00D26A]/5 animate-pulse">
                  <div className="size-2 rounded-full bg-[#00D26A] shadow-[0_0_6px_#00D26A]" />
                  <span className="text-[10px] font-bold text-white">Hub-3 Central Gate (DC 150kW)</span>
                </div>

                <div className="text-center space-y-2 relative z-10 bg-slate-950/90 p-5 rounded-2xl border border-white/8 backdrop-blur-md max-w-sm shadow-xl">
                  <h4 className="font-bold text-sm text-white">Charging Map Visualizer</h4>
                  <p className="text-[11px] text-[#C5CBD7] leading-relaxed">
                    Real-time dynamic telemetry tracks 3,250 chargers along golden quadrilateral routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-soft-glow" />

      {/* ====================================================
          SECTION 10: BATTERY LAB PREVIEW
          ==================================================== */}
      <section className="relative theme-emerald bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-green">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[20%] left-[20%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[65%] left-[80%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Battery Research
          </div>

          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between">
            <div>
              <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight">
                Battery Lab <span className="text-gradient-green">Research</span>
              </h2>
              <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm leading-relaxed">
                Explore degradation factors, safety standards, and comparative chemistry graphs.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="bg-[#00D26A] text-black hover:bg-[#6BFF95] hover:scale-105 transition-all duration-300 font-bold border-none shadow-lg shadow-[#00D26A]/20">
              <Link href="/evtech/battery-lab">Open Battery Lab</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "LFP (Lithium Iron Phosphate)", life: "3000-6000 Cycles", density: "140-160 Wh/kg", safe: "Exceptional" },
              { name: "NMC (Nickel Manganese Cobalt)", life: "1500-2500 Cycles", density: "200-250 Wh/kg", safe: "High" },
              { name: "Solid-State Electrolyte", life: "5000+ Cycles", density: "350-400 Wh/kg", safe: "Maximum" },
              { name: "Sodium-Ion Cells", life: "2000-4000 Cycles", density: "120-140 Wh/kg", safe: "Very High" }
            ].map((item, idx) => {
              const cardStyles = ["card-green-glass", "card-dark-glass", "card-green-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-5 rounded-[18px] space-y-4`}>
                  <h3 className="font-bold text-[15px] text-white leading-tight">{item.name}</h3>
                  <div className="h-px bg-white/5" />
                  <div className="space-y-1.5 text-[11.5px]">
                    <div className="flex justify-between"><span className="text-[#94A3B8]">Energy Density:</span><span className="text-white font-bold">{item.density}</span></div>
                    <div className="flex justify-between"><span className="text-[#94A3B8]">Cycle Lifetime:</span><span className="text-white font-bold">{item.life}</span></div>
                    <div className="flex justify-between"><span className="text-[#94A3B8]">Thermal Safety:</span><span className="text-white font-bold">{item.safe}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-soft-glow" />

      {/* ====================================================
          SECTION 11: AI EV ASSISTANT
          ==================================================== */}
      <section className="relative theme-graphite accent-purple bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 section-mesh-dual-purple-cyan pointer-events-none" />
        <div className="holo-scanline" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2 h-2 top-[30%] left-[80%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-2 h-2 top-[70%] left-[15%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            AI Diagnostics
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight">
                <span className="text-gradient-purple">AI EV Assistant</span>
              </h2>
              <p className="text-[#C5CBD7] text-sm leading-relaxed">
                Have complex technical queries about cell balancing, government road-tax schemes, or standard pricing parameters? Select a questions preset below to query our simulated intelligence.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.keys(CHATBOT_PRESET_RESPONSES).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleChatQuestion(q)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-(--accent) hover:bg-[#8B5CF6]/5 transition-all text-xs font-bold text-white cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-2 rounded-[24px] card-purple-glass shadow-2xl">
              <div className="h-[300px] flex flex-col justify-between rounded-[18px] bg-slate-950 border border-white/5 p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.sender === "user" 
                          ? "bg-[#8B5CF6] text-white rounded-tr-none shadow-lg shadow-[#8B5CF6]/15" 
                          : "bg-white/5 border border-white/10 text-slate-300 rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 border-t border-white/5 pt-3">
                  <input 
                    type="text" 
                    disabled
                    placeholder="AI Assistant chat offline (Select preset queries on the left)..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-[#C5CBD7] outline-none" 
                  />
                  <Button disabled size="icon">
                    <Send className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-glass" />

      {/* ====================================================
          SECTION 12: LEARNING CENTER
          ==================================================== */}
      <section className="relative theme-purple accent-amber bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 section-mesh-amber pointer-events-none" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.22] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[15%] left-[20%]" style={{ animationDelay: "0s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[75%] left-[80%]" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex justify-center">
            <div className="liquid-glass-badge">
              <span className="badge-dot" />
              Learning Academy
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight mx-auto">
              EV Academy <span className="text-gradient-amber">Learning Paths</span>
            </h2>
            <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm md:text-base leading-relaxed mx-auto">
              Free and certified educational modules built directly for engineers, fleet operators, and buyers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { level: "Beginner Path", duration: "2 Hours", desc: "Understanding grid standards, basic EV anatomy, and fast charging safety parameters.", items: ["Battery Basics", "Charger Plug Standards", "TCO Math"] },
              { level: "Intermediate Path", duration: "6 Hours", desc: "Diving into state tax incentives, cycle balancing calculations, and motor architectures.", items: ["Subsidies & Rebates", "LFP vs NMC Diagnostics", "Motor Controls"] },
              { level: "Advanced Path", duration: "14 Hours", desc: "Complex cell chemistry design, grid telemetry standards, and battery pack swapping.", items: ["V2G Grid Telemetry", "Thermal Runaway Math", "BMS Engineering"] }
            ].map((path, idx) => {
              const cardStyles = ["card-amber-glass", "card-dark-glass", "card-amber-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-6 rounded-[20px] flex flex-col justify-between h-[300px]`}>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-(--accent) uppercase tracking-wider">{path.level}</span>
                      <span className="text-[10px] text-[#94A3B8] font-semibold">{path.duration}</span>
                    </div>
                    <p className="text-xs text-[#C5CBD7] mt-3 leading-relaxed">{path.desc}</p>
                    <div className="mt-4 space-y-1.5">
                      {path.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2 text-xs text-white font-medium">
                          <Check className="size-3 text-(--accent)" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild className="w-full mt-4 hover:border-(--accent) hover:text-white">
                    <Link href="/evtech/learning-center">Start Learning</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-blur-glow" />

      {/* ====================================================
          SECTION 13: CUSTOMER TESTIMONIALS
          ==================================================== */}
      <section className="relative theme-graphite accent-purple bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2 h-2 top-[20%] left-[80%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-2.5 h-2.5 top-[60%] left-[15%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex justify-center">
            <div className="liquid-glass-badge">
              <span className="badge-dot" />
              Community Testimonials
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight mx-auto">
              What the <span className="text-gradient-purple">Community Says</span>
            </h2>
            <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm md:text-base leading-relaxed mx-auto">
              Real reviews from fleet operators, developers, and daily drivers using Nexiora.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((test, idx) => {
              const cardStyles = ["card-purple-glass", "card-dark-glass", "card-purple-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-6 rounded-[20px] flex flex-col justify-between h-[220px]`}>
                  <div>
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {[...Array(test.rating)].map((_, i) => <Star key={i} className="size-3.5 fill-amber-500" />)}
                    </div>
                    <p className="text-xs text-[#C5CBD7] leading-relaxed italic">&ldquo;{test.review}&rdquo;</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-white">{test.name}</span>
                      <span className="text-[10px] text-[#94A3B8]">{test.role}</span>
                    </div>
                    <span className="text-[10px] font-bold text-(--accent)">{test.company}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-blur-glow" />

      {/* ====================================================
          SECTION 14: PARTNER COMPANIES
          ==================================================== */}
      <section className="relative theme-midnight bg-[#05070D]/25 py-10 overflow-hidden transition-colors duration-500 accent-blue">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-25 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="marquee-track">
            {/* Set 1 */}
            {["Exide Tech", "Tata Power", "Statiq", "Servotech", "Ather Grid", "BYD Cell Co", "Panasonic Battery", "L&T Green", "Adani Power", "ChargeGrid"].map((company, idx) => (
              <div key={idx} className="px-8 font-extrabold text-sm text-[#94A3B8]/35 tracking-widest uppercase transition-colors hover:text-white duration-300">
                {company}
              </div>
            ))}
            {/* Set 2 (for infinite loop) */}
            {["Exide Tech", "Tata Power", "Statiq", "Servotech", "Ather Grid", "BYD Cell Co", "Panasonic Battery", "L&T Green", "Adani Power", "ChargeGrid"].map((company, idx) => (
              <div key={`dup-${idx}`} className="px-8 font-extrabold text-sm text-[#94A3B8]/35 tracking-widest uppercase transition-colors hover:text-white duration-300">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-glass" />

      {/* ====================================================
          SECTION 15: EV JOURNEY
          ==================================================== */}
      <section className="relative theme-midnight bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-green">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[20%] left-[20%]" style={{ animationDelay: "1s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[65%] left-[80%]" style={{ animationDelay: "3s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex justify-center">
            <div className="liquid-glass-badge">
              <span className="badge-dot" />
              Interactive Timeline
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white max-w-[700px] leading-tight mx-auto">
              The EV <span className="text-gradient-green">Journey Map</span>
            </h2>
            <p className="mt-4 text-[#B6BCCB] max-w-[700px] text-sm md:text-base leading-relaxed mx-auto">
              Step-by-step roadmap towards zero-emission smart mobility.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const cardStyles = ["card-green-glass", "card-dark-glass", "card-green-glass", "card-dark-glass"];
              const currentCardStyle = cardStyles[idx % 4];
              return (
                <div key={idx} className={`${currentCardStyle} p-5 rounded-[18px] flex flex-col justify-between h-[160px] relative`}>
                  <span className="absolute -top-3 -left-3 size-7 flex items-center justify-center rounded-full bg-(--accent) text-white text-xs font-black shadow-lg shadow-emerald-500/20">
                    {idx + 1}
                  </span>
                  <div className="mt-2">
                    <h3 className="font-bold text-[15px] text-white leading-tight">{step.title}</h3>
                    <p className="text-[11.5px] text-[#C5CBD7] mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-soft-glow" />

      {/* ====================================================
          SECTION 16: COMMUNITY
          ==================================================== */}
      <section className="relative theme-graphite bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-green">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
          <div className="particle-container">
            <div className="particle-p1 w-2.5 h-2.5 top-[15%] left-[20%]" style={{ animationDelay: "0s" }} />
            <div className="particle-p2 w-1.5 h-1.5 top-[75%] left-[80%]" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Community Hub
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight">
                Join the <span className="text-gradient-green">Green Mobility Forums</span>
              </h2>
              <p className="text-[#C5CBD7] text-sm leading-relaxed">
                Connect with 12,500+ Indian EV owners, developers, and fleet logistics managers discussing real-world statistics daily.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Daily Topics", val: "140+" },
                  { label: "Active Members", val: "12,500+" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/1 text-center shadow-inner">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block">{stat.label}</span>
                    <span className="text-xl font-bold text-(--accent) mt-1 block drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.2)]">{stat.val}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild className="bg-[#00D26A] text-black hover:bg-[#6BFF95] hover:scale-105 transition-all duration-300 font-bold border-none shadow-lg shadow-[#00D26A]/20">
                <Link href="/community">Visit Community Forums</Link>
              </Button>
            </div>

            <div className="lg:col-span-7 grid gap-4 grid-cols-1 sm:grid-cols-2">
              {[
                { category: "Battery Tech", title: "LFP battery degradation profiles in Indian summer conditions?", replies: 28 },
                { category: "Incentives", title: "Has anyone successfully claimed PM E-Drive road tax subsidies in MH?", replies: 42 },
                { category: "DIY Install", title: "Best 7.4kW AC charger recommendations for home parking yards?", replies: 19 },
                { category: "Policy", title: "State-wise electricity tariffs listed for EV charging points.", replies: 35 }
              ].map((topic, idx) => {
                const cardStyles = ["card-green-glass", "card-dark-glass", "card-green-glass", "card-dark-glass"];
                const currentCardStyle = cardStyles[idx % 4];
                return (
                  <div key={idx} className={`${currentCardStyle} p-5 rounded-[18px] flex flex-col justify-between h-[130px] cursor-pointer`}>
                    <div>
                      <span className="text-[9px] font-black text-(--accent) uppercase tracking-wider">{topic.category}</span>
                      <h3 className="font-bold text-[13.5px] text-white mt-1.5 leading-snug line-clamp-2">{topic.title}</h3>
                    </div>
                    <span className="text-[10px] text-[#94A3B8] font-semibold">{topic.replies} active discussions</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-glass" />

      {/* ====================================================
          SECTION 17: DOWNLOAD MOBILE APP
          ==================================================== */}
      <section className="relative theme-purple bg-[#05070D]/25 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 accent-purple">
        {/* Layered Background Design */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="liquid-glass-badge">
            <span className="badge-dot" />
            Mobile Downloads
          </div>

          <div className="relative rounded-[24px] overflow-hidden border border-white/5 bg-linear-to-b from-[#8B5CF6]/10 to-transparent p-8 sm:p-12 shadow-2xl card-purple-glass">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 bg-(--ambient-glow)" style={{ background: "var(--ambient-glow)" }} />
            <div className="grid gap-8 lg:grid-cols-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight">
                  NexioraEV <span className="text-gradient-purple">Mobile App</span>
                </h2>
                <p className="text-[#C5CBD7] text-sm leading-relaxed">
                  Unlock real-time grid alerts, battery diagnostic curves, charger slots bookings, and subsidies tracking directly from your phone.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button size="lg" className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 hover:scale-105 transition-all duration-300 border-none text-white shadow-lg shadow-[#8B5CF6]/20">
                    <Smartphone className="size-4" />
                    Download for Android
                  </Button>
                  <Button size="lg" variant="outline" className="flex items-center gap-2 glass-btn bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold">
                    <Smartphone className="size-4" />
                    Download for iOS
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border border-white/8 bg-slate-950/90 backdrop-blur-md max-w-sm mx-auto shadow-xl">
                <QrCode className="size-36 text-white" />
                <span className="text-[10px] text-[#94A3B8] font-semibold tracking-wider uppercase mt-4">
                  Scan QR Code to Download
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-blur-glow" />

      {/* ====================================================
          SECTION 18: PREMIUM PRE-FOOTER EXPERIENCE
          ==================================================== */}
      <section className="relative bg-[#05070D]/30 py-32 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 border-t border-white/5">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flow {
            to {
              stroke-dashoffset: -20;
            }
          }
          .animate-flow-dash {
            stroke-dasharray: 8, 4;
            animation: flow 1s linear infinite;
          }
          .animate-flow-dash-reverse {
            stroke-dasharray: 8, 4;
            animation: flow 1.2s linear infinite reverse;
          }
        `}} />

        {/* Layered Background System */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[36px_36px] opacity-45 pointer-events-none" />
        
        {/* Animated Mesh Glows */}
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-[#00D26A]/5 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-[#3B82F6]/5 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: "14s" }} />

        {/* Energy Flow Lines (Background SVG) */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,200 C300,100 500,400 900,250 C1200,150 1400,300 1700,200" fill="none" stroke="url(#flow-gradient-1)" strokeWidth="1.5" className="animate-flow-dash" />
            <path d="M-100,350 C400,200 600,500 1000,300 C1300,200 1500,450 1800,350" fill="none" stroke="url(#flow-gradient-2)" strokeWidth="1.2" className="animate-flow-dash-reverse" />
            <defs>
              <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D26A" stopOpacity="0" />
                <stop offset="50%" stopColor="#00D26A" stopOpacity="1" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                <stop offset="100%" stopColor="#00D26A" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="liquid-glass-badge">
                  <span className="badge-dot" />
                  Ecosystem Hub
                </div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-tight">
                Join India&apos;s Next Generation <span className="bg-linear-to-r from-[#00D26A] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">EV Ecosystem</span>
              </h2>
              
              <p className="text-base sm:text-lg text-[#C5CBD7] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover intelligent EV technology, charging solutions, AI-powered insights, government schemes, marketplace services, and the future of sustainable mobility—all in one platform.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/evtech"
                  className="px-6 py-3.5 rounded-xl font-bold bg-[#00D26A] text-[#07090e] hover:bg-[#6BFF95] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_24px_rgba(0,210,106,0.25)] flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  Explore EVTech
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                </Link>
                <Link 
                  href="/marketplace"
                  className="px-6 py-3.5 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Explore Marketplace
                </Link>
                <Link 
                  href="/company/contact"
                  className="px-6 py-3.5 rounded-xl font-bold bg-transparent border border-white/20 hover:border-white/40 text-muted-foreground hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Side Animated SVGs & Data Cards Hero Illustration */}
            <div className="lg:col-span-6 relative flex justify-center items-center h-[460px] max-w-xl mx-auto lg:max-w-none w-full">
              
              {/* Floating Data Card 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 left-4 z-20 backdrop-blur-md bg-white/2 border border-white/10 rounded-xl p-3.5 shadow-lg flex items-center gap-3 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00D26A]/10 border border-[#00D26A]/20 flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5 text-[#00D26A]" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-[#C5CBD7]/60 font-bold uppercase tracking-wider block">Grid Sync</span>
                  <span className="text-xs font-bold text-white block">V2G Active (99.9%)</span>
                </div>
              </motion.div>

              {/* Floating Data Card 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 right-6 z-20 backdrop-blur-md bg-white/2 border border-white/10 rounded-xl p-3.5 shadow-lg flex items-center gap-3 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-[#3B82F6]" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-[#C5CBD7]/60 font-bold uppercase tracking-wider block">AI Diagnostics</span>
                  <span className="text-xs font-bold text-white block">BMS Protected</span>
                </div>
              </motion.div>

              {/* Core SVG Composition */}
              <div className="w-full h-full relative border border-white/5 rounded-[24px] bg-white/1 backdrop-blur-xs overflow-hidden shadow-2xl">
                
                {/* Circuit Grid Pattern Backdrop inside illustration */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] bg-size-[16px_16px] pointer-events-none" />

                <svg className="w-full h-full p-4" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Smart City Skyline Silhouette */}
                  <g opacity="0.12">
                    <rect x="20" y="280" width="40" height="80" fill="#AEB5C0" />
                    <rect x="70" y="240" width="50" height="120" fill="#AEB5C0" />
                    <rect x="130" y="200" width="45" height="160" fill="#AEB5C0" />
                    <rect x="185" y="250" width="35" height="110" fill="#AEB5C0" />
                    <rect x="230" y="210" width="55" height="150" fill="#AEB5C0" />
                    <rect x="295" y="260" width="40" height="100" fill="#AEB5C0" />
                    <rect x="345" y="190" width="50" height="170" fill="#AEB5C0" />
                    <rect x="405" y="230" width="45" height="130" fill="#AEB5C0" />
                    <rect x="460" y="270" width="30" height="90" fill="#AEB5C0" />
                  </g>

                  {/* AI Circuit Paths */}
                  <g opacity="0.3">
                    <path d="M 150,220 L 250,150 L 350,220" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 250,150 L 250,80" stroke="#00D26A" strokeWidth="1.5" />
                    <circle cx="250" cy="80" r="6" fill="#00D26A" />
                    <circle cx="150" cy="220" r="4" fill="#3B82F6" />
                    <circle cx="350" cy="220" r="4" fill="#8B5CF6" />
                  </g>

                  {/* Charging Station Vector */}
                  <g transform="translate(80, 240)">
                    <rect x="0" y="0" width="36" height="70" rx="6" fill="#131722" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    <rect x="6" y="8" width="24" height="16" rx="2" fill="#07090e" stroke="rgba(255,255,255,0.05)" />
                    {/* Screen light indicator */}
                    <rect x="12" y="12" width="12" height="8" fill="#3B82F6" opacity="0.8" />
                    {/* Green charger logo */}
                    <circle cx="18" cy="46" r="8" fill="#00D26A" opacity="0.15" />
                    <path d="M 18,40 L 14,48 L 17,48 L 16,53 L 21,45 L 18,45 Z" fill="#00D26A" />
                    {/* Pulsing Cable line to the center */}
                    <path d="M 36,55 Q 80,60 120,40" fill="none" stroke="#00D26A" strokeWidth="2.5" strokeDasharray="6 4" className="animate-flow-dash" />
                  </g>

                  {/* Battery Pack Vector */}
                  <g transform="translate(370, 250)">
                    <rect x="0" y="0" width="55" height="58" rx="8" fill="#131722" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    {/* Battery terminal top nodes */}
                    <rect x="12" y="-4" width="8" height="4" fill="#AEB5C0" rx="1" />
                    <rect x="35" y="-4" width="8" height="4" fill="#AEB5C0" rx="1" />
                    {/* Charging stats indicators */}
                    <rect x="10" y="10" width="35" height="8" rx="1" fill="#00D26A" opacity="0.8" />
                    <rect x="10" y="22" width="35" height="8" rx="1" fill="#00D26A" opacity="0.8" />
                    <rect x="10" y="34" width="35" height="8" rx="1" fill="#00D26A" opacity="0.3" />
                    {/* Energy flow link */}
                    <path d="M 0,30 Q -40,35 -90,15" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="6 4" className="animate-flow-dash-reverse" />
                  </g>

                  {/* Futuristic Electric Car Silhouette in the Center */}
                  <g transform="translate(160, 220)">
                    {/* Shadow glow under car */}
                    <ellipse cx="90" cy="98" rx="80" ry="10" fill="#00D26A" opacity="0.18" filter="url(#glow-blur)" />
                    {/* Body contours */}
                    <path d="M 10,85 C 20,80 40,55 80,45 C 120,35 150,55 170,80 C 178,88 174,95 160,95 L 20,95 C 10,95 5,90 10,85 Z" fill="#131722" stroke="#00D26A" strokeWidth="2" />
                    <path d="M 40,55 C 65,30 115,30 140,55" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.8" />
                    
                    {/* Wheels */}
                    <circle cx="45" cy="95" r="16" fill="#07090e" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <circle cx="45" cy="95" r="11" fill="#00D26A" opacity="0.1" />
                    <circle cx="45" cy="95" r="4" fill="#00D26A" />

                    <circle cx="135" cy="95" r="16" fill="#07090e" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <circle cx="135" cy="95" r="11" fill="#00D26A" opacity="0.1" />
                    <circle cx="135" cy="95" r="4" fill="#00D26A" />
                    
                    {/* Laser head lights & tail lights */}
                    <path d="M 170,80 L 175,82" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 10,85 L 6,87" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                  
                  <defs>
                    <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
