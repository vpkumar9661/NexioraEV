"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { 
  TopToolbar,
  LeftConfigSidebar,
  RightDiagnosticsSidebar,
  StudiosWorkspace,
  BottomWorkspace,
  WorkbenchSetup
} from "@/components/dashboard/calculators-tools/workbench";

export default function EngineeringWorkbenchPage() {
  const [projectName, setProjectName] = useState<string>("EV Engineering Design Project 1");
  const [activeTab, setActiveTab] = useState<string>("battery");

  const [setup, setSetup] = useState<WorkbenchSetup>({
    chemistry: "nmc",
    capacity: 75,
    series: 96,
    parallel: 4,
    cooling: "liquid",
    platform: "sedan"
  });

  const handleConfigChange = (updates: Partial<WorkbenchSetup>) => {
    setSetup((prev) => ({ ...prev, ...updates }));
  };

  // Shared calculation matrices
  const stats = useMemo(() => {
    const packVoltage = setup.series * 3.7;
    const totalAh = setup.parallel * 3.2;
    const capacityKwh = parseFloat(((packVoltage * totalAh) / 1000).toFixed(2));
    
    // Weight estimation
    const weight = Math.round(capacityKwh * 6.2);

    // Aerodynamics drag calculations
    const dragCoeff = setup.platform === "bus" || setup.platform === "truck" ? 0.35 : 0.24;
    const range = Math.round(capacityKwh * 5.8 * (1 - (dragCoeff - 0.2) * 1.5));

    // Efficiency indexes
    const efficiency = setup.platform === "bus" || setup.platform === "truck" ? 82 : 94;

    // CO2 saved (kg) based on range
    const carbonSaved = Math.round(range * 0.12 * 3);

    return {
      voltage: Math.round(packVoltage),
      weight,
      range,
      efficiency,
      carbonSaved
    };
  }, [setup]);

  const handleSave = () => {
    alert("Engineering project configurations saved successfully.");
  };

  const handleDuplicate = () => {
    alert("Project configurations duplicated successfully.");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Engineering Workbench configuration link copied to clipboard.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans overflow-hidden">
      {/* Emerald themed ambient glowing backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#00C853]/1 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#8B5CF6]/1 rounded-full blur-[150px]" />
      </div>

      {/* Sticky breadcrumbs */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <nav className="sticky top-[72px] z-40 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[12px] font-semibold text-[#AEB5C0]/60">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/evtech" className="hover:text-white transition-colors">
                EVTech
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/evtech/calculators-tools" className="hover:text-white transition-colors">
                Toolkit
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#00C853] font-bold">Engineering Workbench</span>
            </div>
            <span className="hidden sm:inline text-[10px] text-[#00C853] font-extrabold uppercase tracking-wider">
              Design • Simulate • Analyze • Optimize
            </span>
          </div>
        </nav>
      </div>

      {/* Main Content Workspace Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
        
        {/* Top Toolbar */}
        <TopToolbar
          projectName={projectName}
          onRename={setProjectName}
          onSave={handleSave}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Config Sidebar */}
          <LeftConfigSidebar
            setup={setup}
            onChange={handleConfigChange}
          />

          {/* Center Interactive Studio */}
          <StudiosWorkspace
            setup={setup}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Right Live HUD Sidebar */}
          <RightDiagnosticsSidebar
            stats={stats}
          />
        </div>

        {/* Bottom AI Recommendations */}
        <BottomWorkspace
          setup={setup}
        />

      </main>
    </div>
  );
}
