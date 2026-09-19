import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, ChevronRight, Filter, Clock, AlertCircle, CheckCircle2, Award, Edit3, Send } from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';

const STATUS_STYLES = {
  'Draft': 'bg-slate-100 text-slate-700',
  'Submitted': 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-amber-100 text-amber-800',
  'Shortlisted': 'bg-violet-100 text-violet-800',
  'Awarded': 'bg-emerald-100 text-emerald-800',
  'Rejected': 'bg-red-100 text-red-800',
};

export default function BidsPage() {
  const { bids } = useProcurement();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const role = currentUser?.role;
  // Startup sees own bids; others see all
  const myBids = role === 'Startup' ? bids.filter(b => b.startupId === 'usr_startup_01') : bids;
  const filtered = filterStatus === 'ALL' ? myBids : myBids.filter(b => b.status === filterStatus);
  const statuses = ['ALL', ...new Set(bids.map(b => b.status))];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-md">
            {role === 'Startup' ? 'My Proposals' : 'All Bids / Proposals'}
          </span>
          <h1 className="text-xl font-bold text-slate-900 font-display mt-1.5">
            {role === 'Startup' ? 'My Bid Submissions' : 'Received Proposals'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'Startup' ? 'Track the status of your submitted proposals across all active tenders.' : 'Review and evaluate startup bids for open tenders.'}
          </p>
        </div>
        {role === 'Startup' && (
          <Link to="/tenders" className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 shrink-0 transition-colors">
            <FileText className="w-4 h-4" /> Browse Tenders to Bid
          </Link>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              filterStatus === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {s === 'ALL' ? `All (${myBids.length})` : `${s} (${myBids.filter(b => b.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Bids Table / Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white border border-slate-200 rounded-xl">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No proposals found</p>
          {role === 'Startup' && (
            <Link to="/tenders" className="text-xs text-blue-600 mt-2 hover:underline inline-block">Browse open tenders to submit a bid</Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(bid => (
            <div
              key={bid.id}
              onClick={() => navigate(`/bids/${bid.id}`)}
              className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center gap-4"
            >
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${STATUS_STYLES[bid.status] || 'bg-slate-100 text-slate-700'}`}>
                    {bid.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{bid.id}</span>
                </div>
                <p className="font-semibold text-sm text-slate-800 truncate">{bid.tenderTitle}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="font-medium">{bid.department}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-blue-700 font-semibold">{bid.budgetQuote}</span>
                  {bid.submittedAt && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Submitted {bid.submittedAt}</span>
                    </>
                  )}
                  {bid.compositeScore && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">Score: {bid.compositeScore}/100</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {bid.status === 'Draft' && role === 'Startup' && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                    <Edit3 className="w-3 h-3" /> Draft
                  </span>
                )}
                {bid.status === 'Awarded' && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <Award className="w-3 h-3" /> Contract Awarded
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
