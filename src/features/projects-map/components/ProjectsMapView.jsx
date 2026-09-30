// Lazy-loaded: this module (and the whole ArcGIS SDK it pulls in) is only fetched once
// the map section approaches the viewport.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-zoom';
import '@arcgis/map-components/components/arcgis-home';
import '@arcgis/map-components/components/arcgis-expand';
import '@arcgis/map-components/components/arcgis-basemap-gallery';
import '@arcgis/map-components/main.css';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point.js';
import Basemap from '@arcgis/core/Basemap.js';
import LocalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource.js';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { basemapFor, friendlyNavigation } from '@services/arcgis/config.js';
import { getMappedProjects, getProjectPath, formatProjectNumber } from '@/data/projects.js';
import { PROJECT_TYPES, getProjectType, getProjectTypeLabel } from '@/data/projectTypes.js';
import { PROJECT_TYPE_COLORS } from '@/theme/tokens.js';
import { selectMapFocus } from '@/store/slices/uiSlice.js';
import { safeText, safeUrl } from '@/utils/content.js';
import { useLanguage } from '@/i18n';

// Initial view: Egypt and Saudi Arabia, where every mapped project sits.
const CENTER = [37.5, 26];

// "Show on map" zooms in far enough that a project is clearly focused and not inside a cluster.
const FOCUS_ZOOM = 12;

// The classic vector basemaps need no access token, so the gallery works with or without an API key.
const BASEMAP_GALLERY = new LocalBasemapsSource({
  basemaps: ['gray-vector', 'dark-gray-vector', 'streets-vector', 'topo-vector', 'satellite', 'hybrid'].map(
    (id) => Basemap.fromId(id),
  ),
});

// Nearby projects merge into a numbered cluster on Desktop web.
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
  actions.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;';
  const open = document.createElement('button');
  open.textContent = lang === 'ar' ? 'عرض المشروع ←' : 'View project →';
  open.style.cssText =
    'display:inline-flex;align-items:center;justify-content:center;gap:6px;background:#4648d4;color:#ffffff;border:none;border-radius:6px;padding:6px 14px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;';
  open.addEventListener('click', () => navigate(attrs.path));
  actions.append(open);

  if (attrs.code) {
    const code = document.createElement('a');
    code.textContent = lang === 'ar' ? '</> الكود المصدري' : '</> Source code';
    code.href = attrs.code;
    code.target = '_blank';
    code.rel = 'noopener noreferrer';
    code.style.cssText =
      'display:inline-flex;align-items:center;justify-content:center;gap:6px;background:transparent;color:inherit;border:1px solid rgba(140,140,140,0.4);border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600;text-decoration:none;cursor:pointer;font-family:inherit;';
    actions.append(code);
  }

  root.append(meta, summary, actions);
  return root;
};

/**
 * A compact legend matching the site's project-type colours.
 */
function MapLegend({ isMobile }) {
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
          <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
            {lang === 'ar'
              ? t.key === 'fullstack'
                ? 'تطوير شامل (Full-Stack)'
                : t.key === 'gis'
                ? 'نظم معلومات جغرافية (GIS)'
                : 'ذكاء اصطناعي (AI)'
              : t.label}
          </Typography>
        </Box>
      ))}

      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 0.5,
            pt: 0.75,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={dot('#4648d4', {
              width: 16,
              height: 16,
              border: '2.5px solid #fff',
              boxShadow: '0 0 0 3px rgba(70, 72, 212, 0.35)',
            })}
          />
          <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
            {lang === 'ar' ? 'مشاريع متجمعة (اضغط للتكبير)' : 'Several nearby — click to zoom'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function ProjectsMapView({ mode }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const focus = useSelector(selectMapFocus);

  const isNarrowScreen = useMediaQuery('(max-width: 900px)');
  const isMobileDevice =
    typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
  const isMobile = isNarrowScreen || isMobileDevice;

  const mapRef = useRef(null);
  const viewRef = useRef(null);
  const layerRef = useRef(null);
  const graphicsRef = useRef([]);
  const addedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);
  const [filter, setFilter] = useState('all');
  const [handledNonce, setHandledNonce] = useState(focus.nonce);

  if (focus.nonce !== handledNonce) {
    setHandledNonce(focus.nonce);
    if (filter !== 'all') setFilter('all');
  }

  const projects = getMappedProjects();

  // Mobile mode: Direct view.graphics (no workers, no clustering, 100% reliable on mobile Safari)
  const initMobileGraphics = useCallback(
    (view) => {
      const graphics = [];
      projects.forEach((p, i) => {
        const type = getProjectType(p);
        const title = lang === 'ar' && p.titleAr ? p.titleAr : p.title;
        const summary = lang === 'ar' && p.summaryAr ? p.summaryAr : p.summary;
        const num = formatProjectNumber(p.id);

        const pin = new Graphic({
          geometry: new Point({ longitude: p.location.lng, latitude: p.location.lat }),
          symbol: {
            type: 'simple-marker',
            style: 'circle',
            size: 16,
            color: PROJECT_TYPE_COLORS[type],
            outline: { color: '#ffffff', width: 2.5 },
          },
          attributes: {
            oid: i + 1,
            pid: p.id,
            num,
            title,
            summary,
            type,
            year: String(p.year ?? safeText(p.period) ?? ''),
            place: lang === 'ar' && p.location.labelAr ? p.location.labelAr : p.location.label,
            path: getProjectPath(p),
            code: p.type === 'client' ? '' : (safeUrl(p.links?.code) ?? ''),
          },
          popupTemplate: {
            title: '{num} · {title}',
            content: ({ graphic }) => buildPopup(graphic.attributes, navigate, lang),
          },
        });

        const label = new Graphic({
          geometry: new Point({ longitude: p.location.lng, latitude: p.location.lat }),
          symbol: {
            type: 'text',
            text: num,
            color: '#0f172a',
            haloColor: '#ffffff',
            haloSize: 2,
            font: { size: 10, weight: 'bold', family: 'Noto Sans, sans-serif' },
            yoffset: 14,
          },
          attributes: {
            pid: p.id,
            type,
            isLabel: true,
          },
        });

        graphics.push(pin, label);
      });

      view.graphics.addMany(graphics);
      graphicsRef.current = graphics;

      // Click interaction: if user clicks the number label, open the pin's popup
      view.on('click', async (evt) => {
        const response = await view.hitTest(evt).catch(() => null);
        const hit = response?.results?.find((r) => r.graphic?.attributes?.pid);
        if (hit) {
          const targetPin = hit.graphic.attributes?.isLabel
            ? graphicsRef.current?.find((g) => g.attributes.pid === hit.graphic.attributes.pid && !g.attributes.isLabel)
            : hit.graphic;
          if (targetPin) {
            view.openPopup({ features: [targetPin], location: targetPin.geometry });
          }
        }
      });

      setReady(true);
      setSettled(true);
    },
    [projects, navigate, lang],
  );

  // Desktop mode: FeatureLayer with clustering
  const initDesktopLayer = useCallback(
    (map, view) => {
      try {
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

        // Click zoom for clusters
        view.on('click', async (evt) => {
          const response = await view.hitTest(evt).catch(() => null);
          const clusterHit = response?.results?.find((r) => r.graphic?.isAggregate);
          if (clusterHit?.graphic?.geometry) {
            view
              .goTo({ target: clusterHit.graphic.geometry, zoom: view.zoom + 2 }, { duration: 600 })
              .catch(() => {});
          }
        });

        // Robust fallback: if FeatureLayer fails to load on this browser, switch to mobile graphics
        layer.load().then(
          () => {
            setReady(true);
            setSettled(true);
          },
          (err) => {
            console.warn('FeatureLayer failed to load, falling back to direct graphics:', err);
            try {
              map.remove(layer);
            } catch (removeErr) {
              console.warn('Failed to remove layer:', removeErr);
            }
            layerRef.current = null;
            initMobileGraphics(view);
          },
        );

        map.add(layer);
        layerRef.current = layer;
      } catch (err) {
        console.warn('FeatureLayer setup failed, falling back to direct graphics:', err);
        initMobileGraphics(view);
      }
    },
    [projects, navigate, lang, initMobileGraphics],
  );

  const onViewReady = useCallback(
    async (event) => {
      setReady(true);
      const mapEl = event?.target ?? event;
      if (!mapEl || addedRef.current) return;

      try {
        if (typeof mapEl.componentOnReady === 'function') {
          await mapEl.componentOnReady();
        }
        const view = mapEl.view;
        if (!view) return;

        await view.when();
        if (addedRef.current) return;
        addedRef.current = true;
        viewRef.current = view;

        friendlyNavigation(view);

        // Hover cursor pointer
        view.on('pointer-move', async (evt) => {
          const response = await view.hitTest(evt).catch(() => null);
          const hasPin = response?.results?.some((r) => r.graphic?.attributes?.pid || r.graphic?.isAggregate);
          if (view.container) {
            view.container.style.cursor = hasPin ? 'pointer' : 'default';
          }
        });

        if (isMobile) {
          initMobileGraphics(view);
        } else {
          const activeMap = view.map || mapEl.map;
          if (activeMap) {
            initDesktopLayer(activeMap, view);
          } else {
            initMobileGraphics(view);
          }
        }
      } catch (err) {
        console.warn('Error in onViewReady:', err);
        setReady(true);
        setSettled(true);
      }
    },
    [isMobile, initMobileGraphics, initDesktopLayer],
  );

  useEffect(() => {
    const mapEl = mapRef.current;
    if (!mapEl) return undefined;

    const handleReady = () => {
      if (mapEl.view && !addedRef.current) {
        onViewReady({ target: mapEl });
      }
    };

    if (mapEl.ready || mapEl.view) {
      handleReady();
    }

    mapEl.addEventListener('arcgisViewReadyChange', handleReady);
    return () => {
      mapEl.removeEventListener('arcgisViewReadyChange', handleReady);
    };
  }, [onViewReady]);

  // Type filter
  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.definitionExpression = filter === 'all' ? null : `type = '${filter}'`;
    }
    const graphics = graphicsRef.current;
    if (graphics && graphics.length > 0) {
      graphics.forEach((g) => {
        g.visible = filter === 'all' || g.attributes.type === filter;
      });
    }
  }, [filter, ready]);

  // Language update
  useEffect(() => {
    const graphics = graphicsRef.current;
    if (!graphics || graphics.length === 0) return;
    graphics.forEach((g) => {
      if (g.attributes && !g.attributes.isLabel) {
        const p = projects.find((item) => item.id === g.attributes.pid);
        if (p) {
          g.attributes.title = lang === 'ar' && p.titleAr ? p.titleAr : p.title;
          g.attributes.summary = lang === 'ar' && p.summaryAr ? p.summaryAr : p.summary;
          g.attributes.place = lang === 'ar' && p.location.labelAr ? p.location.labelAr : p.location.label;
        }
      }
    });
  }, [lang, projects]);

  // "Show on map" from a project card: fly there and open its popup.
  useEffect(() => {
    const view = viewRef.current;
    if (!ready || !view || focus.projectId == null) return;

    if (layerRef.current) {
      let cancelled = false;
      (async () => {
        const { features } = await layerRef.current.queryFeatures({
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
    }

    const graphics = graphicsRef.current;
    if (graphics && graphics.length > 0) {
      const pin = graphics.find((g) => g.attributes?.pid === Number(focus.projectId) && !g.attributes?.isLabel);
      if (!pin) return;
      view.goTo({ target: pin.geometry, zoom: FOCUS_ZOOM }, { duration: 1400 }).catch(() => {});
      view.openPopup({ features: [pin], location: pin.geometry });
    }
  }, [focus.nonce, focus.projectId, ready]);

  return (
    <>
      <arcgis-map
        ref={mapRef}
        basemap={basemapFor(mode)}
        center={CENTER}
        zoom={5}
        onarcgisViewReadyChange={onViewReady}
        style={{ width: '100%', height: '100%', display: 'block', position: 'relative', minHeight: '400px' }}
      >
        <arcgis-zoom slot="top-left" />
        <arcgis-home slot="top-left" />
        <arcgis-expand slot="top-left" expand-tooltip="Basemap gallery">
          <arcgis-basemap-gallery source={BASEMAP_GALLERY} />
        </arcgis-expand>

        <Box
          slot="top-right"
          sx={{
            m: 1.25,
            p: 0.5,
            borderRadius: 999,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.16)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            maxWidth: 'min(440px, calc(100vw - 32px))',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => setFilter('all')}
            sx={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              px: 1.5,
              py: 0.6,
              borderRadius: 999,
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              transition: 'all .2s ease',
              backgroundColor: filter === 'all' ? 'primary.main' : 'transparent',
              color: filter === 'all' ? '#ffffff' : 'text.primary',
              '&:hover': {
                backgroundColor: filter === 'all' ? 'primary.main' : 'action.hover',
              },
            }}
          >
            {lang === 'ar' ? 'الكل' : 'All'}
          </Box>
          {PROJECT_TYPES.map((t) => {
            const active = filter === t.key;
            return (
              <Box
                key={t.key}
                component="button"
                type="button"
                onClick={() => setFilter(t.key)}
                sx={{
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  px: 1.5,
                  py: 0.6,
                  borderRadius: 999,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  transition: 'all .2s ease',
                  backgroundColor: active ? PROJECT_TYPE_COLORS[t.key] : 'transparent',
                  color: active ? '#ffffff' : 'text.primary',
                  '&:hover': {
                    backgroundColor: active ? PROJECT_TYPE_COLORS[t.key] : 'action.hover',
                  },
                }}
              >
                {lang === 'ar'
                  ? t.key === 'fullstack'
                    ? 'تطوير شامل'
                    : t.key === 'gis'
                    ? 'نظم جغرافية'
                    : 'ذكاء اصطناعي'
                  : t.label}
              </Box>
            );
          })}
        </Box>
        <MapLegend isMobile={isMobile} />
      </arcgis-map>

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
