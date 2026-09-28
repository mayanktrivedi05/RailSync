import React from 'react';
import { BookOpen, Layers, ShieldCheck, Cpu, Code2, Database, Network, GitBranch } from 'lucide-react';

export default function DocsView() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              SIH 2026 Technical Specifications & RDSO Reference
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Problem ID: SIH26027
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            System Architecture, Microservices, and Mathematical Optimization Formulation for Indian Railways.
          </p>
        </div>
      </div>

      {/* Tech Stack Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>Frontend & Real-time Layer</span>
          </div>
          <p className="text-xs text-slate-300">
            React.js + TypeScript, Tailwind CSS, WebSocket / Socket.IO for real-time section controller block push and dynamic train track updating.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>AI / ML Optimization Services</span>
          </div>
          <p className="text-xs text-slate-300">
            Python + FastAPI, Google OR-Tools (CP-SAT Solver) for constraint-based block scheduling, and XGBoost for severity scoring.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Database className="w-4 h-4" />
            <span>Computer Vision Verification</span>
          </div>
          <p className="text-xs text-slate-300">
            OpenCV + YOLOv8 neural network inference for automated proof-of-work validation and track clearance verification before revoking power/traffic blocks.
          </p>
        </div>
      </div>

      {/* RDSO Reference Information */}
      <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Alignment with RDSO Functional Requirement Specifications
        </h2>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="text-white block mb-1">1. Unified Maintenance Layer (RDSO RDPMS FRS)</strong>
            Ingests track defects from Track Management System (TMS), electrical OHE telemetry from TDMS, and signal relay health from SMMS into a singular spatial database (PostGIS).
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="text-white block mb-1">2. Train-Aware Shadow Block Window Allocation</strong>
            Utilizes live Control Office Application (COA) train timetables to calculate optimal micro-windows without causing cascading passenger train delays or freight stagnation.
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="text-white block mb-1">3. Human-in-the-Loop Section Controller Authority</strong>
            Provides the Section Controller with an instant 1-click digital sanction mechanism, keeping safety accountability paramount while eliminating phone-call delays.
          </div>
        </div>
      </div>
    </div>
  );
}
