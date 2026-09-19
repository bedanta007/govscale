import React from 'react';
import { Check, Clock, ChevronRight } from 'lucide-react';

const STAGES = [
  { id: 1, key: 'identify', name: '01 RFP & Specs', desc: 'Departmental problem defined' },
  { id: 2, key: 'match', name: '02 AI Match & Bidding', desc: 'Startup proposals received' },
  { id: 3, key: 'evaluate', name: '03 Panel Evaluation', desc: '6-D scoring matrix sign-off' },
  { id: 4, key: 'pilot', name: '04 Sandbox Pilot', desc: '90-day real-world telemetry' },
  { id: 5, key: 'award', name: '05 Scale & Award', desc: 'Rule 149 GFR commercial rollout' }
];

export default function WorkflowStepper({ currentStep = 1, statusText = '', onStageClick }) {
  return (
    <div className="card-gov p-4 sm:p-5 bg-white border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Procurement Lifecycle</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500">Stage {currentStep} of {STAGES.length}</span>
        </div>
        {statusText && (
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
            Current: {statusText}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {STAGES.map((s) => {
          const isCompleted = s.id < currentStep;
          const isCurrent = s.id === currentStep;

          return (
            <div 
              key={s.id}
              onClick={() => onStageClick && onStageClick(s.id)}
              className={`p-2.5 rounded-xl border transition-all text-left ${
                isCurrent 
                  ? 'border-blue-500 bg-blue-50/50 shadow-xs ring-1 ring-blue-500' 
                  : isCompleted 
                  ? 'border-emerald-200 bg-emerald-50/30' 
                  : 'border-slate-200 bg-slate-50/50 opacity-60'
              } ${onStageClick ? 'cursor-pointer hover:opacity-100' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? <Check className="w-3 h-3" /> : s.id}
                </span>

                <span className={`text-[10px] font-semibold ${
                  isCurrent ? 'text-blue-700 font-bold' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  {isCompleted ? 'Done' : isCurrent ? 'Active' : 'Upcoming'}
                </span>
              </div>

              <div className="font-bold text-xs text-slate-800 leading-snug">{s.name}</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">{s.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
