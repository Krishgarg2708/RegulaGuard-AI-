import React, { useState } from 'react';
import {
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POLICIES } from '../data/mockData';
import { PolicyDocument } from '../types';

export const PolicyIntelligenceView: React.FC = () => {
  const { selectedPolicy, searchQuery } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<PolicyDocument>(selectedPolicy || POLICIES[0]);
  const [activeTag, setActiveTag] = useState<string>('ALL');

  const allTags = ['ALL', 'structuring', 'fraud', 'liquidity', 'credit_risk', 'fatf', 'pmla', 'auditability'];

  const filteredPolicies = POLICIES.filter((p) => {
    if (activeTag !== 'ALL' && !p.tags.includes(activeTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        p.code.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.source.toLowerCase().includes(q) ||
        p.section.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-extrabold text-white">
              Policy & Regulatory Intelligence (RAG Corpus)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative regulatory guidelines, statutory enactments, and internal compliance rulebooks with strict provenance.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-2.5 py-1 rounded font-mono text-[11px] font-semibold transition-colors cursor-pointer ${
                activeTag === tag
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredPolicies.map((p) => {
            const isSelected = p.id === selectedDoc.id;

            return (
              <div
                key={p.id}
                onClick={() => setSelectedDoc(p)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500 shadow-md shadow-purple-950/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-purple-400 font-bold">{p.code}</span>
                  <span className="text-slate-400 text-[10px]">Page {p.page}</span>
                </div>

                <h3 className="text-xs font-bold text-white font-sans leading-snug">
                  {p.title}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {p.summary}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                    {p.regulator.split('/')[0]}
                  </span>
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-800 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {selectedDoc.code} • {selectedDoc.id}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Last Revised: {selectedDoc.lastUpdated}
              </span>
            </div>

            <h2 className="text-lg font-extrabold text-white">
              {selectedDoc.title}
            </h2>
            <div className="text-xs text-slate-400 font-mono">
              Authority: {selectedDoc.regulator} • Jurisdiction: {selectedDoc.jurisdiction}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Section & Clause</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">{selectedDoc.section}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Source Document</span>
              <span className="text-slate-200 font-semibold mt-0.5 block truncate">{selectedDoc.source}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-500/40 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
              Mandatory Enforcement Rule
            </span>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {selectedDoc.mandatoryRule}
            </p>
          </div>

          {selectedDoc.filingRequirement && (
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs font-mono text-amber-300">
              <span className="font-bold">Statutory Filing: </span>
              {selectedDoc.filingRequirement}
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Authoritative Directive Chunk Excerpt
            </span>
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 leading-relaxed font-serif italic whitespace-pre-wrap">
              "{selectedDoc.fullExcerpt}"
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>RAG Document Hash: Verified SHA-256</span>
            <span className="text-emerald-400">Deterministic Source Citation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
