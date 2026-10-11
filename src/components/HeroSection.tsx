import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Building2, 
  TrendingUp, 
  Users, 
  CreditCard,
  Lock
} from 'lucide-react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { UserRole } from '../types';

interface HeroSectionProps {
  onOpenInstantKyc: () => void;
  onOpenRegister: (role: UserRole) => void;
  onOpenLogin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInstantKyc,
  onOpenRegister,
  onOpenLogin,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#dfb135]/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-32 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0a1b38] border border-[#dfb135]/40 shadow-inner">
              <Sparkles className="w-4 h-4 text-[#dfb135]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Instant Approval • KYC in 15 Minutes • Highest DSA Slabs
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Premier Loan Distribution & All-India{' '}
              <span className="bg-gradient-to-r from-[#dfb135] via-[#f7d578] to-[#dfb135] bg-clip-text text-transparent">
                DSA Partner Network
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong className="text-white font-semibold">Friends Kredit</strong> provides 25+ tailored financial solutions—from instant 15-minute digital KYC personal loans to ₹2 Crore MSME credit lines. Channel partners and retail CSPs earn up to <span className="text-[#dfb135] font-semibold">3.0% direct commission</span> across 50+ banking giants.
            </p>

            {/* Quick Feature Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Physical Paperwork</span>
              </div>
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#dfb135] shrink-0" />
                <span>50+ Bank Vault Logins</span>
              </div>
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Daily Payout Settlements</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenInstantKyc}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[#040e21] bg-gradient-to-r from-[#dfb135] via-[#efc44b] to-[#dfb135] hover:brightness-110 shadow-xl shadow-[#dfb135]/25 flex items-center justify-center space-x-2.5 transition transform hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Apply for Instant Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenRegister('dsa_agent')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-[#dfb135]/50 flex items-center justify-center space-x-2 transition shadow-lg"
              >
                <Building2 className="w-4 h-4 text-[#dfb135]" />
                <span>Join as DSA Partner</span>
              </button>
            </div>

            {/* Security Guarantee */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-4 text-xs text-slate-400">
              <span className="flex items-center">
                <Lock className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                256-Bit Encrypted Data Vault
              </span>
              <span>•</span>
              <span>Official Falta Branch (WB 743513)</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Card Scene */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame & Canvas */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0a1e3d]/60 to-[#040e21]/90 border border-slate-800/80 p-2 shadow-2xl backdrop-blur-sm">
              
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#040e21]/80 border border-slate-700/80 text-[11px] font-semibold text-slate-300 flex items-center space-x-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-[#dfb135] animate-ping" />
                <span>Interactive 3D Engine • Drag to Rotate</span>
              </div>

              {/* 3D WebGL Canvas */}
              <ThreeHeroCanvas />

              {/* Floating Quick Stat Pills */}
              <div className="grid grid-cols-2 gap-2 mt-2 px-2 pb-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Interest Rates From</div>
                    <div className="text-sm font-bold text-white">8.35% p.a.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#dfb135]/20 text-[#dfb135] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Channel Partners</div>
                    <div className="text-sm font-bold text-white">3,200+ Active</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Stats Grid Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#dfb135]">75+ Banks</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Top Rate Match & Direct APIs
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">15 Mins</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Instant Digital KYC Verification
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#dfb135]">Up to 3.0%</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              DSA Commission Payout Slab
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹450+ Cr</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Disbursed Across India
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
