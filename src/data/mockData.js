export const DEPARTMENTS = {
  TMS: {
    id: 'TMS',
    name: 'Engineering (TMS)',
    subtext: 'Track Management System',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    accentColor: '#3b82f6',
    icon: 'TrainTrack'
  },
  SMMS: {
    id: 'SMMS',
    name: 'S&T (SMMS)',
    subtext: 'Signal & Telecom Maintenance',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    accentColor: '#a855f7',
    icon: 'Radio'
  },
  TDMS: {
    id: 'TDMS',
    name: 'Traction (TDMS)',
    subtext: 'Traction Distribution & OHE',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentColor: '#f59e0b',
    icon: 'Zap'
  },
  COA: {
    id: 'COA',
    name: 'Operations (COA)',
    subtext: 'Control Office Application',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentColor: '#10b981',
    icon: 'ShieldCheck'
  }
};

export const CORRIDORS = [
  { id: 'NDLS-CNB', name: 'New Delhi — Kanpur Central', code: 'NR-NCR-01', lengthKm: 440, density: 'High Density Network (HDN-1)' },
  { id: 'HWH-DDU', name: 'Howrah — Pt. Deen Dayal Upadhyaya', code: 'ER-ECR-04', lengthKm: 675, density: 'Grand Chord (Heavy Freight)' },
  { id: 'CSMT-KYN', name: 'Mumbai CSMT — Kalyan Main Line', code: 'CR-SUB-01', lengthKm: 54, density: 'Ultra High Suburban Traffic' },
  { id: 'SBC-MAS', name: 'KSR Bengaluru — Chennai Central', code: 'SWR-SR-02', lengthKm: 360, density: 'High Speed Passenger' },
];

export const INITIAL_TASKS = [
  {
    id: 'TSK-2026-891',
    title: 'Track Packing & Fishplate Crack Rectification',
    dept: 'TMS',
    corridorId: 'NDLS-CNB',
    section: 'Aligarh Jn - Tundla (Km 1284/12 - 1284/20)',
    line: 'UP Main Line',
    severity: 'High', // High, Medium, Low
    severityScore: 92,
    urgency: 'Immediate (24h)',
    assetCriticality: 'Critical (Class A Track)',
    overdueDays: 3,
    durationReqMinutes: 75,
    status: 'Pending Planning', // 'Pending Planning', 'Scheduled', 'In Progress', 'Awaiting AI Verification', 'Verified & Closed'
    reportedAt: '2026-09-27 18:30',
    assignedTeam: 'Gang-14 (Engineering Unit ALJN)',
    requiresPowerBlock: false,
    requiresTrafficBlock: true,
    aiRecommendedWindow: '11:45 AM - 01:00 PM',
    compatibleWith: ['TSK-2026-894', 'TSK-2026-898'],
    description: 'Ultrasonic Flaw Detection (USFD) flagged micro-fissure on gauge face of inner rail near point switch #42B.',
    verificationData: {
      imageType: 'Track Fishplate & Joint',
      sampleImage: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?w=800&auto=format&fit=crop&q=60',
      expectedLabels: ['Track Clearance: 99.4%', 'Bolt Torque: 120 N-m (PASS)', 'No Debris Detected'],
      aiScore: 98.7
    }
  },
  {
    id: 'TSK-2026-894',
    title: 'Point Machine Contact Cleaning & Relay Testing',
    dept: 'SMMS',
    corridorId: 'NDLS-CNB',
    section: 'Aligarh Jn - Tundla (Km 1284/14)',
    line: 'UP Main Line',
    severity: 'Medium',
    severityScore: 78,
    urgency: 'Within 48h',
    assetCriticality: 'High',
    overdueDays: 1,
    durationReqMinutes: 45,
    status: 'Pending Planning',
    reportedAt: '2026-09-28 06:15',
    assignedTeam: 'Signal S&T Squad B',
    requiresPowerBlock: false,
    requiresTrafficBlock: true,
    aiRecommendedWindow: '11:45 AM - 01:00 PM',
    compatibleWith: ['TSK-2026-891', 'TSK-2026-898'],
    description: 'Periodic inspection of electric point machine switch detection contact resistance exceeding 0.2 ohms.',
    verificationData: {
      imageType: 'Point Machine Relay',
      sampleImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60',
      expectedLabels: ['Contact Gap: 1.5mm (Standard)', 'Relay State: NORMAL', 'Housing Sealed'],
      aiScore: 96.2
    }
  },
  {
    id: 'TSK-2026-898',
    title: 'OHE Catenary Wire Dropper Realignment & Inspection',
    dept: 'TDMS',
    corridorId: 'NDLS-CNB',
    section: 'Aligarh Jn - Tundla (Km 1284/10 - 1284/30)',
    line: 'UP Main Line',
    severity: 'High',
    severityScore: 88,
    urgency: 'Immediate (24h)',
    assetCriticality: 'Critical (25kV AC)',
    overdueDays: 2,
    durationReqMinutes: 60,
    status: 'Pending Planning',
    reportedAt: '2026-09-27 22:10',
    assignedTeam: 'Tower Wagon OHE Unit 3',
    requiresPowerBlock: true,
    requiresTrafficBlock: true,
    aiRecommendedWindow: '11:45 AM - 01:00 PM',
    compatibleWith: ['TSK-2026-891', 'TSK-2026-894'],
    description: 'Thermal imaging camera detected hotspot at contact wire splice joint #19.',
    verificationData: {
      imageType: 'OHE Catenary Mast & Wire',
      sampleImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=60',
      expectedLabels: ['Dropper Tension: 1.8kN', 'Contact Wire Height: 5.55m', 'Insulator Cleanliness: 98%'],
      aiScore: 99.1
    }
  },
  {
    id: 'TSK-2026-742',
    title: 'Turnout Diamond Crossing Tamping & Ballast Regulating',
    dept: 'TMS',
    corridorId: 'HWH-DDU',
    section: 'Gaya Jn Yard (Km 452/08 - 452/30)',
    line: 'DOWN Main Line',
    severity: 'Medium',
    severityScore: 74,
    urgency: 'Scheduled (3 Days)',
    assetCriticality: 'High',
    overdueDays: 0,
    durationReqMinutes: 90,
    status: 'Scheduled',
    reportedAt: '2026-09-26 14:00',
    assignedTeam: 'Track Machine Unit BCM-82',
    requiresPowerBlock: false,
    requiresTrafficBlock: true,
    aiRecommendedWindow: '02:30 AM - 04:00 AM',
    compatibleWith: [],
    description: 'Deep ballast tamping and alignment retention for high speed heavy freight corridor.',
    verificationData: {
      imageType: 'Track Ballast & Sleepers',
      sampleImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=60',
      expectedLabels: ['Ballast Cushion: 300mm', 'Sleeper Spacing: 60cm Uniform', 'Track Gauge: 1676mm'],
      aiScore: 97.5
    }
  },
  {
    id: 'TSK-2026-610',
    title: 'Axle Counter Sensor Replacement & Audio Frequency Track Circuit',
    dept: 'SMMS',
    corridorId: 'CSMT-KYN',
    section: 'Thane - Diva Fast Corridor (Km 33/02)',
    line: 'UP Suburban Fast',
    severity: 'Critical',
    severityScore: 96,
    urgency: 'Emergency',
    overdueDays: 4,
    durationReqMinutes: 40,
    status: 'Awaiting AI Verification',
    reportedAt: '2026-09-28 03:00',
    assignedTeam: 'Mumbai Division S&T Quick Response',
    requiresPowerBlock: false,
    requiresTrafficBlock: true,
    aiRecommendedWindow: '01:15 AM - 02:00 AM (Night Shadow Block)',
    compatibleWith: [],
    description: 'Intermittent digital axle counter pulse drop causing signal reversion to caution.',
    verificationData: {
      imageType: 'Digital Axle Counter Head',
      sampleImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=60',
      expectedLabels: ['Sensor Alignment: PASS', 'Signal Amplitude: 24.2V', 'No Foreign Metal'],
      aiScore: 99.4
    }
  }
];

export const TRAIN_SCHEDULES = [
  { id: '12004', name: 'Lucknow Swarna Shatabdi Exp', type: 'Superfast', speed: '130 km/h', start: '06:10', end: '08:15', line: 'UP Main' },
  { id: '22436', name: 'Vande Bharat Express (NDLS-BSB)', type: 'Vande Bharat', speed: '130 km/h', start: '08:45', end: '11:15', line: 'UP Main' },
  { id: 'MAINT-GAP', name: '⚡ OPTIMAL AI MAINTENANCE WINDOW', type: 'AI Shadow Window', speed: '-', start: '11:30', end: '13:00', line: 'UP Main', isGap: true },
  { id: '12424', name: 'Dibrugarh Town Rajdhani Exp', type: 'Rajdhani', speed: '130 km/h', start: '13:20', end: '15:45', line: 'UP Main' },
  { id: 'FRT-8821', name: 'Container Freight Rake (JNPT-TKD)', type: 'Freight (Flexible)', speed: '75 km/h', start: '16:00', end: '18:30', line: 'UP Main' },
  { id: '12554', name: 'Vaishali Superfast Express', type: 'Superfast', speed: '110 km/h', start: '19:00', end: '21:30', line: 'UP Main' }
];

export const AI_OPTIMIZED_BLOCKS = [
  {
    id: 'BLK-OPT-901',
    corridor: 'NDLS-CNB (Aligarh - Tundla)',
    trackLine: 'UP Main Line (Km 1284)',
    windowStart: '11:45',
    windowEnd: '13:00',
    durationMinutes: 75,
    coScheduledTasks: [
      { id: 'TSK-2026-891', dept: 'TMS', name: 'Fishplate Crack Rectification', estTime: '75m' },
      { id: 'TSK-2026-894', dept: 'SMMS', name: 'Point Machine Cleaning & Relay', estTime: '45m' },
      { id: 'TSK-2026-898', dept: 'TDMS', name: 'OHE Catenary Wire Realignment', estTime: '60m' },
    ],
    downtimeSavedMinutes: 105, // Without AI: 75+45+60 = 180m. With AI joint block: 75m -> 105m saved!
    savingsPercentage: '58.3%',
    safetyComplianceScore: '99.8%',
    trafficImpact: 'Minimal (Fits in 90m timetable gap between Vande Bharat & Rajdhani)',
    status: 'Recommended by AI Engine',
    powerBlockRequired: true,
    speedRestrictionAfter: '30 km/h for 2 hrs, then normal',
    controllerStatus: 'Ready for Sanction'
  }
];

export const SYSTEM_STATS = {
  assetAvailability: 87.4,
  punctualityIndex: 98.4,
  activeBlocksToday: 12,
  pendingDefects: 24,
  coScheduledRate: '78.2%',
  avgSanctionTime: '11 mins (vs 4.8 hrs manual)',
  lineCapacityGained: '+14.6%'
};
