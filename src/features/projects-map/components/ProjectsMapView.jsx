// Lazy-loaded: this module (and the whole ArcGIS SDK it pulls in) is only fetched once
// the map section approaches the viewport.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-zoom';
import '@arcgis/map-components/components/arcgis-home';
import '@arcgis/map-components/components/arcgis-fullscreen';
import '@arcgis/map-components/components/arcgis-expand';
import '@arcgis/map-components/components/arcgis-basemap-gallery';
import '@esri/calcite-components/components/calcite-segmented-control';
import '@esri/calcite-components/components/calcite-segmented-control-item';
import '@esri/calcite-components/components/calcite-button';
import '@arcgis/map-components/main.css';
import '@esri/calcite-components/main.css';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Graphic from '@arcgis/core/Graphic.js';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Point from '@arcgis/core/geometry/Point.js';
import Basemap from '@arcgis/core/Basemap.js';
import LocalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource.js';
import { basemapFor, friendlyNavigation } from '@services/arcgis/config.js';
import { getMappedProjects, getProjectPath, formatProjectNumber } from '@/data/projects.js';
import { PROJECT_TYPES, getProjectType, getProjectTypeLabel } from '@/data/projectTypes.js';
import { PROJECT_TYPE_COLORS } from '@/theme/tokens.js';
import { selectMapFocus } from '@/store/slices/uiSlice.js';
import { safeText, safeUrl } from '@/utils/content.js';
import { useLanguage } from '@/i18n';

// Initial view: Egypt and Saudi Arabia, where every mapped project sits.
const CENTER = [37.5, 26];

// "Show on map" zooms in far enough that a project is no longer inside a cluster.
const FOCUS_ZOOM = 12;

// The classic vector basemaps need no access token, so the gallery works with or without an API key.
const BASEMAP_GALLERY = new LocalBasemapsSource({
  basemaps: ['gray-vector', 'dark-gray-vector', 'streets-vector', 'topo-vector', 'satellite', 'hybrid'].map(
    (id) => Basemap.fromId(id),
  ),
});

// Nearby projects merge into a numbered cluster and break apart as the map zooms in.
const CLUSTERING = {
  type: 'cluster',
  clusterRadius: '75px',
  clusterMinSize: '30px',
  clusterMaxSize: '52px',
  popupTemplate: {
    title: '{cluster_count} projects in this area',
    content: 'Click the cluster to zoom in and explore the individual projects.',
    fieldInfos: [{ fieldName: 'cluster_count', format: { places: 0, digitSeparator: true } }],
  },
  labelingInfo: [
    {
      deconflictionStrategy: 'none',
      labelPlacement: 'center-center',
      labelExpressionInfo: { expression: 'Text($feature.cluster_count, "#,###")' },
      symbol: {
        type: 'text',
        color: '#ffffff',
        font: { size: 12, weight: 'bold', family: 'Noto Sans' },
        haloColor: [15, 23, 42, 0.85],
        haloSize: 1.2,
      },
    },
  ],
};

const FIELDS = [
  { name: 'oid', type: 'oid' },
  { name: 'pid', type: 'integer' },
  { name: 'num', type: 'string' },
  { name: 'title', type: 'string' },
  { name: 'summary', type: 'string' },
  { name: 'type', type: 'string' },
  { name: 'year', type: 'string' },
  { name: 'place', type: 'string' },
  { name: 'path', type: 'string' },
  { name: 'code', type: 'string' },
];

const toGraphic = (project, i, lang) => {
  const type = getProjectType(project);
  const title = lang === 'ar' && project.titleAr ? project.titleAr : project.title;
  const summary = lang === 'ar' && project.summaryAr ? project.summaryAr : project.summary;
  return new Graphic({
    geometry: new Point({ longitude: project.location.lng, latitude: project.location.lat }),
    attributes: {
      oid: i + 1,
      pid: project.id,
      num: formatProjectNumber(project.id),
      title,
      summary,
      type,
      year: String(project.year ?? safeText(project.period) ?? ''),
      place: lang === 'ar' && project.location.labelAr ? project.location.labelAr : project.location.label,
      path: getProjectPath(project),
      code: project.type === 'client' ? '' : (safeUrl(project.links?.code) ?? ''),
    },
  });
};

// Popup body built as DOM so the "View project" button can use client-side routing.
const buildPopup = (attrs, navigate, lang) => {
  const root = document.createElement('div');
  root.style.cssText = 'display:flex;flex-direction:column;gap:10px;font-family:Inter,system-ui,sans-serif;';

  const meta = document.createElement('div');
  meta.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12.5px;opacity:.85;';
  const badge = document.createElement('span');
  badge.textContent = lang === 'ar'
    ? (attrs.type === 'fullstack' ? 'تطوير شامل' : attrs.type === 'gis' ? 'نظم جغرافية' : 'ذكاء اصطناعي')
    : getProjectTypeLabel(attrs.type);
  badge.style.cssText = `background:${PROJECT_TYPE_COLORS[attrs.type]};color:#fff;font-weight:700;border-radius:6px;padding:2px 8px;`;
  const where = document.createElement('span');
  where.textContent = [attrs.place, attrs.year].filter(Boolean).join(' · ');
  meta.append(badge, where);

  const summary = document.createElement('p');
  summary.textContent = attrs.summary;
  summary.style.cssText = 'margin:0;line-height:1.55;font-size:13.5px;';

  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;';
  const open = document.createElement('calcite-button');
  open.textContent = lang === 'ar' ? 'عرض المشروع' : 'View project';
  open.setAttribute('icon-end', lang === 'ar' ? 'arrow-left' : 'arrow-right');
  open.setAttribute('scale', 's');
  open.addEventListener('click', () => navigate(attrs.path));
  actions.append(open);

  if (attrs.code) {
    const code = document.createElement('calcite-button');
    code.textContent = lang === 'ar' ? 'الكود المصدري' : 'Source code';
    code.setAttribute('appearance', 'outline');
    code.setAttribute('icon-start', 'code');
    code.setAttribute('scale', 's');
    code.setAttribute('href', attrs.code);
    code.setAttribute('target', '_blank');
    code.setAttribute('rel', 'noopener noreferrer');
    actions.append(code);
  }

  root.append(meta, summary, actions);
  return root;
};

/**
 * A compact legend of our own: the built-in one grows a bulky "number of features" section
 * once clustering is on. Static on purpose — the colours are the site's project-type colours.
 */
function MapLegend() {
  const { lang } = useLanguage();
  const dot = (color, extra) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: color,
    border: '2px solid #fff',
    boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.25)',
    ...extra,
  });

  return (
    <Box
      slot="bottom-left"
      role="group"
      aria-label="Map legend"
      sx={{
        m: 1.5,
        p: 1.5,
        borderRadius: '10px',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.14)',
        display: 'grid',
        gap: 0.75,
        fontSize: 12.5,
        color: 'text.primary',
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: '0.04em' }}>
        {lang === 'ar' ? 'نوع المشروع' : 'Project type'}
      </Typography>
      {PROJECT_TYPES.map((t) => (
        <Box key={t.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={dot(PROJECT_TYPE_COLORS[t.key])} />
          {lang === 'ar'
            ? t.key === 'fullstack'
              ? 'تطوير شامل (Full-Stack)'
              : t.key === 'gis'
              ? 'نظم معلومات جغرافية (GIS)'
              : 'ذكاء اصطناعي (AI)'
            : t.label}
        </Box>
      ))}
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, pt: 0.75, borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Box
          sx={dot('#4648d4', {
            width: 16,
            height: 16,
            border: '2.5px solid #fff',
            boxShadow: '0 0 0 3px rgba(70, 72, 212, 0.35)',
          })}
        />
        {lang === 'ar' ? 'مشاريع متجمعة (اضغط للتكبير)' : 'Several nearby — click to zoom'}
      </Box>
    </Box>
  );
}

export default function ProjectsMapView({ mode }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const focus = useSelector(selectMapFocus);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [ready, setReady] = useState(false);
  // True once the layer has drawn its first frame (the points take a few seconds).
  const [settled, setSettled] = useState(false);
  const [filter, setFilter] = useState('all');
  const [handledNonce, setHandledNonce] = useState(focus.nonce);

  // A new "Show on map" request clears the type filter so the target is visible.
  // (State adjusted during render rather than in an effect, per React guidance.)
  if (focus.nonce !== handledNonce) {
    setHandledNonce(focus.nonce);
    if (filter !== 'all') setFilter('all');
  }

  const projects = getMappedProjects();

  const onViewReady = useCallback(
    (event) => {
      const mapEl = event.target;
      if (!mapEl.view || layerRef.current) return;

      friendlyNavigation(mapEl.view);

      const layer = new FeatureLayer({
        title: 'Projects',
        source: projects.map((p, i) => toGraphic(p, i, lang)),
        fields: FIELDS,
        objectIdField: 'oid',
        geometryType: 'point',
        spatialReference: { wkid: 4326 },
        outFields: ['*'],
        featureReduction: {
          ...CLUSTERING,
          // Upgraded to brand primary indigo with crisp luminous outline and halo
          symbol: {
            type: 'simple-marker',
            style: 'circle',
            color: [70, 72, 212, 0.92],
            outline: { color: [255, 255, 255, 0.95], width: 2.5 },
          },
        },
        renderer: {
          type: 'unique-value',
          field: 'type',
          legendOptions: { title: 'Project type' },
          uniqueValueInfos: PROJECT_TYPES.map((t) => ({
            value: t.key,
            label: t.label,
            symbol: {
              type: 'simple-marker',
              style: 'circle',
              size: 16,
              color: PROJECT_TYPE_COLORS[t.key],
              outline: { color: '#ffffff', width: 2 },
            },
          })),
        },
        labelingInfo: [
          {
            labelExpressionInfo: { expression: '$feature.num' },
            labelPlacement: 'above-center',
            symbol: {
              type: 'text',
              color: '#0f172a',
              haloColor: '#ffffff',
              haloSize: 1.5,
              // Must be a family Esri's font service hosts — 'Arial' bold hangs the layer view.
              font: { size: 10, weight: 'bold', family: 'Noto Sans' },
            },
          },
        ],
        popupTemplate: {
          title: '{num} · {title}',
          outFields: ['*'],
          content: ({ graphic }) => buildPopup(graphic.attributes, navigate, lang),
        },
      });

      mapEl.map.add(layer);
      layerRef.current = layer;
      setReady(true);

      // Smoothly zoom in when clicking on a cluster
      mapEl.view.on('click', async (event) => {
        try {
          const response = await mapEl.view.hitTest(event);
          const clusterHit = response?.results?.find((r) => r.graphic?.isAggregate);
          if (clusterHit?.graphic?.geometry) {
            mapEl.view
              .goTo({ target: clusterHit.graphic.geometry, zoom: mapEl.view.zoom + 2 }, { duration: 600 })
              .catch(() => {});
          }
        } catch {
          // ignore
        }
      });

      // Hide the loading veil once the points are actually on screen, with a fallback
      // so a slow font/tile request can never leave it up forever.
      const fallback = setTimeout(() => setSettled(true), 8000);
      mapEl.view
        .whenLayerView(layer)
        .then((lv) => reactiveUtils.whenOnce(() => !lv.updating))
        .then(() => setSettled(true))
        .catch(() => setSettled(true))
        .finally(() => clearTimeout(fallback));
    },
    [projects, navigate, lang],
  );

  // Type filter from the Calcite control.
  useEffect(() => {
    if (!layerRef.current) return;
    layerRef.current.definitionExpression = filter === 'all' ? null : `type = '${filter}'`;
  }, [filter, ready]);

  // "Show on map" from a project card: fly there and open its popup.
  useEffect(() => {
    const view = mapRef.current?.view;
    const layer = layerRef.current;
    if (!ready || !view || !layer || focus.projectId == null) return;

    let cancelled = false;
    (async () => {
      const { features } = await layer.queryFeatures({
        where: `pid = ${Number(focus.projectId)}`,
        returnGeometry: true,
        outFields: ['*'],
      });
      const feature = features[0];
      if (cancelled || !feature) return;
      await view.goTo({ target: feature.geometry, zoom: FOCUS_ZOOM }, { duration: 1400 }).catch(() => {});
      if (!cancelled) view.openPopup({ features: [feature], location: feature.geometry });
    })();

    return () => {
      cancelled = true;
    };
  }, [focus.nonce, focus.projectId, ready]);

  return (
    <>
      <arcgis-map
        ref={mapRef}
        basemap={basemapFor(mode)}
        center={CENTER}
        zoom={5}
        onarcgisViewReadyChange={onViewReady}
        style={{ width: '100%', height: '100%' }}
      >
      <arcgis-zoom slot="top-left" />
      <arcgis-home slot="top-left" />
      <arcgis-fullscreen slot="top-left" />
      <arcgis-expand slot="top-left" expand-tooltip="Basemap gallery">
        <arcgis-basemap-gallery source={BASEMAP_GALLERY} />
      </arcgis-expand>
      <div slot="top-right">
        <calcite-segmented-control
          scale="s"
          oncalciteSegmentedControlChange={(e) => setFilter(e.target.value)}
        >
          <calcite-segmented-control-item value="all" checked={filter === 'all' || undefined}>
            {lang === 'ar' ? 'الكل' : 'All'}
          </calcite-segmented-control-item>
          {PROJECT_TYPES.map((t) => (
            <calcite-segmented-control-item
              key={t.key}
              value={t.key}
              checked={filter === t.key || undefined}
            >
              {lang === 'ar'
                ? t.key === 'fullstack'
                  ? 'تطوير شامل'
                  : t.key === 'gis'
                  ? 'نظم جغرافية'
                  : 'ذكاء اصطناعي'
                : t.label}
            </calcite-segmented-control-item>
          ))}
        </calcite-segmented-control>
      </div>
        <MapLegend />
      </arcgis-map>

      {/* A small status pill, not a dimming veil: it must never fade a popup or the map. */}
      <Box
        role="status"
        aria-hidden={settled}
        sx={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.75,
          py: 0.75,
          borderRadius: 999,
          pointerEvents: 'none',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 6px 18px rgba(15, 23, 42, 0.14)',
          opacity: settled ? 0 : 1,
          transition: 'opacity .4s ease',
        }}
      >
        <CircularProgress size={16} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {lang === 'ar' ? 'جاري وضع المشاريع على الخريطة…' : 'Placing projects…'}
        </Typography>
      </Box>
    </>
  );
}
