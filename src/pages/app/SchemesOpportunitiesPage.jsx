import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Building2, Sparkles, Search, Filter, PlusCircle, ArrowRight, 
  ExternalLink, CheckCircle2, ShieldCheck, Award, Clock, Users, 
  ChevronRight, IndianRupee, Layers, FileText, CheckSquare, X, 
  Sliders, Send, AlertCircle, Database, Check, MapPin, Eye,
  Download, Cpu, Radio, Shield, HelpCircle, Briefcase, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProcurement } from '../../context/ProcurementContext';
import { 
  CENTRAL_SCHEMES_DIRECTORY, 
  GOVERNMENT_SCHEMES, 
  STARTUP_OPPORTUNITIES, 
  SUCCESS_STORIES, 
  INITIAL_STARTUP_APPLICATIONS, 
  IMPACT_METRICS 
} from '../../services/schemesData';

export default function SchemesOpportunitiesPage() {
  const [searchParams] = useSearchParams();
  const { currentUser, notify } = useAuth();
  const { recordAudit } = useProcurement();

  // Active Tab: 'directory' | 'opportunities' | 'startup-dashboard' | 'govt-hub' | 'pilots' | 'impact' | 'admin-governance'
  const [activeTab, setActiveTab] = useState(
    currentUser?.role === 'Startup' ? 'startup-dashboard' :
    currentUser?.role === 'Procurement Officer' ? 'govt-hub' :
    currentUser?.role === 'Admin' ? 'admin-governance' : 'directory'
  );

  // Data States with LocalStorage persistence
  const [schemesList, setSchemesList] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_hub_schemes');
      return saved ? JSON.parse(saved) : [...GOVERNMENT_SCHEMES, ...CENTRAL_SCHEMES_DIRECTORY];
    } catch {
      return [...GOVERNMENT_SCHEMES, ...CENTRAL_SCHEMES_DIRECTORY];
    }
  });

  const [opportunitiesList, setOpportunitiesList] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_hub_opps');
      return saved ? JSON.parse(saved) : STARTUP_OPPORTUNITIES;
    } catch {
      return STARTUP_OPPORTUNITIES;
    }
  });

  const [applicationsList, setApplicationsList] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_hub_applications');
      return saved ? JSON.parse(saved) : INITIAL_STARTUP_APPLICATIONS;
    } catch {
      return INITIAL_STARTUP_APPLICATIONS;
    }
  });

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState('ALL');
  const [filterFundingType, setFilterFundingType] = useState('ALL');
  const [filterStage, setFilterStage] = useState('ALL');

  // Modal States
  const [showCreateSchemeModal, setShowCreateSchemeModal] = useState(false);
  const [showCreateOppModal, setShowCreateOppModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null);
  const [inspectingItem, setInspectingItem] = useState(null);

  // Sync to localStorage
  const persistSchemes = (updated) => {
    setSchemesList(updated);
    localStorage.setItem('govscale_hub_schemes', JSON.stringify(updated));
  };

  const persistOpportunities = (updated) => {
    setOpportunitiesList(updated);
    localStorage.setItem('govscale_hub_opps', JSON.stringify(updated));
  };

  const persistApplications = (updated) => {
    setApplicationsList(updated);
    localStorage.setItem('govscale_hub_applications', JSON.stringify(updated));
  };

  // Filtered Central Schemes Directory
  const filteredSchemes = useMemo(() => {
    return schemesList.filter(s => {
      const matchSearch = !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.agency?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.eligibility?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.sector?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSector = filterSector === 'ALL' || (s.sector && s.sector.includes(filterSector));
      const matchFunding = filterFundingType === 'ALL' || 
        (s.fundingType && s.fundingType.toLowerCase().includes(filterFundingType.toLowerCase())) ||
        (s.category && s.category.toLowerCase().includes(filterFundingType.toLowerCase()));
      const matchStage = filterStage === 'ALL' || (s.stage && s.stage.includes(filterStage));

      return matchSearch && matchSector && matchFunding && matchStage;
    });
  }, [schemesList, searchQuery, filterSector, filterFundingType, filterStage]);

  // Handle Startup Proposal Submission
  const handleProposalSubmit = (proposalData) => {
    const newApp = {
      id: `app_sch_${Date.now().toString().slice(-4)}`,
      schemeOrOppId: selectedSchemeForApply?.id || 'opp_custom',
      title: proposalData.title || selectedSchemeForApply?.name || 'Innovation Proposal',
      startupId: currentUser?.id || 'usr_startup_01',
      startupName: currentUser?.org || 'HealthAI Technologies Pvt Ltd',
      dpiitId: currentUser?.dpiitId || 'DPIIT-89241',
      department: selectedSchemeForApply?.department || selectedSchemeForApply?.agency || 'State Innovation Desk',
      sector: selectedSchemeForApply?.sector || 'HealthTech',
      budgetQuote: proposalData.budgetQuote || '₹2.5 Cr',
      timeline: proposalData.timeline || '90 Days Sandbox Pilot',
      trlLevel: proposalData.trlLevel || 'TRL 8',
      status: 'Submitted',
      solutionFit: proposalData.solutionFit,
      capabilityProof: proposalData.capabilityProof,
      submittedAt: new Date().toISOString().split('T')[0],
      governmentFeedback: 'Application under technical verification by State Departmental Evaluation Committee.',
      aiMatchScore: 94,
      aiMatchReason: `High-concordance AI fit for ${selectedSchemeForApply?.sector || 'GovTech'} priority criteria with verified TRL-8 prototype and state DPIIT accreditation.`
    };

    const updated = [newApp, ...applicationsList];
    persistApplications(updated);

    recordAudit(
      'SCHEME_APPLICATION_SUBMITTED',
      newApp.startupName,
      `Submitted proposal for "${newApp.title}" under ${newApp.department}. Quote: ${newApp.budgetQuote}.`
    );

    notify('Application Submitted', 'Your proposal was logged to the state registry and queued for technical review.', 'success');
    setShowApplyModal(false);
    setSelectedSchemeForApply(null);
  };

  // Handle Govt Scheme Creation
  const handleCreateScheme = (schemeData) => {
    const newScheme = {
      id: `gov_sch_${Date.now().toString().slice(-4)}`,
      status: 'Published',
      applicationsReceived: 0,
      startupsParticipating: 0,
      isOfficial: true,
      isDemo: true,
      ...schemeData
    };

    const updated = [newScheme, ...schemesList];
    persistSchemes(updated);

    recordAudit(
      'GOVT_SCHEME_POSTED',
      newScheme.department,
      `New scheme "${newScheme.name}" published with allocated budget of ${newScheme.budget}.`
    );

    notify('Scheme Published', 'Government scheme is now live on the marketplace.', 'success');
    setShowCreateSchemeModal(false);
  };

  // Handle Govt Opportunity Creation
  const handleCreateOpportunity = (oppData) => {
    const newOpp = {
      id: `opp_${Date.now().toString().slice(-4)}`,
      status: 'Open for Proposals',
      applicantsCount: 0,
      shortlistedStartup: 'Pending Review',
      isDemo: true,
      ...oppData
    };

    const updated = [newOpp, ...opportunitiesList];
    persistOpportunities(updated);

    recordAudit(
      'OPPORTUNITY_RFP_PUBLISHED',
      newOpp.department,
      `Departmental problem statement "${newOpp.title}" open for startup bidding. Budget: ${newOpp.budget}.`
    );

    notify('Opportunity Published', 'Departmental challenge opened for startup bidding.', 'success');
    setShowCreateOppModal(false);
  };

  // Government Reviews Application: Shortlist or Reject
  const handleApplicationStatus = (appId, newStatus, feedback) => {
    const updated = applicationsList.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: newStatus,
          governmentFeedback: feedback || (newStatus === 'Selected' ? 'Approved by technical committee for sandbox pilot.' : 'Proposal evaluated; feedback provided.')
        };
      }
      return a;
    });

    persistApplications(updated);

    recordAudit(
      `APPLICATION_${newStatus.toUpperCase()}`,
      currentUser?.name || 'Procurement Committee',
      `Application ${appId} marked as ${newStatus}.`
    );

    notify('Status Updated', `Application successfully moved to ${newStatus}.`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* 1. Header & GovScale Regulator / Marketplace Positioning */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                National Marketplace &amp; Regulatory Hub
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                GovScale Trust &amp; Verification Layer
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                Rule 149 GFR FastTrack
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
              Schemes &amp; Opportunities Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Centralized GovTech Innovation Marketplace: Government posts state schemes and problem RFPs, DPIIT startups propose verified solutions, and GovScale validates authenticity, orchestrates AI matching, and enforces statutory sandbox progression under GFR Rule 149.
            </p>
          </div>

          {/* Quick Action CTAs based on persona */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {['Procurement Officer', 'Admin'].includes(currentUser?.role) && (
              <>
                <button
                  onClick={() => setShowCreateSchemeModal(true)}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" /> Post State Scheme
                </button>
                <button
                  onClick={() => setShowCreateOppModal(true)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" /> Post Department RFP
                </button>
              </>
            )}

            {currentUser?.role === 'Startup' && (
              <button
                onClick={() => {
                  setSelectedSchemeForApply(schemesList[0]);
                  setShowApplyModal(true);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" /> Pitch Startup Solution
              </button>
            )}

            {!currentUser && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Users className="w-4 h-4" /> Sign In to Apply / Manage
              </Link>
            )}
          </div>
        </div>

        {/* Regulator Trust Banner */}
        <div className="p-3.5 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Zap className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>GovScale Role:</strong> Verified Statutory Registry • Real-time AI Capability Scorer • Cryptographic Audit Trail
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync with State Innovation Registry</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'directory' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Funding &amp; Schemes Directory</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeTab === 'directory' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {schemesList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'opportunities' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Departmental Opportunities &amp; RFPs</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeTab === 'opportunities' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {opportunitiesList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('startup-dashboard')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'startup-dashboard' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Startup Hub &amp; AI Recommendations</span>
            {currentUser?.role === 'Startup' && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                {applicationsList.length} Active
              </span>
            )}
          </button>

          {['Procurement Officer', 'Admin'].includes(currentUser?.role) && (
            <button
              onClick={() => setActiveTab('govt-hub')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'govt-hub' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Government Reviewer Desk</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                {applicationsList.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('pilots')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'pilots' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Active Pilots &amp; Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'impact' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Success Stories &amp; Impact</span>
          </button>

          {currentUser?.role === 'Admin' && (
            <button
              onClick={() => setActiveTab('admin-governance')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'admin-governance' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Governance &amp; Disputes</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CENTRAL FUNDING & SCHEMES DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls & Filter Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-tight">
                  Central &amp; State Innovation Funding Directory
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified funding schemes from DPIIT, DST, BIRAC/IMRB, NASSCOM, MeitY, and Maharashtra State Innovation Society.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search schemes, benefits, or agency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Sector</label>
                <select
                  value={filterSector}
                  onChange={(e) => setFilterSector(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
                >
                  <option value="ALL">All Sectors</option>
                  <option value="HealthTech">HealthTech &amp; MedTech</option>
                  <option value="DeepTech">DeepTech &amp; Hardware</option>
                  <option value="GovTech">GovTech &amp; Public Infra</option>
                  <option value="AgriTech">AgriTech</option>
                  <option value="AI">AI &amp; IoT</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Support Type</label>
                <select
                  value={filterFundingType}
                  onChange={(e) => setFilterFundingType(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
                >
                  <option value="ALL">All Support Types</option>
                  <option value="Grant">Grants (Equity-Free)</option>
                  <option value="Debt">Collateral-Free Debt / Loans</option>
                  <option value="Incubation">Incubation &amp; Credits</option>
                  <option value="Reimbursement">Patent &amp; IP Rebate</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Technology Stage</label>
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
                >
                  <option value="ALL">All Readiness Stages</option>
                  <option value="TRL 3">TRL 3-6 (PoC &amp; Prototype)</option>
                  <option value="TRL 7">TRL 7-8 (Sandbox Pilot Ready)</option>
                  <option value="TRL 9">TRL 9 (Commercial Scale)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {scheme.agency || scheme.department}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 font-display leading-snug">
                        {scheme.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      {scheme.category || scheme.fundingType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {scheme.eligibility}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Maximum Support</span>
                      <span className="font-mono font-bold text-blue-700">{scheme.budget}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Application Deadline</span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {scheme.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Verification / Citation Badge */}
                  {scheme.officialSource && (
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                      <span className="truncate">Source: <strong className="text-slate-700">{scheme.officialSource}</strong></span>
                      <span className="text-[10px] text-emerald-700 font-medium shrink-0 ml-2">Verified: {scheme.lastVerified}</span>
                    </div>
                  )}

                  {scheme.isDemo && (
                    <div className="text-[10px] text-amber-700 font-mono bg-amber-50 border border-amber-200 px-2 py-0.5 rounded w-fit">
                      Demo Data • Simulated State Sandbox Scheme
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                  <button
                    onClick={() => setInspectingItem(scheme)}
                    className="text-xs text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Eligibility &amp; Criteria
                  </button>

                  {scheme.applicationLink?.startsWith('http') ? (
                    <a
                      href={scheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      Official Portal <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedSchemeForApply(scheme);
                        setShowApplyModal(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                    >
                      Apply via GovScale <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DEPARTMENTAL OPPORTUNITIES & RFPS */}
      {/* ========================================================================= */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-tight">
                Active Departmental Problem Statements &amp; RFPs
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-world state challenges open for 90-day sandbox pilots and GFR Rule 149 direct commercial scaling.
              </p>
            </div>
            {['Procurement Officer', 'Admin'].includes(currentUser?.role) && (
              <button
                onClick={() => setShowCreateOppModal(true)}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <PlusCircle className="w-4 h-4" /> Post New Problem RFP
              </button>
            )}
          </div>

          <div className="space-y-4">
            {opportunitiesList.map((opp) => (
              <div
                key={opp.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {opp.department}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {opp.sector}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      opp.status === 'Pilot Running' ? 'bg-blue-100 text-blue-800' :
                      opp.status === 'Evaluation Gate' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {opp.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display">{opp.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{opp.problem}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                    <span className="font-mono font-bold text-blue-700">{opp.budget}</span>
                    <span className="text-slate-300">•</span>
                    <span>Duration: <strong className="text-slate-700">{opp.duration}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {opp.district}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" /> {opp.applicantsCount} Applicants</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-700">
                    <span className="font-semibold text-slate-800">Required Capabilities: </span>
                    <span>{opp.requiredCapabilities}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 self-end lg:self-center w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedSchemeForApply(opp);
                      setShowApplyModal(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Pitch / Bid
                  </button>
                  <button
                    onClick={() => setInspectingItem(opp)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STARTUP DASHBOARD & AI RECOMMENDATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'startup-dashboard' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Smart AI Matching Spotlight Box */}
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-sm border border-blue-800/40 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                  AI-Powered Scheme &amp; Opportunity Matcher
                </h3>
              </div>
              <span className="text-[11px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700/50 px-2.5 py-0.5 rounded">
                TRL-8 Profile: {currentUser?.org || 'HealthAI Technologies'}
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              GovScale’s automated matching engine analyzes your registered DPIIT domain, TRL certifications, and hospital validation logs to surface high-concordance state challenges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-white/10 rounded-lg border border-white/10 text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-300">Top Match: Diagnostic Triage Sandbox</span>
                  <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">96% Fit</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong>Why it matched:</strong> Matches your validated clinical algorithm (PulmoEdge v4.2) and zero-cloud on-premise requirement at Aundh District Hospital.
                </p>
                <button
                  onClick={() => {
                    setSelectedSchemeForApply(schemesList[0]);
                    setShowApplyModal(true);
                  }}
                  className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-[11px] font-semibold"
                >
                  Apply with 1-Click FastTrack →
                </button>
              </div>

              <div className="p-3.5 bg-white/10 rounded-lg border border-white/10 text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-300">Secondary Match: MSInS Scaling Grant</span>
                  <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">91% Fit</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong>Why it matched:</strong> ₹15 Lakhs equity-free scaling grant for Maharashtra-headquartered startups advancing past TRL-7.
                </p>
                <button
                  onClick={() => {
                    setSelectedSchemeForApply(schemesList[2]);
                    setShowApplyModal(true);
                  }}
                  className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-[11px] font-semibold"
                >
                  Claim Grant Eligibility →
                </button>
              </div>
            </div>

            <div className="text-[11px] text-blue-200/80 italic flex items-center gap-1.5 pt-1 border-t border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Trust Protocol: Recommendations are algorithmic aids. Statutory procurement award decisions are executed solely by IAS/DPC committees.</span>
            </div>
          </div>

          {/* Startup Submitted Proposals Tracker */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">My Submitted Proposals &amp; Sandbox Pipeline</h3>
                <p className="text-xs text-slate-500">Track real-time government review status, committee feedback, and pilot deployment stage.</p>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                {applicationsList.length} Active Tracks
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {applicationsList.map((app) => (
                <div key={app.id} className="p-5 hover:bg-slate-50/60 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          App #{app.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{app.department}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          app.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Selected' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{app.title}</h4>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-blue-700 block">{app.budgetQuote}</span>
                      <span className="text-[10px] text-slate-400">Submitted: {app.submittedAt}</span>
                    </div>
                  </div>

                  {/* Workflow Lifecycle Stepper */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="grid grid-cols-6 gap-1 text-center">
                      {[
                        { step: 'Draft', done: true },
                        { step: 'Submitted', done: true },
                        { step: 'Under Review', done: ['Under Review', 'Selected', 'Active', 'Completed'].includes(app.status) },
                        { step: 'Selected', done: ['Selected', 'Active', 'Completed'].includes(app.status) },
                        { step: 'Active Sandbox', done: ['Active', 'Completed'].includes(app.status) },
                        { step: 'GFR 149 Award', done: app.status === 'Completed' }
                      ].map((st, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            st.done ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {st.done ? '✓' : i + 1}
                          </div>
                          <span className={`text-[10px] mt-1 font-medium truncate w-full ${st.done ? 'text-blue-900 font-semibold' : 'text-slate-400'}`}>
                            {st.step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Government Feedback & AI Match Context */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">State Feedback</span>
                      <p className="text-slate-700 italic">"{app.governmentFeedback}"</p>
                    </div>
                    <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                      <span className="text-[10px] font-bold uppercase text-blue-600 block mb-1">AI Recommendation Context</span>
                      <p className="text-blue-950">{app.aiMatchReason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GOVERNMENT HUB & PILOT MANAGER */}
      {/* ========================================================================= */}
      {activeTab === 'govt-hub' && (
        <div className="space-y-6 animate-fade-in">
          {/* Action Header */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-tight">
                Departmental Scheme &amp; Proposal Evaluation Desk
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review startup applications, grant sandbox pilot clearances, and verify clinical/field telemetry for GFR Rule 149 awards.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreateSchemeModal(true)}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" /> New Scheme Notice
              </button>
              <button
                onClick={() => setShowCreateOppModal(true)}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" /> New Problem RFP
              </button>
            </div>
          </div>

          {/* Incoming Applications Queue */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-display">Incoming Startup Proposals Queue</h3>
              <span className="text-xs font-mono text-slate-500">{applicationsList.length} Proposals Submitted</span>
            </div>

            <div className="divide-y divide-slate-100">
              {applicationsList.map((app) => (
                <div key={app.id} className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        {app.dpiitId}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {app.trlLevel}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        app.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Selected' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {app.title} — <span className="text-slate-600 font-medium">{app.startupName}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{app.solutionFit}</p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span>Commercial Quote: <strong className="text-blue-700 font-mono">{app.budgetQuote}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span>Timeline: <strong>{app.timeline}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-medium">AI Fit: {app.aiMatchScore}%</span>
                    </div>
                  </div>

                  {/* Actions for Government Officials */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    {app.status !== 'Selected' && app.status !== 'Active' && (
                      <button
                        onClick={() => handleApplicationStatus(app.id, 'Selected', 'Technical Evaluation Committee shortlisted proposal for 90-day sandbox pilot.')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve Sandbox
                      </button>
                    )}

                    {app.status === 'Selected' && (
                      <button
                        onClick={() => handleApplicationStatus(app.id, 'Active', 'Pilot officially active with IoT telemetry streaming.')}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
                      >
                        <Radio className="w-3.5 h-3.5 animate-pulse" /> Launch Telemetry
                      </button>
                    )}

                    {app.status !== 'Rejected' && (
                      <button
                        onClick={() => handleApplicationStatus(app.id, 'Rejected', 'Proposal did not meet state clinical accuracy benchmark.')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-medium"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ACTIVE PILOTS & TELEMETRY */}
      {/* ========================================================================= */}
      {activeTab === 'pilots' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-tight">
                Live Sandbox Telemetry &amp; Field Trials (Stage 03)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated statutory proof engine streaming cryptographic validation records from district hospitals and highway corridors.
              </p>
            </div>
            <Link
              to="/pilots"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Open Dedicated Telemetry Console →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Primary Healthcare Pilot (Day 74 of 90)
                </span>
                <span className="text-xs font-mono font-bold text-blue-700">96.4% Accuracy</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">PulmoEdge Clinical Diagnostic Core</h3>
                <p className="text-xs text-slate-500 mt-0.5">Aundh District Hospital, Pune • 32 Edge Hospital Nodes</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Sandbox Trial Progress</span>
                  <span className="text-blue-700">82% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[82%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Patients Screened</span>
                  <p className="text-sm font-bold text-slate-800">14,280 Verified</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Time Saved</span>
                  <p className="text-sm font-bold text-emerald-700">42 Mins / Patient</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  PWD Infrastructure Pilot (Day 48 of 60)
                </span>
                <span className="text-xs font-mono font-bold text-blue-700">93.2% Concordance</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">RoadVision Edge Pothole Telemetry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Samruddhi Mahamarg Corridor • PWD Division 4</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Trial Progress</span>
                  <span className="text-blue-700">80% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[80%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Corridor Audited</span>
                  <p className="text-sm font-bold text-slate-800">250 km Highway</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Defects Logged</span>
                  <p className="text-sm font-bold text-blue-700">3,120 Geotagged</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: SUCCESS STORIES & IMPACT DASHBOARD */}
      {/* ========================================================================= */}
      {activeTab === 'impact' && (
        <div className="space-y-6 animate-fade-in">
          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Marketplace Value</span>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-2">{IMPACT_METRICS.totalSchemesValue}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">Across 16 schemes</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Startups Connected</span>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 font-display mt-2">{IMPACT_METRICS.startupsConnected}</p>
              <p className="text-[11px] text-slate-500 mt-1">DPIIT Verified</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pilot Success Rate</span>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600 font-display mt-2">{IMPACT_METRICS.pilotSuccessRate}</p>
              <p className="text-[11px] text-slate-500 mt-1">Zero False-Negatives</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Districts Impacted</span>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600 font-display mt-2">{IMPACT_METRICS.districtsCovered}</p>
              <p className="text-[11px] text-slate-500 mt-1">Statewide Scale</p>
            </div>
          </div>

          {/* Detailed Success Stories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-tight">
              Evidence-Backed Procurement Case Studies
            </h3>

            {SUCCESS_STORIES.map((story) => (
              <div key={story.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Completed Sandbox Pilot → Commercial Award
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{story.solutionName} — {story.startupName}</h4>
                    <p className="text-xs text-slate-500">{story.department} • {story.district}</p>
                  </div>
                  <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                    Rule 149 GFR Certified
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {story.impactMetrics.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg text-xs">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">{m.label}</span>
                      <span className="text-sm font-bold text-slate-800 mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                  <p className="italic font-serif leading-relaxed text-slate-800">"{story.quote}"</p>
                  <p className="font-semibold text-slate-900 text-right">— {story.founder}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {story.procurementAward}
                  </span>
                  <Link to="/contracts" className="text-blue-600 hover:underline font-semibold">
                    View Commercial Dossier →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ADMIN GOVERNANCE & DISPUTES */}
      {/* ========================================================================= */}
      {activeTab === 'admin-governance' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-display uppercase tracking-tight">
                State Administrator Governance &amp; Regulatory Oversight
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorize departmental schemes, resolve startup disputes, verify DPIIT certificates, and audit platform transactions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2">
                <span className="font-bold text-purple-900 block">DPIIT Verification Bridge</span>
                <p className="text-purple-800">Automated verification of startup incorporation status via Ministry of Commerce API.</p>
                <Link to="/admin/verifications" className="inline-block text-purple-700 font-semibold hover:underline">
                  Open Verification Queue →
                </Link>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                <span className="font-bold text-blue-900 block">Cryptographic Audit Ledger</span>
                <p className="text-blue-800">Every application, review scorecard, and scheme post is hashed into SHA-256 Merkle blocks.</p>
                <Link to="/audit" className="inline-block text-blue-700 font-semibold hover:underline">
                  Inspect Audit Trail →
                </Link>
              </div>

              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                <span className="font-bold text-emerald-900 block">CAG Regulatory Compliance Report</span>
                <p className="text-emerald-800">Generate official export dossiers for state audit committees and Departmental Procurement Committees.</p>
                <button
                  onClick={() => notify('Report Exported', 'Statutory compliance ledger exported for CAG review.', 'success')}
                  className="px-2.5 py-1 bg-emerald-600 text-white rounded font-semibold text-[11px]"
                >
                  Generate Audit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: SUBMIT STARTUP PROPOSAL */}
      {/* ========================================================================= */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Startup Application Gate
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 font-display">
                  Submit Proposal for {selectedSchemeForApply?.name || selectedSchemeForApply?.title || 'State Opportunity'}
                </h3>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                handleProposalSubmit({
                  title: fd.get('title'),
                  solutionFit: fd.get('solutionFit'),
                  capabilityProof: fd.get('capabilityProof'),
                  timeline: fd.get('timeline'),
                  budgetQuote: fd.get('budgetQuote'),
                  trlLevel: fd.get('trlLevel')
                });
              }}
              className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proposal / Solution Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={`Solution for ${selectedSchemeForApply?.name || 'Department RFP'}`}
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Commercial Quote (INR) *</label>
                  <input
                    name="budgetQuote"
                    required
                    defaultValue="₹2.8 Cr"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Proposed Sandbox Timeline *</label>
                  <input
                    name="timeline"
                    required
                    defaultValue="90 Days Sandbox Pilot"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">TRL Readiness Stage *</label>
                <select name="trlLevel" className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 bg-white">
                  <option value="TRL 8 (Flight/Field Qualified)">TRL 8 (Field Qualified &amp; Operational)</option>
                  <option value="TRL 7 (Prototype demonstrated in operational environment)">TRL 7 (Prototype Validated)</option>
                  <option value="TRL 9 (Full Commercial Deployment Proven)">TRL 9 (Commercial Scale Proven)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Solution Fit &amp; Problem Statement Alignment *</label>
                <textarea
                  name="solutionFit"
                  rows={3}
                  required
                  placeholder="Describe why your technology directly solves the departmental challenge..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Capability Proof &amp; Certifications *</label>
                <textarea
                  name="capabilityProof"
                  rows={2}
                  required
                  placeholder="e.g. ISO 13485 certificate, CERT-In audit clearance, laboratory test reports..."
                  defaultValue="DPIIT Registered (DPIIT-89241), ISO 13485 certified, CERT-In Level 4 tested"
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-[11px] text-blue-900">
                <span className="font-semibold">AI Match Pre-Check:</span> Your profile exhibits 94% compatibility with this department statement. Submission will be cryptographically hashed to the state ledger.
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit to State Committee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CREATE NEW GOVERNMENT SCHEME */}
      {/* ========================================================================= */}
      {showCreateSchemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 font-display">Create &amp; Publish Government Scheme</h3>
              <button onClick={() => setShowCreateSchemeModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                handleCreateScheme({
                  name: fd.get('name'),
                  department: fd.get('department'),
                  sector: fd.get('sector'),
                  budget: fd.get('budget'),
                  fundingType: fd.get('fundingType'),
                  eligibility: fd.get('eligibility'),
                  benefits: fd.get('benefits'),
                  deadline: fd.get('deadline'),
                  applicationLink: '/schemes-opportunities'
                });
              }}
              className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scheme Name *</label>
                <input name="name" required placeholder="e.g. State AgriTech Drone Telemetry Sandbox 2026" className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <input name="department" required defaultValue={currentUser?.org || 'Public Health Department'} className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector *</label>
                  <input name="sector" required placeholder="e.g. HealthTech, IoT, Drone" className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Allocated Budget *</label>
                  <input name="budget" required placeholder="e.g. ₹3.5 Cr" className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deadline *</label>
                  <input name="deadline" type="date" required defaultValue="2026-11-30" className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Funding &amp; Support Type *</label>
                <input name="fundingType" required defaultValue="Sandbox Pilot Grant + Procurement Pipeline" className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria *</label>
                <textarea name="eligibility" rows={2} required placeholder="DPIIT recognized startups with TRL-7+ prototypes..." className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scheme Benefits &amp; Procurement Pathway *</label>
                <textarea name="benefits" rows={2} required placeholder="90-day sandbox pilot funding, testbed access, Rule 149 GFR commercial order..." className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowCreateSchemeModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Publish Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE NEW OPPORTUNITY / RFP */}
      {/* ========================================================================= */}
      {showCreateOppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 font-display">Post Departmental Challenge RFP</h3>
              <button onClick={() => setShowCreateOppModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                handleCreateOpportunity({
                  title: fd.get('title'),
                  department: fd.get('department'),
                  sector: fd.get('sector'),
                  problem: fd.get('problem'),
                  budget: fd.get('budget'),
                  duration: fd.get('duration'),
                  requiredCapabilities: fd.get('requiredCapabilities'),
                  district: fd.get('district') || 'Statewide Maharashtra'
                });
              }}
              className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Problem Statement Title *</label>
                <input name="title" required placeholder="e.g. AI Vision for samruddhi Highway Speed Enforcement" className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <input name="department" required defaultValue={currentUser?.org || 'Public Works Department'} className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector *</label>
                  <input name="sector" required placeholder="e.g. InfraTech, IoT" className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Problem Description &amp; Operational Pain Point *</label>
                <textarea name="problem" rows={3} required placeholder="Describe the current operational challenge and state impact..." className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sandbox Budget *</label>
                  <input name="budget" required placeholder="e.g. ₹2.2 Cr" className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Trial Duration *</label>
                  <input name="duration" required defaultValue="90 Days Sandbox Trial" className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Required Capabilities &amp; TRL *</label>
                <textarea name="requiredCapabilities" rows={2} required placeholder="TRL 8+, zero cloud latency, ISO certification..." className="w-full p-2.5 border border-slate-200 rounded-lg" />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowCreateOppModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Publish Problem RFP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: DETAILS INSPECTOR */}
      {/* ========================================================================= */}
      {inspectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {inspectingItem.agency || inspectingItem.department}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 font-display">{inspectingItem.name || inspectingItem.title}</h3>
              </div>
              <button onClick={() => setInspectingItem(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Eligibility Criteria:</span>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">{inspectingItem.eligibility || inspectingItem.requiredCapabilities}</p>
              </div>

              {inspectingItem.benefits && (
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">Funding &amp; Benefits:</span>
                  <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">{inspectingItem.benefits}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Allocated Support</span>
                  <p className="font-mono font-bold text-blue-700 text-sm">{inspectingItem.budget}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Deadline</span>
                  <p className="font-semibold text-slate-800 text-sm">{inspectingItem.deadline || inspectingItem.duration}</p>
                </div>
              </div>

              {inspectingItem.officialSource && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-[11px] text-emerald-900 flex items-center justify-between">
                  <span>Source: {inspectingItem.officialSource}</span>
                  <span>Verified: {inspectingItem.lastVerified}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button onClick={() => setInspectingItem(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold">
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedSchemeForApply(inspectingItem);
                  setInspectingItem(null);
                  setShowApplyModal(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Proceed to Proposal Pitch →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
