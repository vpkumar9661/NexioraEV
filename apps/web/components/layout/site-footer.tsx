"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Linkedin, Github, Youtube, Instagram, Facebook, Twitter, 
  Mail, Phone, MapPin, Clock, ShieldCheck, 
  CheckCircle2, Zap, Building2, Sparkles, Send
} from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#05070D]/40 pt-24 pb-8 font-sans z-10">
      
      {/* Background Graphic Design */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[40px_40px] opacity-40" />
        
        {/* Layered glowing dots */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00D26A]/3 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#2563EB]/3 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: "15s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B5CF6]/2 rounded-full blur-[180px]" />
        
        {/* Subtle noise texture simulation */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Footer Navigation Columns Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pt-4">
          
          {/* Brand Presentation & Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* Soft pulse green blur behind logo */}
                <div className="absolute inset-0 bg-[#00D26A]/20 rounded-full blur-md scale-150 animate-pulse" />
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#00D26A] to-[#22C55E] flex items-center justify-center border border-white/10">
                  <Zap className="w-5 h-5 text-[#07090e]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Nexiora<span className="bg-linear-to-r from-[#00D26A] to-[#22C55E] bg-clip-text text-transparent">EV</span>
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              NexioraEV is India&apos;s next-generation AI-powered Electric Vehicle ecosystem, bringing together technology, intelligent solutions, marketplace services, government resources, and future mobility innovation on one premium platform.
            </p>
            
            {/* Social Glass Circle Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
                { name: "GitHub", href: "https://github.com", icon: Github },
                { name: "YouTube", href: "https://youtube.com", icon: Youtube },
                { name: "Instagram", href: "https://instagram.com", icon: Instagram },
                { name: "Facebook", href: "https://facebook.com", icon: Facebook },
                { name: "Twitter", href: "https://twitter.com", icon: Twitter }
              ].map((social) => {
                const SocIcon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/8 text-muted-foreground/85 hover:text-[#00D26A] hover:bg-[#00D26A]/10 hover:border-[#00D26A]/40 transition-all duration-300 hover:scale-[1.1] hover:shadow-[0_0_12px_rgba(0,210,106,0.2)]"
                  >
                    <SocIcon className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#00D26A] uppercase">
              Products
            </h4>
            <ul className="space-y-3 text-[13.5px] font-medium text-muted-foreground/75">
              {[
                { name: "EVTech", href: "/evtech" },
                { name: "Solutions", href: "/solutions" },
                { name: "Intelligence", href: "/intelligence" },
                { name: "Marketplace", href: "/marketplace" },
                { name: "Schemes", href: "/schemes" },
                { name: "AI Assistant", href: "/evtech/ai-assistant" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group relative hover:text-white transition-colors duration-200 block py-0.5">
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00D26A] group-hover:w-1/2 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#3B82F6] uppercase">
              Resources
            </h4>
            <ul className="space-y-3 text-[13.5px] font-medium text-muted-foreground/75">
              {[
                { name: "Learning Center", href: "/evtech/learning-center" },
                { name: "Battery Lab", href: "/evtech/battery-lab" },
                { name: "Battery Digital Twin", href: "/evtech/digital-twin" },
                { name: "Digital EV Studio", href: "/evtech/digital-studio" },
                { name: "Drive Simulator", href: "/evtech/drive-simulator" },
                { name: "Charging Hub", href: "/evtech/charging-hub" },
                { name: "EV News", href: "/news" },
                { name: "Blog", href: "/news" },
                { name: "Downloads", href: "/marketplace/accessories" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group relative hover:text-white transition-colors duration-200 block py-0.5">
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#3B82F6] group-hover:w-1/2 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#8B5CF6] uppercase">
              Company
            </h4>
            <ul className="space-y-3 text-[13.5px] font-medium text-muted-foreground/75">
              {[
                { name: "About", href: "/company/about" },
                { name: "Our Team", href: "/company/team" },
                { name: "Careers", href: "/company/careers" },
                { name: "Partners", href: "/company/partners" },
                { name: "Press", href: "/company/media" },
                { name: "Contact", href: "/company/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group relative hover:text-white transition-colors duration-200 block py-0.5">
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8B5CF6] group-hover:w-1/2 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-muted-foreground/60 uppercase">
              Support
            </h4>
            <ul className="space-y-3 text-[13.5px] font-medium text-muted-foreground/75">
              {[
                { name: "Help Center", href: "/company/support" },
                { name: "Documentation", href: "/company/developers" },
                { name: "FAQs", href: "/company/support" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms", href: "/terms" },
                { name: "Developer API", href: "/company/developers" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group relative hover:text-white transition-colors duration-200 block py-0.5">
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#AEB5C0]/65 group-hover:w-1/2 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* Contact details and Glass Newsletter Card */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 border-t border-white/5 pt-12">
          
          {/* Corporate Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-muted-foreground/50 uppercase">
              Contact Desk
            </h4>
            <ul className="space-y-3.5 text-[13.5px] text-muted-foreground/85 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#00D26A] shrink-0 mt-0.5" strokeWidth={1.8} />
                <span>Aerocity Aviation District, New Delhi 110037, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-[#00D26A] shrink-0" strokeWidth={1.8} />
                <span>+91 11 4050 6070</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-[#00D26A] shrink-0" strokeWidth={1.8} />
                <span>info@nexioraev.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4.5 h-4.5 text-[#00D26A] shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <p>Working Hours: Mon - Fri (9:00 AM - 6:00 PM IST)</p>
                  <p className="text-[11px] text-muted-foreground/55 mt-0.5">AI support lines are open 24/7</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Newsletter Box (Liquid Glass card with animated border) */}
          <div className="lg:col-span-2 p-6 rounded-[20px] border border-white/8 bg-white/2 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-[#00D26A]/5 rounded-full blur-[30px]" />
            
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D26A] animate-pulse" />
                Stay Updated
              </h5>
              <p className="text-[12px] text-muted-foreground/75 leading-relaxed">
                Receive the latest EV news, battery innovations, charging technology updates, and AI insights.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="space-y-2 mt-4">
              <div className="flex gap-2">
                <input 
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-muted-foreground/40 focus:outline-none focus:border-[#00D26A]/40 focus:ring-1 focus:ring-[#00D26A]/30 w-full transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#00D26A] hover:bg-[#22C55E] text-[#07090e] rounded-xl font-bold transition-all text-[13px] shrink-0 flex items-center justify-center gap-1.5 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#00D26A] font-medium animate-fade-in">
                  Thank you! Welcome to India&apos;s premier EV ecosystem newsletter.
                </p>
              )}
            </form>
          </div>

        </section>

        {/* Trust Badges Section */}
        <section className="flex flex-wrap items-center justify-center gap-4 border-t border-white/5 pt-10">
          {[
            { label: "AI Powered", icon: Sparkles },
            { label: "Future Ready", icon: ShieldCheck },
            { label: "Clean Energy", icon: CheckCircle2 },
            { label: "Electric Mobility", icon: Zap },
            { label: "Made in India", icon: Building2 },
            { label: "Secure Platform", icon: ShieldCheck }
          ].map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <div 
                key={badge.label}
                className="px-3.5 py-2 rounded-xl border border-white/6 bg-white/1 text-[11.5px] font-bold text-muted-foreground/85 flex items-center gap-2 hover:bg-white/3 hover:border-white/10 hover:text-white transition-all cursor-default"
              >
                <BadgeIcon className="w-4 h-4 text-[#00D26A]" />
                {badge.label}
              </div>
            );
          })}
        </section>

        {/* Bottom Bar Footer Details */}
        <section className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] font-semibold text-muted-foreground/65">
          <div>
            © 2026 NexioraEV
          </div>
          <div className="flex items-center gap-1.5 text-center text-muted-foreground/80">
            Building the Future of Electric Mobility with Intelligence, Innovation, and Sustainability.
          </div>
          <div className="flex items-center gap-2">
            <span>Version 1.0.0</span>
          </div>
        </section>

      </div>
    </footer>
  );
}
