import { lazy } from 'react';

// Both project pages are code-split — they are only reached from a card click.
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage.jsx'));

/**
 * The projects feature owns its own URLs. The slug is optional because the details
 * page resolves by number alone and then redirects to the canonical path.
 */
export const projectsRoutes = [
  { path: 'projects', element: <ProjectsPage /> },
  { path: 'projects/:number/:slug?', element: <ProjectDetailsPage /> },
];

export default projectsRoutes;
