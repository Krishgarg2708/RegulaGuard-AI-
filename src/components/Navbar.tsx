import React from 'react';
import {
  ShieldCheck,
  Search,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { USER_PERSONAS } from '../data/mockData';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeRole,
    setActiveRole,
    currentPersona,
    demoScenarioStep,
    startDemoScenario,
    resetDemoScenario,
    searchQuery,
    setSearchQuery,
    piiMaskingEnabled,
    setPiiMaskingEnabled,
    setActivePage,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="flex items-center justify-between px-4 py-2.5 gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-200 bg-clip-text text-transparent">
                RegulaGuard<span className="text-blue-400 font-mono text-sm ml-1 px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Banking Core Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
              From Risk Signal to Audit-Ready Evidence.
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search TXN-10482, ACC-88321, CUST-1042, AML-2048, or Rule AM-07..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-md pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {demoScenarioStep === 0 ? (
            <button
              onClick={startDemoScenario}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition-all border border-blue-400/40 cursor-pointer"
              title="Launch the 11-step hackathon end-to-end demo scenario"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Demo Scenario</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-500/40 px-2.5 py-1 rounded-md">
              <span className="text-xs font-mono font-semibold text-blue-300">
                Demo Step {demoScenarioStep}/11
              </span>
              <button
                onClick={resetDemoScenario}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Reset demo scenario"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div
            onClick={() => setActivePage('audit')}
            className="cursor-pointer hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-colors"
            title="Current Audit Trail Readiness & Evidence Integrity"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <div className="text-[11px] leading-tight">
              <span className="text-slate-400">Audit Ready:</span>{' '}
              <span className="font-mono font-bold text-emerald-400">94%</span>
            </div>
          </div>

          <button
            onClick={() => setPiiMaskingEnabled(!piiMaskingEnabled)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              piiMaskingEnabled
                ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/40'
            }`}
            title="Toggle PII Masking"
          >
            {piiMaskingEnabled ? (
              <>
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden xl:inline">PII Masked</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xl:inline text-amber-400">Unmasked</span>
              </>
            )}
          </button>

          <div className="relative flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-md px-2 py-1">
            <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="flex flex-col text-left">
              <label htmlFor="persona-select" className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                Persona
              </label>
              <select
                id="persona-select"
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer pr-1"
              >
                {USER_PERSONAS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-slate-100">
                    {p.name} ({p.title.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
