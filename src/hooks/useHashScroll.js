import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Other pages link to home sections as "/#projects". The router does not scroll to a
 * hash by itself, so once the page has rendered, bring the target section into view.
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // Wait a frame so lazily rendered sections exist before measuring.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
}

export default useHashScroll;
