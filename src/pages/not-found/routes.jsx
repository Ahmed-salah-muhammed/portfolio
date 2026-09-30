import NotFoundPage from './NotFoundPage.jsx';

// Catch-all: must stay last when the route lists are merged.
export const notFoundRoutes = [{ path: '*', element: <NotFoundPage /> }];

export default notFoundRoutes;
