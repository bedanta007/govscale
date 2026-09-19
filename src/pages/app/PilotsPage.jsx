import React, { useState } from 'react';
import { 
  Activity, Radio, Download, RefreshCw, CheckCircle2, ShieldCheck, 
  Building2, MapPin, Users, TrendingUp, Sparkles, Cpu, Clock 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useProcurement } from '../../context/ProcurementContext';
import { useAuth } from '../../context/AuthContext';
import { exportTelemetryCsv } from '../../services/pdfService';

export default function PilotsPage() {
  const { pilots, simulateTelemetryTick } = useProcurement();
  const { notify } = useAuth();
  const [isSimulating, setIsSimulating] = useState(false);

  const activePilot = pilots[0] || {
    id: 'plt_mh_01',
    startupName: 'HealthAI Technologies Pvt Ltd',
    solutionName: 'PulmoEdge v4.2 Diagnostic Core',
    hospital: 'Aundh District Hospital, Pune',
    progress: 82,
    patientsScreened: 14280,
    accuracyRate: '96.4%',
    triageTimeSaved: '42 Mins / Patient',
    telemetryStream: [
      { time: '09:00', patients: 14160, accuracy: 96.2 },
      { time: '10:00', patients: 14200, accuracy: 96.3 },
      { time: '11:00', patients: 14240, accuracy: 96.4 },
      { time: '12:00', patients: 14280, accuracy: 96.4 }
    ]
  };

  const handleSimulateTick = () => {
    setIsSimulating(true);
    simulateTelemetryTick(activePilot.id);
    notify('Telemetry Synced', '+24 patient screenings hashed and committed to blockchain ledger block.', 'success');
    setTimeout(() => setIsSimulating(false), 500);
  };

  const handleExportCsv = () => {
    exportTelemetryCsv(activePilot.telemetryStream, `govscale_telemetry_${activePilot.id}.csv`);
    notify('Export Initiated', 'Telemetry stream exported as CSV file.', 'info');
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" /> Live Sandbox Telemetry
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Stage 03: Field IoT Node</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">Real-Time Pilot Performance Grid</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Streaming live telemetry from district hospital pilot nodes for automated statutory compliance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={handleSimulateTick}
            disabled={isSimulating}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            Simulate Telemetry Tick (+24)
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Patients Screened</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-display">
              {activePilot.patientsScreened?.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">+24 just now</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Diagnostic Concordance</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-600 font-display">
              {activePilot.accuracyRate}
            </span>
            <span className="text-[11px] text-slate-400">vs. Radiologist</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Triage Time Saved</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600 font-display">
              {activePilot.triageTimeSaved}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Pilot Progress (Day 74/90)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-display">
              {activePilot.progress}%
            </span>
            <span className="text-[11px] text-blue-600 font-semibold">On Track</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${activePilot.progress}%` }} />
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Cumulative Patient Screenings Telemetry Stream
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated high-frequency telemetry stream logged from Aundh District Hospital edge gateway.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> DPDP Compliant (De-identified)
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activePilot.telemetryStream} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPatients)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deployment Nodes & Live Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* District Pilot Nodes */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Active Hospital Pilot Locations
          </h3>

          <div className="space-y-2.5">
            {[
              { hospital: 'Aundh District Hospital', district: 'Pune', status: 'Primary Sandbox', nodes: 32, sync: 'Active' },
              { hospital: 'Indira Gandhi Govt Medical College', district: 'Nagpur', status: 'Secondary Node', nodes: 24, sync: 'Active' },
              { hospital: 'District Civil Hospital', district: 'Nashik', status: 'Validation Node', nodes: 18, sync: 'Active' },
              { hospital: 'Chhatrapati Sambhajinagar Civil Hospital', district: 'Sambhajinagar', status: 'Telemetry Node', nodes: 16, sync: 'Active' },
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                <div>
                  <p className="font-semibold text-slate-800">{node.hospital}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{node.district} District • {node.nodes} IoT Edges</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" /> {node.sync}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Hardware Telemetry Spec */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
            <Cpu className="w-4 h-4 text-violet-600" />
            Edge Hardware &amp; Sandbox Specification
          </h3>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Inference Engine:</span>
              <span className="font-mono font-semibold text-slate-800">ONNX Edge Runtime v1.17</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Security Standard:</span>
              <span className="font-mono font-semibold text-emerald-700">CERT-In Level 4 &amp; DPDP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Network Topology:</span>
              <span className="font-mono font-semibold text-slate-800">Zero-Trust Encrypted Tunnel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Audit Ledger Integration:</span>
              <span className="font-mono font-semibold text-blue-700">Sha-256 Merkle Commit</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Every telemetry tick directly updates the legal pilot dossier required by the Departmental Procurement Committee (DPC) for commercial award under GFR 149.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
