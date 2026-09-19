import React, { useState } from 'react';
import { X, Send, Upload, FileCheck, CheckCircle2, ShieldCheck, IndianRupee, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SubmitBidModal({ tender, onClose, onSubmit }) {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    budgetQuote: tender?.budget || '₹2.8 Cr',
    proposedTimeline: '90 Days Sandbox Pilot',
    dpiitId: currentUser?.dpiitId || 'DPIIT-89241',
    modelName: '',
    accuracy: '95.8%',
    architecture: 'Edge IoT + Anonymized On-Premises Telemetry Gateways',
    capex: '₹1.5 Cr (Hardware / Edge Deployment)',
    opex: '₹1.3 Cr (Operations & Field Support)',
    savingsEstimate: '₹2.4 Cr/year in operational efficiencies',
    summaryNotes: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState([
    { name: 'Technical_Architecture_Dossier.pdf', size: '2.4 MB', verified: true },
    { name: 'DPIIT_Incorporation_Certificate.pdf', size: '1.1 MB', verified: true }
  ]);

  const [mockUploading, setMockUploading] = useState(false);
  const [error, setError] = useState('');

  const handleAddMockFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMockUploading(true);
      setTimeout(() => {
        setUploadedDocs(prev => [
          ...prev,
          { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, verified: true }
        ]);
        setMockUploading(false);
      }, 600);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.budgetQuote || !formData.modelName) {
      setError('Please provide your solution model name and budget quote.');
      return;
    }

    const bidData = {
      tenderTitle: tender?.title || 'Innovation Challenge',
      department: tender?.department || 'Government Department',
      dpiitId: formData.dpiitId,
      budgetQuote: formData.budgetQuote.startsWith('₹') ? formData.budgetQuote : `₹${formData.budgetQuote}`,
      proposedTimeline: formData.proposedTimeline,
      techProposal: {
        modelName: formData.modelName,
        accuracy: formData.accuracy,
        latency: '< 15 ms inference',
        hardwareRequirements: 'Zero GPU dependency, standard on-premise x86 cluster',
        architecture: formData.architecture
      },
      financialProposal: {
        capex: formData.capex,
        opex: formData.opex,
        savingsEstimate: formData.savingsEstimate
      },
      documents: uploadedDocs,
      scores: {
        clinical: 92,
        feasibility: 90,
        security: 95,
        scalability: 88,
        team: 88,
        cost: 92
      },
      compositeScore: 91,
      evaluatorNotes: 'Automated initial intake compliance check passed. Ready for departmental technical review panel.'
    };

    onSubmit(bidData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Bid Submission Gate
              </span>
              <span className="text-[10px] text-slate-500 font-mono">DPIIT FastTrack</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1 font-display">
              Submit Innovation Proposal
            </h2>
            <p className="text-xs text-slate-500 truncate max-w-lg mt-0.5">
              For: {tender?.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Startup Info Summary */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-900">{currentUser?.org || 'HealthAI Technologies Pvt Ltd'}</p>
              <p className="text-[11px] text-blue-700 font-mono">DPIIT ID: {formData.dpiitId} • Verified Startup</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-white border border-emerald-200 px-2 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" /> GFR Exemption Eligible
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proposed Solution / Core Model Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. PulmoEdge AI Diagnostics Suite"
                value={formData.modelName}
                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Commercial Budget Quote (INR) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹2.8 Cr"
                value={formData.budgetQuote}
                onChange={(e) => setFormData({ ...formData, budgetQuote: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proposed Pilot Duration
              </label>
              <input
                type="text"
                value={formData.proposedTimeline}
                onChange={(e) => setFormData({ ...formData, proposedTimeline: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Claimed Benchmark / Accuracy
              </label>
              <input
                type="text"
                value={formData.accuracy}
                onChange={(e) => setFormData({ ...formData, accuracy: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technical &amp; Deployment Architecture
            </label>
            <textarea
              rows={2}
              value={formData.architecture}
              onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Capex Allocation
              </label>
              <input
                type="text"
                value={formData.capex}
                onChange={(e) => setFormData({ ...formData, capex: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opex / Maintenance
              </label>
              <input
                type="text"
                value={formData.opex}
                onChange={(e) => setFormData({ ...formData, opex: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Compliance & Document Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Verification Dossier Documents
            </label>
            <div className="space-y-2">
              {uploadedDocs.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">{doc.name}</span>
                    <span className="text-slate-400 text-[10px]">({doc.size})</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">SHA-256 Verified</span>
                </div>
              ))}

              <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-3 text-center cursor-pointer transition-colors block">
                <input type="file" onChange={handleAddMockFile} className="hidden" />
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>{mockUploading ? 'Hashing & Uploading...' : 'Upload Technical Whitepaper / ISO / Certifications'}</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Submit Proposal to State Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
