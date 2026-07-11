"use client";

import { Download, FileText, Image, BookOpen, FileSpreadsheet } from "lucide-react";

const DOWNLOADS = [
  { title: "EV Basics Complete Guide", format: "PDF", size: "4.2 MB", icon: FileText, color: "#EF4444", desc: "Comprehensive 80-page guide covering all EV fundamentals." },
  { title: "Battery Technology Infographic", format: "PNG", size: "2.1 MB", icon: Image, color: "#8B5CF6", desc: "Visual breakdown of Li-ion, LFP, and Solid State cell architectures." },
  { title: "EV Glossary & Terminology", format: "PDF", size: "1.5 MB", icon: BookOpen, color: "#3B82F6", desc: "350+ EV-specific terms with definitions and context." },
  { title: "EV vs ICE Cost Analysis", format: "XLSX", size: "0.8 MB", icon: FileSpreadsheet, color: "#10B981", desc: "5-year TCO calculator spreadsheet comparing EV and petrol vehicles." },
  { title: "Charging Standards Cheatsheet", format: "PDF", size: "1.2 MB", icon: FileText, color: "#F59E0B", desc: "Quick reference for CCS2, CHAdeMO, Type 2, and NACS standards." },
  { title: "EV Research Paper Collection", format: "PDF", size: "12.8 MB", icon: BookOpen, color: "#06B6D4", desc: "Curated collection of 15 peer-reviewed EV research papers." },
];

export function DownloadCenter() {
  return (
    <section id="downloads" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Download Center</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Free resources, guides, and research materials</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOWNLOADS.map((item, idx) => {
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
                  <h4 className="text-sm font-bold text-white group-hover:text-[#A78BFA] transition-colors truncate">{item.title}</h4>
                  <p className="text-[11.5px] text-muted-foreground/55 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-muted-foreground/60">{item.format}</span>
                      <span className="text-[10px] text-muted-foreground/40">{item.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground/30 group-hover:text-[#A78BFA] transition-colors" />
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
