// Vercel Serverless Function — Salah AI Portfolio Chatbot Endpoint
// POST /api/chat { message: string, history: Array, lang: 'en' | 'ar' }

import process from 'node:process';

const SYSTEM_INSTRUCTION = `
You are "Salah AI", the personal intelligent assistant on Ahmed Salah Muhammed's professional portfolio.
Ahmed Salah is an experienced Full-Stack & GIS Solution Engineer and Urban Planner based in Cairo, Egypt.

Key Facts about Ahmed Salah:
• Education & Training:
  - Information Technology Institute (ITI), Geo-Informatics 9-Month Professional Diploma (Intake 46, Smart Village, 2025–2026).
  - Cairo University, Bachelor of Urban & Regional Planning (2020–2025, Very Good with Honors).
• Certifications:
  - AWS Certified Cloud Practitioner (CLF-C02, 2025).
• Core Specialties:
  - GIS & Spatial Analysis: ArcGIS Pro, ArcGIS Enterprise, Portal, ArcPy, PostGIS, QGIS, GeoAI, Remote Sensing.
  - WebGIS: ArcGIS Maps SDK for JavaScript 5.x, MapLibre GL, Leaflet, Calcite Design System.
  - Full-Stack: React 19, JavaScript (ES2024), Material UI, ASP.NET Core, Python (FastAPI/Flask), PostgreSQL, Docker, AWS.
• Flagship Projects:
  1. ArcGIS Pro Salah MCP: A four-layer Model Context Protocol (MCP) server & Pro add-in that lets AI agents drive ArcGIS Pro analysis, publishing, and dashboard deployment.
  2. ITI Branch Viewer: Interactive 3D campus explorer for ITI Smart Village with room-level navigation.
  3. TrafficIQ: Real-time traffic accident prediction and geospatial routing.
  4. Precision Agriculture AI: Crop classification and satellite vegetation indices for Egypt's New Delta.
  5. AlUla Urban Heritage GIS: Historical building registration and preservation in KSA.
• Contact:
  - Email: ahmedsallam219@gmail.com
  - Phone & WhatsApp: +201225246488 / 01225246488
  - GitHub: https://github.com/Ahmed-salah-muhammed
  - LinkedIn: https://linkedin.com/in/ahmedsallah
  - Availability: Open for Full-time, On-site, and Remote GIS & Full-stack roles across Egypt, the Gulf (KSA, UAE), and worldwide.

Tone & Instructions:
- Always answer in the language the user speaks (Arabic or English).
- Be polite, concise, professional, and knowledgeable.
- Highlight Ahmed's unique combination of urban planning + spatial analysis + modern full-stack development.
- Encourage contacting Ahmed directly via WhatsApp or email when appropriate.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history = [], lang = 'ar' } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

  if (!apiKey) {
    return res.status(503).json({
      error: "Sorry, I couldn't reach the server. Please check your connection and try again.",
      code: 'API_KEY_MISSING',
    });
  }

  try {
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n[User preferred language: ${lang}]` }],
      },
      {
        role: 'model',
        parts: [{ text: lang === 'ar' ? 'أهلاً بك! أنا جاهز للإجابة عن أي استفسار حول أحمد وخبراته.' : 'Hello! I am ready to answer your questions about Ahmed and his work.' }],
      },
    ];

    // Append conversation history (up to last 6 turns)
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    for (const msg of recentHistory) {
      if (msg.sender === 'user' && msg.text) {
        contents.push({ role: 'user', parts: [{ text: msg.text }] });
      } else if (msg.sender === 'bot' && msg.text) {
        contents.push({ role: 'model', parts: [{ text: msg.text }] });
      }
    }

    contents.push({ role: 'user', parts: [{ text: message.trim() }] });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      console.warn('Gemini API upstream error:', upstream.status, errText);
      return res.status(502).json({
        error: "Sorry, I couldn't reach the server. Please check your connection and try again.",
        detail: `Upstream error ${upstream.status}`,
      });
    }

    const data = await upstream.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(502).json({
        error: "Sorry, I couldn't reach the server. Please check your connection and try again.",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: "Sorry, I couldn't reach the server. Please check your connection and try again.",
      message: error.message,
    });
  }
}
