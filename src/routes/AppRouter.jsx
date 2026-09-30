import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout.jsx';
import { homeRoutes } from '@/pages/home';
import { notFoundRoutes } from '@/pages/not-found';
import { projectsRoutes } from '@/features/projects';

// Each feature/page declares its own routes next to its components; this file only
// assembles them under the shared layout. The catch-all stays last.
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [...homeRoutes, ...projectsRoutes, ...notFoundRoutes],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
