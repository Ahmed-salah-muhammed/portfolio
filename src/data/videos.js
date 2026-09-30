// src/data/videos.js
// Videos shown in the "Videos" section of the home page (and its nav link). The section is hidden
// in production while this list has no valid entry, and shows a small placeholder in `npm run dev`.
//
// Two kinds of entry, in the order they should appear:
//   YouTube:     { url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', title: '…', description: '…' }
//                (watch, youtu.be, shorts and embed links all work; playlist parameters are ignored)
//   Self-hosted: { src: '/videos/name.mp4', poster: '/images/videos/name.webp', title: '…' }
//                (mp4 under public/videos/, poster under public/images/videos/)
// `description` is optional. `featured: true` makes an entry span the full row with a larger layout.
// YouTube titles below are copied verbatim from YouTube.

export const VIDEOS = [
  {
    src: '/videos/esri-products.mp4',
    poster: '/images/videos/esri-products.webp',
    title: 'Esri Products Walkthrough',
    titleAr: 'دورة عمل متكاملة لمنتجات وميزات Esri',
    description:
      'QuickCapture, Survey123, Field Maps, Experience Builder, Dashboards, Hub and StoryMaps working together in one field-operations workflow.',
    descriptionAr:
      'تكامل تطبيقات العمل الحقلي والمكتبي: QuickCapture و Survey123 و Field Maps مع Experience Builder و Dashboards و Hub و StoryMaps في سير عمل مؤسسي متكامل.',
    featured: true,
  },
  {
    url: 'https://www.youtube.com/watch?v=_6NGOSRz9TE',
    title: 'AI Meets GIS: Connecting Claude to ArcGIS Pro & QGIS with MCP!',
    titleAr: 'الذكاء الاصطناعي يلتقي بنظم الـ GIS: ربط Claude بـ ArcGIS Pro و QGIS عبر بروتوكول MCP!',
  },
  {
    url: 'https://www.youtube.com/watch?v=seLDftbBk-c',
    title: 'شرح طريقة عمل Simulation للسيول والفياضانات على ARCGIS PRO',
    titleAr: 'شرح طريقة عمل محاكاة (Simulation) للسيول والفيضانات على برنامج ArcGIS Pro',
  },
  {
    url: 'https://www.youtube.com/watch?v=_J_Q2V-pUNc',
    title: 'How to deploy ArcGIS Enterprise in AWS Theoretically',
    titleAr: 'نشر وإعداد بيئة ArcGIS Enterprise على سحابة AWS نظرياً',
  },
  {
    url: 'https://www.youtube.com/watch?v=34GfjdQ0IrM',
    title: 'Introduction To CityEngine by Eng : Ahmed Salah Abd El-bari',
    titleAr: 'مقدمة في برنامج Esri CityEngine للنمذجة ثلاثية الأبعاد — م/ أحمد صلاح',
  },
  {
    url: 'https://www.youtube.com/watch?v=inhLgCXyUiE',
    title: 'NDBI ,NDVI ,LCLU',
    titleAr: 'تحليل المؤشرات الطيفية واستخدامات الأراضي (NDVI, NDBI, LULC)',
  },
  {
    url: 'https://www.youtube.com/watch?v=s15daDRk_L8',
    title: 'Industrial city for new-delta — Salah graduation project “Cad-Gis-Cityengine-Unreal engine”',
    titleAr: 'المدينة الصناعية بالدلتا الجديدة — مشروع تخرج "CAD - GIS - CityEngine - Unreal Engine"',
  },
];

const ID_PATTERN = /^[\w-]{11}$/;

/** Extracts the 11-character video id from a YouTube URL (or accepts a bare id). */
export function getYoutubeId(input) {
  if (typeof input !== 'string') return null;
  const value = input.trim();
  if (ID_PATTERN.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^(www|m)\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      return ID_PATTERN.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const v = url.searchParams.get('v');
      if (v && ID_PATTERN.test(v)) return v;
      const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {
    // not a URL — fall through
  }
  return null;
}

/** Normalised, valid videos; malformed entries are skipped (and reported in dev). */
export function getVideos(list = VIDEOS) {
  return list.flatMap((video, index) => {
    const base = {
      title: video.title?.trim() || 'Video',
      titleAr: video.titleAr?.trim() || video.title?.trim() || 'فيديو',
      description: video.description?.trim() || '',
      descriptionAr: video.descriptionAr?.trim() || video.description?.trim() || '',
      featured: Boolean(video.featured),
    };

    if (video.src) {
      return [{ ...base, key: video.src, kind: 'file', src: video.src, poster: video.poster }];
    }

    const id = getYoutubeId(video.url);
    if (!id) {
      if (import.meta.env.DEV) {
        console.warn(`[videos.js] entry ${index + 1} has neither a "src" nor a valid YouTube "url": "${video.url}"`);
      }
      return [];
    }
    return [{ ...base, key: id, kind: 'youtube', id }];
  });
}

/** True when the section should exist: real videos, or dev mode (so the placeholder is visible). */
export const SHOW_VIDEOS = getVideos().length > 0 || import.meta.env.DEV;
