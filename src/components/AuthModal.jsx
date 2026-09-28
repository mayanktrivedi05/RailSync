import React, { useState } from 'react';
import { X, Train, ShieldCheck, User, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedDept, setSelectedDept] = useState('COA');
  const [name, setName] = useState('Arjun Sharma');
  const [email, setEmail] = useState('controller.ndls@railnet.gov.in');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: isSignUp ? name : (selectedDept === 'COA' ? 'Arjun Sharma (Chief Controller)' : 'Sunil V. (Senior Engineer)'),
      role: selectedDept,
      email: email
    });
    onClose();
  };

  const handleQuickDemoLogin = (deptKey) => {
    setSelectedDept(deptKey);
    onLogin({
      name: deptKey === 'COA' ? 'Arjun Sharma' : deptKey === 'TMS' ? 'Rajesh Kumar (P-Way)' : deptKey === 'SMMS' ? 'Vikram Rao (Signal)' : 'Amit Verma (OHE)',
      role: deptKey,
      email: `${deptKey.toLowerCase()}.incharge@railnet.gov.in`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Branding Header */}
        <div className="text-center space-y-1.5">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <Train className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {isSignUp ? 'Create Official RailSync Account' : 'Welcome to RailSync Portal'}
          </h2>
          <p className="text-xs text-slate-400">
            Indian Railways Automatic Block Planning System • SIH 2026
          </p>
        </div>

        {/* Quick Demo Sign-in Section */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            1-Click Evaluator Demo Login
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('COA')}
              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-left transition"
            >
              COA Section Controller
            </button>
            <button
              onClick={() => handleQuickDemoLogin('TMS')}
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold text-left transition"
            >
              TMS Track Engineer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('SMMS')}
              className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-left transition"
            >
              SMMS Signal Officer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('TDMS')}
              className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-left transition"
            >
              TDMS OHE Traction
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Department Selector */}
          <div>
            <label className="text-[11px] font-medium text-slate-300 block mb-1">
              Select Railway Department Role
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none focus:border-cyan-500"
            >
              <option value="COA">Operations / Section Controller (COA)</option>
              <option value="TMS">Engineering / Track Management (TMS)</option>
              <option value="SMMS">Signal & Telecommunications (SMMS)</option>
              <option value="TDMS">Traction & Electrical Distribution (TDMS)</option>
            </select>
          </div>

          {isSignUp && (
            <div>
              <label className="text-[11px] font-medium text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Officer Name"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-slate-300 block mb-1">Official IR Email / ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="controller.ndls@railnet.gov.in"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-300 block mb-1">Security Credential / Token</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Register Officer Account' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Sign Up / Login */}
        <div className="text-center text-xs text-slate-400">
          <span>{isSignUp ? 'Already have credentials?' : "Need a new departmental account?"}</span>{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-cyan-400 hover:underline font-semibold"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
