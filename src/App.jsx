import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskPrioritization from './components/TaskPrioritization';
import BlockPlanner from './components/BlockPlanner';
import AiVerification from './components/AiVerification';
import Analytics from './components/Analytics';
import DocsView from './components/DocsView';
import AuthModal from './components/AuthModal';
import AuthScreen from './components/AuthScreen';
import NewTaskModal from './components/NewTaskModal';
import { INITIAL_TASKS, AI_OPTIMIZED_BLOCKS, CORRIDORS } from './data/mockData';
import confetti from 'canvas-confetti';
import { 
  LayoutDashboard, 
  ListFilter, 
  CalendarClock, 
  ScanEye, 
  BarChart3, 
  Sparkles 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [activeRole, setActiveRole] = useState('COA');
  const [user, setUser] = useState({
    name: 'Arjun Sharma',
    role: 'Chief Section Controller (COA)',
    email: 'controller.ndls@railnet.gov.in'
  });
  
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [blocks, setBlocks] = useState(AI_OPTIMIZED_BLOCKS);
  const [selectedCorridor, setSelectedCorridor] = useState('NDLS-CNB');

  // Modals & Auth state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
    showToast(`✓ Defect ${newTask.id} Ingested & AI Scored!`);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handleSendToPlanner = (selectedIds) => {
    setCurrentTab('planner');
    showToast(`⚡ ${selectedIds.length} Tasks Transmitted to CP-SAT Optimizer`);
  };

  const handleSanctionBlock = (blockId) => {
    showToast(`⚡ Block ${blockId} Sanctioned & Broadcasted to COA Live Stream!`);
  };

  const handleVerifyTask = (taskId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'Verified & Closed' };
      }
      return t;
    }));
    showToast(`✓ Task ${taskId} AI-Verified & Track Block Safely Revoked!`);
  };

  const handleTriggerAlert = () => {
    showToast(`⚡ Real-time USFD Sensor telemetry detected near Tundla. Auto re-planning active.`);
    confetti({ particleCount: 40, spread: 60 });
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setCurrentTab(mode);
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setActiveRole(loggedInUser.role);
    setCurrentTab('dashboard');
    showToast(`Welcome ${loggedInUser.name} (${loggedInUser.role})`);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleLogout = () => {
    setUser(null);
    showToast(`Logged out successfully. Switched to Guest View.`);
  };

  const pendingCount = tasks.filter(t => t.status === 'Pending Planning').length;
  const verifyCount = tasks.filter(t => t.status === 'Awaiting AI Verification').length;

  // If user selected full Login or Sign Up view
  if (currentTab === 'login' || currentTab === 'signup') {
    return (
      <AuthScreen
        initialMode={currentTab}
        onLogin={handleLoginSuccess}
        onBackToApp={() => setCurrentTab('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-20 md:pb-0">
      {/* Top Navigation */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={(role) => {
          setActiveRole(role);
          showToast(`Switched view to ${role} department`);
        }}
        onOpenAuth={handleOpenAuth}
        onOpenNewTask={() => setIsNewTaskOpen(true)}
        user={user}
        onLogout={handleLogout}
        onTriggerAlert={handleTriggerAlert}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          pendingCount={pendingCount}
          blockCount={blocks.length}
          verifyCount={verifyCount}
          onOpenAuth={handleOpenAuth}
        />

        {/* Content Area */}
        <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              blocks={blocks}
              onNavigate={setCurrentTab}
              activeRole={activeRole}
              onOpenNewTask={() => setIsNewTaskOpen(true)}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              corridors={CORRIDORS}
            />
          )}

          {currentTab === 'prioritization' && (
            <TaskPrioritization
              tasks={tasks}
              onSendToPlanner={handleSendToPlanner}
              onAddNewTask={() => setIsNewTaskOpen(true)}
            />
          )}

          {currentTab === 'planner' && (
            <BlockPlanner
              onSanctionBlock={handleSanctionBlock}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'verification' && (
            <AiVerification
              tasks={tasks}
              onVerifyTask={handleVerifyTask}
            />
          )}

          {currentTab === 'analytics' && (
            <Analytics />
          )}

          {currentTab === 'docs' && (
            <DocsView />
          )}
        </main>
      </div>

      {/* Native App-Style Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
        {[
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'prioritization', label: 'Tasks', icon: ListFilter, badge: pendingCount },
          { id: 'planner', label: 'Planner', icon: CalendarClock, isSpecial: true },
          { id: 'verification', label: 'AI Verify', icon: ScanEye, badge: verifyCount },
          { id: 'analytics', label: 'Insights', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative rounded-xl transition ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-cyan-400' : 'text-slate-400'}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-cyan-400 rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 animate-in slide-in-from-bottom-3 fade-in duration-200">
          <div className="px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/50 shadow-2xl text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLoginSuccess}
      />

      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
