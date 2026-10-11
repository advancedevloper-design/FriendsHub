import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  CreditCard, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Calendar,
  Building2,
  PhoneCall
} from 'lucide-react';
import { LoanApplication, UserProfile } from '../../types';

interface CustomerDashboardProps {
  user: UserProfile;
  applications: LoanApplication[];
  onOpenNewApplication: () => void;
  onOpenInstantKyc: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  user,
  applications,
  onOpenNewApplication,
  onOpenInstantKyc,
}) => {
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);

  // Filter applications belonging to this customer
  const userApps = applications.filter(
    (a) =>
      a.applicantEmail.toLowerCase() === user.email.toLowerCase() ||
      a.applicantName.toLowerCase() === user.displayName.toLowerCase()
  );

  const totalSanctioned = userApps
    .filter((a) => a.status === 'disbursed' || a.status === 'ready_to_release')
    .reduce((sum, a) => sum + (a.disbursedAmount || a.requestedAmount), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disbursed':
        return { label: 'Disbursed & Active', color: 'bg-emerald-950/60 text-emerald-400 border-emerald-800' };
      case 'ready_to_release':
      case 'pending_disburse':
        return { label: 'Sanction Approved', color: 'bg-blue-950/60 text-blue-400 border-blue-800' };
      case 'under_process':
        return { label: 'At Bank Underwriting', color: 'bg-amber-950/60 text-amber-400 border-amber-800' };
      case 'new_application':
      default:
        return { label: 'Under Document Triage', color: 'bg-purple-950/60 text-purple-400 border-purple-800' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0a1e3d] via-[#07172e] to-[#0a1e3d] border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Borrower Account Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {user.displayName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {user.email} • {user.city || 'Kolkata, WB'} • UID: {user.id.slice(0, 10)}
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onOpenInstantKyc}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/20 flex items-center justify-center space-x-1.5 transition"
          >
            <span>15-Min Instant Loan</span>
          </button>

          <button
            onClick={onOpenNewApplication}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center space-x-1.5 transition"
          >
            <Plus className="w-4 h-4 text-[#dfb135]" />
            <span>Apply for Loan</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Applications</div>
          <div className="text-2xl font-black text-white mt-1">
            {userApps.length} File{userApps.length === 1 ? '' : 's'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Submitted across partner banks</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Sanctioned Amount</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            ₹{totalSanctioned.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Ready or Disbursed credit lines</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Average Rate Matched</div>
          <div className="text-2xl font-black text-[#dfb135] mt-1">
            10.25% p.a.
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Benchmark institutional rate</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Assigned Branch RM</div>
          <div className="text-sm font-bold text-white mt-1 flex items-center space-x-1.5">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Falta Regional Hub</span>
          </div>
          <a href="tel:+916295788470" className="text-[11px] text-[#dfb135] hover:underline mt-1 block">
            Direct Line: +91 6295788470
          </a>
        </div>
      </div>

      {/* Applications List */}
      <div className="rounded-3xl bg-[#08152c] border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Your Loan Applications & Sanctions</h3>
            <p className="text-xs text-slate-400">Track underwriting stages, sanction documents, and disbursal progress.</p>
          </div>
        </div>

        {userApps.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">No Loan Applications Logged Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven&apos;t submitted any loan applications under this profile yet. Apply now for instant 15-minute verification.
              </p>
            </div>
            <button
              onClick={onOpenInstantKyc}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#040e21] bg-[#dfb135] hover:brightness-110"
            >
              Start Instant Digital KYC
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Product & Lender</th>
                  <th className="py-3 px-4">Amount Requested</th>
                  <th className="py-3 px-4">Tenure / Rate</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-200">
                {userApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{app.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{app.productName}</div>
                      <div className="text-[11px] text-slate-400">{app.bankName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#dfb135]">
                      ₹{app.requestedAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{app.tenureMonths} Months</div>
                      <div className="text-[11px] text-slate-400">{app.interestRate}% p.a.</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(app.status).color}`}>
                        {getStatusBadge(app.status).label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] border border-slate-700"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Detail Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#08152c] border border-slate-700 p-6 sm:p-8 text-slate-200 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400">File Dossier</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedApp.id}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Product</span>
                <strong className="text-white">{selectedApp.productName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Lender Bank</span>
                <strong className="text-white">{selectedApp.bankName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Requested Amount</span>
                <strong className="text-[#dfb135] text-sm">₹{selectedApp.requestedAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tenure</span>
                <strong className="text-slate-200">{selectedApp.tenureMonths} Months</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-300 block">Underwriting Remarks:</span>
              <p className="text-slate-400">{selectedApp.remarks || 'Under active review by partner bank credit desk.'}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  alert(`Downloaded sanction slip for ${selectedApp.id}`);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#040e21] bg-[#dfb135] hover:brightness-110 flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sanction Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
