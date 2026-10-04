import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  UserPersona,
  Transaction,
  AMLCase,
  RiskSignal,
  PolicyDocument,
  EvidenceRecord,
  AuditLogEntry,
  RegulatoryReport,
  FindingRecord,
} from '../types';
import {
  USER_PERSONAS,
  TRANSACTIONS,
  AML_CASES,
  RISK_SIGNALS,
  POLICIES,
  EVIDENCE_RECORDS,
  AUDIT_LOGS,
} from '../data/mockData';

export type NavigationPage =
  | 'dashboard'
  | 'signals'
  | 'fraud'
  | 'aml'
  | 'credit'
  | 'liquidity'
  | 'copilot'
  | 'investigation'
  | 'evidence'
  | 'policies'
  | 'network'
  | 'reports'
  | 'audit'
  | 'settings';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentPersona: UserPersona;
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (txn: Transaction | null) => void;
  selectedCase: AMLCase | null;
  setSelectedCase: (c: AMLCase | null) => void;
  selectedSignal: RiskSignal | null;
  setSelectedSignal: (sig: RiskSignal | null) => void;
  selectedPolicy: PolicyDocument | null;
  setSelectedPolicy: (policy: PolicyDocument | null) => void;
  selectedEvidence: EvidenceRecord | null;
  setSelectedEvidence: (evd: EvidenceRecord | null) => void;

  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'hash'>) => void;

  reports: RegulatoryReport[];
  addReport: (report: RegulatoryReport) => void;

  activeFinding: FindingRecord | null;
  setActiveFinding: (f: FindingRecord | null) => void;

  demoScenarioStep: number;
  setDemoScenarioStep: (step: number) => void;
  startDemoScenario: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  resetDemoScenario: () => void;
  isCaseCompleted: boolean;
  setIsCaseCompleted: (completed: boolean) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  piiMaskingEnabled: boolean;
  setPiiMaskingEnabled: (enabled: boolean) => void;

  toasts: ToastInfo[];
  showToast: (message: string, type?: ToastInfo['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('compliance_officer');
  const [activePage, setActivePage] = useState<NavigationPage>('dashboard');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(TRANSACTIONS[0]);
  const [selectedCase, setSelectedCase] = useState<AMLCase | null>(AML_CASES[0]);
  const [selectedSignal, setSelectedSignal] = useState<RiskSignal | null>(RISK_SIGNALS[0]);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument | null>(POLICIES[0]);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceRecord | null>(EVIDENCE_RECORDS[0]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(AUDIT_LOGS);
  const [demoScenarioStep, setDemoScenarioStep] = useState<number>(0);
  const [isCaseCompleted, setIsCaseCompleted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [piiMaskingEnabled, setPiiMaskingEnabled] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const [activeFinding, setActiveFinding] = useState<FindingRecord | null>({
    id: 'FND-8801',
    caseId: 'AML-2048',
    title: 'Potential Structuring & Rapid Offshore Pass-Through Extraction',
    severity: 'CRITICAL',
    status: 'AUDIT_READY',
    signals: ['SIG-901', 'SIG-902', 'SIG-903'],
    evidenceIds: ['EVD-101', 'EVD-102', 'EVD-103', 'EVD-104'],
    policyIds: ['POL-AM-07', 'POL-FRD-04', 'POL-AML-01'],
    confidence: 96,
    executiveSummary:
      'An anomalous debit of ₹8,75,000 (19.8x baseline) was executed from account ACC-88321 via an unrecognized Tor proxy IP immediately following pass-through pre-funding and beneficiary creation.',
    detailedAnalysis:
      'Behavior matches classic layering and flight capital patterns. Client had no prior transactions exceeding ₹75,000. Outbound destination FinApex Global Ltd is a newly incorporated offshore entity with opaque ownership.',
    recommendedAction:
      'Freeze outbound clearing, place account ACC-88321 under Enhanced Due Diligence (EDD), and draft Suspicious Transaction Report (STR-01) for FIU-IND.',
    conclusion:
      'Empirical evidence conclusively establishes violation of AML Rule AM-07 and Cyber Security Directive FRD-ANOM-04. Immediate supervisory restraint required.',
    createdAt: '2026-10-04T07:55:00Z',
    analyst: 'Vikram Seth & Pooja Nair',
  });

  const [reports, setReports] = useState<RegulatoryReport[]>([
    {
      id: 'REP-2026-081',
      caseId: 'AML-2048',
      reportType: 'SUSPICIOUS_ACTIVITY_REPORT',
      title: 'Suspicious Activity Report (SAR) - Draft: Case AML-2048',
      subject: 'Anomalous High-Velocity Outflow to Offshore Shell Entity (ACC-88321 / CUST-1042)',
      createdAt: '2026-10-04T07:58:00Z',
      executiveSummary:
        'Investigation into transaction TXN-10482 identified high-risk pass-through structuring and an offshore extraction of ₹8,75,000 from account ACC-88321, deviating by 19.8x from the 90-day benchmark. Activity was routed via a Tor exit relay IP and newly registered offshore beneficiary.',
      riskAssessment: {
        score: 94,
        severity: 'CRITICAL',
        factors: [
          { label: 'Unusual Amount', score: 35, description: '19.8x spike above ₹42k historical baseline' },
          { label: 'New Device', score: 20, description: 'Tor browser proxy node login with spoofed user-agent' },
          { label: 'Velocity Spike', score: 15, description: '4th high-speed payment in 45m window' },
          { label: 'Geographic Mismatch', score: 14, description: 'Hong Kong proxy IP vs domestic Mumbai registration' },
          { label: 'New Beneficiary', score: 10, description: 'Added 6 minutes prior to payment clearance' },
        ],
      },
      keyFindings: [
        'Transaction amount ₹8,75,000 exceeds 90-day average by 19.8x.',
        'Session authenticated from Tor exit relay ASN208323.',
        'Pre-payment test probe of ₹49,500 executed 7 minutes prior.',
        'Beneficiary FinApex Global Ltd incorporated in offshore jurisdiction with bearer shares.',
      ],
      evidenceIds: ['EVD-101', 'EVD-102', 'EVD-103', 'EVD-104'],
      applicablePolicyCodes: ['AML-TRX-07', 'FRD-ANOM-04', 'PMLA-SEC-12'],
      supportingTransactionIds: ['TXN-10482', 'TXN-10481', 'TXN-10479'],
      analystConclusion:
        'The aggregated behavioral, network, and device indicators establish a high probability of unauthorized flight capital or account takeover laundering. Immediate regulatory notification under PMLA Section 12 is warranted.',
      recommendedAction:
        'Enforce 24-hour statutory hold, require Enhanced Due Diligence (EDD) documentation, and dispatch Form STR-01 to FIU-IND upon Compliance Officer sign-off.',
      status: 'AI_GENERATED_DRAFT_REQUIRES_HUMAN_REVIEW',
      integrityHash: 'a718c39de947514a42b91873918cc74019a8201548bce92019a2840182390141',
    },
  ]);

  const currentPersona = USER_PERSONAS.find(p => p.id === activeRole) || USER_PERSONAS[0];

  const showToast = (message: string, type: ToastInfo['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'hash'>) => {
    const id = `AUD-${1000 + auditLogs.length + 1}`;
    const timestamp = new Date().toISOString();
    const hash = Array.from(crypto.getRandomValues(new Uint8Array(20)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const newLog: AuditLogEntry = {
      id,
      timestamp,
      hash,
      ...entry,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addReport = (report: RegulatoryReport) => {
    setReports(prev => [report, ...prev]);
    showToast(`Generated Regulatory Report ${report.id}`, 'success');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'GENERATED_REGULATORY_REPORT',
      caseId: report.caseId,
      details: `Generated ${report.reportType} report titled "${report.title}". Status: DRAFT.`,
      reportGenerated: report.id,
    });
  };

  const startDemoScenario = () => {
    setDemoScenarioStep(1);
    setIsCaseCompleted(false);
    setActivePage('dashboard');
    showToast('Starting Hackathon Demo: Scenario Step 1 - Critical Risk Signal on Dashboard', 'info');
  };

  const nextDemoStep = () => {
    const nextStep = demoScenarioStep + 1;
    if (nextStep > 11) {
      setDemoScenarioStep(11);
      setIsCaseCompleted(true);
      return;
    }
    setDemoScenarioStep(nextStep);

    switch (nextStep) {
      case 1:
        setActivePage('dashboard');
        break;
      case 2:
      case 3:
        setSelectedTransaction(TRANSACTIONS[0]);
        setActivePage('fraud');
        break;
      case 4:
      case 5:
        setSelectedCase(AML_CASES[0]);
        setActivePage('investigation');
        break;
      case 6:
        setActivePage('network');
        break;
      case 7:
        setActivePage('copilot');
        break;
      case 8:
        setActivePage('evidence');
        break;
      case 9:
        setActivePage('investigation');
        break;
      case 10:
        setActivePage('reports');
        break;
      case 11:
        setIsCaseCompleted(true);
        setActivePage('audit');
        break;
    }
  };

  const prevDemoStep = () => {
    if (demoScenarioStep <= 1) {
      setDemoScenarioStep(0);
      return;
    }
    setDemoScenarioStep(prev => prev - 1);
  };

  const resetDemoScenario = () => {
    setDemoScenarioStep(0);
    setIsCaseCompleted(false);
    showToast('Demo scenario reset to initial state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentPersona,
        activePage,
        setActivePage,
        selectedTransaction,
        setSelectedTransaction,
        selectedCase,
        setSelectedCase,
        selectedSignal,
        setSelectedSignal,
        selectedPolicy,
        setSelectedPolicy,
        selectedEvidence,
        setSelectedEvidence,
        auditLogs,
        addAuditLog,
        reports,
        addReport,
        activeFinding,
        setActiveFinding,
        demoScenarioStep,
        setDemoScenarioStep,
        startDemoScenario,
        nextDemoStep,
        prevDemoStep,
        resetDemoScenario,
        isCaseCompleted,
        setIsCaseCompleted,
        searchQuery,
        setSearchQuery,
        piiMaskingEnabled,
        setPiiMaskingEnabled,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
