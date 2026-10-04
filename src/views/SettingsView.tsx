import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const {
    piiMaskingEnabled,
    setPiiMaskingEnabled,
    showToast,
    resetDemoScenario,
  } = useApp();

  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(85);
  const [coolingPeriodHours, setCoolingPeriodHours] = useState<number>(24);

  const handleSave = () => {
    showToast('Governance parameters saved and distributed to risk cluster', 'success');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-extrabold text-white">
            System Architecture & AI Governance Controls
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Configurable model guardrails, deterministic scoring parameters, and compliance audit thresholds.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Mandatory AI Guardrails (10 Rules Active)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block">1. No Unsupported Regulatory Claims</span>
              <span className="text-slate-400 text-[11px]">Prohibits AI from inventing statutes not found in corpus.</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block">2. No Fabricated Evidence</span>
              <span className="text-slate-400 text-[11px]">Citations require valid SHA-256 ledger checksum.</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block">3. Fact vs Interpretation Boundary</span>
              <span className="text-slate-400 text-[11px]">Explicitly delineates telemetry facts from statistical inference.</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block">4. Mandatory Human Review Banner</span>
              <span className="text-slate-400 text-[11px]">All reports labeled as draft until officer signature.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Surveillance & RAG Parameters
        </h2>

        <div className="space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div>
              <span className="text-slate-200 font-bold block">PII Masking Protocol</span>
              <span className="text-slate-400 text-[11px]">
                Redact customer full names and tax IDs (e.g. R**** S*****)
              </span>
            </div>
            <button
              onClick={() => setPiiMaskingEnabled(!piiMaskingEnabled)}
              className={`px-3 py-1 rounded font-bold text-xs transition-colors cursor-pointer ${
                piiMaskingEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {piiMaskingEnabled ? 'ACTIVE (MASKED)' : 'DISABLED'}
            </button>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-200 font-bold">Minimum Copilot Confidence Floor</span>
              <span className="text-blue-400 font-bold">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">
              Queries with confidence below threshold output: "Insufficient evidence to support a definitive conclusion."
            </span>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-200 font-bold">Statutory Cooling-Off Hold Period</span>
              <span className="text-amber-400 font-bold">{coolingPeriodHours} Hours</span>
            </div>
            <input
              type="range"
              min="2"
              max="72"
              value={coolingPeriodHours}
              onChange={(e) => setCoolingPeriodHours(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={resetDemoScenario}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Reset Demo Environment
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
          >
            Save Parameters
          </button>
        </div>
      </div>
    </div>
  );
};
