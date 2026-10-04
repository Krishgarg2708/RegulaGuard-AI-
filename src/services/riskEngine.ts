import { RiskFactorBreakdown, SeverityLevel, Transaction } from '../types';

export interface CalculatedRiskResult {
  score: number;
  severity: SeverityLevel;
  components: {
    transactionAnomaly: number;
    velocity: number;
    geographicRisk: number;
    customerRisk: number;
    deviceRisk: number;
    beneficiaryRisk: number;
    historicalPattern: number;
  };
  factors: RiskFactorBreakdown[];
  narrative: string;
}

export function calculateTransactionRisk(txn: Partial<Transaction>): CalculatedRiskResult {
  const deviation = txn.deviationMultiplier || 1.0;
  const isNewDevice = txn.deviceInfo?.isNewDevice || false;
  const vpnDetected = txn.deviceInfo?.vpnDetected || false;
  const amount = txn.amount || 0;

  let transactionAnomaly = 5;
  if (deviation > 15) transactionAnomaly = 35;
  else if (deviation > 8) transactionAnomaly = 28;
  else if (deviation > 4) transactionAnomaly = 20;
  else if (deviation > 2) transactionAnomaly = 12;

  let velocity = 4;
  if (txn.id === 'TXN-10482' || txn.flaggedReason?.includes('velocity')) {
    velocity = 18;
  } else if (deviation > 5) {
    velocity = 12;
  }

  let geographicRisk = 2;
  if (vpnDetected || txn.deviceInfo?.location?.includes('Proxy') || txn.deviceInfo?.location?.includes('Hong Kong')) {
    geographicRisk = 14;
  } else if (txn.deviceInfo?.location?.includes('Offshore')) {
    geographicRisk = 15;
  }

  let customerRisk = 4;
  if (txn.customerId === 'CUST-1042' || txn.customerId === 'CUST-3314') {
    customerRisk = 14;
  } else if (txn.customerId === 'CUST-1023') {
    customerRisk = 12;
  }

  let deviceRisk = 1;
  if (isNewDevice) deviceRisk = 9;
  if (txn.deviceInfo?.deviceType?.includes('Tor')) deviceRisk = 10;

  let beneficiaryRisk = 2;
  if (txn.beneficiaryName?.includes('FinApex') || txn.beneficiaryBank?.includes('Hong Kong')) {
    beneficiaryRisk = 10;
  } else if (txn.beneficiaryName?.includes('Escrow')) {
    beneficiaryRisk = 8;
  }

  let historicalPattern = 2;
  if (deviation > 10) historicalPattern = 9;
  else if (deviation > 3) historicalPattern = 5;

  const rawScore =
    transactionAnomaly +
    velocity +
    geographicRisk +
    customerRisk +
    deviceRisk +
    beneficiaryRisk +
    historicalPattern;

  const score = Math.min(100, Math.max(0, rawScore));

  let severity: SeverityLevel = 'LOW';
  if (score >= 81) severity = 'CRITICAL';
  else if (score >= 61) severity = 'HIGH';
  else if (score >= 31) severity = 'MEDIUM';

  const factors: RiskFactorBreakdown[] = [
    { label: 'Transaction Anomaly', score: transactionAnomaly, description: `${deviation.toFixed(1)}x deviation vs historical moving baseline` },
    { label: 'Velocity Anomaly', score: velocity, description: 'Rapid sequential clearances observed in window' },
    { label: 'Geographic Risk', score: geographicRisk, description: vpnDetected ? 'Proxy or offshore node connection' : 'Standard domestic geo profile' },
    { label: 'Customer Risk Profile', score: customerRisk, description: `Customer risk rating weight (${txn.customerId})` },
    { label: 'Device & IP Risk', score: deviceRisk, description: isNewDevice ? 'Unrecognized device fingerprint' : 'Verified trusted hardware' },
    { label: 'Beneficiary Exposure', score: beneficiaryRisk, description: `Beneficiary profile: ${txn.beneficiaryName || 'Standard Payee'}` },
  ];

  const narrative =
    score >= 81
      ? `Transaction amount (₹${amount.toLocaleString()}) deviates by ${deviation.toFixed(1)}x with severe risk amplification from new device fingerprinting and offshore beneficiary routing.`
      : score >= 61
      ? `Elevated risk detected due to above-average volume and moderate velocity changes requiring supervisory scrutiny.`
      : `Risk metrics fall within standard parameterized operating baselines.`;

  return {
    score,
    severity,
    components: {
      transactionAnomaly,
      velocity,
      geographicRisk,
      customerRisk,
      deviceRisk,
      beneficiaryRisk,
      historicalPattern,
    },
    factors,
    narrative,
  };
}
