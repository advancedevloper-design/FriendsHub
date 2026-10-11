import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Home, ShieldCheck, Sparkles, LogOut, ArrowRight, Briefcase } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [activeView, setActiveView] = useState<'home' | 'portal'>('home');
  const [lastRole, setLastRole] = useState<string>('retail_partner');
  const [showCredsModal, setShowCredsModal] = useState<boolean>(false);

  useEffect(() => {
    // Listen for cross-frame messages between Project 1 and Project 2
    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        if (event.data.type === 'LAUNCH_PORTAL' || event.data.type === 'LOGIN_SUCCESS') {
          setActiveView('portal');
          if (event.data.role) setLastRole(event.data.role);
        } else if (event.data.type === 'LAUNCH_HOME' || event.data.type === 'LOGOUT') {
          setActiveView('home');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleQuickLoginAs = (role: string) => {
    localStorage.setItem('finconnect_role', role);
    setLastRole(role);
    setActiveView('portal');
    setShowCredsModal(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#040e21]">
      
      {/* Top Floating View Toggle & Credentials Strip */}
      <div className="absolute top-2.5 right-4 z-50 flex items-center space-x-1.5 p-1 rounded-full bg-[#040e21]/95 border border-[#dfb135]/40 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => setActiveView('home')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeView === 'home'
              ? 'bg-[#dfb135] text-[#040e21] shadow-md shadow-[#dfb135]/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Project 1: Public Home Page (3D Metallic Card & Financial Services)"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Project 1 Home</span>
        </button>

        <button
          onClick={() => setActiveView('portal')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeView === 'portal'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Project 2: Login & Financial Products (FinConnect Hub & Banking Vault)"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Project 2 Portal</span>
        </button>

        <button
          onClick={() => setShowCredsModal(true)}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#0f274d] text-amber-300 border border-amber-400/40 hover:bg-[#18396f] transition-all cursor-pointer"
          title="View Staff, Operations, and Super Admin credentials & verification pipeline"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#dfb135]" />
          <span>Credentials & Roles</span>
        </button>
      </div>

      {/* Role Credentials & Verification Guide Modal */}
      {showCredsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#061530] border border-[#dfb135]/40 rounded-2xl p-6 max-w-2xl w-full text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCredsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-800 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🛡️</span>
              <h2 className="text-xl font-bold text-white">Staff, Operations & Super Admin Credentials</h2>
            </div>
            <p className="text-xs text-slate-300 mb-5">
              3-Tier Multi-Department Verification: New DSA registrations submitted on Home page must pass through all 3 gates before account activation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              {/* Super Admin */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                    <span>👑</span> Super Admin (Master)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">Tier 3 Final Activation</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Name:</strong> Vikramaditya Singhania</div>
                  <div><strong>Email:</strong> <code className="text-purple-300 font-mono">admin@friendskredit.com</code></div>
                  <div><strong>Mobile:</strong> <code className="font-mono">+91 98201 12345</code></div>
                  <div><strong>Password:</strong> <code className="text-amber-300 font-mono">Admin@Friends2026</code></div>
                  <div className="text-[11px] text-purple-300/80 pt-1">Authority: Final DSA activation sign-off, payout releases, staff management.</div>
                </div>
                <button
                  onClick={() => handleQuickLoginAs('super_admin')}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  <span>Launch Portal as Super Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Admin / Operations */}
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/40 relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                    <span>🏢</span> Admin / Operations Head
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Tier 2 Clearance</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Name:</strong> Priya Nair</div>
                  <div><strong>Email:</strong> <code className="text-indigo-300 font-mono">operations@friendskredit.com</code></div>
                  <div><strong>Mobile:</strong> <code className="font-mono">+91 98202 23456</code></div>
                  <div><strong>Password:</strong> <code className="text-amber-300 font-mono">Operations@2026</code></div>
                  <div className="text-[11px] text-indigo-300/80 pt-1">Authority: Channel partner agreements, banking SLA verification, disbursements.</div>
                </div>
                <button
                  onClick={() => handleQuickLoginAs('admin')}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  <span>Launch Portal as Operations Head</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Staff / Underwriter */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/40 relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-blue-300 flex items-center gap-1.5">
                    <span>📋</span> Staff / Senior Underwriter
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">Tier 1 Scrutiny</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Name:</strong> Rohit Sharma</div>
                  <div><strong>Email:</strong> <code className="text-blue-300 font-mono">underwriter@friendskredit.com</code></div>
                  <div><strong>Mobile:</strong> <code className="font-mono">+91 98203 34567</code></div>
                  <div><strong>Password:</strong> <code className="text-amber-300 font-mono">Underwriter@2026</code></div>
                  <div className="text-[11px] text-blue-300/80 pt-1">Authority: File & KYC scrutiny, borrower underwriting, initial DSA review.</div>
                </div>
                <button
                  onClick={() => handleQuickLoginAs('staff')}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  <span>Launch Portal as Underwriter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Certified Active Retail Partner */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                    <span>🤝</span> Active Retail Partner (DSA)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Activated</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Name:</strong> Sharma Financial Consultancy</div>
                  <div><strong>Code:</strong> <code className="text-emerald-300 font-mono">FK-RP-8041</code></div>
                  <div><strong>Email:</strong> <code className="font-mono">rajesh@sharmafin.com</code></div>
                  <div><strong>Mobile:</strong> <code className="font-mono">+91 98111 88442</code></div>
                  <div><strong>Password:</strong> <code className="text-amber-300 font-mono">Partner@2026</code></div>
                </div>
                <button
                  onClick={() => handleQuickLoginAs('retail_partner')}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  <span>Launch Portal as DSA Partner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#030c1c] border border-slate-700 text-xs text-slate-400 space-y-1.5">
              <div className="font-bold text-slate-200">How 3-Step DSA Activation Works:</div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-200 font-bold flex items-center justify-center text-[10px]">1</span>
                <span>Applicant fills DSA form on Home page ➔ Enters verification queue as <code className="text-amber-300">pending_underwriter</code>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-200 font-bold flex items-center justify-center text-[10px]">2</span>
                <span><strong>Staff Underwriter</strong> verifies KYC documents ➔ Transitions to <code className="text-amber-300">underwriter_verified</code>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 font-bold flex items-center justify-center text-[10px]">3</span>
                <span><strong>Operations Head</strong> checks agreement & bank account ➔ Transitions to <code className="text-amber-300">operations_verified</code>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-900 text-purple-200 font-bold flex items-center justify-center text-[10px]">4</span>
                <span><strong>Super Admin</strong> grants final sign-off ➔ Transitions to <code className="text-emerald-400 font-bold">active</code> with full portal login privileges.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main View Container */}
      <div className="w-full h-full">
        {activeView === 'home' ? (
          /* Project 1: Exact Home Page with zero modifications except login integration */
          <iframe
            src="/home.html"
            title="Friends Kredit - Main Home Page"
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; payment"
          />
        ) : (
          /* Project 2: Exact Login, Financial Products, and Operations Hub Portal */
          <iframe
            src="/portal.html"
            title="FinConnect Hub - Operations & Products Portal"
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; payment"
          />
        )}
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
