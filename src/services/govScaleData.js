// ==========================================
// GOVSCALE RICH DEMO DATASETS (SIH 2026 - SIH26136)
// State Innovation Procurement & Pilot Evidence Engine
// ==========================================

export const DEMO_ROLES = [
  {
    role: "Public Citizen (Open Access)",
    name: "Open Citizen & Hackathon Evaluator",
    title: "Public Citizen & Innovation Watchdog",
    org: "Open Governance Portal • Government of Maharashtra",
    email: "citizen@govscale.maharashtra.gov.in",
    avatar: "OC",
    color: "bg-teal-600",
    badge: "Open Public Access"
  },
  {
    role: "Government Officer",
    name: "Dr. Rajeshwar Deshmukh, IAS",
    title: "Director of Digital Health & Hospital Administration",
    org: "Public Health Department, Govt of Maharashtra",
    email: "rajeshwar.deshmukh@health.maharashtra.gov.in",
    avatar: "RD",
    color: "bg-blue-600",
    badge: "Dept Officer"
  },
  {
    role: "GovTech Evaluator",
    name: "Dr. Ananya Kulkarni",
    title: "Principal Innovation Evaluator (GovTech Panel)",
    org: "IIT Bombay Healthcare AI Research Cell & DPIIT Panel",
    email: "ananya.kulkarni@iitb.ac.in",
    avatar: "AK",
    color: "bg-purple-600",
    badge: "Independent Expert"
  },
  {
    role: "Startup Founder",
    name: "Vikram Malhotra",
    title: "Founder & Chief Executive Officer",
    org: "HealthAI Technologies Pvt Ltd (DPIIT-89241)",
    email: "vikram@healthai.tech",
    avatar: "VM",
    color: "bg-emerald-600",
    badge: "DPIIT Verified Startup"
  },
  {
    role: "State Admin",
    name: "Sanjay Patil, IAS",
    title: "State Procurement Governance Administrator",
    org: "Maharashtra State Innovation Society (MSInS), Mantralaya",
    email: "admin@govscale.maharashtra.gov.in",
    avatar: "SP",
    color: "bg-amber-600",
    badge: "MSInS Admin"
  }
];

export const INITIAL_CHALLENGES = [
  {
    id: "chg_mh_health_01",
    title: "AI-Powered Diagnostic Triage for District Hospitals",
    department: "Public Health Department",
    state: "Maharashtra",
    district: "Pune (Aundh District Hospital)",
    budget: "₹2.5 Cr - ₹5.0 Cr",
    stage: "Pilot Running",
    stageIndex: 3,
    deadline: "2026-10-15",
    description: "Automated AI radiological and clinical triage system to assist overburdened doctors in rural district hospitals of Maharashtra, identifying critical pulmonary anomalies and triage alerts in under 8 minutes.",
    tags: ["Healthcare AI", "Edge Diagnostics", "ISO 13485", "DPIIT FastTrack"],
    applicantsCount: 14,
    shortlistedCount: 3,
    activePilot: "plt_pune_hospital_01",
    sla: "99.9% Uptime | <10 min Triage SLA",
    beneficiaries: "1.4M Patients / Year"
  },
  {
    id: "chg_mh_transport_02",
    title: "Real-Time Pothole & Road Quality Telemetry System",
    department: "Public Works Department (PWD)",
    state: "Maharashtra",
    district: "Mumbai-Pune Expressway & Samruddhi Mahamarg",
    budget: "₹1.5 Cr - ₹3.0 Cr",
    stage: "AI Matchmaker",
    stageIndex: 1,
    deadline: "2026-11-01",
    description: "Edge-computer vision and vehicle telemetry network scanning asphalt road degradation, pothole coordinates, and structural cracks across 1,200 km of state expressways in real-time.",
    tags: ["Smart Infra", "Computer Vision", "Edge IoT", "PWD Monitored"],
    applicantsCount: 9,
    shortlistedCount: 2,
    activePilot: "plt_pwd_expressway_02",
    sla: "<1 meter Geo-Accuracy | Sub-second edge inference",
    beneficiaries: "350,000 Commuters / Day"
  },
  {
    id: "chg_mh_water_03",
    title: "Smart Water Metering & Acoustic Pipeline Leak Detection",
    department: "Water Resources Department",
    state: "Maharashtra",
    district: "Nashik Municipal Corporation",
    budget: "₹3.0 Cr - ₹6.0 Cr",
    stage: "Evaluation Gate",
    stageIndex: 2,
    deadline: "2026-11-20",
    description: "Acoustic sensor grid and satellite telemetry detecting subsurface pipeline ruptures and non-revenue water (NRW) losses across urban and agricultural distribution networks.",
    tags: ["Water Tech", "Acoustic Telemetry", "IoT", "Resource Conservation"],
    applicantsCount: 8,
    shortlistedCount: 2,
    activePilot: "plt_water_nashik_03",
    sla: "Zero false-positive ruptures >500L/hr",
    beneficiaries: "2.1M Municipal Residents"
  },
  {
    id: "chg_mh_forest_04",
    title: "AI Forest Fire & Wildlife Intrusion Warning System",
    department: "Environment & Forest Department",
    state: "Maharashtra",
    district: "Tadoba-Andhari Tiger Reserve (Chandrapur)",
    budget: "₹1.8 Cr - ₹3.5 Cr",
    stage: "RFP Open",
    stageIndex: 1,
    deadline: "2026-12-05",
    description: "Long-range thermal drone telemetry and acoustic sensor mesh predicting wild fire propagation vectors and mitigating human-wildlife conflicts along buffer villages.",
    tags: ["Climate Tech", "Thermal Vision", "Forest Governance", "Drone Telemetry"],
    applicantsCount: 11,
    shortlistedCount: 1,
    activePilot: "plt_forest_tadoba_04",
    sla: "<3 min wildfire ignition detection",
    beneficiaries: "84 Buffer Zone Gram Panchayats"
  },
  {
    id: "chg_mh_energy_05",
    title: "Solar Microgrid Peak-Load Telemetry & Smart Storage Balance",
    department: "Energy & Renewable Department (MAHADISCOM)",
    state: "Maharashtra",
    district: "Solapur Solar Industrial Cluster",
    budget: "₹4.0 Cr - ₹8.0 Cr",
    stage: "Scale Ready",
    stageIndex: 5,
    deadline: "2026-10-30",
    description: "Statewide AI dispatching engine synchronizing decentralized solar rooftop inverters, battery storage packs, and agricultural grid feeders during peak morning hours.",
    tags: ["Clean Tech", "Grid Balancing", "Smart Inverters", "Renewable Energy"],
    applicantsCount: 16,
    shortlistedCount: 4,
    activePilot: "plt_energy_solapur_05",
    sla: "99.99% grid stability frequency (49.9 - 50.1 Hz)",
    beneficiaries: "45,000 Farming Households"
  },
  {
    id: "chg_mh_it_06",
    title: "Multilingual AI Citizen Grievance Triage & Resolution Bot",
    department: "General Administration Dept (Mantralaya)",
    state: "Maharashtra",
    district: "Statewide (All 36 Districts)",
    budget: "₹2.0 Cr - ₹4.0 Cr",
    stage: "Procurement Dossier",
    stageIndex: 4,
    deadline: "2026-11-15",
    description: "Marathi, Hindi & English natural language grievance routing platform categorizing Aaple Sarkar citizen complaints and auto-assigning SLA tracking to tehsildars.",
    tags: ["GovTech NLP", "Marathi LLM", "Citizen Services", "Aaple Sarkar"],
    applicantsCount: 12,
    shortlistedCount: 3,
    activePilot: "plt_it_mantralaya_06",
    sla: "<24 hr automated grievance routing SLA",
    beneficiaries: "112M Maharashtra Citizens"
  }
];

export const INITIAL_STARTUPS = [
  {
    id: "stp_healthai_01",
    name: "HealthAI Technologies Pvt Ltd",
    dpiitId: "DPIIT-89241",
    founded: "2022",
    city: "Pune, Maharashtra",
    category: "Healthcare AI",
    teamSize: 28,
    funding: "₹4.2 Cr Seed",
    founders: "Vikram Malhotra & Dr. Sneha Joshi",
    description: "ISO 13485 certified AI diagnostic software for rapid triage of chest X-rays, CT scans, and bedside ultrasound with 96.4% verified clinical accuracy.",
    verified: true,
    score: 94,
    certifications: ["ISO 13485 Medical Device", "DPDP Act 2023 Compliant", "CERT-In Cyber Audited"],
    kpis: { accuracy: "96.4%", latency: "7.8 mins", doctorRating: "4.9/5.0" }
  },
  {
    id: "stp_infraeye_02",
    name: "InfraEye Vision Labs",
    dpiitId: "DPIIT-77312",
    founded: "2023",
    city: "Mumbai, Maharashtra",
    category: "Computer Vision & Smart Infra",
    teamSize: 16,
    funding: "₹2.1 Cr Angel",
    founders: "Aditya Deshpande & Kunal Shah",
    description: "Edge-AI camera systems and vehicle-mounted lidar for sub-meter road deformation mapping and automated defect logging.",
    verified: true,
    score: 89,
    certifications: ["PWD Protocol 4.2 Approved", "ISO 9001 Quality"],
    kpis: { accuracy: "94.2%", latency: "45ms edge", roadCoverage: "120 km/hr" }
  },
  {
    id: "stp_aquasense_03",
    name: "AquaSense Networks",
    dpiitId: "DPIIT-65419",
    founded: "2021",
    city: "Nashik, Maharashtra",
    category: "Smart Water & IoT",
    teamSize: 22,
    funding: "₹3.5 Cr Pre-Series A",
    founders: "Rameshwar Shinde",
    description: "Acoustic correlator sensors with LoRaWAN telemetry detecting municipal potable water leaks down to 15 liters/hour.",
    verified: true,
    score: 91,
    certifications: ["WRA Standard 2024", "IP68 Submersible"],
    kpis: { waterSaved: "18.4M Liters", accuracy: "97.1%", falseAlarm: "<1.2%" }
  },
  {
    id: "stp_ecogrid_04",
    name: "EcoGrid Microgrid Intelligence",
    dpiitId: "DPIIT-91823",
    founded: "2022",
    city: "Nagpur, Maharashtra",
    category: "CleanTech & Grid AI",
    teamSize: 31,
    funding: "₹5.8 Cr Series A",
    founders: "Dr. Arvind Chawla & Megha Nair",
    description: "Decentralized grid orchestrator managing solar inverter harmonics, battery state-of-charge, and peak shaving algorithms.",
    verified: true,
    score: 96,
    certifications: ["CEA Grid Code Compliance", "IEEE 1547"],
    kpis: { peakShaving: "28.5%", uptime: "99.98%", solarYield: "+14.2%" }
  },
  {
    id: "stp_floratel_05",
    name: "FloraTelemetry Wildlife AI",
    dpiitId: "DPIIT-84902",
    founded: "2023",
    city: "Chandrapur, Maharashtra",
    category: "Forest & Drone AI",
    teamSize: 14,
    funding: "₹1.4 Cr Seed",
    founders: "Nitin Bhalerao",
    description: "Thermal drone computer vision detecting incipient forest fires and transmitting early acoustic perimeter alerts.",
    verified: true,
    score: 87,
    certifications: ["DGCA Drone Category 2", "WII Dehradun Validated"],
    kpis: { fireDetection: "<150 secs", falsePositive: "<0.8%", coverage: "200 sq km" }
  },
  {
    id: "stp_indicvoice_06",
    name: "IndicVoice GovTech NLP",
    dpiitId: "DPIIT-93450",
    founded: "2021",
    city: "Thane, Maharashtra",
    category: "GovTech NLP & LLM",
    teamSize: 25,
    funding: "₹4.0 Cr Seed",
    founders: "Pranav Savarkar",
    description: "Native Marathi, Hindi and 12 Indian regional dialect speech-to-text models specialized for citizen grievance categorization.",
    verified: true,
    score: 93,
    certifications: ["Bhashini Partner", "CERT-In Data Security"],
    kpis: { marathiAccuracy: "95.8%", categorizationSpeed: "1.2s", slaReduction: "64%" }
  }
];

export const INITIAL_PILOTS = [
  {
    id: "plt_pune_hospital_01",
    challengeId: "chg_mh_health_01",
    startupId: "stp_healthai_01",
    name: "Pune District Hospital AI Triage Sandbox",
    department: "Public Health Department",
    location: "Aundh District Hospital & Baramati Sub-District Hospital, Pune",
    duration: "90 Days Sandbox (Day 48 Active)",
    status: "ON_TRACK",
    progress: 68,
    patientsScreened: 14280,
    accuracyRate: "96.4%",
    triageTimeSaved: "42 Mins / Patient",
    telemetryStatus: "VERIFIED_ON_CHAIN",
    riskLevel: "LOW",
    estimatedSavings: "₹1.24 Cr Triage Logistics",
    kpis: [
      { name: "Radiological Triage Clinical Accuracy", target: ">92%", current: "96.4%", met: true },
      { name: "Diagnostic Report Turnaround Time", target: "<15 mins", current: "7.8 mins", met: true },
      { name: "District Medical Officer Adoption Rate", target: ">80%", current: "92.4%", met: true },
      { name: "Zero Critical Missed Pathology Guarantee", target: "100%", current: "100%", met: true }
    ],
    telemetryStream: [
      { time: "09:00", patients: 120, accuracy: 96.1 },
      { time: "10:00", patients: 340, accuracy: 96.4 },
      { time: "11:00", patients: 680, accuracy: 96.5 },
      { time: "12:00", patients: 950, accuracy: 96.3 },
      { time: "13:00", patients: 1180, accuracy: 96.6 },
      { time: "14:00", patients: 1420, accuracy: 96.4 }
    ]
  },
  {
    id: "plt_pwd_expressway_02",
    challengeId: "chg_mh_transport_02",
    startupId: "stp_infraeye_02",
    name: "Samruddhi Mahamarg Edge Camera Pothole Sandbox",
    department: "Public Works Department",
    location: "Mumbai-Pune Expressway (Section Km 40 - Km 94)",
    duration: "60 Days Sandbox (Day 24 Active)",
    status: "ON_TRACK",
    progress: 42,
    patientsScreened: 840, // Km surveyed
    accuracyRate: "94.8%",
    triageTimeSaved: "24 Hours to Alert",
    telemetryStatus: "VERIFIED_ON_CHAIN",
    riskLevel: "LOW",
    estimatedSavings: "₹68 Lakhs Preventive Maintenance",
    kpis: [
      { name: "Pothole Geolocation Precision (<1m)", target: ">90%", current: "95.2%", met: true },
      { name: "Severe Rutting Detection Rate", target: ">85%", current: "94.8%", met: true },
      { name: "Maintenance Dispatch Time", target: "<4 hrs", current: "2.1 hrs", met: true }
    ]
  },
  {
    id: "plt_water_nashik_03",
    challengeId: "chg_mh_water_03",
    startupId: "stp_aquasense_03",
    name: "Nashik Municipal Non-Revenue Water Detection Trial",
    department: "Water Resources Department",
    location: "Nashik Urban Sector 4 & 5 Distribution Feeder",
    duration: "90 Days Sandbox (Day 15 Active)",
    status: "ON_TRACK",
    progress: 25,
    patientsScreened: 320, // Pipeline Km surveyed
    accuracyRate: "97.1%",
    triageTimeSaved: "4.8M Liters Saved",
    telemetryStatus: "VERIFIED_ON_CHAIN",
    riskLevel: "LOW",
    estimatedSavings: "₹42 Lakhs Water Loss Avoided",
    kpis: [
      { name: "Acoustic Leak Detection Accuracy", target: ">90%", current: "97.1%", met: true },
      { name: "Subsurface Rupture Localization", target: "<2 meters", current: "1.2 meters", met: true }
    ]
  },
  {
    id: "plt_energy_solapur_05",
    challengeId: "chg_mh_energy_05",
    startupId: "stp_ecogrid_04",
    name: "Solapur Solar Agro-Feeder Balancing Trial",
    department: "Energy & Renewable Department",
    location: "Solapur Rural Agro-Solar Feeder Substation #12",
    duration: "90 Days Sandbox (Day 75 Complete)",
    status: "SCALE_READY",
    progress: 94,
    patientsScreened: 4500, // Inverters balanced
    accuracyRate: "98.9%",
    triageTimeSaved: "28.5% Peak Shaving",
    telemetryStatus: "VERIFIED_ON_CHAIN",
    riskLevel: "MINIMAL",
    estimatedSavings: "₹2.85 Cr Energy Cost Reduction",
    kpis: [
      { name: "Agricultural Feeder Uptime", target: ">98%", current: "99.6%", met: true },
      { name: "Transformer Thermal Stress Reduction", target: ">20%", current: "28.5%", met: true }
    ]
  }
];

export const AUDIT_TRAIL = [
  {
    id: "aud_001",
    timestamp: "2026-09-19 09:15:22 IST",
    action: "BLOCKCHAIN_NODE_HEARTBEAT",
    actor: "Maharashtra State MSInS Node #148,291",
    details: "State Innovation Ledger consensus block #148,291 committed with 12 validator signatures.",
    hash: "0x8f2a4b1c9d3e7f82b0a1c6e4d9f2a7b3c8e1d5f6e4b2",
    verified: true,
    blockNumber: 148291
  },
  {
    id: "aud_002",
    timestamp: "2026-09-19 08:30:10 IST",
    action: "PILOT_TELEMETRY_BATCH_COMMITTED",
    actor: "Pune Aundh Hospital Telemetry Sandbox Node",
    details: "14,280 patient diagnostic records cryptographically hashed into Merkle Tree root 0x9a3e...",
    hash: "0x3c9e1f4a7b2d8e5f6a0b1c2d3e4f5a6b7c8d9e0fa91f",
    verified: true,
    blockNumber: 148290
  },
  {
    id: "aud_003",
    timestamp: "2026-09-18 16:45:33 IST",
    action: "EVALUATION_SCORE_SIGNED",
    actor: "Dr. Ananya Kulkarni (GovTech Evaluator Panel)",
    details: "Cryptographically signed 6-dimensional evaluation matrix score (94/100) for HealthAI Technologies.",
    hash: "0x7a2b9c4d1e8f3e5a6b7c8d9e0f1a2b3c4d5e6f7eb5c6",
    verified: true,
    blockNumber: 148285
  },
  {
    id: "aud_004",
    timestamp: "2026-09-18 11:20:15 IST",
    action: "DPC_PROCUREMENT_DOSSIER_GENERATE",
    actor: "Dr. Rajeshwar Deshmukh, IAS (Public Health Dept)",
    details: "Generated Departmental Procurement Committee (DPC) Evidence Dossier with verified trial milestones.",
    hash: "0x4e6f8a0b2c4d6e8f0a2b4c6e8f0a2b4c6e8f0a2bd7e8",
    verified: true,
    blockNumber: 148278
  },
  {
    id: "aud_005",
    timestamp: "2026-09-17 14:10:04 IST",
    action: "DPIIT_STARTUP_VERIFICATION",
    actor: "DPIIT FastTrack API Oracle",
    details: "Verified DPIIT Startup Registry status for HealthAI Technologies (DPIIT-89241) and InfraEye (DPIIT-77312).",
    hash: "0x1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9fa1b2",
    verified: true,
    blockNumber: 148260
  },
  {
    id: "aud_006",
    timestamp: "2026-09-16 17:05:40 IST",
    action: "PILOT_KPI_MILESTONE_ATTAINED",
    actor: "State Telemetry Validator Node",
    details: "Milestone 'Radiological Triage Clinical Accuracy >92%' attained with 96.4% verified field performance.",
    hash: "0x6b8d0f2a4c6e8a0b2c4d6e8f0a2b4c6e8f0a2b4ce2f3",
    verified: true,
    blockNumber: 148245
  },
  {
    id: "aud_007",
    timestamp: "2026-09-15 10:00:00 IST",
    action: "CHALLENGE_RFP_PUBLISHED",
    actor: "Public Health Department, Govt of Maharashtra",
    details: "Published official challenge RFP chg_mh_health_01 with ₹2.5 Cr - ₹5.0 Cr sandbox allocation.",
    hash: "0x9c1e3b5d7f9a1c3e5b7d9fa1b2c4d6e8f0a2b4c6c4d5",
    verified: true,
    blockNumber: 148200
  }
];

export const MAHARASHTRA_DISTRICTS = [
  { name: "Pune", status: "PILOT_ACTIVE", pilots: 2, nodes: 18, beneficiaries: "1.4M", color: "bg-emerald-500" },
  { name: "Mumbai City", status: "PILOT_ACTIVE", pilots: 1, nodes: 24, beneficiaries: "2.8M", color: "bg-emerald-500" },
  { name: "Mumbai Suburban", status: "PILOT_ACTIVE", pilots: 1, nodes: 32, beneficiaries: "3.2M", color: "bg-emerald-500" },
  { name: "Thane", status: "ROLLOUT_READY", pilots: 1, nodes: 14, beneficiaries: "1.1M", color: "bg-blue-500" },
  { name: "Nashik", status: "PILOT_ACTIVE", pilots: 1, nodes: 12, beneficiaries: "950K", color: "bg-emerald-500" },
  { name: "Solapur", status: "PROCUREMENT_APPROVED", pilots: 1, nodes: 8, beneficiaries: "620K", color: "bg-amber-500" },
  { name: "Nagpur", status: "ROLLOUT_READY", pilots: 1, nodes: 16, beneficiaries: "1.2M", color: "bg-blue-500" },
  { name: "Chhatrapati Sambhajinagar", status: "PLANNED", pilots: 0, nodes: 6, beneficiaries: "450K", color: "bg-slate-400" },
  { name: "Kolhapur", status: "ROLLOUT_READY", pilots: 0, nodes: 8, beneficiaries: "580K", color: "bg-blue-500" },
  { name: "Amravati", status: "PLANNED", pilots: 0, nodes: 4, beneficiaries: "320K", color: "bg-slate-400" },
  { name: "Chandrapur", status: "PILOT_ACTIVE", pilots: 1, nodes: 6, beneficiaries: "280K", color: "bg-emerald-500" },
  { name: "Nanded", status: "PLANNED", pilots: 0, nodes: 4, beneficiaries: "310K", color: "bg-slate-400" }
];
