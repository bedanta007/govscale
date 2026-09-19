# GovScale — Smart Public Procurement Framework for Startup Innovation (SIH26136)

> **Smart India Hackathon (SIH 2026) · Problem Statement SIH26136**  
> **Theme:** Smart Automation | **Category:** Software  
> **GitHub Repository:** [github.com/bedanta007/govscale](https://github.com/bedanta007/govscale)

---

## 📌 Executive Summary

India's government procurement system lacks a transparent, technology-driven mechanism to discover and onboard vetted startup innovations at scale. Traditional RFP processes are slow, opaque, and inaccessible to early-stage DPIIT-registered startups.

**GovScale** solves this by building an **end-to-end Smart Public Procurement Framework** — from challenge discovery and AI-powered startup matchmaking to blockchain-audited evaluations, live pilot telemetry, and legally defensible Government Procurement Dossiers — all within a single platform aligned with **GFR Rule 149 (startup procurement exemption)**.

---

## ⚡ Key Features

### 🤖 AI Matchmaker Engine
- Semantic vector scan of DPIIT-registered startup profiles against government RFP specifications
- Multi-dimensional scoring across 6 criteria: Innovation Depth, Technical Feasibility, Scalability, Compliance, Cost Efficiency, and Social Impact
- Recharts radar visualization with instant shortlisting at the click of a button

### 📋 Challenge Management
- Government officers post procurement challenges with SLA, budget, and evaluation criteria
- Full challenge lifecycle: Draft → Matching → Evaluation → Pilot → Procurement
- Create Challenge modal with validated form input and live KPI updates

### 🔬 Structured Evaluations
- 6-criteria interactive sliders (0–100) for granular startup assessment
- Live composite score recalculation in real-time
- Blockchain signing of evaluation records via SHA-256 Merkle chain
- 90-day pilot approval with one-click confirmation

### 📡 Pilot Telemetry Dashboard
- Live telemetry simulation for active pilots (e.g., patient throughput, district coverage)
- Recharts Area chart live data stream
- Simulate Live Telemetry Tick button (+24 unit increments)
- CSV export of pilot KPI data

### 📜 Procurement Dossier Generator
- Multi-page official Government PDF via `jspdf`
- Compliant with GFR Rule 149 (startup procurement exemption)
- Departmental Procurement Committee (DPC) Evidence Dossier format
- Auto-populated with evaluation scores, pilot data, and blockchain proof hashes

### 🗺️ Scale Readiness Grid
- 36-district deployment readiness dashboard
- Status filter: Active / Pilot / Pending / Approved
- Visual grid with district-wise rollout status

### 🔗 Blockchain Audit Trail
- Immutable cryptographic ledger of every platform action
- SHA-256 Merkle hash chain — every block references the previous
- Hash Inspector Modal with 1-click copy of verification proofs
- Searchable audit log with timestamp and role attribution

### 👥 Multi-Role Access Control
| Role | Access |
|------|--------|
| Gov Officer | Post challenges, approve pilots, generate procurement docs |
| Evaluator | Score startups, sign evaluation blocks |
| Startup | View matched challenges, track evaluation status |
| State Admin | Monitor scale readiness across all 36 districts |
| Public Citizen | Open-access view of challenges and outcomes |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 5 |
| **Styling** | Tailwind CSS (CDN), Vanilla CSS |
| **Typography** | Outfit, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |
| **Visualization** | Recharts (Bar, Radar, Area charts) |
| **PDF Generation** | jsPDF |
| **Icons** | Lucide React |
| **Blockchain Simulation** | Custom SHA-256 Merkle chain (client-side) |
| **Deployment** | Vercel / Local Vite dev server |

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/bedanta007/govscale.git

# 2. Navigate into the project
cd govscale

# 3. Install dependencies
npm install

# 4. Start local dev server (http://localhost:5173)
npm run dev

# 5. Build for production
npm run build
```

---

## 📁 Project Structure

```
govscale/
├── index.html                    # App entry point + Tailwind CDN config
├── vite.config.js                # Vite build configuration
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── App.jsx                   # Main application (all views, modals, state)
    ├── index.css                 # Global styles & design tokens
    ├── components/
    │   ├── ChallengeDetailModal.jsx   # SLA, criteria, budget detail view
    │   ├── CreateChallengeModal.jsx   # New challenge form
    │   ├── DemoTourModal.jsx          # 5-stage interactive guided tour
    │   ├── HashInspectorModal.jsx     # Merkle block explorer
    │   ├── ExecutiveDashboard.jsx     # KPI metrics & charts
    │   ├── Header.jsx                 # Navigation header
    │   └── ...                        # Additional components
    └── services/
        ├── govScaleData.js            # Demo data (challenges, startups, pilots, audit)
        ├── pdfService.js              # DPC Procurement Dossier PDF generator
        └── mockData.js                # Supporting mock data
```

---

## 🖥️ Application Modules

| Module | Description |
|--------|-------------|
| **Overview Dashboard** | KPI cards, pipeline bar chart, radar scoring chart |
| **Challenges** | Browse, filter, and create procurement challenges |
| **AI Matchmaker** | Vector scan + radar chart + shortlist startups |
| **Evaluations** | Criteria sliders, composite scoring, blockchain signing |
| **Pilots & Telemetry** | Live KPI stream, telemetry tick, CSV export |
| **Procurement Dossier** | GFR Rule 149 compliant PDF generation |
| **Scale Readiness** | 36-district deployment grid |
| **Audit Trail** | Searchable blockchain ledger with hash verification |

---

## 📄 License

Developed for **Smart India Hackathon 2026** — Problem Statement **SIH26136**  
*Smart Public Procurement Framework for Startup Innovation*
