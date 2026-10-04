/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { WorkflowPipelineBar } from './components/WorkflowPipelineBar';
import { DemoScenarioFloatingBar } from './components/DemoScenarioFloatingBar';
import { CaseCompleteModal } from './components/CaseCompleteModal';
import { ToastContainer } from './components/ToastContainer';

import { DashboardView } from './views/DashboardView';
import { RiskSignalsView } from './views/RiskSignalsView';
import { FraudMonitoringView } from './views/FraudMonitoringView';
import { AMLMonitoringView } from './views/AMLMonitoringView';
import { CreditRiskView } from './views/CreditRiskView';
import { LiquidityRiskView } from './views/LiquidityRiskView';
import { AICopilotView } from './views/AICopilotView';
import { InvestigationWorkspaceView } from './views/InvestigationWorkspaceView';
import { EvidenceExplorerView } from './views/EvidenceExplorerView';
import { PolicyIntelligenceView } from './views/PolicyIntelligenceView';
import { TransactionNetworkView } from './views/TransactionNetworkView';
import { RegulatoryReportsView } from './views/RegulatoryReportsView';
import { AuditTrailView } from './views/AuditTrailView';
import { SettingsView } from './views/SettingsView';

import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Radio,
  FileCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activePage, setActivePage, startDemoScenario } = useApp();
  const [showLandingBanner, setShowLandingBanner] = useState<boolean>(true);

  const renderActiveView = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView />;
      case 'signals':
        return <RiskSignalsView />;
      case 'fraud':
        return <FraudMonitoringView />;
      case 'aml':
        return <AMLMonitoringView />;
      case 'credit':
        return <CreditRiskView />;
      case 'liquidity':
        return <LiquidityRiskView />;
      case 'copilot':
        return <AICopilotView />;
      case 'investigation':
        return <InvestigationWorkspaceView />;
      case 'evidence':
        return <EvidenceExplorerView />;
      case 'policies':
        return <PolicyIntelligenceView />;
      case 'network':
        return <TransactionNetworkView />;
      case 'reports':
        return <RegulatoryReportsView />;
      case 'audit':
        return <AuditTrailView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <WorkflowPipelineBar />

      {/* Value Proposition Landing Banner (Section 38) */}
      {showLandingBanner && activePage === 'dashboard' && (
        <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-blue-500/30 px-6 py-4 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Fintech Risk Operating Layer
                </span>
                <span className="text-xs text-slate-400">
                  “From Risk Signal to Audit-Ready Evidence.”
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-white">
                Turn Risk Signals Into Audit-Ready Decisions.
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                An AI-powered risk & compliance copilot that connects real-time transactions, account behavior, regulatory policy, and evidence into explainable, review-ready outputs.
              </p>

              {/* 3 Core Pillars (Section 38) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 font-mono">
                    <Radio className="w-3.5 h-3.5" />
                    <span>DETECT</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Surface fraud, AML structuring, credit, and liquidity signals.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>EXPLAIN</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Connect every finding to empirical evidence and governing policy.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>REPORT</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Turn complex investigations into audit-ready regulatory drafts.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={startDemoScenario}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 border border-blue-400/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch 11-Step Demo Scenario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowLandingBanner(false)}
                className="text-[11px] text-slate-400 hover:text-slate-200 text-center cursor-pointer"
              >
                Dismiss Header Banner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-950 pb-20">
          {renderActiveView()}
        </main>
      </div>

      <DemoScenarioFloatingBar />
      <CaseCompleteModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
