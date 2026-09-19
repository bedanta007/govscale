import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_CHALLENGES, 
  INITIAL_STARTUPS, 
  INITIAL_PILOTS, 
  AUDIT_TRAIL, 
  MAHARASHTRA_DISTRICTS 
} from '../services/govScaleData';

const ProcurementContext = createContext(null);

export const INITIAL_BIDS = [
  {
    id: 'bid_901',
    tenderId: 'chg_mh_health_01',
    tenderTitle: 'AI-Powered Diagnostic Triage for District Hospitals',
    department: 'Public Health Department',
    startupId: 'usr_startup_01',
    startupName: 'HealthAI Technologies Pvt Ltd',
    dpiitId: 'DPIIT-89241',
    status: 'Shortlisted', // Draft, Submitted, Under Review, Shortlisted, Awarded, Rejected
    stage: 'Pilot Running',
    submittedAt: '2026-09-12',
    evaluatedAt: '2026-09-15',
    budgetQuote: '₹3.2 Cr',
    proposedTimeline: '90 Days Sandbox',
    techProposal: {
      modelName: 'PulmoEdge v4.2 Diagnostic Core',
      accuracy: '96.4%',
      latency: '7.8 mins / batch',
      hardwareRequirements: 'Standard x86 hospital server (no high-cost GPU required)',
      architecture: 'On-premise zero-cloud patient data anonymization engine'
    },
    financialProposal: {
      capex: '₹1.8 Cr (Edge Hardware & Software Licensing)',
      opex: '₹1.4 Cr (Annual Maintenance, Calibration & Onsite Support)',
      savingsEstimate: '₹1.24 Cr / year in avoided tertiary hospital transfers'
    },
    documents: [
      { name: 'Technical_Whitepaper_PulmoEdge.pdf', size: '2.4 MB', verified: true },
      { name: 'ISO_13485_Medical_Certification.pdf', size: '1.1 MB', verified: true },
      { name: 'CERT_In_Cybersecurity_Compliance.pdf', size: '890 KB', verified: true }
    ],
    scores: {
      clinical: 96,
      feasibility: 94,
      security: 98,
      scalability: 92,
      team: 90,
      cost: 95
    },
    compositeScore: 94,
    evaluatorNotes: 'Clinical algorithm exhibits 96.4% diagnostic concordance with senior radiologist audit at Aundh District Hospital. Zero false-negative acute pneumonia cases in 14,280 screenings. Fully compliant with DPDP Act 2023.'
  },
  {
    id: 'bid_902',
    tenderId: 'chg_mh_transport_02',
    tenderTitle: 'Real-Time Pothole & Road Quality Telemetry System',
    department: 'Public Works Department (PWD)',
    startupId: 'usr_startup_01',
    startupName: 'HealthAI Technologies Pvt Ltd',
    dpiitId: 'DPIIT-89241',
    status: 'Under Review',
    stage: 'Evaluation Gate',
    submittedAt: '2026-09-16',
    budgetQuote: '₹2.1 Cr',
    proposedTimeline: '60 Days Pilot',
    techProposal: {
      modelName: 'RoadVision Edge AI Sensor',
      accuracy: '93.2%',
      latency: '<1 second inference',
      hardwareRequirements: 'Mountable vehicle sensor boxes with 4G/5G telemetry',
      architecture: 'Geo-tagged GPS mapping with automatic PWD distress ticketing'
    },
    financialProposal: {
      capex: '₹1.2 Cr',
      opex: '₹0.9 Cr',
      savingsEstimate: '₹4.5 Cr in delayed road resurfacing costs'
    },
    documents: [
      { name: 'RoadVision_Sensor_Spec.pdf', size: '3.1 MB', verified: true },
      { name: 'PWD_Pilot_Deployment_Plan.pdf', size: '1.4 MB', verified: true }
    ],
    scores: {
      clinical: 90,
      feasibility: 92,
      security: 94,
      scalability: 88,
      team: 86,
      cost: 91
    },
    compositeScore: 90,
    evaluatorNotes: 'Sensor accuracy validated on 250 km stretch of Samruddhi Mahamarg. Rapid reporting of surface distress.'
  },
  {
    id: 'bid_903',
    tenderId: 'chg_mh_water_03',
    tenderTitle: 'Smart Water Metering & Acoustic Pipeline Leak Detection',
    department: 'Water Resources Department',
    startupId: 'usr_startup_01',
    startupName: 'HealthAI Technologies Pvt Ltd',
    dpiitId: 'DPIIT-89241',
    status: 'Draft',
    stage: 'Draft Proposal',
    submittedAt: null,
    budgetQuote: '₹1.8 Cr',
    proposedTimeline: '90 Days Trial',
    techProposal: {
      modelName: 'HydroSense IoT Acoustic Array',
      accuracy: '91.8%',
      latency: '<15 min leak localization'
    },
    financialProposal: {
      capex: '₹1.0 Cr',
      opex: '₹0.8 Cr'
    },
    documents: [],
    scores: null,
    compositeScore: null
  }
];

export const INITIAL_CONTRACTS = [
  {
    id: 'cnt_mh_2026_01',
    tenderId: 'chg_mh_health_01',
    tenderTitle: 'AI-Powered Diagnostic Triage for District Hospitals',
    department: 'Public Health Department',
    startupId: 'usr_startup_01',
    startupName: 'HealthAI Technologies Pvt Ltd',
    contractValue: '₹3.2 Cr',
    awardDate: '2026-09-18',
    startDate: '2026-10-01',
    duration: '12 Months (Extendable to 36 Months)',
    status: 'Awarded - Active',
    ruleExemption: 'Rule 149 GFR Exemption (Direct Commercial Scale upon verified sandbox)',
    dpcApproved: true,
    dossierPdfReady: true,
    nodesCovered: 148,
    districtsTargeted: 36
  }
];

export function ProcurementProvider({ children }) {
  // Tenders / Challenges
  const [tenders, setTenders] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_tenders');
      return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
    } catch {
      return INITIAL_CHALLENGES;
    }
  });

  // Bids
  const [bids, setBids] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_bids');
      return saved ? JSON.parse(saved) : INITIAL_BIDS;
    } catch {
      return INITIAL_BIDS;
    }
  });

  // Contracts
  const [contracts, setContracts] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_contracts');
      return saved ? JSON.parse(saved) : INITIAL_CONTRACTS;
    } catch {
      return INITIAL_CONTRACTS;
    }
  });

  // Pilots & Telemetry
  const [pilots, setPilots] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_pilots');
      return saved ? JSON.parse(saved) : INITIAL_PILOTS;
    } catch {
      return INITIAL_PILOTS;
    }
  });

  // Blockchain Ledger Audits
  const [audits, setAudits] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_audits');
      return saved ? JSON.parse(saved) : AUDIT_TRAIL;
    } catch {
      return AUDIT_TRAIL;
    }
  });

  // Notifications
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'notif_1',
      title: 'Bid Shortlisted for 90-Day Trial',
      description: 'Your bid for AI Diagnostic Triage was approved by the technical evaluation panel.',
      time: '15 mins ago',
      read: false,
      type: 'success',
      link: '/bids/bid_901'
    },
    {
      id: 'notif_2',
      title: 'New Tender Published: Forest IoT Early Warning',
      description: 'Environment & Forest Department opened RFP with ₹2.0 Cr sandbox budget.',
      time: '2 hours ago',
      read: false,
      type: 'info',
      link: '/tenders/chg_mh_forest_04'
    },
    {
      id: 'notif_3',
      title: 'Telemetry Batch Recorded on Ledger',
      description: '24 new clinical screenings hashed into Merkle block #148,292.',
      time: '4 hours ago',
      read: true,
      type: 'ledger',
      link: '/audit'
    }
  ]);

  // Persist state
  useEffect(() => {
    localStorage.setItem('govscale_tenders', JSON.stringify(tenders));
  }, [tenders]);

  useEffect(() => {
    localStorage.setItem('govscale_bids', JSON.stringify(bids));
  }, [bids]);

  useEffect(() => {
    localStorage.setItem('govscale_contracts', JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem('govscale_pilots', JSON.stringify(pilots));
  }, [pilots]);

  useEffect(() => {
    localStorage.setItem('govscale_audits', JSON.stringify(audits));
  }, [audits]);

  // Audit action helper
  const recordAudit = (action, actor, details) => {
    const newAudit = {
      id: `aud_${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString() + " IST",
      action,
      actor,
      details,
      hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      verified: true,
      blockNumber: 148290 + audits.length
    };
    setAudits(prev => [newAudit, ...prev]);
    return newAudit;
  };

  // Add Tender
  const addTender = (tenderData) => {
    const newTender = {
      id: `chg_mh_${Date.now().toString().slice(-4)}`,
      stage: 'RFP Open',
      applicantsCount: 0,
      shortlistedCount: 0,
      tags: ['GovTech', 'Maharashtra', 'DPIIT FastTrack'],
      ...tenderData
    };
    setTenders(prev => [newTender, ...prev]);
    recordAudit(
      'TENDER_PUBLISHED_ON_PORTAL',
      newTender.department,
      `Tender "${newTender.title}" (${newTender.id}) posted with budget ${newTender.budget}.`
    );
    return newTender;
  };

  // Submit Bid
  const submitBid = (bidData) => {
    const newBid = {
      id: `bid_${Date.now().toString().slice(-4)}`,
      status: 'Submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      ...bidData
    };

    setBids(prev => {
      // replace if draft exists
      const existingIdx = prev.findIndex(b => b.id === newBid.id || (b.tenderId === newBid.tenderId && b.status === 'Draft'));
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx] = newBid;
        return copy;
      }
      return [newBid, ...prev];
    });

    // Increment applicants on tender
    setTenders(prev => prev.map(t => {
      if (t.id === newBid.tenderId) {
        return { ...t, applicantsCount: (t.applicantsCount || 0) + 1 };
      }
      return t;
    }));

    recordAudit(
      'BID_SUBMITTED_BY_STARTUP',
      newBid.startupName || 'DPIIT Startup',
      `Proposal submitted for tender ${newBid.tenderId} with quote ${newBid.budgetQuote}.`
    );

    return newBid;
  };

  // Save Draft Bid
  const saveDraftBid = (bidData) => {
    const draftBid = {
      id: bidData.id || `bid_draft_${Date.now().toString().slice(-4)}`,
      status: 'Draft',
      ...bidData
    };
    setBids(prev => {
      const idx = prev.findIndex(b => b.id === draftBid.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = draftBid;
        return copy;
      }
      return [draftBid, ...prev];
    });
    return draftBid;
  };

  // Score Bid (Evaluator)
  const scoreBid = (bidId, scores, comments, evaluatorName) => {
    const compositeScore = Math.round(
      Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
    );

    setBids(prev => prev.map(b => {
      if (b.id === bidId) {
        return {
          ...b,
          status: compositeScore >= 80 ? 'Shortlisted' : 'Under Review',
          scores,
          compositeScore,
          evaluatorNotes: comments,
          evaluatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return b;
    }));

    recordAudit(
      'EVALUATION_SCORECARD_SIGNED',
      evaluatorName || 'Technical Evaluator Panel',
      `Scored bid ${bidId} with composite score ${compositeScore}/100. Status: ${compositeScore >= 80 ? 'Shortlisted' : 'Under Review'}.`
    );
  };

  // Award Contract
  const awardContract = (tenderId, bidId, value, user) => {
    const targetTender = tenders.find(t => t.id === tenderId);
    const targetBid = bids.find(b => b.id === bidId);

    const newContract = {
      id: `cnt_mh_${Date.now().toString().slice(-4)}`,
      tenderId,
      tenderTitle: targetTender ? targetTender.title : 'Public Innovation Tender',
      department: targetTender ? targetTender.department : 'State Department',
      startupId: targetBid ? targetBid.startupId : 'usr_startup_01',
      startupName: targetBid ? targetBid.startupName : 'HealthAI Technologies Pvt Ltd',
      contractValue: value || targetBid?.budgetQuote || '₹3.2 Cr',
      awardDate: new Date().toISOString().split('T')[0],
      startDate: new Date().toISOString().split('T')[0],
      duration: '12 Months (Extendable to 36 Months)',
      status: 'Awarded - Active',
      ruleExemption: 'Rule 149 GFR Direct Award (State Sandbox Certified)',
      dpcApproved: true,
      dossierPdfReady: true,
      nodesCovered: 148,
      districtsTargeted: 36
    };

    setContracts(prev => [newContract, ...prev]);

    setBids(prev => prev.map(b => b.id === bidId ? { ...b, status: 'Awarded' } : b));
    setTenders(prev => prev.map(t => t.id === tenderId ? { ...t, stage: 'Commercial Scale Awarded' } : t));

    recordAudit(
      'DPC_CONTRACT_AWARD_FINALIZED',
      user?.name || 'Departmental Procurement Committee',
      `Commercial award of ${newContract.contractValue} approved under GFR Rule 149 exemption for ${newContract.startupName}.`
    );

    return newContract;
  };

  // Simulate Telemetry Tick
  const simulateTelemetryTick = (pilotId) => {
    setPilots(prev => prev.map(p => {
      if (p.id === pilotId || !pilotId) {
        const newPatients = p.patientsScreened + 24;
        const newProgress = Math.min(100, p.progress + 1);
        return {
          ...p,
          patientsScreened: newPatients,
          progress: newProgress,
          telemetryStream: [
            ...p.telemetryStream,
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), patients: newPatients, accuracy: 96.5 }
          ]
        };
      }
      return p;
    }));

    recordAudit(
      'LIVE_TELEMETRY_RECORD_COMMITTED',
      'Telemetry Field IoT Node',
      'Batch of 24 live patient diagnosis readings signed and committed to Merkle tree.'
    );
  };

  const markNotificationRead = (id) => {
    setNotificationsList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <ProcurementContext.Provider value={{
      tenders,
      bids,
      contracts,
      pilots,
      audits,
      districts: MAHARASHTRA_DISTRICTS,
      notificationsList,
      addTender,
      submitBid,
      saveDraftBid,
      scoreBid,
      awardContract,
      simulateTelemetryTick,
      recordAudit,
      markNotificationRead
    }}>
      {children}
    </ProcurementContext.Provider>
  );
}

export function useProcurement() {
  const context = useContext(ProcurementContext);
  if (!context) {
    throw new Error('useProcurement must be used within a ProcurementProvider');
  }
  return context;
}
