import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, FileText, Download, CheckCircle2, ShieldCheck, 
  Building2, Calendar, IndianRupee, ExternalLink, Sparkles 
} from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';
import { generateDpcPdf } from '../../services/pdfService';

export default function ContractsPage() {
  const { contracts, tenders, pilots } = useProcurement();
  const { currentUser, notify } = useAuth();
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownloadPdf = (contract) => {
    setDownloadingId(contract.id);
    try {
      const tender = tenders.find(t => t.id === contract.tenderId) || {
        department: contract.department,
        title: contract.tenderTitle
      };
      const pilot = pilots[0] || {};
      const startup = {
        name: contract.startupName,
        dpiitId: 'DPIIT-89241'
      };

      generateDpcPdf(pilot, tender, startup, currentUser);
      notify('Dossier Generated', 'DPC Evidence Dossier PDF successfully compiled and downloaded.', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      notify('Generation Failed', 'Could not compile PDF dossier.', 'error');
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  const totalValue = contracts.reduce((acc, c) => {
    const val = parseFloat(c.contractValue?.replace(/[^\d.]/g, '') || '0');
    return acc + val;
  }, 0);

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Stage 04: Commercial Scaling
            </span>
            <span className="text-[10px] text-slate-500 font-mono">GFR Rule 149 Innovation Exemption</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">Commercial Contracts &amp; Awards</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Post-sandbox verified startup contracts awarded under Departmental Procurement Committee (DPC) fast-track powers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-right">
            <p className="text-[10px] text-emerald-800 uppercase font-bold">Total Scale Commitments</p>
            <p className="text-lg font-mono font-bold text-emerald-700">₹{totalValue.toFixed(1)} Cr</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Active Contracts</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-display">{contracts.length}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Operational</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Hospitals / Edge Nodes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-display">148</span>
            <span className="text-[11px] text-slate-400">deployed nodes</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Districts Covered</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-violet-600 font-display">36 / 36</span>
            <span className="text-[11px] text-slate-400">Maharashtra</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Exemption Clause</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm font-bold text-slate-800 font-mono">Rule 149 GFR</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Pre-Approved</span>
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 font-display">Awarded Procurement Agreements</h2>
          <span className="text-xs text-slate-400 font-mono">{contracts.length} Records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {contracts.map(contract => (
            <div key={contract.id} className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {contract.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {contract.id}
                  </span>
                  <span className="text-[10px] text-slate-500">{contract.department}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    {contract.tenderTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Awardee Startup: <span className="font-semibold text-slate-900">{contract.startupName}</span> • Duration: <span className="text-slate-700">{contract.duration}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                  <span className="flex items-center gap-1 font-mono font-bold text-blue-700">
                    <IndianRupee className="w-3.5 h-3.5" />{contract.contractValue}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Awarded: {contract.awardDate}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {contract.ruleExemption}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleDownloadPdf(contract)}
                  disabled={downloadingId === contract.id}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  {downloadingId === contract.id ? 'Compiling Dossier...' : 'Download DPC Dossier (PDF)'}
                </button>

                <Link
                  to={`/tenders/${contract.tenderId}`}
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="View Original Tender"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Exemption Explainer Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-display">
            How Rule 149 GFR Direct Procurement Operates
          </h3>
        </div>
        <p className="text-xs text-blue-950 leading-relaxed">
          Under General Financial Rules (GFR) Rule 149 and Maharashtra State Innovation Society policy guidelines, startups that successfully validate their solution in a state-approved 90-day sandbox pilot with auditable telemetry are eligible for direct commercial scaling without re-tendering. Every milestone and evaluation score is cryptographically synchronized to the state audit ledger.
        </p>
      </div>
    </div>
  );
}
