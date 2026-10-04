import React, { useState } from 'react';
import {
  Coins,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AML_CASES } from '../data/mockData';
import { AMLCase, AMLCaseStatus } from '../types';

export const AMLMonitoringView: React.FC = () => {
  const {
    setSelectedCase,
    setActivePage,
    searchQuery,
    showToast,
    addAuditLog,
    currentPersona,
  } = useApp();

  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('ALL');
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<AMLCase>(AML_CASES[0]);
  const [noteText, setNoteText] = useState<string>('');

  const statuses: { label: string; value: string }[] = [
    { label: 'All Cases', value: 'ALL' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Under Review', value: 'UNDER_REVIEW' },
    { label: 'Escalated', value: 'ESCALATED' },
    { label: 'Reported (STR)', value: 'REPORTED' },
    { label: 'Cleared', value: 'CLEARED' },
  ];

  const filteredCases = AML_CASES.filter((c) => {
    if (activeStatusFilter !== 'ALL' && c.status !== activeStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.customerId.toLowerCase().includes(q) ||
        c.alertType.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (status: AMLCaseStatus) => {
    switch (status) {
      case 'OPEN':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'UNDER_REVIEW':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'ESCALATED':
        return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
      case 'REPORTED':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'CLEARED':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const handleStatusChange = (newStatus: AMLCaseStatus) => {
    selectedCaseDetail.status = newStatus;
    showToast(`Case ${selectedCaseDetail.id} status updated to ${newStatus}`, 'success');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'UPDATED_CASE_STATUS',
      caseId: selectedCaseDetail.id,
      decision: newStatus,
      details: `Status shifted to ${newStatus} by ${currentPersona.name}.`,
    });
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    selectedCaseDetail.analystNotes += `\n[${new Date().toLocaleTimeString()} ${currentPersona.name}]: ${noteText}`;
    setNoteText('');
    showToast('Analyst note appended to case dossier', 'info');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'ADDED_ANALYST_NOTE',
      caseId: selectedCaseDetail.id,
      details: `Appended note: "${noteText.slice(0, 50)}..."`,
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl font-extrabold text-white">
              Anti-Money Laundering (AML) Surveillance & Cases
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Surveillance over structuring, smurfing, circular round-tripping, and high-velocity transit laundering.
          </p>
        </div>

        <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setActiveStatusFilter(s.value)}
              className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                activeStatusFilter === s.value
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/70 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Typology & Customer</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCaseDetail(c)}
                    className={`hover:bg-slate-800/60 cursor-pointer transition-colors ${
                      c.id === selectedCaseDetail.id ? 'bg-blue-950/30 border-l-2 border-blue-500' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono">
                      <div className="font-bold text-white">{c.id}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{c.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {c.customerName} ({c.customerId}) • {c.flowPattern}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-rose-400">
                      {c.riskScore}/100
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getStatusBadge(c.status)}`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-500 inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white font-mono">
                  {selectedCaseDetail.id}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getStatusBadge(selectedCaseDetail.status)}`}>
                  {selectedCaseDetail.status.replace('_', ' ')}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-100 mt-1">
                {selectedCaseDetail.title}
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedCase(selectedCaseDetail);
                setActivePage('investigation');
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">CUSTOMER</span>
              <span className="text-slate-200 font-bold">{selectedCaseDetail.customerName}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">ACCOUNT</span>
              <span className="text-slate-200 font-bold">{selectedCaseDetail.accountId}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">GOVERNING RULE</span>
              <span className="text-blue-400 font-bold">{selectedCaseDetail.applicablePolicyId}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">RISK SCORE</span>
              <span className="text-rose-400 font-bold">{selectedCaseDetail.riskScore}/100 ({selectedCaseDetail.severity})</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Case Narrative & Evidence Synthesis
            </span>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans max-h-40 overflow-y-auto">
              {selectedCaseDetail.analystNotes}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
              Recommended Statutory Action
            </span>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {selectedCaseDetail.recommendedAction}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-400">Shift Case Lifecycle:</span>
            <div className="flex flex-wrap gap-1.5">
              {(['OPEN', 'UNDER_REVIEW', 'ESCALATED', 'CLEARED', 'REPORTED'] as AMLCaseStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-semibold transition-colors border cursor-pointer ${
                    selectedCaseDetail.status === st
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add investigator note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddNote}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded border border-slate-700 cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
