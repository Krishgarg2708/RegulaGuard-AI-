import React, { useState } from 'react';
import {
  ShieldAlert,
  Smartphone,
  Globe,
  ArrowRight,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSACTIONS, AML_CASES } from '../data/mockData';

export const FraudMonitoringView: React.FC = () => {
  const {
    selectedTransaction,
    setSelectedTransaction,
    setSelectedCase,
    setActivePage,
    showToast,
    addAuditLog,
    currentPersona,
  } = useApp();

  const currentTxn = selectedTransaction || TRANSACTIONS[0];
  const [accountFrozen, setAccountFrozen] = useState<boolean>(false);

  const handleFreezeAccount = () => {
    setAccountFrozen(true);
    showToast(`Account ${currentTxn.accountId} placed on 24-hour statutory cooling-off freeze`, 'warning');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'ENFORCED_DEBIT_FREEZE',
      transactionId: currentTxn.id,
      caseId: 'AML-2048',
      decision: 'COOLING_OFF_HOLD_ENFORCED',
      details: `Enforced emergency hold pursuant to Cyber Security Directive FRD-ANOM-04.`,
      policyUsed: ['POL-FRD-04', 'POL-AM-07'],
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h1 className="text-xl font-extrabold text-white">
              Fraud Detection & Behavioral Anomaly Console
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time biometric, device telemetry, velocity deviations, and heuristic risk decomposition.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFreezeAccount}
            disabled={accountFrozen}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              accountFrozen
                ? 'bg-rose-950 text-rose-300 border-rose-800'
                : 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400/50 shadow-md shadow-rose-600/20'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{accountFrozen ? 'Account Frozen (24h)' : 'Enforce Debit Freeze'}</span>
          </button>

          <button
            onClick={() => {
              setSelectedCase(AML_CASES[0]);
              setActivePage('investigation');
            }}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <span>Open Investigation Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border-2 border-rose-500/60 rounded-xl p-6 shadow-xl shadow-rose-950/20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">
                CRITICAL FRAUD ALERT: {currentTxn.id}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Timestamp: {new Date(currentTxn.timestamp).toUTCString()}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Channel: {currentTxn.channel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Transaction Amount</span>
                <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                  ₹{currentTxn.amount.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Historical Average</span>
                <div className="text-lg font-bold text-slate-300 font-mono mt-0.5">
                  ₹{currentTxn.historicalAverage.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-amber-500/30">
                <span className="text-[10px] font-mono text-amber-400 uppercase">Current Deviation</span>
                <div className="text-lg font-extrabold text-amber-400 font-mono mt-0.5">
                  {currentTxn.deviationMultiplier}x
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-rose-500/30">
                <span className="text-[10px] font-mono text-rose-400 uppercase">Risk Score</span>
                <div className="text-xl font-extrabold text-rose-400 font-mono mt-0.5">
                  {currentTxn.riskScore}/100
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider">
                  Behavioral Anomaly Synthesis
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                "{currentTxn.explanation}"
              </p>
            </div>
          </div>

          <div className="w-full lg:w-80 bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 shrink-0">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-white">
                Explainable Risk Factors
              </span>
              <span className="text-xs font-mono font-extrabold text-rose-400">
                Total: {currentTxn.riskScore}/100
              </span>
            </div>

            <div className="space-y-2">
              {currentTxn.riskFactors.map((rf, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs p-2 rounded bg-slate-900 border border-slate-800/80"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-semibold text-slate-200 block truncate">
                      {rf.label}
                    </span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">
                      {rf.description}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-rose-400 shrink-0">
                    +{rf.score}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-400 border-t border-slate-800 flex justify-between">
              <span>Threshold: CRITICAL &gt;= 81</span>
              <span className="text-emerald-400 font-semibold">Normalized 0-100</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-blue-400" /> Device Telemetry
            </span>
            <div className="text-slate-200 font-semibold">{currentTxn.deviceInfo.deviceType}</div>
            <div className="text-[11px] text-rose-400 font-bold">
              {currentTxn.deviceInfo.isNewDevice ? '⚠️ Unregistered Hardware Fingerprint' : 'Trusted Hardware'}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
              <Globe className="w-3 h-3 text-purple-400" /> IP & ASN Coordinates
            </span>
            <div className="text-slate-200 font-semibold">{currentTxn.deviceInfo.ipAddress}</div>
            <div className="text-[11px] text-amber-400">
              {currentTxn.deviceInfo.vpnDetected ? 'Tor Exit Relay / Proxy Confirmed' : 'Residential ISP'}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase text-[10px]">Merchant / Beneficiary</span>
            <div className="text-slate-200 font-semibold">{currentTxn.beneficiaryName}</div>
            <div className="text-[11px] text-slate-400">{currentTxn.beneficiaryBank}</div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase text-[10px]">Account Profile</span>
            <div className="text-slate-200 font-semibold">ACC-88321 (R**** S*****)</div>
            <div className="text-[11px] text-slate-400">Domestic Base: Mumbai, India</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Recent Monitored Outliers
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Showing top high-risk deviations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-4">Txn ID</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Deviation</th>
                <th className="py-2.5 px-4">Score</th>
                <th className="py-2.5 px-4">Flagged Reason</th>
                <th className="py-2.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {TRANSACTIONS.slice(0, 6).map((t) => (
                <tr
                  key={t.id}
                  className={`hover:bg-slate-800/60 transition-colors ${
                    t.id === currentTxn.id ? 'bg-blue-950/30' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-mono font-bold text-blue-400">
                    {t.id}
                  </td>
                  <td className="py-2.5 px-4 font-mono">{t.customerId}</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-white">
                    ₹{t.amount.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-amber-400 font-bold">
                    {t.deviationMultiplier}x
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-rose-400">
                    {t.riskScore}/100
                  </td>
                  <td className="py-2.5 px-4 text-slate-300 max-w-xs truncate">
                    {t.flaggedReason || t.explanation}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTransaction(t)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
