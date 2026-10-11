import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Briefcase, 
  Building2, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Phone,
  Mail,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: (defaultRole?: UserRole) => void;
  initialRole?: UserRole;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  initialRole = 'customer',
}) => {
  const { registerUser } = useAuth();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRegistered, setSuccessRegistered] = useState<{
    displayName: string;
    email: string;
    role: UserRole;
    partnerCode?: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // DSA / Retailer specific
    businessName: '',
    panNumber: '',
    address: '',
    city: '',
    state: 'West Bengal',
    pincode: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if ((role === 'dsa_agent' || role === 'retailer') && !formData.panNumber) {
      setErrorMsg('PAN number is mandatory for DSA & Retailer compliance');
      return;
    }

    setSubmitting(true);
    try {
      const created = await registerUser({
        displayName: formData.displayName,
        email: formData.email,
        password: formData.password,
        role,
        phone: formData.phone,
        businessName: formData.businessName,
        panNumber: formData.panNumber.toUpperCase(),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode.toUpperCase(),
      });

      setSubmitting(false);
      setSuccessRegistered({
        displayName: created.displayName,
        email: created.email,
        role: created.role,
        partnerCode: created.partnerCode,
      });
    } catch (err: any) {
      setSubmitting(false);
      setErrorMsg(err.message || 'Registration failed. This email may already be in use.');
    }
  };

  const handleRedirectToLogin = () => {
    onClose();
    onOpenLogin(role);
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

        {successRegistered ? (
          /* Success Screen redirecting to Login */
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">Registration Successful!</h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your profile for <strong className="text-white">{successRegistered.displayName}</strong> has been registered and secured in Cloud Firestore.
            </p>

            {successRegistered.partnerCode && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-[#dfb135]/40 max-w-sm mx-auto space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Assigned Partner Code
                </span>
                <div className="text-2xl font-black text-[#dfb135] tracking-widest font-mono">
                  {successRegistered.partnerCode}
                </div>
                <p className="text-[11px] text-slate-400">
                  Use this tracking code for bank logins and commission attribution.
                </p>
              </div>
            )}

            <div className="pt-4 max-w-xs mx-auto">
              <button
                onClick={handleRedirectToLogin}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] via-[#efc44b] to-[#dfb135] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center justify-center space-x-2 transition"
              >
                <span>Proceed to Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div>
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#dfb135]/10 border border-[#dfb135]/30 text-[#dfb135] text-xs font-semibold">
                <UserPlus className="w-3.5 h-3.5" />
                <span>New Account Registration</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Join Friends Kredit
              </h3>
              <p className="text-xs text-slate-400">
                Register as a borrower, channel DSA agent, or retail CSP shop partner.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  role === 'customer'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('dsa_agent')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  role === 'dsa_agent'
                    ? 'bg-[#dfb135] text-[#040e21] shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>DSA Agent</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('retailer')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  role === 'retailer'
                    ? 'bg-cyan-500 text-[#040e21] shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Retailer CSP</span>
              </button>
            </div>

            {/* Error Display */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Common Personal Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {role === 'customer' ? 'Full Legal Name' : 'Authorized Signatory Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="e.g. Sandip Banerjee"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Contact (WhatsApp enabled)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@friendskredit.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Falta, South 24 PGS"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>
              </div>

              {/* Specific fields for DSA Agent and Retailer */}
              {(role === 'dsa_agent' || role === 'retailer') && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#dfb135] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Business & Payout Account Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {role === 'dsa_agent' ? 'Agency / Consultancy Firm Name' : 'Shop / CSP Kendra Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder={role === 'dsa_agent' ? 'e.g. FinPro Advisory' : 'e.g. Maa Tara Digital CSP'}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">PAN Card Number (Business/Proprietor)</label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                        placeholder="ABCDE1234F"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm uppercase font-mono focus:border-[#dfb135] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Payout Bank Name</label>
                      <input
                        type="text"
                        required
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        placeholder="e.g. State Bank of India"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Account Number</label>
                      <input
                        type="text"
                        required
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                        placeholder="50100293849102"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        required
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                        placeholder="SBIN0008831"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-mono focus:border-[#dfb135] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Physical Office / Shop Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Shop No 4, Market Complex, Falta Road"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Create Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#dfb135] focus:outline-none"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2 flex items-start space-x-2 text-xs text-slate-400">
                <input type="checkbox" required defaultChecked className="mt-0.5 rounded accent-[#dfb135]" />
                <span>
                  I agree to the Friends Kredit Partner Agreement, DSA Code of Conduct, and consent to digital KYC credit bureau verification.
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] via-[#efc44b] to-[#dfb135] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                {submitting ? (
                  <span>Registering Account in Cloud Database...</span>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Redirection to Login */}
            <div className="mt-5 text-center text-xs text-slate-400">
              <span>Already registered? </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenLogin(role);
                }}
                className="text-[#dfb135] hover:underline font-bold"
              >
                Sign In to Existing Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
