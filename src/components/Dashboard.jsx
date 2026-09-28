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
    <div className="space-y-6 pb-12">
      {/* Top Banner / Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Live AI Decision Support Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">SIH26027 // SixSnippers</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Automatic Block Planning & Asset Optimization
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Unified cross-department scheduling layer combining <strong className="text-blue-300">Engineering (TMS)</strong>, <strong className="text-purple-300">S&T (SMMS)</strong>, and <strong className="text-amber-300">Traction (TDMS)</strong> into train-aware maintenance windows.
            </p>
          </div>

          {/* Quick Corridor Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-1.5 text-xs">
              <div className="text-[10px] text-slate-400 px-2 font-medium">Target Railway Corridor</div>
              <select 
                value={selectedCorridor}
                onChange={(e) => setSelectedCorridor(e.target.value)}
                className="bg-transparent text-slate-200 font-semibold px-2 py-1 outline-none cursor-pointer"
              >
                {corridors.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.name} ({c.density})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onNavigate('planner')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Punctuality */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Punctuality Index</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.punctualityIndex}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1.4% vs manual scheduling</span>
          </div>
        </div>

        {/* Asset Availability */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Track Asset Availability</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.assetAvailability}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-cyan-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.6% Line Capacity Gained</span>
          </div>
        </div>

        {/* Active Blocks Today */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Active Blocks Today</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.activeBlocksToday}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-300">
            <span>78% Co-Scheduled Multi-Dept</span>
          </div>
        </div>

        {/* Pending Maintenance */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-slate-800/80 group">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Pending Defect Ingestion</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {SYSTEM_STATS.pendingDefects}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
            <span>{pendingTasks.length} queued for automatic grouping</span>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Co-Scheduled Recommendation Highlight & Department Ingestion Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Recommended Joint Block Action Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommended Block Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-cyan-950/30 border border-cyan-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Optimal AI Co-Scheduled Block Proposal
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: BLK-OPT-901</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ⚡ 105 Mins Downtime Saved
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Aligarh Jn — Tundla Section (Km 1284/10 - 1284/30) • UP Main
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  AI Engine detected 3 compatible tasks across 3 departments in the exact same track segment. Merged into single 75 min shadow window between scheduled trains.
                </p>
              </div>

              {/* Co-Scheduled Task Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-2">
                <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs">
                  <div className="flex items-center justify-between text-blue-300 font-bold mb-1">
                    <span>TMS (Engineering)</span>
                    <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded">75m</span>
                  </div>
                  <div className="text-slate-200 font-medium line-clamp-1">Fishplate Crack Rectification</div>
                  <div className="text-[10px] text-slate-400">Ultrasonic flaw detected</div>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs">
                  <div className="flex items-center justify-between text-purple-300 font-bold mb-1">
                    <span>SMMS (S&T)</span>
                    <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded">45m</span>
                  </div>
                  <div className="text-slate-200 font-medium line-clamp-1">Point Machine Cleaning & Relay</div>
                  <div className="text-[10px] text-slate-400">Detection resistance check</div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                    <span>TDMS (Traction)</span>
                    <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">60m</span>
                  </div>
                  <div className="text-slate-200 font-medium line-clamp-1">OHE Catenary Wire Dropper</div>
                  <div className="text-[10px] text-slate-400">Splice joint #19 hotspot</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="text-xs text-slate-300">
                  Proposed Window: <strong className="text-white font-mono">11:45 AM — 01:00 PM</strong> (Fit between Vande Bharat & Rajdhani)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('planner')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                  >
                    View Timetable Gap
                  </button>
                  <button
                    onClick={() => onNavigate('planner')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Dispatch to COA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Visual Track Status / Corridor Schematic */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Train className="w-4 h-4 text-cyan-400" />
                  Live Corridor Track Section Monitoring
                </h2>
                <p className="text-xs text-slate-400">Kilometer-wise real-time block occupancy & defect overlay</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                  <span>Clear Track</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                  <span>Defect Warning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>
                  <span>AI Block Window</span>
                </div>
              </div>
            </div>

            {/* Interactive Track Schematic */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-slate-800">
                <span>NDLS (Km 0)</span>
                <span>GZB (Km 28)</span>
                <span className="text-cyan-400 font-bold">ALJN (Km 126)</span>
                <span className="text-amber-400 font-bold">TDL (Km 205)</span>
                <span>CNB (Km 440)</span>
              </div>

              {/* UP Line */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                  <span>UP Main Line (130 km/h)</span>
                  <span className="text-emerald-400">Train #22436 Vande Bharat passing Km 98</span>
                </div>
                <div className="h-6 w-full rounded-lg bg-slate-800 flex overflow-hidden p-0.5 gap-1">
                  <div className="h-full w-[25%] rounded bg-emerald-500/30 border border-emerald-500/40 relative group cursor-pointer">
                    <div className="text-[9px] text-emerald-300 font-mono pl-1 leading-5">Clear (130km/h)</div>
                  </div>
                  <div className="h-full w-[35%] rounded bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-cyan-500/40 border border-cyan-400 relative group cursor-pointer animate-pulse">
                    <div className="text-[9px] text-cyan-200 font-bold font-mono pl-1 leading-5 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI Block Scheduled (11:45-13:00)
                    </div>
                  </div>
                  <div className="h-full w-[40%] rounded bg-emerald-500/30 border border-emerald-500/40 relative group cursor-pointer">
                    <div className="text-[9px] text-emerald-300 font-mono pl-1 leading-5">Clear</div>
                  </div>
                </div>
              </div>

              {/* DOWN Line */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                  <span>DOWN Main Line (130 km/h)</span>
                  <span className="text-slate-400">Normal operations</span>
                </div>
                <div className="h-6 w-full rounded-lg bg-slate-800 flex overflow-hidden p-0.5 gap-1">
                  <div className="h-full w-[60%] rounded bg-emerald-500/30 border border-emerald-500/40"></div>
                  <div className="h-full w-[15%] rounded bg-amber-500/30 border border-amber-500/50 relative cursor-pointer" title="Caution order 75km/h">
                    <div className="text-[9px] text-amber-300 font-mono pl-1 leading-5">PSR 75km/h</div>
                  </div>
                  <div className="h-full w-[25%] rounded bg-emerald-500/30 border border-emerald-500/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Department Maintenance Feeds & Quick Verification Queue */}
        <div className="space-y-6">
          {/* Department status pills */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Department Ingestion Feeds
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono">4 Connected</span>
            </div>

            <div className="space-y-2.5">
              {Object.values(DEPARTMENTS).map(dept => (
                <div 
                  key={dept.id} 
                  className={`p-3 rounded-xl border ${dept.borderColor} ${dept.bgColor} flex items-center justify-between transition hover:scale-[1.02] cursor-pointer`}
                  onClick={() => onNavigate('prioritization')}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{dept.name}</div>
                    <div className="text-[10px] text-slate-300">{dept.subtext}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-white">
                      {dept.id === 'TMS' ? '12 Issues' : dept.id === 'SMMS' ? '6 Issues' : dept.id === 'TDMS' ? '4 Issues' : '2 Active Plans'}
                    </span>
                    <div className="text-[9px] text-emerald-400">Sync: Live</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Verification Queue Card */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Field Proof of Work
              </h2>
              <button 
                onClick={() => onNavigate('verification')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
              >
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Field engineers upload geo-tagged photos post maintenance. AI runs computer vision clearance checks before reopening block.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">TSK-2026-610</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-300">Awaiting AI Verify</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Axle Counter Sensor Replacement (Thane - Diva Fast Corridor)
              </p>
              <button
                onClick={() => onNavigate('verification')}
                className="w-full py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
              >
                Run AI Computer Vision Scan →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
