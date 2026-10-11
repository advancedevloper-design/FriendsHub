import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Users, 
  Coins, 
  ChevronRight 
} from 'lucide-react';
import { UserRole } from '../types';

interface DsaNetworkSectionProps {
  onOpenRegister: (role: UserRole) => void;
}

export const DsaNetworkSection: React.FC<DsaNetworkSectionProps> = ({ onOpenRegister }) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(25000000); // 2.5 Cr default
  const [productType, setProductType] = useState<'personal' | 'business' | 'home' | 'cards'>('personal');

  const getCommissionRate = () => {
    switch (productType) {
      case 'personal':
        return 0.02; // 2.0%
      case 'business':
        return 0.0225; // 2.25%
      case 'home':
        return 0.0065; // 0.65%
      case 'cards':
        return 0.025; // 2.5%
      default:
        return 0.02;
    }
  };

  const estimatedEarnings = Math.round(monthlyVolume * getCommissionRate());

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const tiers = [
    {
      name: 'Bronze Partner',
      disbursement: 'Up to ₹50 Lakhs/mo',
      payout: 'Up to 1.50%',
      benefits: ['Access to 25+ Bank APIs', 'Standard 48h Payout Settlement', 'Digital Application Portal'],
      badge: 'Starter',
      color: 'border-amber-700/50 bg-amber-950/20 text-amber-300',
    },
    {
      name: 'Silver Partner',
      disbursement: '₹50 Lakhs to ₹2 Crores/mo',
      payout: 'Up to 2.00%',
      benefits: ['Priority Underwriting Desk', '24h Express Payouts', 'Marketing Banners & Collateral'],
      badge: 'Popular',
      color: 'border-slate-400/50 bg-slate-800/30 text-slate-200',
    },
    {
      name: 'Gold Partner',
      disbursement: '₹2 Crores to ₹5 Crores/mo',
      payout: 'Up to 2.50%',
      benefits: ['Dedicated Branch RM', 'Same-Day Payout Release', 'Special Sub-DSA Team Accounts'],
      badge: 'High Earner',
      color: 'border-[#dfb135]/60 bg-[#dfb135]/15 text-[#dfb135]',
    },
    {
      name: 'Platinum Partner',
      disbursement: '₹5 Crores+ /mo',
      payout: 'Up to 3.00%',
      benefits: ['Institutional Direct Codes', 'Instant API Webhook Sync', 'Quarterly Incentive Luxury Trips'],
      badge: 'Elite Tier',
      color: 'border-cyan-500/60 bg-cyan-950/30 text-cyan-300',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Digital Registration',
      desc: 'Submit your PAN, Aadhaar, and Shop / Firm details in under 2 minutes.',
    },
    {
      number: '02',
      title: 'Instant Channel Code',
      desc: 'Receive your unique Partner Code (RP-XXXX) and encrypted portal credentials.',
    },
    {
      number: '03',
      title: 'Punch Client Files',
      desc: 'Submit customer leads or login directly to 50+ banking portals via our Bank Vault.',
    },
    {
      number: '04',
      title: 'Daily Commission Release',
      desc: 'Track disbursements live and receive direct bank payouts with complete ledger audit.',
    },
  ];

  return (
    <section id="dsa-network" className="py-16 sm:py-24 bg-[#030914] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>National Channel Partnership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry-Leading DSA Partner & Retailer Network
          </h2>

          <p className="text-slate-400 text-base">
            Monetize your customer walk-ins and local client trust. Partner with Friends Kredit to access 50+ banks, dedicated underwriting support, and highest commission slabs.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] shadow-xl ${tier.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/40 border border-current">
                    {tier.badge}
                  </span>
                  <Award className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <div className="text-xs text-slate-300 mt-1">{tier.disbursement}</div>

                <div className="mt-5 p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">Commission Slab</div>
                  <div className="text-2xl font-extrabold text-white mt-0.5">{tier.payout}</div>
                </div>

                <ul className="mt-5 space-y-2 text-xs text-slate-300">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => onOpenRegister('dsa_agent')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center space-x-1"
                >
                  <span>Apply for Tier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive DSA Earnings Calculator Frame */}
        <div className="mt-16 rounded-3xl bg-gradient-to-b from-[#0a1b38] to-[#040e21] border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-xs uppercase font-bold text-[#dfb135]">
                <Coins className="w-4 h-4" />
                <span>Estimate Your Channel Income</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                How Much Can You Earn as a Partner?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Move the slider to estimate your monthly commission earnings based on your prospective disbursement volume and product mix.
              </p>

              {/* Product Type Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Primary Lending Segment
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'personal', label: 'Personal (2.0%)' },
                    { id: 'business', label: 'MSME Loan (2.25%)' },
                    { id: 'home', label: 'Home Loan (0.65%)' },
                    { id: 'cards', label: 'Cards / Digital (2.5%)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setProductType(p.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center transition ${
                        productType === p.id
                          ? 'bg-[#dfb135] text-[#040e21] font-bold shadow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-300">
                    Expected Monthly Disbursed File Volume
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#dfb135]">
                    {formatCurrency(monthlyVolume)}
                  </span>
                </div>

                <input
                  type="range"
                  min="1000000"
                  max="100000000"
                  step="1000000"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#dfb135]"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>₹10 Lakhs</span>
                  <span>₹2.5 Crores</span>
                  <span>₹5 Crores</span>
                  <span>₹10 Crores</span>
                </div>
              </div>

            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 rounded-2xl bg-[#061226] border border-slate-700/80 p-7 text-center space-y-5 shadow-2xl">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Estimated Monthly Commission Payout
              </span>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400">
                {formatCurrency(estimatedEarnings)}
              </div>

              <p className="text-xs text-slate-400">
                Projected annual revenue of <strong className="text-white">{formatCurrency(estimatedEarnings * 12)}</strong> directly credited into your partner account with automated TDS certificate issuance.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenRegister('dsa_agent')}
                  className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center justify-center space-x-1.5 transition"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Register as DSA Agent</span>
                </button>

                <button
                  onClick={() => onOpenRegister('retailer')}
                  className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition flex items-center justify-center space-x-1.5"
                >
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Retailer CSP Sign Up</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4-Step Onboarding Journey */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Seamless 4-Step Partner Onboarding
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Start punching customer files and earning institutional payouts today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-[#dfb135]/40 transition"
              >
                <div className="text-3xl font-black text-[#dfb135]/30 group-hover:text-[#dfb135] transition-colors mb-3">
                  {st.number}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
