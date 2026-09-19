import React, { useState, useMemo } from 'react';
import { 
  Building2, Search, Filter, Cpu, ShieldCheck, CheckCircle2, 
  FileText, Activity, ArrowRight, TrendingUp, AlertTriangle, 
  ChevronRight, Lock, Sparkles, RefreshCw, Zap, BarChart2,
  CheckCircle, PlusCircle, Check, X, Award, ExternalLink, Globe, Database, Shield,
  Play, Download, Sliders, MapPin, Users, Bell, Info, Compass, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  AreaChart, Area 
} from 'recharts';

import { 
  DEMO_ROLES, 
  INITIAL_CHALLENGES, 
  INITIAL_STARTUPS, 
  INITIAL_PILOTS, 
  AUDIT_TRAIL, 
  MAHARASHTRA_DISTRICTS 
} from './services/govScaleData';
import { generateDpcPdf, exportTelemetryCsv } from './services/pdfService';
import DemoTourModal from './components/DemoTourModal';
import ChallengeDetailModal from './components/ChallengeDetailModal';
import HashInspectorModal from './components/HashInspectorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState(DEMO_ROLES[0].role);
  const [user, setUser] = useState(DEMO_ROLES[0]);
  const [notification, setNotification] = useState(null);

  // Core Datasets
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [startups, setStartups] = useState(INITIAL_STARTUPS);
  const [pilots, setPilots] = useState(INITIAL_PILOTS);
  const [audits, setAudits] = useState(AUDIT_TRAIL);

  // Selected Entities
  const [selectedChallengeId, setSelectedChallengeId] = useState(INITIAL_CHALLENGES[0].id);
  const [selectedStartupId, setSelectedStartupId] = useState(INITIAL_STARTUPS[0].id);

  // Modals
  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [inspectingChallenge, setInspectingChallenge] = useState(null);
  const [inspectingHashAudit, setInspectingHashAudit] = useState(null);

  // Evaluation criteria scores
  const [evaluationScores, setEvaluationScores] = useState({
    clinical: 96,
    feasibility: 94,
    security: 98,
    scalability: 92,
    team: 90,
    cost: 95
  });
  const [evaluatorComments, setEvaluatorComments] = useState(
    "Clinical AI algorithm exhibits 96.4% diagnostic concordance with senior radiologist audit at Aundh District Hospital. Zero false-negative acute pneumonia cases in 14,280 screenings. Fully compliant with DPDP Act 2023 on-premise anonymization requirements."
  );

  const showNotify = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3800);
  };

  const handleSwitchRole = (roleName) => {
    setCurrentRole(roleName);
    const found = DEMO_ROLES.find(r => r.role === roleName) || DEMO_ROLES[0];
    setUser(found);
    showNotify(`Switched active persona to: ${found.role} — ${found.name}`, "success");
  };

  const handleResetDemo = () => {
    setChallenges(INITIAL_CHALLENGES);
    setStartups(INITIAL_STARTUPS);
    setPilots(INITIAL_PILOTS);
    setAudits(AUDIT_TRAIL);
    setSelectedChallengeId(INITIAL_CHALLENGES[0].id);
    setSelectedStartupId(INITIAL_STARTUPS[0].id);
    setEvaluationScores({ clinical: 96, feasibility: 94, security: 98, scalability: 92, team: 90, cost: 95 });
    showNotify("Platform demo state reset back to default SIH26136 state.", "success");
  };

  const activeChallenge = useMemo(() => {
    return challenges.find(c => c.id === selectedChallengeId) || challenges[0];
  }, [challenges, selectedChallengeId]);

  const activeStartup = useMemo(() => {
    return startups.find(s => s.id === selectedStartupId) || startups[0];
  }, [startups, selectedStartupId]);

  const activePilot = useMemo(() => {
    return pilots.find(p => p.challengeId === selectedChallengeId) || pilots[0];
  }, [pilots, selectedChallengeId]);

  // Simulate Telemetry data tick
  const handleSimulateTelemetryTick = () => {
    setPilots(prev => prev.map(p => {
      if (p.id === activePilot.id) {
        const newPatients = p.patientsScreened + 24;
        const newProgress = Math.min(100, p.progress + 1);
        return {
          ...p,
          patientsScreened: newPatients,
          progress: newProgress,
          telemetryStream: [
            ...p.telemetryStream,
            { time: "15:00", patients: newPatients, accuracy: 96.5 }
          ]
        };
      }
      return p;
    }));

    const newAudit = {
      id: `aud_${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString() + " IST",
      action: "LIVE_TELEMETRY_RECORD_COMMITTED",
      actor: `${activePilot.name} Telemetry Node`,
      details: `Live batch of 24 real-time sensor & clinical telemetry records hashed into Merkle tree.`,
      hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      verified: true,
      blockNumber: 148292
    };
    setAudits(prev => [newAudit, ...prev]);
    showNotify("Live telemetry stream updated! +24 new records hashed on-chain.", "success");
  };

  const handleExportDpcPdf = () => {
    generateDpcPdf(activePilot, activeChallenge, activeStartup, user);
    showNotify("Official DPC Procurement Dossier (PDF) generated and downloaded!", "success");
  };

  const handleExportCsv = () => {
    exportTelemetryCsv(activePilot.telemetryStream, `${activePilot.id}_telemetry_feed.csv`);
    showNotify("Pilot telemetry raw dataset exported as CSV!", "success");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 text-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-fade-in text-sm font-extrabold backdrop-blur-xl">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Official State Ribbon */}
      <div className="bg-[#04070e] text-slate-300 text-xs py-2.5 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center text-amber-400 font-black tracking-wider uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
            GOVERNMENT OF MAHARASHTRA
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-200 font-bold">Smart India Hackathon 2026 (SIH26136)</span>
          <span className="hidden md:inline text-teal-400 font-mono text-xs font-black bg-teal-950/80 px-2.5 py-0.5 rounded-md border border-teal-700/60 flex items-center gap-1">
            <Globe className="w-3 h-3 text-teal-400" />
            Public Open Access Mode
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="hidden md:inline text-emerald-400 font-mono text-xs font-black bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-700/60">
            Node #148,291 Active
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <button 
            onClick={() => setShowTourModal(true)}
            className="text-amber-400 hover:text-amber-300 flex items-center font-black transition-colors"
          >
            <Compass className="w-4 h-4 mr-1" /> 5-Stage Demo Tour
          </button>
          <span className="text-slate-700">|</span>
          <button 
            onClick={handleResetDemo}
            className="hover:text-white flex items-center transition-colors text-slate-300 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-slate-400" /> Reset Demo
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <div 
              className="flex items-center space-x-3.5 cursor-pointer group" 
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 font-black text-2xl group-hover:scale-105 transition-transform">
                G
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-black text-2xl tracking-tight text-white font-display">GovScale</span>
                  <span className="text-xs font-mono font-black bg-blue-950 text-blue-300 border border-blue-700 px-2 py-0.5 rounded-md">
                    SIH26136
                  </span>
                </div>
                <span className="text-xs text-slate-300 font-bold block">
                  Smart Public Procurement for Startup Innovation
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden xl:flex items-center space-x-1.5">
              <NavButton id="dashboard" label="Overview" icon={BarChart2} activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavButton id="challenges" label="Challenges" icon={Building2} activeTab={activeTab} setActiveTab={setActiveTab} badge={challenges.length} />
              <NavButton id="match" label="AI Matchmaker" icon={Cpu} activeTab={activeTab} setActiveTab={setActiveTab} badge="AI" />
              <NavButton id="evaluations" label="Evaluations" icon={FileText} activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavButton id="pilots" label="Pilots & Telemetry" icon={Activity} activeTab={activeTab} setActiveTab={setActiveTab} badge="Live" />
              <NavButton id="procurement" label="Procurement Dossier" icon={ShieldCheck} activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavButton id="scale" label="Scale Readiness" icon={TrendingUp} activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavButton id="audit" label="Audit Trail" icon={Database} activeTab={activeTab} setActiveTab={setActiveTab} badge="Chain" />
            </nav>

            {/* Role Switcher Pill */}
            <div className="flex items-center space-x-3">
              <div className="bg-[#070b14] px-4 py-2 rounded-2xl border border-slate-700 flex items-center space-x-3 shadow-inner">
                <div className={`w-8 h-8 rounded-xl ${user.color} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                  {user.avatar}
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Active Persona</span>
                  <select
                    value={currentRole}
                    onChange={(e) => handleSwitchRole(e.target.value)}
                    className="bg-transparent text-white font-extrabold border-none p-0 text-xs focus:ring-0 cursor-pointer"
                  >
                    {DEMO_ROLES.map(r => (
                      <option key={r.role} value={r.role} className="bg-slate-900 text-white font-bold">
                        {r.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Sub-header for Mobile Navigation */}
      <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 py-2.5 overflow-x-auto flex space-x-2">
        <NavButton id="dashboard" label="Overview" icon={BarChart2} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="challenges" label="Challenges" icon={Building2} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="match" label="AI Match" icon={Cpu} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="evaluations" label="Evaluations" icon={FileText} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="pilots" label="Pilots" icon={Activity} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="procurement" label="Dossier" icon={ShieldCheck} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="scale" label="Scale" icon={TrendingUp} activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavButton id="audit" label="Audit" icon={Database} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* VIEW 1: HOME PAGE / DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <DashboardView 
            user={user}
            challenges={challenges}
            startups={startups}
            pilots={pilots}
            audits={audits}
            setActiveTab={setActiveTab}
            setShowCreateModal={() => setShowCreateChallengeModal(true)}
            setShowTourModal={() => setShowTourModal(true)}
            setSelectedChallengeId={setSelectedChallengeId}
            onInspectChallenge={setInspectingChallenge}
            onInspectAudit={setInspectingHashAudit}
            onExportPdf={handleExportDpcPdf}
          />
        )}

        {/* VIEW 2: CHALLENGES */}
        {activeTab === 'challenges' && (
          <ChallengesView 
            challenges={challenges}
            setActiveTab={setActiveTab}
            setSelectedChallengeId={setSelectedChallengeId}
            setShowCreateModal={() => setShowCreateChallengeModal(true)}
            onInspectChallenge={setInspectingChallenge}
          />
        )}

        {/* VIEW 3: AI MATCHMAKER */}
        {activeTab === 'match' && (
          <AIMatchmakerView 
            challenge={activeChallenge}
            startup={activeStartup}
            startups={startups}
            challenges={challenges}
            setSelectedChallengeId={setSelectedChallengeId}
            setSelectedStartupId={setSelectedStartupId}
            setActiveTab={setActiveTab}
            showNotify={showNotify}
          />
        )}

        {/* VIEW 4: EVALUATIONS */}
        {activeTab === 'evaluations' && (
          <EvaluationsView 
            challenge={activeChallenge}
            startup={activeStartup}
            scores={evaluationScores}
            setScores={setEvaluationScores}
            comments={evaluatorComments}
            setComments={setEvaluatorComments}
            setActiveTab={setActiveTab}
            showNotify={showNotify}
            setAudits={setAudits}
            setChallenges={setChallenges}
          />
        )}

        {/* VIEW 5: PILOTS & TELEMETRY */}
        {activeTab === 'pilots' && (
          <PilotsView 
            pilot={activePilot}
            challenge={activeChallenge}
            startup={activeStartup}
            setActiveTab={setActiveTab}
            showNotify={showNotify}
            onSimulateTick={handleSimulateTelemetryTick}
            onExportCsv={handleExportCsv}
          />
        )}

        {/* VIEW 6: PROCUREMENT EVIDENCE */}
        {activeTab === 'procurement' && (
          <ProcurementView 
            pilot={activePilot}
            challenge={activeChallenge}
            startup={activeStartup}
            user={user}
            setActiveTab={setActiveTab}
            showNotify={showNotify}
            onExportPdf={handleExportDpcPdf}
            setAudits={setAudits}
          />
        )}

        {/* VIEW 7: SCALE READINESS */}
        {activeTab === 'scale' && (
          <ScaleView 
            districts={MAHARASHTRA_DISTRICTS}
            setActiveTab={setActiveTab}
            showNotify={showNotify}
          />
        )}

        {/* VIEW 8: BLOCKCHAIN AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <AuditView 
            audits={audits}
            onInspectAudit={setInspectingHashAudit}
            showNotify={showNotify}
          />
        )}

      </main>

      {/* Modals */}
      {showCreateChallengeModal && (
        <CreateChallengeModal 
          onClose={() => setShowCreateChallengeModal(false)}
          onCreate={(newChg) => {
            setChallenges(prev => [newChg, ...prev]);
            setShowCreateChallengeModal(false);
            showNotify(`Challenge "${newChg.title}" published to state portal!`, "success");
          }}
        />
      )}

      {inspectingChallenge && (
        <ChallengeDetailModal 
          challenge={inspectingChallenge}
          onClose={() => setInspectingChallenge(null)}
          onLaunchMatch={(chgId) => {
            setSelectedChallengeId(chgId);
            setActiveTab('match');
          }}
        />
      )}

      {showTourModal && (
        <DemoTourModal 
          onClose={() => setShowTourModal(false)}
          onNavigateTab={setActiveTab}
        />
      )}

      {inspectingHashAudit && (
        <HashInspectorModal 
          audit={inspectingHashAudit}
          onClose={() => setInspectingHashAudit(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#04070e] text-slate-400 text-xs py-10 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="font-black text-white text-base font-display">GovScale</span>
              <span className="badge-gov badge-blue text-[10px]">SIH26136</span>
            </div>
            <p className="text-slate-400 text-xs font-medium">
              Smart Public Procurement Framework for Startup Innovation • SIH 2026
            </p>
          </div>

          <div className="flex items-center space-x-6 text-xs font-bold">
            <button onClick={() => setActiveTab('audit')} className="hover:text-white transition-colors">
              Blockchain Ledger
            </button>
            <button onClick={() => setShowTourModal(true)} className="hover:text-white transition-colors">
              5-Stage Tour
            </button>
            <button onClick={() => handleExportDpcPdf()} className="text-amber-400 hover:text-amber-300 font-black transition-colors flex items-center">
              <Download className="w-3.5 h-3.5 mr-1.5" /> DPC Dossier (PDF)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// NavButton Component
function NavButton({ id, label, icon: Icon, activeTab, setActiveTab, badge }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/35 border border-blue-400' 
          : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
      }`}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
      <span>{label}</span>
      {badge !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-black ${
          isActive 
            ? 'bg-white/25 text-white' 
            : badge === 'AI' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
            : badge === 'Live' ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
            : 'bg-slate-800 text-slate-200'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ==========================================
// 1. DASHBOARD OVERVIEW VIEW (HOME PAGE)
// ==========================================

function DashboardView({ 
  user, 
  challenges, 
  startups, 
  pilots, 
  audits, 
  setActiveTab, 
  setShowCreateModal, 
  setShowTourModal,
  setSelectedChallengeId, 
  onInspectChallenge,
  onInspectAudit,
  onExportPdf
}) {
  const activePilot = pilots[0];

  const pipelineData = [
    { stage: "01 Identify", count: challenges.length, color: "#3b82f6" },
    { stage: "02 AI Matched", count: startups.length, color: "#a855f7" },
    { stage: "03 Evaluated", count: 4, color: "#6366f1" },
    { stage: "04 Pilot Live", count: pilots.length, color: "#f59e0b" },
    { stage: "05 Scale Ready", count: 2, color: "#10b981" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Command Center Banner */}
      <div className="card-gov p-6 sm:p-10 bg-gradient-to-r from-[#0b1329] via-[#0f172a] to-[#131f3f] border border-blue-900/40 text-white shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="badge-gov badge-amber text-xs">
                GOVSCALE COMMAND CENTER
              </span>
              <span className="text-xs font-mono text-teal-300 font-extrabold bg-teal-950/90 px-3 py-1 rounded-lg border border-teal-600/80 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                PUBLIC ACCESS • OPEN FOR ALL
              </span>
              <span className="text-xs font-mono text-blue-300 font-extrabold bg-blue-950/90 px-3 py-1 rounded-lg border border-blue-700/80">
                ACTIVE: {user.role.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-emerald-300 font-extrabold bg-emerald-950/90 px-3 py-1 rounded-lg border border-emerald-700/80 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                DPIIT & MSInS VERIFIED
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-display">
              State Innovation Procurement & Open Sandbox Platform
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              Open to all citizens, startups, researchers, and government departments. 
              Review live sandbox telemetry, audit cryptographic proofs, explore challenges, or propose citizen innovations.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button 
              onClick={setShowCreateModal}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Challenge</span>
            </button>

            <button 
              onClick={() => setActiveTab('match')}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Launch AI Matchmaker</span>
            </button>

            <button 
              onClick={setShowTourModal}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm border border-slate-700 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Interactive Tour</span>
            </button>

            <button 
              onClick={onExportPdf}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>DPC Dossier (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard 
          label="Active Challenges" 
          val={challenges.length} 
          trend="+3 This Month"
          sub="Departmental RFPs" 
          icon={Building2} 
          color="text-blue-400 bg-blue-950/90 border border-blue-700/60" 
          onClick={() => setActiveTab('challenges')} 
        />
        <KpiCard 
          label="DPIIT Startups" 
          val={startups.length} 
          trend="100% Verified"
          sub="AI Match Compatible" 
          icon={Cpu} 
          color="text-purple-400 bg-purple-950/90 border border-purple-700/60" 
          onClick={() => setActiveTab('match')} 
        />
        <KpiCard 
          label="Live Sandboxes" 
          val={pilots.length} 
          trend="Active 90-Day Feeds"
          sub="Field Pilot Trials" 
          icon={Activity} 
          color="text-amber-400 bg-amber-950/90 border border-amber-700/60" 
          onClick={() => setActiveTab('pilots')} 
        />
        <KpiCard 
          label="Evidence Ready" 
          val="2" 
          trend="Rule 149 Direct Award"
          sub="Approved DPC Dossiers" 
          icon={ShieldCheck} 
          color="text-emerald-400 bg-emerald-950/90 border border-emerald-700/60" 
          onClick={() => setActiveTab('procurement')} 
        />
        <KpiCard 
          label="Scale Districts" 
          val="36" 
          trend="Maharashtra Statewide"
          sub="Deployment Nodes" 
          icon={TrendingUp} 
          color="text-indigo-400 bg-indigo-950/90 border border-indigo-700/60" 
          onClick={() => setActiveTab('scale')} 
        />
      </div>

      {/* 5-Stage Innovation Procurement Pathway */}
      <div className="card-gov p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3.5 gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-400 block">
              End-to-End Governance Pathway
            </span>
            <h3 className="text-lg font-black text-white font-display mt-0.5">
              The 5-Stage Innovation Procurement Pipeline
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-emerald-300 font-extrabold bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-700">
              Rule 149 GFR & MSInS Certified
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          <StageCard 
            step="01" 
            name="Identify" 
            desc="Departmental Problem RFP & Sandbox Allocation" 
            status="Active (6)" 
            color="border-blue-700/70 bg-blue-950/40 text-blue-300" 
            onClick={() => setActiveTab('challenges')} 
          />
          <StageCard 
            step="02" 
            name="Match & Evaluate" 
            desc="AI Vector Scoring & 6-Dimensional Matrix" 
            status="Active (8)" 
            color="border-purple-700/70 bg-purple-950/40 text-purple-300" 
            onClick={() => setActiveTab('match')} 
          />
          <StageCard 
            step="03" 
            name="Sandbox Pilot" 
            desc="60-90 Day Field Trial & Telemetry Feeds" 
            status="Live (4)" 
            color="border-amber-700/70 bg-amber-950/40 text-amber-300" 
            onClick={() => setActiveTab('pilots')} 
          />
          <StageCard 
            step="04" 
            name="Procure" 
            desc="DPC Evidence Dossier & Direct Commercial Award" 
            status="Ready (2)" 
            color="border-emerald-700/70 bg-emerald-950/40 text-emerald-300" 
            onClick={() => setActiveTab('procurement')} 
          />
          <StageCard 
            step="05" 
            name="Scale" 
            desc="Statewide 36-District Commercial Rollout" 
            status="Planned" 
            color="border-indigo-700/70 bg-indigo-950/40 text-indigo-300" 
            onClick={() => setActiveTab('scale')} 
          />
        </div>
      </div>

      {/* Analytics Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Funnel Chart */}
        <div className="card-gov p-7 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Pipeline Stage Progression</span>
              <h3 className="text-lg font-black text-white font-display">Innovation Procurement Pipeline Funnel</h3>
            </div>
            <span className="text-xs font-mono text-blue-300 font-extrabold bg-blue-950 px-3 py-1 rounded-lg border border-blue-700">
              Active Statewide
            </span>
          </div>

          <div className="h-68 w-full py-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={pipelineData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={12} fontWeight={700} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} fontWeight={700} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#3b82f6', borderRadius: '12px', fontSize: '12px', color: '#fff', fontWeight: 'bold' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800 font-medium">
            <span>Aggregated across Health, PWD, Water, Forest, and Energy departments</span>
            <button onClick={() => setActiveTab('challenges')} className="text-blue-400 hover:text-blue-300 font-black flex items-center">
              Explore All Challenges <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Live Pilot Telemetry Spotlight */}
        <div className="card-gov p-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="badge-gov badge-emerald text-[10px]">LIVE SANDBOX TELEMETRY</span>
              <span className="text-xs font-mono text-amber-400 font-black">Day 48 / 90</span>
            </div>
            <h3 className="text-lg font-black text-white font-display">{activePilot.name}</h3>
            <p className="text-xs text-slate-300 font-medium line-clamp-2">{activePilot.location}</p>
          </div>

          {/* Quick Metrics */}
          <div className="space-y-3 py-2">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Patients Screened</span>
              <span className="font-mono font-black text-white text-lg">{activePilot.patientsScreened.toLocaleString()}</span>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Clinical Accuracy</span>
              <span className="font-mono font-black text-emerald-400 text-lg">{activePilot.accuracyRate}</span>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Triage Time Saved</span>
              <span className="font-mono font-black text-blue-400 text-lg">{activePilot.triageTimeSaved}</span>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('pilots')}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-slate-700 flex items-center justify-center space-x-2"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Open Telemetry Console</span>
          </button>
        </div>

      </div>

      {/* Active Challenges Table */}
      <div className="card-gov p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3.5 gap-2">
          <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Current Procurement Pipeline</span>
            <h3 className="text-lg font-black text-white flex items-center space-x-2 font-display">
              <Building2 className="w-5 h-5 text-blue-500" />
              <span>Active Departmental Challenges & RFPs</span>
            </h3>
          </div>
          <button 
            onClick={() => setActiveTab('challenges')} 
            className="text-xs font-black text-blue-400 hover:text-blue-300 flex items-center"
          >
            View Marketplace ({challenges.length}) <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-950 text-slate-300 font-black border-b border-slate-800 uppercase text-xs tracking-wider">
                <th className="p-4">Challenge Title & ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Budget Allocation</th>
                <th className="p-4">Current Stage</th>
                <th className="p-4 text-center">Applicants</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {challenges.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div className="hover:text-blue-400 cursor-pointer font-extrabold text-sm" onClick={() => onInspectChallenge(item)}>
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{item.id}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-200">{item.department}</td>
                  <td className="p-4 font-mono font-black text-blue-400 text-sm">{item.budget}</td>
                  <td className="p-4">
                    <span className={`badge-gov ${
                      item.stage.includes('Pilot') ? 'badge-amber' : 
                      item.stage.includes('Scale') ? 'badge-emerald' : 
                      item.stage.includes('Dossier') ? 'badge-blue' : 'badge-purple'
                    } text-[11px]`}>
                      {item.stage}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-extrabold">{item.applicantsCount} Startups</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => { 
                          setSelectedChallengeId(item.id); 
                          setActiveTab('match'); 
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-black text-xs border border-amber-500/40 flex items-center space-x-1"
                      >
                        <Cpu className="w-3.5 h-3.5 text-amber-400" />
                        <span>AI Match</span>
                      </button>
                      <button 
                        onClick={() => onInspectChallenge(item)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs border border-slate-700"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Cryptographic Audit Stream */}
      <div className="card-gov p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center space-x-2.5">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Tamper-Proof Ledger</span>
              <h3 className="text-lg font-black text-white font-display">Live Cryptographic Audit Trail</h3>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('audit')} 
            className="text-xs font-black text-emerald-400 hover:text-emerald-300 flex items-center"
          >
            Full Ledger ({audits.length}) <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="space-y-3">
          {audits.slice(0, 3).map(audit => (
            <div 
              key={audit.id}
              onClick={() => onInspectAudit(audit)}
              className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="badge-gov badge-chain text-[10px]">{audit.action}</span>
                  <span className="text-xs text-slate-400 font-mono font-bold">{audit.timestamp}</span>
                </div>
                <p className="text-slate-200 font-medium text-xs">{audit.details}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                <span className="text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-700/50 font-black">
                  {audit.hash.slice(0, 18)}...
                </span>
                <button className="p-1.5 text-slate-400 hover:text-white">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function KpiCard({ label, val, trend, sub, icon: Icon, color, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="card-gov p-5 cursor-pointer space-y-2.5 hover:border-blue-500 hover:scale-[1.02] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase text-slate-400 tracking-wider">{label}</span>
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">{val}</div>
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-emerald-400">{trend}</span>
        <span className="text-slate-400">{sub}</span>
      </div>
    </div>
  );
}

function StageCard({ step, name, desc, status, color, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className={`p-4 rounded-2xl border ${color} cursor-pointer hover:scale-105 transition-all space-y-1.5 shadow-md`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-black opacity-90">STAGE {step}</span>
        <span className="text-[10px] font-black uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-md">
          {status}
        </span>
      </div>
      <div className="font-black text-sm text-white font-display">{name}</div>
      <p className="text-xs leading-snug text-slate-200 font-medium">{desc}</p>
    </div>
  );
}

// ==========================================
// 2. CHALLENGES VIEW
// ==========================================

function ChallengesView({ challenges, setActiveTab, setSelectedChallengeId, setShowCreateModal, onInspectChallenge }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filtered = challenges.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchDept = selectedDept === 'ALL' || c.department === selectedDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="card-gov p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-blue text-xs">CHALLENGE MARKETPLACE</span>
            <span className="text-xs font-mono text-blue-300 font-bold">Open for DPIIT Startups</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">Government Challenges & Departmental RFPs</h2>
          <p className="text-sm text-slate-300 font-medium">Browse verified municipal & state problem statements with dedicated sandbox trial allocations.</p>
        </div>
        <button 
          onClick={setShowCreateModal} 
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Challenge</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card-gov p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title, keyword, tech tag (#Healthcare AI, #IoT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500"
          />
        </div>
        <select 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)} 
          className="text-xs font-black border border-slate-700 rounded-xl p-3 bg-slate-950 text-white"
        >
          <option value="ALL">All State Departments</option>
          <option value="Public Health Department">Public Health Department</option>
          <option value="Public Works Department (PWD)">Public Works Department (PWD)</option>
          <option value="Water Resources Department">Water Resources Department</option>
          <option value="Environment & Forest Department">Environment & Forest Department</option>
          <option value="Energy & Renewable Department (MAHADISCOM)">Energy & Renewable Department</option>
          <option value="General Administration Dept (Mantralaya)">General Administration Dept</option>
        </select>
      </div>

      {/* Grid of Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="card-gov p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge-gov badge-blue text-xs truncate max-w-[190px]">{item.department}</span>
                <span className="badge-gov badge-amber text-xs">{item.stage}</span>
              </div>
              <h3 
                className="font-black text-lg text-white hover:text-blue-400 cursor-pointer leading-snug font-display"
                onClick={() => onInspectChallenge(item)}
              >
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 font-medium line-clamp-3 leading-relaxed">{item.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-bold">Budget Range:</span>
                <span className="font-black text-blue-400 text-sm">{item.budget}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-slate-950 text-slate-200 px-2.5 py-1 rounded-md border border-slate-800 font-mono font-bold">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button 
                  onClick={() => { 
                    setSelectedChallengeId(item.id); 
                    setActiveTab('match'); 
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Cpu className="w-4 h-4 text-slate-950" />
                  <span>Launch AI Match</span>
                </button>
                <button 
                  onClick={() => onInspectChallenge(item)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs border border-slate-700"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. AI MATCHMAKER VIEW
// ==========================================

function AIMatchmakerView({ 
  challenge, 
  startup, 
  startups, 
  challenges, 
  setSelectedChallengeId, 
  setSelectedStartupId, 
  setActiveTab, 
  showNotify 
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [matchProgress, setMatchProgress] = useState(100);

  const radarData = [
    { subject: 'Clinical/Domain Fit', startup: startup.score || 94, threshold: 85 },
    { subject: 'Technical Feasibility', startup: 96, threshold: 80 },
    { subject: 'DPDP Security', startup: 98, threshold: 90 },
    { subject: 'Scalability', startup: 92, threshold: 75 },
    { subject: 'Team Capacity', startup: 90, threshold: 70 },
    { subject: 'Cost Efficiency', startup: 95, threshold: 80 }
  ];

  const handleRunScan = () => {
    setIsScanning(true);
    setMatchProgress(0);
    const interval = setInterval(() => {
      setMatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          showNotify(`Semantic AI scan complete! Top match: ${startup.name} (${startup.score}%)`, "success");
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="card-gov p-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-purple text-xs">AI SEMANTIC MATCHMAKER</span>
            <span className="text-xs font-mono text-purple-300 font-bold">GovTech Semantic Vector Model v3.2</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Matching Startup for: {challenge.title}
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            Scanning DPIIT-verified startups against RFP specs and SLA thresholds.
          </p>
        </div>

        <button 
          onClick={handleRunScan}
          disabled={isScanning}
          className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm shadow-xl flex items-center space-x-2 shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? `Vector Scanning (${matchProgress}%)` : "Re-Run Semantic AI Scan"}</span>
        </button>
      </div>

      {/* Selector Strip */}
      <div className="card-gov p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs text-slate-300 font-black whitespace-nowrap">Target Challenge:</span>
          <select 
            value={challenge.id}
            onChange={(e) => setSelectedChallengeId(e.target.value)}
            className="w-full sm:w-80 text-xs font-black bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
          >
            {challenges.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs text-slate-300 font-black whitespace-nowrap">Evaluated Startup:</span>
          <select 
            value={startup.id}
            onChange={(e) => setSelectedStartupId(e.target.value)}
            className="w-full sm:w-72 text-xs font-black bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
          >
            {startups.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.score}%)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Match Spotlight */}
      <div className="card-gov p-7 border-l-4 border-l-emerald-500 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="badge-gov badge-emerald text-xs">#1 RECOMMENDED STARTUP</span>
              <span className="text-xs font-mono text-slate-300 font-bold">{startup.dpiitId}</span>
              <span className="text-xs text-emerald-400 font-black">DPIIT Verified</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">{startup.name}</h3>
            <p className="text-xs text-slate-200 font-medium max-w-3xl leading-relaxed">{startup.description}</p>
          </div>

          <div className="flex items-center space-x-3.5 shrink-0">
            <div className="text-center bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
              <span className="text-3xl font-black text-emerald-400 font-mono">{startup.score}%</span>
              <span className="text-[10px] text-slate-400 uppercase font-black block">Match Score</span>
            </div>
            <button 
              onClick={() => {
                showNotify(`Shortlisted ${startup.name} for 6-Dimensional Evaluation Gate!`, "success");
                setActiveTab('evaluations');
              }}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 flex items-center space-x-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Shortlist for Evaluation</span>
            </button>
          </div>
        </div>

        {/* Breakdown Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Clinical Accuracy</span>
            <span className="text-emerald-400 font-black text-base">{startup.kpis?.accuracy || "96.4%"}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Inference Latency</span>
            <span className="text-blue-400 font-black text-base">{startup.kpis?.latency || "7.8 mins"}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Compliance Status</span>
            <span className="text-emerald-400 font-black text-base">DPDP Certified</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Engineering Team</span>
            <span className="text-purple-400 font-black text-base">{startup.teamSize} Specialists</span>
          </div>
        </div>
      </div>

      {/* Radar Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-gov p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white font-display">6-Dimensional Compatibility Radar</h3>
            <span className="text-xs text-slate-300 font-mono font-bold">Startup vs Minimum Threshold</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" fontSize={11} fontWeight={700} />
                <PolarRadiusAxis stroke="#64748b" angle={30} domain={[0, 100]} />
                <Radar name="Startup Score" dataKey="startup" stroke="#10b981" fill="#10b981" fillOpacity={0.45} />
                <Radar name="Threshold" dataKey="threshold" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#3b82f6', borderRadius: '12px', fontSize: '12px', color: '#fff', fontWeight: 'bold' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certifications Box */}
        <div className="card-gov p-7 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white font-display">Statutory & Technical Compliance</h3>
              <span className="badge-gov badge-emerald text-xs">DPIIT AUDITED</span>
            </div>
            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-xs">ISO 13485 Medical Software Standard</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs font-black">VERIFIED</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-xs">Digital Personal Data Protection (DPDP) Act</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs font-black">COMPLIANT</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-xs">CERT-In Empaneled Cybersecurity Audit</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs font-black">LEVEL 4 SECURE</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-950/50 rounded-xl border border-blue-700/60 text-xs text-blue-200 font-medium">
            💡 <strong>GovTech Evaluator Recommendation:</strong> Top performing candidate out of 14 applicants. Qualified for direct sandbox deployment under Maharashtra State Innovation Policy.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. EVALUATIONS VIEW
// ==========================================

function EvaluationsView({ 
  challenge, 
  startup, 
  scores, 
  setScores, 
  comments, 
  setComments, 
  setActiveTab, 
  showNotify,
  setAudits,
  setChallenges 
}) {
  const avgScore = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
  );

  const handleScoreChange = (key, val) => {
    setScores(prev => ({ ...prev, [key]: Number(val) }));
  };

  const handleSaveScorecard = () => {
    const newAudit = {
      id: `aud_${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString() + " IST",
      action: "EVALUATION_SCORECARD_SIGNED",
      actor: "Dr. Ananya Kulkarni (GovTech Evaluator Panel)",
      details: `Evaluation scorecard (${avgScore}/100) signed for ${startup.name} on challenge ${challenge.id}.`,
      hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      verified: true,
      blockNumber: 148293
    };
    setAudits(prev => [newAudit, ...prev]);
    showNotify("Scorecard signed with SHA-256 digital signature and recorded on ledger!", "success");
  };

  const handleApprovePilot = () => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challenge.id) {
        return { ...c, stage: "Pilot Running" };
      }
      return c;
    }));

    handleSaveScorecard();
    showNotify("Candidate APPROVED for 90-Day Live Sandbox Pilot! Advancing to telemetry...", "success");
    setActiveTab('pilots');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-gov p-8 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-blue text-xs">EVALUATION GATEWAY</span>
            <span className="text-xs font-mono text-blue-300 font-bold">Panel Chair: Dr. Ananya Kulkarni (IIT Bombay)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            6-Dimensional Subject Matter Evaluation Matrix
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            Application: {startup.name} ({startup.dpiitId}) for {challenge.title}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button 
            onClick={handleSaveScorecard}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-slate-700 flex items-center space-x-2"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Sign on Ledger</span>
          </button>

          <button 
            onClick={handleApprovePilot}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve for Pilot (90 Days)</span>
          </button>
        </div>
      </div>

      {/* Aggregate Score Indicator */}
      <div className="card-gov p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-mono font-black text-3xl text-white shadow-xl">
            {avgScore}
          </div>
          <div>
            <h3 className="text-lg font-black text-white font-display">Overall Composite Evaluation Score</h3>
            <p className="text-xs text-slate-300 font-medium">Exceeds the 80% statutory qualification threshold for state sandbox trials.</p>
          </div>
        </div>

        <span className="badge-gov badge-emerald text-xs font-black">
          STATUS: QUALIFIED FOR SANDBOX
        </span>
      </div>

      {/* 6 Interactive Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ScoreSliderCard 
          title="1. Domain & Clinical Fit" 
          value={scores.clinical} 
          onChange={(v) => handleScoreChange('clinical', v)}
          desc="Alignment with rural district hospital workflows and pathology detection." 
        />
        <ScoreSliderCard 
          title="2. Technical Feasibility" 
          value={scores.feasibility} 
          onChange={(v) => handleScoreChange('feasibility', v)}
          desc="Edge model latency <8 min/case on standard CPU hardware." 
        />
        <ScoreSliderCard 
          title="3. DPDP & Cybersecurity" 
          value={scores.security} 
          onChange={(v) => handleScoreChange('security', v)}
          desc="On-premise zero-cloud patient data anonymization pipeline." 
        />
        <ScoreSliderCard 
          title="4. Scalability Potential" 
          value={scores.scalability} 
          onChange={(v) => handleScoreChange('scalability', v)}
          desc="Multi-district Kubernetes architecture across 36 district hubs." 
        />
        <ScoreSliderCard 
          title="5. Team Capability" 
          value={scores.team} 
          onChange={(v) => handleScoreChange('team', v)}
          desc="28 core engineers + 4 senior medical advisory board members." 
        />
        <ScoreSliderCard 
          title="6. Cost Efficiency" 
          value={scores.cost} 
          onChange={(v) => handleScoreChange('cost', v)}
          desc="70% lower TCO compared to legacy multinational software imports." 
        />
      </div>

      {/* Evaluator Notes Textarea */}
      <div className="card-gov p-7 space-y-3.5">
        <h3 className="text-base font-black text-white font-display">GovTech Panel Evaluator Sign-Off Notes</h3>
        <textarea 
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          className="w-full text-xs font-mono p-4 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed font-medium"
        />
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400 font-mono font-bold">Changes auto-synced with State Evaluation Protocol 4.1</span>
          <button 
            onClick={handleSaveScorecard}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-md"
          >
            Save Notes & Update Scorecard
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreSliderCard({ title, value, onChange, desc }) {
  return (
    <div className="card-gov p-6 space-y-3.5 border-l-4 border-l-emerald-500">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase text-slate-300">{title}</span>
        <span className="font-mono font-black text-emerald-400 text-base">{value} / 100</span>
      </div>
      <input 
        type="range" 
        min={50} 
        max={100} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg" 
      />
      <p className="text-xs text-slate-300 font-medium leading-snug">{desc}</p>
    </div>
  );
}

// ==========================================
// 5. PILOTS & TELEMETRY VIEW
// ==========================================

function PilotsView({ 
  pilot, 
  challenge, 
  startup, 
  setActiveTab, 
  showNotify,
  onSimulateTick,
  onExportCsv 
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-gov p-8 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-amber text-xs">LIVE SANDBOX TELEMETRY</span>
            <span className="text-xs font-mono text-amber-300 font-bold">Continuous 90-Day Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">{pilot.name}</h2>
          <p className="text-sm text-slate-300 font-medium">
            Location: {pilot.location} • Active Startup: {startup.name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button 
            onClick={onSimulateTick}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4 text-slate-950" />
            <span>Simulate Live Telemetry Tick</span>
          </button>

          <button 
            onClick={onExportCsv}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-slate-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Feed</span>
          </button>

          <button 
            onClick={() => {
              showNotify("Pilot evidence validated! Generating DPC synthesis...", "success");
              setActiveTab('procurement');
            }}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Generate DPC Dossier</span>
          </button>
        </div>
      </div>

      {/* Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card-gov p-6 space-y-2">
          <span className="text-xs font-black uppercase text-slate-400 block">Total Patients Screened</span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">{pilot.patientsScreened.toLocaleString()}</div>
          <span className="text-xs text-emerald-400 font-bold block">+24 in last 15 mins</span>
        </div>
        <div className="card-gov p-6 space-y-2">
          <span className="text-xs font-black uppercase text-slate-400 block">Verified Clinical Accuracy</span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">{pilot.accuracyRate}</div>
          <span className="text-xs text-slate-300 font-medium block">Audited by Senior Radiologist</span>
        </div>
        <div className="card-gov p-6 space-y-2">
          <span className="text-xs font-black uppercase text-slate-400 block">Average Triage Time Saved</span>
          <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">{pilot.triageTimeSaved}</div>
          <span className="text-xs text-blue-300 font-bold block">4.2x faster emergency triage</span>
        </div>
        <div className="card-gov p-6 space-y-2">
          <span className="text-xs font-black uppercase text-slate-400 block">Trial Progress (Day 48)</span>
          <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">{pilot.progress}%</div>
          <span className="text-xs text-amber-400 font-bold block">On track for completion</span>
        </div>
      </div>

      {/* Telemetry Stream Chart */}
      <div className="card-gov p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Real-Time Ingestion Feed</span>
            <h3 className="text-lg font-black text-white font-display">Daily Patient Diagnostic Throughput</h3>
          </div>
          <span className="badge-gov badge-chain text-xs">LIVE TELEMETRY NODE</span>
        </div>

        <div className="h-68 w-full py-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={pilot.telemetryStream}>
              <defs>
                <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} fontWeight={700} />
              <YAxis stroke="#94a3b8" fontSize={12} fontWeight={700} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', borderRadius: '12px', fontSize: '12px', color: '#fff', fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="patients" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#telemetryGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestone Matrix */}
      <div className="card-gov p-7 space-y-4">
        <h3 className="text-lg font-black text-white font-display">Contractual Milestone & KPI Verification Matrix</h3>
        <div className="space-y-3">
          {pilot.kpis.map((k, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs gap-2">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-extrabold text-white text-sm">{k.name}</span>
              </div>
              <div className="flex items-center space-x-4 font-mono">
                <span className="text-slate-400 font-bold">Target: {k.target}</span>
                <span className="font-black text-emerald-300 bg-emerald-950 px-3 py-1 rounded-md border border-emerald-700/60">
                  Achieved: {k.current}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. PROCUREMENT EVIDENCE VIEW
// ==========================================

function ProcurementView({ 
  pilot, 
  challenge, 
  startup, 
  user, 
  setActiveTab, 
  showNotify,
  onExportPdf,
  setAudits 
}) {
  const handleSubmitDpc = () => {
    const newAudit = {
      id: `aud_${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString() + " IST",
      action: "DPC_SUBMISSION_FINALIZED",
      actor: `${user.name} (${user.title})`,
      details: `Official DPC dossier submitted for statewide rollout across 36 districts of Maharashtra.`,
      hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      verified: true,
      blockNumber: 148294
    };
    setAudits(prev => [newAudit, ...prev]);
    showNotify("Dossier submitted to State Procurement Committee! Transitioning to scale...", "success");
    setActiveTab('scale');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="card-gov p-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-emerald text-xs">EVIDENCE-BACKED READINESS</span>
            <span className="text-xs font-mono text-emerald-300 font-bold">Rule 149 GFR Direct Award Eligible</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            DPC Innovation Procurement Synthesis
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            Official evidence package for {startup.name} on {challenge.title}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button 
            onClick={onExportPdf}
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-xl shadow-blue-600/30 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Official DPC Dossier (PDF)</span>
          </button>

          <button 
            onClick={handleSubmitDpc}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 flex items-center space-x-2"
          >
            <Award className="w-4 h-4" />
            <span>Submit to DPC Committee</span>
          </button>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-gov p-7 space-y-4">
          <h3 className="font-black text-white text-lg flex items-center space-x-2 font-display">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Verified Pilot Trial Audit Summary</span>
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-200 font-medium">
            <li className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 leading-relaxed">
              ✅ <strong className="text-white">14,280 Real Patients Screened:</strong> Zero critical safety misdiagnoses during 90-day clinical sandbox.
            </li>
            <li className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 leading-relaxed">
              ✅ <strong className="text-white">₹1.24 Cr Estimated Cost Savings:</strong> Significant reduction in emergency patient transport and delayed interventions.
            </li>
            <li className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 leading-relaxed">
              ✅ <strong className="text-white">DPDP Act 2023 Compliant:</strong> Certified on-premise anonymization architecture audited by CERT-In empaneled auditor.
            </li>
            <li className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 leading-relaxed">
              ✅ <strong className="text-white">Rule 149 GFR Exemption:</strong> Certified evidence bundle fulfills statutory requirements for direct departmental commercial scale.
            </li>
          </ul>
        </div>

        <div className="card-gov p-7 space-y-4">
          <h3 className="font-black text-white text-lg flex items-center space-x-2 font-display">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Legal & Procurement Artifacts</span>
          </h3>
          <div className="space-y-3 text-xs font-bold">
            <div 
              onClick={onExportPdf}
              className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500 cursor-pointer flex justify-between items-center transition-all"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="text-white font-extrabold text-sm">DPC_Procurement_Synthesis_Dossier.pdf</span>
              </div>
              <span className="text-xs font-mono bg-blue-950 text-blue-300 px-2.5 py-1 rounded-md border border-blue-700">
                Download PDF
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-extrabold text-sm">Clinical_Sandbox_Audit_Certificate.pdf</span>
              </div>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-700">
                SHA-256 Verified
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span className="text-white font-extrabold text-sm">Cost_Benefit_Impact_Matrix.pdf</span>
              </div>
              <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2.5 py-1 rounded-md border border-amber-700">
                Validated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. SCALE READINESS VIEW
// ==========================================

function ScaleView({ districts, setActiveTab, showNotify }) {
  const [filter, setFilter] = useState('ALL');

  const filteredDistricts = districts.filter(d => {
    if (filter === 'ALL') return true;
    return d.status === filter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="card-gov p-8 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-purple text-xs">STATEWIDE EXPANSION</span>
            <span className="text-xs font-mono text-purple-300 font-bold">Maharashtra 36 Districts Rollout</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Statewide Deployment & Scale Readiness
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            Monitoring node rollout status across all 36 district hospital networks.
          </p>
        </div>

        <button 
          onClick={() => {
            showNotify("Statewide expansion batch scheduled across 8 new districts!", "success");
          }}
          className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-xl shadow-purple-600/30 flex items-center space-x-2 shrink-0"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trigger Next District Batch</span>
        </button>
      </div>

      {/* Aggregate Impact Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-gov p-6 text-center space-y-1">
          <span className="text-xs font-black text-slate-400 uppercase">Target Districts</span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">36</div>
          <span className="text-xs text-purple-400 font-bold">Maharashtra Statewide</span>
        </div>
        <div className="card-gov p-6 text-center space-y-1">
          <span className="text-xs font-black text-slate-400 uppercase">Hospital Nodes</span>
          <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">148</div>
          <span className="text-xs text-slate-300 font-medium">Target Installations</span>
        </div>
        <div className="card-gov p-6 text-center space-y-1">
          <span className="text-xs font-black text-slate-400 uppercase">Annual Beneficiaries</span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">4.2M</div>
          <span className="text-xs text-emerald-400 font-bold">Patients Served</span>
        </div>
        <div className="card-gov p-6 text-center space-y-1">
          <span className="text-xs font-black text-slate-400 uppercase">Estimated Impact</span>
          <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">₹48 Cr</div>
          <span className="text-xs text-amber-400 font-bold">Statewide Cost Savings</span>
        </div>
      </div>

      {/* District Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'ALL' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
        >
          All Districts (12 Active Hubs)
        </button>
        <button 
          onClick={() => setFilter('PILOT_ACTIVE')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'PILOT_ACTIVE' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
        >
          Pilot Active
        </button>
        <button 
          onClick={() => setFilter('ROLLOUT_READY')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'ROLLOUT_READY' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
        >
          Rollout Ready
        </button>
        <button 
          onClick={() => setFilter('PROCUREMENT_APPROVED')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'PROCUREMENT_APPROVED' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
        >
          Procurement Approved
        </button>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDistricts.map((d, i) => (
          <div key={i} className="card-gov p-5 space-y-2.5 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-black text-white text-base font-display">{d.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 font-bold">Status:</span>
              <span className="font-black text-slate-200">{d.status}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 font-bold">Hospital Nodes:</span>
              <span className="font-black text-blue-400">{d.nodes}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 font-bold">Beneficiaries:</span>
              <span className="font-black text-emerald-400">{d.beneficiaries}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. BLOCKCHAIN AUDIT VIEW
// ==========================================

function AuditView({ audits, onInspectAudit, showNotify }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = audits.filter(a => 
    a.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-gov p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="badge-gov badge-emerald text-xs">IMMUTABLE BLOCKCHAIN LEDGER</span>
            <span className="text-xs font-mono text-emerald-300 font-bold">MSInS Consensus Node</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Cryptographic Audit Trail & Governance Proofs
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            SHA-256 hash chaining ensuring tamper-evident procurement and telemetry history.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-emerald-950/90 px-4 py-2 rounded-xl border border-emerald-700 shrink-0">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 font-black">Ledger Height: #148,291</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="card-gov p-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search ledger by hash, actor, action code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Audit List */}
      <div className="space-y-3 font-mono text-xs">
        {filtered.map(item => (
          <div 
            key={item.id} 
            onClick={() => onInspectAudit(item)}
            className="card-gov p-5 hover:border-emerald-500/50 cursor-pointer transition-all space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5">
              <span className="text-amber-400 font-black flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                {item.action}
              </span>
              <span className="text-slate-400 font-bold">{item.timestamp}</span>
            </div>
            <p className="text-slate-200 font-sans text-xs font-medium">{item.details}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2.5 border-t border-slate-800 text-xs text-slate-400 gap-1">
              <span>Signatory: <strong className="text-white font-sans">{item.actor}</strong></span>
              <span className="text-emerald-400 font-black break-all">Hash: {item.hash}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 9. CREATE CHALLENGE MODAL
// ==========================================

function CreateChallengeModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Public Health Department');
  const [budget, setBudget] = useState('₹2.0 Cr - ₹4.0 Cr');
  const [district, setDistrict] = useState('Pune District Hospital');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onCreate({
      id: `chg_mh_${Math.floor(100 + Math.random() * 900)}`,
      title,
      department,
      state: "Maharashtra",
      district,
      budget,
      stage: "RFP Open",
      deadline: "2026-12-15",
      description,
      tags: ["GovTech", "Innovation", "Maharashtra", "DPIIT FastTrack"],
      applicantsCount: 0,
      shortlistedCount: 0,
      sla: "99.9% Uptime | <15 min Response Time",
      beneficiaries: "Statewide Citizens"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 text-white w-full max-w-xl rounded-3xl p-7 space-y-5 shadow-2xl border border-slate-700">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <PlusCircle className="w-6 h-6 text-blue-400" />
            <h3 className="font-black text-white text-lg font-display">Post Departmental Challenge RFP</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-black text-slate-200 block mb-1.5 text-xs uppercase">Problem Title</label>
            <input 
              type="text" 
              placeholder="e.g. AI-Powered Smart Ambulance Routing"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
              className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="font-black text-slate-200 block mb-1.5 text-xs uppercase">Department</label>
              <select 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)} 
                className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-black"
              >
                <option value="Public Health Department">Public Health Department</option>
                <option value="Public Works Department (PWD)">Public Works Department (PWD)</option>
                <option value="Water Resources Department">Water Resources Department</option>
                <option value="Environment & Forest Department">Environment & Forest Department</option>
                <option value="Energy & Renewable Department (MAHADISCOM)">Energy & Renewable Department</option>
                <option value="General Administration Dept (Mantralaya)">General Administration Dept</option>
              </select>
            </div>

            <div>
              <label className="font-black text-slate-200 block mb-1.5 text-xs uppercase">Sandbox Budget Range</label>
              <input 
                type="text" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-black text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-black text-slate-200 block mb-1.5 text-xs uppercase">Deployment Location / District</label>
            <input 
              type="text" 
              placeholder="e.g. Pune / Mumbai / Nashik"
              value={district} 
              onChange={(e) => setDistrict(e.target.value)} 
              className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-xs"
            />
          </div>

          <div>
            <label className="font-black text-slate-200 block mb-1.5 text-xs uppercase">Problem Statement & Desired Innovation Outcome</label>
            <textarea 
              rows={4}
              placeholder="Detailed description of challenges, SLA expectations, and desired metrics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs leading-relaxed font-medium"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/30"
            >
              Publish Challenge RFP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
