import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Building2, Search, Filter, PlusCircle, ArrowRight, Clock, Users, ChevronRight } from 'lucide-react';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';
import CreateTenderModal from '../../components/modals/CreateTenderModal';

const STAGE_COLORS = {
  'RFP Open': 'bg-emerald-100 text-emerald-800',
  'Evaluation Gate': 'bg-amber-100 text-amber-800',
  'Pilot Running': 'bg-blue-100 text-blue-800',
  'Commercial Scale Awarded': 'bg-slate-100 text-slate-700',
};

export default function TendersListPage() {
  const [searchParams] = useSearchParams();
  const { tenders, addTender } = useProcurement();
  const { currentUser } = useAuth();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterStage, setFilterStage] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const departments = ['ALL', ...new Set(tenders.map(t => t.department))];
  const stages = ['ALL', ...new Set(tenders.map(t => t.stage))];

  const filtered = useMemo(() => {
    return tenders.filter(t => {
      const matchSearch = !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        (t.tags || []).some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      const matchDept = filterDept === 'ALL' || t.department === filterDept;
      const matchStage = filterStage === 'ALL' || t.stage === filterStage;
      return matchSearch && matchDept && matchStage;
    });
  }, [tenders, search, filterDept, filterStage]);

  const canPost = ['Procurement Officer', 'Admin'].includes(currentUser?.role);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">Challenge Marketplace</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">Departmental Tenders &amp; RFPs</h1>
          <p className="text-xs text-slate-500 mt-0.5">Browse verified departmental problem statements open for DPIIT-registered startups</p>
        </div>
        {canPost && (
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 shrink-0 transition-colors">
            <PlusCircle className="w-4 h-4" /> Post New Tender
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by keyword, department, technology..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
        <select
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500"
        >
          {departments.map(d => <option key={d} value={d}>{d === 'ALL' ? 'All Departments' : d}</option>)}
        </select>
        <select
          value={filterStage}
          onChange={e => setFilterStage(e.target.value)}
          className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500"
        >
          {stages.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Stages' : s}</option>)}
        </select>
      </div>

      {/* Results Summary */}
      <p className="text-xs text-slate-500 font-medium">
        Showing <strong className="text-slate-800">{filtered.length}</strong> of {tenders.length} tenders
      </p>

      {/* Tender Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(tender => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No tenders match your filters</p>
          <button onClick={() => { setSearch(''); setFilterDept('ALL'); setFilterStage('ALL'); }} className="text-xs text-blue-600 mt-2 hover:underline">Clear filters</button>
        </div>
      )}

      {showCreateModal && (
        <CreateTenderModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(data) => {
            addTender(data);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function TenderCard({ tender }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3.5 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col">
      <div className="space-y-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded truncate">{tender.department}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 ${STAGE_COLORS[tender.stage] || 'bg-slate-100 text-slate-700'}`}>
            {tender.stage}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 leading-snug font-display">{tender.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{tender.description}</p>

        <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
          <span className="font-mono font-bold text-blue-700">{tender.budget}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tender.applicantsCount || 0} applicants</span>
          {tender.deadline && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tender.deadline}</span>}
        </div>

        <div className="flex flex-wrap gap-1 pt-0.5">
          {(tender.tags || []).slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200 px-1.5 py-0.2 rounded">{tag}</span>
          ))}
        </div>
      </div>

      <Link
        to={`/tenders/${tender.id}`}
        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
      >
        View Details <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
