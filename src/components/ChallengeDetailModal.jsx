import React from 'react';
import { X, Building2, Cpu, Calendar, ShieldCheck, MapPin, Users, CheckCircle2, FileText, ChevronRight } from 'lucide-react';

export default function ChallengeDetailModal({ challenge, onClose, onLaunchMatch }) {
  if (!challenge) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#0f172a] text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <span className="badge-gov badge-blue text-[11px]">{challenge.department}</span>
            <span className="badge-gov badge-amber text-[11px]">{challenge.stage}</span>
            <span className="text-xs font-mono text-slate-400 ml-2">{challenge.id}</span>
          </div>

          <h3 className="text-xl font-bold text-white leading-snug">
            {challenge.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Target Location: {challenge.district || "Maharashtra Statewide"}</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Sandbox Budget</span>
              <span className="text-sm font-bold text-blue-700 font-mono mt-0.5 block">{challenge.budget}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">RFP Deadline</span>
              <span className="text-sm font-semibold text-slate-800 font-mono mt-0.5 block">{challenge.deadline}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Verified Applicants</span>
              <span className="text-sm font-bold text-emerald-700 font-mono mt-0.5 block">{challenge.applicantsCount} Startups</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Problem Statement Brief</h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {challenge.description}
            </p>
          </div>

          {/* SLA & Beneficiary Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1">
              <span className="text-[11px] font-bold text-blue-800 uppercase block flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Mandatory SLA Threshold</span>
              </span>
              <p className="font-semibold text-slate-800">{challenge.sla || "99.9% Telemetry Uptime | <15 min Latency"}</p>
            </div>
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Statewide Citizen Reach</span>
              </span>
              <p className="font-semibold text-slate-800">{challenge.beneficiaries || "Over 1 Million Annual Beneficiaries"}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Technical Categories</h4>
            <div className="flex flex-wrap gap-1.5">
              {challenge.tags.map((t, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium border border-slate-200">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onLaunchMatch(challenge.id);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center space-x-2 transition-all"
          >
            <Cpu className="w-4 h-4 text-white" />
            <span>Launch AI Matchmaker</span>
          </button>
        </div>
      </div>
    </div>
  );
}
