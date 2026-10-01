// src/features/chatbot/chatbotData.js
// Single source of truth for Chatbot branding, quick prompts, and local fallback knowledge engine.

export const CHATBOT_CONFIG = {
  name: 'Salah GeoAI',
  badge: 'Doc-Chat',
  subFooterLeft: 'Salah GeoAI Documentation Chat',
  subFooterRight: 'Supported by Geo-GenAI Hub',
};

export const QUICK_PROMPTS = [
  {
    id: 'platform',
    label: 'Platform Overview',
    labelAr: 'نظرة عامة على المنصة',
    icon: 'memory',
    query: 'Tell me an overview of Ahmed’s platform and technical background.',
    queryAr: 'أخبرني بنظرة عامة عن خبرة أحمد التقنية ومنصته.',
  },
  {
    id: 'ai-engines',
    label: 'Core AI Engines',
    labelAr: 'محركات الذكاء الاصطناعي',
    icon: 'layers',
    query: 'What core AI, GeoAI, and MCP engines does Ahmed build?',
    queryAr: 'ما هي محركات الذكاء الاصطناعي والـ GeoAI و MCP التي يطورها أحمد؟',
  },
  {
    id: 'pricing',
    label: 'Pricing Plans',
    labelAr: 'خطط العمل والتسعير',
    icon: 'creditCard',
    query: 'What are the pricing models, availability, and freelance hiring options?',
    queryAr: 'ما هي نماذج العمل والتوظيف المتاحة ومواعيد التفرغ لدى أحمد؟',
  },
  {
    id: 'gis-projects',
    label: 'GIS & WebGIS',
    labelAr: 'مشاريع نظم المعلومات',
    icon: 'map',
    query: 'Show me Ahmed’s top GIS and WebGIS projects with spatial maps.',
    queryAr: 'اعرض لي أبرز مشاريع الـ GIS والـ WebGIS التفاعلية لأحمد.',
  },
];

export const WELCOME_MESSAGES = {
  en: 'Welcome to Salah GeoAI Doc-Chat! Ask me about our platform, core AI engines, or pricing plans.',
  ar: 'مرحباً بك في Salah GeoAI Doc-Chat! اسألني عن المنصة، محركات الذكاء الاصطناعي، أو خيارات العمل والتسعير.',
};

/**
 * High-precision local knowledge matcher.
 * Evaluates user input and returns rich answers in Arabic or English if offline or while server connects.
 */
export function getLocalAnswer(input, lang = 'en') {
  const q = (input || '').toLowerCase().trim();
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(q);

  if (/pricing|cost|hire|rate|plans|سعر|تكلفة|توظيف|شغل|اسعار/i.test(q)) {
    return isAr
      ? `💼 **خطط العمل والتوظيف:**
• **دوام كامل / تعاقد (Full-time / Contract):** متاح فورياً للعمل الحضوري بالقاهرة أو عن بُعد داخل وخارج مصر (السعودية والإمارات).
• **مشاريع مستقلة (Freelance / WebGIS Builds):** تسعير حسب نطاق المشروع (Fixed Scope) أو بالساعة.
• **استشارات GIS و GeoAI:** جلسات استشارية لتصميم المعمارية المكانية وتكامل أنظمة ArcGIS Pro مع وكلاء الذكاء الاصطناعي.
للتواصل المباشر ومناقشة التفاصيل: واتساب: [01225246488](https://wa.me/201225246488) أو البريد: ahmedsallam219@gmail.com.`
      : `💼 **Pricing Plans & Hiring Options:**
• **Full-time / Contract:** Available immediately for on-site (Cairo) or remote roles across Egypt, the Gulf (KSA/UAE), and worldwide.
• **Freelance & Custom WebGIS:** Milestone-based fixed-price or hourly for full-stack spatial applications.
• **Architecture & GeoAI Consulting:** Designing ArcGIS Enterprise, ArcPy automation, and AI agent integration (MCP).
Direct reach: WhatsApp [01225246488](https://wa.me/201225246488) or email: ahmedsallam219@gmail.com.`;
  }

  if (/ai|geoai|engine|mcp|model|ذكاء|جين|برومبت/i.test(q)) {
    return isAr
      ? `🧠 **محركات الذكاء الاصطناعي والـ GeoAI:**
1. **ArcGIS Pro Salah MCP:** أول خادم Model Context Protocol في الشرق الأوسط يربط وكلاء الذكاء الاصطناعي (Claude / Antigravity) مع ArcGIS Pro و ArcPy للتحليل الجغرافي ونشر الـ Dashboards أوتوماتيكياً.
2. **TrafficIQ:** نموذج ذكاء اصطناعي مكاني للتنبؤ بالحوادث والازدحامات المرورية في الوقت الفعلي.
3. **GeoAI Precision Agriculture:** تحليل صور الأقمار الصناعية ومؤشرات الغطاء النباتي (NDVI/SAVI) لمنطقة الدلتا الجديدة بمصر.
4. **Geo-Gen AI:** دمج نماذج اللغات الكبيرة مع نظم المعلومات الجغرافية لتوليد استعلامات مكانية طبيعية.`
      : `🧠 **Core AI & GeoAI Engines:**
1. **ArcGIS Pro Salah MCP:** A four-layer Model Context Protocol server connecting AI agents to ArcGIS Pro desktop, geoprocessing tools, and automated dashboard deployment.
2. **TrafficIQ:** Real-time spatial traffic accident and congestion prediction engine.
3. **Precision Agriculture AI:** Multispectral satellite analysis and deep learning crop health monitoring for Egypt's New Delta.
4. **Geo-Gen AI Agents:** Natural-language spatial queries and spatial analytics pipelines.`;
  }

  if (/platform|overview|about|who|background|منصة|نبذة|من هو|احمد/i.test(q)) {
    return isAr
      ? `📍 **نظرة عامة على المنصة وأحمد صلاح:**
أحمد صلاح محمد — مهندس حلول نظم معلومات جغرافية ومطور ويب شامل (GIS Solution Engineer & Full-Stack Developer):
• خريج معهد تكنولوجيا المعلومات **ITI** (منحة الـ 9 أشهر الاحترافية - Intake 46 - شعبة Geo-Informatics - القرية الذكية).
• بكالوريوس التخطيط العمراني والإقليمي من **جامعة القاهرة** (جيد جداً مع مرتبة الشرف، 2020-2025).
• معتمد من أمازون **AWS Certified Cloud Practitioner** (2025).
• يدمج بين التحليل المكاني المتقدم وتطوير الويب الحديث (React 19, .NET, PostGIS, ArcGIS Maps SDK).`
      : `📍 **Platform Overview & Ahmed Salah:**
Ahmed Salah Muhammed is a Full-Stack & GIS Solution Engineer and Urban Planner based in Cairo, Egypt:
• Professional Geo-Informatics Diploma from the **Information Technology Institute (ITI)**, Intake 46, Smart Village.
• B.Sc. in Urban & Regional Planning, **Cairo University** (Very Good with Honors, 2020–2025).
• **AWS Certified Cloud Practitioner** (2025).
• Specializes in bridging spatial engineering (ArcGIS, ArcPy, PostGIS) with modern cloud & web architectures (React 19, ASP.NET Core, Docker).`;
  }

  if (/project|gis|map|lab|webgis|خريطة|مشاريع|مشروع/i.test(q)) {
    return isAr
      ? `🗺️ **أبرز مشاريع الـ GIS والـ WebGIS:**
• **ArcGIS Pro Salah MCP:** تحكم الذكاء الاصطناعي بمنظومة ArcGIS.
• **ITI Branch Viewer:** مستعرض ثلاثي الأبعاد 3D لمباني وفروع معهد ITI بالقرية الذكية.
• **Flash Flood Simulation Salloum:** محاكاة مخاطر السيول بمدينة السلوم بمطروح.
• **Urban Heritage AlUla:** توثيق المباني التراثية بالعلا، السعودية.
• **Thermal Comfort El Gouna:** تحليل المناخ المحلي والراحة الحرارية بالجونة.
يمكنك استعراض كل المواقع مباشرة على خريطة **GIS Lab** بالصفحة الرئيسية!`
      : `🗺️ **Top GIS & WebGIS Projects:**
• **ArcGIS Pro Salah MCP:** AI-driven geoprocessing and live session orchestration.
• **ITI Branch Viewer:** Interactive 3D campus viewer for ITI Smart Village.
• **Salloum Flash Flood Simulation:** 2D/3D hydrological risk assessment.
• **AlUla Heritage Preservation:** Historical building registration in KSA.
• **El Gouna Microclimate Analysis:** Surface temperature and urban heat island mitigation.
Check out the interactive **GIS Lab** map right on the homepage!`;
  }

  if (/contact|email|phone|whatsapp|reach|تواصل|ايميل|واتس|هاتف/i.test(q)) {
    return isAr
      ? `📞 **معلومات التواصل المباشر:**
• **واتساب:** [01225246488](https://wa.me/201225246488) (رد سريع)
• **البريد:** [ahmedsallam219@gmail.com](mailto:ahmedsallam219@gmail.com)
• **لينكد إن:** [linkedin.com/in/ahmedsallah](https://linkedin.com/in/ahmedsallah)
• **جيت هاب:** [github.com/Ahmed-salah-muhammed](https://github.com/Ahmed-salah-muhammed)
• **المقر:** القرية الذكية / القاهرة، مصر (متاح للعمل عن بُعد عالمياً).`
      : `📞 **Contact Ahmed Salah:**
• **WhatsApp:** [+201225246488](https://wa.me/201225246488) (Instant messaging)
• **Email:** [ahmedsallam219@gmail.com](mailto:ahmedsallam219@gmail.com)
• **LinkedIn:** [linkedin.com/in/ahmedsallah](https://linkedin.com/in/ahmedsallah)
• **GitHub:** [github.com/Ahmed-salah-muhammed](https://github.com/Ahmed-salah-muhammed)
• **Location:** Smart Village / Cairo, Egypt (Available remotely worldwide).`;
  }

  // Default intelligent assistant response
  return isAr
    ? `شكراً لسؤالك! أنا **Salah GeoAI**، المساعد الذكي لمعرض أعمال أحمد صلاح.
يمكنني مساعدتك في:
• التعرف على خلفية أحمد في الـ GIS والـ Full-Stack والـ ITI.
• استعراض المشاريع الكبرى مثل ArcGIS Pro Salah MCP و ITI Branch Viewer.
• خطط التسعير ومناقشة تفاصيل التوظيف والتعاقد.
• تزويدك بروابط الاتصال المباشرة ووسائل التواصل.`
    : `Thanks for asking! I'm **Salah GeoAI**, the official assistant for Ahmed Salah's portfolio.
I can help you with:
• Exploring Ahmed's expertise in GIS, GeoAI, and Full-Stack web development.
• Deep-diving into flagship projects like ArcGIS Pro Salah MCP and 3D ITI Branch Viewer.
• Discussing hiring availability, project pricing, and freelance contracts.
• Providing direct contact channels via WhatsApp and Email.`;
}
