"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { DigitalTwinSimulator } from "@/components/dashboard/digital-twin/digital-twin-simulator";

export default function DigitalTwinPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans overflow-hidden">
      {/* Ambient background glow design */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb navigation */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <nav className="sticky top-[72px] z-40 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[12px] font-semibold text-muted-foreground/60">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/evtech" className="hover:text-white transition-colors">
              EVTech
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-purple-300">Battery Digital Twin</span>
          </div>
        </nav>
      </div>

      {/* Main Content Dashboard Frame */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <DigitalTwinSimulator />
      </main>
    </div>
  );
}
