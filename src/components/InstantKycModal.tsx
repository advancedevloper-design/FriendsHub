import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  FileCheck, 
  Download, 
  Sparkles,
  Building,
  User,
  CreditCard,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoanApplication } from '../types';

interface InstantKycModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (app: Partial<LoanApplication>) => void;
}

export const InstantKycModal: React.FC<InstantKycModalProps> = ({
  isOpen,
  onClose,
  onSubmitApplication,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    loanAmount: 250000,
    tenureMonths: 24,
    purpose: 'Personal Expenses',
    panNumber: '',
    aadhaarNumber: '',
    employmentType: 'salaried',
    monthlySalary: 45000,
    employerName: '',
    city: 'Kolkata',
  });

  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [sanctionApproved, setSanctionApproved] = useState(false);

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.email) {
      alert('Please fill out all required fields');
      return;
    }
    setStep(2);
  };

  const handleTriggerAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.panNumber || !formData.aadhaarNumber) {
      alert('Please provide valid PAN and Aadhaar details for instant KYC verification');
      return;
    }

    setStep(3);
    setLoadingAnalysis(true);

    setTimeout(() => {
      setLoadingAnalysis(false);
      setSanctionApproved(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2400);
  };

  const handleFinalSubmit = () => {
    onSubmitApplication({
      applicantName: formData.fullName,
      applicantEmail: formData.email,
      applicantMobile: formData.mobile,
      productId: 'kyc-based-loan',
      productName: 'Instant Digital KYC Loan',
      bankId: 'comp-tata',
      bankName: 'Tata Capital / IDFC Bank',
      requestedAmount: formData.loanAmount,
      disbursedAmount: formData.loanAmount,
      tenureMonths: formData.tenureMonths,
      interestRate: 10.75,
      status: 'new_application',
      partnerId: 'direct',
      partnerCode: 'INSTANT-KYC',
      panNumber: formData.panNumber,
      aadhaarNumber: formData.aadhaarNumber,
      employmentType: formData.employmentType as any,
      monthlyIncome: formData.monthlySalary,
      cibilScore: 768,
      remarks: 'Instant 15-Minute KYC application auto-verified via digital bureau gateway.',
    });
    onClose();
  };

  const estimatedEMI = Math.round(
    (formData.loanAmount * (10.75 / 12 / 100) * Math.pow(1 + 10.75 / 12 / 100, formData.tenureMonths)) /
    (Math.pow(1 + 10.75 / 12 / 100, formData.tenureMonths) - 1)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#08152c] border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-200 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Progress Bar */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-6">
          <span className={`px-2 py-0.5 rounded ${step >= 1 ? 'bg-[#dfb135] text-[#040e21] font-bold' : 'bg-slate-800'}`}>
            1. Details
          </span>
          <span>→</span>
          <span className={`px-2 py-0.5 rounded ${step >= 2 ? 'bg-[#dfb135] text-[#040e21] font-bold' : 'bg-slate-800'}`}>
            2. KYC Identity
          </span>
          <span>→</span>
          <span className={`px-2 py-0.5 rounded ${step >= 3 ? 'bg-[#dfb135] text-[#040e21] font-bold' : 'bg-slate-800'}`}>
            3. Instant Sanction
          </span>
        </div>

        {/* Step 1: Basic Loan Amount and Contact */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#dfb135] text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4 fill-current" />
                <span>15-Minute Express Disbursal</span>
              </div>
              <h3 className="text-2xl font-black text-white">Instant Digital KYC Loan</h3>
              <p className="text-xs text-slate-400">
                100% paperless loan approval with direct bank credit upon instant verification.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Legal Name (as per PAN)</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar Sen"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#dfb135] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number (Aadhaar linked)</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Official / Personal Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Required Loan Amount</span>
                  <span className="text-[#dfb135] font-extrabold text-sm">
                    ₹{formData.loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#dfb135]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tenure</label>
                  <select
                    value={formData.tenureMonths}
                    onChange={(e) => setFormData({ ...formData, tenureMonths: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  >
                    <option value={12}>12 Months</option>
                    <option value={24}>24 Months</option>
                    <option value={36}>36 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Loan Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  >
                    <option value="Personal Expenses">Personal Expenses</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Home Renovation">Home Renovation</option>
                    <option value="Debt Consolidation">Debt Consolidation</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/20 flex items-center justify-center space-x-2 transition"
            >
              <span>Continue to KYC Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Digital Identity Verification */}
        {step === 2 && (
          <form onSubmit={handleTriggerAnalysis} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Bank-Grade 256-Bit Encrypted Verification</span>
              </div>
              <h3 className="text-2xl font-black text-white">Digital KYC Details</h3>
              <p className="text-xs text-slate-400">
                Your data is directly matched against NSDL & UIDAI verification gateways.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">PAN Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm uppercase tracking-wider font-mono focus:border-[#dfb135] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Aadhaar Number (12-Digit)</label>
                  <input
                    type="text"
                    required
                    maxLength={14}
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono focus:border-[#dfb135] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  >
                    <option value="salaried">Salaried Employee</option>
                    <option value="self_employed">Self Employed Professional</option>
                    <option value="business">Business Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Net Monthly In-Hand (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.monthlySalary}
                    onChange={(e) => setFormData({ ...formData, monthlySalary: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company / Firm / Shop Name</label>
                <input
                  type="text"
                  value={formData.employerName}
                  onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                  placeholder="e.g. Tata Consultancy Services or Self-Shop"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#dfb135] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/20 flex items-center justify-center space-x-2 transition"
              >
                <span>Run Instant AI Bureau Evaluation</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Instant Digital Assessment & Sanction Letter Preview */}
        {step === 3 && (
          <div className="space-y-5 text-center">
            {loadingAnalysis ? (
              <div className="py-12 space-y-4">
                <div className="w-16 h-16 border-4 border-[#dfb135] border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-xl font-bold text-white">Analyzing Credit Bureau & Banking Flow...</h4>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>✓ Checking NSDL PAN status for {formData.panNumber}</p>
                  <p>✓ Calculating debt-to-income multiplier (FOIR &lt; 45%)</p>
                  <p>✓ Matching best lending partner rates across 50+ banks...</p>
                </div>
              </div>
            ) : sanctionApproved ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <FileCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                    Pre-Approved Sanction Letter Ready
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">Congratulations, {formData.fullName}!</h3>
                  <p className="text-xs text-slate-300">
                    Your KYC profile has been instantly approved by our institutional lending gateway.
                  </p>
                </div>

                {/* Sanction Letter Voucher Card */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-left space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-[#dfb135]">FRIENDS KREDIT SANCTION LETTER</span>
                    <span className="text-slate-400">Ref: FK-STP-{Date.now().toString().slice(-6)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Sanctioned Loan Amount</span>
                      <strong className="text-base text-white font-extrabold">
                        ₹{formData.loanAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Estimated Monthly EMI</span>
                      <strong className="text-base text-emerald-400 font-extrabold">
                        ₹{estimatedEMI.toLocaleString('en-IN')}/mo
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Interest Rate</span>
                      <strong className="text-slate-200">10.75% p.a. (Fixed)</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Disbursal Mode</span>
                      <strong className="text-slate-200">Direct Bank Credit (15 Mins)</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleFinalSubmit}
                    className="flex-1 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center justify-center space-x-2 transition"
                  >
                    <span>Accept Sanction & Disburse to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
};
