import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  Users, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Filter, 
  Building2, 
  FileCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { LoanApplication, CommissionRecord, UserProfile } from '../../types';

interface AdminDashboardProps {
  user: UserProfile;
  applications: LoanApplication[];
  commissions: CommissionRecord[];
  onUpdateApplicationStatus: (appId: string, newStatus: any, disbursedAmount?: number) => void;
  onReleaseCommission: (commId: string) => void;
  onCleanDemoData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  applications,
  commissions,
  onUpdateApplicationStatus,
  onReleaseCommission,
  onCleanDemoData,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [cleanModalOpen, setCleanModalOpen] = useState(false);

  const totalDisbursed = applications
    .filter((a) => a.status === 'disbursed')
    .reduce((sum, a) => sum + (a.disbursedAmount || a.requestedAmount), 0);

  const releasedCommissions = commissions
    .filter((c) => c.payoutStatus === 'released')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const pendingLiability = commissions
    .filter((c) => c.payoutStatus !== 'released')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const filteredApps = applications.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  const exportCSV = () => {
    const headers = 'App ID,Applicant,Mobile,Product,Bank,Requested,Disbursed,Status,Partner,Commission\n';
    const rows = applications.map((a) =>
      `"${a.id}","${a.applicantName}","${a.applicantMobile}","${a.productName}","${a.bankName}",${a.requestedAmount},${a.disbursedAmount || 0},"${a.status}","${a.partnerName || 'Direct'}",${a.commissionAmount || 0}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FriendsKredit_Pipeline_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Executive Header Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1a0f2b] via-[#0f172a] to-[#040e21] border border-rose-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin Executive Governance & Finance Center</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Lending Operations & Commission Clearinghouse
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            Pipeline file velocity • Sanction verification • Post-disbursement commission audit • System audit trail
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center space-x-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-[#dfb135]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setCleanModalOpen(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 flex items-center space-x-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clean Demo Data</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Cumulative Disbursed</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            ₹{totalDisbursed.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Across successfully sanctioned files</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Released Partner Commission</div>
          <div className="text-2xl font-black text-white mt-1">
            ₹{releasedCommissions.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Locked & paid out into ledgers</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Pending Commission Liability</div>
          <div className="text-2xl font-black text-[#dfb135] mt-1">
            ₹{pendingLiability.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-400 mt-1">Awaiting verification or release</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Live Applications in Pipeline</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">
            {applications.length} Files
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Active institutional files</div>
        </div>
      </div>

      {/* Live Applications Processing Pipeline */}
      <div className="rounded-3xl bg-[#08152c] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Live Application Processing Pipeline</h3>
            <p className="text-xs text-slate-400">
              Manage file triage, sanction approvals, disbursals, and partner commission verification.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Files' },
              { id: 'new_application', label: 'New Files' },
              { id: 'under_process', label: 'Underwriting' },
              { id: 'pending_disburse', label: 'Sanctioned' },
              { id: 'ready_to_release', label: 'Ready to Payout' },
              { id: 'disbursed', label: 'Disbursed' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterStatus === f.id
                    ? 'bg-[#dfb135] text-[#040e21] font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">File ID</th>
                <th className="py-3 px-4">Retail Partner</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product & Bank</th>
                <th className="py-3 px-4">Req / Disbursed</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-200">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">{app.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">{app.partnerName || 'Direct'}</div>
                    <div className="text-[11px] text-[#dfb135] font-mono">{app.partnerCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-400">{app.applicantMobile}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white font-medium">{app.productName}</div>
                    <div className="text-[11px] text-cyan-400">{app.bankName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">₹{app.requestedAmount.toLocaleString('en-IN')}</div>
                    {app.disbursedAmount ? (
                      <div className="text-[10px] text-emerald-400 font-bold">
                        Disbursed: ₹{app.disbursedAmount.toLocaleString('en-IN')}
                      </div>
                    ) : null}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as any)}
                      className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] font-semibold focus:outline-none focus:border-[#dfb135]"
                    >
                      <option value="new_application">New Application</option>
                      <option value="under_process">Under Process</option>
                      <option value="pending_disburse">Pending Disburse</option>
                      <option value="commission_verify">Commission Verify</option>
                      <option value="ready_to_release">Ready to Release</option>
                      <option value="disbursed">Disbursed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">
                    ₹{(app.commissionAmount || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    {app.status === 'ready_to_release' ? (
                      <button
                        onClick={() => {
                          onUpdateApplicationStatus(app.id, 'disbursed', app.requestedAmount);
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-500 text-[#040e21] font-bold text-[11px] hover:brightness-110 shadow"
                      >
                        Release Payout
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] border border-slate-700"
                      >
                        Inspect
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clean Demo Data Modal */}
      {cleanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-[#08152c] border border-rose-800 p-6 sm:p-8 text-slate-200 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-white">Clean Demo Data for Production Launch</h3>
              <p className="text-xs text-slate-400">
                This will reset sample test applications so you can start with a fresh pipeline.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-white block">What remains 100% intact:</span>
              <p>✓ All 50+ Lending Banks & NBFCs</p>
              <p>✓ Configured Loan Products & Commission Slabs</p>
              <p>✓ Encrypted Bank Vault Credentials</p>
              <p>✓ Registered Partner & Admin Accounts</p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setCleanModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onCleanDemoData();
                  setCleanModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect File Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#08152c] border border-slate-700 p-6 text-slate-200 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase font-bold text-[#dfb135]">Audit File</span>
                <h3 className="text-xl font-bold text-white">{selectedApp.id}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Applicant</span>
                <strong className="text-white">{selectedApp.applicantName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PAN / Mobile</span>
                <strong className="text-white">{selectedApp.panNumber || 'NSDL Verified'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CIBIL Bureau Score</span>
                <strong className="text-emerald-400">{selectedApp.cibilScore || 750}+</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Monthly Income</span>
                <strong className="text-white">₹{(selectedApp.monthlyIncome || 50000).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#040e21] bg-[#dfb135]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
