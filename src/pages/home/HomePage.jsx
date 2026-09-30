import { useEffect } from 'react';
import Hero from '@/features/hero';
import Skills from '@/features/skills';
import Experience from '@/features/experience';
import Education from '@/features/education';
import Credentials from '@/features/credentials';
import Services from '@/features/services';
import { ProjectsExplorer } from '@/features/projects';
import ProjectsMap from '@/features/projects-map';
import GithubDashboard from '@/features/github';
import Videos from '@/features/videos';
import Contact from '@/features/contact';
import { ErrorBoundary } from '@/shared/components/ui';
import { useLanguage } from '@/i18n';

// Each section is isolated: one failure can never take down the rest of the page.
const SECTIONS = [
  { name: 'hero', Component: Hero },
  { name: 'education', Component: Education },
  { name: 'skills', Component: Skills },
  { name: 'experience', Component: Experience },
  { name: 'credentials', Component: Credentials },
  { name: 'services', Component: Services },
  { name: 'projects', Component: ProjectsExplorer },
  { name: 'projects-map', Component: ProjectsMap },
  { name: 'github', Component: GithubDashboard },
  { name: 'videos', Component: Videos }, // renders nothing until src/data/videos.js has videos
  { name: 'contact', Component: Contact },
];

export default function HomePage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'ar'
        ? 'أحمد صلاح محمد — مطور نظم معلومات جغرافية وتطبيقات شاملة'
        : 'Ahmed Salah Muhammed — Full-Stack & GIS Developer';
  }, [lang]);

  return (
    <>
      {SECTIONS.map(({ name, Component }) => (
        <ErrorBoundary key={name} name={name}>
          <Component />
        </ErrorBoundary>
      ))}
    </>
  );
}
