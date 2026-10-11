import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  Coins, 
  ExternalLink, 
  FileText, 
  Key, 
  Plus, 
  Copy, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Download,
  AlertCircle
} from 'lucide-react';
import { 
  LoanApplication, 
  UserProfile, 
  BankVaultItem, 
  PolicyDocument, 
  CommissionRecord 
} from '../../types';
import { BANK_VAULT_ITEMS, POLICY_DOCUMENTS } from '../../data/bankVault';

interface PartnerDashboardProps {
  user: UserProfile;
  applications: LoanApplication[];
  commissions: CommissionRecord[];
  onOpenNewApplication: () => void;
  onOpenPolicyModal: (doc: PolicyDocument) => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  user,
  applications,
  commissions,
  onOpenNewApplication,
  onOpenPolicyModal,
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'vault' | 'policies' | 'ledger'>('pipeline');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [vaultSearch, setVaultSearch] = useState('');

  // Partner files
  const partnerApps = applications.filter(
    (a) => a.partnerId === user.id || a.partnerCode === user.partnerCode
  );

  const totalDisbursed = partnerApps
    .filter((a) => a.status === 'disbursed')
    .reduce((sum, a) => sum + (a.disbursedAmount || a.requestedAmount), 0);

  const releasedCommissions = commissions
    .filter((c) => c.partnerId === user.id || c.partnerCode === user.partnerCode)
    .filter((c) => c.payoutStatus === 'released')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const pendingCommissions = partnerApps
    .filter((a) => a.status !== 'rejected')
    .reduce((sum, a) => sum + (a.commissionAmount || 0), 0) - releasedCommissions;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredVault = BANK_VAULT_ITEMS.filter(
    (b) =>
      b.name.toLowerCase().includes(vaultSearch.toLowerCase()) ||
      b.partnerCode.toLowerCase().includes(vaultSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(vaultSearch.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disbursed':
        return { label: 'Disbursed', color: 'bg-emerald-950/60 text-emerald-400 border-emerald-800' };
      case 'ready_to_release':
        return { label: 'Payout Ready', color: 'bg-cyan-950/60 text-cyan-400 border-cyan-800' };
      case 'commission_verify':
        return { label: 'Commission Verifying', color: 'bg-blue-950/60 text-blue-400 border-blue-800' };
      case 'pending_disburse':
        return { label: 'Sanction Cleared', color: 'bg-indigo-950/60 text-indigo-400 border-indigo-800' };
      case 'under_process':
        return { label: 'Bank Underwriting', color: 'bg-amber-950/60 text-amber-400 border-amber-800' };
      case 'new_application':
      default:
        return { label: 'New File Logged', color: 'bg-purple-950/60 text-purple-400 border-purple-800' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Partner Header Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0a1e3d] via-[#091a33] to-[#040e21] border border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfb135] bg-[#dfb135]/15 border border-[#dfb135]/30 px-3 py-0.5 rounded-full flex items-center space-x-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{user.role === 'retailer' ? 'Authorized Retailer CSP' : 'Direct Channel DSA Partner'}</span>
            </span>
            <span className="text-xs font-mono font-bold text-white bg-slate-900 border border-slate-700 px-3 py-0.5 rounded-full">
              Code: {user.partnerCode || 'RP-8041'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {user.businessName || user.displayName}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
            <span>Contact: {user.phone || '+91 98765 43210'}</span>
            <span>•</span>
            <span>PAN: {user.panNumber || 'ABCPS1234D'}</span>
            <span>•</span>
            <span>Payout A/C: {user.bankName || 'HDFC Bank'} ({user.accountNumber || '•••9102'})</span>
          </div>
        </div>

        <button
          onClick={onOpenNewApplication}
          className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] via-[#efc44b] to-[#dfb135] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center space-x-2 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Punch New Client File</span>
        </button>
      </div>

      {/* Top Financial Slabs Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Disbursed Volume</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            ₹{totalDisbursed.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Cumulative sanctioned files</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Released Commission</div>
          <div className="text-2xl font-black text-white mt-1">
            ₹{releasedCommissions.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">✓ Credited into bank ledger</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Pending Payout Liability</div>
          <div className="text-2xl font-black text-[#dfb135] mt-1">
            ₹{Math.max(0, pendingCommissions).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Under settlement or verification</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-xs text-slate-400 font-semibold uppercase">Active Applications</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">
            {partnerApps.length} File{partnerApps.length === 1 ? '' : 's'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Live in underwriting pipeline</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4">
        {[
          { id: 'pipeline', label: 'Processing Pipeline', icon: TrendingUp },
          { id: 'vault', label: '50+ Bank Vault Portals', icon: Key },
          { id: 'policies', label: 'Policy Circulars & Manuals', icon: FileText },
          { id: 'ledger', label: 'Commission Ledger', icon: Coins },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 px-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-[#dfb135] text-[#dfb135]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Live Application Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="rounded-3xl bg-[#08152c] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Client File Pipeline</h3>
              <p className="text-xs text-slate-400">
                Track status across bank underwriting, sanction clearance, and commission authorization.
              </p>
            </div>
            <button
              onClick={onOpenNewApplication}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-[#040e21] bg-[#dfb135] hover:brightness-110 flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New Lead</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">File ID</th>
                  <th className="py-3 px-4">Applicant & Contact</th>
                  <th className="py-3 px-4">Product & Bank</th>
                  <th className="py-3 px-4">Requested / Disbursed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-200">
                {partnerApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{app.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{app.applicantName}</div>
                      <div className="text-[11px] text-slate-400">{app.applicantMobile}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">{app.productName}</div>
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
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(app.status).color}`}>
                        {getStatusBadge(app.status).label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      ₹{(app.commissionAmount || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 50+ Bank Vault Portals */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Direct Lending Bank Portals</h3>
              <p className="text-xs text-slate-400">
                Copy your encrypted channel tracking code and login directly into bank underwriting systems.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={vaultSearch}
                onChange={(e) => setVaultSearch(e.target.value)}
                placeholder="Search banking institution..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dfb135]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVault.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#08152c] border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                        {item.category.toUpperCase()}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-2">{item.name}</h4>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="Active Gateway" />
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.description}</p>

                  {/* Channel Code Box with One-Click Copy */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Partner Tracking Code</div>
                      <div className="text-xs font-mono font-bold text-[#dfb135] mt-0.5">{item.partnerCode}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.partnerCode, item.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1 transition"
                    >
                      {copiedCode === item.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {item.notes && (
                    <div className="mt-3 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      <strong className="text-slate-300">Fast-Track Note:</strong> {item.notes}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{item.supportPhone}</span>
                  <a
                    href={item.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center space-x-1 transition shadow"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Policy Guidelines & Circulars */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Master Underwriting Circulars & Policy PDFs</h3>
            <p className="text-xs text-slate-400">
              Review official underwriting norms, salary multipliers, FOIR limits, and mandatory branch checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POLICY_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl bg-[#08152c] border border-slate-800 p-6 flex flex-col justify-between hover:border-[#dfb135]/40 transition shadow-xl"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#dfb135]/20 text-[#dfb135] flex items-center justify-center border border-[#dfb135]/30 mb-3">
                    <FileText className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    {doc.bankName} • {doc.category}
                  </span>

                  <h4 className="text-base font-bold text-white mt-1 leading-snug">{doc.title}</h4>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3">{doc.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{doc.fileSize} ({doc.pageCount} Pages)</span>
                  <button
                    onClick={() => onOpenPolicyModal(doc)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#040e21] bg-[#dfb135] hover:brightness-110 transition"
                  >
                    Open Reader
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Commission Ledger */}
      {activeTab === 'ledger' && (
        <div className="rounded-3xl bg-[#08152c] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Commission Payout Ledger</h3>
              <p className="text-xs text-slate-400">
                Official payout transaction statement with bank settlement references and TDS deduction certificates.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Transaction Ref</th>
                  <th className="py-3 px-4">Borrower & Loan File</th>
                  <th className="py-3 px-4">Disbursed Volume</th>
                  <th className="py-3 px-4">Slab Rate</th>
                  <th className="py-3 px-4">Commission Amount</th>
                  <th className="py-3 px-4">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-200">
                {commissions.map((comm) => (
                  <tr key={comm.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      {comm.transactionReference || 'PENDING-AUTH'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{comm.applicantName}</div>
                      <div className="text-[11px] text-slate-400">{comm.productName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      ₹{comm.disbursedAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-[#dfb135] font-bold">{comm.commissionRate}%</td>
                    <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                      ₹{comm.commissionAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          comm.payoutStatus === 'released'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                            : 'bg-amber-950/60 text-amber-400 border-amber-800'
                        }`}
                      >
                        {comm.payoutStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
