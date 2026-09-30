// Lazy-loaded together with the ArcGIS SDK — see ContactMapCard.
import { useRef } from 'react';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-zoom';
import '@esri/calcite-components/components/calcite-chip';
import '@arcgis/map-components/main.css';
import '@esri/calcite-components/main.css';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point.js';
import { basemapFor, friendlyNavigation } from '@services/arcgis/config.js';
import { PROFILE } from '@/data/profile.js';
import { useLanguage } from '@/i18n';

const { lat, lng } = PROFILE.coordinates;

export default function ContactMapView({ mode }) {
  const { lang } = useLanguage();
  const added = useRef(false);

  const onViewReady = (event) => {
    const { view } = event.target;
    if (!view || added.current) return;
    added.current = true;

    friendlyNavigation(view);
    view.graphics.add(
      new Graphic({
        geometry: new Point({ longitude: lng, latitude: lat }),
        symbol: {
          type: 'simple-marker',
          style: 'circle',
          size: 16,
          color: '#4648d4',
          outline: { color: '#ffffff', width: 3 },
        },
        popupTemplate: {
          title: lang === 'ar' ? (PROFILE.locationAr ?? 'القاهرة، مصر') : (PROFILE.location ?? 'Cairo, Egypt'),
          content: lang === 'ar'
            ? 'متاح للعمل الحضوري وعن بُعد في مصر والخليج العربي'
            : 'Available for on-site & remote opportunities across Egypt and the Gulf.',
        },
      }),
    );
  };

  return (
    <arcgis-map
      basemap={basemapFor(mode)}
      center={[lng, lat]}
      zoom={12}
      onarcgisViewReadyChange={onViewReady}
      style={{ width: '100%', height: '100%' }}
    >
      <arcgis-zoom slot="top-left" />
      <div slot="top-right">
        <calcite-chip scale="s" icon="pin" appearance="solid" kind="brand">
          {lang === 'ar' ? (PROFILE.locationAr ?? PROFILE.location) : PROFILE.location}
        </calcite-chip>
      </div>
    </arcgis-map>
  );
}
