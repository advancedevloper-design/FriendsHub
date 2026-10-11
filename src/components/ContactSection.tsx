import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Personal Loan',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', service: 'Personal Loan', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#020712] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#dfb135]/10 border border-[#dfb135]/30 text-[#dfb135] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Regional Headquarters & Branches</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visit Our Falta Hub or Connect With An Advisor
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Walk into our regional financial centre or reach our dedicated credit desk for immediate file assistance and partnership inquiries.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Contact Details Card */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#0a1e3d] to-[#051124] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Falta Main Regional Center</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Serving South 24 Parganas, Greater Kolkata, and all 28 Indian States through our integrated digital DSA distribution network.
            </p>

            <div className="space-y-4 pt-2 text-xs sm:text-sm">
              <div className="flex items-start space-x-3 text-slate-200">
                <MapPin className="w-5 h-5 text-[#dfb135] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Registered Regional Office</strong>
                  <span>Falta, South 24 Parganas, West Bengal, PIN - 743513, India</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-200">
                <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Direct Phone Helpline</strong>
                  <a href="tel:+916295788470" className="text-[#dfb135] hover:underline font-bold text-sm">
                    +91 6295788470
                  </a>
                  <span className="block text-[11px] text-slate-400">Available Mon-Sat: 9:30 AM – 7:00 PM</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-200">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Official Correspondence</strong>
                  <span className="text-slate-300">support@friendskredit.com</span>
                  <span className="block text-[11px] text-slate-400">partner-support@friendskredit.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-200">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Processing Hours</strong>
                  <span>Digital Gateway: 24/7/365 Available</span>
                  <span className="block text-[11px] text-slate-400">Underwriting Desk: Mon - Sat (9:30 AM to 7:00 PM)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-slate-700/60 text-xs text-slate-300">
              <span className="text-[#dfb135] font-bold block mb-1">DSA Partner Walk-In Desk</span>
              Authorized retailers and agents can collect marketing kits, bank authorization letters, and offline application dossiers during office hours.
            </div>
          </div>

          {/* Quick Enquiry / Lead Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#08152c] border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">Submit Fast-Track Enquiry</h3>
            <p className="text-xs text-slate-400 mb-6">
              Our regional credit relationship managers respond within 30 minutes during working hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Enquiry Successfully Logged!</h4>
                <p className="text-xs text-slate-300">
                  Our credit manager will call you shortly on your provided phone number. Reference ID: <strong className="text-[#dfb135]">ENQ-{Date.now().toString().slice(-5)}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Subir Mukherjee"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Contact Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Required Service</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                    >
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Instant Digital KYC">Instant Digital KYC</option>
                      <option value="Business & MSME Loan">Business & MSME Loan</option>
                      <option value="Home Loan & LAP">Home Loan & LAP</option>
                      <option value="Auto / Commercial Vehicle">Auto / Commercial Vehicle</option>
                      <option value="DSA Partner Onboarding">DSA Partner Onboarding</option>
                      <option value="Retailer CSP Setup">Retailer CSP Setup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Specific Requirements or Loan Amount</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide loan amount requirement or partnership queries..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/20 flex items-center justify-center space-x-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit to Falta Credit Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
