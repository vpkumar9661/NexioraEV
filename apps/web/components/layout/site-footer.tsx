"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Linkedin, Github, Youtube, Instagram, Facebook, Twitter, 
  Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, 
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
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#07090e] border-t border-white/[0.06] pt-20 pb-8 font-sans">
      
      {/* Background Graphic System */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
        
        {/* Moving ambient radial glows */}
        <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] bg-[#00D26A]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#2563EB]/4 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "16s" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#8B5CF6]/3 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: "14s" }} />
        
        {/* Soft noise texture simulation */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Footer Call-To-Action (Liquid Glass container) */}
        <section className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 sm:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          {/* Inner ambient glows */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00D26A]/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#2563EB]/10 rounded-full blur-[60px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Ready to Build the Future of Electric Mobility?
              </h2>
              <p className="text-sm sm:text-base text-[#AEB5C0]/75 leading-relaxed">
                Explore cutting-edge EV technology, intelligent solutions, marketplace services, government schemes, and AI-powered insights — all in one unified ecosystem.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <Link 
                href="/evtech"
                className="px-6 py-3.5 rounded-xl font-bold bg-[#00D26A] text-[#07090e] hover:bg-[#22C55E] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_24px_rgba(0,210,106,0.25)] flex items-center justify-center gap-2 group"
              >
                Explore EVTech
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
              </Link>
              <Link 
                href="/marketplace"
                className="px-6 py-3.5 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </section>

        {/* Mid Footer Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pt-4">
          
          {/* Brand Presentation & Info Column */}
          <div className="lg:col-span-2 space-y-6 relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* Soft pulse green blur spot behind logo */}
                <div className="absolute inset-0 bg-[#00D26A]/20 rounded-full blur-[15px] scale-150 animate-pulse" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D26A] to-[#22C55E] flex items-center justify-center border border-white/10">
                  <Zap className="w-5 h-5 text-[#07090e]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Nexiora<span className="bg-gradient-to-r from-[#00D26A] to-[#22C55E] bg-clip-text text-transparent">EV</span>
              </span>
            </div>
            <p className="text-sm text-[#AEB5C0]/85 leading-relaxed max-w-sm">
              NexioraEV is a premium, AI-powered Electric Vehicle ecosystem. We integrate smart diagnostics, a unified commercial marketplace, and government incentives lookup models to accelerate carbon-free urban logistics.
            </p>
            
            {/* Social Glass Icons */}
            <div className="flex items-center gap-3">
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
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/8 text-[#AEB5C0]/80 hover:text-[#00D26A] hover:bg-[#00D26A]/10 hover:border-[#00D26A]/40 transition-all duration-300 hover:scale-[1.1] hover:shadow-[0_0_12px_rgba(0,210,106,0.2)]"
                  >
                    <SocIcon className="w-4 h-4" strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#00D26A] uppercase">
              Products
            </h4>
            <ul className="space-y-2.5 text-[13.5px] font-medium text-[#AEB5C0]/75">
              {[
                { name: "EVTech", href: "/evtech" },
                { name: "Solutions Hub", href: "/solutions" },
                { name: "Intelligence Node", href: "/intelligence" },
                { name: "Marketplace Catalog", href: "/marketplace" },
                { name: "Government Schemes", href: "/schemes" },
                { name: "AI Assistant", href: "/evtech/ai-assistant" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#2563EB] uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5 text-[13.5px] font-medium text-[#AEB5C0]/75">
              {[
                { name: "Learning Center", href: "/evtech/learning-center" },
                { name: "Battery Lab", href: "/evtech/battery-lab" },
                { name: "Charging Hub", href: "/evtech/charging-hub" },
                { name: "Ecosystem Blog", href: "/news" },
                { name: "Latest News", href: "/news" },
                { name: "Downloads & Specs", href: "/marketplace/accessories" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#8B5CF6] uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13.5px] font-medium text-[#AEB5C0]/75">
              {[
                { name: "About Us", href: "/company/about" },
                { name: "Our Team", href: "/company/team" },
                { name: "Partners", href: "/company/partners" },
                { name: "Careers", href: "/company/careers" },
                { name: "Media Assets", href: "/company/media" },
                { name: "Contact Desk", href: "/company/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* Contact info, Newsletter and Support list */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 border-t border-white/[0.05] pt-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#AEB5C0]/50 uppercase">
              Corporate Headquarters
            </h4>
            <ul className="space-y-3.5 text-[13.5px] text-[#AEB5C0]/85 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#00D26A] shrink-0 mt-0.5" strokeWidth={1.8} />
                <span>Aerocity Aviation District, New Delhi 110037, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-[#00D26A] shrink-0" strokeWidth={1.8} />
                <span>+91 11 4050 6070 (Corporate Lines)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-[#00D26A] shrink-0" strokeWidth={1.8} />
                <span>info@nexioraev.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4.5 h-4.5 text-[#00D26A] shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-[11px] text-[#AEB5C0]/55 mt-0.5">Automated Support is available 24/7</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-widest text-[#AEB5C0]/60 uppercase">
              Support
            </h4>
            <ul className="space-y-2.5 text-[13.5px] font-medium text-[#AEB5C0]/75">
              {[
                { name: "Help Center", href: "/company/support" },
                { name: "Documentation", href: "/company/developers" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "FAQs", href: "/company/support" },
                { name: "Developer APIs", href: "/company/developers" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Input Card (Liquid Glass card) */}
          <div className="lg:col-span-2 p-6 rounded-[20px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[175px]">
            {/* Visual gradient loop */}
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-[#00D26A]/5 rounded-full blur-[30px]" />
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D26A]" />
                Stay Updated
              </h5>
              <p className="text-[12.5px] text-[#AEB5C0]/75 leading-relaxed">
                Receive the latest EV technology releases, software updates, and exclusive insights.
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
                  className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-[13px] text-white placeholder-[#AEB5C0]/40 focus:outline-none focus:border-[#00D26A]/40 focus:ring-1 focus:ring-[#00D26A]/30 w-full transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl font-bold transition-all text-[13px] shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#00D26A] font-medium animate-fade-in">
                  Welcome to the ecosystem! Check your inbox for verification.
                </p>
              )}
            </form>
          </div>

        </section>

        {/* Trust Badges Section */}
        <section className="flex flex-wrap items-center justify-center gap-4 border-t border-white/[0.05] pt-10">
          {[
            { label: "Secure Platform", icon: ShieldCheck },
            { label: "Verified Information", icon: CheckCircle2 },
            { label: "AI Powered", icon: Sparkles },
            { label: "EV Focused", icon: Zap },
            { label: "Made in India", icon: Building2 }
          ].map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <div 
                key={badge.label}
                className="px-3.5 py-2 rounded-xl border border-white/[0.06] bg-white/[0.01] text-[11.5px] font-bold text-[#AEB5C0]/85 flex items-center gap-2 hover:bg-white/[0.03] hover:border-white/10 hover:text-white transition-all cursor-default"
              >
                <BadgeIcon className="w-4 h-4 text-[#00D26A]" />
                {badge.label}
              </div>
            );
          })}
        </section>

        {/* Bottom Bar Footer Details */}
        <section className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] font-semibold text-[#AEB5C0]/65">
          <div>
            © 2026 NexioraEV. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            Made with <span className="text-[#EC4899] animate-pulse">❤️</span> for the Future of Electric Mobility
          </div>
          <div className="flex items-center gap-2">
            <span>Core Node</span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[10.5px]">v1.0.0</span>
          </div>
        </section>

      </div>
    </footer>
  );
}
