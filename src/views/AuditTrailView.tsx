import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AuditLogEntry } from '../types';

export const AuditTrailView: React.FC = () => {
  const { auditLogs, searchQuery } = useApp();
  const [selectedUserFilter, setSelectedUserFilter] = useState<string>('ALL');
  const [activeLogDetail, setActiveLogDetail] = useState<AuditLogEntry | null>(null);

  const users = ['ALL', 'Pooja Nair', 'Krish Garg', 'Vikram Seth', 'Aditya Rao', 'RegulaGuard AI Copilot'];

  const filteredLogs = auditLogs.filter((log) => {
    if (selectedUserFilter !== 'ALL' && !log.user.includes(selectedUserFilter)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        log.id.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        (log.caseId && log.caseId.toLowerCase().includes(q)) ||
        (log.details && log.details.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-extrabold text-white">
              Immutable Governance Audit Trail
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            WORM (Write Once, Read Many) tamper-evident audit ledger capturing every prompt, policy retrieval, model evaluation, and officer decision.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedUserFilter}
            onChange={(e) => setSelectedUserFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-mono"
          >
            {users.map((u) => (
              <option key={u} value={u}>
                User: {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="font-bold text-white block">Audit Readiness Index: 94%</span>
            <span className="text-[11px] text-slate-400">Total Entries: {auditLogs.length} • Zero Broken Hash Links</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Lock className="w-3.5 h-3.5 text-blue-400" />
          <span>Ledger Integrity: Cryptographic SHA-256 Merkle Chain</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Log ID / Time</th>
                <th className="py-3 px-4">Principal / Role</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Target Case / Entity</th>
                <th className="py-3 px-4">Details & Evidence</th>
                <th className="py-3 px-4 text-right">Integrity Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setActiveLogDetail(log)}
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-bold text-blue-400">{log.id}</div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-200">{log.user}</div>
                    <div className="text-[10px] text-slate-400">{log.role}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-200 border border-slate-800">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-amber-400">{log.caseId || 'GLOBAL'}</span>
                    {log.transactionId && (
                      <span className="text-slate-400 text-[10px] block">{log.transactionId}</span>
                    )}
                  </td>

                  <td className="py-3 px-4 max-w-sm truncate text-slate-300 font-sans">
                    {log.details || log.query}
                  </td>

                  <td className="py-3 px-4 text-right text-[10px] text-slate-500 truncate max-w-[120px]">
                    {log.hash.slice(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeLogDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-xl max-w-xl w-full p-5 space-y-4 text-slate-100 font-mono text-xs">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-400">{activeLogDetail.id}</span>
                <h3 className="text-base font-bold text-white font-sans mt-0.5">
                  Audit Entry: {activeLogDetail.action}
                </h3>
                <span className="text-[10px] text-slate-400">
                  {new Date(activeLogDetail.timestamp).toUTCString()}
                </span>
              </div>
              <button
                onClick={() => setActiveLogDetail(null)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">ACTOR</span>
                <span className="text-slate-200 font-semibold">{activeLogDetail.user}</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">ROLE</span>
                <span className="text-slate-200 font-semibold">{activeLogDetail.role}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] block">NARRATIVE DETAILS</span>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 text-slate-200 font-sans text-xs leading-relaxed">
                {activeLogDetail.details}
              </div>
            </div>

            {activeLogDetail.query && (
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block">PROMPT QUERY</span>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-sans">
                  "{activeLogDetail.query}"
                </div>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] block">CRYPTOGRAPHIC CHECKSUM</span>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-emerald-400 break-all">
                SHA-256: {activeLogDetail.hash}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveLogDetail(null)}
                className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
