import React from 'react';
import { 
  LayoutDashboard, 
  ListFilter, 
  CalendarClock, 
  ScanEye, 
  BarChart3, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  LogIn,
  UserPlus
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, pendingCount, blockCount, verifyCount, onOpenAuth }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Overview Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'prioritization',
      label: 'Task Prioritization',
      icon: ListFilter,
      badge: pendingCount > 0 ? `${pendingCount} new` : null,
      badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    },
    {
      id: 'planner',
      label: 'AI Block Planner',
      icon: CalendarClock,
      badge: 'AI Active',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
    },
    {
      id: 'verification',
      label: 'Execution & AI Verify',
      icon: ScanEye,
      badge: verifyCount > 0 ? `${verifyCount} pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    },
    {
      id: 'analytics',
      label: 'Analytics & Insights',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'docs',
      label: 'RDSO & SIH Specs',
      icon: BookOpen,
      badge: 'SIH26027'
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between border-r border-slate-800 bg-slate-950/90 p-4 select-none">
      <div className="space-y-6">
        {/* System Layer Badge */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 border border-cyan-500/20 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Unified Control Layer
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-[11px] text-slate-400 leading-tight">
            Ingesting TMS, SMMS, TDMS & COA Timetable stream
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Main Platform Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-transparent text-cyan-300 border-l-4 border-cyan-400 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Dedicated Auth / Login Navigation Option */}
        <div className="pt-2 border-t border-slate-800/80 space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Authentication Views
          </div>
          <button
            onClick={() => onOpenAuth('login')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition"
          >
            <LogIn className="w-4 h-4 text-cyan-400" />
            <span>Login Screen</span>
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition"
          >
            <UserPlus className="w-4 h-4 text-cyan-400" />
            <span>Sign Up Screen</span>
          </button>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Safety Interlock</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Hard constraints verification enabled for automatic block sanctions.
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>RailSync Engine v2.6</span>
          <span className="text-cyan-400 font-mono">Status: OPTIMAL</span>
        </div>
      </div>
    </aside>
  );
}
