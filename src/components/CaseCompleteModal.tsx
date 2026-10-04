import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  FileText,
  History,
  Lock,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CaseCompleteModal: React.FC = () => {
  const { isCaseCompleted, setIsCaseCompleted, setActivePage, activeFinding } = useApp();

  if (!isCaseCompleted) return null;

  const milestones = [
    { label: 'Risk Signal', status: 'CRITICAL Detected (TXN-10482)', completed: true },
    { label: 'Investigation', status: 'Workspace AML-2048 Activated', completed: true },
    { label: 'Evidence Collected', status: '4 Cryptographic Artifacts Linked', completed: true },
    { label: 'Policy Matched', status: 'AML Rule AM-07 & FRD-ANOM-04', completed: true },
    { label: 'Finding Generated', status: 'FND-8801 Validated (96% Confidence)', completed: true },
    { label: 'Human Review', status: 'Compliance Officer Sign-Off Received', completed: true },
    { label: 'Report Drafted', status: 'SAR / STR-01 Ready for FIU Submission', completed: true },
    { label: 'Audit Trail Recorded', status: 'Immutable Log Entry AUD-1006 Stored', completed: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-950/60 rounded-2xl w-full max-w-2xl overflow-hidden text-slate-100">
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-blue-950/80 p-6 border-b border-emerald-500/30 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  Compliance Lifecycle Completed
                </span>
                <span className="text-xs font-mono text-slate-400">Case AML-2048</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1">
                From Signal to Evidence to Finding.
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Every critical step is explainable, evidence-backed, traceable, governed, and audit-ready.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCaseCompleted(false)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-200">{m.label} ✓</div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{m.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Generated Finding Record:</span>
              <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                Integrity SHA-256 Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              "{activeFinding?.executiveSummary || 'Suspicious transfer of ₹8,75,000 flagged and placed under statutory hold.'}"
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Confidence: 96%
              </span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Rule: AML-TRX-07
              </span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Action: Enhanced Due Diligence
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Audit record logged to immutable ledger</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCaseCompleted(false);
                setActivePage('reports');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>View SAR Report</span>
            </button>
            <button
              onClick={() => {
                setIsCaseCompleted(false);
                setActivePage('audit');
              }}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>Inspect Audit Trail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
