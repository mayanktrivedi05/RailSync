import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Activity, 
  AlertOctagon, 
  Train, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS, SYSTEM_STATS } from '../data/mockData';

export default function Dashboard({ 
  tasks, 
  blocks, 
  onNavigate, 
  activeRole, 
  onOpenNewTask,
  selectedCorridor,
  setSelectedCorridor,
  corridors
}) {
  const pendingTasks = tasks.filter(t => t.status === 'Pending Planning');
  const verifyingTasks = tasks.filter(t => t.status === 'Awaiting AI Verification');

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Top Banner / Greeting */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 p-4 sm:p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Live AI Decision Support Engine
              </span>
              <span className="text-[11px] text-slate-400 font-mono">SIH26027 // SixSnippers</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
              Automatic Block Planning & Asset Optimization
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Unified cross-department scheduling layer combining <strong className="text-blue-300">Engineering (TMS)</strong>, <strong className="text-purple-300">S&T (SMMS)</strong>, and <strong className="text-amber-300">Traction (TDMS)</strong> into train-aware maintenance windows.
            </p>
          </div>

          {/* Quick Corridor Selector & Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
            <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-1.5 text-xs">
              <div className="text-[10px] text-slate-400 px-2 font-medium">Target Railway Corridor</div>
              <select 
                value={selectedCorridor}
                onChange={(e) => setSelectedCorridor(e.target.value)}
                className="w-full bg-transparent text-slate-200 font-semibold px-2 py-1 outline-none cursor-pointer"
              >
                {corridors.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onNavigate('planner')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Punctuality */}
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold">Punctuality Index</span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.punctualityIndex}%
          </div>
          <div className="mt-1 sm:mt-2 flex items-center gap-1 text-[10px] sm:text-xs text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+1.4% gain</span>
          </div>
        </div>

        {/* Asset Availability */}
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold">Asset Availability</span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.assetAvailability}%
          </div>
          <div className="mt-1 sm:mt-2 flex items-center gap-1 text-[10px] sm:text-xs text-cyan-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14.6% capacity</span>
          </div>
        </div>

        {/* Active Blocks Today */}
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold">Active Blocks</span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.activeBlocksToday}
          </div>
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-indigo-300">
            <span>78% Multi-Dept</span>
          </div>
        </div>

        {/* Pending Maintenance */}
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold">Pending Defects</span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <AlertOctagon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.pendingDefects}
          </div>
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-amber-400">
            <span>{pendingTasks.length} queued</span>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Co-Scheduled Recommendation Highlight & Department Ingestion Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left 2 Cols: AI Recommended Joint Block Action Card */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* AI Recommended Block Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-cyan-950/30 border border-cyan-500/30 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Optimal AI Co-Scheduled Block Proposal
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">BLK-OPT-901</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ⚡ 105 Mins Saved
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Aligarh Jn — Tundla Section (Km 1284) • UP Main
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  AI Engine detected 3 compatible tasks across 3 departments in the same track segment. Merged into single 75 min shadow window.
                </p>
              </div>

              {/* Co-Scheduled Task Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1">
                <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs">
                  <div className="flex items-center justify-between text-blue-300 font-bold mb-1">
                    <span>TMS (Track)</span>
                    <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded">75m</span>
                  </div>
                  <div className="text-slate-200 font-medium truncate">Fishplate Crack Fix</div>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs">
                  <div className="flex items-center justify-between text-purple-300 font-bold mb-1">
                    <span>SMMS (Signal)</span>
                    <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded">45m</span>
                  </div>
                  <div className="text-slate-200 font-medium truncate">Point Machine Relay</div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                    <span>TDMS (OHE)</span>
                    <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">60m</span>
                  </div>
                  <div className="text-slate-200 font-medium truncate">Catenary Wire Dropper</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="text-xs text-slate-300">
                  Window: <strong className="text-white font-mono">11:45 AM — 01:00 PM</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('planner')}
                    className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition text-center"
                  >
                    View Gap
                  </button>
                  <button
                    onClick={() => onNavigate('planner')}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Block</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Visual Track Status / Corridor Schematic */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-slate-800/80 space-y-3 sm:space-y-4 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Train className="w-4 h-4 text-cyan-400" />
                  Corridor Track Monitoring (Live Layout)
                </h2>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500"></span> Clear</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-cyan-500"></span> AI Block</span>
              </div>
            </div>

            {/* Interactive Track Schematic */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400 pb-1 border-b border-slate-800 min-w-[420px]">
                <span>NDLS (0km)</span>
                <span>GZB (28km)</span>
                <span className="text-cyan-400 font-bold">ALJN (126km)</span>
                <span className="text-amber-400 font-bold">TDL (205km)</span>
                <span>CNB (440km)</span>
              </div>

              {/* UP Line */}
              <div className="space-y-1 min-w-[420px]">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-slate-300">
                  <span>UP Main Line</span>
                  <span className="text-emerald-400">Vande Bharat passing Km 98</span>
                </div>
                <div className="h-6 w-full rounded-lg bg-slate-800 flex overflow-hidden p-0.5 gap-1">
                  <div className="h-full w-[25%] rounded bg-emerald-500/30 border border-emerald-500/40 text-[9px] text-emerald-300 font-mono pl-1 leading-5">
                    Clear
                  </div>
                  <div className="h-full w-[35%] rounded bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-cyan-500/40 border border-cyan-400 text-[9px] text-cyan-200 font-bold font-mono pl-1 leading-5 animate-pulse">
                    AI Block (11:45-13:00)
                  </div>
                  <div className="h-full w-[40%] rounded bg-emerald-500/30 border border-emerald-500/40 text-[9px] text-emerald-300 font-mono pl-1 leading-5">
                    Clear
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Department Maintenance Feeds */}
        <div className="space-y-4 sm:space-y-6">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Department Ingestion Feeds
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono">Live</span>
            </div>

            <div className="space-y-2">
              {Object.values(DEPARTMENTS).map(dept => (
                <div 
                  key={dept.id} 
                  className={`p-2.5 sm:p-3 rounded-xl border ${dept.borderColor} ${dept.bgColor} flex items-center justify-between transition hover:scale-[1.01] cursor-pointer`}
                  onClick={() => onNavigate('prioritization')}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{dept.name}</div>
                    <div className="text-[10px] text-slate-300 truncate max-w-[150px]">{dept.subtext}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-white">
                      {dept.id === 'TMS' ? '12 Issues' : dept.id === 'SMMS' ? '6 Issues' : dept.id === 'TDMS' ? '4 Issues' : '2 Plans'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
