import { useEffect, useRef, useState } from 'react';

// Data-saver / very slow connections should not pay for a map nobody asked for yet.
const shouldSkipPreload = () => {
  const connection = navigator.connection;
  return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? '');
};

/**
 * True once the element comes within `margin` of the viewport — used to start loading
 * heavy things (the ArcGIS SDK) just before they are needed.
 *
 * `preloadAfter` (ms) also flips it to true once the page has finished loading and gone
 * idle, so a heavy widget further down is already loaded and drawn by the time someone
 * scrolls to it. The first paint is never delayed: the wait starts after `load`, and the
 * work itself is scheduled with requestIdleCallback.
 */
export function useNearViewport(margin = '400px', { preloadAfter } = {}) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, near]);

  useEffect(() => {
    if (near || preloadAfter == null || shouldSkipPreload()) return undefined;

    let timer;
    let idle;
    const mount = () => setNear(true);
    const schedule = () => {
      timer = setTimeout(() => {
        if ('requestIdleCallback' in window) idle = requestIdleCallback(mount, { timeout: 3000 });
        else mount();
      }, preloadAfter);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      clearTimeout(timer);
      if (idle !== undefined) cancelIdleCallback(idle);
      window.removeEventListener('load', schedule);
    };
  }, [near, preloadAfter]);

  return [ref, near];
}

export default useNearViewport;
