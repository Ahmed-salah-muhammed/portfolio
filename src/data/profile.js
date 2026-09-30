// src/data/profile.js
// Source of truth for everything about Ahmed (from his CV, Sept 2026).
// If PORTFOLIO_REFERENCE.md disagrees with this file, THIS FILE WINS.

export const PROFILE = {
  name: 'Ahmed Salah Muhammed',
  nameAr: 'أحمد صلاح محمد',
  shortName: 'Ahmed Salah',
  title: 'Full-Stack Developer · GIS Developer',
  badge: 'AWS Certified Cloud Practitioner',
  background: 'Urban & Environmental Planner',
  location: 'Cairo, Egypt',
  locationAr: 'القاهرة، مصر',
  coordinates: { lat: 30.0444, lng: 31.2357 }, // Cairo, Egypt
  tagline: 'Where urban planning, GIS, cloud and AI meet.',
  summary:
    'GIS Developer and Urban Planner with a background in Environmental Planning from Cairo University and a Geo-informatics diploma from ITI. AWS Certified Cloud Practitioner working across spatial analysis, ArcGIS Enterprise administration, cloud-based geospatial systems, Python automation, RESTful Map & Feature Services, 3D urban visualization, and full-stack GIS web development — focused on bringing GIS together with cloud, AI automation and smart-city solutions.',
  focusAreas: [
    'GIS Development',
    'Cloud (AWS)',
    'Smart Cities',
    'Digital Twin',
    'Spatial Analysis',
    'Remote Sensing',
    'AI Automation',
  ],
  availableForWork: true, // TODO: confirm
  contact: {
    email: 'ahmedsalah219013@gmail.com',
    // Shown publicly at Ahmed's request (Sept 2026) for quick contact. The second
    // email stays off the site.
    phone: '01225246488',
    phoneIntl: '+201225246488', // for tel: links
    // The top announcement bar promises an offer to anyone who gets in touch.
    offer: 'Special offer for everyone who gets in touch',
  },
  links: {
    github: 'https://github.com/Ahmed-salah-muhammed',
    linkedin: 'https://www.linkedin.com/in/ahmedsallah',
    x: 'https://x.com/Ahmed219013',
    facebook: 'https://www.facebook.com/vhmeddd6/',
    fiverr: 'https://www.fiverr.com/vhmed_salah', // TODO: confirm — public profile URL built from the username in the buyer-dashboard link Ahmed shared (that link needs a login)
    certificates: 'https://www.linkedin.com/in/ahmedsallah', // all credentials live on LinkedIn
    cv: '/cv/Ahmed_Salah_Muhammed_CV.pdf',
  },
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Professional working proficiency' },
  ],
  // Hero stat chips — all facts from the CV
  stats: [
    { value: 'AWS', label: 'Certified Cloud Practitioner' },
    { value: '2', label: 'National-scale KSA GIS projects' },
    { value: '1', label: 'Peer-reviewed publication' },
  ],
  pillars: [
    {
      key: 'dev',
      title: 'Full-Stack & Cloud',
      description:
        'React, Node/Express/MongoDB, ASP.NET Core, PostgreSQL/PostGIS, Esri Maps SDKs, REST APIs — deployed on AWS-grade cloud architecture.',
    },
    {
      key: 'gis',
      title: 'GIS & Spatial Engineering',
      description:
        'Spatial analysis, ArcGIS Enterprise & Online administration, geodatabase design, Map & Feature Services, remote sensing, flood simulation and 3D urban models.',
    },
    {
      key: 'ai',
      title: 'AI & Automation',
      description:
        'MCP servers that let Claude operate ArcGIS and QGIS, AI agents & workflows, n8n, GeoAI, and Python automation of GIS pipelines.',
    },
  ],
};

export const EDUCATION = [
  {
    id: 'iti',
    institution: 'Information Technology Institute (ITI)',
    degree: 'Diploma in IT — Geo-informatics (9-Month Professional Program, Intake 46)',
    location: 'Smart Village, Cairo',
    start: '2025-10',
    end: '2026-09',
    logos: [
      { src: '/images/logos/iti.webp', alt: 'Information Technology Institute (ITI)' },
    ],
    // Built only from facts elsewhere in these data files (program, track, and the ITI
    // lab projects in projects.js). Edit freely.
    description:
      "An intensive 9-month professional diploma in the Geo-informatics track at Egypt's Information Technology Institute. It turned a planner into a developer: GIS development, spatial databases, WebGIS and AI, delivered through hands-on labs such as the GeoAI Assistant, a GIS document assistant (RAG), an ArcPy parcel-report toolbox and the ITI Branch Viewer.",
    highlights: [
      'GPA 3.7 / 4.0 (A-)',
      'Ranked 2nd in cohort',
    ],
  },
  {
    id: 'cu',
    institution: 'Cairo University — Faculty of Urban & Regional Planning',
    degree: 'B.Sc. in Urban & Regional Planning',
    department: 'Environmental Planning & Sustainable Infrastructure',
    location: 'Giza, Egypt',
    start: '2019-10',
    end: '2024-07',
    logos: [
      { src: '/images/logos/cairo-university.webp', alt: 'Cairo University' },
      {
        src: '/images/logos/furp.webp',
        alt: 'Faculty of Urban & Regional Planning (FURP)',
      },
    ],
    description:
      'A B.Sc. in Urban & Regional Planning from the Faculty of Urban & Regional Planning, specialising in Environmental Planning & Sustainable Infrastructure. The planning foundation behind my GIS work — reading cities, land and the environment spatially — graduating 5th in my cohort.',
    highlights: [
      'GPA 3.01 / 4.0 (B+)',
      'Ranked 5th in cohort',
      'Graduation project grade: A−',
    ],
  },
];

// `sites` feed the GIS Lab map (work locations) and the Journey timeline pins.
export const EXPERIENCE = [
  {
    id: 'etqaan',
    role: 'GIS Engineer',
    company: 'Etqaan Urban Planning Solutions',
    type: 'Full-time · On-site',
    location: 'Smart Village, Egypt',
    start: '2025-01',
    end: '2025-10',
    highlights: [
      'Spatial data analysis supporting urban-planning and GIS studies.',
      'Designed and deployed Survey123 forms for field data-collection teams in Saudi Arabia.',
      'Administered ArcGIS Online, Portal, ArcGIS Online Assistant and related Esri products.',
      'Automated repetitive GIS workflows with Python scripts.',
      '3D urban visualizations with CityEngine and Twinmotion.',
      'Site sketches and planning layouts in collaboration with the Saudi Heritage Commission.',
    ],
    relatedProjects: ['alula-old-town-registration', 'ksa-urban-heritage-origins'],
    sites: [
      { label: 'Smart Village, Egypt', lat: 30.0712, lng: 31.0209 },
      { label: 'AlUla, KSA', lat: 26.6206, lng: 37.9186 },
    ],
  },
  {
    id: 'pcg-env',
    role: 'Environmental Analyst',
    company: 'Project Consultant Group',
    type: 'Part-time · Remote',
    location: 'Oussim · Kafr El-Dawar · Damietta, Egypt',
    start: '2024-01',
    end: '2024-04',
    highlights: [
      'GIS and remote-sensing studies for environmental assessment across multiple sites.',
      'Spatial and statistical analysis of environmental conditions and project impacts.',
      'Integrated simulation-model outputs into GIS for interpretation and visualization.',
      'Supported Environmental Impact Assessments (EIA) with geospatial modeling.',
    ],
    relatedProjects: [],
    sites: [
      { label: 'Oussim, Giza', lat: 30.1236, lng: 31.1361 },
      { label: 'Kafr El-Dawar', lat: 31.1339, lng: 30.1297 },
      { label: 'Damietta', lat: 31.4165, lng: 31.8133 },
    ],
  },
  {
    id: 'pcg-urban',
    role: 'Urban Planner & GIS Analyst',
    company: 'Project Consultant Group',
    type: 'Part-time · Remote',
    location: 'Riyadh & Al-Nammas, Saudi Arabia',
    start: '2023-08',
    end: '2023-09',
    highlights: [
      'Comprehensive flood-simulation study for Riyadh using spatial and hydrological analysis.',
      'Built and structured geodatabases for spatial data management.',
      'Topographic analysis, NDVI assessment and terrain modeling.',
      'Urban GIS studies for Al-Nammas supporting spatial planning.',
    ],
    relatedProjects: [],
    sites: [
      { label: 'Riyadh, KSA', lat: 24.7136, lng: 46.6753 },
      { label: 'Al-Nammas, KSA', lat: 19.1167, lng: 42.1333 },
    ],
  },
];

export const PUBLICATIONS = [
  {
    id: 'aujes-2025',
    title:
      'Integrated Environmental Assessment of Sustainability Land Suitability for Agricultural Development in the New Delta Region Using a Bio-Economy Mapping Approach and Remote Sensing',
    titleAr:
      'تقييم بيئي متكامل لملاءمة الأراضي للتنمية الزراعية المستدامة في منطقة الدلتا الجديدة باستخدام الاستشعار عن بعد وخرائط الاقتصاد الحيوي',
    authors: 'Qutb, S., Salah, A., & Taher, N. S.',
    year: 2025,
    venue: 'Aswan University Journal of Environmental Studies (AUJES)',
    venueAr: 'مجلة جامعة أسوان للدراسات البيئية (AUJES)',
    summary:
      'Environmental assessment of development priorities in Egypt’s New Delta using bio-economy mapping and remote sensing, addressing food security, sustainability and spatial planning.',
    summaryAr:
      'دراسة بيئية محكمة حول أولويات التنمية الزراعية في مشروع الدلتا الجديدة بمصر بالاعتماد على الاستشعار عن بعد ومؤشرات الاقتصاد الحيوي، لدعم الأمن الغذائي والاستدامة والتخطيط المكاني.',
    url: 'https://aujes.journals.ekb.eg/article_469201.html',
  },
];

export const CERTIFICATIONS = [
  {
    group: 'Cloud',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2026-05',
    expires: '2029-05',
    featured: true,
    url: null,
  },
  {
    group: 'Cloud',
    title: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'AWS Academy · CT University',
    date: '2026-03',
    url: null,
  },
  {
    group: 'GIS',
    title: 'Water Utility Network',
    issuer: 'Esri North Africa',
    date: '2026-06',
    url: null,
  },
  {
    group: 'GIS',
    title: 'Image Analysis',
    issuer: 'Esri North Africa',
    date: '2026-06',
    url: null,
  },
  {
    group: 'GIS',
    title: 'GeoAI',
    issuer: 'Esri North Africa',
    date: '2026-06',
    url: null,
  },
  {
    group: 'GIS',
    title: 'ArcGIS Enterprise',
    issuer: 'Esri North Africa',
    date: '2026-06',
    url: null,
  },
  {
    group: 'GIS',
    title: 'ArcGIS Online',
    issuer: 'Esri North Africa',
    date: '2026-06',
    url: null,
  },
  {
    group: 'Development',
    title: 'ArcPy for Python Developers using ArcGIS Pro',
    issuer: 'Udemy',
    date: '2026-04',
    url: null,
  },
  {
    group: 'Development',
    title: 'React.js with Jonas',
    issuer: 'Udemy',
    date: '2026-02',
    url: null,
  },
  {
    group: 'Development',
    title: 'MERN Stack with Jonas',
    issuer: 'Udemy',
    date: '2026-05',
    url: null,
  },
  {
    group: 'Development',
    title: 'APIs & RESTful APIs Crash Course',
    issuer: 'Udemy',
    date: '2026-04',
    url: null,
  },
  {
    group: 'Development',
    title: 'Learn Swagger and the OAS',
    issuer: 'Udemy',
    date: '2026-05',
    url: null,
  },
  {
    group: 'AI',
    title: 'AI Agents & Workflows — The Practical Guide',
    issuer: 'Udemy',
    date: '2026-05',
    url: null,
  },
  {
    group: 'AI',
    title: 'Complete n8n & AI Automation',
    issuer: 'Udemy',
    date: '2026-04',
    url: null,
  }, // TODO: confirm issuer/date
  {
    group: 'AI',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: '2026-04',
    url: null,
  },
  {
    group: 'AI',
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic',
    date: '2026-04',
    url: null,
  },
  {
    group: 'Leadership',
    title: 'Aspire Leaders Program 2026',
    issuer: 'Aspire Institute',
    date: '2026-04',
    url: null,
  },
  {
    group: 'Leadership',
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    date: '2026-06',
    url: null,
  },
];

// Chips only — no percentage bars.
export const SKILLS = [
  {
    category: 'Development',
    items: [
      'Python',
      'ArcPy',
      'JavaScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'C#',
      '.NET / ASP.NET Core',
      'Esri Maps SDK for JS',
      'Esri Maps SDK for .NET',
      'REST APIs',
      'Swagger / OAS',
      'PostgreSQL',
      'Supabase',
      'vectorDB',
      'HTML5',
      'CSS',
      'Tailwind CSS',
      'Big Data & ML',
    ],
  },
  {
    category: 'GIS & Geospatial',
    items: [
      'ArcGIS Pro',
      'ArcMap',
      'ArcGIS Online',
      'ArcGIS Enterprise & Portal',
      'Enterprise Administration',
      'ArcGIS Urban',
      'QGIS',
      'PostGIS',
      'Survey123',
      // Esri apps from Ahmed's own SKILLS.md list.
      'ArcGIS Field Maps',
      'ArcGIS Dashboards',
      'ArcGIS Experience Builder',
      'ArcGIS Runtime SDK',
      'ModelBuilder',
      'CityEngine',
      'Twinmotion',
      'Map & Feature Services',
      'Geodatabase Design',
      'Spatial Analysis',
      'Remote Sensing (NDVI, Terrain)',
      'Flood Simulation',
      'GeoAI',
      'Google Earth Engine',
    ],
  },
  {
    category: 'Cloud (AWS)',
    items: [
      'AWS Cloud Practitioner',
      'EC2',
      'EBS Multi-Attach',
      'EFS',
      'Cloud Architecture',
      'Scalable Systems',
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      'Model Context Protocol (MCP)',
      'Claude AI Integration',
      'AI Agents & Workflows',
      'n8n',
      'RAG',
      'Function Calling',
      'Fine-Tuning',
      'Hugging Face',
      'LangChain',
      'GenAI',
    ],
  },
  {
    category: 'Foundations',
    items: [
      'OOP',
      'DBMS',
      'Networking',
      'Operating Systems',
      'Cybersecurity Fundamentals',
    ],
  },
];
