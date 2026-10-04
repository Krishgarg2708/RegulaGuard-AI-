import React, { useState } from 'react';
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  Layers,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AML_CASES, TRANSACTIONS, EVIDENCE_RECORDS, POLICIES } from '../data/mockData';
import { AMLCase, FindingRecord } from '../types';

export const InvestigationWorkspaceView: React.FC = () => {
  const {
    selectedCase,
    setSelectedTransaction,
    setSelectedPolicy,
    setSelectedEvidence,
    setActivePage,
    activeFinding,
    setActiveFinding,
    showToast,
    addAuditLog,
    currentPersona,
  } = useApp();

  const currentCase: AMLCase = selectedCase || AML_CASES[0];
  const [analystNotes, setAnalystNotes] = useState<string>(currentCase.analystNotes);
  const [newNote, setNewNote] = useState<string>('');

  const timelineEvents = [
    { time: '07:18 AM', title: 'Pass-Through Pre-Funding', desc: '₹4,50,000 credited from secondary account ACC-44910 via UPI.' },
    { time: '07:35 AM', title: 'Probe Transaction TXN-10481', desc: '₹49,500 transferred to test clearance routing.' },
    { time: '07:36 AM', title: 'Beneficiary Addition', desc: 'FinApex Global Ltd (Hong Kong) added without standard cooling period.' },
    { time: '07:42 AM', title: 'Critical Outlier Debit TXN-10482', desc: '₹8,75,000 debited via IMPS from Tor exit relay ASN208323.' },
    { time: '07:42 AM', title: 'Heuristic Anomaly Flagged', desc: 'Risk Engine assigned 94/100 CRITICAL. Automated alert SIG-901 generated.' },
    { time: '07:44 AM', title: 'Formal Case AML-2048 Opened', desc: 'Assigned to Lead AML Investigator Vikram Seth.' },
  ];

  const handleEscalate = () => {
    currentCase.status = 'ESCALATED';
    showToast(`Case ${currentCase.id} escalated to Chief Compliance Officer`, 'warning');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'ESCALATED_CASE_TO_CCO',
      caseId: currentCase.id,
      decision: 'ESCALATED',
      details: 'Escalated with critical risk score of 94/100 and evidence pack.',
    });
  };

  const handleClearAlert = () => {
    currentCase.status = 'CLEARED';
    showToast(`Case ${currentCase.id} cleared with documented reason`, 'info');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'CLEARED_CASE_ALERT',
      caseId: currentCase.id,
      decision: 'CLEARED',
      details: 'Analyst cleared alert following verified explanation.',
    });
  };

  const handleRequestReview = () => {
    currentCase.status = 'UNDER_REVIEW';
    showToast(`Requested supervisory review for ${currentCase.id}`, 'info');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'REQUESTED_SUPERVISORY_REVIEW',
      caseId: currentCase.id,
      details: 'Dispatched notification to Audit Committee review queue.',
    });
  };

  const handleGenerateFinding = () => {
    const newFnd: FindingRecord = {
      id: `FND-${Math.floor(1000 + Math.random() * 9000)}`,
      caseId: currentCase.id,
      title: `Confirmed Suspicious Activity: ${currentCase.title}`,
      severity: 'CRITICAL',
      status: 'AUDIT_READY',
      signals: ['SIG-901', 'SIG-902', 'SIG-903'],
      evidenceIds: ['EVD-101', 'EVD-102', 'EVD-103', 'EVD-104'],
      policyIds: ['POL-AM-07', 'POL-FRD-04', 'POL-AML-01'],
      confidence: 96,
      executiveSummary: `Definitive finding for ${currentCase.id}: Severe velocity anomaly and offshore pass-through extraction of ₹8,75,000 violates AML Rule AM-07 and Cyber Security Directive FRD-ANOM-04.`,
      detailedAnalysis:
        'All empirical evidence points toward unauthorized account compromise or intentional trade-based layering. Beneficiary FinApex Global Ltd exhibits shell attributes.',
      recommendedAction: 'Freeze outbound clearance and dispatch Form STR-01 to FIU-IND.',
      conclusion: 'Finding verified with cryptographic proof and ready for regulatory filing.',
      createdAt: new Date().toISOString(),
      analyst: currentPersona.name,
    };

    setActiveFinding(newFnd);
    showToast(`Generated Compliance Finding Record ${newFnd.id}`, 'success');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'GENERATED_FORMAL_FINDING',
      caseId: currentCase.id,
      details: `Generated finding ${newFnd.id} with 96% confidence and 4 evidence records.`,
      evidenceUsed: newFnd.evidenceIds,
      policyUsed: newFnd.policyIds,
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const updated = `${analystNotes}\n[${new Date().toLocaleTimeString()} ${currentPersona.name}]: ${newNote}`;
    setAnalystNotes(updated);
    currentCase.analystNotes = updated;
    setNewNote('');
    showToast('Analyst note saved to case history', 'info');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'ADDED_ANALYST_NOTE',
      caseId: currentCase.id,
      details: `Note added by ${currentPersona.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                CASE: {currentCase.id}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                STATUS: {currentCase.status.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Customer: {currentCase.customerName} ({currentCase.customerId}) • Account: {currentCase.accountId}
              </span>
            </div>

            <h1 className="text-xl font-extrabold text-white mt-1">
              {currentCase.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleEscalate}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              [Escalate]
            </button>
            <button
              onClick={handleClearAlert}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              [Clear Alert]
            </button>
            <button
              onClick={handleRequestReview}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              [Request Review]
            </button>
            <button
              onClick={handleGenerateFinding}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>[Generate Finding]</span>
            </button>
            <button
              onClick={() => setActivePage('reports')}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>[Generate Report]</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2 border-t border-slate-800/80">
          <div>
            <span className="text-slate-500 block text-[10px]">RISK CLASSIFICATION</span>
            <span className="text-rose-400 font-extrabold">{currentCase.riskScore}/100 ({currentCase.severity})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">INVESTIGATOR</span>
            <span className="text-slate-200 font-semibold">{currentCase.assignedTo}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">GOVERNING DIRECTIVE</span>
            <span className="text-blue-400 font-semibold">{currentCase.applicablePolicyId}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">FLOW TYPOLOGY</span>
            <span className="text-amber-400 font-semibold">{currentCase.flowPattern}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Sequential Incident Timeline</span>
            </h2>

            <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 pl-6">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute -left-[29px] top-1 border-2 border-slate-900" />
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-blue-400 font-bold">{evt.time}</span>
                    <span className="font-bold text-slate-200">{evt.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Related Transactions in Case Window
            </h2>

            <div className="space-y-2">
              {TRANSACTIONS.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTransaction(t);
                    setActivePage('fraud');
                  }}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-blue-400 group-hover:underline">{t.id}</span>
                      <span className="text-slate-400">{t.channel}</span>
                      <span className="text-rose-400 font-bold">₹{t.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {t.flaggedReason || t.explanation}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-amber-400 font-bold shrink-0">
                    {t.deviationMultiplier}x
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Official Case Notes Dossier
            </h2>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-sans whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
              {analystNotes}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Append formal investigation notes..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleAddNote}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Post Note
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          {activeFinding && (
            <div className="bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 border-2 border-emerald-500/50 rounded-xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {activeFinding.id} • {activeFinding.status}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Confidence: {activeFinding.confidence}%
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">
                {activeFinding.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                "{activeFinding.executiveSummary}"
              </p>

              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300">
                <span className="text-blue-400 font-bold block mb-1">RECOMMENDED ACTION:</span>
                {activeFinding.recommendedAction}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[10px]">
                  Analyst: {activeFinding.analyst}
                </span>
                <button
                  onClick={() => setActivePage('reports')}
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Generate SAR Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Verified Evidence Pack</span>
              </h2>
              <button
                onClick={() => setActivePage('evidence')}
                className="text-xs text-blue-400 hover:underline font-mono cursor-pointer"
              >
                7-Tier Explorer
              </button>
            </div>

            <div className="space-y-2">
              {EVIDENCE_RECORDS.slice(0, 4).map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => {
                    setSelectedEvidence(ev);
                    setActivePage('evidence');
                  }}
                  className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-colors text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-400">{ev.id} ({ev.type})</span>
                    <span className="text-emerald-400 text-[10px]">Verified ✓</span>
                  </div>
                  <div className="text-slate-200 font-sans font-medium text-xs">{ev.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Hash: {ev.hash}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Regulatory Standards Invoked
            </h2>

            <div className="space-y-2">
              {POLICIES.slice(0, 2).map((pol) => (
                <div
                  key={pol.id}
                  onClick={() => {
                    setSelectedPolicy(pol);
                    setActivePage('policies');
                  }}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-400 font-bold">{pol.code}</span>
                    <span className="text-slate-400 text-[10px]">Page {pol.page}</span>
                  </div>
                  <div className="text-xs font-semibold text-white font-sans">{pol.title}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans">
                    {pol.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
