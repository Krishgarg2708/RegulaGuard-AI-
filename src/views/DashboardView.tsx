import React from 'react';
import {
  ShieldAlert,
  Coins,
  TrendingDown,
  Droplets,
  Briefcase,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { RISK_SIGNALS, TRANSACTIONS, AML_CASES } from '../data/mockData';

const trendData = [
  { time: '00:00', volume: 2.4, highRisk: 4 },
  { time: '02:00', volume: 1.8, highRisk: 6 },
  { time: '04:00', volume: 3.1, highRisk: 11 },
  { time: '06:00', volume: 5.8, highRisk: 19 },
  { time: '08:00', volume: 9.4, highRisk: 28 },
  { time: '10:00', volume: 12.2, highRisk: 34 },
  { time: '12:00', volume: 14.0, highRisk: 25 },
];

const alertCategoryData = [
  { name: 'Structuring / Smurfing', count: 14, color: '#f43f5e' },
  { name: 'Velocity Spikes', count: 11, color: '#f59e0b' },
  { name: 'Device / Tor Proxy', count: 9, color: '#3b82f6' },
  { name: 'Geographic Anomaly', count: 8, color: '#8b5cf6' },
  { name: 'Credit Delinquency', count: 6, color: '#10b981' },
];

export const DashboardView: React.FC = () => {
  const {
    setActivePage,
    setSelectedTransaction,
    setSelectedCase,
    setSelectedSignal,
    startDemoScenario,
    currentPersona,
  } = useApp();

  const criticalSignals = RISK_SIGNALS.filter((s) => s.severity === 'CRITICAL');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Enterprise Banking Operations
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Welcome back, {currentPersona.name} ({currentPersona.title})
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Risk & Compliance Surveillance Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Autonomous ingestion of real-time core transactions, ML anomaly scoring, RAG regulatory policy matching, and deterministic audit-ready evidence compilation.
          </p>
        </div>

        <button
          onClick={startDemoScenario}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/50 flex items-center gap-2 shrink-0 transition-all cursor-pointer"
        >
          <Activity className="w-4 h-4 text-blue-200" />
          <span>Run ₹8.75L Hackathon Demo Flow</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Total Txns
          </div>
          <div className="text-lg font-extrabold text-white font-mono mt-1">
            ₹48.7M
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5 font-mono">
            <TrendingUp className="w-3 h-3" />
            +12.4% Today
          </div>
        </div>

        <div
          onClick={() => setActivePage('signals')}
          className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-3 shadow-sm hover:border-rose-500/60 cursor-pointer transition-colors group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-rose-400">
            High Risk Txns
          </div>
          <div className="text-lg font-extrabold text-rose-400 font-mono mt-1">
            127
          </div>
          <div className="text-[10px] text-rose-400/80 font-mono mt-0.5">
            18 Critical Peak
          </div>
        </div>

        <div
          onClick={() => setActivePage('aml')}
          className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 shadow-sm hover:border-amber-500/60 cursor-pointer transition-colors group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-amber-400">
            AML Alerts
          </div>
          <div className="text-lg font-extrabold text-amber-400 font-mono mt-1">
            34
          </div>
          <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">
            8 Pending Review
          </div>
        </div>

        <div
          onClick={() => setActivePage('fraud')}
          className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-3 shadow-sm hover:border-rose-500/60 cursor-pointer transition-colors group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-rose-400">
            Fraud Alerts
          </div>
          <div className="text-lg font-extrabold text-rose-400 font-mono mt-1">
            18
          </div>
          <div className="text-[10px] text-rose-400/80 font-mono mt-0.5">
            4 New Devices
          </div>
        </div>

        <div
          onClick={() => setActivePage('network')}
          className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 cursor-pointer transition-colors"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            High Risk Accounts
          </div>
          <div className="text-lg font-extrabold text-slate-100 font-mono mt-1">
            42
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            EDD Mandated
          </div>
        </div>

        <div
          onClick={() => {
            setSelectedCase(AML_CASES[0]);
            setActivePage('investigation');
          }}
          className="bg-slate-900/90 border border-blue-500/30 rounded-xl p-3 shadow-sm hover:border-blue-500/60 cursor-pointer transition-colors group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-blue-400">
            Investigations
          </div>
          <div className="text-lg font-extrabold text-blue-400 font-mono mt-1">
            16
          </div>
          <div className="text-[10px] text-blue-300 font-mono mt-0.5">
            AML-2048 Active
          </div>
        </div>

        <div
          onClick={() => setActivePage('reports')}
          className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 cursor-pointer transition-colors"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Reports Ready
          </div>
          <div className="text-lg font-extrabold text-white font-mono mt-1">
            9
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Draft SAR Packs
          </div>
        </div>

        <div
          onClick={() => setActivePage('audit')}
          className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3 shadow-sm hover:border-emerald-500/60 cursor-pointer transition-colors group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-emerald-400">
            Audit Readiness
          </div>
          <div className="text-lg font-extrabold text-emerald-400 font-mono mt-1">
            94%
          </div>
          <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">
            Zero Gaps
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Live Critical Risk Signals
                </h2>
              </div>
              <button
                onClick={() => setActivePage('signals')}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>View all 13 signals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {criticalSignals.slice(0, 4).map((sig) => (
                <div
                  key={sig.id}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {sig.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                        {sig.signalTitle}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {sig.id}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {sig.detectedReason}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                      <span>Customer: {sig.customerName}</span>
                      <span>Account: {sig.accountId}</span>
                      {sig.amount && <span>Amount: ₹{sig.amount.toLocaleString()}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <div className="text-right mr-1">
                      <div className="text-xs font-mono font-extrabold text-rose-400">
                        {sig.riskScore}/100
                      </div>
                      <div className="text-[9px] font-mono text-slate-500">Risk Score</div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSignal(sig);
                        if (sig.transactionId === 'TXN-10482') {
                          setSelectedTransaction(TRANSACTIONS[0]);
                          setActivePage('fraud');
                        } else {
                          setActivePage('investigation');
                        }
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 text-xs text-slate-200 hover:text-white font-medium transition-colors border border-slate-700 cursor-pointer"
                    >
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Transaction Volume & Anomaly Curve (Today)
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                Real-time clearing stream
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#volumeGrad)"
                    name="Volume (₹ Crores)"
                  />
                  <Area
                    type="monotone"
                    dataKey="highRisk"
                    stroke="#f43f5e"
                    fillOpacity={1}
                    fill="url(#riskGrad)"
                    name="High Risk Count"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border-2 border-rose-500/50 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                Primary Case AML-2048
              </span>
              <span className="text-xs font-mono font-bold text-rose-400">
                Score: 94 / CRITICAL
              </span>
            </div>

            <div className="mt-2.5">
              <h3 className="text-sm font-bold text-white">
                TXN-10482: ₹8,75,000 Offshore Extraction
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Customer R**** S***** (ACC-88321) executed a 19.8x baseline anomaly to FinApex Global Ltd from an unrecorded Tor exit relay IP.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-mono text-slate-300">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">DEVIATION</span>
                <span className="text-amber-400 font-bold">19.8x of ₹42k</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">POLICY TRIGGER</span>
                <span className="text-blue-400 font-bold">Rule AM-07</span>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedTransaction(TRANSACTIONS[0]);
                  setActivePage('fraud');
                }}
                className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Inspect Fraud Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setSelectedCase(AML_CASES[0]);
                  setActivePage('investigation');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Workspace
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
              Alert Typologies (30-Day Cluster)
            </h2>

            <div className="space-y-2">
              {alertCategoryData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="font-mono font-bold text-slate-200">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.count / 14) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
