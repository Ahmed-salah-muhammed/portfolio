import {
  siArcgis,
  siCss,
  siDotnet,
  siExpress,
  siGoogleearthengine,
  siHtml5,
  siHuggingface,
  siJavascript,
  siLangchain,
  siLinux,
  siModelcontextprotocol,
  siMongodb,
  siN8n,
  siNodedotjs,
  siPostgresql,
  siPython,
  siQgis,
  siReact,
  siSupabase,
  siSwagger,
  siTailwindcss,
} from 'simple-icons';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded';
import WaterRoundedIcon from '@mui/icons-material/WaterRounded';
import { ESRI_GLYPHS } from './esriGlyphs.js';

// Esri product colours, used to tint the Calcite glyphs.
const ESRI_BLUE = '#2C9BF0';

const brand = (icon, label) => ({ kind: 'path', path: icon.path, color: `#${icon.hex}`, label });
const esri = (glyph, color = ESRI_BLUE) => ({ kind: 'path', path: ESRI_GLYPHS[glyph], color });
const mui = (Icon, color) => ({ kind: 'mui', Icon, color });
const text = (label, color) => ({ kind: 'text', label, color });

const AWS_ORANGE = '#FF9900';

/**
 * Skill name (exactly as written in profile.js) → icon. Anything not listed falls back
 * to a tile with the skill's initials, so adding a skill to the data never breaks the grid.
 */
export const SKILL_ICONS = {
  // Development
  Python: brand(siPython),
  ArcPy: esri('code'),
  JavaScript: brand(siJavascript),
  React: brand(siReact),
  'Node.js': brand(siNodedotjs),
  Express: brand(siExpress),
  MongoDB: brand(siMongodb),
  'C#': text('C#', '#A179DC'),
  '.NET / ASP.NET Core': brand(siDotnet),
  'Esri Maps SDK for JS': brand(siArcgis),
  'Esri Maps SDK for .NET': brand(siArcgis),
  'REST APIs': mui(ApiRoundedIcon, '#34D399'),
  'Swagger / OAS': brand(siSwagger),
  PostgreSQL: brand(siPostgresql),
  Supabase: brand(siSupabase),
  vectorDB: mui(HubOutlinedIcon, '#F59E0B'),
  HTML5: brand(siHtml5),
  CSS: brand(siCss),
  'Tailwind CSS': brand(siTailwindcss),
  'Big Data & ML': mui(InsightsRoundedIcon, '#FB923C'),

  // GIS & Esri apps
  'ArcGIS Pro': brand(siArcgis),
  ArcMap: esri('map'),
  'ArcGIS Online': esri('arcgisOnline'),
  'ArcGIS Enterprise & Portal': esri('portal'),
  'Enterprise Administration': esri('arcgisDataStore'),
  'ArcGIS Urban': esri('urbanModel', '#38BDF8'),
  QGIS: brand(siQgis),
  PostGIS: brand(siPostgresql),
  Survey123: esri('arcgisSurvey123', '#3FB950'),
  'ArcGIS Field Maps': esri('mapPin', '#22B8CF'),
  'ArcGIS Dashboards': esri('dashboard', '#7C8CF8'),
  'ArcGIS Experience Builder': esri('apps', '#A78BFA'),
  'ArcGIS StoryMaps': esri('storymapExperience', '#F97316'),
  'ArcGIS QuickCapture': esri('arcgisQuickcapture', '#FBBF24'),
  'ArcGIS Living Atlas': esri('arcgisLivingAtlas'),
  'ArcGIS Runtime SDK': brand(siArcgis),
  ModelBuilder: esri('model'),
  CityEngine: esri('i3DBuilding', '#F59E0B'),
  Twinmotion: esri('i3DGlasses', '#60A5FA'),
  'Map & Feature Services': esri('layerService'),
  'Geodatabase Design': esri('layers'),
  'Spatial Analysis': esri('analysis'),
  'Remote Sensing (NDVI, Terrain)': mui(SatelliteAltRoundedIcon, '#4ADE80'),
  'Flood Simulation': mui(WaterRoundedIcon, '#38BDF8'),
  GeoAI: esri('deepLearningProject', '#C084FC'),
  'Google Earth Engine': brand(siGoogleearthengine),

  // Cloud (AWS)
  'AWS Cloud Practitioner': text('aws', AWS_ORANGE),
  EC2: text('EC2', AWS_ORANGE),
  'EBS': text('EBS', AWS_ORANGE),
  EFS: text('EFS', AWS_ORANGE),
  'Cloud Architecture': mui(CloudQueueRoundedIcon, '#60A5FA'),
  'Scalable Systems': mui(AccountTreeOutlinedIcon, '#60A5FA'),

  // AI & Automation
  'Model Context Protocol (MCP)': brand(siModelcontextprotocol),
  'AI Agents & Workflows': mui(SmartToyOutlinedIcon, '#A78BFA'),
  n8n: brand(siN8n),
  RAG: mui(ManageSearchRoundedIcon, '#34D399'),
  'Hugging Face': brand(siHuggingface),
  LangChain: brand(siLangchain),

  // Foundations
  OOP: mui(CategoryOutlinedIcon, '#60A5FA'),
  DBMS: mui(StorageRoundedIcon, '#34D399'),
  Networking: mui(LanRoundedIcon, '#FBBF24'),
  'Operating Systems': brand(siLinux),
  'Cybersecurity Fundamentals': mui(SecurityRoundedIcon, '#F87171'),
};

const initials = (name) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/[\s/&.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

export const getSkillIcon = (name) => SKILL_ICONS[name] ?? text(initials(name), '#94A3B8');
