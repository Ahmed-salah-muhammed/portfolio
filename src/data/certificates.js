// src/data/certificates.js
// Certificates with a scanned image, for the Certifications carousel.
// Every field below was read off the certificate itself (Ahmed's Google Drive folder,
// Sept 2026). The AWS "Notice of Exam Results" is deliberately left out: it shows the
// candidate ID and registration number.
//
// `matches` names the entry in profile.js CERTIFICATIONS that this image covers, so
// the "also certified" list below the carousel only shows credentials without a scan.
import { CERTIFICATIONS } from './profile.js';

const img = (slug) => `/images/certificates/${slug}.webp`;

export const CERTIFICATE_GALLERY = [
  {
    id: 'aws-ccp',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2026-05',
    detail: 'Valid until May 2029',
    group: 'Cloud',
    image: img('aws-certified-cloud-practitioner'),
    verifyUrl: 'https://aws.amazon.com/verification',
    matches: 'AWS Certified Cloud Practitioner',
  },
  {
    id: 'aws-academy',
    title: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'AWS Academy',
    date: '2026-04',
    detail: '20 hours',
    group: 'Cloud',
    image: img('aws-academy-cloud-foundations'),
    verifyUrl: 'https://www.credly.com/go/X1ADp8zQ',
    matches: 'AWS Academy Graduate — Cloud Foundations',
  },
  {
    id: 'drone2map',
    title: 'Drone Analysis with Drone2Map and ArcGIS Online',
    issuer: 'LinkedIn Learning',
    date: '2026-08',
    detail: '1 h 44 min · Drone mapping, GIS, ArcGIS Pro',
    group: 'GIS',
    image: img('drone2map-arcgis-online'),
  },
  {
    id: 'spatial-ai',
    title: 'Using Spatial Data in AI Workflows',
    issuer: 'LinkedIn Learning',
    date: '2026-07',
    detail: '1 h 13 min · Spatial analysis, GIS, AI',
    group: 'GIS',
    image: img('spatial-data-ai-workflows'),
  },
  {
    id: 'arcpy',
    title: 'ArcPy for Python Developers using ArcGIS Pro',
    issuer: 'Udemy',
    date: '2026-04',
    detail: '11.5 hours',
    group: 'GIS',
    image: img('arcpy-for-python-developers'),
    matches: 'ArcPy for Python Developers using ArcGIS Pro',
  },
  {
    id: 'node-bootcamp',
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    issuer: 'Udemy · Jonas Schmedtmann',
    date: '2026-04',
    detail: '42 hours',
    group: 'Development',
    image: img('node-express-mongodb-bootcamp'),
    matches: 'MERN Stack with Jonas',
  },
  {
    id: 'rest-apis',
    title: 'Understanding APIs and RESTful APIs Crash Course',
    issuer: 'Udemy · Kalob Taulien',
    date: '2026-04',
    detail: '43 minutes',
    group: 'Development',
    image: img('restful-apis-crash-course'),
    matches: 'APIs & RESTful APIs Crash Course',
  },
  {
    id: 'swagger',
    title: 'Learn Swagger and the OpenAPI Specification',
    issuer: 'Udemy · Peter Gruenbaum',
    date: '2026-05',
    detail: '1 hour',
    group: 'Development',
    image: img('swagger-openapi'),
    matches: 'Learn Swagger and the OAS',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & Workflows — The Practical Guide',
    issuer: 'Udemy · Maximilian Schwarzmüller',
    date: '2026-05',
    detail: '4 hours',
    group: 'AI',
    image: img('ai-agents-workflows'),
    matches: 'AI Agents & Workflows — The Practical Guide',
  },
  {
    id: 'n8n',
    title: 'Complete N8N and AI Automation Masterclass',
    issuer: 'Udemy · Catalin Stefan',
    date: '2026-05',
    detail: '5.5 hours',
    group: 'AI',
    image: img('n8n-ai-automation'),
    matches: 'Complete n8n & AI Automation',
  },
  {
    id: 'claude-code',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: '2026-04',
    group: 'AI',
    image: img('claude-code-in-action'),
    matches: 'Claude Code in Action',
  },
  {
    id: 'claude-cowork',
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic',
    date: '2026-04',
    group: 'AI',
    image: img('intro-claude-cowork'),
    matches: 'Introduction to Claude Cowork',
  },
  {
    id: 'langchain',
    title: 'Quickstart: LangChain Essentials — Python',
    issuer: 'LangChain Academy',
    date: '2026-07',
    group: 'AI',
    image: img('langchain-essentials-python'),
  },
  {
    id: 'langgraph',
    title: 'Quickstart: LangGraph Essentials — TypeScript',
    issuer: 'LangChain Academy',
    date: '2026-07',
    group: 'AI',
    image: img('langgraph-essentials-typescript'),
  },
  {
    id: 'langsmith',
    title: 'Quickstart: LangSmith Essentials',
    issuer: 'LangChain Academy',
    date: '2026-07',
    group: 'AI',
    image: img('langsmith-essentials'),
  },
  {
    id: 'build-with-ai',
    title: 'Build with AI — Masr Edition',
    issuer: 'Google for Developers × ITI',
    detail: 'Certificate of attendance',
    group: 'AI',
    image: img('build-with-ai-masr'),
  },
  {
    id: 'aspire',
    title: '2026 Aspire Leaders Program',
    issuer: 'Aspire Institute',
    date: '2026-04',
    detail: '40 hours of coursework',
    group: 'Leadership',
    image: img('aspire-leaders-program'),
    matches: 'Aspire Leaders Program 2026',
  },
];

const covered = new Set(CERTIFICATE_GALLERY.map((c) => c.matches).filter(Boolean));

/** Credentials listed in profile.js that have no scanned certificate yet. */
export const getOtherCertifications = () =>
  CERTIFICATIONS.filter((c) => !covered.has(c.title));
