// src/data/projects.js
// Single source of truth for the Projects Explorer, GIS Lab map pins, and the chatbot.
// Sources: Ahmed's CV (Sept 2026), GitHub READMEs, and old portfolio site.
// Anything marked `TODO` needs Ahmed's confirmation before launch.
// Only metrics with `verified: true` are rendered in the UI.

const GITHUB_BASE = 'https://github.com/Ahmed-salah-muhammed';

export const PROJECT_CATEGORIES = ['All', 'GIS', 'AI', 'Web', 'Backend', '3D'];

// ─────────────────────── BLUEPRINT ───────────────────────
// To add a project: copy PROJECT_TEMPLATE, fill it, give it the NEXT id,
// set `published: true`. `id` is the permanent project number (URL: /projects/01/slug).
export const PROJECT_TEMPLATE = {
  id: 0, // next free number — never reuse or change
  slug: '', // kebab-case, unique
  title: '',
  category: [], // values from PROJECT_CATEGORIES (except 'All')
  summary: '', // 1–2 sentences, shown on the card
  description: '', // overview paragraph on the details page
  problem: '', // "The Challenge"
  approach: '', // "The Approach"
  role: '',
  stack: [],
  image: null, // '/images/projects/{slug}/cover.webp'
  gallery: [], // ['/images/projects/{slug}/1.webp', ...]
  links: { live: null, code: null, storymap: null, video: null }, // optional: codeBackend
  location: null, // { lat, lng, label } → adds a pin on the GIS Lab map
  metrics: [], // [{ label, value, verified: true }]
  verified: false,
  featured: false,
  published: false,
  year: null,
  // optional: type ('client' | 'writing'), client, period ('2025-01 → 2025-05')
};

export const PROJECTS = [
  // ───────────────────────────── FEATURED (4) ─────────────────────────────
  {
    id: 1,
    slug: 'arcgis-pro-salah-mcp',
    title: 'ArcGIS Pro Salah MCP',
    category: ['AI', 'GIS', 'Backend'],
    summary:
      'A four-layer MCP server and ArcGIS Pro add-in that lets AI agents drive the whole ArcGIS stack — from desktop analysis to a published, deployed web app — in one conversation.',
    description:
      'An open Model Context Protocol server that connects Esri’s ArcGIS platform to any MCP client (Claude, Google Antigravity). The agent chains tools across four layers: ArcPy geoprocessing, a live .NET bridge into the open ArcGIS Pro session, publishing to ArcGIS Online / Portal, and generating a static web app or interactive dashboard with ArcGIS Maps SDK for JS 5.0 + Calcite, then deploying it to GitHub. The same building blocks power a “Salah MCP” ribbon inside ArcGIS Pro, so everything also works with one click and no agent.',
    problem:
      'Going from analysis in ArcGIS Pro to a shared web map or dashboard takes many manual steps across several products.',
    approach:
      'Split the workflow into four tool layers (pro_*, live_*, portal_*, webapp_*) exposed over standard MCP stdio, so an agent can run Analyze → Publish → Visualize → Deploy end to end. Added a loopback .NET add-in for live session control and a 7-button ribbon for non-agent use.',
    role: 'Sole author — architecture, Python MCP server, .NET add-in, web app generator.',
    stack: [
      'Model Context Protocol',
      'Python',
      'ArcPy',
      'ArcGIS API for Python',
      'C# / .NET (ArcGIS Pro add-in)',
      'ArcGIS Maps SDK for JS 5.0',
      'Calcite',
      'GitHub API',
    ],
    image: '/images/projects/arcgis-pro-salah-mcp.webp', // TODO: add screenshot of ribbon + agent chat
    gallery: [],
    links: {
      live: null,
      code: `${GITHUB_BASE}/ArcGIS_Salah_MCP`,
      storymap: null,
    },
    location: null,
    metrics: [
      { label: 'Tool layers', value: '4', verified: true },
      { label: 'Ribbon buttons', value: '7', verified: true },
      { label: 'Agent clients supported', value: 'Claude + Antigravity', verified: true },
    ],
    verified: true,
    featured: true,
    published: true,
    year: 2026,
  },
  {
    id: 2,
    slug: 'alula-old-town-registration',
    title: 'Old Town Buildings Registration — AlUla, KSA',
    category: ['GIS', 'Backend'],
    type: 'client',
    summary:
      'The geospatial backend for registering AlUla Old Town’s historic buildings — optimized Map & Feature Services, a schema linking every building to its drawings and media, and progress-driven symbology.',
    description:
      'Built at Etqaan Urban Planning Solutions. Published optimized RESTful Map & Feature Services, engineered a relational schema that links each spatial feature to its AutoCAD files, PDFs and multimedia, and built a dynamic workflow that tracks construction progress through completion-based symbolization.',
    problem:
      'Hundreds of historic buildings had documentation scattered across CAD files, PDFs and media, with no single spatial view of registration and construction progress.',
    approach:
      'Designed a relational geodatabase schema around the building footprint, published it as Map & Feature Services on ArcGIS Enterprise, and drove symbology from completion status so progress is visible on the map.',
    role: 'GIS Analyst & Urban Planner — geospatial backend architecture.',
    stack: ['ArcGIS Enterprise', 'ArcGIS Pro', 'Map & Feature Services', 'Geodatabase Design', 'REST'],
    image: null, // TODO: only if the client allows screenshots — otherwise keep the generated placeholder
    gallery: [],
    links: { live: null, code: null, storymap: null, video: null },
    location: { lat: 26.6206, lng: 37.9186, label: 'AlUla Old Town, Saudi Arabia' },
    metrics: [],
    verified: true,
    featured: true,
    published: true,
    year: 2025,
    period: '2025-01 → 2025-05',
    client: 'Etqaan Urban Planning Solutions',
  },
  {
    id: 3,
    slug: 'ksa-urban-heritage-origins',
    title: 'Origins of Urban Heritage in Saudi Arabian Regions',
    category: ['GIS'],
    type: 'client',
    summary:
      'Led the geospatial data lifecycle for a nationwide heritage-documentation initiative across Saudi Arabia.',
    description:
      'Built at Etqaan Urban Planning Solutions for a heritage initiative connected to the Saudi Heritage Commission. Set spatial standards for heritage-site identification, managed ArcGIS Enterprise synchronization, designed the field-survey logic used by collection teams, and ran advanced spatial queries to safeguard the national heritage database.',
    problem:
      'A national heritage database fed by many field teams needs consistent spatial standards and clean, synchronized data.',
    approach:
      'Defined site-identification standards, designed Survey123 field-survey logic, managed Enterprise sync between field and office, and ran spatial QA queries on incoming data.',
    role: 'GIS Analyst & Urban Planner — led the geospatial data lifecycle.',
    stack: ['ArcGIS Enterprise', 'Survey123', 'ArcGIS Pro', 'Spatial SQL / Queries', 'Python'],
    image: null, // TODO: only if the client allows
    gallery: [],
    links: { live: null, code: null, storymap: null, video: null },
    location: { lat: 24.7136, lng: 46.6753, label: 'Saudi Arabia (nationwide)' },
    metrics: [],
    verified: true,
    featured: true,
    published: true,
    year: 2025,
    period: '2025-05 → 2025-10',
    client: 'Etqaan Urban Planning Solutions',
  },
  {
    id: 4,
    slug: 'trafficiq',
    title: 'TrafficIQ — Real-Time Accident & Traffic Prediction',
    category: ['AI', 'GIS', 'Backend'],
    summary:
      'An end-to-end ML system that predicts accident severity and congestion from a single map click, with a geo-agnostic model that transfers to Cairo.',
    description:
      'Trained on ~451k US accident records, TrafficIQ serves two prediction tasks (accident severity and traffic congestion) through a FastAPI backend and a Leaflet map front end. A geo-agnostic model variant is trained without geographic features so it can be applied to cities outside the training region, such as Cairo. The project doubles as a documented case study in target leakage.',
    problem:
      'Public traffic datasets are mostly North American, and models trained on them silently extrapolate when used elsewhere. The first model also scored a suspicious 99.98% accuracy.',
    approach:
      'Diagnosed the 99.98% as target leakage (the label was a deterministic rule over the input features), reformulated labeling with an empirical spatiotemporal scheme, and built a geo-agnostic variant for cross-region transfer — reaching an honest 0.81 macro-F1.',
    role: 'TODO: confirm — team project; describe Ahmed’s exact part (e.g. GIS layer, API, modeling).',
    stack: ['Python', 'FastAPI', 'XGBoost', 'scikit-learn', 'Leaflet'],
    image: '/images/projects/trafficiq.webp', // TODO
    gallery: [],
    links: {
      live: null, // TODO: add if deployed
      code: `${GITHUB_BASE}/Big-Data---ML---GIS`,
      storymap: null,
    },
    location: { lat: 30.0444, lng: 31.2357, label: 'Cairo, Egypt (transfer target)' },
    metrics: [
      { label: 'Training records', value: '451k', verified: true },
      { label: 'Macro-F1 (after fixing leakage)', value: '0.81', verified: true },
    ],
    verified: true,
    featured: true,
    published: true,
    year: 2026,
  },
  {
    id: 5,
    slug: 'new-delta-precision-agriculture',
    title: 'AI-Driven Precision Agriculture — New Delta, Egypt',
    category: ['AI', 'GIS'],
    summary:
      'Multi-index Sentinel-2 monitoring and a from-scratch Ridge Regression model forecasting agricultural productivity in Egypt’s New Delta (2019–2026).',
    description:
      'Companion code and live dashboard for a research study. Five Sentinel-2 spectral indices (NDVI, EVI, SAVI, NDMI, NDWI) are combined into six composite KPIs — including a Vegetation Health Index, Water Stress Index and Agricultural Productivity Index — and a Ridge Regression model forecasts productivity month by month.',
    problem:
      'Reclaimed desert land in the New Delta needs continuous, low-cost monitoring of crop health and water stress.',
    approach:
      'Built a composite KPI framework from satellite indices, then implemented Ridge Regression in pure NumPy (closed-form solution, intercept excluded from the penalty) with Fourier seasonality features and expanding-window time-series cross-validation.',
    role: 'TODO: confirm — the CV publication (AUJES 2025) is a different paper (land suitability / bio-economy mapping). Is this ML work a separate, unpublished paper?',
    stack: ['Python', 'NumPy', 'Sentinel-2', 'Remote Sensing', 'JavaScript dashboard'],
    image: '/images/projects/new-delta.webp', // TODO: screenshot of the Vercel dashboard
    gallery: [],
    links: {
      live: 'https://newdelta-agri-dashboard.vercel.app',
      code: `${GITHUB_BASE}/newdeltaML`,
      storymap: null,
    },
    location: { lat: 30.55, lng: 29.9, label: 'New Delta, Egypt' }, // TODO: confirm study-area centroid
    metrics: [
      { label: 'Monthly observations', value: '85', verified: true },
      { label: 'Composite KPIs', value: '6', verified: true },
      { label: 'Time span', value: '2019–2026', verified: true },
    ],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },

  // ───────────────────────────── AI & GIS ─────────────────────────────
  {
    id: 6,
    slug: 'qgis-salah-mcp',
    title: 'QGIS Salah MCP',
    category: ['AI', 'GIS'],
    summary:
      'Control QGIS with natural language: an MCP server plus a QGIS plugin that executes real PyQGIS operations from Claude.',
    description:
      'The open-source sibling of ArcGIS Pro Salah MCP. A FastMCP server talks to Claude over stdio and forwards commands over a TCP socket to a plugin running inside QGIS 3.34+ / 4.x — so “load my shapefile and buffer it by 500 m” becomes real layers on the map.',
    problem: 'Routine QGIS work requires many menu clicks and PyQGIS knowledge.',
    approach:
      'Separated the MCP server (plain Python, no QGIS dependency) from an in-QGIS socket server using a length-prefixed JSON protocol, with a dock widget to start/stop the bridge.',
    role: 'Sole author.',
    stack: ['Model Context Protocol', 'FastMCP', 'Python', 'PyQGIS', 'QGIS', 'TCP sockets'],
    image: '/images/projects/qgis-salah-mcp.webp', // TODO
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/QGIS_Salah_MCP`, storymap: null },
    location: null,
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 7,
    slug: 'geoai-assistant',
    title: 'GeoAI Assistant',
    category: ['AI', 'GIS'],
    summary:
      'A multi-mode AI helper for GIS engineers: six modes, three LLM providers, including satellite image Q&A and change detection.',
    description:
      'One Streamlit app with six purpose-built modes: General GIS chat, a PyQGIS code generator (with post-generation checks for deprecated APIs and missing CRS), Satellite image Q&A, before/after Change Detection, an Egyptian Arabic/English Address Parser that returns structured JSON, and a cross-provider Benchmark. Built for the ITI Gen AI course.',
    problem: 'GIS engineers juggle many small AI tasks that each need a different prompt and model.',
    approach:
      'A capability-aware sidebar filters providers/models per mode (vision modes hide text-only models), with per-mode history, sample inputs, and a debug view of the exact payload sent.',
    role: 'Sole author (ITI Gen AI course lab).',
    stack: ['Python', 'Streamlit', 'Gemini', 'Groq', 'OpenRouter', 'PyQGIS'],
    image: '/images/projects/geoai-assistant.webp', // TODO
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/geoai-assistant`, storymap: null },
    location: null,
    metrics: [
      { label: 'Modes', value: '6', verified: true },
      { label: 'LLM providers', value: '3', verified: true },
    ],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 8,
    slug: 'gis-rag-assistant',
    title: 'GIS Document Assistant (RAG)',
    category: ['AI', 'GIS'],
    summary:
      'Chat with GIS manuals: upload PDFs and get Gemini answers with page-level sources, in Arabic or English.',
    description:
      'A RAG-powered Streamlit app built as an ITI GIS-track lab. PDFs are chunked, embedded and stored in ChromaDB; answers cite their source pages. Includes an Arabic/English toggle, JSON export of the conversation, and live usage stats.',
    problem: 'GIS documentation is long and scattered across many PDFs.',
    approach: 'Chunk → embed → retrieve from ChromaDB → answer with Gemini, always returning page references.',
    role: 'Sole author (ITI lab project).',
    stack: ['Python', 'Streamlit', 'Gemini', 'ChromaDB', 'RAG'],
    image: '/images/projects/gis-rag-assistant.webp', // TODO
    gallery: [],
    links: {
      live: 'https://gis-rag-assistant.streamlit.app/',
      code: `${GITHUB_BASE}/gis-rag-assistant`,
      storymap: null,
    },
    location: null,
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 9,
    slug: 'generate-parcel-report-toolbox',
    title: 'Generate Parcel Report — ArcPy Toolbox',
    category: ['GIS'],
    summary:
      'An ArcGIS Pro Python Toolbox (.pyt) that intersects parcels with building footprints and writes a per-parcel land-use report.',
    description:
      'For every parcel, the tool finds the buildings fully contained inside it, totals residential and commercial area, and writes the results to a summary table (created automatically, overwrite or append mode).',
    problem: 'Per-parcel land-use summaries were done manually.',
    approach: 'Spatial containment with ArcPy cursors inside a reusable .pyt tool with validated parameters and diagnostics messages.',
    role: 'Sole author (ITI geoprocessing scripting assignment).',
    stack: ['Python', 'ArcPy', 'ArcGIS Pro'],
    image: '/images/projects/parcel-report.webp', // TODO
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/arcpy-toolbox-GenerateParcelReport`, storymap: null },
    location: null,
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 10,
    slug: 'arcgis-enterprise-handbook',
    title: 'ArcGIS Enterprise — Architect’s Handbook',
    category: ['GIS'],
    type: 'writing', // can also be shown in a Blog / Writing section
    summary:
      'A complete administration and architecture guide for ArcGIS Enterprise, from fundamentals to AWS and Kubernetes deployments, with Arabic summaries.',
    description:
      'A professional handbook covering deployment, administration, security, DevOps, troubleshooting, labs and interview questions for ArcGIS Enterprise — written in English with an Arabic summary box in every part.',
    problem: 'Enterprise GIS knowledge is spread across many official docs and courses.',
    approach: 'Consolidated official Esri documentation, Architecture Center material and course content into one structured bilingual reference.',
    role: 'Author.',
    stack: ['ArcGIS Enterprise', 'AWS', 'Kubernetes', 'Technical Writing'],
    image: '/images/projects/enterprise-handbook.webp', // TODO
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/ArcGIS-Enterprise-Documentation`, storymap: null },
    location: null,
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },

  // ───────────────────────────── WEB & BACKEND ─────────────────────────────
  {
    id: 11,
    slug: 'nosej-digital-boutique',
    title: 'NOSEJ — The Digital Boutique',
    category: ['Web', 'Backend'],
    summary:
      'A responsive online boutique for a curated collection of high-end essentials — React + MUI front end on a Node/Express/MongoDB API, deployed on Vercel.',
    description:
      'Front end built with React, Vite and Material UI: live search, protected routes, dark mode, lazy-loaded product cards and an error boundary. Backend in Node.js, Express and MongoDB with JWT authentication, admin product management, carts, wishlists and orders, fully documented with Swagger (OpenAPI 3).',
    problem: 'Practice building a production-style commerce flow end to end.',
    approach: 'Context-based client state (auth, cart, wishlist, theme, toasts), REST API with controllers/routes/middleware separation and centralized error handling.',
    role: 'Sole author — front end and back end.',
    stack: ['React', 'Vite', 'Material UI', 'Context API', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    image: '/images/projects/nosej.webp', // TODO
    gallery: [],
    links: {
      live: null, // TODO: Vercel URL (CV says it is deployed)
      code: `${GITHUB_BASE}/ART-gallery`,
      codeBackend: `${GITHUB_BASE}/ARTgallery-backend`,
      storymap: null,
    },
    location: null,
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 12,
    slug: 'iti-branch-viewer',
    title: 'ITI Branch Viewer',
    category: ['GIS', 'Web', 'Backend'],
    summary:
      'A spatial web app for managing ITI branches, serving locations as GeoJSON from PostGIS with stats and admin editing.',
    description:
      'Node.js + Express API over PostgreSQL/PostGIS: returns all branches as a GeoJSON FeatureCollection, computes branch counts and track distribution, and lets an admin add branches by coordinates or delete them.',
    problem: 'Visualize and manage institute branch locations on a map.',
    approach: 'Store branches as PostGIS points (EPSG:4326) and expose GeoJSON endpoints consumed by a web map.',
    role: 'Sole author.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'GeoJSON'],
    image: '/images/projects/iti-branch-viewer.webp', // TODO
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/AddITIBranches`, storymap: null },
    location: { lat: 30.0712, lng: 31.0209, label: 'ITI Smart Village, Giza' }, // TODO: confirm
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },

  // ───────────────────────────── EARLIER GIS STUDIES (old site) ─────────────────────────────
  {
    id: 13,
    slug: 'salloum-flood-simulation',
    title: 'Flash Flood Simulation & Risk Assessment — Salloum',
    category: ['GIS', '3D'],
    summary:
      'Modeled rainfall, flash floods and inundation for Salloum in ArcGIS Pro, mapped vulnerability, and published a full pipeline tutorial on YouTube.',
    description:
      'Terrain (contours, topography, slopes), soil, geology and water studies (floods, watercourses) led to identifying torrents as the most dangerous hazard. Scenarios were modeled, a vulnerability map of buildings, population and families at risk was produced, and the results fed into immediate, short-term and long-term plans for the city. The flood modeling — from data preparation to 3D visualization — is also published as a public YouTube tutorial.',
    problem: 'Salloum needed an evidence-based view of environmental hazards to guide planning.',
    approach: 'Rainfall → flash-flood → inundation modeling in ArcGIS Pro, hazard scenarios, vulnerability mapping and 3D visualization, published as an ArcGIS StoryMap and a video tutorial.',
    role: 'Personal / academic project.',
    stack: ['ArcGIS Pro', 'ArcGIS StoryMaps', 'Hydrological Analysis', 'Risk Assessment'],
    image: '/images/projects/salloum.webp', // from old site img/1.jpeg
    gallery: [],
    links: {
      live: null,
      code: null,
      storymap: 'https://storymaps.arcgis.com/stories/821b762db0b14c36858b936a6b9f5932',
      video: null, // TODO: YouTube tutorial URL
    },
    location: { lat: 31.55, lng: 25.15, label: 'Salloum, Egypt' },
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: null, // TODO: likely 2019–2024 (Cairo University)
  },
  {
    id: 14,
    slug: 'el-gouna-thermal-comfort',
    title: 'Urban Microclimate & Thermal Comfort — El Gouna',
    category: ['GIS', '3D'],
    summary:
      'Compared urban design alternatives for a residential group in El Gouna using ENVI-met simulation and ArcGIS Pro to pick the most thermally comfortable option.',
    description:
      'Studied the urban atmospheric environment of several design alternatives, focusing on thermal comfort indicators. ENVI-met ran the microclimate simulations and ArcGIS Pro was used to visualize and compare the results to select the optimal alternative.',
    problem: 'Choose the residential layout that performs best for outdoor thermal comfort in a hot climate.',
    approach: 'ENVI-met simulation per alternative → comparison of thermal comfort indicators in ArcGIS Pro.',
    role: 'TODO: confirm — Cairo University academic project? team or individual?',
    stack: ['ENVI-met', 'ArcGIS Pro', 'Urban Microclimate'],
    image: '/images/projects/el-gouna.webp', // from old site img/3.jpeg
    gallery: [],
    links: { live: null, code: null, storymap: null },
    location: { lat: 27.3942, lng: 33.6782, label: 'El Gouna, Red Sea' },
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: null, // TODO: likely 2019–2024 (Cairo University)
  },
  {
    id: 15,
    slug: 'east-assiut-flood-hazard',
    title: 'Flood Hazard & Development Planning — East Assiut',
    category: ['GIS'],
    summary:
      'Assessed the development potential of eastern Assiut under flood risk, using USGS data and planning-based mitigation.',
    description:
      'Prepared the eastern Assiut region for developmental use by analyzing flood hazards and addressing them with planning methods. Raw data came from the USGS and was analyzed in ArcGIS Pro; results were published as a StoryMap.',
    problem: 'Unlock development in eastern Assiut while managing flood danger.',
    approach: 'USGS terrain data → flood hazard analysis in ArcGIS Pro → planning-based mitigation proposals.',
    role: 'TODO: confirm — Cairo University academic project? team or individual?',
    stack: ['ArcGIS Pro', 'USGS Data', 'Flood Analysis', 'ArcGIS StoryMaps'],
    image: '/images/projects/east-assiut.webp', // from old site img/2.jpeg
    gallery: [],
    links: { live: null, code: null, storymap: 'https://arcg.is/1ffWfe' },
    location: { lat: 27.2, lng: 31.3, label: 'East Assiut, Egypt' }, // TODO: confirm study-area centroid
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: null, // TODO: likely 2019–2024 (Cairo University)
  },

  // ───────────────────────────── DRAFTS (hidden until described) ─────────────────────────────
  // These repos have no README yet. Fill in and set `published: true`.
  {
    id: 16,
    slug: 'webgis-application-api',
    title: 'WebGIS Application API', // TODO: real name
    category: ['Backend', 'GIS'],
    summary: 'TODO: ASP.NET Core Web API — what does it do?',
    description: 'TODO',
    problem: 'TODO',
    approach: 'TODO',
    role: 'TODO',
    stack: ['ASP.NET Core', 'C#'], // TODO: add EF Core / SQL Server / PostGIS if used
    image: null,
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/WebApiDotNet`, storymap: null },
    location: null,
    metrics: [],
    verified: false,
    featured: false,
    published: false,
    year: 2026,
  },
  {
    id: 17,
    slug: 'prespotin',
    title: 'PreSpotIn', // TODO
    category: ['Backend'],
    summary: 'TODO: what is PreSpotIn?',
    description: 'TODO',
    problem: 'TODO',
    approach: 'TODO',
    role: 'TODO',
    stack: ['ASP.NET Core', 'C#'],
    image: null,
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/PreSpotIn`, storymap: null },
    location: null,
    metrics: [],
    verified: false,
    featured: false,
    published: false,
    year: 2026,
  },
  {
    id: 18,
    slug: 'iti-system',
    title: 'ITI System', // TODO
    category: ['Web', 'Backend'],
    summary: 'TODO: ASP.NET MVC app — what does it manage?',
    description: 'TODO',
    problem: 'TODO',
    approach: 'TODO',
    role: 'TODO',
    stack: ['ASP.NET Core MVC', 'C#'],
    image: null,
    gallery: [],
    links: { live: null, code: `${GITHUB_BASE}/DotNetDemoStructure`, storymap: null },
    location: null,
    metrics: [],
    verified: false,
    featured: false,
    published: false,
    year: 2026,
  },
];

// ───────────────────────────── Selectors ─────────────────────────────
export const formatProjectNumber = (id) => String(id).padStart(2, '0');

export const getProjectPath = (project) =>
  `/projects/${formatProjectNumber(project.id)}/${project.slug}`;

export const getPublishedProjects = () =>
  PROJECTS.filter((p) => p.published).sort((a, b) => a.id - b.id);

// Resolves "/projects/01", "/projects/1", "/projects/01/any-slug" → project (published only)
export const getProjectByNumber = (number) => {
  const id = Number.parseInt(number, 10);
  if (Number.isNaN(id)) return null;
  return getPublishedProjects().find((p) => p.id === id) ?? null;
};

// Previous / next by number, wrapping around
export const getAdjacentProjects = (project) => {
  const list = getPublishedProjects();
  const index = list.findIndex((p) => p.id === project.id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  };
};

export const getFeaturedProjects = () => getPublishedProjects().filter((p) => p.featured);

export const getProjectsByCategory = (category) =>
  category === 'All'
    ? getPublishedProjects()
    : getPublishedProjects().filter((p) => p.category.includes(category));

// Pins for the GIS Lab map section
export const getMappedProjects = () => getPublishedProjects().filter((p) => p.location);

// Only render metrics Ahmed has confirmed
export const getVisibleMetrics = (project) => project.metrics.filter((m) => m.verified);
