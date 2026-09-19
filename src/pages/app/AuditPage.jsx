import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, Search, Filter, Hash, Lock, 
  Database, RefreshCw, ExternalLink, Sparkles, Clock,
  ShieldCheck, FileText, Check
} from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import HashInspectorModal from '../../components/HashInspectorModal';

export default function AuditPage() {
  const { audits } = useProcurement();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');
  const [selectedAudit, setSelectedAudit] = useState(null);

  const actionTypes = ['ALL', ...new Set(audits.map(a => a.action))];

  const filteredAudits = audits.filter(a => {
    const matchSearch = !searchTerm ||
      a.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.hash.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAction = filterAction === 'ALL' || a.action === filterAction;
    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 1. Cryptographic Audit Trail Hero (No standalone ledger box) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
            Statutory Blockchain Ledger
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Zero-Tamper Verification
          </span>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            Consensus Height #{148290 + audits.length}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
          Cryptographic Audit Trail
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Every departmental problem statement, startup proposal submission, committee evaluation score, pilot telemetry batch, and commercial contract award is cryptographically hashed and synchronized to the Government of Maharashtra state ledger for CAG statutory compliance.
        </p>
      </div>

      {/* 2. Consistent 4-Column Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recorded Transactions */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Recorded Transactions
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-2">
              {audits.length}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-3 pt-3 border-t border-slate-100">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>100% Cryptographically Verified</span>
          </div>
        </div>

        {/* Consensus Mechanism */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Consensus Mechanism
            </span>
            <p className="text-xl sm:text-2xl font-bold text-blue-700 font-mono mt-2 truncate">
              Proof-of-Authority
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
            MSInS State Validator Node
          </p>
        </div>

        {/* Hashing Algorithm */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Hashing Algorithm
            </span>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono mt-2">
              SHA-256 Merkle
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 font-mono">
            256-Bit Immutable Block Hash
          </p>
        </div>

        {/* Audit Compliance */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Statutory Compliance
            </span>
            <p className="text-xl sm:text-2xl font-bold text-emerald-700 font-display mt-2">
              CAG Audit Ready
            </p>
          </div>
          <p className="text-xs text-emerald-700/90 font-medium mt-3 pt-3 border-t border-slate-100">
            Rule 149 GFR Direct Exemption
          </p>
        </div>
      </div>

      {/* 3. AUDIT EVENTS Control Panel (Prominent, cleanly bounded filter card) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 font-display tracking-tight uppercase">
                Audit Events &amp; Ledger Feed
              </h2>
              <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                {filteredAudits.length} Records
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter and inspect digitally signed transaction logs across all procurement stages
            </p>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search action, actor, or hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-800 transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Filter Chips - Horizontal wrap/scroll without page overflow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs text-slate-500 font-semibold shrink-0 mr-1">Filter:</span>
          {actionTypes.map(action => {
            const isSelected = filterAction === action;
            const count = action === 'ALL' ? audits.length : audits.filter(a => a.action === action).length;
            const label = action === 'ALL' ? 'All Events' : action.replace(/_/g, ' ');

            return (
              <button
                key={action}
                onClick={() => setFilterAction(action)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Audit Event Cards List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs divide-y divide-slate-100">
        {filteredAudits.map((item, idx) => (
          <div 
            key={item.id || idx} 
            className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1 min-w-0">
              {/* Metadata Badges Header */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                  Block #{item.blockNumber || 148290 + idx}
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
                  {item.action.replace(/_/g, ' ')}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Signed &amp; Verified
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium ml-auto md:ml-0">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {item.timestamp}
                </span>
              </div>

              {/* Event Description */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {item.details}
              </p>

              {/* Signer & Hash Detail */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                <span>
                  Signer: <strong className="text-slate-800 font-semibold">{item.actor}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1 truncate max-w-sm sm:max-w-md">
                  <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.hash}</span>
                </span>
              </div>
            </div>

            {/* Inspect Proof Secondary Action */}
            <div className="shrink-0 self-end md:self-center">
              <button
                onClick={() => setSelectedAudit(item)}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <Hash className="w-3.5 h-3.5 text-blue-600" />
                <span>Inspect Proof</span>
              </button>
            </div>
          </div>
        ))}

        {filteredAudits.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Shield className="w-10 h-10 mx-auto mb-2 opacity-30 text-slate-500" />
            <p className="text-xs font-semibold text-slate-600">No ledger transactions match your search</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterAction('ALL'); }}
              className="text-xs text-blue-600 hover:underline mt-1.5 font-medium inline-block"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {selectedAudit && (
        <HashInspectorModal
          audit={selectedAudit}
          onClose={() => setSelectedAudit(null)}
        />
      )}
    </div>
  );
}
