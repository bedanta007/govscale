import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, Award, FileText, ChevronRight, Sliders, 
  Search, Filter, ShieldCheck, CheckCircle2, Clock, Sparkles 
} from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';

export default function EvaluationsPage() {
  const { bids } = useProcurement();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, PENDING, SHORTLISTED

  // Bids ready for evaluation (exclude pure drafts)
  const evaluatableBids = bids.filter(b => b.status !== 'Draft');

  const filteredBids = evaluatableBids.filter(b => {
    const matchSearch = !searchTerm || 
      b.startupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tenderTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.techProposal?.modelName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTab = 
      filterTab === 'ALL' ? true :
      filterTab === 'PENDING' ? (b.status === 'Submitted' || b.status === 'Under Review') :
      filterTab === 'SHORTLISTED' ? (b.status === 'Shortlisted' || b.status === 'Awarded') : true;

    return matchSearch && matchTab;
  });

  const pendingCount = evaluatableBids.filter(b => b.status === 'Submitted' || b.status === 'Under Review').length;
  const shortlistedCount = evaluatableBids.filter(b => b.status === 'Shortlisted').length;
  const awardedCount = evaluatableBids.filter(b => b.status === 'Awarded').length;

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
              Committee Review Portal
            </span>
            <span className="text-[10px] text-slate-500 font-mono">DPC Evaluation Engine</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">Technical Evaluation &amp; Scoring</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit startup proposals against state clinical, cybersecurity, feasibility, and cost benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Evaluator</p>
            <p className="font-bold text-slate-800">{currentUser?.name || 'Committee Evaluator'}</p>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Role</p>
            <p className="font-semibold text-blue-700">{currentUser?.role}</p>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Pending Review</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600 font-display">{pendingCount}</span>
            <span className="text-[11px] text-slate-400">proposals</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Shortlisted for Sandbox</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-600 font-display">{shortlistedCount}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Score ≥ 80</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Commercial Awards</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-display">{awardedCount}</span>
            <span className="text-[11px] text-slate-400">GFR Rule 149</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Evaluation Threshold</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800 font-display">80 / 100</span>
            <span className="text-[11px] text-slate-400">min composite</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-xl">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Proposals ({evaluatableBids.length})
          </button>
          <button
            onClick={() => setFilterTab('PENDING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 'PENDING' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending Scoring ({pendingCount})
          </button>
          <button
            onClick={() => setFilterTab('SHORTLISTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 'SHORTLISTED' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Shortlisted &amp; Awarded ({shortlistedCount + awardedCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search startup or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Evaluations List */}
      <div className="space-y-3">
        {filteredBids.map(bid => (
          <div
            key={bid.id}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {bid.department}
                </span>
                <span className="text-[10px] font-mono text-slate-400">ID: {bid.id}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  bid.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                  bid.status === 'Awarded' ? 'bg-blue-100 text-blue-800' :
                  bid.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {bid.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  {bid.techProposal?.modelName || 'Proposed Solution'} — {bid.startupName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tender: <span className="text-slate-700 font-medium">{bid.tenderTitle}</span>
                </p>
              </div>

              {/* Rubric scores snippet if available */}
              {bid.scores ? (
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-600">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Score: {bid.compositeScore}/100
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>Accuracy: {bid.techProposal?.accuracy || '95%'}</span>
                  <span className="text-slate-300">•</span>
                  <span>Quote: <span className="font-mono font-bold text-blue-700">{bid.budgetQuote}</span></span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md w-fit">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Awaiting Committee Scorecard Submission</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <Link
                to={`/bids/${bid.id}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                {bid.compositeScore ? 'Review Scorecard' : 'Evaluate & Score'}
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>
          </div>
        ))}

        {filteredBids.length === 0 && (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
            <CheckSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-600">No proposals matching filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
