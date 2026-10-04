export type UserRole =
  | 'compliance_officer'
  | 'fraud_analyst'
  | 'risk_analyst'
  | 'aml_analyst'
  | 'internal_auditor'
  | 'business_manager';

export interface UserPersona {
  id: UserRole;
  name: string;
  title: string;
  department: string;
  avatar: string;
  focus: string;
  badgeColor: string;
}

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type SignalType =
  | 'unusual_amount'
  | 'velocity_spike'
  | 'geographic_anomaly'
  | 'new_beneficiary'
  | 'multiple_accounts_receiving'
  | 'structuring_smurfing'
  | 'dormant_account_active'
  | 'rapid_fund_movement'
  | 'unusual_login_device'
  | 'high_risk_jurisdiction'
  | 'credit_utilization_spike'
  | 'liquidity_deterioration'
  | 'suspicious_account_network';

export interface RiskFactorBreakdown {
  label: string;
  score: number;
  description: string;
}

export interface RiskSignal {
  id: string;
  timestamp: string;
  customerId: string;
  customerName: string;
  accountId: string;
  transactionId?: string;
  signalType: SignalType;
  signalTitle: string;
  riskScore: number;
  severity: SeverityLevel;
  detectedReason: string;
  relatedPolicyId: string;
  relatedPolicyName: string;
  status: 'NEW' | 'INVESTIGATING' | 'ESCALATED' | 'RESOLVED' | 'DISMISSED';
  factors: RiskFactorBreakdown[];
  amount?: number;
}

export interface Customer {
  id: string;
  maskedName: string;
  fullName: string;
  email: string;
  phone: string;
  customerType: 'INDIVIDUAL' | 'CORPORATE' | 'SME' | 'HNI';
  kycStatus: 'VERIFIED' | 'PENDING' | 'ENHANCED_DUE_DILIGENCE';
  onboardingDate: string;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number;
  city: string;
  country: string;
  panNumberMasked: string;
  monthlyAverageIncome: number;
  accountIds: string[];
}

export interface Account {
  id: string;
  maskedId: string;
  customerId: string;
  accountType: 'SAVINGS' | 'CURRENT' | 'ESCROW' | 'CASH_CREDIT' | 'NRI';
  balance: number;
  currency: string;
  openedDate: string;
  branch: string;
  status: 'ACTIVE' | 'DORMANT' | 'FROZEN' | 'RESTRICTED';
  averageMonthlyTurnover: number;
  flagsCount: number;
}

export interface Transaction {
  id: string;
  timestamp: string;
  accountId: string;
  customerId: string;
  beneficiaryName: string;
  beneficiaryAccountMasked: string;
  beneficiaryBank: string;
  amount: number;
  currency: string;
  channel: 'IMPS' | 'NEFT' | 'RTGS' | 'UPI' | 'SWIFT' | 'ATM' | 'POS';
  direction: 'CREDIT' | 'DEBIT';
  historicalAverage: number;
  deviationMultiplier: number;
  riskScore: number;
  severity: SeverityLevel;
  deviceInfo: {
    deviceType: string;
    os: string;
    isNewDevice: boolean;
    ipAddress: string;
    location: string;
    vpnDetected: boolean;
  };
  merchant?: string;
  riskFactors: RiskFactorBreakdown[];
  explanation: string;
  flaggedReason?: string;
}

export type AMLCaseStatus = 'OPEN' | 'UNDER_REVIEW' | 'ESCALATED' | 'CLEARED' | 'REPORTED';

export interface AMLCase {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  accountId: string;
  riskScore: number;
  severity: SeverityLevel;
  alertType: string;
  transactionIds: string[];
  evidenceIds: string[];
  applicablePolicyId: string;
  analystNotes: string;
  recommendedAction: string;
  status: AMLCaseStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  flowPattern: 'STRUCTURING' | 'RAPID_MOVEMENT' | 'CIRCULAR_ROUTING' | 'SMURFING' | 'LAYER_TRANSIT';
}

export interface CreditRiskRecord {
  id: string;
  customerId: string;
  customerName: string;
  loanId: string;
  loanType: 'PERSONAL' | 'HOME' | 'COMMERCIAL_VEHICLE' | 'SME_WORKING_CAPITAL' | 'CORPORATE_TERM';
  creditScore: number;
  debtToIncomeRatio: number;
  outstandingBalance: number;
  sanctionedAmount: number;
  paymentHistory: ('ON_TIME' | 'LATE_30' | 'LATE_60' | 'LATE_90' | 'DEFAULT')[];
  daysPastDue: number;
  utilizationRate: number;
  probabilityOfDefault: number;
  riskCategory: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  reasoning: string;
  lastReviewDate: string;
}

export interface LiquidityMetric {
  date: string;
  cashPosition: number;
  liquidityCoverageRatio: number;
  hqlaAmount: number;
  netCashOutflow30Days: number;
  projectedOutflow7Days: number;
  depositOutflowRate: number;
  withdrawalTrendPercent: number;
  fundingConcentrationTop10: number;
  stressLevel: 'NORMAL' | 'ELEVATED' | 'HIGH' | 'ACUTE';
}

export interface PolicyDocument {
  id: string;
  code: string;
  title: string;
  regulator: string;
  jurisdiction: string;
  section: string;
  page: number;
  lastUpdated: string;
  source: string;
  summary: string;
  fullExcerpt: string;
  mandatoryRule: string;
  filingRequirement?: string;
  tags: string[];
}

export interface EvidenceRecord {
  id: string;
  findingId?: string;
  caseId?: string;
  type: 'TRANSACTION' | 'DEVICE_FINGERPRINT' | 'VELOCITY_LOG' | 'NETWORK_CLUSTER' | 'GEO_ANOMALY' | 'POLICY_MATCH';
  title: string;
  transactionId?: string;
  accountId?: string;
  customerId?: string;
  policyId?: string;
  hash: string;
  timestamp: string;
  source: string;
  summary: string;
  metadata: Record<string, string | number | boolean>;
  verified: boolean;
}

export interface FindingRecord {
  id: string;
  caseId: string;
  title: string;
  severity: SeverityLevel;
  status: 'DRAFT' | 'CONFIRMED' | 'SUBMITTED_FOR_REVIEW' | 'AUDIT_READY';
  signals: string[];
  evidenceIds: string[];
  policyIds: string[];
  confidence: number;
  executiveSummary: string;
  detailedAnalysis: string;
  recommendedAction: string;
  conclusion: string;
  createdAt: string;
  analyst: string;
}

export type ReportType =
  | 'AML_INVESTIGATION_SUMMARY'
  | 'SUSPICIOUS_ACTIVITY_REPORT'
  | 'RISK_FINDING_REPORT'
  | 'INTERNAL_COMPLIANCE_REPORT'
  | 'AUDIT_EVIDENCE_PACK'
  | 'REGULATORY_REVIEW_SUMMARY';

export interface RegulatoryReport {
  id: string;
  caseId: string;
  reportType: ReportType;
  title: string;
  subject: string;
  createdAt: string;
  executiveSummary: string;
  riskAssessment: {
    score: number;
    severity: SeverityLevel;
    factors: RiskFactorBreakdown[];
  };
  keyFindings: string[];
  evidenceIds: string[];
  applicablePolicyCodes: string[];
  supportingTransactionIds: string[];
  analystConclusion: string;
  recommendedAction: string;
  status: 'AI_GENERATED_DRAFT_REQUIRES_HUMAN_REVIEW' | 'APPROVED_BY_OFFICER' | 'EXPORTED_TO_AUDIT';
  reviewedBy?: string;
  reviewedAt?: string;
  integrityHash: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  caseId?: string;
  transactionId?: string;
  details?: string;
  query?: string;
  aiResponse?: string;
  evidenceUsed?: string[];
  policyUsed?: string[];
  decision?: string;
  approvalStatus?: string;
  reportGenerated?: string;
  hash: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  text: string;
  structured?: {
    answer: string;
    riskScore?: number;
    keySignals?: string[];
    reasoning: string;
    evidence: string[];
    policies: string[];
    confidence: number;
    recommendedAction: string;
    caseId?: string;
    txnId?: string;
    findingId?: string;
    isInsufficientEvidence?: boolean;
    policyDetails?: PolicyDocument[];
    evidenceDetails?: EvidenceRecord[];
  };
}

export interface NetworkNode {
  id: string;
  type: 'CUSTOMER' | 'ACCOUNT' | 'TRANSACTION' | 'BENEFICIARY' | 'MERCHANT';
  label: string;
  subLabel?: string;
  riskScore: number;
  severity: SeverityLevel;
  x: number;
  y: number;
  isHighRisk?: boolean;
  metadata?: Record<string, string | number>;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  amount?: number;
  currency?: string;
  relation: 'TRANSFERRED_TO' | 'OWNS' | 'RECEIVED_FROM' | 'PAID' | 'ASSOCIATED_WITH';
  isSuspicious?: boolean;
}
