"use client";

import React, { useState } from "react";
import { FileText, Download, RotateCw } from "lucide-react";

interface Report {
  id: string;
  name: string;
  desc: string;
  size: string;
  type: "PDF" | "XLSX" | "CSV";
}

export function ReportCenter() {
  const [compilingIds, setCompilingIds] = useState<Record<string, number>>({});
  const [downloadableIds, setDownloadableIds] = useState<string[]>([]);

  const reports: Report[] = [
    { id: "roi", name: "Corporate EV Electrification ROI Case", desc: "Capital offsets, PM E-Drive grants mapping, depreciation benefits calculations.", size: "3.5 MB", type: "PDF" },
    { id: "monetization", name: "Merchant Revenue Session Ledger", desc: "Guest sessions clearance rates, tariff billing models, parking validation logs.", size: "4.8 MB", type: "XLSX" },
    { id: "leed", name: "LEED Section LT Green Credit Audits", desc: "OCPP smart integration reports, energy offset indices, EV parking quotas.", size: "2.1 MB", type: "PDF" },
  ];

  const handleCompile = (id: string) => {
    if (compilingIds[id] !== undefined || downloadableIds.includes(id)) return;

    setCompilingIds((prev) => ({ ...prev, [id]: 0 }));

    const interval = setInterval(() => {
      setCompilingIds((prev) => {
        const currentVal = prev[id] ?? 0;
        if (currentVal >= 100) {
          clearInterval(interval);
          setDownloadableIds((d) => [...d, id]);
          const copy = { ...prev };
          delete copy[id];
          return copy;
        }
        return { ...prev, [id]: currentVal + 25 };
      });
    }, 300);
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-6">
        
        <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              ENTERPRISE BUSINESS REPORT ARCHIVE
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <FileText className="w-5 h-5 text-[#00E676]" />
              Report Center
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reports.map((report) => {
            const isCompiling = compilingIds[report.id] !== undefined;
            const progress = compilingIds[report.id] ?? 0;
            const isDownloadable = downloadableIds.includes(report.id);

            return (
              <div
                key={report.id}
                className="p-5 rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/2 hover:bg-[#ffffff]/4 transition-all duration-300 flex flex-col justify-between h-[200px]"
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-bold text-black px-2 py-0.5 rounded bg-[#00D4FF] uppercase tracking-widest">
                      {report.type}
                    </span>
                    <span className="text-[9px] text-muted-foreground/40 font-mono">{report.size}</span>
                  </div>

                  <h3 className="text-xs font-black text-white mt-2">{report.name}</h3>
                  <p className="text-[10px] text-muted-foreground/65 leading-relaxed line-clamp-2">{report.desc}</p>
                </div>

                <div className="border-t border-[#ffffff]/5 pt-3">
                  {isCompiling ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-bold text-[#00E676] uppercase">
                        <span>Compiling...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00E676] transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  ) : isDownloadable ? (
                    <button
                      onClick={() => alert(`Downloading: ${report.name}`)}
                      className="w-full py-2 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 text-white font-extrabold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.1)]"
                    >
                      <Download className="w-3 h-3 text-[#00E676]" />
                      Download File
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCompile(report.id)}
                      className="w-full py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-muted-foreground" />
                      Compile document
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
