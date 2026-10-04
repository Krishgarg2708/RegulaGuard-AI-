import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronRight,
  FileCheck,
  Radio,
  CreditCard,
  Building,
  User,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EVIDENCE_RECORDS } from '../data/mockData';
import { EvidenceRecord } from '../types';

export const EvidenceExplorerView: React.FC = () => {
  const { selectedEvidence, activeFinding } = useApp();
  const [activeTier, setActiveTier] = useState<number>(1);
  const [selectedEvd, setSelectedEvd] = useState<EvidenceRecord>(selectedEvidence || EVIDENCE_RECORDS[0]);

  const tiers = [
    {
      level: 1,
      title: 'Finding',
      icon: FileCheck,
      subtitle: activeFinding?.id || 'FND-8801',
      desc: activeFinding?.title || 'Potential Structuring & Rapid Offshore Pass-Through Extraction',
      badge: '96% Confidence',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      data: {
        'Finding ID': activeFinding?.id || 'FND-8801',
        'Case Reference': 'AML-2048',
        'Classification': 'CRITICAL / High Velocity Structuring',
        'Status': 'AUDIT-READY DRAFT',
        'Timestamp': '2026-10-04T07:55:00Z',
      },
    },
    {
      level: 2,
      title: 'Risk Signal',
      icon: Radio,
      subtitle: 'SIG-901',
      desc: 'Extreme Amount Deviation (19.8x Benchmark)',
      badge: 'Score: 94/100',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      data: {
        'Signal ID': 'SIG-901',
        'Signal Type': 'unusual_amount & unusual_login_device',
        'Detected By': 'Autonomous Core Heuristic Risk Engine',
        'Timestamp': '2026-10-04T07:42:18Z',
      },
    },
    {
      level: 3,
      title: 'Transaction',
      icon: CreditCard,
      subtitle: 'TXN-10482',
      desc: '₹8,75,000 Outbound Debit via IMPS to FinApex Global Ltd',
      badge: '19.8x Deviation',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      data: {
        'Transaction ID': 'TXN-10482',
        'Channel': 'IMPS Inter-Bank Direct',
        'Amount': 'INR 8,75,000.00',
        'Historical Baseline': 'INR 42,000.00',
        'Device Hardware': 'Windows Tor Exit Relay (ASN208323)',
      },
    },
    {
      level: 4,
      title: 'Account',
      icon: Building,
      subtitle: 'ACC-88321',
      desc: 'Primary Retail Savings Account (Flagged)',
      badge: 'Flags: 4',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      data: {
        'Account ID': 'ACC-88321 (Masked: XXXXXX8321)',
        'Branch': 'Nariman Point, Mumbai Main Branch',
        'Current Ledger Balance': 'INR 14,20,500.00',
        'Monthly Average Turnover': 'INR 85,000.00',
        'Operational Status': 'FROZEN (24h Cooling-Off)',
      },
    },
    {
      level: 5,
      title: 'Customer',
      icon: User,
      subtitle: 'CUST-1042',
      desc: 'R**** S***** (Rahul Sharma)',
      badge: 'CRITICAL Tier',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      data: {
        'Customer ID': 'CUST-1042',
        'Masked Name': 'R**** S***** (Rahul Sharma)',
        'KYC Status': 'ENHANCED_DUE_DILIGENCE',
        'Onboarding Date': '2023-08-14',
        'Risk Tier Rating': 'CRITICAL (Score: 94)',
        'Tax ID / PAN': 'ABCPS****F',
      },
    },
    {
      level: 6,
      title: 'Policy',
      icon: BookOpen,
      subtitle: 'AML-TRX-07',
      desc: 'Rule AM-07: Rapid Movement & Structuring Thresholds',
      badge: 'Mandatory STR',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      data: {
        'Policy ID': 'POL-AM-07 (AML-TRX-07)',
        'Regulator': 'Reserve Bank of India (RBI) / FIU-IND',
        'Section Citation': 'Section 4.3(b) - High Velocity & Smurfing',
        'Document Page': 'Page 42',
        'Filing Requirement': 'Form STR-01 via FINNET portal',
      },
    },
    {
      level: 7,
      title: 'Evidence Artifact',
      icon: Layers,
      subtitle: selectedEvd.id,
      desc: selectedEvd.title,
      badge: 'SHA-256 Verified',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      data: {
        'Evidence ID': selectedEvd.id,
        'Source Ledger': selectedEvd.source,
        'Cryptographic Hash': selectedEvd.hash,
        'Timestamp Verified': selectedEvd.timestamp,
        'Integrity Status': 'Immutable Ledger Certified',
      },
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-extrabold text-white">
            7-Tier Evidence Explorer & Traceability Ladder
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographically auditable chain of custody linking final regulatory finding directly back to core transactional artifacts.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
          Hierarchical Chain of Traceability:
        </span>

        <div className="flex flex-col space-y-2">
          {tiers.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTier === t.level;

            return (
              <div
                key={t.level}
                onClick={() => setActiveTier(t.level)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/40'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-blue-400">
                      T{t.level}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                          {t.title}:
                        </span>
                        <span className="text-xs font-bold text-white font-mono">
                          {t.subtitle}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${t.badgeColor}`}>
                          {t.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans mt-0.5">
                        {t.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <ChevronDown className="w-4 h-4 text-blue-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono animate-in fade-in duration-200">
                    {Object.entries(t.data).map(([key, val]) => (
                      <div key={key} className="p-2 rounded bg-slate-900/90 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">{key}</span>
                        <span className="text-slate-200 font-semibold break-all">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Cryptographically Hashed Evidence Artifacts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {EVIDENCE_RECORDS.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setSelectedEvd(ev);
                setActiveTier(7);
              }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedEvd.id === ev.id
                  ? 'bg-blue-950/40 border-blue-500'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-blue-400 font-bold">{ev.id}</span>
                <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <h3 className="text-xs font-bold text-white font-sans mt-1">
                {ev.title}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {ev.summary}
              </p>
              <div className="text-[10px] font-mono text-slate-500 mt-2 truncate bg-slate-900 p-1 rounded border border-slate-800">
                SHA-256: {ev.hash}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
