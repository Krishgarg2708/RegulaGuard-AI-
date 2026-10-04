import { POLICIES } from '../data/mockData';
import { PolicyDocument } from '../types';

export interface PolicySearchResult {
  policy: PolicyDocument;
  relevanceScore: number;
  matchedClause: string;
  sourceCitation: string;
}

export function searchPolicies(query: string, limit: number = 3): PolicySearchResult[] {
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/).filter(t => t.length > 2);

  const results: PolicySearchResult[] = [];

  for (const policy of POLICIES) {
    let score = 0;
    const combinedText = `${policy.code} ${policy.title} ${policy.summary} ${policy.fullExcerpt} ${policy.mandatoryRule} ${policy.tags.join(' ')}`.toLowerCase();

    if (q.includes(policy.code.toLowerCase()) || q.includes(policy.id.toLowerCase())) {
      score += 70;
    }

    for (const term of terms) {
      if (combinedText.includes(term)) {
        score += 15;
      }
      if (policy.tags.some(tag => tag.toLowerCase().includes(term))) {
        score += 20;
      }
    }

    if ((q.includes('structuring') || q.includes('smurfing') || q.includes('velocity')) && policy.tags.includes('structuring')) {
      score += 35;
    }
    if ((q.includes('fraud') || q.includes('device') || q.includes('ip') || q.includes('10482')) && policy.tags.includes('fraud')) {
      score += 30;
    }
    if ((q.includes('liquidity') || q.includes('lcr') || q.includes('basel') || q.includes('outflow')) && policy.tags.includes('liquidity')) {
      score += 40;
    }
    if ((q.includes('credit') || q.includes('dti') || q.includes('dpd') || q.includes('default')) && policy.tags.includes('credit_risk')) {
      score += 40;
    }
    if ((q.includes('audit') || q.includes('governance') || q.includes('explainable')) && policy.tags.includes('auditability')) {
      score += 35;
    }

    if (score > 15) {
      const normalizedScore = Math.min(99, score);
      results.push({
        policy,
        relevanceScore: normalizedScore,
        matchedClause: policy.section,
        sourceCitation: `${policy.source}, Section: ${policy.section} (Page ${policy.page}) [ID: ${policy.code}]`,
      });
    }
  }

  results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return results.slice(0, limit);
}

export function getPolicyById(id: string): PolicyDocument | undefined {
  return POLICIES.find(p => p.id === id || p.code === id);
}
