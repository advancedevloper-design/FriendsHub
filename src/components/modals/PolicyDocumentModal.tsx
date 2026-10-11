import React from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  User, 
  Printer, 
  ExternalLink 
} from 'lucide-react';
import { PolicyDocument } from '../../types';

interface PolicyDocumentModalProps {
  document: PolicyDocument | null;
  onClose: () => void;
}

export const PolicyDocumentModal: React.FC<PolicyDocumentModalProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#08152c] border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#dfb135]/20 text-[#dfb135] flex items-center justify-center shrink-0 border border-[#dfb135]/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
              <span>{document.bankName}</span>
              <span>•</span>
              <span className="text-[#dfb135]">{document.category}</span>
              <span>•</span>
              <span className="text-slate-400">{document.fileSize} ({document.pageCount} Pages)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {document.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Uploaded by: {document.uploadedBy} • Valid for Financial Year 2026
            </p>
          </div>
        </div>

        {/* Summary Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6">
          <strong className="text-white block mb-1">Executive Underwriting Summary:</strong>
          {document.previewContent.summary}
        </div>

        {/* Key Highlights */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Sanction & Policy Highlights
          </h4>
          <div className="space-y-2">
            {document.previewContent.highlights.map((h, i) => (
              <div key={i} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Multiplier Matrix */}
        {document.previewContent.eligibilityMatrix && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Salary Multiplier & FOIR Benchmark Matrix
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Borrower Profile</th>
                    <th className="py-2.5 px-3">Min. Income</th>
                    <th className="py-2.5 px-3">Max Multiplier</th>
                    <th className="py-2.5 px-3">FOIR Cap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/40 text-slate-200">
                  {document.previewContent.eligibilityMatrix.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-semibold text-white">{row.profile}</td>
                      <td className="py-2.5 px-3">{row.minSalary}</td>
                      <td className="py-2.5 px-3 text-[#dfb135] font-bold">{row.maxMultiplier}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">{row.foir}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Document Checklist */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Mandatory Dossier Checklist for Branch Login
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {document.previewContent.documentChecklist.map((item, i) => (
              <div key={i} className="flex items-center space-x-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#dfb135]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Official circular for authorized channel DSA use only.
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                alert(`Downloaded official circular: ${document.fileName}`);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center space-x-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-[#040e21] bg-[#dfb135] hover:brightness-110"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
