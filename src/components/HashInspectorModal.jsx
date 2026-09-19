import React, { useState } from 'react';
import { X, Shield, CheckCircle2, Copy, Check, Lock, Database } from 'lucide-react';

export default function HashInspectorModal({ audit, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!audit) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(audit.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white text-slate-900 w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#0f172a] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cryptographic Proof Explorer</h3>
              <p className="text-[11px] text-slate-400 font-mono">Block #{audit.blockNumber || 148291} • State Ledger Node</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs font-mono">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Action Code</span>
            <span className="text-blue-700 font-bold text-sm">{audit.action}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">SHA-256 Ledger Hash</span>
              <button 
                onClick={handleCopy}
                className="text-[11px] bg-slate-200 hover:bg-slate-300 px-2.5 py-1 rounded-md text-slate-700 font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? "Copied" : "Copy Hash"}</span>
              </button>
            </div>
            <p className="text-slate-800 text-[11px] break-all leading-relaxed bg-white p-3 rounded-lg border border-slate-300 font-bold select-all">
              {audit.hash}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">Timestamp</span>
              <span className="text-slate-800 text-xs font-bold block">{audit.timestamp}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">Consensus Status</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified (12/12 Nodes)</span>
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Signatory / Authority</span>
            <span className="text-slate-800 text-xs font-sans font-medium block">{audit.actor}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Payload Summary</span>
            <span className="text-slate-700 text-xs font-sans leading-relaxed block">{audit.details}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Maharashtra State Blockchain Node #148,291</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
}
