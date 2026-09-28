import React, { useState } from 'react';
import { 
  CalendarClock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Train, 
  ShieldCheck, 
  RefreshCw,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRAIN_SCHEDULES, AI_OPTIMIZED_BLOCKS } from '../data/mockData';

export default function BlockPlanner({ onSanctionBlock, onNavigate }) {
  const [selectedBlock, setSelectedBlock] = useState(AI_OPTIMIZED_BLOCKS[0]);
  const [isSanctioned, setIsSanctioned] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

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
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              Train-Aware AI Block Planner
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              CP-SAT Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Zero-collision multi-department block windows.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Solving...' : 'Re-solve'}</span>
          </button>

          {!isSanctioned ? (
            <button
              onClick={handleApproveSanction}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sanction Block</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sanctioned</span>
            </div>
          )}
        </div>
      </div>

      {/* Train Timetable vs Feasible Shadow Window Gantt Chart */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Train className="w-4 h-4 text-cyan-400" />
              Corridor Timetable & AI Gap Detection
            </h2>
            <p className="text-[11px] text-slate-400">NDLS - CNB UP Main (Swipe horizontally on mobile)</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-600"></span> Passenger</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 animate-pulse"></span> AI Shadow Gap</span>
          </div>
        </div>

        {/* Visual Timeline Grid with Smooth Mobile Horizontal Scroll */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 overflow-x-auto">
          {/* Time axis marks */}
          <div className="grid grid-cols-8 gap-2 text-[9px] sm:text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1.5 text-center min-w-[550px]">
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
          <div className="space-y-2 min-w-[550px]">
            {TRAIN_SCHEDULES.map((train) => {
              if (train.isGap) {
                return (
                  <div key={train.id} className="relative py-0.5">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 via-teal-900/50 to-emerald-950/60 border border-emerald-400 text-white flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-[11px] sm:text-xs font-bold text-emerald-300">
                          {train.name} ({train.start} — {train.end})
                        </span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                        90 Mins Feasible
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={train.id} className="flex items-center gap-2 text-xs">
                  <div className="w-28 sm:w-36 shrink-0 font-mono text-slate-300 text-[11px] flex items-center gap-1">
                    <Train className="w-3 h-3 text-slate-400" />
                    <span>#{train.id}</span>
                  </div>
                  <div className="flex-1 p-1.5 sm:p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-[11px]">
                    <div className="font-semibold text-slate-200 truncate">{train.name}</div>
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] shrink-0">
                      <span className="text-cyan-400">{train.speed}</span>
                      <span>{train.start}-{train.end}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Multi-Department Joint Co-Scheduling Engine Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left 2 Cols: Joint Block Detail Card */}
        <div className="lg:col-span-2 glass-panel p-4 sm:p-5 rounded-2xl border-slate-800 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">
                Multi-Department Co-Scheduling
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Sanction: {selectedBlock.id}
              </h2>
            </div>
            <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
              +{selectedBlock.savingsPercentage} Gain
            </span>
          </div>

          {/* Downtime Savings comparison box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <div className="text-[10px] text-slate-400">Manual Separate Blocks</div>
              <div className="text-base font-bold text-rose-400 font-mono">180 Mins Disruption</div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
              <div className="text-[10px] text-emerald-400 font-semibold">RailSync Joint Window</div>
              <div className="text-base font-bold text-emerald-400 font-mono">75 Mins Total Window</div>
              <p className="text-[10px] text-emerald-300">⚡ 105 Mins Saved</p>
            </div>
          </div>

          {/* Tasks list */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-300">
              Tasks Merged into this Block:
            </div>
            {selectedBlock.coScheduledTasks.map((t, idx) => (
              <div key={t.id} className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 font-mono text-[9px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-white truncate max-w-[160px] sm:max-w-none">{t.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-800 text-cyan-300">
                    {t.dept}
                  </span>
                  <span className="font-mono text-[10px] text-slate-300">{t.estTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Sanction Memo */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Digital Sanction Order
            </h2>
            <span className="text-[9px] text-slate-400 font-mono">COA-API</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[10px] sm:text-[11px] text-slate-300 space-y-1.5">
            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
              INDIAN RAILWAYS — COA MEMO
            </div>
            <div><strong>ID:</strong> BLK-901 (NDLS-CNB UP)</div>
            <div><strong>Window:</strong> 11:45 — 13:00 IST</div>
            <div><strong>Power Block:</strong> GRANTED (25kV)</div>
            <div><strong>Status:</strong> <span className={isSanctioned ? "text-emerald-400 font-bold" : "text-amber-400"}>{isSanctioned ? "SANCTIONED" : "PENDING"}</span></div>
          </div>

          {!isSanctioned ? (
            <button
              onClick={handleApproveSanction}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve & Push to COA</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('verification')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition text-center"
            >
              Go to AI Verify →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
