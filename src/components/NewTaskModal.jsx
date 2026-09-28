import React, { useState } from 'react';
import { X, Plus, AlertTriangle, Layers, MapPin, Clock, Sparkles } from 'lucide-react';
import { DEPARTMENTS, CORRIDORS } from '../data/mockData';

export default function NewTaskModal({ isOpen, onClose, onAddTask }) {
  const [dept, setDept] = useState('TMS');
  const [title, setTitle] = useState('');
  const [corridorId, setCorridorId] = useState('NDLS-CNB');
  const [section, setSection] = useState('Aligarh Jn - Tundla (Km 1284/22)');
  const [line, setLine] = useState('UP Main Line');
  const [severity, setSeverity] = useState('High');
  const [durationReqMinutes, setDurationReqMinutes] = useState(60);
  const [urgency, setUrgency] = useState('Immediate (24h)');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `TSK-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: title || `${dept} Maintenance & Track Clearance`,
      dept,
      corridorId,
      section,
      line,
      severity,
      severityScore: severity === 'Critical' ? 95 : severity === 'High' ? 88 : 72,
      urgency,
      assetCriticality: 'High',
      overdueDays: 1,
      durationReqMinutes: Number(durationReqMinutes),
      status: 'Pending Planning',
      reportedAt: new Date().toLocaleString('en-IN'),
      assignedTeam: `${dept} Mobile Maintenance Squad`,
      description: description || 'Routine inspection defect logged by field automated sensor.',
      aiRecommendedWindow: '11:45 AM - 01:00 PM',
      verificationData: {
        imageType: 'Track Component',
        sampleImage: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?w=800&auto=format&fit=crop&q=60',
        expectedLabels: ['Clearance Confirmed', 'Bolt Torque: PASS'],
        aiScore: 99.0
      }
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            Ingest Maintenance Task / Defect
          </h2>
          <p className="text-xs text-slate-400">
            Feed new track, signal, or traction defect directly into the AI Prioritization and Block Planner.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Dept selection */}
          <div className="grid grid-cols-3 gap-2">
            {['TMS', 'SMMS', 'TDMS'].map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDept(d)}
                className={`p-2.5 rounded-xl border text-center font-bold transition ${
                  dept === d ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                {d} ({d === 'TMS' ? 'Track' : d === 'SMMS' ? 'Signal' : 'OHE'})
              </button>
            ))}
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Defect Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ultrasonic Flaw Detection Rail Weld Microcrack"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Corridor</label>
              <select
                value={corridorId}
                onChange={(e) => setCorridorId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500"
              >
                {CORRIDORS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500"
              >
                <option value="Critical">Critical Priority (Emergency)</option>
                <option value="High">High Priority (Within 24h)</option>
                <option value="Medium">Medium Priority (Scheduled)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Section / Km Post</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Block Time Required (Mins)</label>
              <input
                type="number"
                value={durationReqMinutes}
                onChange={(e) => setDurationReqMinutes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500"
                min="15"
                max="240"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Technical Observation Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide field sensor observations or USFD telemetry log..."
              rows="2"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ingest & Calculate AI Score</span>
          </button>
        </form>
      </div>
    </div>
  );
}
