"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function DashboardBreadcrumb() {
  return (
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
        <span className="text-[#8B5CF6]">EV Basics</span>
      </div>
    </nav>
  );
}
