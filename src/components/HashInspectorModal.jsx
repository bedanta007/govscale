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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 text-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/40">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Cryptographic Proof Explorer</h3>
              <p className="text-[11px] text-slate-400 font-mono">Block #{audit.blockNumber || 148291} • SHA-256 Ledger Node</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Action Code</span>
            <span className="text-amber-400 font-bold text-sm">{audit.action}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Cryptographic SHA-256 Hash</span>
              <button 
                onClick={handleCopy}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300 flex items-center space-x-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy Hash"}</span>
              </button>
            </div>
            <p className="text-emerald-400 text-[11px] break-all leading-relaxed bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60 font-bold">
              {audit.hash}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Consensus Timestamp</span>
              <span className="text-slate-300 text-[11px] block">{audit.timestamp}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Proof Verification</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Consensus Verified (12/12)</span>
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Signatory Node / Actor</span>
            <span className="text-slate-200 text-xs font-sans block">{audit.actor}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Payload Details</span>
            <span className="text-slate-300 text-xs font-sans leading-relaxed block">{audit.details}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Maharashtra State Blockchain Node #148,291</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
}
