"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { 
  AIBreadcrumb,
  AILeftSidebar,
  AIFloatingToolbar,
  AIHero,
  AIQuickActions,
  PromptLibrary,
  ChatWorkspace,
  TripPlanner,
  AdvisorsSection,
  VoiceModeSection,
  FAQSection,
  Message
} from "@/components/dashboard/ai-assistant";

const SECTION_IDS = [
  "hero",
  "quickactions",
  "chat",
  "planner",
  "battery",
  "voice",
  "faq"
];

export default function AIAssistantPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Scroll active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) {
          setActiveSection(first.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSendMessage = (text: string) => {
    const newMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, newMsg]);
    setIsStreaming(true);

    // Mock streaming delay response
    setTimeout(() => {
      let replyText = "Based on current vehicle configurations schemas, passive balancing dissipative shunts run at under 45% thermal efficiencies. Active inductive balancing is recommended to consolidate range.";
      if (text.toLowerCase().includes("solid")) {
        replyText = "Solid-state cells replace organic liquids separators with ceramic plates, doubling specific energy density bounds and eliminating fire dendrite puncture risks.";
      } else if (text.toLowerCase().includes("wireless") || text.toLowerCase().includes("charge")) {
        replyText = "Inductive charging pads transfer grid current to vehicle coils dynamically. Real trial tests yield up to 92% efficiency coupling alignments.";
      } else if (text.toLowerCase().includes("v2g") || text.toLowerCase().includes("grid")) {
        replyText = "Vehicle-to-grid (V2G) interfaces link parked vehicles batteries back to municipal sub-stations during load peak spikes to generate credits.";
      }
      
      setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);
      setIsStreaming(false);
    }, 1500);
  };

  const handleSelectQuickAction = (promptText: string) => {
    handleSendMessage(promptText);
    // Smooth scroll to chat workspace
    const el = document.getElementById("chat");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans overflow-hidden">
      {/* Violet themed ambient glowing backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#7C4DFF]/1 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1 rounded-full blur-[150px]" />
      </div>

      {/* Sticky breadcrumbs */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <AIBreadcrumb />
      </div>

      {/* Sticky Left folders Sidebar */}
      <AILeftSidebar 
        activeSection={activeSection} 
        onNewChat={handleClearHistory}
      />

      {/* Floating Toolbar Shortcuts */}
      <AIFloatingToolbar onNewChat={handleClearHistory} />

      {/* Main Content Workspace Layout */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        
        {/* Section 1: Hero */}
        <AIHero />

        {/* Section 2: Quick Actions templates */}
        <AIQuickActions onSelectAction={handleSelectQuickAction} />

        {/* Section 3: Conversation Workspace chat boxes */}
        <ChatWorkspace
          messages={messages}
          onSendMessage={handleSendMessage}
          onClear={handleClearHistory}
          isStreaming={isStreaming}
        />

        {/* Prompt Library */}
        <PromptLibrary onSelectPrompt={handleSelectQuickAction} />

        {/* Section 4: Trip route planner calculations */}
        <TripPlanner />

        {/* Section 5: specialized advisors */}
        <AdvisorsSection />

        {/* Section 6: Voice transcripts recorder & doc scanner */}
        <VoiceModeSection />

        {/* Section 7: accordions FAQs */}
        <FAQSection />

      </main>
    </div>
  );
}
