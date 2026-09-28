import React, { useState } from 'react';
import { 
  ListFilter, 
  Search, 
  Sparkles, 
  Layers, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckSquare, 
  ArrowRight, 
  Plus, 
  Filter
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function TaskPrioritization({ tasks, onSendToPlanner, onAddNewTask }) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(['TSK-2026-891', 'TSK-2026-894', 'TSK-2026-898']);

  const filteredTasks = tasks.filter(task => {
    const matchesDept = selectedDept === 'ALL' || task.dept === selectedDept;
    const matchesSeverity = selectedSeverity === 'ALL' || task.severity === selectedSeverity;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSeverity && matchesSearch;
  });

  const handleToggleSelect = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(tId => tId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const handleSelectAllGroup = () => {
    const grouped = ['TSK-2026-891', 'TSK-2026-894', 'TSK-2026-898'];
    setSelectedTasks(grouped);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ListFilter className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              AI Task Prioritization
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
              XGBoost
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregates defects from TMS, SMMS & TDMS scored by criticality.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onAddNewTask}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>New Defect</span>
          </button>

          <button
            onClick={() => onSendToPlanner(selectedTasks)}
            disabled={selectedTasks.length === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-bold shadow-md transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan ({selectedTasks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Location-wise Aggregation Alert Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-amber-950/20 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex flex-wrap items-center gap-1.5">
              <span>Location Cluster: Km 1284 (Aligarh-Tundla)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 font-mono">
                3 Cross-Dept Defects
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Track, Signal & OHE have pending work on the same segment. AI recommends a joint block to save 105 mins.
            </p>
          </div>
        </div>
        <button
          onClick={handleSelectAllGroup}
          className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition"
        >
          Auto-Group & Select 3
        </button>
      </div>

      {/* Search and Filters bar */}
      <div className="glass-panel p-3 sm:p-4 rounded-2xl border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search defect ID, section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Badges with horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Department Filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px] sm:text-xs shrink-0">
            <button
              onClick={() => setSelectedDept('ALL')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                selectedDept === 'ALL' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'
              }`}
            >
              All Depts
            </button>
            {Object.keys(DEPARTMENTS).filter(d => d !== 'COA').map(deptKey => (
              <button
                key={deptKey}
                onClick={() => setSelectedDept(deptKey)}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  selectedDept === deptKey ? `${DEPARTMENTS[deptKey].badgeClass} font-bold` : 'text-slate-400'
                }`}
              >
                {deptKey}
              </button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px] sm:text-xs shrink-0">
            {['ALL', 'Critical', 'High'].map(sev => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  selectedSeverity === sev ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List Cards */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const dept = DEPARTMENTS[task.dept] || DEPARTMENTS.TMS;
          const isSelected = selectedTasks.includes(task.id);

          return (
            <div
              key={task.id}
              className={`glass-panel p-3.5 sm:p-4 rounded-2xl border transition-all ${
                isSelected 
                  ? 'border-cyan-500/60 bg-slate-900/90 ring-1 ring-cyan-500/30' 
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Left info */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <button
                    onClick={() => handleToggleSelect(task.id)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                      isSelected 
                        ? 'bg-cyan-500 border-cyan-400 text-white' 
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isSelected && <CheckSquare className="w-3.5 h-3.5" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-300">{task.id}</span>
                      <span className={`px-2 py-0.2 text-[10px] font-bold rounded-full border ${dept.badgeClass}`}>
                        {dept.name}
                      </span>
                      <span className={`px-2 py-0.2 text-[10px] font-bold rounded-full ${
                        task.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {task.severity}
                      </span>
                      <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-800 text-slate-300 font-mono">
                        ⏱️ {task.durationReqMinutes}m
                      </span>
                    </div>

                    <h2 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {task.title}
                    </h2>

                    <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        {task.section}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3 shrink-0" />
                        Urgency: <strong className="text-amber-300">{task.urgency}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: AI Score & Recommendations */}
                <div className="flex sm:flex-row lg:flex-col items-center sm:items-end justify-between lg:justify-center gap-2 shrink-0 border-t lg:border-t-0 border-slate-800 pt-2 lg:pt-0">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] text-slate-400">XGBoost Score</div>
                    <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
                      {task.severityScore}<span className="text-xs text-slate-400">/100</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">AI Suggested Window</div>
                    <div className="text-[11px] sm:text-xs font-bold text-emerald-400 font-mono">
                      {task.aiRecommendedWindow}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
