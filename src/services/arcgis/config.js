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

export const friendlyNavigation = (view) => {
  if (!view) return;
  try {
    const nav = view.navigation;
    if (nav) {
      // In @arcgis/core, setting browserTouchPanEnabled to false allows single-finger touch
      // to scroll the page naturally on mobile (especially iOS Safari), while two fingers
      // can still pinch-to-zoom and pan the map.
      if ('browserTouchPanEnabled' in nav) {
        nav.browserTouchPanEnabled = false;
      }
      if (nav.actionMap) {
        nav.actionMap.mouseWheel = 'none';
        view.on('click', () => {
          try {
            if (view.navigation?.actionMap) {
              view.navigation.actionMap.mouseWheel = 'zoom';
            }
          } catch {
            // ignore
          }
        });
        view.container?.addEventListener('mouseleave', () => {
          try {
            if (view.navigation?.actionMap) {
              view.navigation.actionMap.mouseWheel = 'none';
            }
          } catch {
            // ignore
          }
        });
      }
    }
  } catch (err) {
    console.warn('Could not set friendly navigation on map view:', err);
  }
};

