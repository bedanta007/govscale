import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, XCircle, AlertCircle, FileCheck, 
  Search, Filter, Building2, Sparkles, Clock, Eye 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useProcurement } from '../../../context/ProcurementContext';

const INITIAL_APPLICATIONS = [
  {
    id: 'app_v901',
    startupName: 'HealthAI Technologies Pvt Ltd',
    dpiitId: 'DPIIT-89241',
    category: 'HealthTech / Medical AI',
    trlLevel: 'TRL 8 (Flight/Field Qualified)',
    state: 'Maharashtra (Pune)',
    documents: ['DPIIT_Cert.pdf', 'CERT_In_L4.pdf', 'ISO_13485.pdf'],
    status: 'Approved',
    appliedAt: '2026-09-10'
  },
  {
    id: 'app_v902',
    startupName: 'AquaAcoustic Systems LLP',
    dpiitId: 'DPIIT-71402',
    category: 'WaterTech & IoT Sensing',
    trlLevel: 'TRL 7 (Operational Prototype)',
    state: 'Maharashtra (Nagpur)',
    documents: ['DPIIT_Cert.pdf', 'NABL_Water_Test.pdf'],
    status: 'Pending',
    appliedAt: '2026-09-14'
  },
  {
    id: 'app_v903',
    startupName: 'AeroGrid Infra Drones',
    dpiitId: 'DPIIT-93118',
    category: 'Drone & PWD Telemetry',
    trlLevel: 'TRL 7 (Operational Prototype)',
    state: 'Maharashtra (Nashik)',
    documents: ['DGCA_Type_Cert.pdf', 'DPIIT_Cert.pdf'],
    status: 'Pending',
    appliedAt: '2026-09-16'
  },
  {
    id: 'app_v904',
    startupName: 'KrishiNeuro AI Labs',
    dpiitId: 'DPIIT-66290',
    category: 'AgriTech Micro-climate',
    trlLevel: 'TRL 6 (Laboratory Model)',
    state: 'Maharashtra (Amravati)',
    documents: ['DPIIT_Cert.pdf'],
    status: 'Flagged',
    appliedAt: '2026-09-17'
  }
];

export default function AdminVerificationsPage() {
  const { notify } = useAuth();
  const { recordAudit } = useProcurement();
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (app) => {
    setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: 'Approved' } : a));
    recordAudit(
      'STARTUP_VERIFICATION_ACCREDITED',
      'State Procurement Administrator',
      `Approved DPIIT FastTrack accreditation for ${app.startupName} (${app.dpiitId}).`
    );
    notify('Accreditation Approved', `${app.startupName} is now authorized for direct sandbox bidding under GFR 149.`, 'success');
  };

  const handleReject = (app) => {
    setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: 'Rejected' } : a));
    notify('Application Rejected', `Application for ${app.startupName} marked as rejected.`, 'info');
  };

  const filtered = applications.filter(a => {
    const matchSearch = !searchTerm ||
      a.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.dpiitId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              MSInS Verification Desk
            </span>
            <span className="text-[10px] text-slate-500 font-mono">DPIIT Sandbox Accreditation</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">Startup Verification Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Validate DPIIT credentials, TRL qualification, and statutory certifications to grant GFR 149 sandbox bidding clearance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Statutory Authority</p>
            <p className="font-bold text-slate-800">State Innovation Society</p>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Pending Review</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600 font-display">
              {applications.filter(a => a.status === 'Pending').length}
            </span>
            <span className="text-[11px] text-slate-400">awaiting check</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Accredited Startups</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-600 font-display">
              {applications.filter(a => a.status === 'Approved').length}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">GFR 149 Ready</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Flagged for Clarification</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-rose-600 font-display">
              {applications.filter(a => a.status === 'Flagged').length}
            </span>
            <span className="text-[11px] text-slate-400">TRL &lt; 7</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Turnaround SLA</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-display">&lt; 48 Hrs</span>
            <span className="text-[11px] text-slate-400">fast-track desk</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-xl">
        <div className="flex items-center gap-1.5 flex-wrap">
          {['ALL', 'Pending', 'Approved', 'Flagged'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === st ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st === 'ALL' ? 'All Applications' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search startup or DPIIT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-3">
        {filtered.map(app => (
          <div
            key={app.id}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {app.dpiitId}
                </span>
                <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                  {app.category}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  app.status === 'Flagged' ? 'bg-rose-100 text-rose-800' :
                  app.status === 'Rejected' ? 'bg-slate-100 text-slate-700' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {app.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">{app.startupName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Location: <span className="text-slate-700 font-medium">{app.state}</span> • Readiness: <span className="text-blue-700 font-medium">{app.trlLevel}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs pt-1 flex-wrap">
                <span className="text-[11px] text-slate-400">Attached Dossier:</span>
                {app.documents.map((doc, idx) => (
                  <span key={idx} className="flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    <FileCheck className="w-3 h-3 text-emerald-600" />
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {app.status !== 'Approved' && (
                <button
                  onClick={() => handleApprove(app)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve Accreditation
                </button>
              )}

              {app.status === 'Pending' && (
                <button
                  onClick={() => handleReject(app)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-medium transition-colors"
                >
                  Reject
                </button>
              )}

              {app.status === 'Approved' && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> FastTrack Active
                </span>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-500">No applications matching current filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
