# 🚆 RailSync — AI-Powered Automatic Block Planning (SIH 2026)

**Problem Statement ID:** SIH26027  
**Title:** AI-Powered Automatic Block Planning to Maximize Asset Availability for Train Operations on Indian Railways  
**Team Name:** SixSnippers  
**Theme:** Transportation & Logistics  

---

## 🌟 Overview & Key Modules

1. **Live Decision-Support Dashboard:**
   - Real-time KPIs (Punctuality Index 98.4%, Asset Availability 87.4%, Active Blocks, Defect Ingestion).
   - Live Corridor Track Segment schematic (NDLS - CNB High Density Route).
   - Real-time department ingestion feeds (Engineering TMS, S&T SMMS, Traction TDMS, Operations COA).

2. **AI-Based Task Prioritization:**
   - Machine learning (XGBoost) priority scoring based on Severity, Urgency, Asset Criticality, and Overdue status.
   - Location cluster detection & auto-grouping by track segment / kilometer post.

3. **Train-Aware AI Block Planner (CP-SAT Solver):**
   - Interactive Train Timetable vs Feasible Shadow Gap Timeline (Gantt chart).
   - Multi-department joint block co-scheduling (Merges Track + Signal + OHE work to save **105 minutes** downtime).
   - Automated Hard Safety & Interlocking Constraint Verification.
   - 1-Click Digital Sanction Order & live broadcast to COA.

4. **Execution & AI Verification (YOLOv8 + OpenCV):**
   - Field photo upload and neural network inspection simulator.
   - Bounding boxes, track clearance metrics, bolt torque checks, and human sign-off.

5. **Operational Analytics & Insights:**
   - Downtime reduction stats, sanction turnaround times, and comparative benchmarks.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

---

## 🌐 1-Click Deployment (To Get Live URL for PPT)

### Option 1: Vercel (Recommended)
1. Push code to your GitHub repo.
2. Go to [vercel.com](https://vercel.com) -> "Add New Project" -> Import your repo.
3. Click **Deploy** (Zero configuration needed!).
4. Copy the live link (e.g. `https://railsync-sih2026.vercel.app`) and paste it into your PPT.

### Option 2: Netlify
1. Run `npm run build` to generate the `dist` folder.
2. Drag and drop the `dist` folder on [netlify.com/drop](https://app.netlify.com/drop).
