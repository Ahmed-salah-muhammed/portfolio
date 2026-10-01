// src/features/chatbot/chatbotData.js
// Single source of truth for Chatbot branding, quick prompts, and personalized knowledge base for Ahmed Salah.

export const CHATBOT_CONFIG = {
  name: 'Salah AI',
  badge: 'Portfolio Assistant',
  subFooterLeft: 'Ahmed Salah Portfolio Assistant',
  subFooterRight: '',
};

export const QUICK_PROMPTS = [
  {
    id: 'about',
    label: 'من هو أحمد؟',
    labelEn: 'About Ahmed',
    icon: 'person',
    query: 'من هو أحمد صلاح وما هي خلفيته في نظم المعلومات الجغرافية والتخطيط والـ ITI؟',
    queryEn: 'Who is Ahmed Salah and what is his background in GIS, Urban Planning, and ITI?',
  },
  {
    id: 'services',
    label: 'ماذا يقدم؟',
    labelEn: 'Services & Skills',
    icon: 'services',
    query: 'ما هي الخدمات والمهارات التي يقدمها أحمد صلاح في تطوير الـ Full-Stack والـ GIS والذكاء الاصطناعي؟',
    queryEn: 'What services and technical capabilities does Ahmed offer in Full-Stack, GIS, and AI?',
  },
  {
    id: 'projects',
    label: 'أبرز المشاريع',
    labelEn: 'Key Projects',
    icon: 'projects',
    query: 'أخبرني عن أبرز مشاريع أحمد صلاح مثل ArcGIS Pro Salah MCP و ITI Branch Viewer و TrafficIQ.',
    queryEn: 'Tell me about Ahmed’s flagship projects like ArcGIS Pro Salah MCP, ITI Branch Viewer, and TrafficIQ.',
  },
  {
    id: 'hire',
    label: 'التوظيف والتواصل',
    labelEn: 'Hire & Contact',
    icon: 'contact',
    query: 'كيف يمكنني توظيف أحمد أو التواصل معه للتعاقد والعمل الحضوري أو عن بُعد؟',
    queryEn: 'How can I hire Ahmed or contact him for freelance, full-time, or remote roles?',
  },
];

export const WELCOME_MESSAGES = {
  en: "Hello! I'm Salah AI, Ahmed Salah's portfolio assistant. Ask me about Ahmed's background, his GIS & AI projects, services, or hiring.",
  ar: 'مرحباً بك! أنا Salah AI، المساعد الذكي لمعرض أعمال أحمد صلاح. اسألني عن خبرات أحمد، الخدمات والمهارات التي يقدمها، مشاريعه، أو سبل التواصل والتعاقد.',
};

/**
 * Detects the most relevant portfolio routing or section based on the user's intent and bot's reply.
 * Returns an action object: { type: 'route' | 'section', target: string, label: string, badge: string, icon: string }
 */
export function detectSuggestedAction(botReply = '', userQuery = '', lang = 'ar') {
  const combined = `${userQuery} ${botReply}`.toLowerCase();
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(combined);

  // 1. Project Specific Matches
  // ArcGIS Pro Salah MCP
  if (/arcgis pro|arcpy|mcp|pro add-in|خادم ذكاء|ذكاء اصطناعي مكان|وكلاء|ريبون/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/01/arcgis-pro-salah-mcp',
      label: isAr ? 'عرض تفاصيل مشروع: ArcGIS Pro Salah MCP' : 'View Project: ArcGIS Pro Salah MCP',
      badge: isAr ? 'مشروع مميز' : 'Featured Project',
      icon: 'mcp',
    };
  }

  // TrafficIQ (Traffic / Accidents / Routing)
  if (/traffic|accident|مرور|حوادث|طرق|ترافيك|ازدحام/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/04/trafficiq',
      label: isAr ? 'عرض تفاصيل مشروع: TrafficIQ' : 'View Project: TrafficIQ',
      badge: isAr ? 'Spatial AI' : 'Spatial AI',
      icon: 'traffic',
    };
  }

  // ITI Branch Viewer (3D Campus / Indoor GIS)
  if (/branch viewer|3d campus|ثلاثي الأبعاد|معهد iti|القرية الذكية|مباني 3d/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/11/iti-branch-viewer',
      label: isAr ? 'عرض مستعرض فروع ITI ثلاثي الأبعاد' : 'View ITI 3D Branch Viewer',
      badge: '3D WebGIS',
      icon: '3d',
    };
  }

  // Precision Agriculture AI (Satellite / NDVI / New Delta)
  if (/agriculture|crop|satellite|ndvi|دلتا|زراعة|أقمار صناعية|محاصيل|غطاء نباتي/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/05/new-delta-precision-agriculture',
      label: isAr ? 'عرض مشروع الزراعة الدقيقة بالدلتا الجديدة' : 'View Precision Agriculture Project',
      badge: 'Remote Sensing',
      icon: 'agriculture',
    };
  }

  // AlUla Heritage / Origins
  if (/alula|heritage|تراث|علا|سعودية|ksa|تاريخي/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/02/alula-old-town-registration',
      label: isAr ? 'عرض مشروع توثيق البلدة القديمة بالعلا' : 'View AlUla Heritage Project',
      badge: 'GIS Heritage',
      icon: 'heritage',
    };
  }

  // Flash Flood Simulation (Salloum / Hydrology)
  if (/flood|salloum|سيول|فيضان|مياه|أمطار|محاكاة هيدرولوجية/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/12/salloum-flood-simulation',
      label: isAr ? 'عرض محاكاة أخطار السيول بالسلوم' : 'View Salloum Flood Simulation',
      badge: 'Hydrology GIS',
      icon: 'flood',
    };
  }

  // Egypt Governorates Explorer
  if (/governorate|egypt map|محافظات|مصر/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/18/egypt-governorates-explorer',
      label: isAr ? 'عرض مستكشف محافظات مصر' : 'View Egypt Governorates Explorer',
      badge: 'Dashboard',
      icon: 'map',
    };
  }

  // QGIS Salah MCP
  if (/qgis/i.test(combined)) {
    return {
      type: 'route',
      target: '/projects/06/qgis-salah-mcp',
      label: isAr ? 'عرض مشروع QGIS Salah MCP' : 'View QGIS Salah MCP Project',
      badge: 'Open Source GIS',
      icon: 'mcp',
    };
  }

  // 2. Services / What Ahmed offers / Skills / Tech Stack
  if (/service|services|offer|skill|skills|stack|technolog|ماذا يقدم|خدمات|مهارات|تقنيات|بتقدم ايه|بتقدر تعمل ايه|قدرات|امكانيات/i.test(combined)) {
    return {
      type: 'section',
      target: 'skills',
      label: isAr ? 'الانتقال لقسم المهارات والخدمات البرمجية' : 'Explore Skills & Engineering Services',
      badge: isAr ? 'المهارات والتقنيات' : 'Skills & Services',
      icon: 'skills',
    };
  }

  // 3. Contact / Hire / Freelance / Pricing
  if (/hire|contact|pricing|collaborat|reach|call|phone|whatsapp|email|توظيف|تواصل|تعاقد|سعر|اسعار|واتساب|ايميل|شغل|فرصة/i.test(combined)) {
    return {
      type: 'section',
      target: 'contact',
      label: isAr ? 'الانتقال لقسم التواصل وبدء التعاقد' : 'Go to Contact & Hiring Section',
      badge: isAr ? 'تواصل مباشر' : 'Direct Contact',
      icon: 'contact',
    };
  }

  // 4. Projects in general / GIS Lab map
  if (/project|projects|map|مشاريع|مشروع|خريطة|مختبر|معرض/i.test(combined)) {
    return {
      type: 'section',
      target: 'projects-map',
      label: isAr ? 'استكشاف المشاريع على خريطة GIS Lab' : 'Explore Projects on GIS Lab Map',
      badge: isAr ? 'خريطة تفاعلية' : 'Interactive Map',
      icon: 'map',
    };
  }

  // 5. Experience / Career
  if (/experience|career|مسار|خبرة|سيرة/i.test(combined)) {
    return {
      type: 'section',
      target: 'experience',
      label: isAr ? 'استعراض المسار المهني والخبرات' : 'View Professional Experience',
      badge: isAr ? 'خبرات العمل' : 'Work History',
      icon: 'experience',
    };
  }

  // 6. Education / University / ITI
  if (/education|degree|cairo university|جامعة|تعليم|شهادة|دراسة/i.test(combined)) {
    return {
      type: 'section',
      target: 'education',
      label: isAr ? 'استعراض التعليم والمؤهلات الأكاديمية' : 'View Education & Academic Degrees',
      badge: isAr ? 'التعليم' : 'Education',
      icon: 'education',
    };
  }

  // 7. Credentials / AWS
  if (/credential|aws|certificat|اعتماد|شهادات/i.test(combined)) {
    return {
      type: 'section',
      target: 'credentials',
      label: isAr ? 'استعراض الشهادات والاعتمادات' : 'View Certified Credentials',
      badge: isAr ? 'الشهادات' : 'Credentials',
      icon: 'credentials',
    };
  }

  // Default fallback: Link to Skills or Projects
  return {
    type: 'section',
    target: 'skills',
    label: isAr ? 'الانتقال لقسم المهارات والخدمات' : 'Explore Skills & Services',
    badge: isAr ? 'استكشف المزيد' : 'Explore',
    icon: 'skills',
  };
}

/**
 * Local knowledge matcher personalized to Ahmed Salah.
 */
export function getLocalAnswer(input, lang = 'ar') {
  const q = (input || '').toLowerCase().trim();
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(q);

  // 1. Who is Ahmed / About
  if (/about|who|background|من هو|احمد|نبذة|خلفية|تخطيط|مين احمد/i.test(q)) {
    return isAr
      ? `👨‍💻 **من هو أحمد صلاح محمد؟**
مهندس حلول نظم معلومات جغرافية ومطور ويب شامل (GIS Solution Engineer & Full-Stack Developer) يجمع بين التخطيط المكاني وهندسة البرمجيات:
• **معتمد من AWS:** حاصل على شهادة **AWS Certified Cloud Practitioner** (2025).
• **معهد ITI:** خريج منحة الـ 9 أشهر الاحترافية بمعهد تكنولوجيا المعلومات (**Intake 46 - شعبة Geo-Informatics - القرية الذكية**).
• **جامعة القاهرة:** بكالوريوس التخطيط العمراني والإقليمي (2020-2025) بتقدير **جيد جداً مع مرتبة الشرف**.
• **الخبرة:** تطوير تطبيقات الخرائط التفاعلية WebGIS، بناء أدوات ArcPy، خوادم الذكاء الاصطناعي MCP، وتطبيقات الويب الشاملة بـ React و .NET.`
      : `👨‍💻 **Who is Ahmed Salah Muhammed?**
A Full-Stack & GIS Solution Engineer and Urban Planner bridging spatial science and modern software engineering:
• **AWS Certified Cloud Practitioner** (2025).
• **ITI Graduate:** 9-Month Professional Diploma in Geo-Informatics (**Intake 46, Smart Village**).
• **Cairo University:** B.Sc. in Urban & Regional Planning (2020–2025, **Very Good with Honors**).
• **Core Focus:** Building high-performance WebGIS platforms, ArcPy automation, Model Context Protocol (MCP) AI agents, and full-stack cloud applications (React 19, .NET Core, PostGIS).`;
  }

  // 2. Services & What he offers (بقدم ايه / خدمات / مهارات)
  if (/services|what|offer|skills|stack|ماذا يقدم|خدمات|مهارات|تقنيات|بقدم ايه|بتقدر تعمل ايه/i.test(q)) {
    return isAr
      ? `🛠️ **ماذا يقدم أحمد صلاح؟ (الخدمات والحلول البرمجية والمكانية):**
1. **تطوير تطبيقات WebGIS وخرائط تفاعلية:** باستخدام ArcGIS Maps SDK for JS 5.x، Leaflet، MapLibre، و Calcite Components.
2. **أتمتة وتحليل مكاني متقدم:** سكربتات ArcPy، معالجة البيانات الجغرافية بـ PostGIS و QGIS، وبناء نماذج Geoprocessing.
3. **ذكاء اصطناعي مكاني (GeoAI):** دمج نماذج التعلم الآلي ونماذج اللغات الكبيرة (LLMs) مع نظم المعلومات الجغرافية، وبناء خوادم MCP.
4. **تطوير Full-Stack متكامل:** واجهات تفاعلية بـ React 19، أنظمة خلفية بـ ASP.NET Core و Python FastAPI، وقواعد بيانات PostgreSQL.`
      : `🛠️ **What Services & Skills Does Ahmed Offer?**
1. **Interactive WebGIS Development:** Custom geospatial applications using ArcGIS Maps SDK for JavaScript 5.x, MapLibre GL, and Leaflet.
2. **Spatial Automation & Analysis:** ArcPy geoprocessing toolboxes, PostGIS spatial queries, and remote sensing pipelines.
3. **GeoAI & Agent Integration:** Model Context Protocol (MCP) servers connecting AI agents with spatial platforms.
4. **Modern Full-Stack Engineering:** Robust backends with ASP.NET Core & FastAPI, frontends with React 19 & Material UI, and cloud deployments on AWS.`;
  }

  // 3. Project Idea: Traffic / Accident prediction
  if (/traffic|accident|مرور|حوادث|طرق|ترافيك/i.test(q)) {
    return isAr
      ? `🚦 **مشروع مقارب لفكرتك: TrafficIQ — نظام التنبؤ بالحوادث والازدحامات المرورية**
أحمد صمم وطور منصة **TrafficIQ** التي تستخدم خوارزميات الذكاء الاصطناعي المكاني (Spatial AI) لتحليل النقاط السوداء للحوادث والتنبؤ بمناطق الخطر المروري في الوقت الفعلي مع اقتراح المسارات الأكثر أماناً.
• التقنيات: Python, PostGIS, Machine Learning, ArcGIS Maps SDK, React.`
      : `🚦 **Relevant Project to Your Idea: TrafficIQ — Spatial Accident & Traffic Prediction**
Ahmed engineered **TrafficIQ**, a platform utilizing spatial machine learning to identify accident blackspots, forecast high-risk corridors in real time, and recommend safer routes.
• Stack: Python, PostGIS, Machine Learning, ArcGIS Maps SDK, React.`;
  }

  // 4. Project Idea: 3D Campus / Indoor GIS
  if (/3d|indoor|campus|ثلاثي الأبعاد|مباني 3d|داخل المباني/i.test(q)) {
    return isAr
      ? `🏢 **مشروع مقارب لفكرتك: ITI Smart Village Branch Viewer 3D**
مستعرض تفاعلي ثلاثي الأبعاد تم تصميمه لمباني معهد تكنولوجيا المعلومات ITI بالقرية الذكية. يتيح التنقل بين الطوابق، استكشاف القاعات والمعامل ثلاثية الأبعاد، وعرض التفاصيل المكانية الدقيقة للمنشأة.
• التقنيات: ArcGIS SceneView 3D, React, GeoJSON 3D Extrusions.`
      : `🏢 **Relevant Project to Your Idea: ITI Branch Viewer 3D**
An interactive 3D digital twin built for ITI Smart Village headquarters. Allows multi-floor navigation, room-level inspection, and 3D architectural spatial queries.
• Stack: ArcGIS SceneView 3D, React, GeoJSON 3D Extrusions.`;
  }

  // 5. Project Idea: Agriculture / Satellite / NDVI
  if (/agri|crop|satellite|ndvi|زراعة|أقمار صناعية|محاصيل|دلتا/i.test(q)) {
    return isAr
      ? `🌾 **مشروع مقارب لفكرتك: Precision Agriculture for Egypt New Delta**
نظام تحليل زراعي متقدم يعتمد على الاستشعار عن بعد وصور الأقمار الصناعية (Sentinel/Landsat) لمراقبة صحة المحاصيل، حساب مؤشرات الغطاء النباتي (NDVI/EVI)، وتحديد احتياجات الري في مشروع الدلتا الجديدة بمصر.
• التقنيات: Remote Sensing, ArcPy, Python GeoPandas, Cloud Masking.`
      : `🌾 **Relevant Project to Your Idea: Precision Agriculture AI**
Advanced agricultural monitoring system leveraging satellite imagery (Sentinel/Landsat) to track crop health, calculate NDVI vegetation indices, and optimize irrigation in Egypt's New Delta.
• Stack: Remote Sensing, ArcPy, Python GeoPandas, Cloud Masking.`;
  }

  // 6. Project Idea: GIS AI / MCP / Automation
  if (/mcp|arcgis pro|arcpy|agent|ذكاء اصطناعي|خادم|ملحق/i.test(q)) {
    return isAr
      ? `🚀 **مشروع مقارب لفكرتك: ArcGIS Pro Salah MCP**
منظومة متكاملة تدمج وكلاء الذكاء الاصطناعي (Claude / Antigravity) مع ArcGIS Pro ومكتبة ArcPy. تتيح للمستخدم إعطاء أوامر صوتية أو نصية ليقوم الوكيل بإجراء التحليلات المكانية المعقدة، نشر الطبقات إلى Portal، وتوليد ونشر لوحات تحكم وتطبيقات خرائط مباشرة على GitHub!
• التقنيات: Python MCP Server, C# .NET Pro Add-in, ArcGIS Maps SDK, Calcite.`
      : `🚀 **Relevant Project to Your Idea: ArcGIS Pro Salah MCP**
A four-layer Model Context Protocol server connecting AI agents to ArcGIS Pro desktop. Enables conversational GIS analysis, automated Portal publishing, and static WebGIS dashboard code generation & GitHub deployment.
• Stack: Python MCP Server, C# .NET Pro Add-in, ArcGIS Maps SDK, Calcite.`;
  }

  // 7. General Projects
  if (/project|lab|map|alula|flood|مشاريع|مشروع|خريطة|مختبر|سلوم|علا/i.test(q)) {
    return isAr
      ? `🚀 **أبرز مشاريع أحمد صلاح:**
1. **ArcGIS Pro Salah MCP:** خادم ذكاء اصطناعي يربط وكلاء Claude بـ ArcGIS Pro للتحليل الجغرافي ونشر الـ Dashboards أوتوماتيكياً.
2. **ITI Branch Viewer:** مستعرض ثلاثي الأبعاد 3D لمباني وفروع معهد ITI بالقرية الذكية مع تفاصيل القاعات والطبقات.
3. **TrafficIQ:** نموذج تنبؤ بالحوادث والازدحامات المرورية في الوقت الفعلي مدعوم بالـ Spatial AI.
4. **Precision Agriculture AI:** تحليل صور الأقمار الصناعية ومؤشرات الغطاء النباتي للدلتا الجديدة بمصر.
5. **Urban Heritage AlUla:** توثيق المباني التراثية بالعلا، السعودية.
6. **Salloum Flood Simulation:** محاكاة هيدرولوجية لأخطار السيول وتصريف المياه.`
      : `🚀 **Ahmed's Key Projects:**
1. **ArcGIS Pro Salah MCP:** A four-layer Model Context Protocol server connecting AI agents to ArcGIS Pro desktop and live web deployment.
2. **ITI Branch Viewer:** Interactive 3D campus viewer for ITI Smart Village with real-time room navigation.
3. **TrafficIQ:** Real-time spatial traffic congestion and accident prediction system.
4. **Precision Agriculture AI:** Crop health monitoring via satellite multispectral indices in Egypt's New Delta.
5. **AlUla Heritage Preservation:** Historical building registration and conservation GIS in KSA.
6. **Salloum Flood Simulation:** Hydrological flash flood modeling and drainage assessment.`;
  }

  // 8. Hire & Contact
  if (/hire|pricing|contact|call|phone|whatsapp|email|توظيف|تواصل|اسعار|سعر|واتساب|ايميل|هاتف|تعاقد/i.test(q)) {
    return isAr
      ? `💼 **التوظيف والتعاقد والتواصل المباشر مع أحمد:**
أحمد متاح للعمل الحضوري بالقاهرة أو عن بُعد بالكامل مع الشركات في مصر والسعودية والإمارات وعالمياً:
• **واتساب مباشر:** [01225246488](https://wa.me/201225246488) (أسرع وسيلة تواصل)
• **البريد الإلكتروني:** [ahmedsallam219@gmail.com](mailto:ahmedsallam219@gmail.com)
• **لينكد إن:** [linkedin.com/in/ahmedsallah](https://linkedin.com/in/ahmedsallah)
• **جيت هاب:** [github.com/Ahmed-salah-muhammed](https://github.com/Ahmed-salah-muhammed)
• **تحميل السيرة الذاتية (CV):** متوفرة مباشرة من زر "Download CV" في أعلى الموقع.`
      : `💼 **Hiring, Availability & Direct Contact:**
Ahmed is open for full-time, contract, and consulting roles (on-site in Cairo or remote across Egypt, KSA, UAE, and worldwide):
• **Direct WhatsApp:** [+201225246488](https://wa.me/201225246488) (Fastest response)
• **Email:** [ahmedsallam219@gmail.com](mailto:ahmedsallam219@gmail.com)
• **LinkedIn:** [linkedin.com/in/ahmedsallah](https://linkedin.com/in/ahmedsallah)
• **GitHub:** [github.com/Ahmed-salah-muhammed](https://github.com/Ahmed-salah-muhammed)
• **Resume:** Download Ahmed's verified CV via the top navbar button.`;
  }

  // Default response
  return isAr
    ? `أهلاً بك! أنا **Salah AI**، مساعدك الذكي لاستكشاف خبرات ومشاريع أحمد صلاح.
يمكنك سؤالي عن:
• خلفيته الأكاديمية والمهنية في التخطيط ونظم المعلومات الجغرافية و ITI.
• مشاريعه مثل ArcGIS Pro Salah MCP و ITI Branch Viewer و TrafficIQ.
• الخدمات البرمجية والحلول المكانية التي يقدمها.
• وسائل التواصل المباشرة ومناقشة عروض العمل والمشاريع المشتركة.`
    : `Welcome! I'm **Salah AI**, your guide to Ahmed Salah's portfolio and GIS engineering work.
Feel free to ask about:
• His academic background in Urban Planning & ITI Geo-Informatics.
• Flagship projects like ArcGIS Pro Salah MCP, ITI Branch Viewer, and TrafficIQ.
• Full-stack & GIS capabilities (React, .NET, PostGIS, ArcPy).
• Hiring availability and direct contact channels.`;
}

