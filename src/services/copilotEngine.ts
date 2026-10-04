import {
  POLICIES,
  TRANSACTIONS,
  RISK_SIGNALS,
  AML_CASES,
  EVIDENCE_RECORDS,
} from '../data/mockData';
import { searchPolicies } from './ragService';
import { CopilotMessage } from '../types';

export interface CopilotResponse {
  message: CopilotMessage;
  auditDetails: {
    action: string;
    details: string;
    evidenceUsed: string[];
    policyUsed: string[];
  };
}

export function processCopilotQuery(query: string): CopilotResponse {
  const q = query.toLowerCase().trim();
  const timestamp = new Date().toISOString();
  const msgId = `copilot-${Date.now()}`;

  if (q.includes('10482') || (q.includes('why') && q.includes('flagged') && (q.includes('8.75') || q.includes('875000')))) {
    const relatedPolicies = [POLICIES[0], POLICIES[2]];
    const relatedEvidence = EVIDENCE_RECORDS.filter(e => e.transactionId === 'TXN-10482' || e.caseId === 'AML-2048');

    return {
      message: {
        id: msgId,
        sender: 'assistant',
        timestamp,
        text: `Transaction TXN-10482 was flagged due to an extreme value anomaly (₹8,75,000, which is 19.8x the historical baseline of ₹42,000) combined with an unrecognized Tor exit relay IP and newly registered offshore beneficiary.`,
        structured: {
          answer: `Transaction TXN-10482 was flagged due to an extreme value deviation of 19.8x against customer historical baseline, executed from an unregistered Tor proxy IP shortly after a new offshore beneficiary creation.`,
          riskScore: 94,
          keySignals: [
            'Transaction value ₹8,75,000 is 19.8x the customer 90-day moving average (₹42,000)',
            'Session originated from Windows Tor exit relay node (185.220.101.44) with zero prior history',
            'Outbound transfer executed 6 minutes after adding new beneficiary FinApex Global Ltd',
            'Preceded by a probe payment of ₹49,500 and pass-through pre-funding credit within 45 minutes',
          ],
          reasoning:
            'The behavioral deviation (+35) compounded with device anomaly (+20) and velocity spikes (+15) exceeds the critical risk boundary of 80/100, triggering an automated cooling-off hold under bank fraud protocols.',
          evidence: [
            'EVD-101: Core Banking Ledger debit record of ₹8,75,000 via IMPS',
            'EVD-102: Threat intelligence confirmation of Tor exit relay ASN208323',
            'EVD-103: Pre-payment velocity log showing probe transaction TXN-10481',
            'EVD-104: Offshore corporate registry verification of FinApex Global Ltd shell entity',
          ],
          policies: [
            'AML Transaction Monitoring Rule AM-07 (Section 4.3(b) - High Velocity & Smurfing Surveillance)',
            'Digital Fraud Alert Directive FRD-ANOM-04 (Clause 6.1.4 - Digital Channel Risk Triggers)',
          ],
          confidence: 96,
          recommendedAction:
            'Maintain immediate outbound clearance freeze on ACC-88321, issue formal notification to Chief Compliance Officer, and escalate case AML-2048 for Enhanced Due Diligence.',
          caseId: 'AML-2048',
          txnId: 'TXN-10482',
          findingId: 'FND-8801',
          policyDetails: relatedPolicies,
          evidenceDetails: relatedEvidence,
        },
      },
      auditDetails: {
        action: 'COPILOT_FRAUD_TRANSACTION_EXPLAIN',
        details: 'Explained TXN-10482 risk factors, citing Rule AM-07 and FRD-ANOM-04 with 4 evidence records.',
        evidenceUsed: ['EVD-101', 'EVD-102', 'EVD-103', 'EVD-104'],
        policyUsed: ['POL-AM-07', 'POL-FRD-04'],
      },
    };
  }

  if (q.includes('structuring') || q.includes('smurfing') || q.includes('1023') || q.includes('sub-threshold')) {
    const relatedPolicies = [POLICIES[0], POLICIES[1]];
    const relatedEvidence = EVIDENCE_RECORDS.filter(e => e.caseId === 'AML-2049');

    return {
      message: {
        id: msgId,
        sender: 'assistant',
        timestamp,
        text: `Identified systematic structuring (smurfing) behavior on account ACC-10294 (Customer CUST-1023 / A**** G*****). Three consecutive transfers of ₹4,90,000, ₹4,85,000, and ₹4,92,000 were intentionally dispersed within 70 minutes to circumvent the statutory ₹5,00,000 reporting threshold.`,
        structured: {
          answer: `Account ACC-10294 exhibits classic structuring/smurfing characteristics: multiple transactions clustered tightly below the statutory threshold of ₹5,00,000 within a 70-minute window.`,
          riskScore: 91,
          keySignals: [
            '3 distinct RTGS debits (TXN-10231, TXN-10232, TXN-10248) positioned 1.6% - 3.0% below statutory threshold',
            'Cumulative outbound volume of ₹14,67,000 dispersed to 3 separate entities within 70 minutes',
            'Customer historical daily clearing average is ₹1,20,000 (12.2x aggregate daily breach)',
          ],
          reasoning:
            'Intentional fragmentation of transfers below legal reporting thresholds constitutes an explicit red flag under PMLA 2002 and RBI AML Direction 2016.',
          evidence: [
            'EVD-105: RTGS batch clearing logs confirming 3 transfers (₹4.90L, ₹4.85L, ₹4.92L)',
            'EVD-106: PMLA Rule 3(1)(B) statutory violation cross-match record',
            'TXN-10231, TXN-10232, TXN-10248 inter-bank payment manifests',
          ],
          policies: [
            'AML Transaction Monitoring Rule AM-07 (Section 4.3(b))',
            'PMLA Section 12 & Rule 3(1)(B) Integrally Connected Transactions',
          ],
          confidence: 94,
          recommendedAction:
            'Consolidate tranches into single AML case AML-2049, initiate beneficial ownership inquiry with recipient banks, and draft Suspicious Transaction Report (STR).',
          caseId: 'AML-2049',
          txnId: 'TXN-10231',
          policyDetails: relatedPolicies,
          evidenceDetails: relatedEvidence,
        },
      },
      auditDetails: {
        action: 'COPILOT_AML_STRUCTURING_DETECTION',
        details: 'Identified structuring on ACC-10294, mapped to PMLA Rule 3(1)(B) and Rule AM-07.',
        evidenceUsed: ['EVD-105', 'EVD-106'],
        policyUsed: ['POL-AM-07', 'POL-AML-01'],
      },
    };
  }

  if (q.includes('top') || q.includes('signals') || q.includes('24 hours') || q.includes('today')) {
    const criticalSignals = RISK_SIGNALS.filter(s => s.severity === 'CRITICAL');
    return {
      message: {
        id: msgId,
        sender: 'assistant',
        timestamp,
        text: `Surfaced ${criticalSignals.length} CRITICAL risk signals in the current monitoring window, led by SIG-901 (TXN-10482 19.8x deviation), SIG-904 (Structuring on ACC-10294), and SIG-906 (Circular Routing Ring on ACC-66014).`,
        structured: {
          answer: `There are currently ${criticalSignals.length} active CRITICAL risk signals requiring immediate intervention. Primary threat vectors involve cross-border pass-through extractions, smurfing below ₹5L, and circular funds round-tripping.`,
          riskScore: 92,
          keySignals: criticalSignals.slice(0, 5).map(s => `${s.id}: ${s.signalTitle} - Score: ${s.riskScore}/100 (${s.customerName})`),
          reasoning:
            'Multiple concurrent high-velocity and threshold-evasion patterns suggest coordinated financial crime activity across retail and SME accounts.',
          evidence: [
            'SIG-901 / TXN-10482: ₹8,75,000 offshore proxy extraction',
            'SIG-904 / TXN-10248: ₹14,67,000 3-tranche smurfing pattern',
            'SIG-906 / ACC-66014: 3-node circular routing cycle with 94% retention',
            'SIG-905 / ACC-77401: ₹2.45 Crore rapid pass-through turnover',
          ],
          policies: [
            'AML Transaction Monitoring Rule AM-07',
            'RBI Master Direction on KYC & AML/CFT Chapter VI',
            'PMLA 2002 Section 12 Surveillance Directive',
          ],
          confidence: 95,
          recommendedAction:
            'Triage SIG-901 and SIG-904 into active investigation queues; enforce debit locks pending supervisory sign-off.',
          caseId: 'AML-2048',
        },
      },
      auditDetails: {
        action: 'COPILOT_SURFACE_CRITICAL_SIGNALS',
        details: `Aggregated ${criticalSignals.length} critical signals across core banking and card rails.`,
        evidenceUsed: ['EVD-101', 'EVD-105'],
        policyUsed: ['POL-AM-07', 'POL-AML-01'],
      },
    };
  }

  if (q.includes('policy') || q.includes('regulation') || q.includes('rule') || q.includes('requirement')) {
    const searchRes = searchPolicies(query, 3);
    const topPolicy = searchRes[0]?.policy || POLICIES[0];

    return {
      message: {
        id: msgId,
        sender: 'assistant',
        timestamp,
        text: `Retrieved primary applicable regulatory standard: ${topPolicy.code} - ${topPolicy.title}, issued by ${topPolicy.regulator}.`,
        structured: {
          answer: `Applicable regulatory requirement is ${topPolicy.code}: "${topPolicy.title}", published in ${topPolicy.source} (Section ${topPolicy.section}, Page ${topPolicy.page}).`,
          riskScore: 88,
          keySignals: [
            `Regulatory Authority: ${topPolicy.regulator}`,
            `Jurisdiction: ${topPolicy.jurisdiction}`,
            `Mandatory Rule: ${topPolicy.mandatoryRule}`,
            `Filing Requirement: ${topPolicy.filingRequirement || 'Internal finding archive'}`,
          ],
          reasoning: topPolicy.summary,
          evidence: [
            `Policy Document: ${topPolicy.id} (Last revised: ${topPolicy.lastUpdated})`,
            `Exact clause citation: "${topPolicy.fullExcerpt.slice(0, 180)}..."`,
          ],
          policies: searchRes.map(r => `${r.policy.code}: ${r.policy.title} (${r.sourceCitation})`),
          confidence: 98,
          recommendedAction: `Apply mandatory requirements under ${topPolicy.code}: ${topPolicy.mandatoryRule}`,
          policyDetails: searchRes.map(r => r.policy),
        },
      },
      auditDetails: {
        action: 'COPILOT_RAG_POLICY_RETRIEVAL',
        details: `Retrieved ${searchRes.length} policies matching query terms; top match ${topPolicy.code}.`,
        evidenceUsed: ['EVD-106'],
        policyUsed: searchRes.map(r => r.policy.id),
      },
    };
  }

  if (q.includes('summary') || q.includes('report') || q.includes('audit-ready') || q.includes('2048') || q.includes('investigation')) {
    const c = AML_CASES.find(c => c.id === 'AML-2048') || AML_CASES[0];
    const relatedEvidence = EVIDENCE_RECORDS.filter(e => e.caseId === c.id);

    return {
      message: {
        id: msgId,
        sender: 'assistant',
        timestamp,
        text: `Compiled formal AML Investigation Summary for Case ${c.id}: "${c.title}". The finding is backed by 4 cryptographically verified evidence records and 2 regulatory policies, ready for compliance officer sign-off.`,
        structured: {
          answer: `Investigation Summary for ${c.id}: Customer CUST-1042 utilized account ACC-88321 to execute rapid transit extraction of ₹8,75,000 to an offshore entity, routed via a Tor proxy. Finding status is AUDIT-READY draft.`,
          riskScore: c.riskScore,
          keySignals: [
            '19.8x anomalous amount spike (₹8,75,000 vs ₹42,000 baseline)',
            'Tor exit relay connection (ASN208323) with device fingerprint spoofing',
            'Pre-funding pass-through flow from secondary account within 24 minutes',
            'Newly created offshore entity with bearer shares registered in high-risk hub',
          ],
          reasoning:
            'The convergence of behavioral deviation, proxy network evasion, and velocity probe transactions fulfills the statutory criteria for Suspicious Transaction Reporting under PMLA 2002 and Rule AM-07.',
          evidence: [
            'EVD-101: IMPS clearing log for TXN-10482 (Hash: e3b0c442...)',
            'EVD-102: Threat intelligence proxy report (Hash: 7d1a5412...)',
            'EVD-103: Pre-payment velocity audit trail (Hash: 5e884898...)',
            'EVD-104: Corporate registry verification dossier (Hash: 4b227777...)',
          ],
          policies: [
            'AML Transaction Monitoring Rule AM-07 (Section 4.3(b))',
            'Digital Fraud Alert Directive FRD-ANOM-04 (Clause 6.1.4)',
            'PMLA Section 12 Statutory Reporting Mandate',
          ],
          confidence: 96,
          recommendedAction:
            'Generate formal Suspicious Activity Report (SAR) draft for Chief Compliance Officer sign-off and submit STR-01 to FIU-IND.',
          caseId: 'AML-2048',
          txnId: 'TXN-10482',
          findingId: 'FND-8801',
          evidenceDetails: relatedEvidence,
        },
      },
      auditDetails: {
        action: 'COPILOT_PREPARE_INVESTIGATION_SUMMARY',
        details: 'Generated audit-ready investigation summary for AML-2048 with complete evidence chain.',
        evidenceUsed: ['EVD-101', 'EVD-102', 'EVD-103', 'EVD-104'],
        policyUsed: ['POL-AM-07', 'POL-FRD-04', 'POL-AML-01'],
      },
    };
  }

  if (q.includes('weather') || q.includes('poem') || q.includes('joke') || q.length < 5) {
    return {
      message: {
        id: msgId,
        sender: 'assistant',
        timestamp,
        text: 'Insufficient evidence to support a definitive conclusion. RegulaGuard AI operates under strict governance guardrails and only provides evidence-backed analysis for banking transactions, accounts, risk signals, and regulatory policies.',
        structured: {
          answer: 'Insufficient evidence to support a definitive conclusion.',
          riskScore: 0,
          keySignals: ['Query is out of compliance scope or lacks empirical banking parameters'],
          reasoning:
            'Under Governance Policy GOV-AUD-TRL, the AI copilot is prohibited from fabricating speculative statements or answering topics without verifiable transaction/policy backing.',
          evidence: [],
          policies: ['GOV-AUD-TRL: Standard Operating Procedure - Explainable Governance'],
          confidence: 100,
          recommendedAction:
            'Please formulate an inquiry regarding specific transaction IDs (e.g. TXN-10482), accounts (e.g. ACC-88321), cases (e.g. AML-2048), or regulatory policies.',
          isInsufficientEvidence: true,
        },
      },
      auditDetails: {
        action: 'COPILOT_OUT_OF_SCOPE_GUARDRAIL_TRIGGER',
        details: `Rejected speculative query: "${query.slice(0, 50)}"`,
        evidenceUsed: [],
        policyUsed: ['POL-AUD-01'],
      },
    };
  }

  const searchRes = searchPolicies(query, 2);
  return {
    message: {
      id: msgId,
      sender: 'assistant',
      timestamp,
      text: `Analyzed query against connected banking ledgers, risk scoring engines, and regulatory policies. Relevant records mapped to active compliance baselines.`,
      structured: {
        answer: `System retrieved operational signals matching "${query}". Current telemetry indicates stable parameterization with ${RISK_SIGNALS.length} active risk signals monitored across credit, fraud, AML, and liquidity desks.`,
        riskScore: 68,
        keySignals: [
          'Enterprise Risk Index: 42.4 (MODERATE baseline with CRITICAL clusters)',
          'Total daily throughput: ₹48.7M across 2,000+ evaluated transactions',
          '34 AML alerts and 18 Fraud deviations under active surveillance',
        ],
        reasoning:
          'Grounded analysis across live core banking records verifies no unflagged systemic failure points outside known flagged accounts.',
        evidence: [
          'EVD-101: IMPS Ledger verification',
          'EVD-105: RTGS batch clearing logs',
        ],
        policies: searchRes.map(r => `${r.policy.code}: ${r.policy.title}`),
        confidence: 91,
        recommendedAction:
          'Review the Risk Signals console or select an active case in the Investigation Workspace for end-to-end evidence drill-down.',
        caseId: 'AML-2048',
        policyDetails: searchRes.map(r => r.policy),
      },
    },
    auditDetails: {
      action: 'COPILOT_GENERAL_GROUNDED_QUERY',
      details: `Processed query "${query.slice(0, 60)}" with grounded policy and ledger synthesis.`,
      evidenceUsed: ['EVD-101'],
      policyUsed: searchRes.map(r => r.policy.id),
    },
  };
}
