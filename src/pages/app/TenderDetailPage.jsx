import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, FileText, Users, Clock, Cpu, CheckCircle2, 
  AlertCircle, Download, PlusCircle, ExternalLink
} from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';
import SubmitBidModal from '../../components/modals/SubmitBidModal';

const STAGE_COLORS = {
  'RFP Open': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Evaluation Gate': 'bg-amber-100 text-amber-800 border-amber-200',
  'Pilot Running': 'bg-blue-100 text-blue-800 border-blue-200',
  'Commercial Scale Awarded': 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function TenderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tenders, bids, submitBid } = useProcurement();
  const { currentUser } = useAuth();
  const [showBidModal, setShowBidModal] = useState(false);

  const tender = tenders.find(t => t.id === id);

  if (!tender) {
    return (
      <div className="text-center py-20 space-y-3">
        <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-sm font-medium text-slate-600">Tender not found</p>
        <button onClick={() => navigate('/tenders')} className="text-xs text-blue-600 hover:underline">← Back to Tenders</button>
      </div>
    );
  }

  const existingBid = bids.find(b => b.tenderId === tender.id && b.startupId === currentUser?.id);
  const relatedBids = bids.filter(b => b.tenderId === tender.id);

  const canBid = currentUser?.role === 'Startup' && tender.stage === 'RFP Open';
  const canViewBids = ['Procurement Officer', 'Evaluator', 'Admin'].includes(currentUser?.role);

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl">
      {/* Back */}
      <button onClick={() => navigate('/tenders')} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tenders
      </button>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${STAGE_COLORS[tender.stage] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                {tender.stage}
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{tender.id}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-display">{tender.title}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> {tender.department}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {canBid && !existingBid && (
              <button
                onClick={() => setShowBidModal(true)}
                className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Submit Proposal
              </button>
            )}
            {existingBid && (
              <Link to={`/bids/${existingBid.id}`} className="px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 font-semibold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> View My Bid ({existingBid.status})
              </Link>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">{tender.description}</p>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Budget Allocation</p>
            <p className="font-mono font-bold text-blue-700 text-sm">{tender.budget}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Applicants</p>
            <p className="font-semibold text-slate-800 text-sm flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" />{tender.applicantsCount || 0}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Shortlisted</p>
            <p className="font-semibold text-slate-800 text-sm">{tender.shortlistedCount || 0}</p>
          </div>
          {tender.deadline && (
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Deadline</p>
              <p className="font-semibold text-slate-800 text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{tender.deadline}</p>
            </div>
          )}
        </div>

        {/* Tags */}
        {tender.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tender.tags.map(tag => (
              <span key={tag} className="text-[11px] text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Requirements */}
      {tender.requirements && tender.requirements.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 font-display">Eligibility &amp; Requirements</h2>
          <ul className="space-y-2">
            {tender.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.2" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bids Received (Officer/Admin/Evaluator view) */}
      {canViewBids && relatedBids.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 font-display">Proposals Received ({relatedBids.length})</h2>
            <Link to="/bids" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">View all bids →</Link>
          </div>
          <div className="space-y-2">
            {relatedBids.map(bid => (
              <Link key={bid.id} to={`/bids/${bid.id}`} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
                <div>
                  <p className="text-xs font-semibold text-slate-800">{bid.startupName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{bid.dpiitId} · {bid.budgetQuote} · Submitted {bid.submittedAt}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  bid.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                  bid.status === 'Awarded' ? 'bg-blue-100 text-blue-800' :
                  bid.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>{bid.status}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Submit Bid Modal */}
      {showBidModal && (
        <SubmitBidModal
          tender={tender}
          onClose={() => setShowBidModal(false)}
          onSubmit={(bidData) => {
            submitBid({ ...bidData, tenderId: tender.id, startupId: currentUser.id, startupName: currentUser.org });
            setShowBidModal(false);
            navigate('/bids');
          }}
        />
      )}
    </div>
  );
}
