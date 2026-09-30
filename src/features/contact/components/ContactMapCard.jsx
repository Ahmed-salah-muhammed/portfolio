import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import { ErrorBoundary } from '@/shared/components/ui';
import useNearViewport from '@/hooks/useNearViewport.js';

const ContactMapView = lazy(() => import('./ContactMapView.jsx'));

function Placeholder({ children }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        p: 2,
        backgroundColor: 'var(--mui-palette-surfaces-muted)',
        color: 'text.secondary',
      }}
    >
      {children}
    </Box>
  );
}

/**
 * A small ArcGIS map pinned on Cairo. It loads in the background a little after the projects
 * map (the SDK is then already cached), or sooner if scrolled near.
 */
export default function ContactMapCard() {
  const { mode, systemMode } = useColorScheme();
  const resolved = (mode === 'system' ? systemMode : mode) ?? 'light';
  const [ref, near] = useNearViewport('350px');

  return (
    <Box
      ref={ref}
      className={resolved === 'dark' ? 'calcite-mode-dark' : 'calcite-mode-light'}
      sx={{
        position: 'relative',
        flex: 1,
        height: { xs: 250, sm: 270, md: 300, lg: '100%' },
        minHeight: { xs: 240, md: 280 },
        borderRadius: (t) => `${t.tokens.RADIUS.lg}px`,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ErrorBoundary
        name="contact-map"
        fallback={
          <Placeholder>
            <Typography variant="body2">The map could not be loaded right now.</Typography>
          </Placeholder>
        }
      >
        {near ? (
          <Suspense
            fallback={
              <Placeholder>
                <CircularProgress size={24} />
              </Placeholder>
            }
          >
            <ContactMapView mode={resolved} />
          </Suspense>
        ) : (
          <Placeholder>
            <Typography variant="body2">Map</Typography>
          </Placeholder>
        )}
      </ErrorBoundary>
    </Box>
  );
}
