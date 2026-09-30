import { useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-zoom';
import '@arcgis/map-components/main.css';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point.js';
import { basemapFor, friendlyNavigation } from '@services/arcgis/config.js';
import { PROFILE } from '@/data/profile.js';
import { useLanguage } from '@/i18n';

const CAIRO_LNG = PROFILE.coordinates.lng;
const CAIRO_LAT = PROFILE.coordinates.lat;
const CAIRO_CENTER = [CAIRO_LNG, CAIRO_LAT];

export default function ContactMapView({ mode }) {
  const { lang } = useLanguage();
  const mapRef = useRef(null);
  const added = useRef(false);

  const initMarker = useCallback(
    async (mapEl) => {
      if (!mapEl || added.current) return;
      try {
        if (typeof mapEl.componentOnReady === 'function') {
          await mapEl.componentOnReady();
        }
        const view = mapEl.view;
        if (!view) return;

        await view.when();
        if (added.current) return;
        added.current = true;

        friendlyNavigation(view);

        const point = new Point({ longitude: CAIRO_LNG, latitude: CAIRO_LAT });
        const marker = new Graphic({
          geometry: point,
          symbol: {
            type: 'simple-marker',
            style: 'circle',
            size: 16,
            color: '#4648d4',
            outline: { color: '#ffffff', width: 3 },
          },
          popupTemplate: {
            title: lang === 'ar' ? (PROFILE.locationAr ?? 'القاهرة، مصر') : (PROFILE.location ?? 'Cairo, Egypt'),
            content:
              lang === 'ar'
                ? 'متاح للعمل الحضوري وعن بُعد في مصر والخليج العربي'
                : 'Available for on-site & remote opportunities across Egypt and the Gulf.',
          },
        });

        view.graphics.add(marker);
      } catch (err) {
        console.warn('Error adding contact graphic:', err);
      }
    },
    [lang],
  );

  const onViewReady = useCallback(
    (event) => {
      const mapEl = event?.target ?? event;
      if (mapEl) {
        initMarker(mapEl);
      }
    },
    [initMarker],
  );

  useEffect(() => {
    const mapEl = mapRef.current;
    if (!mapEl) return undefined;

    const handleReady = () => {
      if (mapEl.view && !added.current) {
        initMarker(mapEl);
      }
    };

    if (mapEl.ready || mapEl.view) {
      handleReady();
    }

    mapEl.addEventListener('arcgisViewReadyChange', handleReady);
    return () => {
      mapEl.removeEventListener('arcgisViewReadyChange', handleReady);
    };
  }, [initMarker]);

  return (
    <arcgis-map
      ref={mapRef}
      basemap={basemapFor(mode)}
      center={CAIRO_CENTER}
      zoom={12}
      onarcgisViewReadyChange={onViewReady}
      style={{ display: 'block', width: '100%', height: '100%', minHeight: '260px', position: 'relative' }}
    >
      <arcgis-zoom slot="top-left" />
      <Box
        slot="top-right"
        sx={{
          m: 1.25,
          px: 1.5,
          py: 0.6,
          borderRadius: 999,
          backgroundColor: 'primary.main',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          userSelect: 'none',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>
          📍
        </span>
        <span>{lang === 'ar' ? (PROFILE.locationAr ?? 'القاهرة، مصر') : PROFILE.location}</span>
      </Box>
    </arcgis-map>
  );
}
