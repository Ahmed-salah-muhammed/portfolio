import { useEffect, useState } from 'react';

// Returns the id of the section currently under the navbar.
export function useScrollSpy(sectionIds, offset = 96) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0] ?? null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds, offset]);

  return activeId;
}

export default useScrollSpy;
