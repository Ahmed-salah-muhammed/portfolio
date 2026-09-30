import HomePage from './HomePage.jsx';

// The landing page is the one route that is NOT lazy — it is the first paint.
export const homeRoutes = [{ index: true, element: <HomePage /> }];

export default homeRoutes;
