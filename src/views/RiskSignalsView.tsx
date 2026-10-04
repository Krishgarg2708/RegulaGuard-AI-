import React, { useState } from 'react';
import {
  Radio,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RISK_SIGNALS, TRANSACTIONS, AML_CASES } from '../data/mockData';
import { RiskSignal, SeverityLevel } from '../types';

export const RiskSignalsView: React.FC = () => {
  const {
    setSelectedSignal,
    setSelectedTransaction,
    setSelectedCase,
    setActivePage,
    searchQuery,
  } = useApp();

  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [activeSignalModal, setActiveSignalModal] = useState<RiskSignal | null>(null);

  const signalTypes = [
    { value: 'ALL', label: 'All Signal Types' },
    { value: 'unusual_amount', label: 'Unusual Amount' },
    { value: 'velocity_spike', label: 'Velocity Spike' },
    { value: 'geographic_anomaly', label: 'Geographic Anomaly' },
    { value: 'new_beneficiary', label: 'New Beneficiary' },
    { value: 'multiple_accounts_receiving', label: 'Multiple Accounts Receiving' },
    { value: 'structuring_smurfing', label: 'Structuring / Smurfing' },
    { value: 'dormant_account_active', label: 'Dormant Account Active' },
    { value: 'rapid_fund_movement', label: 'Rapid Fund Movement' },
    { value: 'unusual_login_device', label: 'Unusual Login / Device' },
    { value: 'high_risk_jurisdiction', label: 'High-Risk Jurisdiction' },
    { value: 'credit_utilization_spike', label: 'Credit Utilization Spike' },
    { value: 'liquidity_deterioration', label: 'Liquidity Deterioration' },
    { value: 'suspicious_account_network', label: 'Suspicious Account Network' },
  ];

  const filteredSignals = RISK_SIGNALS.filter((s) => {
    if (selectedSeverity !== 'ALL' && s.severity !== selectedSeverity) return false;
    if (selectedType !== 'ALL' && s.signalType !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        s.id.toLowerCase().includes(q) ||
        s.customerName.toLowerCase().includes(q) ||
        s.accountId.toLowerCase().includes(q) ||
        (s.transactionId && s.transactionId.toLowerCase().includes(q)) ||
        s.signalTitle.toLowerCase().includes(q) ||
        s.detectedReason.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'MEDIUM':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            <h1 className="text-xl font-extrabold text-white">
              Real-Time Risk Signals Surveillance
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time heuristic & behavioral anomaly signals captured across accounts, devices, and cross-border rails.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded font-mono font-medium transition-colors cursor-pointer ${
                  selectedSeverity === sev
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
          >
            {signalTypes.map((t) => (
              <option key={t.value} value={t.value} className="bg-slate-900">
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Signal ID / Time</th>
                <th className="py-3 px-4">Severity / Score</th>
                <th className="py-3 px-4">Entity & Account</th>
                <th className="py-3 px-4">Signal Type & Detection Reason</th>
                <th className="py-3 px-4">Governing Policy</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredSignals.map((sig) => (
                <tr
                  key={sig.id}
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => setActiveSignalModal(sig)}
                >
                  <td className="py-3 px-4 font-mono">
                    <div className="font-bold text-slate-200">{sig.id}</div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(sig.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getSeverityBadge(sig.severity)}`}>
                        {sig.severity}
                      </span>
                      <span className="font-mono font-bold text-slate-200">
                        {sig.riskScore}/100
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono">
                    <div className="font-semibold text-slate-200">{sig.customerName}</div>
                    <div className="text-[10px] text-slate-400">{sig.accountId}</div>
                  </td>

                  <td className="py-3 px-4 max-w-md">
                    <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {sig.signalTitle}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {sig.detectedReason}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    <span className="text-blue-400 hover:underline">
                      {sig.relatedPolicyName}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedSignal(sig);
                        if (sig.transactionId === 'TXN-10482') {
                          setSelectedTransaction(TRANSACTIONS[0]);
                          setActivePage('fraud');
                        } else {
                          setSelectedCase(AML_CASES[0]);
                          setActivePage('investigation');
                        }
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Investigate</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeSignalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-xl max-w-xl w-full p-5 space-y-4 text-slate-100">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getSeverityBadge(activeSignalModal.severity)}`}>
                  {activeSignalModal.severity} ({activeSignalModal.riskScore}/100)
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {activeSignalModal.signalTitle}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  ID: {activeSignalModal.id} • Customer: {activeSignalModal.customerName} ({activeSignalModal.customerId})
                </p>
              </div>
              <button
                onClick={() => setActiveSignalModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {activeSignalModal.detectedReason}
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Risk Engine Contributor Weights
              </div>
              <div className="space-y-2">
                {activeSignalModal.factors.map((f, i) => (
                  <div key={i} className="p-2 rounded bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="font-semibold text-slate-200">{f.label}</span>
                      <span className="text-rose-400 font-bold">+{f.score} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                Policy: {activeSignalModal.relatedPolicyName}
              </span>
              <button
                onClick={() => {
                  setSelectedSignal(activeSignalModal);
                  setActiveSignalModal(null);
                  if (activeSignalModal.transactionId === 'TXN-10482') {
                    setSelectedTransaction(TRANSACTIONS[0]);
                    setActivePage('fraud');
                  } else {
                    setSelectedCase(AML_CASES[0]);
                    setActivePage('investigation');
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
              >
                Open in Investigation Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
