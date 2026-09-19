import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, CheckCircle2, ArrowRight, Upload, 
  FileCheck, AlertCircle, Award, Sparkles, Clock, Check 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingPage() {
  const { currentUser, updateProfile, notify } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    startupName: currentUser?.org || 'HealthAI Technologies Pvt Ltd',
    dpiitId: currentUser?.dpiitId || 'DPIIT-89241',
    foundedYear: '2023',
    state: 'Maharashtra',
    city: 'Pune',
    trlLevel: 'TRL 8 (Flight/Field Qualified)',
    category: 'HealthTech / MedTech AI',
    patentsCount: '2 Granted, 1 Filed',
    panGst: 'AAACH1234F / 27AAACH1234F1Z5',
    complianceCert: 'CERT-In Level 4 & ISO 13485'
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'DPIIT_Recognition_Certificate.pdf', size: '1.2 MB', verified: true },
    { name: 'CERT_In_Security_Audit_2026.pdf', size: '2.8 MB', verified: true }
  ]);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      updateProfile({
        org: formData.startupName,
        dpiitId: formData.dpiitId
      });
      notify('Onboarding Complete', 'Startup DPIIT credentials synchronized with the State Innovation Registry.', 'success');
    }
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
              Startup FastTrack Gateway
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
              GFR Rule 149 Eligible
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">Startup Onboarding &amp; DPIIT Verification</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Register your startup credentials to participate in departmental challenge sandboxes and direct procurement scale-ups.
          </p>
        </div>

        {/* Verification Status Pill */}
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wide">Registry Status</p>
            <p className="text-xs font-semibold text-emerald-950">DPIIT Verified &amp; Active</p>
          </div>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, title: 'Corporate Entity' },
            { num: 2, title: 'TRL & Tech Domain' },
            { num: 3, title: 'Statutory Compliance' },
            { num: 4, title: 'Procurement License' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-3 rounded-lg text-left transition-all border ${
                step === s.num
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-sm'
                  : step > s.num
                  ? 'bg-slate-50 border-slate-200 text-emerald-700'
                  : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                {step > s.num ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === s.num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {s.num}
                  </span>
                )}
                <span>Step {s.num}</span>
              </div>
              <p className="text-xs font-medium truncate mt-1 text-slate-700">{s.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Content */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleNext} className="space-y-5">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-sm font-bold text-slate-900 font-display">Step 1: Corporate Entity &amp; DPIIT Recognition</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Startup Entity Name</label>
                  <input
                    type="text"
                    required
                    value={formData.startupName}
                    onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">DPIIT Recognition Number</label>
                  <input
                    type="text"
                    required
                    value={formData.dpiitId}
                    onChange={(e) => setFormData({ ...formData, dpiitId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State of Incorporation</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters / City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-sm font-bold text-slate-900 font-display">Step 2: Technology Readiness Level (TRL) &amp; Domain</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Technology Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">TRL Stage (TRL 7+ required for GFR 149)</label>
                  <select
                    value={formData.trlLevel}
                    onChange={(e) => setFormData({ ...formData, trlLevel: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white"
                  >
                    <option value="TRL 7 (Prototype demonstrated in operational environment)">TRL 7 (Operational Prototype)</option>
                    <option value="TRL 8 (Flight/Field Qualified)">TRL 8 (Field Qualified &amp; Certified)</option>
                    <option value="TRL 9 (Full Commercial Deployment Proven)">TRL 9 (Full Commercial Scale)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Intellectual Property &amp; Patents</label>
                  <input
                    type="text"
                    value={formData.patentsCount}
                    onChange={(e) => setFormData({ ...formData, patentsCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-sm font-bold text-slate-900 font-display">Step 3: Statutory Compliance &amp; Verification Dossier</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PAN / GSTIN Registration</label>
                  <input
                    type="text"
                    value={formData.panGst}
                    onChange={(e) => setFormData({ ...formData, panGst: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Security Audit Standards</label>
                  <input
                    type="text"
                    value={formData.complianceCert}
                    onChange={(e) => setFormData({ ...formData, complianceCert: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Verified Documents Dossier</p>
                <div className="space-y-2">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-slate-800">{file.name}</span>
                        <span className="text-slate-400">({file.size})</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Cryptographically Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in text-center py-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900 font-display">Ready for Government Sandbox Challenges</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your startup profile for <strong>{formData.startupName}</strong> ({formData.dpiitId}) is fully configured for GFR Rule 149 fast-track evaluation across all Maharashtra State Departments.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5 mt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">FastTrack Tier:</span>
                  <span className="font-semibold text-slate-800">Tier-1 Innovation FastTrack</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Sandbox Grant:</span>
                  <span className="font-semibold text-slate-800">₹5.0 Crore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Exemption Status:</span>
                  <span className="font-semibold text-emerald-600">Prior Turnover &amp; EMD Waived</span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Back
              </button>
            ) : <div />}

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              {step === 4 ? 'Save & Synchronize' : 'Continue to Next Step'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
