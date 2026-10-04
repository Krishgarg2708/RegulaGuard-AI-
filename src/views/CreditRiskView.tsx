import React, { useState } from 'react';
import {
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CREDIT_RISK_RECORDS } from '../data/mockData';
import { CreditRiskRecord } from '../types';

export const CreditRiskView: React.FC = () => {
  const { setActivePage } = useApp();
  const [selectedRecord, setSelectedRecord] = useState<CreditRiskRecord>(CREDIT_RISK_RECORDS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredRecords = CREDIT_RISK_RECORDS.filter((r) => {
    if (filterCategory !== 'ALL' && r.riskCategory !== filterCategory) return false;
    return true;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'MODERATE':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl font-extrabold text-white">
              Credit Risk & Delinquency Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explainable early warning delinquency scoring, DTI threshold monitoring, and prudential IRAC classification.
          </p>
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded font-mono font-medium transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded ${getCategoryBadge(selectedRecord.riskCategory)}`}>
                {selectedRecord.riskCategory} RISK
              </span>
              <span className="text-xs font-mono text-slate-400">
                Loan ID: {selectedRecord.loanId} • Facility: {selectedRecord.loanType.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              Borrower: {selectedRecord.customerName} ({selectedRecord.customerId})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm font-extrabold font-mono text-rose-400">
                PD: {selectedRecord.probabilityOfDefault}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Probability of Default
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Credit Score</span>
            <span className="text-base font-extrabold text-white mt-0.5 block">
              {selectedRecord.creditScore}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">DTI Ratio</span>
            <span className="text-base font-bold text-amber-400 mt-0.5 block">
              {selectedRecord.debtToIncomeRatio}%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Outstanding</span>
            <span className="text-base font-bold text-slate-200 mt-0.5 block">
              ₹{(selectedRecord.outstandingBalance / 100000).toFixed(1)}L
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Days Past Due</span>
            <span className={`text-base font-extrabold mt-0.5 block ${selectedRecord.daysPastDue > 30 ? 'text-rose-400' : 'text-slate-200'}`}>
              {selectedRecord.daysPastDue} DPD
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Line Utilization</span>
            <span className="text-base font-bold text-amber-400 mt-0.5 block">
              {selectedRecord.utilizationRate}%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">IRAC Bucket</span>
            <span className="text-xs font-bold text-blue-400 mt-1 block">
              {selectedRecord.daysPastDue > 60 ? 'SMA-2' : selectedRecord.daysPastDue > 30 ? 'SMA-1' : selectedRecord.daysPastDue > 0 ? 'SMA-0' : 'Standard'}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              Explainable Credit Risk Reasoning
            </span>
          </div>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            "{selectedRecord.reasoning}"
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Monitored Credit Facilities
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Showing corporate & retail loans
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Loan ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Credit Score</th>
                <th className="py-3 px-4">Outstanding</th>
                <th className="py-3 px-4">DTI %</th>
                <th className="py-3 px-4">DPD</th>
                <th className="py-3 px-4">PD %</th>
                <th className="py-3 px-4">Risk Category</th>
                <th className="py-3 px-4 text-right">Select</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredRecords.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRecord(r)}
                  className={`hover:bg-slate-800/60 cursor-pointer transition-colors ${
                    r.id === selectedRecord.id ? 'bg-blue-950/30' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-400">{r.loanId}</td>
                  <td className="py-3 px-4 font-mono text-slate-200">{r.customerName}</td>
                  <td className="py-3 px-4 font-mono">{r.creditScore}</td>
                  <td className="py-3 px-4 font-mono">₹{(r.outstandingBalance / 100000).toFixed(1)}L</td>
                  <td className="py-3 px-4 font-mono font-semibold text-amber-400">{r.debtToIncomeRatio}%</td>
                  <td className={`py-3 px-4 font-mono font-bold ${r.daysPastDue > 30 ? 'text-rose-400' : 'text-slate-300'}`}>
                    {r.daysPastDue} DPD
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">{r.probabilityOfDefault}%</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getCategoryBadge(r.riskCategory)}`}>
                      {r.riskCategory}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecord(r);
                      }}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
