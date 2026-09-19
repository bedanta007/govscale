import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, X, Building2, Cpu, FileText, Activity, ShieldCheck, TrendingUp } from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    id: "challenges",
    title: "Stage 01: Challenge Identification & RFP",
    subtitle: "Departmental Problem Definition",
    icon: Building2,
    color: "from-blue-600 to-indigo-600",
    badgeColor: "badge-blue",
    description: "State government departments (Health, PWD, Water, Energy) formulate high-impact public service challenges with clear SLA thresholds and allocated sandbox trial budgets (₹1.5 Cr - ₹5.0 Cr).",
    highlight: "14 verified state RFPs currently open for DPIIT startups."
  },
  {
    step: 2,
    id: "match",
    title: "Stage 02: AI Semantic Matchmaker",
    subtitle: "Automated Startup Discovery & Vector Scoring",
    icon: Cpu,
    color: "from-purple-600 to-indigo-600",
    badgeColor: "badge-purple",
    description: "GovScale's semantic AI engine compares DPIIT-registered startup technical profiles against government RFP specs using multi-dimensional vector embeddings, generating instant match scores (94%).",
    highlight: "Zero vendor bias with automated ISO & DPIIT certificate verification."
  },
  {
    step: 3,
    id: "evaluations",
    title: "Stage 03: 6-Dimensional Expert Matrix",
    subtitle: "GovTech Panel Evaluation Gate",
    icon: FileText,
    color: "from-slate-800 to-blue-900",
    badgeColor: "badge-blue",
    description: "Independent subject matter evaluators (IIT Bombay, Medical Councils, CERT-In) grade shortlisted startups across 6 objective dimensions: Clinical Fit, Feasibility, DPDP Security, Scalability, Team, and Cost.",
    highlight: "Cryptographically signed scorecards written directly to the state ledger."
  },
  {
    step: 4,
    id: "pilots",
    title: "Stage 04: Live 90-Day Sandbox Telemetry",
    subtitle: "Real-World Field Trials with IoT Telemetry",
    icon: Activity,
    color: "from-amber-600 to-orange-600",
    badgeColor: "badge-amber",
    description: "Startups deploy in controlled municipal environments (e.g. Aundh District Hospital). Real-time telemetry feeds stream patient diagnostics, road scans, or water conservation metrics into tamper-proof Merkle trees.",
    highlight: "14,280 real patient cases screened with 96.4% verified clinical accuracy."
  },
  {
    step: 5,
    id: "procurement",
    title: "Stage 05: Evidence-Backed Commercial Scale",
    subtitle: "DPC Procurement Synthesis & Statewide Rollout",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-700",
    badgeColor: "badge-emerald",
    description: "When trial KPIs are met, GovScale synthesizes a complete Departmental Procurement Committee (DPC) Evidence Dossier, authorizing direct commercial scaling across all 36 Districts under Rule 149 exemption.",
    highlight: "Official downloadable Government Dossier (PDF) with SHA-256 audit proof."
  }
];

export default function DemoTourModal({ onClose, onNavigateTab }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const cur = TOUR_STEPS[currentIdx];
  const Icon = cur.icon;

  const handleNext = () => {
    if (currentIdx < TOUR_STEPS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleJumpToTab = () => {
    onNavigateTab(cur.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${cur.color} text-white relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              STEP {cur.step} OF {TOUR_STEPS.length}
            </span>
            <span className="text-xs text-white/80 font-medium">GovScale Innovation Flow</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">{cur.title}</h3>
              <p className="text-xs text-white/80 font-medium">{cur.subtitle}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full mt-5 overflow-hidden">
            <div 
              className="bg-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            {cur.description}
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">
              {cur.highlight}
            </span>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center space-x-2 py-2">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIdx ? 'w-8 bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors ${
              currentIdx === 0 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleJumpToTab}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 flex items-center space-x-1"
            >
              <span>Explore this Module</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center space-x-1.5"
            >
              <span>{currentIdx === TOUR_STEPS.length - 1 ? "Finish Tour" : "Next Step"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
