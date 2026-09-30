// src/data/services.js
// The six offerings named in section 5.6 of the master prompt. Every description is
// assembled from capabilities Ahmed already lists in profile.js (SKILLS, EXPERIENCE,
// PROFILE.pillars) — nothing here claims experience that the CV does not support.

export const SERVICES = [
  {
    key: 'webgis',
    title: 'WebGIS & Full-Stack Development',
    icon: 'public',
    description:
      'Interactive web maps and full-stack geospatial applications — React front ends on Esri Maps SDKs, Node/Express or ASP.NET Core back ends, and PostgreSQL/PostGIS or MongoDB behind them.',
    skills: ['React', 'Esri Maps SDK for JS', 'Node.js', 'ASP.NET Core', 'PostGIS'],
  },
  {
    key: 'enterprise',
    title: 'Enterprise GIS Administration',
    icon: 'dns',
    description:
      'ArcGIS Enterprise, Portal and ArcGIS Online administration: publishing optimized Map & Feature Services, designing geodatabase schemas, and building Survey123 forms for field-collection teams.',
    skills: ['ArcGIS Enterprise & Portal', 'ArcGIS Online', 'Survey123', 'Map & Feature Services'],
  },
  {
    key: 'analysis',
    title: 'Spatial Analysis, Flood & Environmental Studies',
    icon: 'analytics',
    description:
      'Spatial and statistical analysis for planning and environmental work — flood simulation, topographic and NDVI analysis, remote sensing, and GIS support for Environmental Impact Assessments.',
    skills: ['Spatial Analysis', 'Flood Simulation', 'Remote Sensing (NDVI, Terrain)', 'QGIS'],
  },
  {
    key: 'threed',
    title: '3D Urban Visualization & Digital Twins',
    icon: 'view_in_ar',
    description:
      'Procedural 3D city models and urban visualizations with CityEngine and Twinmotion, used to communicate planning proposals and heritage sites to non-technical stakeholders.',
    skills: ['CityEngine', 'Twinmotion', 'ArcGIS Urban'],
  },
  {
    key: 'automation',
    title: 'GIS Automation & AI Agents',
    icon: 'smart_toy',
    description:
      'Python automation of repetitive GIS pipelines with ArcPy, plus Model Context Protocol servers and AI workflows that let agents operate ArcGIS and QGIS directly.',
    skills: ['Python', 'ArcPy', 'Model Context Protocol (MCP)', 'n8n', 'AI Agents & Workflows'],
  },
  {
    key: 'cloud',
    title: 'Cloud GIS on AWS',
    icon: 'cloud',
    description:
      'Deploying geospatial systems on AWS as an AWS Certified Cloud Practitioner — EC2, EBS and EFS for scalable, cloud-hosted GIS architecture.',
    skills: ['AWS Cloud Practitioner', 'EC2', 'EFS', 'Cloud Architecture'],
  },
];

export default SERVICES;
