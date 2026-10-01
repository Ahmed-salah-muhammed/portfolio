// src/features/chatbot/chatbotData.js
// Single source of truth for Chatbot branding, quick prompts, and personalized knowledge base for Ahmed Salah.

export const CHATBOT_CONFIG = {
  name: 'Salah AI',
  badge: 'Portfolio Assistant',
  subFooterLeft: 'Ahmed Salah Portfolio Assistant',
  subFooterRight: 'Powered by Gemini 2.5 Flash',
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
  en: "Hello! I'm Salah AI, Ahmed Salah's portfolio assistant. Ask me about Ahmed's background, his GIS & AI projects, skills, or hiring.",
  ar: 'مرحباً بك! أنا Salah AI، المساعد الذكي لمعرض أعمال أحمد صلاح. اسألني عن خبرات أحمد، مشاريعه في نظم المعلومات الجغرافية، أو إمكانية التعاقد والعمل معاً.',
};

/**
 * Local knowledge matcher personalized to Ahmed Salah.
 */
export function getLocalAnswer(input, lang = 'ar') {
  const q = (input || '').toLowerCase().trim();
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(q);

  // 1. Who is Ahmed / About
  if (/about|who|background|من هو|احمد|نبذة|خلفية|تخطيط|iti/i.test(q)) {
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

  // 2. Services & What he offers
  if (/services|what|offer|skills|stack|ماذا يقدم|خدمات|مهارات|تقنيات/i.test(q)) {
    return isAr
      ? `🛠️ **ماذا يقدم أحمد صلاح؟**
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

  // 3. Projects
  if (/project|lab|map|mcp|traffic|alula|مشاريع|مشروع|خريطة|مختبر/i.test(q)) {
    return isAr
      ? `🚀 **أبرز مشاريع أحمد صلاح:**
1. **ArcGIS Pro Salah MCP:** خادم ذكاء اصطناعي يربط وكلاء Claude و Antigravity بـ ArcGIS Pro و ArcPy للتحليل الجغرافي ونشر الـ Dashboards أوتوماتيكياً.
2. **ITI Branch Viewer:** مستعرض ثلاثي الأبعاد 3D لمباني وفروع معهد ITI بالقرية الذكية مع تفاصيل القاعات والطبقات.
3. **TrafficIQ:** نموذج تنبؤ بالحوادث والازدحامات المرورية في الوقت الفعلي مدعوم بالـ Spatial AI.
4. **Precision Agriculture AI:** تحليل صور الأقمار الصناعية ومؤشرات الغطاء النباتي للدلتا الجديدة بمصر.
5. **Urban Heritage AlUla:** توثيق المباني التراثية بالعلا، السعودية.
تفقد خريطة **GIS Lab** في الصفحة الرئيسية لمشاهدة جميع المواقع تفاعلياً!`
      : `🚀 **Ahmed's Key Projects:**
1. **ArcGIS Pro Salah MCP:** A four-layer Model Context Protocol server connecting AI agents to ArcGIS Pro desktop and live web deployment.
2. **ITI Branch Viewer:** Interactive 3D campus viewer for ITI Smart Village with real-time room navigation.
3. **TrafficIQ:** Real-time spatial traffic congestion and accident prediction system.
4. **Precision Agriculture AI:** Crop health monitoring via satellite multispectral indices in Egypt's New Delta.
5. **AlUla Heritage Preservation:** Historical building registration and conservation GIS in KSA.
Explore all mapped locations on the **GIS Lab** interactive map on the homepage!`;
  }

  // 4. Hire & Contact
  if (/hire|pricing|contact|call|phone|whatsapp|email|توظيف|تواصل|اسعار|سعر|واتساب|ايميل|هاتف/i.test(q)) {
    return isAr
      ? `💼 **التوظيف والتعاقد والتواصل المباشر:**
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
• مشاريعه مثل ArcGIS Pro Salah MCP و ITI Branch Viewer.
• المهارات البرمجية والحلول المكانية التي يقدمها.
• وسائل التواصل المباشرة ومناقشة عروض العمل.`
    : `Welcome! I'm **Salah AI**, your guide to Ahmed Salah's portfolio and GIS engineering work.
Feel free to ask about:
• His academic background in Urban Planning & ITI Geo-Informatics.
• Flagship projects like ArcGIS Pro Salah MCP and 3D campus viewer.
• Full-stack & GIS capabilities (React, .NET, PostGIS, ArcPy).
• Hiring availability and direct contact channels.`;
}
