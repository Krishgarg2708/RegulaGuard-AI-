import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  Printer,
  CheckCircle2,
  Lock,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RegulatoryReport, ReportType } from '../types';

export const RegulatoryReportsView: React.FC = () => {
  const {
    reports,
    addReport,
    currentPersona,
    showToast,
    addAuditLog,
    activeFinding,
  } = useApp();

  const [selectedReport, setSelectedReport] = useState<RegulatoryReport>(reports[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('SUSPICIOUS_ACTIVITY_REPORT');

  const reportTypes: { type: ReportType; label: string }[] = [
    { type: 'SUSPICIOUS_ACTIVITY_REPORT', label: 'Suspicious Activity Report (SAR / STR-01)' },
    { type: 'AML_INVESTIGATION_SUMMARY', label: 'AML Investigation Summary Dossier' },
    { type: 'RISK_FINDING_REPORT', label: 'Risk Finding & Escalation Report' },
    { type: 'INTERNAL_COMPLIANCE_REPORT', label: 'Internal Compliance & EDD Review' },
    { type: 'AUDIT_EVIDENCE_PACK', label: 'Audit Evidence Pack with Hash Certificates' },
    { type: 'REGULATORY_REVIEW_SUMMARY', label: 'Board Risk & Regulatory Review' },
  ];

  const handleGenerateNewReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const repId = `REP-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newRep: RegulatoryReport = {
        id: repId,
        caseId: 'AML-2048',
        reportType: selectedReportType,
        title: `${reportTypes.find((t) => t.type === selectedReportType)?.label} - Draft`,
        subject: `Compliance finding investigation for Case AML-2048 (CUST-1042 / ACC-88321)`,
        createdAt: new Date().toISOString(),
        executiveSummary:
          activeFinding?.executiveSummary ||
          'Automated synthesis of high-value pass-through structuring and anomalous device signatures on account ACC-88321.',
        riskAssessment: {
          score: 94,
          severity: 'CRITICAL',
          factors: [
            { label: 'Unusual Amount', score: 35, description: '19.8x baseline variance' },
            { label: 'New Device / Tor Proxy', score: 20, description: 'Tor exit relay connection' },
            { label: 'Velocity Preconditioning', score: 15, description: '4th outbound request within 45m' },
          ],
        },
        keyFindings: [
          'Extreme value deviation: ₹8,75,000 against historical benchmark of ₹42,000.',
          'Client authenticated from Tor exit relay ASN208323 with spoofed user-agent headers.',
          'Pre-flight probe payment TXN-10481 detected 7 minutes before primary extraction.',
          'Beneficiary FinApex Global Ltd incorporated in high-risk offshore hub.',
        ],
        evidenceIds: ['EVD-101', 'EVD-102', 'EVD-103', 'EVD-104'],
        applicablePolicyCodes: ['AML-TRX-07', 'FRD-ANOM-04', 'PMLA-SEC-12'],
        supportingTransactionIds: ['TXN-10482', 'TXN-10481', 'TXN-10479'],
        analystConclusion:
          'Behavior conclusively establishes violation of statutory transaction reporting thresholds under PMLA 2002. Outbound clearance freeze approved.',
        recommendedAction:
          'Maintain debit freeze, initiate re-KYC Enhanced Due Diligence, and lodge Form STR-01 with FIU-IND upon Compliance Officer sign-off.',
        status: 'AI_GENERATED_DRAFT_REQUIRES_HUMAN_REVIEW',
        integrityHash: Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join(''),
      };

      addReport(newRep);
      setSelectedReport(newRep);
      setIsGenerating(false);
    }, 400);
  };

  const handleApproveReport = () => {
    selectedReport.status = 'APPROVED_BY_OFFICER';
    selectedReport.reviewedBy = currentPersona.name;
    selectedReport.reviewedAt = new Date().toISOString();
    showToast(`Report ${selectedReport.id} officially approved by ${currentPersona.name}`, 'success');
    addAuditLog({
      user: currentPersona.name,
      role: currentPersona.id,
      action: 'APPROVED_REGULATORY_REPORT',
      caseId: selectedReport.caseId,
      reportGenerated: selectedReport.id,
      decision: 'APPROVED_BY_OFFICER',
      details: `Compliance sign-off given for ${selectedReport.id}.`,
    });
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedReport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${selectedReport.id}-audit-pack.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported structured compliance audit pack', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-extrabold text-white">
              Regulatory Report & Audit Evidence Pack Generator
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized regulatory filing dossiers (SAR, STR, AML summaries) generated with human-in-the-loop governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value as ReportType)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-mono"
          >
            {reportTypes.map((rt) => (
              <option key={rt.type} value={rt.type}>
                {rt.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerateNewReport}
            disabled={isGenerating}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Compiling Dossier...' : 'Generate Report Draft'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Generated Reports Archive ({reports.length})
          </span>

          <div className="space-y-2.5">
            {reports.map((rep) => {
              const isSelected = rep.id === selectedReport.id;

              return (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/50'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-blue-400">{rep.id}</span>
                    <span className="text-slate-400 text-[10px]">
                      {new Date(rep.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white font-sans leading-snug">
                    {rep.title}
                  </h3>

                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                        rep.status === 'APPROVED_BY_OFFICER'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {rep.status === 'APPROVED_BY_OFFICER' ? 'OFFICER SIGNED ✓' : 'HUMAN REVIEW REQUIRED'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Case: {rep.caseId}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl text-slate-100">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold uppercase tracking-wider">
              <Lock className="w-4 h-4 shrink-0" />
              <span>AI-GENERATED DRAFT — REQUIRES HUMAN REVIEW</span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              Not an official submission until signed by Compliance Officer
            </span>
          </div>

          <div className="border-b border-slate-800 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block">
                  REGULAGUARD AI • COMPLIANCE DOSSIER
                </span>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  {selectedReport.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  onClick={handleExportJson}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer"
                  title="Download JSON Audit Pack"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">JSON Pack</span>
                </button>
                {selectedReport.status !== 'APPROVED_BY_OFFICER' && (
                  <button
                    onClick={handleApproveReport}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Officer Sign-off</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-slate-400">
              <div><span className="text-slate-500">Report ID:</span> {selectedReport.id}</div>
              <div><span className="text-slate-500">Case ID:</span> {selectedReport.caseId}</div>
              <div><span className="text-slate-500">Date:</span> {new Date(selectedReport.createdAt).toLocaleDateString()}</div>
              <div>
                <span className="text-slate-500">Risk Score:</span>{' '}
                <span className="text-rose-400 font-bold">{selectedReport.riskAssessment.score}/100</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              SUBJECT / TARGET ENTITY
            </span>
            <div className="text-xs font-semibold text-white font-mono bg-slate-950/60 p-2 rounded border border-slate-800">
              {selectedReport.subject}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              1. EXECUTIVE SUMMARY
            </span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800">
              {selectedReport.executiveSummary}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              2. KEY FINDINGS & TELEMETRY
            </span>
            <div className="space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
              {selectedReport.keyFindings.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                  <span className="text-blue-400 font-mono font-bold">•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                3. EVIDENCE IDENTIFIERS
              </span>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs font-mono">
                {selectedReport.evidenceIds.map((e) => (
                  <div key={e} className="flex justify-between text-slate-300">
                    <span className="text-blue-400">{e}</span>
                    <span className="text-emerald-400 text-[10px]">Verified ✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                4. APPLICABLE POLICIES & STATUTES
              </span>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs font-mono">
                {selectedReport.applicablePolicyCodes.map((p) => (
                  <div key={p} className="flex justify-between text-slate-300">
                    <span className="text-purple-400">{p}</span>
                    <span className="text-slate-400 text-[10px]">Mandatory</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                5. ANALYST CONCLUSION & STATUTORY RECOMMENDATION
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedReport.analystConclusion}
              </p>
            </div>

            <div className="p-2.5 rounded bg-blue-950/30 border border-blue-500/30 text-xs font-mono">
              <span className="text-blue-400 font-bold block mb-0.5">ACTION PLAN:</span>
              <span className="text-slate-300">{selectedReport.recommendedAction}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
            <div>
              Integrity SHA-256 Digest: {selectedReport.integrityHash}
            </div>
            <div>
              Reviewed by:{' '}
              <span className="text-emerald-400 font-semibold">
                {selectedReport.reviewedBy || 'Pending Officer Sign-off'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
