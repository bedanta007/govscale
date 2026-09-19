import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Cpu, Activity, TrendingUp, FileText, ShieldCheck,
  Database, ArrowRight, CheckCircle2, Award, PlusCircle, AlertTriangle, BarChart2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProcurement } from '../../context/ProcurementContext';

function KpiCard({ label, val, trend, icon: Icon, color, to }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(to)} className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <div className={`p-1.5 rounded-lg ${color}`}><Icon className="w-3.5 h-3.5" /></div>
      </div>
      <div className="text-2xl font-bold text-slate-900 font-mono tracking-tight">{val}</div>
      <div className="text-xs text-slate-500">{trend}</div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { tenders, bids, contracts, pilots, audits } = useProcurement();
  const role = currentUser?.role;

  const myBids = bids.filter(b => b.startupId === currentUser?.id || role !== 'Startup');
  const activeBids = bids.filter(b => ['Submitted','Under Review','Shortlisted'].includes(b.status));
  const activePilot = pilots[0];

  // Role-specific KPI sets
  const kpis = role === 'Startup' ? [
    { label: 'Open Tenders', val: tenders.length, trend: 'Available RFPs', icon: Building2, color: 'text-blue-600 bg-blue-50', to: '/tenders' },
    { label: 'My Proposals', val: bids.filter(b => b.startupId === 'usr_startup_01').length, trend: 'Active Bids', icon: FileText, color: 'text-violet-600 bg-violet-50', to: '/bids' },
    { label: 'Live Pilots', val: pilots.length, trend: 'Field Trials', icon: Activity, color: 'text-amber-600 bg-amber-50', to: '/pilots' },
    { label: 'Contracts Won', val: contracts.length, trend: 'Active Awards', icon: Award, color: 'text-emerald-600 bg-emerald-50', to: '/contracts' },
  ] : role === 'Procurement Officer' ? [
    { label: 'Active Tenders', val: tenders.length, trend: 'Published RFPs', icon: Building2, color: 'text-blue-600 bg-blue-50', to: '/tenders' },
    { label: 'Bids Received', val: bids.length, trend: 'Total Proposals', icon: FileText, color: 'text-violet-600 bg-violet-50', to: '/bids' },
    { label: 'In Evaluation', val: activeBids.length, trend: 'Shortlisting Phase', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50', to: '/evaluations' },
    { label: 'Contracts Awarded', val: contracts.length, trend: 'GFR Rule 149 Awards', icon: Award, color: 'text-emerald-600 bg-emerald-50', to: '/contracts' },
  ] : role === 'Evaluator' ? [
    { label: 'Assigned Evals', val: bids.filter(b => b.scores).length, trend: 'Completed Scorecards', icon: ShieldCheck, color: 'text-blue-600 bg-blue-50', to: '/evaluations' },
    { label: 'Pending Review', val: bids.filter(b => !b.scores && b.status !== 'Draft').length, trend: 'Awaiting Scoring', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50', to: '/evaluations' },
    { label: 'Pilot Feeds', val: pilots.length, trend: 'Live Telemetry', icon: Activity, color: 'text-emerald-600 bg-emerald-50', to: '/pilots' },
    { label: 'Ledger Entries', val: audits.length, trend: 'Signed Records', icon: Database, color: 'text-slate-600 bg-slate-100', to: '/audit' },
  ] : [
    { label: 'Tenders', val: tenders.length, trend: 'All State Tenders', icon: Building2, color: 'text-blue-600 bg-blue-50', to: '/tenders' },
    { label: 'Startups', val: 4, trend: 'Registered Users', icon: Cpu, color: 'text-violet-600 bg-violet-50', to: '/admin/verifications' },
    { label: 'Contracts', val: contracts.length, trend: 'Issued Awards', icon: Award, color: 'text-emerald-600 bg-emerald-50', to: '/contracts' },
    { label: 'Ledger Events', val: audits.length, trend: 'Blockchain Entries', icon: Database, color: 'text-slate-600 bg-slate-100', to: '/audit' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">{role} Workspace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-500 font-medium">Live</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Good day, {currentUser?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500">{currentUser?.title} · {currentUser?.org}</p>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          {role === 'Startup' && (
            <Link to="/tenders" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors">
              <Building2 className="w-3.5 h-3.5" /> Browse Tenders
            </Link>
          )}
          {role === 'Procurement Officer' && (
            <Link to="/tenders" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors">
              <PlusCircle className="w-3.5 h-3.5" /> Post New Tender
            </Link>
          )}
          {role === 'Evaluator' && (
            <Link to="/evaluations" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" /> Open Evaluations
            </Link>
          )}
          {role === 'Admin' && (
            <Link to="/admin/verifications" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" /> Review Startups
            </Link>
          )}
          <Link to="/pilots" className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors">
            <Activity className="w-3.5 h-3.5 text-emerald-600" /> Live Pilots
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Tenders */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 font-display">Recent Tenders</h2>
            <Link to="/tenders" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {tenders.slice(0, 4).map(t => (
              <div key={t.id} onClick={() => navigate(`/tenders/${t.id}`)} className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-all flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{t.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-medium">{t.department}</span>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">{t.budget}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                  t.stage === 'RFP Open' ? 'bg-emerald-100 text-emerald-800' :
                  t.stage === 'Evaluation Gate' ? 'bg-amber-100 text-amber-800' :
                  t.stage === 'Pilot Running' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-100 text-slate-700'
                }`}>{t.stage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Pilot Spotlight */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 flex flex-col">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">🟢 Live Field Trial</span>
            <h2 className="text-sm font-bold text-slate-900 font-display mt-2">{activePilot?.name}</h2>
            <p className="text-xs text-slate-500 mt-1">{activePilot?.location}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500">Patients Screened</span>
              <span className="font-mono font-bold text-slate-900">{activePilot?.patientsScreened?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500">Accuracy</span>
              <span className="font-mono font-bold text-emerald-700">{activePilot?.accuracyRate}</span>
            </div>
            <div className="flex justify-between text-xs p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500">Triage Time Saved</span>
              <span className="font-mono font-bold text-blue-700">{activePilot?.triageTimeSaved}</span>
            </div>
          </div>
          <div className="mt-auto">
            <div className="mb-2 flex justify-between text-xs text-slate-500">
              <span>Pilot Progress</span>
              <span className="font-semibold text-slate-700">{activePilot?.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full">
              <div className="h-1.5 bg-emerald-500 rounded-full transition-all" style={{ width: `${activePilot?.progress}%` }} />
            </div>
          </div>
          <Link to="/pilots" className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors">
            <Activity className="w-3.5 h-3.5 text-emerald-600" /> Open Telemetry Console
          </Link>
        </div>

      </div>

      {/* Recent Audit Events */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 font-display">Recent Blockchain Events</h2>
          <Link to="/audit" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Full Ledger <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {audits.slice(0, 3).map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-700 truncate">{a.action.replace(/_/g,' ')}</p>
                <p className="text-slate-400 text-[11px] truncate">{a.actor} · {a.timestamp}</p>
              </div>
              <span className="font-mono text-[10px] text-slate-400 truncate max-w-[80px]">{a.hash?.slice(0,10)}…</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
