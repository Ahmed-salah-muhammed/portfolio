// Shared ArcGIS settings for every map on the site. Imported only from the lazily
// loaded map modules, so none of this reaches the main bundle.
import esriConfig from '@arcgis/core/config.js';

const API_KEY = import.meta.env.VITE_ARCGIS_API_KEY ?? '';
if (API_KEY) esriConfig.apiKey = API_KEY;

/**
 * The newer "arcgis/…" basemap styles need an access token; the classic vector
 * basemaps work without one. Use the nicer styles when a key is configured.
 */
export const basemapFor = (mode) => {
  if (API_KEY) return mode === 'dark' ? 'arcgis/dark-gray' : 'arcgis/light-gray';
  return mode === 'dark' ? 'dark-gray-vector' : 'gray-vector';
};

/**
 * Maps sit inside a page people scroll, so they must not steal that scrolling:
 *  - touch: one finger scrolls the page, two fingers pan/zoom the map;
 *  - mouse: the wheel zooms only after the map has been clicked, and stops again as
 *    soon as the pointer leaves it.
 */
export const friendlyNavigation = (view) => {
  view.navigation.browserTouchPanEnabled = true;
  view.navigation.mouseWheelZoomEnabled = false;

  view.on('click', () => {
    view.navigation.mouseWheelZoomEnabled = true;
  });
  view.container?.addEventListener('mouseleave', () => {
    view.navigation.mouseWheelZoomEnabled = false;
  });
};
