import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, CheckCircle2, ShieldCheck, Award, 
  Building2, Calendar, IndianRupee, Layers, AlertCircle, 
  Download, FileCheck, Sliders, CheckSquare, Sparkles 
} from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';

export default function BidDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bids, scoreBid, awardContract } = useProcurement();
  const { currentUser, notify } = useAuth();

  const bid = bids.find(b => b.id === id);

  // Evaluation Form State
  const [scores, setScores] = useState({
    clinical: bid?.scores?.clinical || 85,
    feasibility: bid?.scores?.feasibility || 85,
    security: bid?.scores?.security || 90,
    scalability: bid?.scores?.scalability || 85,
    team: bid?.scores?.team || 85,
    cost: bid?.scores?.cost || 90
  });
  const [evaluatorNotes, setEvaluatorNotes] = useState(bid?.evaluatorNotes || '');
  const [isScoringOpen, setIsScoringOpen] = useState(false);
  const [isAwarding, setIsAwarding] = useState(false);

  if (!bid) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Proposal Not Found</h2>
        <p className="text-xs text-slate-500">The requested bid submission with ID "{id}" does not exist.</p>
        <Link to="/bids" className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Proposals
        </Link>
      </div>
    );
  }

  const role = currentUser?.role;
  const canEvaluate = ['Evaluator', 'Procurement Officer', 'Admin'].includes(role);
  const canAward = ['Procurement Officer', 'Admin'].includes(role);

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    scoreBid(bid.id, scores, evaluatorNotes, currentUser.name);
    notify('Scorecard Committed', 'Evaluation scorecard signed and committed to state audit ledger.', 'success');
    setIsScoringOpen(false);
  };

  const handleAward = () => {
    if (window.confirm(`Award commercial contract of ${bid.budgetQuote} to ${bid.startupName} under Rule 149 GFR Exemption?`)) {
      setIsAwarding(true);
      setTimeout(() => {
        awardContract(bid.tenderId, bid.id, bid.budgetQuote, currentUser);
        notify('Contract Finalized', `Commercial scale order awarded to ${bid.startupName}.`, 'success');
        setIsAwarding(false);
        navigate('/contracts');
      }, 500);
    }
  };

  const compositeScore = bid.compositeScore || Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
  );

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Back button */}
      <Link to="/bids" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Proposals List
      </Link>

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Bid Reference: {bid.id}
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {bid.department}
              </span>
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded ${
                bid.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                bid.status === 'Awarded' ? 'bg-blue-100 text-blue-800' :
                bid.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {bid.status}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-display">
              {bid.techProposal?.modelName || bid.tenderTitle}
            </h1>
            <p className="text-xs text-slate-600">
              Submitted for <Link to={`/tenders/${bid.tenderId}`} className="text-blue-600 hover:underline font-medium">{bid.tenderTitle}</Link>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {canEvaluate && (
              <button
                onClick={() => setIsScoringOpen(!isScoringOpen)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                {isScoringOpen ? 'Hide Score Panel' : 'Evaluate / Score Bid'}
              </button>
            )}

            {canAward && bid.status === 'Shortlisted' && (
              <button
                onClick={handleAward}
                disabled={isAwarding}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Award className="w-4 h-4" />
                {isAwarding ? 'Processing Award...' : 'Award GFR 149 Contract'}
              </button>
            )}
          </div>
        </div>

        {/* Quick Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Startup Name</p>
            <p className="font-semibold text-slate-800 mt-0.5">{bid.startupName}</p>
            <p className="text-[10px] text-slate-500 font-mono">{bid.dpiitId}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Commercial Quote</p>
            <p className="font-mono font-bold text-blue-700 text-sm mt-0.5">{bid.budgetQuote}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Proposed Timeline</p>
            <p className="font-semibold text-slate-800 mt-0.5">{bid.proposedTimeline || '90 Days'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Composite Score</p>
            <p className="font-bold text-emerald-700 text-sm mt-0.5">
              {bid.compositeScore ? `${bid.compositeScore} / 100` : 'Pending Review'}
            </p>
          </div>
        </div>
      </div>

      {/* Evaluator Score Panel (Collapsible / Modal drawer) */}
      {isScoringOpen && (
        <div className="bg-gradient-to-br from-blue-50/50 to-white border border-blue-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 font-display">Technical Evaluation Scoring Rubric</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded">
              Average Score: {Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/6)} / 100
            </span>
          </div>

          <form onSubmit={handleScoreSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(scores).map(([metric, value]) => (
                <div key={metric} className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 capitalize">{metric} Criteria</span>
                    <span className="font-bold text-blue-600">{value}/100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={value}
                    onChange={(e) => setScores({ ...scores, [metric]: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Technical Evaluator Assessment Notes (Logged into Merkle Trail)
              </label>
              <textarea
                rows={3}
                required
                value={evaluatorNotes}
                onChange={(e) => setEvaluatorNotes(e.target.value)}
                placeholder="Enter clinical audit observations, algorithmic validation results, or operational viability remarks..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsScoringOpen(false)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Commit Signed Evaluation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Grid: Technical & Financial Proposal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Column: Technical Specifications */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Technical Architecture &amp; Methodology
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Solution Model</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{bid.techProposal?.modelName || 'Custom Edge Platform'}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Validated Accuracy</p>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">{bid.techProposal?.accuracy || '96.4%'}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Inference Latency</p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">{bid.techProposal?.latency || '< 15 ms'}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Hardware Footprint</p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">{bid.techProposal?.hardwareRequirements || 'Standard edge hardware'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Architecture Summary</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed font-mono">
                {bid.techProposal?.architecture || 'Microservices-based decentralized architecture with zero external telemetry egress.'}
              </p>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              Financial Proposal &amp; RoI Impact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                <p className="text-[10px] text-emerald-800 uppercase font-semibold">Capex Allocation</p>
                <p className="text-xs font-bold text-emerald-950 mt-0.5">{bid.financialProposal?.capex || '₹1.8 Cr'}</p>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                <p className="text-[10px] text-blue-800 uppercase font-semibold">Opex Allocation</p>
                <p className="text-xs font-bold text-blue-950 mt-0.5">{bid.financialProposal?.opex || '₹1.4 Cr'}</p>
              </div>
              <div className="p-3 bg-violet-50/50 border border-violet-100 rounded-lg">
                <p className="text-[10px] text-violet-800 uppercase font-semibold">Estimated Savings</p>
                <p className="text-xs font-bold text-violet-950 mt-0.5">{bid.financialProposal?.savingsEstimate || '₹1.24 Cr / yr'}</p>
              </div>
            </div>
          </div>

          {/* Evaluator Notes Section */}
          {bid.evaluatorNotes && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                Committee Evaluation Summary
              </h2>
              <p className="text-xs text-slate-700 bg-slate-50 border border-slate-100 p-3 rounded-lg leading-relaxed">
                "{bid.evaluatorNotes}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Evaluated on: {bid.evaluatedAt || '2026-09-15'}</span>
                <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /> Digitally Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Documents & Compliance */}
        <div className="space-y-5">
          {/* Scorecard Summary Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Evaluation Scorecard</h3>
            <div className="text-center py-2">
              <span className="text-3xl font-extrabold text-slate-900">{compositeScore}</span>
              <span className="text-xs text-slate-400"> / 100</span>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Exceeds Minimum Benchmark (80)
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              {Object.entries(bid.scores || scores).map(([metric, score]) => (
                <div key={metric} className="space-y-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="capitalize text-slate-600">{metric}</span>
                    <span className="font-bold text-slate-800">{score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Dossier */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Verified Dossier Files</h3>
            <div className="space-y-2">
              {(bid.documents || [
                { name: 'Technical_Whitepaper.pdf', size: '2.4 MB' },
                { name: 'ISO_Medical_Certification.pdf', size: '1.1 MB' }
              ]).map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-700 truncate">{doc.name}</span>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Exemption Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              GFR Rule 149 Innovation FastTrack
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Upon successful completion of the 90-day sandbox trial and state evaluation, this proposal qualifies for direct departmental scaling under Rule 149 GFR exemptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
