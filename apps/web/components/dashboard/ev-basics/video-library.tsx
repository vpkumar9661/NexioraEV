"use client";

import { Play, Clock, Eye } from "lucide-react";

const VIDEOS = [
  { title: "How Electric Cars Work", category: "Fundamentals", duration: "12:30", views: "2.4M", thumb: "🔋" },
  { title: "Inside an EV Battery Pack", category: "Battery Tech", duration: "18:45", views: "1.8M", thumb: "⚡" },
  { title: "DC Fast Charging Explained", category: "Charging", duration: "10:15", views: "1.2M", thumb: "🔌" },
  { title: "Regenerative Braking Deep Dive", category: "Engineering", duration: "15:20", views: "890K", thumb: "🔄" },
  { title: "EV Motors: PMSM vs Induction", category: "Motors", duration: "22:00", views: "1.1M", thumb: "⚙️" },
  { title: "The Future of Solid State Batteries", category: "Future Tech", duration: "14:30", views: "3.2M", thumb: "🚀" },
];

export function VideoLibrary() {
  return (
    <section id="videos" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Video Library</h2>
          <p className="text-sm text-muted-foreground/60 mt-1">Curated video lessons from top EV educators</p>
        </div>
        <span className="text-[11px] font-bold text-[#A78BFA] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-3 py-1 rounded-full">
          {VIDEOS.length} Videos
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VIDEOS.map((video, idx) => (
          <div
            key={idx}
            className="group rounded-[18px] border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Thumbnail area */}
            <div className="relative h-[130px] bg-linear-to-br from-[#131722] to-[#0a0d14] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] bg-size-[12px_12px]" />
              <span className="text-4xl">{video.thumb}</span>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/80 flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>

              <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md">
                {video.duration}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78BFA]">{video.category}</span>
              <h4 className="text-sm font-bold text-white group-hover:text-[#A78BFA] transition-colors line-clamp-1">{video.title}</h4>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground/50">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
