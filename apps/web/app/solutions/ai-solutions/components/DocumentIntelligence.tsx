"use client";

import React, { useState } from "react";
import { FileText, Download, RotateCw, UploadCloud, ShieldCheck } from "lucide-react";

export function DocumentIntelligence() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<{
    summary: string;
    savings: string;
    carbonOffset: string;
    risk: string;
  } | null>(null);

  const handleUpload = () => {
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    setExtractedData(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setExtractedData({
            summary: "Corporate utility bill indicates high peak demand pricing charges ($0.42/kWh) during afternoon workplace cooling cycles.",
            savings: "$4,850/Month potential cost reductions using BESS batteries scheduling.",
            carbonOffset: "12.4 Tons potential Scope 2 emission deductions.",
            risk: "High risk of peak demand surcharge triggers if cooling load overlaps grid utility peak blocks.",
          });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Drag/Upload Area */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                OCR PARSING COGNITIVE SHIELD
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <UploadCloud className="w-5 h-5 text-[#00E676]" />
                Document Intelligence
              </h2>
            </div>

            <div
              onClick={handleUpload}
              className="p-8 border border-dashed border-white/10 hover:border-[#00E676]/30 bg-white/2 hover:bg-white/4 rounded-2xl cursor-pointer text-center space-y-3.5 transition-all"
            >
              <UploadCloud className="w-8 h-8 text-muted-foreground/45 mx-auto animate-bounce" />
              <div>
                <span className="text-xs font-black text-white block">Click to upload corporate utility bill</span>
                <span className="text-[9.5px] text-muted-foreground/40 block mt-1">PDF, Excel, PNG, or CSV up to 10MB</span>
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-[8.5px] font-bold text-[#00E676] uppercase font-mono">
                  <span>Uploading file...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E676] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>OCR engine extracts carbon offset metrics using certified compliance models.</p>
          </div>
        </div>

        {/* Right Extracted Results */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>EXTRACTED INVOICE COMPLIANCE METRICS</span>
              <span>AI INSIGHTS</span>
            </div>

            {extractedData ? (
              <div className="space-y-3.5 text-xs text-white">
                <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                  <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Bill Summary</span>
                  <p className="mt-1 leading-relaxed text-muted-foreground/85">{extractedData.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                    <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Savings potential</span>
                    <p className="mt-1.5 font-extrabold text-[#00E676]">{extractedData.savings}</p>
                  </div>
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                    <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Carbon offsets</span>
                    <p className="mt-1.5 font-extrabold text-[#00D4FF]">{extractedData.carbonOffset}</p>
                  </div>
                </div>

                <div className="p-3 bg-rose-500/5 border border-rose-500/15 rounded-xl text-rose-300">
                  <span className="text-[8px] opacity-50 font-bold uppercase block">Compliance Risk</span>
                  <p className="mt-1 leading-relaxed">{extractedData.risk}</p>
                </div>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-xs text-muted-foreground/40 font-mono">
                No active document uploaded. Trigger upload test on the left.
              </div>
            )}
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider">
            <span>Doc Engine v2.5</span>
            <span>PCI-DSS SECURE</span>
          </div>

        </div>

      </div>
    </section>
  );
}
