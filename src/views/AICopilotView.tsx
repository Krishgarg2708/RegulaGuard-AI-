import React, { useState } from 'react';
import {
  Bot,
  Send,
  Lock,
  ExternalLink,
  Layers,
  BookOpen,
  Briefcase,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { processCopilotQuery } from '../services/copilotEngine';
import { CopilotMessage } from '../types';
import { TRANSACTIONS, AML_CASES, POLICIES, EVIDENCE_RECORDS } from '../data/mockData';

export const AICopilotView: React.FC = () => {
  const {
    setSelectedTransaction,
    setSelectedCase,
    setSelectedPolicy,
    setSelectedEvidence,
    setActivePage,
    addAuditLog,
    currentPersona,
  } = useApp();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init-msg-1',
      sender: 'assistant',
      timestamp: '2026-10-04T07:42:00Z',
      text: 'RegulaGuard AI Copilot initialized. Connected to core transaction ledgers, behavioral anomaly models, and regulatory compliance directives. Every response is strictly explainable, evidence-backed, and audit-logged.',
      structured: {
        answer: 'Surveillance terminal active. Ready to evaluate risk signals, retrieve regulatory policies, inspect evidence chains, and draft audit-ready findings.',
        riskScore: 74,
        keySignals: [
          'High Risk Anomaly on TXN-10482 (₹8,75,000 / 19.8x baseline)',
          'Structuring detected on ACC-10294 (3 sub-threshold tranches)',
          'Circular routing ring flagged on ACC-66014',
        ],
        reasoning:
          'Responses are grounded via Retrieval-Augmented Generation across PMLA 2002, RBI Master Directions, FATF recommendations, and internal bank rule AM-07.',
        evidence: ['EVD-101 (IMPS Ledger)', 'EVD-102 (Tor ASN Relay)', 'EVD-105 (RTGS Tranches)'],
        policies: ['AML-TRX-07', 'FRD-ANOM-04', 'PMLA-SEC-12'],
        confidence: 96,
        recommendedAction: 'Select an active alert or ask a specific transaction inquiry below.',
        caseId: 'AML-2048',
        txnId: 'TXN-10482',
      },
    },
  ]);

  const [activeContextMessage, setActiveContextMessage] = useState<CopilotMessage>(messages[0]);

  const samplePrompts = [
    'Why was transaction TXN-10482 flagged?',
    'Find accounts showing possible structuring behavior.',
    "Show today's top 10 risk signals.",
    'Why is customer CUST-1042 high risk?',
    'Which AML policy applies to case AML-2048?',
    'Prepare an AML investigation summary for case AML-2048.',
    'Generate an audit-ready report for this investigation.',
  ];

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toISOString(),
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    const { message: aiResponse, auditDetails } = processCopilotQuery(q);

    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
      setActiveContextMessage(aiResponse);

      addAuditLog({
        user: currentPersona.name,
        role: currentPersona.id,
        action: auditDetails.action,
        query: q,
        aiResponse: aiResponse.structured?.answer || aiResponse.text,
        evidenceUsed: auditDetails.evidenceUsed,
        policyUsed: auditDetails.policyUsed,
        caseId: aiResponse.structured?.caseId,
        transactionId: aiResponse.structured?.txnId,
        details: auditDetails.details,
      });
    }, 250);
  };

  const struct = activeContextMessage.structured;

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto h-[calc(100vh-125px)] flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white font-mono">
                RegulaGuard AI Copilot Terminal
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Grounded Mode: Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
          <Lock className="w-3.5 h-3.5" />
          <span>AI ASSISTED — HUMAN REVIEW REQUIRED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="hidden lg:flex lg:col-span-3 flex-col bg-slate-900 border border-slate-800 rounded-xl p-3.5 overflow-y-auto space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              Quick Compliance Inquiries
            </span>
            <div className="space-y-1.5">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="w-full text-left p-2 rounded-lg bg-slate-950/60 hover:bg-blue-950/40 border border-slate-800/80 hover:border-blue-500/40 text-xs text-slate-300 hover:text-white transition-all font-sans leading-snug group cursor-pointer"
                >
                  <span className="group-hover:text-blue-300">"{p}"</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
              Governance Standard:
            </span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Hallucinated Policies</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidence Hash Traceability</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Audit Logging</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => {
              const isUser = m.sender === 'user';

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    if (m.structured) setActiveContextMessage(m);
                  }}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} cursor-pointer`}
                >
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-slate-400">
                    <span>{isUser ? currentPersona.name : 'RegulaGuard Copilot'}</span>
                    <span>•</span>
                    <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl text-xs max-w-full leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none space-y-3'
                    }`}
                  >
                    <p className="font-sans whitespace-pre-wrap">{m.text}</p>

                    {m.structured && (
                      <div className="pt-2 border-t border-slate-800/80 space-y-2">
                        {m.structured.riskScore !== undefined && m.structured.riskScore > 0 && (
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-[10px] uppercase text-slate-400">RISK SCORE</span>
                            <span className="text-xs font-bold text-rose-400">
                              {m.structured.riskScore}/100 (CRITICAL)
                            </span>
                          </div>
                        )}

                        {m.structured.keySignals && m.structured.keySignals.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                              KEY SIGNALS
                            </span>
                            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-300">
                              {m.structured.keySignals.map((s, idx) => (
                                <li key={idx}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px]">
                          <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-0.5">
                            RECOMMENDED ACTION
                          </span>
                          <span className="text-slate-300 font-medium">
                            {m.structured.recommendedAction}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about TXN-10482, structuring, policies, evidence..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <span>Submit</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-white flex items-center justify-between">
              <span>Grounded Context Panel</span>
              <span className="text-emerald-400 text-[11px] font-mono font-bold">
                Confidence: {struct?.confidence || 94}%
              </span>
            </span>
          </div>

          {struct?.txnId && (
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">PINNED TRANSACTION</span>
                <span className="text-rose-400 font-bold">{struct.txnId}</span>
              </div>
              <div className="text-xs text-white font-semibold">
                ₹8,75,000 (19.8x Deviation)
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Beneficiary: FinApex Global Ltd (Hong Kong Shell)
              </div>
              <button
                onClick={() => {
                  setSelectedTransaction(TRANSACTIONS[0]);
                  setActivePage('fraud');
                }}
                className="w-full mt-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-blue-400 border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Inspect in Fraud Console</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Corroborating Evidence ({struct?.evidence?.length || 0})
            </span>
            <div className="space-y-1.5">
              {struct?.evidence && struct.evidence.length > 0 ? (
                struct.evidence.map((ev, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedEvidence(EVIDENCE_RECORDS[0]);
                      setActivePage('evidence');
                    }}
                    className="p-2 rounded bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 cursor-pointer text-xs text-slate-300 font-mono flex items-center justify-between group"
                  >
                    <span className="truncate group-hover:text-blue-300">{ev}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                  </div>
                ))
              ) : (
                <div className="p-2 text-xs text-slate-500 font-mono">
                  No evidence records linked.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Applicable Directives ({struct?.policies?.length || 0})
            </span>
            <div className="space-y-1.5">
              {struct?.policies?.map((pol, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedPolicy(POLICIES[0]);
                    setActivePage('policies');
                  }}
                  className="p-2 rounded bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 cursor-pointer text-xs text-blue-400 font-mono flex items-center justify-between group"
                >
                  <span className="truncate group-hover:underline">{pol}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Direct Workflow Actions
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActivePage('evidence')}
                className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Layers className="w-3 h-3 text-blue-400" />
                <span>View Evidence</span>
              </button>

              <button
                onClick={() => setActivePage('policies')}
                className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-purple-400" />
                <span>View Policy</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCase(AML_CASES[0]);
                  setActivePage('investigation');
                }}
                className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Briefcase className="w-3 h-3 text-amber-400" />
                <span>Open Case</span>
              </button>

              <button
                onClick={() => setActivePage('reports')}
                className="py-1.5 px-2 rounded bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center justify-center gap-1 shadow-sm cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
