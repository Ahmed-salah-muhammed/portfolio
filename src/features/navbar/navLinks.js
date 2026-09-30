import { SHOW_VIDEOS } from '@/data/videos.js';

// Home-page anchors used by the desktop nav, the mobile drawer and the footer.
// "Videos" only exists while the section does (entries added in src/data/videos.js).
export const NAV_LINKS = [
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'projects-map', label: 'GIS Lab' },
  { id: 'github', label: 'GitHub' },
  ...(SHOW_VIDEOS ? [{ id: 'videos', label: 'Videos' }] : []),
  { id: 'contact', label: 'Contact' },
];

export const NAV_IDS = NAV_LINKS.map((l) => l.id);
