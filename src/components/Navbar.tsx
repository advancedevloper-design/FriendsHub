import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  LogIn, 
  UserPlus, 
  Briefcase, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  LayoutDashboard, 
  Building2, 
  FileText, 
  PhoneCall,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenLogin: (defaultRole?: UserRole) => void;
  onOpenRegister: (role: UserRole) => void;
  onOpenDashboard: () => void;
  currentView: 'home' | 'dashboard';
  setCurrentView: (v: 'home' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenRegister,
  onOpenDashboard,
  currentView,
  setCurrentView,
}) => {
  const { user, logout, switchDemoRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { label: 'Super Admin', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'staff':
        return { label: 'Underwriting Staff', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'dsa_agent':
        return { label: 'Channel DSA Agent', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'retailer':
        return { label: 'Retailer CSP', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      case 'customer':
      default:
        return { label: 'Verified Customer', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#040e21]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Banner with Helpline and Office Tag */}
      <div className="bg-gradient-to-r from-[#030914] via-[#0b192e] to-[#030914] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              RBI & Bank Partner Network • 75+ Lending Institutions
            </span>
            <span className="text-slate-400">
              Branch: Falta, South 24 PGS, West Bengal - 743513
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+916295788470" 
              className="flex items-center text-[#dfb135] hover:underline font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1" />
              Direct Helpline: +91 6295788470
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">TAT: Instant KYC in 15 mins</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => setCurrentView('home')} 
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#dfb135] via-[#b88c1c] to-[#785b0d] p-0.5 shadow-lg shadow-[#dfb135]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#040e21] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-xl text-[#dfb135] tracking-tighter">FK</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  Friends<span className="text-[#dfb135]">Kredit</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#dfb135]/15 text-[#dfb135] border border-[#dfb135]/30">
                  Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                YOUR TRUST, OUR CREDIT
              </p>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'text-[#dfb135] bg-[#dfb135]/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>
            <a
              href="#products"
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              Loan Products
            </a>
            <a
              href="#calculator"
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              EMI Calculator
            </a>
            <a
              href="#dsa-network"
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center space-x-1"
            >
              <Briefcase className="w-4 h-4 text-[#dfb135]" />
              <span>DSA Network</span>
            </a>
            <a
              href="#contact"
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              Falta Branch
            </a>
          </nav>

          {/* Right Actions: Auth & Dashboards */}
          <div className="hidden sm:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                {/* Role Switcher for instant testing */}
                <div className="relative">
                  <button
                    onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800 transition"
                    title="Quick Role Testing"
                  >
                    <span>Switch Role</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {roleSwitcherOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#08152c] border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Quick Demo Switcher
                      </div>
                      <button
                        onClick={() => { switchDemoRole('customer'); setRoleSwitcherOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-blue-500/20 hover:text-white flex items-center justify-between"
                      >
                        <span>Customer Profile</span>
                        <span className="text-[10px] text-blue-400">Borrower</span>
                      </button>
                      <button
                        onClick={() => { switchDemoRole('dsa_agent'); setRoleSwitcherOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-emerald-500/20 hover:text-white flex items-center justify-between"
                      >
                        <span>DSA Agent</span>
                        <span className="text-[10px] text-emerald-400">Channel Partner</span>
                      </button>
                      <button
                        onClick={() => { switchDemoRole('retailer'); setRoleSwitcherOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-cyan-500/20 hover:text-white flex items-center justify-between"
                      >
                        <span>Retailer CSP</span>
                        <span className="text-[10px] text-cyan-400">Shop Partner</span>
                      </button>
                      <button
                        onClick={() => { switchDemoRole('admin'); setRoleSwitcherOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-rose-500/20 hover:text-white flex items-center justify-between"
                      >
                        <span>Super Admin</span>
                        <span className="text-[10px] text-rose-400">Governance</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Dashboard Button */}
                <button
                  onClick={onOpenDashboard}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md ${
                    currentView === 'dashboard'
                      ? 'bg-[#dfb135] text-[#040e21] shadow-[#dfb135]/20 ring-2 ring-[#dfb135]'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${getRoleBadge(user.role).bg}`}>
                    {getRoleBadge(user.role).label}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    logout();
                    setCurrentView('home');
                  }}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Login Button */}
                <button
                  onClick={() => onOpenLogin()}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-[#dfb135]" />
                  <span>Login</span>
                </button>

                {/* Register Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setRegisterDropdownOpen(!registerDropdownOpen)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#040e21] bg-gradient-to-r from-[#dfb135] via-[#efc44b] to-[#dfb135] hover:brightness-110 transition shadow-lg shadow-[#dfb135]/25"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {registerDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#08152c] border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                      <button
                        onClick={() => {
                          onOpenRegister('customer');
                          setRegisterDropdownOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition group"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-blue-300">
                              Customer Account
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Instant KYC loans & cards
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          onOpenRegister('dsa_agent');
                          setRegisterDropdownOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition group border-t border-slate-800/80 mt-1"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                              DSA Agent Partner
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Earn up to 3% commission
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          onOpenRegister('retailer');
                          setRegisterDropdownOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition group border-t border-slate-800/80 mt-1"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                              Retailer / CSP Counter
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Customer Service Point login
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <button
                onClick={onOpenDashboard}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#dfb135] text-[#040e21]"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071328] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center text-sm font-medium">
            <button
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-800/50 text-white"
            >
              Home
            </button>
            <a
              href="#products"
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-800/50 text-white"
            >
              Loan Products
            </a>
            <a
              href="#calculator"
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-800/50 text-white"
            >
              EMI Calculator
            </a>
            <a
              href="#dsa-network"
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-800/50 text-white"
            >
              DSA Network
            </a>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{user.displayName}</div>
                    <div className="text-[11px] text-slate-400">{user.email}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getRoleBadge(user.role).bg}`}>
                    {getRoleBadge(user.role).label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { onOpenDashboard(); setMobileMenuOpen(false); }}
                    className="p-2.5 rounded-xl text-center text-xs font-bold bg-[#dfb135] text-[#040e21]"
                  >
                    Open Dashboard
                  </button>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); setCurrentView('home'); }}
                    className="p-2.5 rounded-xl text-center text-xs font-bold bg-slate-800 text-rose-400"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-slate-800 text-white border border-slate-700 flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4 text-[#dfb135]" />
                  <span>Customer & Partner Login</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { onOpenRegister('customer'); setMobileMenuOpen(false); }}
                    className="py-2.5 rounded-xl text-center text-xs font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  >
                    Customer Register
                  </button>
                  <button
                    onClick={() => { onOpenRegister('dsa_agent'); setMobileMenuOpen(false); }}
                    className="py-2.5 rounded-xl text-center text-xs font-bold bg-[#dfb135] text-[#040e21]"
                  >
                    DSA Partner Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
