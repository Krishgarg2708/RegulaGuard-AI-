import React, { useState } from 'react';
import {
  Network,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NETWORK_NODES, NETWORK_EDGES, TRANSACTIONS } from '../data/mockData';
import { NetworkNode } from '../types';

export const TransactionNetworkView: React.FC = () => {
  const { setSelectedTransaction, setActivePage } = useApp();
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NETWORK_NODES[3]);

  const getNodeColor = (type: string, isHighRisk?: boolean) => {
    if (isHighRisk) return 'fill-rose-500/20 stroke-rose-400 stroke-2';
    switch (type) {
      case 'CUSTOMER':
        return 'fill-purple-500/20 stroke-purple-400 stroke-2';
      case 'ACCOUNT':
        return 'fill-blue-500/20 stroke-blue-400 stroke-2';
      case 'TRANSACTION':
        return 'fill-amber-500/20 stroke-amber-400 stroke-2';
      case 'BENEFICIARY':
        return 'fill-rose-500/20 stroke-rose-400 stroke-2';
      case 'MERCHANT':
        return 'fill-emerald-500/20 stroke-emerald-400 stroke-2';
      default:
        return 'fill-slate-800 stroke-slate-600';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-extrabold text-white">
              Transaction Network & Circular Flow Topology
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual topological graph tracing flow of funds, shell corporations, nominee beneficiaries, and smurfing hubs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span className="text-slate-300">Customer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-slate-300">Account</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Transaction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-slate-300">Beneficiary / Shell</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-hidden relative shadow-inner min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-rose-950/80 border border-rose-500/50 px-3 py-1.5 rounded-lg text-xs font-mono text-rose-300">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>High-Risk Circular Money Laundering Ring Detected (3 Nodes)</span>
          </div>

          <svg
            className="w-full h-[520px] select-none"
            viewBox="100 80 860 300"
          >
            <defs>
              <marker
                id="arrowhead-suspicious"
                markerWidth="10"
                markerHeight="7"
                refX="22"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
              </marker>
              <marker
                id="arrowhead-normal"
                markerWidth="10"
                markerHeight="7"
                refX="22"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>

            {NETWORK_EDGES.map((edge) => {
              const sourceNode = NETWORK_NODES.find((n) => n.id === edge.source);
              const targetNode = NETWORK_NODES.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const isSuspicious = edge.isSuspicious;

              return (
                <g key={edge.id}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isSuspicious ? '#f43f5e' : '#475569'}
                    strokeWidth={isSuspicious ? 2.5 : 1.5}
                    strokeDasharray={isSuspicious ? '4 2' : 'none'}
                    markerEnd={`url(#${isSuspicious ? 'arrowhead-suspicious' : 'arrowhead-normal'})`}
                  />
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2 - 8}
                    fill={isSuspicious ? '#fda4af' : '#94a3b8'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {NETWORK_NODES.map((node) => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <circle
                    r={isSelected ? 26 : 22}
                    className={`${getNodeColor(node.type, node.isHighRisk)} ${
                      isSelected ? 'stroke-white stroke-[3px]' : ''
                    }`}
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.type[0]}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="36"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="48"
                    fill="#94a3b8"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {node.subLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
              Topological Node Inspector
            </span>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white">
                {selectedNode.label}
              </h2>
              <span className="text-xs font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                Score: {selectedNode.riskScore}/100
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Type: {selectedNode.type} • {selectedNode.subLabel}
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Topology Role</span>
              <span className="text-slate-200 font-semibold block mt-0.5">
                {selectedNode.isHighRisk ? 'Flagged Extraction / Conduit Node' : 'Standard Relational Anchor'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Severity Flag</span>
              <span className="text-rose-400 font-bold block mt-0.5">
                {selectedNode.severity} (Supervisory Hold Recommended)
              </span>
            </div>
          </div>

          {selectedNode.id === 'node-txn-10482' && (
            <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-500/40 text-xs text-slate-200 space-y-2">
              <span className="font-bold text-rose-300 font-mono block">
                ANCHOR TRANSACTION INSIGHT
              </span>
              <p className="font-sans leading-relaxed text-xs">
                This node represents the ₹8,75,000 extraction flowing to FinApex Global Ltd (HK Shell) immediately following domestic pre-funding.
              </p>
              <button
                onClick={() => {
                  setSelectedTransaction(TRANSACTIONS[0]);
                  setActivePage('fraud');
                }}
                className="w-full py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Inspect in Fraud Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Graph Engine: Dynamic Force-Directed Directed Acyclic Graph (DAG) with Smurfing Cycle Detection.
          </div>
        </div>
      </div>
    </div>
  );
};
