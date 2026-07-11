"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Landmark, ShieldCheck, Download, Award, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

export function BusinessROI() {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const stats = [
    { label: "Total Investment", value: "$138,500", desc: "Estimated CAPEX" },
    { label: "Government Subsidy", value: "$41,550", desc: "30% Federal credit tax" },
    { label: "State Carbon Credit", value: "$8,400 / yr", desc: "Estimated trade yield" },
    { label: "Net Break Even", value: "3.4 Years", desc: "Amortization profile" },
  ];

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    // Simulate PDF generation delay
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      
      // Auto reset success state after 3s
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Informational Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest block">
              INFRASTRUCTURE BI PORTAL
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Maximize Portfolio Yield and Subsidies
            </h2>
            <p className="text-xs text-muted-foreground/75 leading-relaxed max-w-xl">
              Unlock regional federal grants, carbon offset trading credits, and accelerated tax write-offs for corporate charging stations. Our simulator maps your grid configuration to current state subsidies automatically.
            </p>
          </div>

          {/* Core financial stats list */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">{stat.label}</span>
                <span className="text-lg font-black text-white block mt-1">{stat.value}</span>
                <span className="text-[9px] text-muted-foreground/50 block mt-1">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Financial Card Detail */}
        <div className="lg:col-span-5 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 space-y-6 relative overflow-hidden">
          
          <div className="space-y-3.5">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/5 pb-2.5 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#F59E0B]" />
              Federal Tax Subsidies
            </h4>

            {/* Subsidies list */}
            <div className="space-y-2.5 text-[11px] text-muted-foreground/85">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-2 mt-0.5">
                  <Award className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span className="font-extrabold text-white">US Federal Title 30C Credit</span>
                </div>
                <span className="font-bold text-[#00E676]">$100,000 max offset</span>
              </div>

              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-2 mt-0.5">
                  <Award className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span className="font-extrabold text-white">Accelerated Bonus Depreciation</span>
                </div>
                <span className="font-bold text-[#00E676]">Section 179 (Year 1)</span>
              </div>

              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-2 mt-0.5">
                  <Award className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span className="font-extrabold text-white">Clean Fuel Credit (LCFS)</span>
                </div>
                <span className="font-bold text-[#00E676]">Carbon Credit trade eligibility</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {/* Generate Report button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
                downloadSuccess
                  ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.1)]"
                  : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
              }`}
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
                  COMPILING FINANCIAL MODEL...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#00E676]" />
                  BUSINESS REPORT DOWNLOADED!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-muted-foreground" />
                  Download Business Report (PDF)
                </>
              )}
            </button>

            <span className="text-[8px] text-muted-foreground/40 font-mono block text-center uppercase tracking-wider">
              Secure PDF signing via Nexiora Certifications
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
