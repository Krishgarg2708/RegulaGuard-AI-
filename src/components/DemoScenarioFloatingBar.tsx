import React from 'react';
import {
  ChevronLeft,
  X,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoScenarioFloatingBar: React.FC = () => {
  const {
    demoScenarioStep,
    nextDemoStep,
    prevDemoStep,
    resetDemoScenario,
    setIsCaseCompleted,
  } = useApp();

  if (demoScenarioStep === 0) return null;

  const scenarioSteps = [
    {
      step: 1,
      title: 'Step 1: CRITICAL Risk Signal on Dashboard',
      description: 'Compliance Officer notices an extreme deviation alert on transaction TXN-10482 (₹8,75,000).',
      actionText: 'Inspect Flagged Transaction',
    },
    {
      step: 2,
      title: 'Step 2: Open Suspicious Transaction Details',
      description: 'Fraud Detection console displays TXN-10482 executed from a Tor exit node to an offshore beneficiary.',
      actionText: 'Review Factor Breakdown',
    },
    {
      step: 3,
      title: 'Step 3: Explainable Risk Factor Breakdown',
      description: 'System reveals +35 Unusual Amount (19.8x), +20 New Device, +15 Velocity, +14 Geo Anomaly, +10 New Beneficiary = 94/100.',
      actionText: 'Launch Formal Investigation',
    },
    {
      step: 4,
      title: 'Step 4: Open Investigation Workspace (AML-2048)',
      description: 'Analyst initiates formal investigation workspace for customer CUST-1042 / account ACC-88321.',
      actionText: 'View Connected Transactions',
    },
    {
      step: 5,
      title: 'Step 5: Correlate Related Accounts & Pre-Funding',
      description: 'Timeline reveals rapid pre-funding of ₹4,50,000 from secondary account ACC-44910 and micro-probe TXN-10481.',
      actionText: 'Examine Network Graph',
    },
    {
      step: 6,
      title: 'Step 6: Network Graph Visual Analysis',
      description: 'Graph visualization reveals connected overseas entity FinApex Global Ltd & offshore escrow money cycle.',
      actionText: 'Ask Governed AI Copilot',
    },
    {
      step: 7,
      title: 'Step 7: Ask Governed AI Copilot',
      description: 'Copilot query: "Why is transaction TXN-10482 suspicious and which AML policy applies?"',
      actionText: 'Retrieve Policy & Evidence',
    },
    {
      step: 8,
      title: 'Step 8: Grounded Policy & Evidence Matching',
      description: 'RAG engine retrieves AML Rule AM-07 Sec 4.3(b) and Cyber Security Directive FRD-ANOM-04 with SHA-256 hashes.',
      actionText: 'Synthesize Formal Finding',
    },
    {
      step: 9,
      title: 'Step 9: Generate Compliance Finding Record',
      description: 'Formal finding FND-8801 synthesized with 96% confidence and statutory 24-hour freeze recommendation.',
      actionText: 'Generate Audit-Ready Report',
    },
    {
      step: 10,
      title: 'Step 10: Generate Structured Regulatory Report',
      description: 'Draft SAR report generated with executive summary, evidence matrix, policy citations, and officer sign-off prompt.',
      actionText: 'Verify Immutable Audit Trail',
    },
    {
      step: 11,
      title: 'Step 11: Final Audit Trail & Case Complete',
      description: 'Immutable chronological audit logs record every prompt, evidence hash, decision, and report draft.',
      actionText: 'View Case Complete Summary',
    },
  ];

  const current = scenarioSteps[demoScenarioStep - 1] || scenarioSteps[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900/95 border-2 border-blue-500/80 shadow-2xl shadow-blue-900/50 rounded-xl p-4 backdrop-blur-md text-white">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400 flex items-center justify-center shrink-0">
              <span className="font-mono font-extrabold text-blue-300 text-sm">
                {demoScenarioStep}/11
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Hackathon Demo Walkthrough
                </span>
                <span className="text-xs font-bold text-white truncate">
                  {current.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-snug">
                {current.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {demoScenarioStep > 1 && (
              <button
                onClick={prevDemoStep}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {demoScenarioStep < 11 ? (
              <button
                onClick={nextDemoStep}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/30 border border-blue-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{current.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsCaseCompleted(true)}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/30 border border-emerald-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Show Case Complete</span>
              </button>
            )}

            <button
              onClick={resetDemoScenario}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700 cursor-pointer"
              title="Exit demo scenario"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden flex">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 border-r border-slate-900 last:border-0 transition-all ${
                i + 1 <= demoScenarioStep ? 'bg-blue-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
