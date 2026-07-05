"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "What is the difference between LFP and NMC batteries?", a: "LFP (Lithium Iron Phosphate) batteries utilize iron phosphate cathodes. They are exceptionally safe, durable (3,000+ cycles), and cheaper, but have lower energy density. NMC (Nickel Manganese Cobalt) batteries offer higher density (longer range) but are more expensive, utilize cobalt, and have lower thermal limits." },
  { q: "How long does a modern EV battery pack last?", a: "Typically 10-15 years or up to 200,000 - 300,000 km of driving. Most manufacturers warranty packs for 8 years / 160,000 km, guaranteeing at least 70-80% capacity retention." },
  { q: "What is a Pyro-Fuse in EV packs?", a: "A pyro-fuse is a safety device triggered by pyrotechnics. In the event of a crash detection or direct short-circuit fault, it physically blows in less than 2 milliseconds, severing the high-voltage pack connection entirely." },
  { q: "How does regenerative braking help the battery?", a: "Regen braking shifts the electric motor to run as a generator when you release the accelerator. It captures kinetic deceleration energy and directs it back into the battery, recovering up to 10-30% of range." },
  { q: "What is cell balancing in a BMS?", a: "Cell balancing ensures all cell groups in a series configuration maintain identical voltage levels. Without balancing, the weakest cell group would discharge first, limiting the capacity of the entire pack." },
  { q: "Why does charging speed slow down after 80%?", a: "To protect the cells. Below 80%, the battery is in the Constant Current (CC) phase and accepts high currents. Above 80%, it switches to Constant Voltage (CV) where charging current is tapered down to prevent lithium plating and thermal damage." },
  { q: "What is thermal runaway?", a: "Thermal runaway is an unstable chemical reaction chain. If a cell overheats beyond safe limits, it triggers chemical decomposition that releases more heat, potentially propagating to adjacent cells. Standard systems use aerogel sheets to isolate cells." },
  { q: "Are solid-state batteries ready for mass production?", a: "Solid-state batteries are currently in the pilot production phase. Challenges include high manufacturing costs under dry-room environments, but they are expected to start appearing in premium EVs by 2028-2030." }
];

export function FAQSection() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return FAQS;
    const q = search.toLowerCase();
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <section id="faq" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-[#AEB5C0]/60 mt-1">Common answers about high-voltage battery technologies</p>
        </div>

        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/3 border border-white/10 text-sm text-white placeholder:text-[#AEB5C0]/30 focus:outline-none focus:border-[#10B981]/40 focus:bg-[#10B981]/[0.03] transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#AEB5C0]/40 text-sm">
            No questions found matching &quot;{search}&quot;
          </div>
        )}
        {filtered.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#10B981]/20 bg-[#10B981]/[0.03]"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left font-bold text-xs"
              >
                <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-[#6EE7B7]" : "text-[#AEB5C0]/40"}`} />
                <span className={`flex-1 transition-colors ${isOpen ? "text-white" : "text-[#AEB5C0]/85"}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#AEB5C0]/40 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#6EE7B7]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-[12.5px] text-[#AEB5C0]/70 leading-relaxed pl-12">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
