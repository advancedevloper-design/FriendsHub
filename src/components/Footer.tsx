import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Lock, FileText, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02050d] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#dfb135] to-[#8d6910] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#040e21] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-base text-[#dfb135]">FK</span>
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Friends<span className="text-[#dfb135]">Kredit</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India&apos;s premier 3D digital financial gateway and national DSA channel network. Empowering borrowers with lowest institutional rates and partners with highest commission disbursements.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfb135] shrink-0" />
                <span>Falta, South 24 PGS, West Bengal, 743513</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+916295788470" className="hover:text-white">+91 6295788470</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>support@friendskredit.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Products */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Lending Products</h4>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-[#dfb135] transition">Instant Digital KYC</a></li>
              <li><a href="#products" className="hover:text-[#dfb135] transition">Personal Loans</a></li>
              <li><a href="#products" className="hover:text-[#dfb135] transition">Business & MSME</a></li>
              <li><a href="#products" className="hover:text-[#dfb135] transition">Home Loans & LAP</a></li>
              <li><a href="#products" className="hover:text-[#dfb135] transition">Vehicle & Tractor Loans</a></li>
              <li><a href="#products" className="hover:text-[#dfb135] transition">Credit Cards & Demat</a></li>
            </ul>
          </div>

          {/* Channel Network */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Partner Network</h4>
            <ul className="space-y-2">
              <li><a href="#dsa-network" className="hover:text-[#dfb135] transition">DSA Commission Slabs</a></li>
              <li><a href="#dsa-network" className="hover:text-[#dfb135] transition">Earnings Calculator</a></li>
              <li><a href="#dsa-network" className="hover:text-[#dfb135] transition">Retailer CSP Counters</a></li>
              <li><a href="#products" className="hover:text-[#dfb135] transition">50+ Bank Vault Portals</a></li>
              <li><a href="#contact" className="hover:text-[#dfb135] transition">Falta Partner Desk</a></li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Trust & Security</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <p>Direct institutional API tie-ups with RBI regulated banks and registered NBFCs.</p>
              <p className="text-[11px] text-slate-400">
                Friends Kredit does not charge any upfront cash fees for loan sanctions. Beware of fraudulent impostors.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong>Disclaimer:</strong> Friends Kredit functions as an authorized corporate direct selling agent (DSA) and referral lending facilitator. Loan approval, credit limits, interest rates, and final disbursal are strictly subject to individual lender credit appraisal, credit bureau (CIBIL/Experian) verification, and statutory norms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-2">
            <span>© 2026 Friends Kredit Financial Services. All Rights Reserved.</span>
            <div className="flex space-x-4">
              <span className="hover:text-slate-300">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-300">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-300">Grievance Officer</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
