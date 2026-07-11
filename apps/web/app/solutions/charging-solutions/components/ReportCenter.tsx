"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, FileSpreadsheet, Printer, Download, Sparkles, CheckCircle2, RotateCw } from "lucide-react";

interface Report {
  id: string;
  name: string;
  desc: string;
  size: string;
  type: "PDF" | "XLSX" | "PDF/Print";
}

export function ReportCenter() {
  const [compilingIds, setCompilingIds] = useState<Record<string, number>>({});
  const [downloadableIds, setDownloadableIds] = useState<string[]>([]);

  const reports: Report[] = [
    { id: "eng", name: "Engineering Grid & Load Report", desc: "Detailed grid transformer sizing specifications and cable safety layouts.", size: "4.8 MB", type: "PDF" },
    { id: "prop", name: "Executive Business Proposal", desc: "Executive business summary, investor cash flow pitches, and partner SLAs.", size: "2.4 MB", type: "PDF" },
    { id: "cost", name: "Detailed CAPEX & OPEX Spreadsheet", desc: "Civil works, hardware procurement costs, and software licensing sheets.", size: "1.2 MB", type: "XLSX" },
    { id: "nrg", name: "Energy Load & Solar Analytics Report", desc: "Hourly load profile distributions, solar offsets, and battery savings calculations.", size: "3.5 MB", type: "PDF" },
    { id: "roi", name: "10-Year Portfolio ROI Modeling", desc: "Amortization schedule, federal subsidy claims, and LCFS carbon trading forecasts.", size: "1.8 MB", type: "PDF" },
    { id: "check", name: "Substation Compliance Checklist", desc: "Regional electrical codes, safety compliance checklists, and installation guides.", size: "850 KB", type: "PDF/Print" },
  ];

  const handleCompile = (id: string) => {
    if (compilingIds[id] !== undefined || downloadableIds.includes(id)) return;

    // Start progress emulation
    setCompilingIds((prev) => ({ ...prev, [id]: 0 }));

    const interval = setInterval(() => {
      setCompilingIds((prev) => {
        const currentVal = prev[id] ?? 0;
        if (currentVal >= 100) {
          clearInterval(interval);
          setDownloadableIds((d) => [...d, id]);
          // clean up compiling state
          const copy = { ...prev };
          delete copy[id];
          return copy;
        }
        return { ...prev, [id]: currentVal + 20 };
      });
    }, 400);
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-6">
        
        <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              COMPLIANCE & DOCUMENT HUB
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <FileText className="w-5 h-5 text-[#00E676]" />
              Engineering Proposal & Report Center
            </h2>
          </div>

          <div className="text-[9px] text-muted-foreground/50 font-mono uppercase tracking-wider bg-white/2 border border-white/5 px-3 py-1.5 rounded-lg">
            Authorized for Regional Grid Filing
          </div>
        </div>

        {/* Reports grid checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((report) => {
            const isCompiling = compilingIds[report.id] !== undefined;
            const progress = compilingIds[report.id] ?? 0;
            const isDownloadable = downloadableIds.includes(report.id);

            return (
              <div
                key={report.id}
                className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-extrabold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/20 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {report.type}
                    </span>
                    <span className="text-[9px] text-muted-foreground/40 font-mono">{report.size}</span>
                  </div>

                  <h3 className="text-xs font-black text-white">{report.name}</h3>
                  <p className="text-[10.5px] text-muted-foreground/75 leading-relaxed">{report.desc}</p>
                </div>

                {/* Compilation progress feedback or trigger */}
                <div className="pt-2 border-t border-white/5">
                  {isCompiling ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[8px] font-black text-[#00E676] uppercase tracking-wider">
                        <span>Compiling document...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00E676] transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  ) : isDownloadable ? (
                    <button
                      onClick={() => alert(`Downloading: ${report.name}`)}
                      className="w-full py-2.5 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#00E676]/20 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.1)]"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00E676]" />
                      Download Compiled File
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCompile(report.id)}
                      className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-muted-foreground" />
                      Compile & Generate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
