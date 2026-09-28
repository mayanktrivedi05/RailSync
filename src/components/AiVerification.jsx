import React, { useState } from 'react';
import { 
  ScanEye, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  RefreshCw, 
  SlidersHorizontal,
  ChevronRight,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEPARTMENTS } from '../data/mockData';

export default function AiVerification({ tasks, onVerifyTask }) {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [customImage, setCustomImage] = useState(null);

  const pendingVerificationTasks = tasks;
  const currentTask = pendingVerificationTasks[selectedTaskIndex] || tasks[0];

  const handleRunAiScan = () => {
    setIsScanning(true);
    setScanCompleted(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 1800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setScanCompleted(false);
    }
  };

  const handleSignOff = () => {
    if (onVerifyTask) {
      onVerifyTask(currentTask.id);
    }
  };

  const activeImage = customImage || currentTask?.verificationData?.sampleImage || 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?w=800&auto=format&fit=crop&q=60';

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ScanEye className="w-6 h-6 text-cyan-400" />
              Execution & AI Computer Vision Verification
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              YOLOv8 + OpenCV Model
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validates field engineer proof of work, structural clearance, and safety compliance before revoking block.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAiScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition"
          >
            <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Analyzing YOLO Tensors...' : 'Run AI Inspection Scan'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Task Selector List & Inspection Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Maintenance Tasks Queue */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Field Execution Queue ({tasks.length})
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {tasks.map((task, idx) => {
              const dept = DEPARTMENTS[task.dept] || DEPARTMENTS.TMS;
              const isSelected = selectedTaskIndex === idx;

              return (
                <div
                  key={task.id}
                  onClick={() => {
                    setSelectedTaskIndex(idx);
                    setScanCompleted(false);
                    setCustomImage(null);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-cyan-500 bg-slate-900 ring-1 ring-cyan-500/30 shadow-md' 
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-slate-300 font-bold">{task.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dept.badgeClass}`}>
                      {task.dept}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white line-clamp-1 mb-1">
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    📍 {task.section}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{task.assignedTeam}</span>
                    <span className="text-cyan-400 font-medium">Verify Proof →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: AI Computer Vision Studio */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  Target Inspection Asset
                </span>
                <h2 className="text-base font-bold text-white">
                  {currentTask.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload Field Photo</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Photo / Inspection Preview Frame with Scanning overlay */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-900 aspect-video flex items-center justify-center group">
              <img 
                src={activeImage} 
                alt="Maintenance Evidence" 
                className="w-full h-full object-cover"
              />

              {/* Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-cyan-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 animate-scanline shadow-lg shadow-cyan-400"></div>
                  <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-cyan-500/50 text-cyan-300 text-xs font-mono flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Neural Network YOLOv8 Scanning Track Surface...</span>
                  </div>
                </div>
              )}

              {/* YOLO Bounding Boxes Overlay on Scan Complete */}
              {scanCompleted && (
                <>
                  {/* Bounding Box 1 */}
                  <div className="absolute top-[28%] left-[24%] w-[48%] h-[42%] border-2 border-emerald-400 bg-emerald-500/10 rounded-lg animate-in zoom-in-95 duration-200">
                    <div className="absolute -top-6 left-0 px-2 py-0.5 bg-emerald-500 text-slate-950 font-mono font-bold text-[10px] rounded shadow">
                      Track Joint: PASS (Confidence: 99.4%)
                    </div>
                  </div>

                  {/* Bounding Box 2 */}
                  <div className="absolute bottom-[15%] right-[15%] w-[25%] h-[25%] border-2 border-cyan-400 bg-cyan-500/10 rounded-lg animate-in zoom-in-95 duration-300">
                    <div className="absolute -top-6 left-0 px-2 py-0.5 bg-cyan-500 text-slate-950 font-mono font-bold text-[10px] rounded shadow">
                      Clearance: ZERO DEBRIS
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* AI Verification Results Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  AI Computer Vision Verification Metrics
                </span>
                <span className={`text-xs font-mono font-bold ${scanCompleted ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {scanCompleted ? `Model Accuracy: ${currentTask.verificationData?.aiScore || 98.7}%` : 'Scan Pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(currentTask.verificationData?.expectedLabels || [
                  'Track Clearance: 99.4%',
                  'Bolt Torque: 120 N-m (PASS)',
                  'No Debris Detected'
                ]).map((label, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${scanCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className={scanCompleted ? 'text-slate-200 font-medium' : 'text-slate-400'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Sign-off & Close Block Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Authorized By: <strong className="text-slate-200">Section Controller (COA)</strong>
              </div>

              <button
                onClick={handleSignOff}
                disabled={!scanCompleted}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign-off & Mark Task Completed (Revoke Block)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
