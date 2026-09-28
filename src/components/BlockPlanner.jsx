import React, { useState } from 'react';
import { 
  CalendarClock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Train, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Layers, 
  Clock, 
  FileCheck, 
  Download,
  Share2,
  RefreshCw,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRAIN_SCHEDULES, AI_OPTIMIZED_BLOCKS } from '../data/mockData';

export default function BlockPlanner({ onSanctionBlock, onNavigate }) {
  const [selectedBlock, setSelectedBlock] = useState(AI_OPTIMIZED_BLOCKS[0]);
  const [isSanctioned, setIsSanctioned] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeConstraintCheck, setActiveConstraintCheck] = useState(true);

  const handleRunOptimizer = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      triggerConfetti();
    }, 1200);
  };

  const handleApproveSanction = () => {
    setIsSanctioned(true);
    triggerConfetti();
    if (onSanctionBlock) {
      onSanctionBlock(selectedBlock.id);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <CalendarClock className="w-6 h-6 text-cyan-400" />
              Train-Aware AI Block Planner (OR-Tools CP-SAT)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Live Optimization Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Correlates COA live train timetable with pending multi-department defects to find zero-collision maintenance windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Running Heuristic Solver...' : 'Re-run CP-SAT Engine'}</span>
          </button>

          {!isSanctioned ? (
            <button
              onClick={handleApproveSanction}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sanction Block & Push to COA</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sanctioned & Active on Live COA</span>
            </div>
          )}
        </div>
      </div>

      {/* Train Timetable vs Feasible Shadow Window Gantt Chart */}
      <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Train className="w-4 h-4 text-cyan-400" />
              Real-Time Corridor Timetable & AI Gap Detection
            </h2>
            <p className="text-xs text-slate-400">NDLS - CNB UP Main Line (Timeline 06:00 to 22:00 IST)</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600/80"></span> Passenger Train</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-600/80"></span> Freight</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-300 animate-pulse"></span> AI Maintenance Window</span>
          </div>
        </div>

        {/* Visual Timeline Grid */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 overflow-x-auto">
          {/* Time axis marks */}
          <div className="grid grid-cols-8 gap-2 text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-2 text-center min-w-[650px]">
            <div>06:00</div>
            <div>08:00</div>
            <div>10:00</div>
            <div className="text-cyan-400 font-bold">12:00 (GAP)</div>
            <div>14:00</div>
            <div>16:00</div>
            <div>18:00</div>
            <div>20:00</div>
          </div>

          {/* Train Bars on Timeline */}
          <div className="space-y-2.5 min-w-[650px]">
            {TRAIN_SCHEDULES.map((train) => {
              if (train.isGap) {
                return (
                  <div key={train.id} className="relative py-1">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 via-teal-900/50 to-emerald-950/60 border-2 border-emerald-400/80 text-white shadow-lg shadow-emerald-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-xs font-bold text-emerald-300">
                          {train.name} ({train.start} — {train.end} IST)
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold">
                          Feasible Duration: 90 Mins
                        </span>
                        <span className="text-slate-300 text-[11px] hidden sm:inline">
                          Between Vande Bharat & Rajdhani
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={train.id} className="flex items-center gap-3 text-xs">
                  <div className="w-36 shrink-0 font-mono text-slate-300 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-slate-400" />
                    <span>#{train.id}</span>
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <div className="font-semibold text-slate-200">{train.name}</div>
                    <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                      <span>{train.type}</span>
                      <span className="text-cyan-400">{train.speed}</span>
                      <span className="text-slate-300">{train.start} - {train.end}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Multi-Department Joint Co-Scheduling Engine Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Joint Block Detail Card */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Multi-Department Co-Scheduling Engine
              </div>
              <h2 className="text-lg font-bold text-white">
                Joint Block Sanction: {selectedBlock.id}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                AI Optimization Gain: +{selectedBlock.savingsPercentage}
              </span>
            </div>
          </div>

          {/* Downtime Savings comparison box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400">Traditional Manual Approach (3 Separate Blocks)</div>
              <div className="text-lg font-bold text-rose-400 font-mono">180 Mins Total Line Disruption</div>
              <p className="text-[10px] text-slate-400">TMS (75m) + SMMS (45m) + TDMS (60m) done separately on 3 days.</p>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
              <div className="text-[11px] text-emerald-400 font-semibold">RailSync AI Co-Scheduled Block</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">75 Mins Total Single Window</div>
              <p className="text-[10px] text-emerald-300/80">⚡ 105 Mins Track Downtime Saved (Zero train cancellations!)</p>
            </div>
          </div>

          {/* Combined Tasks list */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">
              Tasks Merged into this Sanctioned Block:
            </div>
            {selectedBlock.coScheduledTasks.map((t, idx) => (
              <div key={t.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="ml-2 font-mono text-[10px] text-slate-400">{t.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.dept === 'TMS' ? 'bg-blue-500/20 text-blue-300' :
                    t.dept === 'SMMS' ? 'bg-purple-500/20 text-purple-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {t.dept}
                  </span>
                  <span className="font-mono text-slate-300">{t.estTime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Hard Safety & Constraint Checks */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Automated Hard Safety & Operational Constraints</span>
              <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Passed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>25kV OHE Power Block Interlock</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Station Master Point Locking</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Post-Maintenance TSR (30 km/h)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Crew & Machinery Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Sanction Order Document & Push status */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                Digital Block Sanction Order
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">COA-API</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                INDIAN RAILWAYS — COA BLOCK MEMO
              </div>
              <div><strong className="text-slate-400">Sanction ID:</strong> IR/NDLS/2026/BLK-901</div>
              <div><strong className="text-slate-400">Corridor:</strong> NDLS-CNB (UP Line)</div>
              <div><strong className="text-slate-400">Window:</strong> 11:45 — 13:00 IST</div>
              <div><strong className="text-slate-400">Departments:</strong> TMS, SMMS, TDMS</div>
              <div><strong className="text-slate-400">Power Block:</strong> GRANTED (25kV Off)</div>
              <div><strong className="text-slate-400">Status:</strong> <span className={isSanctioned ? "text-emerald-400 font-bold" : "text-amber-400"}>{isSanctioned ? "SANCTIONED & PUSHED" : "AWAITING APPROVAL"}</span></div>
            </div>

            {!isSanctioned ? (
              <button
                onClick={handleApproveSanction}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Transmit to COA Grid</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 text-center font-medium">
                  ✓ Transmitted to Section Controller & Station Master
                </div>
                <button
                  onClick={() => onNavigate('verification')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>Proceed to Execution & AI Verify →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
