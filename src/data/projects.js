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
  titleAr: '',
  category: [], // values from PROJECT_CATEGORIES (except 'All')
  summary: '', // 1–2 sentences, shown on the card
  summaryAr: '',
  description: '', // overview paragraph on the details page
  problem: '', // "The Challenge"
  approach: '', // "The Approach"
  role: '',
  stack: [],
  image: null, // '/images/projects/{slug}/cover.webp'
  gallery: [], // ['/images/projects/{slug}/1.webp', ...]
  videos: [], // optional demo clips: [{ src: '/videos/projects/{slug}/demo.mp4', poster: '/images/projects/{slug}/poster.webp', title }]
  links: { live: null, code: null, storymap: null, video: null }, // optional: codeBackend
  location: null, // { lat, lng, label } → adds a pin on the GIS Lab map
  metrics: [], // [{ label, value, verified: true }]
  verified: false,
  featured: false, // true = leads the default order; keep it to about three
  published: false,
  year: null,
  // optional: featuredRank (1 = first — orders the featured ones among themselves),
  //           type ('client' | 'writing'), client, period ('2025-01 → 2025-05')
};

export const PROJECTS = [
  // ───────────────────────────── FEATURED (4) ─────────────────────────────
  {
    id: 1,
    slug: 'arcgis-pro-salah-mcp',
    title: 'ArcGIS Pro Salah MCP',
    titleAr: 'ArcGIS Pro Salah MCP — خادم ذكاء اصطناعي وأداة Pro',
    category: ['AI', 'GIS', 'Backend'],
    summary:
      'A four-layer MCP server and ArcGIS Pro add-in that lets AI agents drive the whole ArcGIS stack — from desktop analysis to a published, deployed web app — in one conversation.',
    summaryAr:
      'خادم MCP متعدد الطبقات وملحق برمجيات لـ ArcGIS Pro يتيح لوكلاء الذكاء الاصطناعي التحكم بمنظومة ArcGIS بالكامل — من التحليل المكتبي إلى نشر تطبيقات الويب وتوليد لوحات التحكم.',
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
    image: '/images/projects/arcgis-pro-salah-mcp/cover.webp',
    gallery: [
      '/images/projects/arcgis-pro-salah-mcp/1.webp', // ArcGIS Pro ribbon + Claude conversation
      '/images/projects/arcgis-pro-salah-mcp/2.webp', // architecture diagram
      '/images/projects/arcgis-pro-salah-mcp/3.webp', // generated web app
      '/images/projects/arcgis-pro-salah-mcp/4.webp', // generated dashboard
      '/images/projects/arcgis-pro-salah-mcp/5.webp', // deployed to GitHub Pages
    ],
    videos: [
      {
        src: '/videos/projects/arcgis-pro-salah-mcp/demo.mp4',
        poster: '/images/projects/arcgis-pro-salah-mcp/poster.webp',
        title: 'From a prompt to a deployed web app',
      },
    ],
    links: {
      live: null,
      code: `${GITHUB_BASE}/ArcGIS_Salah_MCP`,
      storymap: null,
    },
    location: null,
    metrics: [
      { label: 'Tool layers', labelAr: 'طبقات الأدوات', value: '4', verified: true },
      { label: 'Ribbon buttons', labelAr: 'أزرار شريط الأدوات', value: '7', verified: true },
      { label: 'Agent clients supported', labelAr: 'العملاء المدعومين', value: 'Claude + Antigravity', verified: true },
    ],
    verified: true,
    featured: true,
    featuredRank: 1,
    published: true,
    year: 2026,
  },
  {
    id: 2,
    slug: 'alula-old-town-registration',
    title: 'Old Town Buildings Registration — AlUla, KSA',
    titleAr: 'توثيق وتسجيل مباني البلدة القديمة — العلا، السعودية',
    category: ['GIS', 'Backend'],
    type: 'client',
    summary:
      'The geospatial backend for registering AlUla Old Town’s historic buildings — optimized Map & Feature Services, a schema linking every building to its drawings and media, and progress-driven symbology.',
    summaryAr:
      'البنية المكانية التحتية لتوثيق وتسجيل مباني العلا التراثية — خدمات خرائط RESTful محسنة، وربط المباني بملفات الأوتوكاد والوسائط، ونظام تتبع الإنجاز عبر الترميز الديناميكي.',
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
    location: { lat: 26.6206, lng: 37.9186, label: 'AlUla Old Town, Saudi Arabia', labelAr: 'البلدة القديمة بالعلا، السعودية' },
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2025,
    period: '2025-01 → 2025-05',
    client: 'Etqaan Urban Planning Solutions',
  },
  {
    id: 3,
    slug: 'ksa-urban-heritage-origins',
    title: 'Origins of Urban Heritage in Saudi Arabian Regions',
    titleAr: 'أصول التراث العمراني في مناطق المملكة العربية السعودية',
    category: ['GIS'],
    type: 'client',
    summary:
      'Led the geospatial data lifecycle for a nationwide heritage-documentation initiative across Saudi Arabia.',
    summaryAr:
      'إدارة دورة حياة البيانات المكانية لمبادرة وطنية لحصر وتوثيق التراث العمراني بالمملكة، وتصميم استمارات Survey123 الميدانية وإدارة المزامنة السحابية.',
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
    location: { lat: 24.7136, lng: 46.6753, label: 'Saudi Arabia (nationwide)', labelAr: 'المملكة العربية السعودية (على مستوى الدولة)' },
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: 2025,
    period: '2025-05 → 2025-10',
    client: 'Etqaan Urban Planning Solutions',
  },
  {
    id: 4,
    slug: 'trafficiq',
    title: 'TrafficIQ — Real-Time Accident & Traffic Prediction',
    titleAr: 'TrafficIQ — نظام التنبؤ الذكي بالحوادث والازدحام المروري',
    category: ['AI', 'GIS', 'Backend'],
    summary:
      'An end-to-end ML system that predicts accident severity and congestion from a single map click, with a geo-agnostic model that transfers to Cairo.',
    summaryAr:
      'نظام تعلم آلي متكامل يتنبأ بشدة الحوادث ومستوى الاختناق المروري بنقرة واحدة على الخريطة، مع نموذج مكاني مرن قابل للتطبيق على مدينة القاهرة.',
    description:
      'Trained on ~451k US accident records, TrafficIQ serves two prediction tasks (accident severity and traffic congestion) through a FastAPI backend and a Leaflet map front end. A geo-agnostic model variant is trained without geographic features so it can be applied to cities outside the training region, such as Cairo. The project doubles as a documented case study in target leakage.',
    problem:
      'Public traffic datasets are mostly North American, and models trained on them silently extrapolate when used elsewhere. The first model also scored a suspicious 99.98% accuracy.',
    approach:
      'Diagnosed the 99.98% as target leakage (the label was a deterministic rule over the input features), reformulated labeling with an empirical spatiotemporal scheme, and built a geo-agnostic variant for cross-region transfer — reaching an honest 0.81 macro-F1.',
    role: 'TODO: confirm — team project; describe Ahmed’s exact part (e.g. GIS layer, API, modeling).',
    stack: ['Python', 'FastAPI', 'XGBoost', 'scikit-learn', 'Leaflet'],
    image: '/images/projects/trafficiq/cover.webp',
    gallery: [
      '/images/projects/trafficiq/1.webp', // point prediction
      '/images/projects/trafficiq/2.webp', // route analysis
      '/images/projects/trafficiq/3.webp', // hex-grid mode
      '/images/projects/trafficiq/4.webp', // grid heatmap
    ],
    links: {
      live: null, // TODO: confirm — https://big-data-ml-gis.vercel.app is set as the repo homepage but returned HTTP 500 when checked
      code: `${GITHUB_BASE}/Big-Data---ML---GIS`,
      storymap: null,
    },
    location: { lat: 30.0444, lng: 31.2357, label: 'Cairo, Egypt (transfer target)', labelAr: 'القاهرة، مصر (نطاق التطبيق)' },
    metrics: [
      { label: 'Training records', labelAr: 'سجلات تدريب النموذج', value: '451k', verified: true },
      { label: 'Macro-F1 (after fixing leakage)', labelAr: 'دقة النموذج (Macro-F1)', value: '0.81', verified: true },
    ],
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 5,
    slug: 'new-delta-precision-agriculture',
    title: 'AI-Driven Precision Agriculture — New Delta, Egypt',
    titleAr: 'الزراعة الدقيقة بالذكاء الاصطناعي — الدلتا الجديدة، مصر',
    category: ['AI', 'GIS'],
    summary:
      'Multi-index Sentinel-2 monitoring and a from-scratch Ridge Regression model forecasting agricultural productivity in Egypt’s New Delta (2019–2026).',
    summaryAr:
      'مراقبة متعددة المؤشرات عبر أقمار Sentinel-2 الصناعية مع نموذج انحدار للتنبؤ بالإنتاجية الزراعية والإجهاد المائي في الدلتا الجديدة (2019–2026).',
    description:
      'Companion code and live dashboard for a research study. Five Sentinel-2 spectral indices (NDVI, EVI, SAVI, NDMI, NDWI) are combined into six composite KPIs — including a Vegetation Health Index, Water Stress Index and Agricultural Productivity Index — and a Ridge Regression model forecasts productivity month by month.',
    problem:
      'Reclaimed desert land in the New Delta needs continuous, low-cost monitoring of crop health and water stress.',
    approach:
      'Built a composite KPI framework from satellite indices, then implemented Ridge Regression in pure NumPy (closed-form solution, intercept excluded from the penalty) with Fourier seasonality features and expanding-window time-series cross-validation.',
    role: 'TODO: confirm — the CV publication (AUJES 2025) is a different paper (land suitability / bio-economy mapping). Is this ML work a separate, unpublished paper?',
    stack: ['Python', 'NumPy', 'Sentinel-2', 'Remote Sensing', 'JavaScript dashboard'],
    image: '/images/projects/new-delta-precision-agriculture/cover.webp',
    gallery: [
      '/images/projects/new-delta-precision-agriculture/1.webp', // dashboard
      '/images/projects/new-delta-precision-agriculture/2.webp', // study environment
      '/images/projects/new-delta-precision-agriculture/3.webp', // methodology
      '/images/projects/new-delta-precision-agriculture/4.webp', // abstract
      '/images/projects/new-delta-precision-agriculture/5.webp', // model evaluation
    ],
    links: {
      live: 'https://newdelta-agri-dashboard.vercel.app',
      code: `${GITHUB_BASE}/newdeltaML`,
      storymap: null,
    },
    location: { lat: 30.55, lng: 29.9, label: 'New Delta, Egypt', labelAr: 'الدلتا الجديدة، مصر' }, // TODO: confirm study-area centroid
    metrics: [
      { label: 'Monthly observations', labelAr: 'رصدات شهرية', value: '85', verified: true },
      { label: 'Composite KPIs', labelAr: 'مؤشرات أداء مجمعة', value: '6', verified: true },
      { label: 'Time span', labelAr: 'المدى الزمني', value: '2019–2026', verified: true },
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
    titleAr: 'QGIS Salah MCP — التحكم ببرنامج QGIS عبر المحادثة',
    category: ['AI', 'GIS'],
    summary:
      'Control QGIS with natural language: an MCP server plus a QGIS plugin that executes real PyQGIS operations from Claude.',
    summaryAr:
      'التحكم في برمجيات QGIS باللغة الطبيعية: خادم MCP متطور وملحق برمجي ينفذ عمليات PyQGIS التحليلية المباشرة بناءً على أوامر Claude.',
    description:
      'The open-source sibling of ArcGIS Pro Salah MCP. A FastMCP server talks to Claude over stdio and forwards commands over a TCP socket to a plugin running inside QGIS 3.34+ / 4.x — so “load my shapefile and buffer it by 500 m” becomes real layers on the map.',
    problem: 'Routine QGIS work requires many menu clicks and PyQGIS knowledge.',
    approach:
      'Separated the MCP server (plain Python, no QGIS dependency) from an in-QGIS socket server using a length-prefixed JSON protocol, with a dock widget to start/stop the bridge.',
    role: 'Sole author.',
    stack: ['Model Context Protocol', 'FastMCP', 'Python', 'PyQGIS', 'QGIS', 'TCP sockets'],
    image: '/images/projects/qgis-salah-mcp/cover.webp',
    gallery: [
      '/images/projects/qgis-salah-mcp/1.webp', // satellite basemap, Egypt governorates
      '/images/projects/qgis-salah-mcp/2.webp', // styled governorates
      '/images/projects/qgis-salah-mcp/3.webp', // ITI Smart Village
      '/images/projects/qgis-salah-mcp/4.webp', // road network
      '/images/projects/qgis-salah-mcp/5.webp', // road buffer
    ],
    videos: [
      {
        src: '/videos/projects/qgis-salah-mcp/demo.mp4',
        poster: '/images/projects/qgis-salah-mcp/poster.webp',
        title: 'Claude driving QGIS in natural language',
      },
    ],
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
    titleAr: 'GeoAI Assistant — مساعد الـ GIS والذكاء الاصطناعي',
    category: ['AI', 'GIS'],
    summary:
      'A multi-mode AI helper for GIS engineers: six modes, three LLM providers, including satellite image Q&A and change detection.',
    summaryAr:
      'أداة ذكاء اصطناعي مكاني بستة أنماط تحليلية لمساعدة مهندسي الـ GIS: استفسارات مكانية، توليد كود PyQGIS، والتعرف على التغيرات في صور الأقمار الصناعية.',
    description:
      'One Streamlit app with six purpose-built modes: General GIS chat, a PyQGIS code generator (with post-generation checks for deprecated APIs and missing CRS), Satellite image Q&A, before/after Change Detection, an Egyptian Arabic/English Address Parser that returns structured JSON, and a cross-provider Benchmark. Built for the ITI Gen AI course.',
    problem: 'GIS engineers juggle many small AI tasks that each need a different prompt and model.',
    approach:
      'A capability-aware sidebar filters providers/models per mode (vision modes hide text-only models), with per-mode history, sample inputs, and a debug view of the exact payload sent.',
    role: 'Sole author (ITI Gen AI course lab).',
    stack: ['Python', 'Streamlit', 'Gemini', 'Groq', 'OpenRouter', 'PyQGIS'],
    image: '/images/projects/geoai-assistant/cover.webp',
    gallery: [
      '/images/projects/geoai-assistant/1.webp', // General GIS chat
      '/images/projects/geoai-assistant/2.webp', // change detection
      '/images/projects/geoai-assistant/3.webp', // address parser
      '/images/projects/geoai-assistant/4.webp', // Salah SDK docs
    ],
    links: { live: null, code: `${GITHUB_BASE}/geoai-assistant`, storymap: null },
    location: null,
    metrics: [
      { label: 'Modes', labelAr: 'أنماط عمل ذكية', value: '6', verified: true },
      { label: 'LLM providers', labelAr: 'مزودي نماذج ذكاء اصطناعي', value: '3', verified: true },
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
    titleAr: 'مساعد وثائق الـ GIS الذكي (RAG)',
    category: ['AI', 'GIS'],
    summary:
      'Chat with GIS manuals: upload PDFs and get Gemini answers with page-level sources, in Arabic or English.',
    summaryAr:
      'نظام استرجاع وتوليد ذكي (RAG) يتيح المحادثة المباشرة مع كتيبات ومراجع الـ GIS وتقديم إجابات موثقة بأرقام الصفحات باللغتين العربية والإنجليزية.',
    description:
      'A RAG-powered Streamlit app built as an ITI GIS-track lab. PDFs are chunked, embedded and stored in ChromaDB; answers cite their source pages. Includes an Arabic/English toggle, JSON export of the conversation, and live usage stats.',
    problem: 'GIS documentation is long and scattered across many PDFs.',
    approach: 'Chunk → embed → retrieve from ChromaDB → answer with Gemini, always returning page references.',
    role: 'Sole author (ITI lab project).',
    stack: ['Python', 'Streamlit', 'Gemini', 'ChromaDB', 'RAG'],
    image: '/images/projects/gis-rag-assistant/cover.webp',
    gallery: ['/images/projects/gis-rag-assistant/1.webp'], // Arabic (RTL) interface
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
    titleAr: 'صندوق أدوات تقارير قطع الأراضي — ArcPy Toolbox',
    category: ['GIS'],
    summary:
      'An ArcGIS Pro Python Toolbox (.pyt) that intersects parcels with building footprints and writes a per-parcel land-use report.',
    summaryAr:
      'صندوق أدوات بايثون متقدم لبرنامج ArcGIS Pro لأتمتة تقاطع قطع الأراضي مع كتل المباني واستخراج تقارير استخدامات الأراضي وحساب المساحات بدقة.',
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

  // ───────────────────────────── WEB & BACKEND ─────────────────────────────
  {
    id: 11,
    slug: 'nosej-digital-boutique',
    title: 'NOSEJ — The Digital Boutique',
    titleAr: 'NOSEJ — متجر إلكتروني متكامل (Full-Stack)',
    category: ['Web', 'Backend'],
    summary:
      'A responsive online boutique for a curated collection of high-end essentials — React + MUI front end on a Node/Express/MongoDB API, deployed on Vercel.',
    summaryAr:
      'تطبيق ويب متكامل للتجارة الإلكترونية مبني بـ React و Node.js/Express و MongoDB مع مصادقة JWT ولوحة تحكم لإدارة المنتجات والطلبات.',
    description:
      'Front end built with React, Vite and Material UI: live search, protected routes, dark mode, lazy-loaded product cards and an error boundary. Backend in Node.js, Express and MongoDB with JWT authentication, admin product management, carts, wishlists and orders, fully documented with Swagger (OpenAPI 3).',
    problem: 'Practice building a production-style commerce flow end to end.',
    approach: 'Context-based client state (auth, cart, wishlist, theme, toasts), REST API with controllers/routes/middleware separation and centralized error handling.',
    role: 'Sole author — front end and back end.',
    stack: ['React', 'Vite', 'Material UI', 'Context API', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    image: '/images/projects/nosej-digital-boutique/cover.webp',
    gallery: [
      '/images/projects/nosej-digital-boutique/1.webp', // categories
      '/images/projects/nosej-digital-boutique/2.webp', // best sellers
      '/images/projects/nosej-digital-boutique/3.webp', // shop
      '/images/projects/nosej-digital-boutique/4.webp', // product page
      '/images/projects/nosej-digital-boutique/5.webp', // dark mode
    ],
    links: {
      live: 'https://art-gallery-gules-three.vercel.app', // repo homepage; verified reachable
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
    titleAr: 'مستعرض فروع معهد ITI التفاعلي — WebGIS',
    category: ['GIS', 'Web', 'Backend'],
    summary:
      'A spatial web app for managing ITI branches, serving locations as GeoJSON from PostGIS with stats and admin editing.',
    summaryAr:
      'منصة خرائط تفاعلية لإدارة واستعراض فروع معهد تكنولوجيا المعلومات، مبنية بـ Node.js و PostGIS لتقديم البيانات بصيغة GeoJSON مع لوحة تحكم إدارية.',
    description:
      'Node.js + Express API over PostgreSQL/PostGIS: returns all branches as a GeoJSON FeatureCollection, computes branch counts and track distribution, and lets an admin add branches by coordinates or delete them.',
    problem: 'Visualize and manage institute branch locations on a map.',
    approach: 'Store branches as PostGIS points (EPSG:4326) and expose GeoJSON endpoints consumed by a web map.',
    role: 'Sole author.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'GeoJSON'],
    image: '/images/projects/iti-branch-viewer/cover.webp',
    gallery: [
      '/images/projects/iti-branch-viewer/1.webp', // branch selected
      '/images/projects/iti-branch-viewer/2.webp', // satellite basemap
      '/images/projects/iti-branch-viewer/3.webp', // admin: add a branch
    ],
    videos: [
      {
        src: '/videos/projects/iti-branch-viewer/demo.mp4',
        poster: '/images/projects/iti-branch-viewer/poster.webp',
        title: 'Express + PostgreSQL/PostGIS walkthrough',
        titleAr: 'جولة تعريفية بالخادم وقاعدة البيانات المكانية PostGIS',
      },
    ],
    links: { live: null, code: `${GITHUB_BASE}/AddITIBranches`, storymap: null },
    location: {
      lat: 30.0712,
      lng: 31.021,
      label: 'ITI Smart Village, Giza',
      labelAr: 'معهد تكنولوجيا المعلومات ITI — القرية الذكية، الجيزة',
    }, // matches the Smart Village row in the app’s PostGIS table
    metrics: [],
    verified: true,
    featured: true,
    featuredRank: 3,
    published: true,
    year: 2026,
  },

  // ───────────────────────────── EARLIER GIS STUDIES (old site) ─────────────────────────────
  {
    id: 13,
    slug: 'salloum-flood-simulation',
    title: 'Flash Flood Simulation & Risk Assessment — Salloum',
    titleAr: 'محاكاة مخاطر السيول وتقييم الهشاشة — السلوم',
    category: ['GIS', '3D'],
    summary:
      'Modeled rainfall, flash floods and inundation for Salloum in ArcGIS Pro, mapped vulnerability, and published a full pipeline tutorial on YouTube.',
    summaryAr:
      'نمذجة هيدرولوجية ومحاكاة لمخاطر السيول بمدينة السلوم الحدودية باستخدام ArcGIS Pro لتقييم تعرض الكتلة العمرانية وتحديد أولويات الحماية.',
    description:
      'Terrain (contours, topography, slopes), soil, geology and water studies (floods, watercourses) led to identifying torrents as the most dangerous hazard. Scenarios were modeled, a vulnerability map of buildings, population and families at risk was produced, and the results fed into immediate, short-term and long-term plans for the city. The flood modeling — from data preparation to 3D visualization — is also published as a public YouTube tutorial.',
    problem: 'Salloum needed an evidence-based view of environmental hazards to guide planning.',
    approach: 'Rainfall → flash-flood → inundation modeling in ArcGIS Pro, hazard scenarios, vulnerability mapping and 3D visualization, published as an ArcGIS StoryMap and a video tutorial.',
    role: 'Personal / academic project.',
    stack: ['ArcGIS Pro', 'ArcGIS StoryMaps', 'Hydrological Analysis', 'Risk Assessment'],
    image: '/images/projects/salloum-flood-simulation/cover.webp',
    gallery: [
      '/images/projects/salloum-flood-simulation/1.webp',
      '/images/projects/salloum-flood-simulation/2.webp',
      '/images/projects/salloum-flood-simulation/3.webp',
      '/images/projects/salloum-flood-simulation/4.webp',
      '/images/projects/salloum-flood-simulation/5.webp',
    ],
    links: {
      live: null,
      code: null,
      storymap: 'https://storymaps.arcgis.com/stories/821b762db0b14c36858b936a6b9f5932',
      video: null, // TODO: YouTube tutorial URL
    },
    location: { lat: 31.55, lng: 25.15, label: 'Salloum, Egypt', labelAr: 'مدينة السلوم، مطروح، مصر' },
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
    titleAr: 'المناخ المحلي العمراني والراحة الحرارية — الجونة',
    category: ['GIS', '3D'],
    summary:
      'Compared urban design alternatives for a residential group in El Gouna using ENVI-met simulation and ArcGIS Pro to pick the most thermally comfortable option.',
    summaryAr:
      'مقارنة البدائل التخطيطية لمجموعة سكنية بمدينة الجونة باستخدام محاكاة ENVI-met و ArcGIS Pro لتحديد البديل الأفضل للراحة الحرارية الخارجية.',
    description:
      'Studied the urban atmospheric environment of several design alternatives, focusing on thermal comfort indicators. ENVI-met ran the microclimate simulations and ArcGIS Pro was used to visualize and compare the results to select the optimal alternative.',
    problem: 'Choose the residential layout that performs best for outdoor thermal comfort in a hot climate.',
    approach: 'ENVI-met simulation per alternative → comparison of thermal comfort indicators in ArcGIS Pro.',
    role: 'TODO: confirm — Cairo University academic project? team or individual?',
    stack: ['ENVI-met', 'ArcGIS Pro', 'Urban Microclimate'],
    image: '/images/projects/el-gouna.webp', // from old site img/3.jpeg
    gallery: [],
    links: { live: null, code: null, storymap: null },
    location: { lat: 27.3942, lng: 33.6782, label: 'El Gouna, Red Sea', labelAr: 'الجونة، البحر الأحمر، مصر' },
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
    titleAr: 'مخاطر السيول والتخطيط التنموي — شرق أسيوط',
    category: ['GIS'],
    summary:
      'Assessed the development potential of eastern Assiut under flood risk, using USGS data and planning-based mitigation.',
    summaryAr:
      'تقييم إمكانيات التنمية العمرانية لمنطقة شرق أسيوط في ظل مخاطر السيول بالاعتماد على بيانات USGS وتحليلات الـ GIS في ArcGIS Pro.',
    description:
      'Prepared the eastern Assiut region for developmental use by analyzing flood hazards and addressing them with planning methods. Raw data came from the USGS and was analyzed in ArcGIS Pro; results were published as a StoryMap.',
    problem: 'Unlock development in eastern Assiut while managing flood danger.',
    approach: 'USGS terrain data → flood hazard analysis in ArcGIS Pro → planning-based mitigation proposals.',
    role: 'TODO: confirm — Cairo University academic project? team or individual?',
    stack: ['ArcGIS Pro', 'USGS Data', 'Flood Analysis', 'ArcGIS StoryMaps'],
    image: '/images/projects/east-assiut-flood-hazard/cover.webp',
    gallery: [
      '/images/projects/east-assiut-flood-hazard/1.webp',
      '/images/projects/east-assiut-flood-hazard/2.webp',
      '/images/projects/east-assiut-flood-hazard/3.webp',
      '/images/projects/east-assiut-flood-hazard/4.webp',
      '/images/projects/east-assiut-flood-hazard/5.webp',
    ],
    links: { live: null, code: null, storymap: 'https://arcg.is/1ffWfe' },
    location: { lat: 27.2, lng: 31.3, label: 'East Assiut, Egypt', labelAr: 'شرق أسيوط، مصر' }, // TODO: confirm study-area centroid
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
    titleAr: 'واجهة برمجية لتطبيقات WebGIS — ASP.NET Core',
    category: ['Backend', 'GIS'],
    summary: 'TODO: ASP.NET Core Web API — what does it do?',
    summaryAr: 'واجهة تطبيقات خلفية مبنية بـ ASP.NET Core و C# لتقديم وتحليل البيانات المكانية وخدمات الـ GIS للواجهات الأمامية.',
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
    slug: 'spotin',
    title: 'SpotIn — Workspace Booking Platform',
    titleAr: 'SpotIn — منصة حجز مساحات العمل المشتركة',
    category: ['Web', 'Backend'],
    summary:
      'A coworking platform where clients find a desk or meeting room on a map and book it by the hour, while owners run the floor, orders and invoices from one dashboard.',
    summaryAr:
      'منصة ويب متكاملة تتيح للمستخدمين استعراض مساحات العمل وحجز المكاتب والغرف على الخريطة بنظام الساعات مع لوحة تحكم لأصحاب المساحات.',
    description:
      'An ASP.NET MVC web app with two roles. Clients browse workspaces on a Leaflet / OpenStreetMap map (search, type filter, nearest-to-me), then book a table or meeting room in three steps — choose a resource, set the time, confirm — with the hourly rate charged from a wallet. Workspace owners get a dashboard (bookings, incoming requests, occupancy), a live floor view showing every table and room as available, occupied or pending, order-taking that adds items to a running bill, invoices with printable receipts, menu management, and a profile with per-resource hourly pricing.',
    problem: 'TODO: confirm — the problem this solves, in Ahmed’s words.',
    approach: 'TODO: confirm — architecture and data layer (the repo has no README).',
    role: 'TODO: confirm — team or individual, and Ahmed’s exact part.',
    stack: ['ASP.NET MVC', 'C#', 'Leaflet', 'OpenStreetMap'], // TODO: add the database / ORM used
    image: '/images/projects/spotin/cover.webp',
    gallery: [
      '/images/projects/spotin/1.webp', // owner dashboard
      '/images/projects/spotin/2.webp', // live floor preview
      '/images/projects/spotin/3.webp', // explore workspaces on the map
      '/images/projects/spotin/4.webp', // booking flow
      '/images/projects/spotin/5.webp', // invoices ledger
      '/images/projects/spotin/6.webp', // receipt
      '/images/projects/spotin/7.webp', // menu management
    ],
    links: { live: null, code: `${GITHUB_BASE}/PreSpotIn`, storymap: null }, // repo is named PreSpotIn
    location: null,
    metrics: [], // the landing-page figures (2,400+ desks, 98%, 40+) are marketing placeholders, not measured
    verified: true,
    featured: false,
    published: true,
    year: 2026,
  },
  {
    id: 18,
    slug: 'iti-system',
    title: 'ITI System', // TODO
    titleAr: 'نظام إدارة معهد ITI — ASP.NET Core',
    category: ['Web', 'Backend'],
    summary: 'TODO: ASP.NET MVC app — what does it manage?',
    summaryAr: 'نظام إدارة وتتبع داخلي مبني بإطار عمل ASP.NET Core MVC و C# لإدارة الطلاب والمسارات التدريبية.',
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

  // ───────────────────────────── ITI GRADUATION & COURSE PROJECTS ─────────────────────────────
  {
    id: 19,
    slug: 'geogen-ai-graduation-project',
    title: 'GeoGen AI — ITI Graduation Project',
    titleAr: 'GeoGen AI — مشروع التخرج بمعهد ITI',
    category: ['AI', 'GIS', 'Web'],
    summary:
      'A multi-agent geospatial AI platform: a conversational map chatbot, an AI data-editing engine, a document-grounded RAG bot, and MCP connectors that let AI agents drive ArcGIS Pro and QGIS.',
    summaryAr:
      'منصة ذكاء اصطناعي مكاني متعددة الوكلاء تضم شات بوت تفاعلي للخريطة، محرك تدقيق وتعديل مكاني (SpecReviewer)، وموصلات MCP لـ ArcGIS و QGIS.',
    description:
      'The graduation project from the ITI GIS track (the docs also call the product Compass AI). Its public documentation describes five components: MapTalk, a conversational GIS workspace for live map control and querying; SpecReviewer, an AI editing engine that applies every change to an isolated “V-Layer” first, so edits are previewed and validated before they touch the production layer; DocuQuery, a spatial RAG bot that grounds answers in uploaded building codes and regulations together with map attributes; and the ArcGIS MCP add-in and QGIS MCP plugin, which expose ArcGIS Pro and QGIS to any MCP client.',
    problem: 'TODO: confirm — the problem statement, in Ahmed’s words.',
    approach: 'TODO: confirm — architecture and how the components fit together.',
    role: 'TODO: confirm — team project; Ahmed’s exact part (the ArcGIS and QGIS MCP components are his own work — see projects 01 and 06).',
    stack: ['Multi-agent AI', 'Model Context Protocol', 'RAG', 'ArcGIS Feature Services', 'QGIS', 'React'], // TODO: add the back-end stack
    image: '/images/projects/geogen-ai-graduation-project/cover.webp',
    gallery: [
      '/images/projects/geogen-ai-graduation-project/admin-dashboard.webp', // admin dashboard (Ahmed's own screenshot)
      '/images/projects/geogen-ai-graduation-project/doc-chat.webp', // documentation chatbot (Ahmed's own screenshot)
      '/images/projects/geogen-ai-graduation-project/1.webp', // What is MCP?
      '/images/projects/geogen-ai-graduation-project/2.webp', // MCP architecture
      '/images/projects/geogen-ai-graduation-project/3.webp', // ArcGIS MCP
      '/images/projects/geogen-ai-graduation-project/4.webp', // the four layers
      '/images/projects/geogen-ai-graduation-project/5.webp', // ArcGIS MCP tools reference
      '/images/projects/geogen-ai-graduation-project/6.webp', // QGIS MCP
      '/images/projects/geogen-ai-graduation-project/7.webp', // QGIS plugin tools
      '/images/projects/geogen-ai-graduation-project/8.webp', // Spatial ChatBot
      '/images/projects/geogen-ai-graduation-project/9.webp', // chatbot configuration
      '/images/projects/geogen-ai-graduation-project/10.webp', // Send Query API
      '/images/projects/geogen-ai-graduation-project/11.webp', // Spec-Reviewer and the V-Layer
      '/images/projects/geogen-ai-graduation-project/12.webp', // specialised edit agents
      '/images/projects/geogen-ai-graduation-project/13.webp', // RAG bot
    ],
    links: {
      live: 'https://compass-ai-docs.vercel.app/', // the product's documentation hub
      code: null, // TODO: repository link, if it can be public
      storymap: null,
    },
    location: null,
    metrics: [{ label: 'Components documented', labelAr: 'مكونات موثقة بالكامل', value: '5', verified: true }],
    verified: true,
    featured: true,
    featuredRank: 2,
    published: true,
    year: 2026,
  },
  {
    id: 20,
    slug: 'egypt-governorates-explorer',
    title: 'Egypt Governorates Explorer & Issue Reporting',
    titleAr: 'مستكشف محافظات مصر وبلاغات المرافق',
    category: ['GIS', 'Web'],
    summary:
      'An ArcGIS Maps SDK for JavaScript 5.0 + Calcite web app: a population map of Egypt’s governorates with live statistics for the current view, and a panel for reporting street and building issues.',
    summaryAr:
      'تطبيق WebGIS متكامل باستخدام ArcGIS Maps SDK 5.0 ونظام Calcite: خريطة ديموغرافية تفاعلية للمحافظات مع لوحة إحصائية لحظية ونظام إبلاغ عن مشكلات البناء والشوارع.',
    description:
      'Governorates are symbolised with class breaks on population, and each popup computes area and population density with Arcade. Calcite panels provide a layer list, basemap gallery, legend, printing, a governorate search and an issue-type filter, plus a dashboard that recalculates the number of governorates and the total population inside the current map extent. A report panel lets a user choose an issue type (Violating Building or Street Issue), describe it, click the map and save the point to the reporting layer.',
    problem: 'TODO: confirm — the assignment brief, in Ahmed’s words.',
    approach: 'TODO: confirm',
    role: 'TODO: confirm — ITI ArcGIS Maps SDK for JavaScript course project; team or individual?',
    stack: ['ArcGIS Maps SDK for JavaScript 5.0', 'Calcite Design System', 'ArcGIS Feature Services', 'Arcade', 'JavaScript'],
    image: null, // TODO: screenshots — the app's API key in config.js is rejected by Esri (498 Invalid token), so it cannot be captured until a new key is issued
    gallery: [],
    links: { live: null, code: null, storymap: null }, // TODO: repository / deployed URL
    location: null,
    metrics: [],
    verified: true,
    featured: false,
    published: true,
    year: null, // TODO: confirm
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

// Featured projects in their chosen order (featuredRank, then project number).
export const compareFeatured = (a, b) => (a.featuredRank ?? a.id) - (b.featuredRank ?? b.id);
export const getFeaturedProjects = () => getPublishedProjects().filter((p) => p.featured).sort(compareFeatured);

export const getProjectsByCategory = (category) =>
  category === 'All'
    ? getPublishedProjects()
    : getPublishedProjects().filter((p) => p.category.includes(category));

// Pins for the GIS Lab map section
export const getMappedProjects = () => getPublishedProjects().filter((p) => p.location);

// Only render metrics Ahmed has confirmed
export const getVisibleMetrics = (project) => project.metrics.filter((m) => m.verified);
