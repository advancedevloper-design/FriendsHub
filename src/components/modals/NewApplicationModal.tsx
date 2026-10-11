import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Percent, 
  User, 
  Phone, 
  Mail,
  Coins
} from 'lucide-react';
import { FINANCIAL_PRODUCTS } from '../../data/products';
import { BANK_VAULT_ITEMS } from '../../data/bankVault';
import { LoanApplication, UserProfile } from '../../types';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (app: Partial<LoanApplication>) => void;
  currentUser: UserProfile;
}

export const NewApplicationModal: React.FC<NewApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
}) => {
  const isPartner = currentUser.role === 'dsa_agent' || currentUser.role === 'retailer';

  const [productId, setProductId] = useState(FINANCIAL_PRODUCTS[0].id);
  const [bankId, setBankId] = useState(BANK_VAULT_ITEMS[0].id);
  const [requestedAmount, setRequestedAmount] = useState<number>(500000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [applicantName, setApplicantName] = useState(
    isPartner ? '' : currentUser.displayName || ''
  );
  const [applicantEmail, setApplicantEmail] = useState(
    isPartner ? '' : currentUser.email || ''
  );
  const [applicantMobile, setApplicantMobile] = useState(
    isPartner ? '' : currentUser.phone || ''
  );
  const [panNumber, setPanNumber] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45000);
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self_employed' | 'business'>('salaried');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const selectedProduct = FINANCIAL_PRODUCTS.find((p) => p.id === productId) || FINANCIAL_PRODUCTS[0];
  const selectedBank = BANK_VAULT_ITEMS.find((b) => b.id === bankId) || BANK_VAULT_ITEMS[0];

  const estimatedCommission = isPartner
    ? Math.round(requestedAmount * 0.015) // ~1.5% average
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newApp: Partial<LoanApplication> = {
      applicantName,
      applicantEmail,
      applicantMobile,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      bankId: selectedBank.id,
      bankName: selectedBank.name,
      requestedAmount,
      tenureMonths,
      interestRate: 10.5,
      status: 'new_application',
      partnerId: isPartner ? currentUser.id : 'direct',
      partnerCode: isPartner ? currentUser.partnerCode || 'RP-DIRECT' : 'DIRECT-PORTAL',
      partnerName: isPartner ? currentUser.displayName : 'Direct Customer',
      commissionAmount: estimatedCommission,
      commissionStatus: 'pending',
      panNumber: panNumber.toUpperCase(),
      employmentType,
      monthlyIncome,
      cibilScore: 745,
      remarks: `Submitted via ${currentUser.role.toUpperCase()} console. Ready for initial triage.`,
    };

    onSubmit(newApp);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#08152c] border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb135] bg-[#dfb135]/10 px-2.5 py-0.5 rounded-full border border-[#dfb135]/30">
            {isPartner ? 'Channel Partner File Punch' : 'Direct Loan Application'}
          </span>
          <h3 className="text-2xl font-black text-white mt-1">
            {isPartner ? 'Submit Client Loan Application' : 'Apply for Institutional Loan'}
          </h3>
          <p className="text-xs text-slate-400">
            {isPartner
              ? 'Enter applicant details to punch file into underwriting queue and lock commission.'
              : 'Direct loan application with rate matching across 50+ banking partners.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Product & Bank Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Financial Product</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              >
                {FINANCIAL_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Lending Institution</label>
              <select
                value={bankId}
                onChange={(e) => setBankId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              >
                {BANK_VAULT_ITEMS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.partnerCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount & Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Requested Loan Amount (₹)</label>
              <input
                type="number"
                required
                min={25000}
                max={50000000}
                step={25000}
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Loan Tenure (Months)</label>
              <select
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              >
                <option value={12}>12 Months (1 Year)</option>
                <option value={24}>24 Months (2 Years)</option>
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
                <option value={120}>120 Months (10 Years)</option>
                <option value={240}>240 Months (20 Years)</option>
              </select>
            </div>
          </div>

          {/* Applicant Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Applicant Full Name</label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Subhashish Roy"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Applicant Mobile Number</label>
              <input
                type="tel"
                required
                value={applicantMobile}
                onChange={(e) => setApplicantMobile(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Applicant Email</label>
              <input
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="client@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">PAN Card Number</label>
              <input
                type="text"
                required
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm uppercase font-mono focus:border-[#dfb135] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Monthly Income (₹)</label>
              <input
                type="number"
                required
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Employment Profile</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'salaried', label: 'Salaried' },
                { id: 'self_employed', label: 'Self Employed' },
                { id: 'business', label: 'Business Owner' },
              ].map((emp) => (
                <button
                  type="button"
                  key={emp.id}
                  onClick={() => setEmploymentType(emp.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition text-center ${
                    employmentType === emp.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {emp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Partner Commission Preview Box */}
          {isPartner && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-emerald-300">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span>Estimated Partner Payout on Disbursal:</span>
              </div>
              <span className="font-extrabold text-white text-sm">
                ₹{estimatedCommission.toLocaleString('en-IN')} (approx. 1.5%)
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Submit File into Underwriting Pipeline</span>
          </button>
        </form>

      </div>
    </div>
  );
};
