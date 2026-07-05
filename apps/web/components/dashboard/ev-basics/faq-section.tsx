"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "What is an Electric Vehicle (EV)?", a: "An Electric Vehicle uses one or more electric motors powered by rechargeable battery packs instead of an internal combustion engine (ICE). EVs convert stored electrical energy directly into motion, achieving 85-95% energy efficiency compared to 20-30% for petrol/diesel engines." },
  { q: "How far can an EV travel on a single charge?", a: "Modern EVs range from 200-600 km per charge depending on battery capacity, driving conditions, and vehicle efficiency. Premium EVs like the Mercedes EQS achieve 770 km, while affordable models like the Tata Nexon EV offer 312 km of real-world range." },
  { q: "How long does it take to charge an EV?", a: "Charging time varies by level: Level 1 (home outlet) takes 12-24 hours, Level 2 (AC charger) takes 4-8 hours, and DC Fast Charging can charge 10-80% in just 20-45 minutes. Battery size, charger power, and temperature all affect charging speed." },
  { q: "Are EVs really better for the environment?", a: "Yes. Even accounting for battery manufacturing, EVs produce 50-70% fewer lifetime CO₂ emissions than ICE vehicles. As renewable energy grows, this gap widens significantly. EV batteries are also increasingly recyclable." },
  { q: "How long do EV batteries last?", a: "Modern EV batteries are designed to last 10-20 years or 200,000-500,000 km. Most manufacturers warranty batteries for 8 years or 160,000 km. Battery degradation is typically 2-3% per year with proper thermal management." },
  { q: "What is regenerative braking?", a: "Regenerative braking uses the electric motor in reverse as a generator during deceleration. This converts kinetic energy back into electrical energy stored in the battery, recovering 10-30% of energy that would otherwise be lost as heat in traditional friction brakes." },
  { q: "Do EVs require less maintenance than petrol cars?", a: "Yes, significantly. EVs have 75% fewer moving parts than ICE vehicles. No oil changes, no spark plugs, no transmission fluid, no exhaust system. Main maintenance items are tires, brakes (which last longer due to regen), and cabin air filters." },
  { q: "What are the different types of EV charging connectors?", a: "Major standards include CCS2 (Combined Charging System — most common globally), CHAdeMO (Japanese standard), Type 2/Mennekes (AC charging in Europe/India), NACS (Tesla's standard, becoming dominant in North America), and GB/T (Chinese standard)." },
];

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return FAQS;
    const lower = searchQuery.toLowerCase();
    return FAQS.filter(
      (faq) => faq.q.toLowerCase().includes(lower) || faq.a.toLowerCase().includes(lower)
    );
  }, [searchQuery]);

  return (
    <section id="faq" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-[#AEB5C0]/60 mt-1">Common questions about Electric Vehicles answered</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB5C0]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/3 border border-white/10 text-sm text-white placeholder:text-[#AEB5C0]/30 focus:outline-none focus:border-[#8B5CF6]/40 focus:bg-[#8B5CF6]/3 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#AEB5C0]/40 text-sm">
            No questions found matching &quot;{searchQuery}&quot;
          </div>
        )}
        {filtered.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#8B5CF6]/20 bg-[#8B5CF6]/3"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
              >
                <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-[#A78BFA]" : "text-[#AEB5C0]/40"}`} />
                <span className={`text-sm font-bold flex-1 transition-colors ${isOpen ? "text-white" : "text-[#AEB5C0]/80"}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#AEB5C0]/40 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#A78BFA]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-[13px] text-[#AEB5C0]/70 leading-relaxed pl-12">
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
