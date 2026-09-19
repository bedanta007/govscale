import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Cpu, Activity, TrendingUp, ChevronRight, PlusCircle, 
  Compass, Award, ShieldCheck, ArrowRight, CheckCircle2, Database,
  FileText, LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProcurement } from '../../context/ProcurementContext';
import DemoTourModal from '../../components/DemoTourModal';
import ChallengeDetailModal from '../../components/ChallengeDetailModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { tenders, pilots } = useProcurement();

  const [inspectingChallenge, setInspectingChallenge] = useState(null);
  const [showTourModal, setShowTourModal] = useState(false);

  const activePilot = pilots[0];

  const stages = [
    { step: "01", name: "Identify", desc: "Departmental Problem RFP", path: "/tenders", count: tenders.length },
    { step: "02", name: "AI Match", desc: "Vector Compatibility Scoring", path: "/tenders", count: 8 },
    { step: "03", name: "Sandbox Pilot", desc: "90-Day Field Trial Telemetry", path: "/pilots", count: pilots.length },
    { step: "04", name: "Procure", desc: "DPC Evidence Dossier", path: "/contracts", count: 2 },
    { step: "05", name: "Scale", desc: "36 Districts Commercial Rollout", path: "/contracts", count: 36 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* Unified Global Header - Top State Bar */}
      <div className="w-full bg-[#0f172a] text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center text-slate-200 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-2" />
              Government of Maharashtra
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium">Smart India Hackathon 2026 (SIH26136)</span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <button 
              onClick={() => setShowTourModal(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center transition-colors"
            >
              <Compass className="w-3.5 h-3.5 mr-1" /> 5-Stage Demo Tour
            </button>
            <span className="text-slate-600">|</span>
            {currentUser ? (
              <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 font-semibold">
                Go to Dashboard →
              </Link>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-300 font-semibold">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Unified Global Header - Navigation Bar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs font-bold text-lg group-hover:bg-blue-700 transition-colors">
                G
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg tracking-tight text-slate-900 font-display">GovScale</span>
                  <span className="text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded">
                    SIH26136
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Smart Public Procurement for Startup Innovation
                </span>
              </div>
            </Link>

            {/* Quick Links */}
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-semibold">
              <Link to="/tenders" className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                Public Tenders
              </Link>
              <Link to="/pilots" className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                Live Pilots
              </Link>
              <Link to="/audit" className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                Audit Ledger
              </Link>

              {currentUser ? (
                <Link 
                  to="/dashboard"
                  className="ml-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="ml-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Portal Login</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Welcome Hero */}
        <div className="card-gov p-6 sm:p-8 bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="badge-gov badge-blue text-xs">Public Innovation Portal</span>
              <span className="badge-gov badge-emerald text-xs">Rule 149 GFR FastTrack</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
              Public Procurement & Startup Sandbox Portal
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              A state framework connecting public sector departments with DPIIT-registered startups for transparent problem discovery, 
              90-day sandbox pilot trials, and evidence-backed direct commercial procurement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link 
              to="/tenders"
              className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore Tenders</span>
            </Link>

            <Link 
              to="/login"
              className="px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Cpu className="w-4 h-4 text-slate-500" />
              <span>Sign In to Bid</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <div className="card-gov p-5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Active RFPs</span>
              <div className="p-1.5 rounded-lg text-blue-600 bg-blue-50">
                <Building2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">{tenders.length}</div>
            <div className="text-xs text-slate-500">Departmental Challenges</div>
          </div>

          <div className="card-gov p-5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">DPIIT Startups</span>
              <div className="p-1.5 rounded-lg text-purple-600 bg-purple-50">
                <Cpu className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">8</div>
            <div className="text-xs text-slate-500">100% Verified Profiles</div>
          </div>

          <div className="card-gov p-5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Live Sandboxes</span>
              <div className="p-1.5 rounded-lg text-amber-600 bg-amber-50">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">{pilots.length}</div>
            <div className="text-xs text-slate-500">90-Day Field Trials</div>
          </div>

          <div className="card-gov p-5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Scale Districts</span>
              <div className="p-1.5 rounded-lg text-emerald-600 bg-emerald-50">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">36</div>
            <div className="text-xs text-slate-500">Maharashtra Statewide</div>
          </div>
        </div>

        {/* 5-Stage Stepper */}
        <div className="card-gov p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                The 5-Stage Innovation Procurement Pathway
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Rule 149 GFR & Maharashtra State Innovation Policy framework</p>
            </div>
            <button 
              onClick={() => setShowTourModal(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              <Compass className="w-3.5 h-3.5 mr-1 text-amber-500" />
              <span>Interactive Tour</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {stages.map((s) => (
              <Link 
                key={s.step}
                to={s.path}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 transition-all space-y-1 block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-600">STEP {s.step}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {s.count}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-800">{s.name}</div>
                <p className="text-[11px] text-slate-500 leading-tight truncate">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Challenges & Pilot Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Featured Tenders */}
          <div className="card-gov p-6 space-y-4 lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">Featured Departmental RFPs</h3>
                  <p className="text-xs text-slate-500 mt-0.5">High-impact civic problem statements open for bidding</p>
                </div>
                <Link 
                  to="/tenders"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <span>View All ({tenders.length})</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {tenders.slice(0, 3).map(chg => (
                  <div 
                    key={chg.id}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="badge-gov badge-blue text-[10px]">{chg.department}</span>
                        <span className="text-[11px] font-mono text-slate-400">{chg.budget}</span>
                      </div>
                      <Link 
                        to={`/tenders/${chg.id}`}
                        className="font-semibold text-xs text-slate-800 hover:text-blue-600 block"
                      >
                        {chg.title}
                      </Link>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <Link 
                        to={`/tenders/${chg.id}/bid`}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs"
                      >
                        Submit Bid
                      </Link>
                      <Link 
                        to={`/tenders/${chg.id}`}
                        className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs border border-slate-200"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>All challenges verified under Rule 149 GFR Direct Commercial Scale</span>
              <Link 
                to="/tenders" 
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center"
              >
                <span>Browse Full Catalog</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
          </div>

          {/* Active Pilot Sandbox Spotlight */}
          <div className="card-gov p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="badge-gov badge-emerald text-[10px]">Live Field Sandbox</span>
                  <h3 className="text-sm font-bold text-slate-900 font-display mt-1">{activePilot.name}</h3>
                </div>
                <span className="text-xs font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Day 48 / 90
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {activePilot.location}
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Patients Screened</span>
                  <span className="font-mono font-bold text-slate-900">{activePilot.patientsScreened.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Clinical Accuracy</span>
                  <span className="font-mono font-bold text-emerald-700">{activePilot.accuracyRate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Triage Time Saved</span>
                  <span className="font-mono font-bold text-blue-700">{activePilot.triageTimeSaved}</span>
                </div>
              </div>
            </div>

            <Link 
              to="/pilots"
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Live Telemetry Feed</span>
            </Link>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-500 text-xs py-8 border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-bold text-slate-800 text-sm font-display">GovScale</span>
              <span className="badge-gov badge-blue text-[10px]">SIH26136</span>
            </div>
            <p className="text-slate-500 text-xs">
              Smart Public Procurement Framework for Startup Innovation • Government of Maharashtra
            </p>
          </div>

          <div className="flex items-center space-x-5 text-xs font-semibold text-slate-600">
            <Link to="/tenders" className="hover:text-slate-900">Tenders Catalog</Link>
            <Link to="/audit" className="hover:text-slate-900">Blockchain Ledger</Link>
            <Link to="/login" className="hover:text-slate-900">Portal Login</Link>
          </div>
        </div>
      </footer>

      {/* 5-Stage Demo Tour Modal */}
      {showTourModal && (
        <DemoTourModal 
          onClose={() => setShowTourModal(false)}
          onNavigateTab={(tab) => {
            setShowTourModal(false);
            if (tab === 'challenges') navigate('/tenders');
            else if (tab === 'match') navigate('/tenders');
            else if (tab === 'evaluations') navigate('/evaluations');
            else if (tab === 'pilots') navigate('/pilots');
            else if (tab === 'procurement') navigate('/contracts');
            else navigate('/dashboard');
          }}
        />
      )}

      {inspectingChallenge && (
        <ChallengeDetailModal 
          challenge={inspectingChallenge}
          onClose={() => setInspectingChallenge(null)}
          onLaunchMatch={() => {
            setInspectingChallenge(null);
            navigate(`/tenders/${inspectingChallenge.id}/bid`);
          }}
        />
      )}

    </div>
  );
}
