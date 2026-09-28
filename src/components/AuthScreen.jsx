import React, { useState } from 'react';
import { 
  Train, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Briefcase,
  Layers,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function AuthScreen({ onLogin, initialMode = 'login', onBackToApp }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [selectedDept, setSelectedDept] = useState('COA');
  const [name, setName] = useState('Arjun Sharma');
  const [email, setEmail] = useState('controller.ndls@railnet.gov.in');
  const [password, setPassword] = useState('password123');
  const [employeeId, setEmployeeId] = useState('IR-NR-8942');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: isSignUp ? name : (selectedDept === 'COA' ? 'Arjun Sharma' : selectedDept === 'TMS' ? 'Rajesh Kumar' : selectedDept === 'SMMS' ? 'Vikram Rao' : 'Amit Verma'),
      role: selectedDept,
      email: email,
      employeeId: employeeId
    });
  };

  const handleQuickDemo = (deptKey) => {
    const rolesMap = {
      COA: { name: 'Arjun Sharma', title: 'Chief Section Controller (COA)' },
      TMS: { name: 'Rajesh Kumar', title: 'Senior P-Way Engineer (TMS)' },
      SMMS: { name: 'Vikram Rao', title: 'Senior Signal In-Charge (SMMS)' },
      TDMS: { name: 'Amit Verma', title: 'Traction Power Officer (TDMS)' }
    };
    onLogin({
      name: rolesMap[deptKey].name,
      role: deptKey,
      email: `${deptKey.toLowerCase()}.division@railnet.gov.in`,
      employeeId: `IR-${deptKey}-2026`
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Header branding */}
      <div className="relative z-10 text-center mb-6 space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 ring-2 ring-cyan-400/30 text-white font-extrabold mb-1">
          <Train className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-white">
            RailSync
          </h1>
          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            SIH 2026
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          Unified AI-Powered Decision Support Layer for Indian Railways Maintenance Planning
        </p>
      </div>

      {/* Main Auth Card (Matches PPT Page 6) */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-700/80 shadow-2xl p-6 md:p-8 space-y-6">
        {/* Toggle Login vs Sign Up Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-2.5 rounded-xl transition ${
              !isSignUp 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In / Login
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-2.5 rounded-xl transition ${
              isSignUp 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1-Click Evaluator Quick Logins */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1 text-cyan-400">
              <Sparkles className="w-3 h-3" />
              1-Click Demo Login by Department
            </span>
            <span className="text-slate-500">Evaluator Mode</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemo('COA')}
              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-left transition flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>COA Controller</span>
            </button>
            <button
              onClick={() => handleQuickDemo('TMS')}
              className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold text-left transition flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span>TMS Engineer</span>
            </button>
            <button
              onClick={() => handleQuickDemo('SMMS')}
              className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-left transition flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>SMMS S&T</span>
            </button>
            <button
              onClick={() => handleQuickDemo('TDMS')}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-left transition flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <span>TDMS Traction</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Department Selection */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Department / Railway Wing</span>
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 outline-none focus:border-cyan-500 transition cursor-pointer font-medium"
            >
              <option value="COA">Operations / Control Office (COA)</option>
              <option value="TMS">Engineering / Track Management (TMS)</option>
              <option value="SMMS">Signal & Telecommunication (SMMS)</option>
              <option value="TDMS">Traction & Electrical Power (TDMS)</option>
            </select>
          </div>

          {/* If Sign up, show Name and Employee ID */}
          {isSignUp && (
            <>
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">Officer Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">Railway Employee ID</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. IR-NR-8942"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-500 outline-none font-mono"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Official Railnet Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@railnet.gov.in"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Access Password / Security PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 transform active:scale-95"
          >
            <span>{isSignUp ? 'Create Officer Account & Enter' : 'Sign In to RailSync Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Direct Guest Preview link */}
        <div className="text-center pt-1 border-t border-slate-800">
          <button
            type="button"
            onClick={() => handleQuickDemo('COA')}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Skip to Live Dashboard Demo →
          </button>
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 text-center text-[11px] text-slate-500 mt-6">
        Smart India Hackathon 2026 • Problem Statement ID: <strong className="text-slate-400">SIH26027</strong> • Team: <strong className="text-slate-400">SixSnippers</strong>
      </div>
    </div>
  );
}
