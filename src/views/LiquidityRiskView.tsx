import React, { useState } from 'react';
import {
  Droplets,
  AlertOctagon,
  Sliders,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { LIQUIDITY_METRICS } from '../data/mockData';

export const LiquidityRiskView: React.FC = () => {
  const [stressSimulated, setStressSimulated] = useState<boolean>(false);
  const latest = LIQUIDITY_METRICS[LIQUIDITY_METRICS.length - 1];

  const chartData = LIQUIDITY_METRICS.map((m) => ({
    date: m.date.split(' ')[0],
    lcr: m.liquidityCoverageRatio,
    cash: m.cashPosition,
    outflow: m.projectedOutflow7Days,
  }));

  const simulatedLCR = stressSimulated ? 98 : latest.liquidityCoverageRatio;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-extrabold text-white">
              Liquidity Coverage Ratio (LCR) & Stress Terminal
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prudential liquidity surveillance compliant with Basel III and RBI Master Circular on Liquidity Risk Management.
          </p>
        </div>

        <button
          onClick={() => setStressSimulated(!stressSimulated)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-2 cursor-pointer ${
            stressSimulated
              ? 'bg-rose-950 text-rose-300 border-rose-700 shadow-md shadow-rose-950/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-blue-400" />
          <span>{stressSimulated ? 'Reset Stress Simulation' : 'Simulate 25% Deposit Run-Off'}</span>
        </button>
      </div>

      <div className="bg-amber-950/30 border-2 border-amber-500/50 rounded-xl p-4 shadow-lg flex items-start gap-3">
        <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              PRUDENTIAL LIQUIDITY WARNING: Rule BASEL-III-LCR
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Stress Level: {latest.stressLevel}
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            "Liquidity risk increased because projected 7-day cash outflows (₹{latest.projectedOutflow7Days} Cr) exceed the configured stress threshold. Current LCR is {simulatedLCR}% (Regulatory Floor: 100%, Internal Alert Threshold: 105%)."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">Cash Position</span>
          <span className="text-base font-extrabold text-white mt-1 block">
            ₹{latest.cashPosition} Cr
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Liquid Reserves</span>
        </div>

        <div className={`bg-slate-900 border rounded-xl p-3 ${simulatedLCR < 105 ? 'border-rose-500/60' : 'border-slate-800'}`}>
          <span className="text-[10px] text-slate-500 block uppercase">LCR Ratio</span>
          <span className={`text-base font-extrabold mt-1 block ${simulatedLCR < 100 ? 'text-rose-400' : simulatedLCR < 105 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {simulatedLCR}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Min 100% Floor</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">HQLA Amount</span>
          <span className="text-base font-bold text-slate-200 mt-1 block">
            ₹{latest.hqlaAmount} Cr
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Govt Securities</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">Net Outflow 30D</span>
          <span className="text-base font-bold text-slate-200 mt-1 block">
            ₹{latest.netCashOutflow30Days} Cr
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Simulated Base</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">Deposit Run-Off</span>
          <span className="text-base font-extrabold text-rose-400 mt-1 block">
            {latest.depositOutflowRate}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Spike Alert</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">Withdrawal Trend</span>
          <span className="text-base font-bold text-amber-400 mt-1 block">
            +{latest.withdrawalTrendPercent}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">7-Day Delta</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">Top 10 Funding</span>
          <span className="text-base font-bold text-slate-200 mt-1 block">
            {latest.fundingConcentrationTop10}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Concentration</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] text-slate-500 block uppercase">Stress Level</span>
          <span className="text-xs font-bold text-rose-400 mt-1.5 block">
            {latest.stressLevel}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">ALCO Alert</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Liquidity Coverage Ratio (LCR) 7-Day Trajectory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparative view against 100% statutory floor and 105% internal intervention margin.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Current LCR (%)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-0.5 bg-rose-500" /> 100% Floor
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
              <YAxis domain={[90, 140]} stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
              />
              <ReferenceLine y={100} stroke="#f43f5e" strokeDasharray="3 3" label="Statutory 100% Floor" />
              <ReferenceLine y={105} stroke="#f59e0b" strokeDasharray="3 3" label="Alert 105% Margin" />
              <Line
                type="monotone"
                dataKey="lcr"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6' }}
                name="LCR %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
