import React, { useState, useEffect } from 'react';
import { Train, Bell, User, Clock, Shield, Sparkles, ChevronDown, CheckCircle2, AlertTriangle, LogIn, LogOut } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function Navbar({ activeRole, setActiveRole, onOpenAuth, onOpenNewTask, user, onLogout, onTriggerAlert }) {
  const [time, setTime] = useState(new Date());
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-IN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const roles = [
    { id: 'COA', title: 'Section Controller (COA)', icon: 'ShieldCheck', color: 'emerald' },
    { id: 'TMS', title: 'Permanent Way Engineer (TMS)', icon: 'TrainTrack', color: 'blue' },
    { id: 'SMMS', title: 'Signal & Telecom Officer (SMMS)', icon: 'Radio', color: 'purple' },
    { id: 'TDMS', title: 'Traction Power Officer (TDMS)', icon: 'Zap', color: 'amber' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/20 text-white font-bold ring-1 ring-cyan-400/30">
            <Train className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                RailSync
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AI 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI-Powered Automatic Block Planning • <span className="text-amber-400 font-semibold">SIH26027</span> • <span className="text-cyan-400 font-semibold">SixSnippers</span>
            </p>
          </div>
        </div>

        {/* Center: Live railway clock & corridor status */}
        <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-medium">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formattedTime} IST</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-300">Live Grid: <strong className="text-emerald-400">NDLS-CNB UP Normal</strong></span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick AI Simulation Button */}
          <button
            onClick={onTriggerAlert}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition shadow-sm"
            title="Simulate Real-time Defect & Auto Re-plan"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulate AI Gap</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs font-medium text-slate-200 transition"
            >
              <div className={`w-2 h-2 rounded-full ${
                activeRole === 'COA' ? 'bg-emerald-400' :
                activeRole === 'TMS' ? 'bg-blue-400' :
                activeRole === 'SMMS' ? 'bg-purple-400' : 'bg-amber-400'
              }`} />
              <span className="hidden sm:inline">{DEPARTMENTS[activeRole]?.name || activeRole}</span>
              <span className="sm:hidden">{activeRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Department View
                </div>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRole(r.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition ${
                      activeRole === r.id
                        ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${r.color}-400`} />
                      <span>{r.title}</span>
                    </div>
                    {activeRole === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-200">Real-Time Alerts</span>
                  <span className="text-[10px] px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded-full">3 New</span>
                </div>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto pr-1">
                  <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs space-y-1">
                    <div className="flex items-center justify-between text-amber-300 font-medium">
                      <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> AI Co-Scheduling Ready</span>
                      <span className="text-[10px] text-slate-400">2m ago</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">NDLS-CNB: Merged 3 tasks into single 75 min block. Saved 105 mins downtime.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs space-y-1">
                    <div className="flex items-center justify-between text-cyan-300 font-medium">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Proof of Work Uploaded</span>
                      <span className="text-[10px] text-slate-400">12m ago</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">CSMT-KYN: Axle Counter replacement photo AI-verified with 99.4% confidence.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile / Login button with dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-xs font-bold text-white border border-cyan-400/40">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left text-xs pr-1">
                  <div className="font-semibold text-slate-200 leading-tight">{user.name}</div>
                  <div className="text-[10px] text-cyan-400">{user.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
                  <div className="px-2.5 py-1.5 border-b border-slate-800">
                    <div className="text-xs font-bold text-white">{user.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenAuth('login');
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition text-left"
                  >
                    <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Switch / Login Screen</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenAuth('signup');
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition text-left"
                  >
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sign Up Screen</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition text-left border-t border-slate-800"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Login</span>
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-cyan-500/20"
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
