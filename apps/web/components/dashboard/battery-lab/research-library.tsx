"use client";

import { FileText, Download, Landmark, FileSpreadsheet, Layers } from "lucide-react";

const PAPERS = [
  { title: "Silicon Anode Solid-State Electrolytes", type: "White Paper", size: "3.4 MB", author: "Nexiora R&D Group", icon: Layers, color: "#10B981", desc: "Design considerations and lifecycle results of polymer-ceramic solid matrices." },
  { title: "Calendar Aging under Climatic Extremes", type: "Research Paper", size: "1.9 MB", author: "Global EV Institute", icon: FileText, color: "#3B82F6", desc: "5-year degradation logging of NMC vs LFP chemistries in tropical Indian temperatures." },
  { title: "BMS Voltage Balancing Algorithms", type: "Case Study", size: "2.1 MB", author: "IIT Bombay EV Consortium", icon: Landmark, color: "#8B5CF6", desc: "Comparative efficiency analysis of active shuttle capacitor vs passive balancing networks." },
  { title: "Gigafactory Cost Scaling Index", type: "Industry Report", size: "4.8 MB", author: "Nexiora Intelligence Hub", icon: FileSpreadsheet, color: "#EC4899", desc: "Analysis of production scaling thresholds needed to reduce Na-Ion cell costs below $35/kWh." }
];

export function ResearchLibrary() {
  return (
    <section id="library" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Technical Research Library</h2>
          <p className="text-sm text-[#AEB5C0]/60 mt-1">Access peer-reviewed documents, engineering reports, and chemistry case studies</p>
        </div>
        <span className="text-[11px] font-bold text-[#6EE7B7] bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full">
          {PAPERS.length} Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAPERS.map((paper, idx) => {
          const Icon = paper.icon;
          return (
            <div
              key={idx}
              className="group rounded-[18px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-5 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-[0.04] transition-opacity" style={{ backgroundColor: paper.color }} />
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${paper.color}15`, borderColor: `${paper.color}25` }}>
                  <Icon className="w-5 h-5" style={{ color: paper.color }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: paper.color }}>{paper.type}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#6EE7B7] transition-colors truncate mt-0.5">{paper.title}</h4>
                  <p className="text-[11.5px] text-[#AEB5C0]/65 mt-1.5 line-clamp-2 leading-relaxed">{paper.desc}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-[#AEB5C0]/40 font-semibold">Author: {paper.author}</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#6EE7B7] hover:underline">
                      <Download className="w-3.5 h-3.5" /> Download ({paper.size})
                    </div>
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
