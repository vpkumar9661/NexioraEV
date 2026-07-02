"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Battery, BatteryCharging, Cpu, Globe, Factory, Rocket, BookOpen, 
  Search, ShieldAlert, Award, HelpCircle, Send, Play, Download, ArrowRight, 
  Clock, Settings, Flame, TrendingUp, Gauge, Compass, ChevronRight, CheckCircle2,
  X, RefreshCw, Star, Info, MessageSquare, ShieldCheck, ChevronDown, Check, AlertTriangle
} from "lucide-react";

// --- Types & Interfaces ---
interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

interface ComponentDetail {
  name: string;
  title: string;
  desc: string;
  specs: Record<string, string>;
  icon: any;
}

interface BatteryChemistry {
  id: string;
  name: string;
  description: string;
  energyDensity: number; // Wh/kg
  safety: number; // 1-10
  chargingSpeed: number; // 1-10
  lifeCycle: number; // cycles
  cost: number; // 1-10 (10 is cheapest)
  weight: number; // 1-10 (10 is lightest)
  efficiency: number; // %
  tempPerformance: string;
  maintenance: string;
  pros: string[];
  cons: string[];
}

interface MythFact {
  myth: string;
  fact: string;
  explanation: string;
}

interface GlossaryItem {
  term: string;
  definition: string;
  category: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

// --- Mock Data ---
const TIMELINE_DATA: TimelineEvent[] = [
  { year: "1830", title: "First EV Carriage", desc: "Robert Anderson invents the first crude electric carriage powered by non-rechargeable primary cells." },
  { year: "1900", title: "Early EV Dominance", desc: "Electric cars account for roughly a third of all vehicles on US roads due to quietness, cleanliness, and ease of starting." },
  { year: "1997", title: "Toyota Prius Launch", desc: "Toyota launches the Prius, the world's first mass-produced hybrid electric vehicle, sparking modern interest." },
  { year: "2008", title: "Tesla Roadster", desc: "Tesla introduces the Roadster, the first highway-capable electric vehicle to use Lithium-ion battery cells, proving performance." },
  { year: "2020", title: "Global EV Boom", desc: "Global EV sales hit record levels, with governments announcing plans to phase out internal combustion engines (ICE)." },
  { year: "2025", title: "Solid State Breakthrough", desc: "Automakers begin pilot production of solid-state battery cells promising double the range of current chemistries." },
  { year: "2030", title: "Future Mobility Integration", desc: "Expected full grid integration (V2G), high-level autonomous fleets, and majority EV new sales in leading markets." }
];

const COMPONENT_DETAILS: Record<string, ComponentDetail> = {
  battery: {
    name: "battery",
    title: "Traction Battery Pack",
    desc: "The powerhouse of the EV. It stores electrical energy in chemical form and provides direct current (DC) power to the inverter.",
    specs: { "Voltage": "400V - 800V Architecture", "Capacity": "40 - 120 kWh", "Lifespan": "8 - 15 Years", "Chemistry": "LFP / NMC / Solid State" },
    icon: Battery
  },
  motor: {
    name: "motor",
    title: "Electric Traction Motor",
    desc: "Converts electrical energy from the inverter into mechanical energy to rotate the wheels, and vice versa during regenerative braking.",
    specs: { "Type": "PMSM or Induction Motor", "Efficiency": "90% - 97%", "Max RPM": "Up to 20,000 RPM", "Cooling": "Liquid Coolant Jacket" },
    icon: Zap
  },
  inverter: {
    name: "inverter",
    title: "Power Inverter",
    desc: "The brain of the drivetrain. It converts DC power from the battery into three-phase AC power for the motor, controlling speed and torque.",
    specs: { "Tech": "Silicon Carbide (SiC) MOSFETs", "Conversion Efficiency": ">98.5%", "Switching Speed": "Up to 20 kHz", "Regen Control": "Bidirectional Flow" },
    icon: RefreshCw
  },
  controller: {
    name: "controller",
    title: "Motor Controller & VCU",
    desc: "Manages command inputs from the driver (accelerator/brakes) and regulates energy distribution across all auxiliary and primary systems.",
    specs: { "Processor": "Dual-Core Automotive Grade", "Communications": "CAN-Bus / Automotive Ethernet", "Response Time": "< 1ms", "Safety Rating": "ASIL-D Certified" },
    icon: Cpu
  },
  cooling: {
    name: "cooling",
    title: "Thermal Management System",
    desc: "Regulates the temperature of the battery pack, motor, and power electronics using coolant loops, radiators, and heat pumps.",
    specs: { "Coolant Type": "Ethylene Glycol Blend", "Optimum Temp": "15°C - 35°C (Battery)", "Valves": "Electronic 4-Way Multi-valves", "Heater": "PTC High Voltage Heater" },
    icon: Gauge
  },
  port: {
    name: "port",
    title: "Charging Port & OBC",
    desc: "The entry point for electrical energy. The On-Board Charger (OBC) converts incoming AC grid power into DC to charge the battery.",
    specs: { "AC Fast Charging": "Up to 22 kW", "DC Supercharging": "Up to 350 kW", "Standards": "CCS2 (India/Europe) / GB/T / NACS", "Smart Protocols": "ISO 15118 (Plug & Charge)" },
    icon: BatteryCharging
  },
  suspension: {
    name: "suspension",
    title: "Active Suspension & Regen Braking",
    desc: "Integrates standard mechanical suspension with regenerative brakes that capture kinetic energy to recharge the battery pack during deceleration.",
    specs: { "Regen Strength": "Adjustable (One-pedal driving)", "Energy Recovery": "Up to 30% range extension", "Braking Type": "Electro-Hydraulic Blended", "Chassis Design": "Dedicated Skateboard Platform" },
    icon: Compass
  }
};

const BATTERY_CHEMISTRIES: BatteryChemistry[] = [
  {
    id: "lfp",
    name: "LFP (Lithium Iron Phosphate)",
    description: "Highly stable and cost-effective chemistry. Excellent thermal safety and exceptionally long cycle life, making it the choice for mass-market EVs.",
    energyDensity: 160,
    safety: 9,
    chargingSpeed: 7,
    lifeCycle: 3000,
    cost: 9,
    weight: 5,
    efficiency: 92,
    tempPerformance: "Moderate (sensitive to extreme cold)",
    maintenance: "Zero maintenance, requires regular 100% calibration",
    pros: ["Outstanding thermal safety", "Up to 10 years+ lifetime", "Cobalt-free & lower cost"],
    cons: ["Lower energy density", "Heavier pack weight", "Voltage drop curve is flat (difficult SOC estimation)"]
  },
  {
    id: "nmc",
    name: "NMC (Nickel Manganese Cobalt)",
    description: "High energy density chemistry. Preferred for performance and long-range vehicles, though it requires sophisticated safety management systems.",
    energyDensity: 250,
    safety: 6,
    chargingSpeed: 8,
    lifeCycle: 1500,
    cost: 6,
    weight: 8,
    efficiency: 95,
    tempPerformance: "Excellent (performs well in diverse temperatures)",
    maintenance: "Zero maintenance, best kept between 20%-80% charge",
    pros: ["High energy density (long range)", "Lightweight structure", "Excellent cold weather response"],
    cons: ["Higher cost (Cobalt dependency)", "Lower thermal runaway threshold", "Shorter cycle life compared to LFP"]
  },
  {
    id: "solid-state",
    name: "Solid State Batteries",
    description: "The holy grail of batteries. Replaces liquid electrolyte with solid state separators, offering extreme safety, double energy density, and ultra-fast charging.",
    energyDensity: 450,
    safety: 10,
    chargingSpeed: 10,
    lifeCycle: 5000,
    cost: 3,
    weight: 9,
    efficiency: 98,
    tempPerformance: "Exceptional safety profiles in all temperature extremes",
    maintenance: "Zero maintenance, self-monitoring BMS integration",
    pros: ["Extremely high range potential", "Near-instant charging capability", "Non-flammable structure"],
    cons: ["High current manufacturing cost", "Dendrite prevention engineering is complex", "Not yet mass commercialized"]
  },
  {
    id: "sodium-ion",
    name: "Sodium-Ion",
    description: "An emerging cost-friendly chemistry using abundant sodium resources. Perfect for city cars and stationary storage, functioning beautifully in freezing conditions.",
    energyDensity: 140,
    safety: 8,
    chargingSpeed: 8,
    lifeCycle: 2000,
    cost: 10,
    weight: 4,
    efficiency: 90,
    tempPerformance: "Outstanding (maintains 90% capacity at -20°C)",
    maintenance: "Zero maintenance, zero risk of thermal runaway during discharge",
    pros: ["Lowest cost chemistry", "Highly abundant raw materials", "Superb cold weather performance"],
    cons: ["Low energy density (limited range)", "Relatively heavy", "Shorter developmental cycle history"]
  },
  {
    id: "graphene",
    name: "Graphene Super-hybrid",
    description: "Utilizes graphene structures to facilitate lightning-fast electron flow. Offers hyper-speed charging rates with almost zero heating issues.",
    energyDensity: 200,
    safety: 8,
    chargingSpeed: 10,
    lifeCycle: 4000,
    cost: 4,
    weight: 7,
    efficiency: 96,
    tempPerformance: "Excellent heat dissipation during high load",
    maintenance: "Zero maintenance, extreme wear resilience",
    pros: ["Charge 0-80% in under 5 minutes", "Negligible thermal degradation", "High power discharge capacity"],
    cons: ["Extremely complex material manufacturing", "High retail cost", "Limited active production lines"]
  }
];

const MYTHS_FACTS: MythFact[] = [
  {
    myth: "EV batteries degrade rapidly and need replacement in 3 years.",
    fact: "Modern EV batteries are designed to outlast the vehicle chassis.",
    explanation: "With active thermal liquid cooling and sophisticated BMS, real-world data shows most EV batteries retain 85-90% health even after 150,000 kilometers."
  },
  {
    myth: "Electric vehicles are highly prone to catching fire and exploding easily.",
    fact: "Fossil fuel vehicles are statistics-wise more fire-prone.",
    explanation: "Research indicates ICE cars are roughly 10 to 20 times more likely to catch fire than electric vehicles. EV batteries have sealed protective enclosures and safety vents."
  },
  {
    myth: "EV charging is too slow and will always take hours.",
    fact: "Fast chargers can replenish range in 15 to 30 minutes.",
    explanation: "While slow residential AC charging takes overnight, DC fast chargers (50kW to 350kW) charge an EV from 10% to 80% in the time it takes to have a quick coffee break."
  },
  {
    myth: "EVs aren't actually green because of coal-powered electricity grids.",
    fact: "Even on coal grids, EVs produce fewer net emissions than petrol/diesel.",
    explanation: "Power plants are highly efficient conversion centers compared to small ICE vehicle engines. As the grid integrates more solar and wind, EVs automatically become greener."
  },
  {
    myth: "Electric vehicle maintenance is extremely expensive.",
    fact: "EV maintenance is up to 50% cheaper than ICE vehicles.",
    explanation: "EVs do not have engine oil, spark plugs, timing belts, fuel filters, or catalytic converters. Fewer moving parts translate directly to lower maintenance budgets."
  }
];

const GLOSSARY_DATA: GlossaryItem[] = [
  { term: "BMS (Battery Management System)", definition: "An electronic system that manages a rechargeable battery cell, protecting it from operating outside its safe limits and balancing cell charge.", category: "Battery" },
  { term: "SOC (State of Charge)", definition: "The equivalent of a fuel gauge for an EV battery, representing the current battery level as a percentage of its total capacity.", category: "General" },
  { term: "SOH (State of Health)", definition: "A figure of merit representing the condition of a battery compared to its ideal conditions, reflecting aging and degradation levels.", category: "Battery" },
  { term: "kWh (Kilowatt-hour)", definition: "The standard unit of energy storage capacity in an EV battery. A larger kWh rating generally signifies a longer driving range.", category: "General" },
  { term: "kW (Kilowatt)", definition: "A unit of power, representing the rate of energy flow. Used to express engine output power and battery charging speeds.", category: "General" },
  { term: "Nm (Newton-meters)", definition: "The unit of torque. EVs deliver maximum torque instantly from 0 RPM, resulting in rapid linear acceleration.", category: "Motor" },
  { term: "Regenerative Braking", definition: "A mechanism that captures energy during braking/deceleration by running the motor in reverse as a generator, recharging the battery.", category: "General" },
  { term: "Inverter", definition: "A component that converts direct current (DC) power from the battery into alternating current (AC) power for the traction motor.", category: "Component" },
  { term: "VCU (Vehicle Control Unit)", definition: "The central computer that coordinates inputs, diagnostics, torque distribution, and driving dynamics in electric vehicles.", category: "Component" },
  { term: "CCS2 (Combined Charging System 2)", definition: "The predominant high-speed DC charging connector standard used in India and Europe.", category: "Charging" },
  { term: "V2G (Vehicle-to-Grid)", definition: "Bidirectional charging technology enabling electric cars to feed power back into the public electrical grid during peak demand.", category: "Future Tech" },
  { term: "Solid State Battery", definition: "A next-generation battery technology utilizing solid electrodes and solid electrolytes rather than liquid/gel chemistries.", category: "Battery" }
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which battery chemistry is renowned for its exceptional safety profile and long cycle life, making it popular in Indian EVs?",
    options: ["NMC (Nickel Manganese Cobalt)", "LFP (Lithium Iron Phosphate)", "Sodium-Ion", "Lead Acid"],
    answerIndex: 1,
    explanation: "LFP (Lithium Iron Phosphate) offers superior thermal stability, higher fire resistance, and over 3,000 charge cycles, making it the choice for mass-market vehicles."
  },
  {
    question: "What function does the Power Inverter perform in an electric drivetrain?",
    options: [
      "It balances the voltage of individual cells in the battery pack.",
      "It converts AC power from the wall into DC power for the chassis.",
      "It converts battery DC power into three-phase AC power to run the motor.",
      "It reduces the rotational speed of the motor to turn the wheels."
    ],
    answerIndex: 2,
    explanation: "The inverter is critical because it converts the battery pack's DC energy into multi-phase variable-frequency AC energy that powers the primary motor."
  },
  {
    question: "Why do EV charging speeds slow down significantly after the battery reaches 80% State of Charge (SOC)?",
    options: [
      "To protect the battery cells from heat stress and voltage over-saturation.",
      "The charging station runs out of electricity after a set period.",
      "To encourage drivers to vacate high-demand charging bays.",
      "Because the vehicle enters power-saving standby mode automatically."
    ],
    answerIndex: 0,
    explanation: "Much like filling a stadium, it is easy to find seats early on, but hard to slot the final elements. Slowing current prevents lithium plating and thermal degradation."
  },
  {
    question: "What does V2G stand for in future electric vehicle technology?",
    options: ["Vehicle-to-Generator", "Velocity-to-Gear ratio", "Vehicle-to-Grid power transfer", "Voltage-to-Ground isolation"],
    answerIndex: 2,
    explanation: "V2G (Vehicle-to-Grid) allows EVs to function as mobile battery power banks, feeding electrical power back to the grid during emergency blackouts or peak times."
  },
  {
    question: "How does Regenerative Braking extend the driving range of an electric car?",
    options: [
      "It deploys solar panels over the roof during heavy braking sequences.",
      "It runs the electric motor backwards as a generator, converting kinetic energy into electricity.",
      "It decreases wind resistance by opening specialized aerodynamic drag vents.",
      "It uses friction heat to directly boil coolant fluid to run steam turbines."
    ],
    answerIndex: 1,
    explanation: "When you lift off the accelerator, momentum spins the motor. The motor operates as a generator, providing braking resistance while pumping electricity back into the battery."
  }
];

const MOCK_NEWS = [
  {
    title: "India Announces Special Subsidies for Solid-State Battery Production",
    desc: "A new amendment to the PLI scheme introduces additional performance bonuses for manufacturers deploying solid-state chemical setups.",
    date: "July 2026",
    tag: "Government Scheme"
  },
  {
    title: "Highway Wireless Dynamic Charging Lanes Ready for Commercial Trials",
    desc: "A 10km stretch of the Delhi-Mumbai Expressway has been equipped with dynamic induction plates allowing test-EVs to charge while driving at 80 km/h.",
    date: "June 2026",
    tag: "Future Tech"
  },
  {
    title: "New Sodium-Ion Electric Three-Wheelers Launch in Urban Centers",
    desc: "Targeting ultra-affordable short-haul cargo solutions, these vehicles operate at 30% lower upfront costs and charge from 0-100% in 15 minutes.",
    date: "June 2026",
    tag: "Innovation"
  }
];

// --- AI Chatbot Preset Prompts ---
const CHATBOT_PRESETS = [
  "What is BMS?",
  "Difference between LFP and NMC?",
  "Why does battery degrade?",
  "How regenerative braking works?",
  "Best EV under ₹15 lakh?"
];

const CHATBOT_RESPONSES: Record<string, string> = {
  "what is bms?": "A **Battery Management System (BMS)** is the brain of the battery pack. It monitors cell parameters like voltage, current, and temperature, manages cell balancing during charging, protects against thermal issues, and estimates SOC (State of Charge) and SOH (State of Health). It ensures the battery operates safely and lasts as long as possible.",
  "difference between lfp and nmc?": "Here's a breakdown:\n- **LFP (Lithium Iron Phosphate)**: Highly safe, cobalt-free, cheaper, and has a very long life cycle (3000+ cycles). Retains safety at high temperatures but has lower energy density (heavier, shorter range).\n- **NMC (Nickel Manganese Cobalt)**: High energy density (lightweight, very long range), performs better in extreme cold, but is more expensive, has a shorter cycle life (1500 cycles), and requires stricter safety management.",
  "why does battery degrade?": "EV batteries degrade due to electrochemical wear. Factors include:\n1. **Thermal Stress**: High temperatures accelerate chemical breakdown.\n2. **High Voltage Retention**: Leaving a battery at 100% or 0% charge for long periods stresses the materials.\n3. **Fast Charging**: High charging currents cause micro-fractures in anode structures over time.\n4. **Calendar Aging**: Natural loss of active materials over time.",
  "how regenerative braking works?": "During braking or deceleration, the accelerator is released, reversing the flow of energy. The electric motor switches mode to act as a **generator**. This resistance slows down the vehicle while capturing kinetic energy, converting it to AC, passing it through the inverter, and refilling the battery as DC, recouping up to 15-30% of lost range.",
  "best ev under 15 lakh?": "In the Indian market, popular EVs under ₹15 Lakh include:\n1. **Tata Tiago.ev**: Extremely popular hatch starting under ₹9 Lakh, good city vehicle.\n2. **Tata Punch.ev**: Built on an EV-exclusive skateboard platform, featuring premium displays and up to 421 km range.\n3. **MG Comet EV**: Ultra-compact city commuter with premium tech features, perfect for parking in tight spaces.\n4. **Tata Tigor.ev / Citroen eC3**: Excellent options for spacious cabin layouts and sensible commuting ranges.",
  "best ev under ₹15 lakh?": "In the Indian market, popular EVs under ₹15 Lakh include:\n1. **Tata Tiago.ev**: Extremely popular hatch starting under ₹9 Lakh, good city vehicle.\n2. **Tata Punch.ev**: Built on an EV-exclusive skateboard platform, featuring premium displays and up to 421 km range.\n3. **MG Comet EV**: Ultra-compact city commuter with premium tech features, perfect for parking in tight spaces.\n4. **Tata Tigor.ev / Citroen eC3**: Excellent options for spacious cabin layouts and sensible commuting ranges."
};

const DEFAULT_CHATBOT_REPLY = "I'm your specialized Nexiora EV Tech Assistant. Ask me anything about EV batteries, charging standards, motors, or calculators!";

function MythFactCard({ item }: { item: MythFact }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div 
      onClick={() => setFlipped(!flipped)}
      className={`flip-card h-[200px] w-full ${flipped ? "flipped" : ""}`}
    >
      <div className="flip-card-inner">
        {/* Front - Myth */}
        <div className="flip-card-front glass-panel p-5 flex flex-col justify-between border-red-500/20 bg-neutral-900/80">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-3">
              <ShieldAlert className="size-3" /> Common Myth
            </span>
            <h4 className="text-sm font-bold text-white leading-snug mt-1">&ldquo;{item.myth}&rdquo;</h4>
          </div>
          <span className="text-[10px] text-slate-500 flex items-center gap-1 justify-end font-semibold">
            Click to verify <ArrowRight className="size-3" />
          </span>
        </div>
        
        {/* Back - Fact */}
        <div className="flip-card-back glass-panel p-5 flex flex-col justify-between border-[#10B981]/30 bg-[#0c1b15]/90">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="size-3" /> Proven Fact
            </span>
            <h4 className="text-sm font-bold text-white leading-snug mt-1">{item.fact}</h4>
            <p className="text-[11px] text-slate-400 leading-normal mt-2">{item.explanation}</p>
          </div>
          <span className="text-[10px] text-slate-500 text-right block font-semibold">
            Click to flip back
          </span>
        </div>
      </div>
    </div>
  );
}

export default function EVTechHub() {
  const [activeTab, setActiveTab] = useState<string>("basics");
  const [activeChemistry, setActiveChemistry] = useState<string>("lfp");
  const [hoveredComponent, setHoveredComponent] = useState<string>("battery");
  const [selectedCompDetail, setSelectedCompDetail] = useState<ComponentDetail>(COMPONENT_DETAILS.battery as ComponentDetail);

  // Search & Glossary States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState("All");

  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = (QUIZ_QUESTIONS[currentQuestionIndex] || QUIZ_QUESTIONS[0]) as QuizQuestion;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  // Range Calculator States
  const [batteryCapacity, setBatteryCapacity] = useState(60); // kWh
  const [avgSpeed, setAvgSpeed] = useState(60); // km/h
  const [passengers, setPassengers] = useState(2);
  const [acUsage, setAcUsage] = useState(true);
  const [terrain, setTerrain] = useState<"flat" | "hilly" | "steep">("flat");
  const [batteryHealth, setBatteryHealth] = useState(100); // %

  // Charging Calculator States
  const [calcBatterySize, setCalcBatterySize] = useState(50); // kWh
  const [electricityPrice, setElectricityPrice] = useState(8); // Rs per kWh
  const [chargerPower, setChargerPower] = useState(7.4); // kW
  const [efficiency, setEfficiency] = useState(90); // %
  const [dailyKm, setDailyKm] = useState(50); // km

  // AI Chatbot States
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! I am your AI EV Technology Guide. Ask me anything about electric car architectures, charging levels, or battery diagnostics." }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Community Forum States
  const [forumQuestions, setForumQuestions] = useState([
    { id: 1, user: "Rohan Sharma", avatar: "RS", category: "Battery", question: "Can I charge my LFP battery to 100% every single day without accelerating degradation?", votes: 14, answers: 3, date: "2 hours ago" },
    { id: 2, user: "Priya Patel", avatar: "PP", category: "Charging", question: "Does installing a 15A normal wall socket require any special permission from local DISCOMs in Maharashtra?", votes: 9, answers: 2, date: "5 hours ago" },
    { id: 3, user: "Anand Sen", avatar: "AS", category: "Diagnostics", question: "What does code P0A78 (Inverter Performance Fault) usually indicate on an electric utility van?", votes: 21, answers: 5, date: "1 day ago" }
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("Battery");

  // Track component hover changes
  useEffect(() => {
    const detail = COMPONENT_DETAILS[hoveredComponent];
    if (detail) {
      setSelectedCompDetail(detail);
    }
  }, [hoveredComponent]);

  // Tab configurations
  const TABS = [
    { id: "basics", name: "EV Basics", icon: BookOpen },
    { id: "battery", name: "Battery Lab", icon: Battery },
    { id: "charging", name: "Charging Hub", icon: BatteryCharging },
    { id: "components", name: "EV Components", icon: Settings },
    { id: "future", name: "Future Tech", icon: Rocket },
    { id: "learning", name: "Learning Center", icon: Award },
    { id: "calculators", name: "Calculators & Tools", icon: Gauge },
    { id: "assistant", name: "AI EV Assistant", icon: Cpu }
  ];

  // --- Filtering & Logic computations ---
  const filteredGlossary = useMemo(() => {
    return GLOSSARY_DATA.filter((item) => {
      const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedGlossaryCategory === "All" || item.category === selectedGlossaryCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedGlossaryCategory]);

  const activeChemistryDetails = useMemo(() => {
    const found = BATTERY_CHEMISTRIES.find(chem => chem.id === activeChemistry);
    return (found || BATTERY_CHEMISTRIES[0]) as BatteryChemistry;
  }, [activeChemistry]);

  // Range calculator formula:
  const calculatedRange = useMemo(() => {
    // Baseline consumption: 140 Wh/km (7.14 km/kWh)
    let consumption = 140; 
    
    // Speed impact (optimal speed is 50-70 km/h)
    if (avgSpeed < 50) {
      consumption += (50 - avgSpeed) * 0.8;
    } else if (avgSpeed > 70) {
      consumption += (avgSpeed - 70) * 1.5;
    }

    // AC usage impact (+15 Wh/km)
    if (acUsage) consumption += 15;

    // Passenger weight load (+5 Wh/km per passenger beyond driver)
    consumption += Math.max(0, passengers - 1) * 5;

    // Terrain factor
    if (terrain === "hilly") consumption *= 1.25;
    if (terrain === "steep") consumption *= 1.45;

    // Battery health adjustment
    const netCapacity = batteryCapacity * (batteryHealth / 100);

    // Range in km = Wh storage / (Wh/km consumption)
    const range = (netCapacity * 1000) / consumption;
    return {
      range: Math.round(range),
      consumption: Math.round(consumption),
      efficiency: (1000 / consumption).toFixed(2) // km per kWh
    };
  }, [batteryCapacity, avgSpeed, passengers, acUsage, terrain, batteryHealth]);

  // Charging calculator computation:
  const chargingOutputs = useMemo(() => {
    // Charging efficiency factor
    const realPower = chargerPower * (efficiency / 100);
    
    // Time from 10% to 80% (70% of battery capacity)
    const capacityToFill = calcBatterySize * 0.7;
    const timeTo80 = capacityToFill / realPower;
    
    // Total cost to full charge (0 to 100% capacity at input efficiency)
    const grossKwhNeeded = calcBatterySize / (efficiency / 100);
    const fullChargeCost = grossKwhNeeded * electricityPrice;

    // Costs based on daily driving km
    const avgEnergyPerKm = 0.15; // 150 Wh/km
    const dailyKwh = dailyKm * avgEnergyPerKm;
    const dailyCost = (dailyKwh / (efficiency / 100)) * electricityPrice;
    
    const monthlyCost = dailyCost * 30.4;
    const annualCost = dailyCost * 365;

    // Petrol equivalent cost comparison:
    // Avg petrol cost: Rs 100/L, Fuel efficiency: 15 km/L. So Rs 6.67 per km.
    const petrolCostPerKm = 6.67;
    const dailyPetrolCost = dailyKm * petrolCostPerKm;
    const monthlyPetrolCost = dailyPetrolCost * 30.4;
    const annualPetrolCost = dailyPetrolCost * 365;

    const annualSavings = annualPetrolCost - annualCost;

    return {
      timeTo80: timeTo80.toFixed(1),
      fullChargeCost: Math.round(fullChargeCost),
      monthlyCost: Math.round(monthlyCost),
      annualCost: Math.round(annualCost),
      annualSavings: Math.round(annualSavings)
    };
  }, [calcBatterySize, electricityPrice, chargerPower, efficiency, dailyKm]);

  // --- Handlers ---
  const handleChatSubmit = (textToSend?: string) => {
    const input = textToSend || chatInput;
    if (!input.trim()) return;

    const userMsg = { sender: "user" as const, text: input };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");

    const normalizedQuery = input.toLowerCase().replace(/[?.,]/g, "").trim();
    let replyText = CHATBOT_RESPONSES[normalizedQuery];

    if (!replyText) {
      // Try finding partial match
      const foundKey = Object.keys(CHATBOT_RESPONSES).find(key => normalizedQuery.includes(key) || key.includes(normalizedQuery));
      if (foundKey) {
        replyText = CHATBOT_RESPONSES[foundKey];
      } else {
        replyText = `That's an interesting technical query about "${input}". While I mock-simulate responses here, you can consult the Battery Lab or Charging Hub tabs for detailed data grids and curves on standard components.`;
      }
    }

    const finalReply: string = replyText || "";
    setChatMessages(prev => [...prev, { sender: "bot", text: finalReply }]);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.answerIndex;
    
    // Add to answered list
    const updatedAnswers = [...answeredQuestions];
    updatedAnswers[currentQuestionIndex] = isCorrect;
    setAnsweredQuestions(updatedAnswers);

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizStarted(false);
    setAnsweredQuestions([]);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const item = {
      id: Date.now(),
      user: "You",
      avatar: "U",
      category: newQuestionCategory,
      question: newQuestion,
      votes: 1,
      answers: 0,
      date: "Just now"
    };

    setForumQuestions(prev => [item, ...prev]);
    setNewQuestion("");
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 font-sans antialiased selection:bg-[#FF9F1A]/30 selection:text-[#FF9F1A]">
      {/* Global CSS Styles injected locally for liquid animations and flip effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), rgba(5, 8, 16, 0.65);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
        }
        .glass-panel-hover {
          transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .glass-panel-hover:hover {
          transform: translateY(-4px) scale(1.01);
          border-color: rgba(255, 159, 26, 0.3);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 159, 26, 0.05);
        }
        .glow-orange {
          box-shadow: 0 0 30px rgba(255, 159, 26, 0.15);
        }
        .glow-primary {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
        }
        .gradient-text-orange {
          background: linear-gradient(135deg, #FF9F1A 0%, #FF6A00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-text-teal {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        /* Card Flip Style */
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 16px;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        /* Custom scrollbar for timeline and dropdowns */
        .custom-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,159,26,0.3);
        }
        /* Particle Background styles */
        .particles-bg {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          pointer-events: none;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(255, 159, 26, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 40%);
        }
      `}} />

      {/* --- HERO LANDING SECTION --- */}
      <section className="relative overflow-hidden pt-28 pb-12 border-b border-white/5">
        <div className="particles-bg" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,159,26,0.06),transparent_60%)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#FF9F1A]/20 bg-[#FF9F1A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#FF9F1A]">
              <Zap className="size-3.5 fill-[#FF9F1A]" />
              Nexiora Tech Hub
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Explore <span className="gradient-text-orange">EV Technology</span>
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl font-normal">
              Learn everything about Electric Vehicles, Batteries, Charging Infrastructure, and Future Mobility through interactive tools, diagnostics, and calculators.
            </p>
          </motion.div>

          {/* Key Statistics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Battery Efficiency", val: "95%+", desc: "System conversion", color: "text-[#10B981]" },
              { label: "India Charging Stations", val: "12,500+", desc: "And expanding", color: "text-[#FF9F1A]" },
              { label: "EV Adoption Rate", val: "+140%", desc: "Year over Year", color: "text-[#FF9F1A]" },
              { label: "Carbon Saved", val: "2.4M Tons", desc: "Estimated total", color: "text-[#10B981]" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-4 rounded-2xl flex flex-col justify-center text-center glow-orange/5"
              >
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <span className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{stat.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DASHBOARD TAB NAVIGATION --- */}
      <section className="sticky top-[72px] z-30 bg-[#080b11]/80 backdrop-blur-xl border-b border-white/5 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1.5 custom-scroll md:justify-center">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? "bg-[#FF9F1A]/15 border-[#FF9F1A] text-white shadow-[0_4px_20px_rgba(255,159,26,0.25)]" 
                      : "bg-white/2 border-white/5 hover:border-white/15 text-slate-400 hover:text-white"
                  }`}
                >
                  <TabIcon className={`size-4 ${isActive ? "text-[#FF9F1A]" : "text-slate-400"}`} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CORE TAB CONTENT CONTAINER --- */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            
            {/* ========================================================================= */}
            {/* TAB 1: EV BASICS */}
            {/* ========================================================================= */}
            {activeTab === "basics" && (
              <div className="space-y-12">
                
                {/* Intro Hero */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How Electric Vehicles Work</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      Unlike ICE vehicles powered by controlled fuel explosions, EVs utilize a closed loop electrical drivetrain. Current stored in chemical cells passes through speed-regulated silicon switches, transforming directly into circular electromagnetic torque.
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 bg-white/3 border border-white/5 rounded-xl p-3 flex-1">
                        <CheckCircle2 className="size-5 text-[#10B981] shrink-0" />
                        <span className="text-xs text-slate-300">90%+ Conversion Efficiency</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/3 border border-white/5 rounded-xl p-3 flex-1">
                        <CheckCircle2 className="size-5 text-[#10B981] shrink-0" />
                        <span className="text-xs text-slate-300">Instant Max Torque</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Feature Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { t: "Skateboard Chassis", d: "Batteries placed low for safety and exceptional handling dynamics.", i: Compass },
                      { t: "Simplicity in Motion", d: "Only ~20 moving parts compared to 2,000+ in gas engines.", i: Settings }
                    ].map((item, index) => (
                      <div key={index} className="glass-panel p-5 rounded-2xl space-y-2">
                        <div className="size-9 rounded-xl bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A]">
                          <item.i className="size-5" />
                        </div>
                        <h3 className="text-sm font-semibold text-white">{item.t}</h3>
                        <p className="text-xs text-slate-400 leading-normal">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SVG INTERACTIVE EV ARCHITECTURE */}
                <div className="glass-panel rounded-3xl p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">Interactive Skateboard Architecture</h3>
                    <p className="text-xs text-slate-400 mt-1">Hover over the vehicle regions below to inspect subsystem mechanics and real-time electronic specs.</p>
                  </div>
                  
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* SVG Diagram Column */}
                    <div className="lg:col-span-7 flex justify-center">
                      <div className="w-full max-w-[650px] aspect-video relative bg-neutral-950/40 rounded-2xl border border-white/5 p-4 flex items-center justify-center">
                        <svg viewBox="0 0 800 450" className="w-full h-full text-slate-600">
                          {/* Skateboard Chassis Guide Lines */}
                          <line x1="100" y1="280" x2="700" y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="6" strokeDasharray="10 5" />
                          
                          {/* Wheels */}
                          {/* Front Left */}
                          <circle cx="200" cy="300" r="48" className={`fill-neutral-900 stroke-3 transition-all duration-300 ${hoveredComponent === "suspension" ? "stroke-[#FF9F1A] scale-[1.02]" : "stroke-white/10"}`} style={{ transformOrigin: "200px 300px" }} />
                          <circle cx="200" cy="300" r="32" className="fill-neutral-800 stroke-white/5" />
                          
                          {/* Front Right */}
                          <circle cx="600" cy="300" r="48" className={`fill-neutral-900 stroke-3 transition-all duration-300 ${hoveredComponent === "suspension" ? "stroke-[#FF9F1A] scale-[1.02]" : "stroke-white/10"}`} style={{ transformOrigin: "600px 300px" }} />
                          <circle cx="600" cy="300" r="32" className="fill-neutral-800 stroke-white/5" />
                          
                          {/* Skateboard Base Frame */}
                          <rect x="230" y="260" width="340" height="40" rx="8" className="fill-neutral-800 stroke-white/10" />

                          {/* Battery Pack (Center Box) */}
                          <g 
                            className="cursor-pointer group"
                            onMouseEnter={() => setHoveredComponent("battery")}
                          >
                            <rect 
                              x="250" 
                              y="245" 
                              width="300" 
                              height="28" 
                              rx="4" 
                              className={`transition-all duration-300 ${hoveredComponent === "battery" ? "fill-[#10B981]/20 stroke-[#10B981] stroke-[2.5]" : "fill-neutral-700/60 stroke-white/15"}`}
                            />
                            <text x="400" y="263" textAnchor="middle" className="fill-white text-[10px] font-bold tracking-wider">BATTERY PACK</text>
                            {/* Inside cell grid look */}
                            <line x1="280" y1="245" x2="280" y2="273" stroke="rgba(255,255,255,0.15)" />
                            <line x1="330" y1="245" x2="330" y2="273" stroke="rgba(255,255,255,0.15)" />
                            <line x1="380" y1="245" x2="380" y2="273" stroke="rgba(255,255,255,0.15)" />
                            <line x1="430" y1="245" x2="430" y2="273" stroke="rgba(255,255,255,0.15)" />
                            <line x1="480" y1="245" x2="480" y2="273" stroke="rgba(255,255,255,0.15)" />
                            <line x1="520" y1="245" x2="520" y2="273" stroke="rgba(255,255,255,0.15)" />
                          </g>

                          {/* Motor Assembly (Rear/Right side) */}
                          <g 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredComponent("motor")}
                          >
                            <circle 
                              cx="570" 
                              cy="280" 
                              r="26" 
                              className={`transition-all duration-300 ${hoveredComponent === "motor" ? "fill-[#FF9F1A]/20 stroke-[#FF9F1A] stroke-[2.5]" : "fill-neutral-700/80 stroke-white/15"}`} 
                            />
                            <rect x="555" y="270" width="30" height="20" rx="2" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                            <text x="570" y="284" textAnchor="middle" className="fill-white text-[9px] font-bold">MOTOR</text>
                          </g>

                          {/* Inverter (Mounted on top of motor) */}
                          <g 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredComponent("inverter")}
                          >
                            <rect 
                              x="545" 
                              y="215" 
                              width="50" 
                              height="25" 
                              rx="4" 
                              className={`transition-all duration-300 ${hoveredComponent === "inverter" ? "fill-[#FF9F1A]/20 stroke-[#FF9F1A] stroke-[2.5]" : "fill-neutral-700/80 stroke-white/15"}`} 
                            />
                            <text x="570" y="231" textAnchor="middle" className="fill-white text-[8px] font-bold">INVERTER</text>
                            {/* Connection Lines (DC Cable) */}
                            <path d="M 530 260 L 570 260 L 570 240" fill="none" stroke="#FF9F1A" strokeWidth="2.5" strokeDasharray="4 2" />
                          </g>

                          {/* Controller (VCU) Block (Front side) */}
                          <g 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredComponent("controller")}
                          >
                            <rect 
                              x="220" 
                              y="215" 
                              width="45" 
                              height="22" 
                              rx="3" 
                              className={`transition-all duration-300 ${hoveredComponent === "controller" ? "fill-[#FF9F1A]/20 stroke-[#FF9F1A] stroke-[2.5]" : "fill-neutral-700/80 stroke-white/15"}`} 
                            />
                            <text x="242" y="228" textAnchor="middle" className="fill-white text-[8px] font-bold">VCU</text>
                          </g>

                          {/* Front Radiator / Cooling lines */}
                          <g 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredComponent("cooling")}
                          >
                            <rect 
                              x="170" 
                              y="210" 
                              width="15" 
                              height="40" 
                              rx="2" 
                              className={`transition-all duration-300 ${hoveredComponent === "cooling" ? "fill-blue-500/20 stroke-blue-500 stroke-[2.5]" : "fill-neutral-700/80 stroke-white/15"}`} 
                            />
                            {/* Cooling Line Pipes */}
                            <path d="M 185 230 L 250 230 M 250 230 L 250 245" fill="none" stroke="rgb(59,130,246)" strokeWidth="1.5" strokeDasharray="3 3" />
                            <text x="178" y="233" textAnchor="middle" className="fill-white text-[7px] font-bold" transform="rotate(-90 178 233)">COOLER</text>
                          </g>

                          {/* Charge Port (Left Rear) */}
                          <g 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredComponent("port")}
                          >
                            <rect 
                              x="290" 
                              y="210" 
                              width="25" 
                              height="20" 
                              rx="3" 
                              className={`transition-all duration-300 ${hoveredComponent === "port" ? "fill-[#FF9F1A]/20 stroke-[#FF9F1A] stroke-[2.5]" : "fill-neutral-700/80 stroke-white/15"}`} 
                            />
                            <path d="M 302 214 L 302 226 M 298 220 L 306 220" fill="none" stroke="#FF9F1A" strokeWidth="1.5" />
                            <text x="302" y="240" textAnchor="middle" className="fill-slate-400 text-[7px] font-bold">CHARGE</text>
                            {/* Charging Cable link */}
                            <path d="M 302 230 L 302 245" fill="none" stroke="#FF9F1A" strokeWidth="1.5" />
                          </g>

                          {/* Suspension (Axle connections) */}
                          <g 
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredComponent("suspension")}
                          >
                            {/* Front spring */}
                            <path d="M 200 280 Q 205 270 200 260 T 200 250" fill="none" className={`transition-all ${hoveredComponent === "suspension" ? "stroke-[#FF9F1A] stroke-2" : "stroke-white/30"}`} />
                            {/* Rear spring */}
                            <path d="M 600 280 Q 605 270 600 260 T 600 250" fill="none" className={`transition-all ${hoveredComponent === "suspension" ? "stroke-[#FF9F1A] stroke-2" : "stroke-white/30"}`} />
                          </g>

                        </svg>

                        {/* Interactive tips layer */}
                        <div className="absolute top-3 left-3 bg-[#080B10]/80 px-2.5 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5 pointer-events-none">
                          <Info className="size-3.5 text-[#FF9F1A]" />
                          <span className="text-[10px] text-slate-300">Hover hotspots to inspect parts</span>
                        </div>
                      </div>
                    </div>

                    {/* Information Panel Column */}
                    <div className="lg:col-span-5">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedCompDetail.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="glass-panel p-6 rounded-2xl relative overflow-hidden"
                        >
                          {/* Glow overlay */}
                          <div className="absolute -top-12 -right-12 size-24 rounded-full bg-[#FF9F1A]/10 blur-xl" />
                          
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A]">
                              <selectedCompDetail.icon className="size-5" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#FF9F1A] uppercase tracking-widest">Subsystem Diagnostic</span>
                              <h4 className="text-lg font-bold text-white mt-0.5">{selectedCompDetail.title}</h4>
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                            {selectedCompDetail.desc}
                          </p>

                          <div className="h-px bg-white/5 my-4" />

                          <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Technical Specifications</h5>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(selectedCompDetail.specs).map(([key, val]) => (
                              <div key={key} className="bg-white/2 border border-white/4 p-2 rounded-lg">
                                <span className="block text-[9px] text-slate-500 font-medium uppercase">{key}</span>
                                <span className="block text-xs font-semibold text-slate-200 mt-0.5">{val}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* EV TECH TIMELINE */}
                <div className="space-y-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white">EV Technology Timeline</h3>
                    <p className="text-xs text-slate-400 mt-1">From crude carriage cells to solid-state grid hubs: a brief history of electric mobility.</p>
                  </div>
                  
                  <div className="relative">
                    {/* Horizontal scrollbar helper */}
                    <div className="flex gap-6 overflow-x-auto pb-4 pt-2 custom-scroll">
                      {TIMELINE_DATA.map((event, idx) => (
                        <div key={idx} className="min-w-[260px] md:min-w-[290px] flex-1">
                          <div className="glass-panel p-5 rounded-2xl space-y-3 relative h-full flex flex-col justify-between hover:border-white/20 transition-colors duration-300">
                            <div>
                              <span className="text-xl font-black text-[#FF9F1A]">{event.year}</span>
                              <h4 className="text-sm font-bold text-slate-200 mt-1">{event.title}</h4>
                              <p className="text-xs text-slate-400 leading-normal mt-2">{event.desc}</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-[#FF9F1A] font-semibold mt-4">
                              <span>Milestone {idx + 1}</span>
                              <ChevronRight className="size-3" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MYTHS VS FACTS */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white">EV Myths vs Facts</h3>
                    <p className="text-xs text-slate-400 mt-1">Click a card to reveal the engineering truth behind common EV misconceptions.</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MYTHS_FACTS.map((item, idx) => (
                      <MythFactCard key={idx} item={item} />
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: BATTERY LAB */}
            {/* ========================================================================= */}
            {activeTab === "battery" && (
              <div className="space-y-10">
                
                {/* Intro Title */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Advanced Battery Lab</h2>
                  <p className="text-slate-400 mt-2 text-sm">
                    Analyze electrochemistry formats, thermal management matrices, and balance calculations. Compare critical battery chemistries across energy density, cycle lifetime, thermal thresholds, and manufacturing costs.
                  </p>
                </div>

                {/* Grid of Chemistries selection & Details card */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left selection side */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Select Chemical Chemistry</span>
                    <div className="space-y-2">
                      {BATTERY_CHEMISTRIES.map((chem) => (
                        <button
                          key={chem.id}
                          onClick={() => setActiveChemistry(chem.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                            activeChemistry === chem.id 
                              ? "bg-[#FF9F1A]/10 border-[#FF9F1A] text-white" 
                              : "bg-white/1 border-white/5 hover:border-white/15 text-slate-300 hover:bg-white/2"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-bold">{chem.name}</h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Density: {chem.energyDensity} Wh/kg</span>
                          </div>
                          <ChevronRight className={`size-4 ${activeChemistry === chem.id ? "text-[#FF9F1A]" : "text-slate-600"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right side Detail panel */}
                  <div className="lg:col-span-7">
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden space-y-6">
                      
                      {/* Glow overlay */}
                      <div className="absolute -top-12 -right-12 size-36 rounded-full bg-[#FF9F1A]/5 blur-2xl pointer-events-none" />

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-xl font-bold text-white">{activeChemistryDetails.name}</h3>
                        <div className="flex gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-white/4 border border-white/5 text-[10px] text-slate-300">
                            🔋 {activeChemistryDetails.energyDensity} Wh/kg
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-white/4 border border-white/5 text-[10px] text-slate-300">
                            🔄 {activeChemistryDetails.lifeCycle} Cycles
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {activeChemistryDetails.description}
                      </p>

                      {/* Performance Parameters Bars */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Performance Metrics</h4>
                        
                        {/* Energy Density Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">Energy Density (Range potential)</span>
                            <span className="font-semibold text-slate-200">{activeChemistryDetails.energyDensity} Wh/kg</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#FF9F1A] rounded-full" style={{ width: `${Math.min(100, (activeChemistryDetails.energyDensity / 550) * 100)}%` }} />
                          </div>
                        </div>

                        {/* Safety Parameter */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">Thermal Safety / Runaway Threshold</span>
                            <span className="font-semibold text-slate-200">{activeChemistryDetails.safety} / 10</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeChemistryDetails.safety * 10}%` }} />
                          </div>
                        </div>

                        {/* Charging Speed */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">Max Charging Rate Support (C-Rate)</span>
                            <span className="font-semibold text-slate-200">{activeChemistryDetails.chargingSpeed} / 10</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#FF9F1A] rounded-full" style={{ width: `${activeChemistryDetails.chargingSpeed * 10}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic details */}
                      <div className="grid sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-white/1 border border-white/5 p-3.5 rounded-xl">
                          <span className="text-[10px] text-slate-500 block uppercase font-medium">Temperature Tolerance</span>
                          <p className="text-xs text-slate-300 font-semibold mt-1">{activeChemistryDetails.tempPerformance}</p>
                        </div>
                        <div className="bg-white/1 border border-white/5 p-3.5 rounded-xl">
                          <span className="text-[10px] text-slate-500 block uppercase font-medium">Standard Maintenance Matrix</span>
                          <p className="text-xs text-slate-300 font-semibold mt-1">{activeChemistryDetails.maintenance}</p>
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] text-[#10B981] uppercase font-bold tracking-wider">Pros</span>
                          <ul className="space-y-1.5">
                            {activeChemistryDetails.pros.map((pro, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <Check className="size-3.5 text-[#10B981] shrink-0 mt-0.5" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] text-red-400 uppercase font-bold tracking-wider">Cons</span>
                          <ul className="space-y-1.5">
                            {activeChemistryDetails.cons.map((con, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <AlertTriangle className="size-3.5 text-red-400 shrink-0 mt-0.5" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Additional battery topic pages detail guides */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Battery Operations Systems</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { t: "BMS Calibration", d: "Balances cell modules regularly to offset micro-volt variances. Critical to run periodic 100% slow AC sessions.", i: ShieldCheck },
                      { t: "Thermal Runaway Protection", d: "Combines safety pressure valves with flame retardant aerogels to guarantee cellular isolation during accidents.", i: Flame },
                      { t: "Battery Degradation Drivers", d: "Highly impacted by cell temperatures, continuous rapid supercharging bursts, and long duration full-charge storage states.", i: TrendingUp }
                    ].map((item, idx) => (
                      <div key={idx} className="glass-panel p-5 rounded-2xl space-y-3">
                        <div className="size-8 rounded-lg bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A]">
                          <item.i className="size-4.5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-200">{item.t}</h4>
                        <p className="text-xs text-slate-400 leading-normal">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: CHARGING HUB */}
            {/* ========================================================================= */}
            {activeTab === "charging" && (
              <div className="space-y-10">
                
                {/* Hub Intro */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Charging Technology Hub</h2>
                  <p className="text-slate-400 mt-2 text-sm">
                    Demystifying EV charging architectures. From slow home AC wallboxes to ultra-high capacity DC fast liquid-cooled charging loops.
                  </p>
                </div>

                {/* AC vs DC Charging Breakdown */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* AC Charging */}
                  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <RefreshCw className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">AC Charging (Alternating Current)</h3>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Residential & Workplace</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      AC electricity flows from the grid to the vehicle port. The car&apos;s onboard charger (OBC) converts it to DC energy to store in the battery cells.
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs text-slate-300 border-b border-white/5 pb-1.5">
                        <span>Standard Speeds:</span>
                        <span className="font-semibold text-white">3.3 kW - 22 kW</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300 border-b border-white/5 pb-1.5">
                        <span>Level Categories:</span>
                        <span className="font-semibold text-white">Level 1 & Level 2</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Ideal Scenario:</span>
                        <span className="font-semibold text-white">Overnight / Workday Charging</span>
                      </div>
                    </div>
                  </div>

                  {/* DC Charging */}
                  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A]">
                        <Zap className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">DC Fast Charging (Direct Current)</h3>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Public Highways & Fleets</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Converts AC to DC grid power directly inside the charging station cabin before charging. Feeds electricity straight to the battery pack, bypassing the OBC.
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs text-slate-300 border-b border-white/5 pb-1.5">
                        <span>Standard Speeds:</span>
                        <span className="font-semibold text-white">30 kW - 350 kW</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300 border-b border-white/5 pb-1.5">
                        <span>Level Categories:</span>
                        <span className="font-semibold text-white">Level 3 (Superchargers)</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Ideal Scenario:</span>
                        <span className="font-semibold text-white">Highway pit stops / Quick fill</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Charge Curve Visualizer */}
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-slate-200">The DC Fast Charging Curve</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Why charging speeds drop significantly after 80% State of Charge (SOC).</p>
                  </div>
                  
                  {/* Graph mockup */}
                  <div className="bg-neutral-950/60 rounded-xl border border-white/5 p-4 space-y-4">
                    <div className="h-[180px] w-full flex items-end gap-1.5 relative pt-4">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        <div className="w-full border-t border-white/3" />
                        <div className="w-full border-t border-white/3" />
                        <div className="w-full border-t border-white/3" />
                        <div className="w-full border-t border-white/3" />
                      </div>

                      {/* Bars simulating charge rate across SOC */}
                      {[
                        { soc: "10%", rate: 90, label: "Max Power" },
                        { soc: "20%", rate: 95, label: "Optimal" },
                        { soc: "30%", rate: 95, label: "Optimal" },
                        { soc: "40%", rate: 90, label: "Optimal" },
                        { soc: "50%", rate: 80, label: "Warm" },
                        { soc: "60%", rate: 70, label: "Tapering" },
                        { soc: "70%", rate: 55, label: "Tapering" },
                        { soc: "80%", rate: 35, label: "Slow down" },
                        { soc: "90%", rate: 15, label: "Drip charge" },
                        { soc: "100%", rate: 5, label: "Drip charge" }
                      ].map((col, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end group h-full">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 border border-white/10 px-2 py-0.5 rounded text-[8px] text-[#FF9F1A] absolute mb-28 pointer-events-none">
                            {col.rate} kW ({col.label})
                          </span>
                          <div 
                            className={`w-full rounded-t transition-all duration-500 ${
                              idx < 4 ? "bg-[#FF9F1A]" : idx < 7 ? "bg-[#FF9F1A]/70" : "bg-[#FF9F1A]/35"
                            }`} 
                            style={{ height: `${col.rate}%` }} 
                          />
                          <span className="text-[10px] text-slate-500 font-semibold mt-2">{col.soc}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 bg-[#FF9F1A]/5 border border-[#FF9F1A]/10 p-3 rounded-lg">
                      <Info className="size-4 text-[#FF9F1A] shrink-0" />
                      <p className="text-[10px] text-slate-300 leading-normal">
                        **Tip**: For fast road trips, it is highly recommended to charge up to 80% and drive. The remaining 20% can take as long as the first 80% combined!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional infrastructure items */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="glass-panel p-5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-[#FF9F1A] uppercase tracking-wider">Charging Standards</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      CCS2 is India&apos;s default high-capacity DC choice. Tata, MG, and BYD deploy this. Light vehicles deploy GB/T.
                    </p>
                  </div>
                  <div className="glass-panel p-5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-[#FF9F1A] uppercase tracking-wider">Wireless Roads</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Uses induction coils underneath roads transferring electricity to receptor coils mounted under moving vehicle bodies.
                    </p>
                  </div>
                  <div className="glass-panel p-5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-[#FF9F1A] uppercase tracking-wider">Battery Swapping</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Quick manual/robotic battery exchanges at station decks. Solves cargo fleet and three-wheeler turnover delays.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: EV COMPONENTS */}
            {/* ========================================================================= */}
            {activeTab === "components" && (
              <div className="space-y-10">
                
                {/* Page title */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Subsystem Components</h2>
                  <p className="text-slate-400 mt-2 text-sm">
                    EV mechanical architectures are simple yet highly integrated. Expand items below to inspect motor configurations, single-speed transmissions, and brake recoup switches.
                  </p>
                </div>

                {/* Components details items */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(COMPONENT_DETAILS).map(([key, item]) => {
                    const CompIcon = item.icon;
                    return (
                      <div key={key} className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#FF9F1A]/30 transition-all duration-300">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-[#FF9F1A]">
                              <CompIcon className="size-4.5" />
                            </div>
                            <h3 className="text-sm font-bold text-white">{item.title}</h3>
                          </div>
                          
                          <p className="text-xs text-slate-400 leading-normal">
                            {item.desc}
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-4 mt-5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Key Diagnostic Stats</span>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(item.specs).slice(0, 2).map(([k, v]) => (
                              <div key={k} className="bg-white/1 p-1.5 rounded-lg border border-white/3">
                                <span className="block text-[8px] text-slate-500 uppercase">{k}</span>
                                <span className="block text-[10px] font-bold text-slate-300 truncate mt-0.5">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 5: FUTURE TECH */}
            {/* ========================================================================= */}
            {activeTab === "future" && (
              <div className="space-y-10">
                
                {/* Intro */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Future Smart Mobility Innovations</h2>
                  <p className="text-slate-400 mt-2 text-sm">
                    Beyond replacement engines, EVs rewrite grid infrastructures. Discover technologies currently mapping smart city networks in India.
                  </p>
                </div>

                {/* Innovation showcase cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { t: "Vehicle-to-Grid (V2G) Bidirectional flow", d: "Allows vehicles to act as decentralized power banks. Sell electricity from your car battery back to local grids at peak prices, charging it back up during cheap night hours.", tag: "Smart Grids", i: RefreshCw },
                    { t: "Autonomous Driving & V2X Systems", d: "Sensor suites communicating directly with traffic signals and neighboring vehicles to reduce collisions and optimize vehicle drafting efficiency.", tag: "Self-Driving", i: Cpu },
                    { t: "Wireless Charging Roads", d: "Inductive magnetic pads embedded inside highway concrete to recharge cars on the go, theoretically bypassing battery range restrictions forever.", tag: "Infrastructure", i: BatteryCharging },
                    { t: "Hydrogen Fuel Cell hybrids (FCEV)", d: "Combines gaseous hydrogen with fuel cells to run standard EV motors, producing only pure water. Targeted at heavy container logistics.", tag: "Clean Fuels", i: Globe }
                  ].map((item, idx) => {
                    const ItemIcon = item.i;
                    return (
                      <div key={idx} className="glass-panel p-6 rounded-2xl relative overflow-hidden space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A]">
                            <ItemIcon className="size-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white">{item.t}</h3>
                            <span className="text-[9px] bg-[#FF9F1A]/15 border border-[#FF9F1A]/35 text-[#FF9F1A] rounded px-1.5 py-0.5 uppercase tracking-wide font-bold">{item.tag}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 6: LEARNING CENTER */}
            {/* ========================================================================= */}
            {activeTab === "learning" && (
              <div className="space-y-12">
                
                {/* Intro */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">EV Learning Center</h2>
                  <p className="text-slate-400 mt-2 text-sm">
                    Test your EV engineering acumen, stream technical webinars, or download official regulatory documents.
                  </p>
                </div>

                {/* DYNAMIC QUIZ SYSTEM */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
                  {/* Decorative background glow */}
                  <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-[#FF9F1A]/5 blur-2xl pointer-events-none" />
                  
                  {!quizStarted ? (
                    // Quiz Intro State
                    <div className="text-center py-8 max-w-xl mx-auto space-y-6">
                      <div className="size-16 rounded-2xl bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A] mx-auto">
                        <Award className="size-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Test Your EV Knowledge</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Answer 5 questions about EV drivetrains, lithium batteries, and grid integration. Score 4+ to earn a mock **Nexiora EV Tech Competency Badge**!
                        </p>
                      </div>
                      <button 
                        onClick={() => setQuizStarted(true)}
                        className="bg-[#FF9F1A] text-neutral-950 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#FF6A00] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        Start Assessment <ArrowRight className="size-4" />
                      </button>
                    </div>
                  ) : quizFinished ? (
                    // Quiz Finished Score State
                    <div className="text-center py-8 max-w-xl mx-auto space-y-6">
                      <div className="size-16 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mx-auto">
                        <Award className="size-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">Assessment Complete!</h3>
                        <p className="text-sm text-slate-300">You scored <span className="text-[#FF9F1A] font-bold">{quizScore} out of {QUIZ_QUESTIONS.length}</span></p>
                      </div>
                      
                      {quizScore >= 4 ? (
                        <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-4 rounded-2xl text-left flex items-start gap-3">
                          <CheckCircle2 className="size-5 text-[#10B981] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-[#10B981] uppercase block">Badge Unlocked!</span>
                            <p className="text-xs text-slate-400 mt-1">Congratulations, you have unlocked the **Nexiora Certified EV Enthusiast Badge**. Share your credentials with the community!</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-left flex items-start gap-3">
                          <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-red-400 uppercase block">Almost There!</span>
                            <p className="text-xs text-slate-400 mt-1">Review the explanations in the Battery Lab or Baselines tabs and try again to score at least 4 out of 5.</p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4 justify-center">
                        <button 
                          onClick={resetQuiz}
                          className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          Retry Quiz
                        </button>
                        <button 
                          onClick={() => { resetQuiz(); setActiveTab("basics"); }}
                          className="bg-[#FF9F1A] text-neutral-950 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#FF6A00] transition-colors cursor-pointer"
                        >
                          Review Basics
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Active Quiz Question State
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs border-b border-white/5 pb-4">
                        <span className="font-semibold text-slate-400">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                        <span className="font-semibold text-[#FF9F1A]">Score: {quizScore}</span>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          {currentQuestion.question}
                        </h4>

                        <div className="grid md:grid-cols-2 gap-3 pt-2">
                          {currentQuestion.options.map((opt, oIdx) => {
                            const isSelected = selectedOption === oIdx;
                            const isCorrectAnswer = oIdx === currentQuestion.answerIndex;
                            let btnStyle = "bg-white/2 border-white/5 text-slate-300 hover:border-white/15 hover:bg-white/4";
                            
                            if (selectedOption !== null) {
                              if (isCorrectAnswer) {
                                btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                              } else if (isSelected) {
                                btnStyle = "bg-red-500/10 border-red-500 text-red-400";
                              } else {
                                btnStyle = "bg-white/1 border-white/[0.02] text-slate-500 pointer-events-none";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={selectedOption !== null}
                                onClick={() => handleQuizAnswer(oIdx)}
                                className={`w-full text-left p-4 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {selectedOption !== null && isCorrectAnswer && <Check className="size-4 text-emerald-400" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation Reveal */}
                      {selectedOption !== null && (
                        <div className="bg-white/2 border border-white/5 p-4 rounded-2xl space-y-2 mt-4">
                          <span className="text-[10px] font-bold text-[#FF9F1A] uppercase tracking-wider block">Explanation</span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {currentQuestion.explanation}
                          </p>
                          <button
                            onClick={handleNextQuizQuestion}
                            className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-[11px] hover:bg-white/10 transition-colors mt-2 cursor-pointer float-right"
                          >
                            {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? "Finish Assessment" : "Next Question"}
                          </button>
                          <div className="clear-both" />
                        </div>
                      )}

                    </div>
                  )}
                </div>

                {/* Video Learning Panel */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Video Seminar Series</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { t: "Electric Drivetrain Diagnostics", dur: "14:20", desc: "Understanding the conversion of phase currents inside magnetic stators.", v: "Mock Webinar" },
                      { t: "Lithium Safe Charging Standards", dur: "21:05", desc: "How thermal control loops govern CCS2 fast charging curves.", v: "Safety First" },
                      { t: "Solid State Energy Systems", dur: "18:45", desc: "Analysis of solid electrolyte ceramics and dendrite containment profiles.", v: "Tech Deep-dive" }
                    ].map((vid, idx) => (
                      <div key={idx} className="glass-panel rounded-2xl overflow-hidden group hover:border-[#FF9F1A]/20 transition-all duration-300">
                        {/* Mock video cover image */}
                        <div className="aspect-video bg-neutral-950 relative flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
                          <div className="size-12 rounded-full bg-[#FF9F1A]/10 border border-[#FF9F1A]/30 flex items-center justify-center text-[#FF9F1A] group-hover:scale-110 transition-transform">
                            <Play className="size-5 fill-[#FF9F1A]" />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-neutral-900/90 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                            {vid.dur}
                          </span>
                        </div>
                        <div className="p-4 space-y-1">
                          <span className="text-[9px] text-[#FF9F1A] font-bold uppercase">{vid.v}</span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{vid.t}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{vid.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DOWNLOAD CENTER */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Official Download Center</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { f: "India ARAI FAME Guidelines.pdf", size: "2.4 MB", desc: "Official compliance frameworks and tax parameters for electric vehicles." },
                      { f: "Nexiora NMC Battery Safe Handling.pdf", size: "1.8 MB", desc: "Technical datasheet detailing chemical safety profiles and recycling protocols." }
                    ].map((file, idx) => (
                      <div key={idx} className="glass-panel p-4 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-lg bg-white/2 border border-white/5 flex items-center justify-center text-[#FF9F1A]">
                            <Play className="size-4 rotate-90" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{file.f}</h4>
                            <span className="text-[10px] text-slate-500">{file.size} · {file.desc}</span>
                          </div>
                        </div>
                        <button className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg border border-white/10 transition-colors cursor-pointer">
                          <Download className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 7: CALCULATORS & TOOLS */}
            {/* ========================================================================= */}
            {activeTab === "calculators" && (
              <div className="space-y-12">
                
                {/* RANGE CALCULATOR */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Inputs Column */}
                  <div className="lg:col-span-6 space-y-6 glass-panel p-6 sm:p-8 rounded-3xl">
                    <div>
                      <h3 className="text-lg font-bold text-white">Dynamic Range Estimator</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Adjust environmental and vehicle loads to calculate real-world range capacity.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Battery Capacity Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Battery Pack Size (Capacity)</span>
                          <span className="text-[#FF9F1A]">{batteryCapacity} kWh</span>
                        </div>
                        <input 
                          type="range" 
                          min="20" 
                          max="120" 
                          value={batteryCapacity} 
                          onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>20 kWh (City Hatch)</span>
                          <span>120 kWh (Premium SUV)</span>
                        </div>
                      </div>

                      {/* Speed Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Average Driving Speed</span>
                          <span className="text-[#FF9F1A]">{avgSpeed} km/h</span>
                        </div>
                        <input 
                          type="range" 
                          min="30" 
                          max="120" 
                          value={avgSpeed} 
                          onChange={(e) => setAvgSpeed(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>30 km/h (Slow traffic)</span>
                          <span>120 km/h (Highway cruise)</span>
                        </div>
                      </div>

                      {/* Passengers Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Passenger Count</span>
                          <span className="text-[#FF9F1A]">{passengers} {passengers === 1 ? "Person" : "People"}</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="5" 
                          value={passengers} 
                          onChange={(e) => setPassengers(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                      </div>

                      {/* AC Switch */}
                      <div className="flex items-center justify-between bg-white/2 border border-white/5 p-3.5 rounded-xl">
                        <div>
                          <span className="block text-xs font-semibold text-white">Air Conditioning (HVAC Climate Control)</span>
                          <span className="text-[10px] text-slate-500">Consumes ~1.5 kW continuous power</span>
                        </div>
                        <button 
                          onClick={() => setAcUsage(!acUsage)}
                          className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 cursor-pointer ${acUsage ? "bg-[#FF9F1A]" : "bg-neutral-800"}`}
                        >
                          <div className={`size-4.5 rounded-full bg-white transition-transform duration-300 ${acUsage ? "translate-x-5.5" : "translate-x-0"}`} />
                        </button>
                      </div>

                      {/* Terrain Selector */}
                      <div className="space-y-2">
                        <span className="block text-xs font-semibold text-slate-400">Terrain Driving Matrix</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "flat", name: "Flat Roads" },
                            { id: "hilly", name: "Hilly Passes" },
                            { id: "steep", name: "Mountain Steeps" }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setTerrain(t.id as any)}
                              className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                                terrain === t.id 
                                  ? "bg-[#FF9F1A]/15 border-[#FF9F1A] text-white" 
                                  : "bg-white/1 border-white/5 text-slate-400 hover:border-white/10"
                              }`}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Battery Health Degradation Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Anode Cell Health (SOH)</span>
                          <span className="text-[#FF9F1A]">{batteryHealth}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="70" 
                          max="100" 
                          value={batteryHealth} 
                          onChange={(e) => setBatteryHealth(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>70% (Degraded SOH)</span>
                          <span>100% (Brand New Pack)</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Outputs Column */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden space-y-6 text-center">
                      <div className="absolute -top-12 -right-12 size-36 rounded-full bg-[#10B981]/5 blur-2xl pointer-events-none" />
                      
                      <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-widest block">Estimated Performance Range</span>
                      
                      <div className="py-4">
                        <span className="text-6xl sm:text-7xl font-black text-white">{calculatedRange.range}</span>
                        <span className="text-xl font-bold text-[#10B981] ml-1">km</span>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/1 border border-white/5 p-4 rounded-2xl">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Real-world Consumption</span>
                          <span className="text-lg font-bold text-white mt-1 block">{calculatedRange.consumption} Wh/km</span>
                        </div>
                        <div className="bg-white/1 border border-white/5 p-4 rounded-2xl">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">System Efficiency</span>
                          <span className="text-lg font-bold text-white mt-1 block">{calculatedRange.efficiency} km/kWh</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal">
                        *Estimates derived from mathematical models incorporating rolling resistance, air drag equations, payload dynamics, and chemical capacity degradation coefficients.
                      </p>
                    </div>

                    {/* Quick Saving Tip */}
                    <div className="glass-panel p-5 rounded-2xl flex items-start gap-3 border-blue-500/20 bg-blue-950/10">
                      <Info className="size-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Pro-tip for Range Optimization</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                          Maintain speeds below 80 km/h, minimize passenger load factors, and utilize blended regenerative braking rather than hydraulic friction to recoup up to 25% of energy directly.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* CHARGING CALCULATOR */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Inputs */}
                  <div className="lg:col-span-6 space-y-6 glass-panel p-6 sm:p-8 rounded-3xl">
                    <div>
                      <h3 className="text-lg font-bold text-white">Charging Cost & Time Calculator</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Determine optimal charging costs, speeds, and annual fossil fuel savings estimates.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Battery Size */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Vehicle Battery Size</span>
                          <span className="text-[#FF9F1A]">{calcBatterySize} kWh</span>
                        </div>
                        <input 
                          type="range" 
                          min="15" 
                          max="100" 
                          value={calcBatterySize} 
                          onChange={(e) => setCalcBatterySize(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                      </div>

                      {/* Electricity rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Electricity Rate (per Unit/kWh)</span>
                          <span className="text-[#FF9F1A]">₹ {electricityPrice} / unit</span>
                        </div>
                        <input 
                          type="range" 
                          min="4" 
                          max="15" 
                          value={electricityPrice} 
                          onChange={(e) => setElectricityPrice(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>₹ 4 (Subsidy rates)</span>
                          <span>₹ 15 (Commercial rate)</span>
                        </div>
                      </div>

                      {/* Charger Power */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Charger Power output</span>
                          <span className="text-[#FF9F1A]">{chargerPower} kW</span>
                        </div>
                        <input 
                          type="range" 
                          min="2" 
                          max="60" 
                          step="0.5"
                          value={chargerPower} 
                          onChange={(e) => setChargerPower(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>3.3 kW (Slow wall socket)</span>
                          <span>50+ kW (High speed public DC)</span>
                        </div>
                      </div>

                      {/* Efficiency */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Charging Grid Efficiency</span>
                          <span className="text-[#FF9F1A]">{efficiency}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="70" 
                          max="98" 
                          value={efficiency} 
                          onChange={(e) => setEfficiency(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>70% (Heat loss/low quality)</span>
                          <span>98% (Premium components)</span>
                        </div>
                      </div>

                      {/* Daily Km usage */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Daily Running Distance</span>
                          <span className="text-[#FF9F1A]">{dailyKm} km</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="200" 
                          value={dailyKm} 
                          onChange={(e) => setDailyKm(Number(e.target.value))}
                          className="w-full accent-[#FF9F1A]" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5">
                      <h4 className="text-sm font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider">Charging Cost Estimates</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/1 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] text-slate-500 block">Time to 10% - 80% SOC</span>
                          <span className="text-xl font-bold text-[#FF9F1A] mt-1 block">{chargingOutputs.timeTo80} Hours</span>
                        </div>
                        <div className="bg-white/1 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] text-slate-500 block">Full Charge Cost (0-100%)</span>
                          <span className="text-xl font-bold text-white mt-1 block">₹ {chargingOutputs.fullChargeCost}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/1 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] text-slate-500 block">Monthly EV Driving Cost</span>
                          <span className="text-lg font-bold text-white mt-1 block">₹ {chargingOutputs.monthlyCost}</span>
                        </div>
                        <div className="bg-white/1 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] text-slate-500 block">Annual EV Driving Cost</span>
                          <span className="text-lg font-bold text-white mt-1 block">₹ {chargingOutputs.annualCost}</span>
                        </div>
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#10B981] uppercase block">Annual Fuel Savings</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">Compared to fuel average of ₹6.67/km</span>
                        </div>
                        <span className="text-2xl font-black text-[#10B981]">₹ {chargingOutputs.annualSavings}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 8: AI EV ASSISTANT */}
            {/* ========================================================================= */}
            {activeTab === "assistant" && (
              <div className="space-y-6">
                
                {/* Intro */}
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-extrabold text-white">AI EV Technology Assistant</h2>
                  <p className="text-slate-400 mt-1 text-xs">
                    Get instant technical breakdown replies on diagnostics standards, chemistry equations, and charging levels.
                  </p>
                </div>

                {/* Chat window panel */}
                <div className="glass-panel rounded-3xl overflow-hidden h-[500px] flex flex-col justify-between">
                  {/* Message thread */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scroll">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            msg.sender === "user" 
                              ? "bg-[#FF9F1A] text-neutral-950 font-semibold rounded-tr-none" 
                              : "bg-white/3 border border-white/5 text-slate-200 rounded-tl-none"
                          }`}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Suggestion Chips */}
                  <div className="px-6 py-2 bg-neutral-950/20 border-t border-white/5 flex gap-2 overflow-x-auto custom-scroll whitespace-nowrap">
                    {CHATBOT_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChatSubmit(preset)}
                        className="bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/4 text-[10px] text-slate-300 font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  {/* Input form */}
                  <div className="p-4 bg-neutral-950/40 border-t border-white/5">
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleChatSubmit(); }}
                      className="flex gap-3"
                    >
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about BMS, LFP vs NMC, charging curves..." 
                        className="flex-1 bg-neutral-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF9F1A] transition-colors"
                      />
                      <button 
                        type="submit" 
                        className="bg-[#FF9F1A] text-neutral-950 size-11 rounded-xl flex items-center justify-center hover:bg-[#FF6A00] transition-colors cursor-pointer shrink-0"
                      >
                        <Send className="size-4" />
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* --- GLOBAL GLOSSARY & COMMUNITY FORUM (Appended to Landing bottom) --- */}
        {activeTab === "basics" && (
          <div className="border-t border-white/5 pt-16 mt-16 space-y-16">
            
            {/* GLOSSARY */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Sidebar filter */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">EV Glossary</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Quick search for acronyms and specific electro-mechanical terminology.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="size-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search acronyms..." 
                    className="w-full bg-neutral-900/60 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF9F1A] transition-colors"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {["All", "Battery", "Charging", "Motor", "Component", "Future Tech"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedGlossaryCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold transition-all ${
                        selectedGlossaryCategory === cat 
                          ? "bg-[#FF9F1A]/10 border-[#FF9F1A] text-white" 
                          : "bg-white/1 border-white/5 text-slate-400 hover:border-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Glossary Grid */}
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto custom-scroll pr-2">
                  {filteredGlossary.length > 0 ? (
                    filteredGlossary.map((item, idx) => (
                      <div key={idx} className="glass-panel p-4 rounded-xl space-y-1.5 hover:border-white/15 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#FF9F1A]">{item.term}</h4>
                          <span className="text-[8px] bg-white/4 border border-white/5 rounded px-1 text-slate-500 uppercase tracking-wider">{item.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{item.definition}</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 bg-white/1 rounded-xl border border-white/5 text-xs text-slate-500">
                      No matching glossary terms found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* INDUSTRY NEWS */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Latest EV Technology News</h3>
                <p className="text-xs text-slate-400 mt-0.5">Stay updated with structural patents, safety mandates, and manufacturing blueprints.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {MOCK_NEWS.map((news, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-white/15 transition-colors">
                    <div className="space-y-2">
                      <span className="inline-block text-[8px] font-bold bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 text-[#FF9F1A] rounded px-1.5 py-0.5 uppercase tracking-wide">
                        {news.tag}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">{news.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">{news.desc}</p>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 pt-3 border-t border-white/5 mt-4">
                      <span>{news.date}</span>
                      <span className="font-semibold text-slate-400 flex items-center gap-0.5 hover:text-[#FF9F1A] transition-colors cursor-pointer">
                        Read full draft <ChevronRight className="size-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMUNITY Q&A FORUM */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Question submission panel */}
              <div className="lg:col-span-4 space-y-4 glass-panel p-5 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-white">Submit Q&A Draft</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Ask local EV engineers about diagnostics, standards, or charging issues.</p>
                </div>
                
                <form onSubmit={handlePostQuestion} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Subsystem Category</label>
                    <select 
                      value={newQuestionCategory} 
                      onChange={(e) => setNewQuestionCategory(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/5 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF9F1A] cursor-pointer"
                    >
                      <option value="Battery">Battery Lab</option>
                      <option value="Charging">Charging Network</option>
                      <option value="Diagnostics">Electrical Diagnostics</option>
                      <option value="Motors">Transmission/Motors</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Question</label>
                    <textarea 
                      rows={3}
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Write your technical query here..." 
                      className="w-full bg-neutral-900 border border-white/5 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF9F1A]"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#FF9F1A] text-neutral-950 py-2.5 rounded-xl font-bold text-xs hover:bg-[#FF6A00] transition-colors cursor-pointer"
                  >
                    Post Question
                  </button>
                </form>
              </div>

              {/* Feed Panel */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Active Discussions</span>
                
                <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scroll pr-2">
                  {forumQuestions.map((fq) => (
                    <div key={fq.id} className="glass-panel p-4 rounded-xl flex justify-between items-start gap-4">
                      <div className="flex gap-3">
                        <div className="size-8 rounded-full bg-[#FF9F1A]/10 border border-[#FF9F1A]/20 flex items-center justify-center text-[#FF9F1A] text-xs font-bold shrink-0">
                          {fq.avatar}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-slate-200">{fq.user}</span>
                            <span className="text-[8px] bg-white/4 border border-white/5 text-slate-500 rounded px-1 uppercase tracking-wider">{fq.category}</span>
                            <span className="text-[9px] text-slate-500 font-medium">{fq.date}</span>
                          </div>
                          <p className="text-xs text-slate-300 font-semibold leading-normal">{fq.question}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 text-right shrink-0">
                        <div className="text-center bg-white/2 border border-white/5 px-2 py-1 rounded-lg min-w-[36px]">
                          <span className="block text-[11px] font-bold text-white">{fq.votes}</span>
                          <span className="block text-[8px] text-slate-500 uppercase font-medium">Votes</span>
                        </div>
                        <div className="text-center bg-white/2 border border-white/5 px-2 py-1 rounded-lg min-w-[36px]">
                          <span className="block text-[11px] font-bold text-white">{fq.answers}</span>
                          <span className="block text-[8px] text-slate-500 uppercase font-medium">Replies</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
