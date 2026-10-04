import React from 'react';
import {
  Database,
  Radio,
  SlidersHorizontal,
  Briefcase,
  BookOpen,
  Layers,
  Sparkles,
  FileCheck,
  Award,
  History,
  ChevronRight,
} from 'lucide-react';
import { useApp, NavigationPage } from '../context/AppContext';

interface PipelineStep {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  page: NavigationPage;
  description: string;
}

export const WorkflowPipelineBar: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const steps: PipelineStep[] = [
    { id: 'data', name: 'Data', icon: Database, page: 'dashboard', description: 'Core ledgers & logs' },
    { id: 'signal', name: 'Signal Detection', icon: Radio, page: 'signals', description: 'Real-time telemetry' },
    { id: 'scoring', name: 'Risk Scoring', icon: SlidersHorizontal, page: 'fraud', description: '7-Factor engine' },
    { id: 'investigation', name: 'Investigation', icon: Briefcase, page: 'investigation', description: 'Workspace' },
    { id: 'policy', name: 'Policy Matching', icon: BookOpen, page: 'policies', description: 'RAG directives' },
    { id: 'evidence', name: 'Evidence Collection', icon: Layers, page: 'evidence', description: '7-Tier drilldown' },
    { id: 'explanation', name: 'AI Explanation', icon: Sparkles, page: 'copilot', description: 'Governed Copilot' },
    { id: 'finding', name: 'Finding', icon: FileCheck, page: 'investigation', description: 'Deterministic proof' },
    { id: 'output', name: 'Regulatory Output', icon: Award, page: 'reports', description: 'SAR / STR draft' },
    { id: 'audit', name: 'Audit Trail', icon: History, page: 'audit', description: 'Immutable log' },
  ];

  return (
    <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2 overflow-x-auto select-none">
      <div className="flex items-center gap-1 min-w-[980px]">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mr-2 shrink-0 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Compliance Pipeline
        </div>

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activePage === step.page;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setActivePage(step.page)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`${step.name}: ${step.description}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className={`text-[11px] font-medium ${isActive ? 'text-blue-300 font-semibold' : ''}`}>
                  {step.name}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <ChevronRight className="w-3 h-3 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
