import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Layers, 
  ArrowUpRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { SYSTEM_STATS } from '../data/mockData';

export default function Analytics() {
  const corridorPerformance = [
    { name: 'NDLS-CNB (HDN-1)', availability: 91.2, punctuality: 98.6, savedMinutes: 420 },
    { name: 'HWH-DDU (Grand Chord)', availability: 86.4, punctuality: 97.8, savedMinutes: 380 },
    { name: 'CSMT-KYN (Suburban)', availability: 89.1, punctuality: 99.1, savedMinutes: 290 },
    { name: 'SBC-MAS (South Express)', availability: 94.0, punctuality: 98.4, savedMinutes: 210 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              Operational Analytics & Impact Assessment
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              SIH 2026 Metrics
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quantifiable improvements in line capacity, downtime reduction, and inter-departmental co-scheduling synergy.
          </p>
        </div>
      </div>

      {/* High-Level Impact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs text-slate-400 font-medium mb-1">Downtime Reduction</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
            -42.8%
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Combined multi-dept windows save over 1,300 minutes weekly
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs text-slate-400 font-medium mb-1">Sanction Turnaround Time</div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight">
            11 Mins
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Down from 4.8 hours of manual phone coordination
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs text-slate-400 font-medium mb-1">Co-Scheduled Rate</div>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono tracking-tight">
            78.2%
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Tasks executed jointly across TMS, SMMS & TDMS
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs text-slate-400 font-medium mb-1">Safety Compliance</div>
          <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
            100%
          </div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Zero safety violations detected
          </div>
        </div>
      </div>

      {/* Detailed Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Corridor Performance Breakdown */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Corridor Availability & Punctuality Breakdown
          </h2>

          <div className="space-y-3">
            {corridorPerformance.map((c) => (
              <div key={c.name} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{c.name}</span>
                  <span className="text-emerald-400 font-mono font-bold">⏱️ {c.savedMinutes} Mins Saved</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="text-slate-400 flex items-center justify-between">
                      <span>Asset Availability:</span>
                      <span className="text-white font-mono font-bold">{c.availability}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.availability}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 flex items-center justify-between">
                      <span>Punctuality:</span>
                      <span className="text-white font-mono font-bold">{c.punctuality}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.punctuality}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional vs RailSync Comparison Table */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Comparative Benchmark: Manual vs RailSync AI
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-medium">Evaluation Parameter</th>
                  <th className="pb-2 font-medium text-rose-400">Traditional Process</th>
                  <th className="pb-2 font-medium text-emerald-400">RailSync AI Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 font-medium">Department Coordination</td>
                  <td className="py-2.5 text-slate-400">Siloed (Separate requests)</td>
                  <td className="py-2.5 text-emerald-300 font-semibold">Unified Cross-Dept Ingestion</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Block Conflict Detection</td>
                  <td className="py-2.5 text-slate-400">Manual phone / paper memos</td>
                  <td className="py-2.5 text-emerald-300 font-semibold">Automated CP-SAT Solver</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Train Schedule Impact</td>
                  <td className="py-2.5 text-slate-400">Frequent speed restrictions & delays</td>
                  <td className="py-2.5 text-emerald-300 font-semibold">Timetable-aware shadow windows</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Proof of Work Verification</td>
                  <td className="py-2.5 text-slate-400">Manual visual inspection</td>
                  <td className="py-2.5 text-emerald-300 font-semibold">YOLOv8 AI Computer Vision</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
