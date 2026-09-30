import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { getMappedProjects, formatProjectNumber } from '@/data/projects.js';
import { getProjectType } from '@/data/projectTypes.js';
import { PROJECT_TYPE_COLORS } from '@/theme/tokens.js';
import { focusProjectOnMap } from '@/store/slices/uiSlice.js';
import { Section, Reveal, ErrorBoundary } from '@/shared/components/ui';
import useNearViewport from '@/hooks/useNearViewport.js';

const ProjectsMapView = lazy(() => import('./ProjectsMapView.jsx'));

function MapPlaceholder({ children }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        p: 3,
        backgroundColor: 'var(--mui-palette-surfaces-muted)',
        color: 'text.secondary',
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Where the work happened: every project with a location, coloured by discipline,
 * on an ArcGIS map. The SDK loads in the background once the page is idle (or as soon as
 * this section nears the viewport, whichever comes first) — never before the first paint.
 */
import { useLanguage } from '@/i18n';

export default function ProjectsMapSection() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const { mode, systemMode } = useColorScheme();
  const resolvedMode = (mode === 'system' ? systemMode : mode) ?? 'light';
  // Loads in the background shortly after the page settles, so it is already drawn when scrolled to.
  const [ref, near] = useNearViewport('400px', { preloadAfter: 600 });
  const projects = getMappedProjects();

  return (
    <Section
      id="projects-map"
      alt
      title={t('gislab.title', 'Projects Map')}
      subtitle={t(
        'gislab.subtitle',
        'Where the work sits on the ground — every located project, coloured by discipline. Click a point for its details and a link to the full project.',
      )}
    >
      <Reveal>
        <Box
          ref={ref}
          className={resolvedMode === 'dark' ? 'calcite-mode-dark' : 'calcite-mode-light'}
          sx={{
            position: 'relative',
            height: { xs: 460, md: 600, xl: 680 },
            borderRadius: (t) => `${t.tokens.RADIUS.lg}px`,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <ErrorBoundary
            name="projects-map"
            fallback={
              <MapPlaceholder>
                <Typography variant="body2">The map could not be loaded right now.</Typography>
              </MapPlaceholder>
            }
          >
            {near ? (
              <Suspense
                fallback={
                  <MapPlaceholder>
                    <Box>
                      <CircularProgress size={28} />
                      <Typography variant="body2" sx={{ mt: 1.5 }}>
                        Loading map…
                      </Typography>
                    </Box>
                  </MapPlaceholder>
                }
              >
                <ProjectsMapView mode={resolvedMode} />
              </Suspense>
            ) : (
              <MapPlaceholder>
                <Typography variant="body2">Map</Typography>
              </MapPlaceholder>
            )}
          </ErrorBoundary>
        </Box>
      </Reveal>

      {/* Jump list: also the accessible, map-free way to reach each located project. */}
      <Reveal sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {projects.map((p) => (
            <Button
              key={p.id}
              size="small"
              variant="outlined"
              onClick={() => dispatch(focusProjectOnMap(p.id))}
              startIcon={
                <PlaceRoundedIcon sx={{ color: PROJECT_TYPE_COLORS[getProjectType(p)] }} />
              }
              sx={{ borderRadius: 999 }}
            >
              {formatProjectNumber(p.id)} · {p.location.label}
            </Button>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
