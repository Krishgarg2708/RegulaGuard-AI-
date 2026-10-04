import React from 'react';
import {
  LayoutDashboard,
  Radio,
  ShieldAlert,
  Coins,
  TrendingDown,
  Droplets,
  Bot,
  Briefcase,
  Layers,
  BookOpen,
  Network,
  FileCheck,
  History,
  Sliders,
} from 'lucide-react';
import { useApp, NavigationPage } from '../context/AppContext';

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'danger' | 'warning' | 'info' | 'neutral';
  category?: string;
}

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, currentPersona } = useApp();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      icon: LayoutDashboard,
      category: 'OVERVIEW',
    },
    {
      id: 'signals',
      label: 'Real-Time Risk Signals',
      icon: Radio,
      badge: '13 Active',
      badgeType: 'danger',
      category: 'SURVEILLANCE',
    },
    {
      id: 'fraud',
      label: 'Fraud Detection',
      icon: ShieldAlert,
      badge: '18 Alerts',
      badgeType: 'warning',
      category: 'SURVEILLANCE',
    },
    {
      id: 'aml',
      label: 'AML Monitoring',
      icon: Coins,
      badge: '34 Alerts',
      badgeType: 'danger',
      category: 'SURVEILLANCE',
    },
    {
      id: 'credit',
      label: 'Credit Risk',
      icon: TrendingDown,
      badge: '5 Portfolios',
      badgeType: 'neutral',
      category: 'PRUDENTIAL',
    },
    {
      id: 'liquidity',
      label: 'Liquidity Risk',
      icon: Droplets,
      badge: 'LCR 108%',
      badgeType: 'warning',
      category: 'PRUDENTIAL',
    },
    {
      id: 'copilot',
      label: 'AI Copilot (Governed)',
      icon: Bot,
      badge: 'AI Core',
      badgeType: 'info',
      category: 'INTELLIGENCE',
    },
    {
      id: 'investigation',
      label: 'Investigation Workspace',
      icon: Briefcase,
      badge: 'AML-2048',
      badgeType: 'danger',
      category: 'INTELLIGENCE',
    },
    {
      id: 'evidence',
      label: 'Evidence Explorer',
      icon: Layers,
      badge: '7-Tier',
      badgeType: 'info',
      category: 'INTELLIGENCE',
    },
    {
      id: 'policies',
      label: 'Policy & Regulatory RAG',
      icon: BookOpen,
      badge: '20 Docs',
      badgeType: 'neutral',
      category: 'GOVERNANCE',
    },
    {
      id: 'network',
      label: 'Transaction Network',
      icon: Network,
      badge: 'Graph',
      badgeType: 'neutral',
      category: 'INTELLIGENCE',
    },
    {
      id: 'reports',
      label: 'Regulatory Reports',
      icon: FileCheck,
      badge: '9 Ready',
      badgeType: 'info',
      category: 'GOVERNANCE',
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: History,
      badge: 'Immutable',
      badgeType: 'neutral',
      category: 'GOVERNANCE',
    },
    {
      id: 'settings',
      label: 'System & Guardrails',
      icon: Sliders,
      category: 'SYSTEM',
    },
  ];

  const getBadgeClass = (type?: string) => {
    switch (type) {
      case 'danger':
        return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
      case 'warning':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'info':
        return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  const categories = ['OVERVIEW', 'SURVEILLANCE', 'INTELLIGENCE', 'PRUDENTIAL', 'GOVERNANCE', 'SYSTEM'];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="p-3 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-xs text-blue-400">
            {currentPersona.avatar}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-slate-200 truncate">
              {currentPersona.name}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {currentPersona.title}
            </div>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 font-mono bg-slate-950/60 px-2 py-1 rounded border border-slate-800/80">
          Focus: {currentPersona.focus.split(',')[0]}
        </div>
      </div>

      <nav className="p-2 space-y-4 flex-1">
        {categories.map((cat) => {
          const items = navItems.filter((i) => i.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} className="space-y-0.5">
              <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                {cat}
              </div>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                          isActive
                            ? 'bg-blue-700 text-blue-100'
                            : getBadgeClass(item.badgeType)
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
        <div className="flex justify-between items-center text-slate-400">
          <span>Engine Status:</span>
          <span className="text-emerald-400 font-semibold">Grounded RAG v2.4</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span>Model Guardrails:</span>
          <span className="text-blue-400 font-semibold">Strict (100%)</span>
        </div>
      </div>
    </aside>
  );
};
