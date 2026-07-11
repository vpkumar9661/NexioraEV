"use client";

import { Download, FileText, Image, BookOpen, FileSpreadsheet } from "lucide-react";

const RESOURCES = [
  { title: "EV Battery Handbook v2", format: "PDF", size: "6.8 MB", icon: FileText, color: "#EF4444", desc: "Our ultimate 120-page guide detailing battery design, BMS code, and cooling systems." },
  { title: "Chemistry Comparison Chart", format: "PDF", size: "1.2 MB", icon: FileSpreadsheet, color: "#10B981", desc: "Quick reference table comparing LFP, NMC, NCA, and Sodium-Ion cell specifications." },
  { title: "BMS Diagnostic Manual", format: "PDF", size: "2.4 MB", icon: BookOpen, color: "#3B82F6", desc: "Step-by-step instructions on debugging cell balancing issues and temperature sensors." },
  { title: "High-Voltage Battery Glossary", format: "PDF", size: "850 KB", icon: BookOpen, color: "#8B5CF6", desc: "Over 200 terminology definitions related to electromobility." }
];

export function DownloadCenter() {
  return (
    <section id="downloads" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Technical Resource Downloads</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Get free technical notes, manuals, and glossary documents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {RESOURCES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group rounded-[18px] border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 p-5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${item.color}12`, borderColor: `${item.color}25` }}>
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#6EE7B7] transition-colors truncate">{item.title}</h4>
                  <p className="text-[11.5px] text-muted-foreground/60 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-muted-foreground/60">{item.format}</span>
                      <span className="text-[10px] text-muted-foreground/40">{item.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground/30 group-hover:text-[#6EE7B7] transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
