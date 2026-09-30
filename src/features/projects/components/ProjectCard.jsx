import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { getProjectPath, formatProjectNumber } from '@/data/projects.js';
import { getProjectType, getProjectTypeLabel } from '@/data/projectTypes.js';
import { PROJECT_TYPE_COLORS } from '@/theme/tokens.js';
import { focusProjectOnMap } from '@/store/slices/uiSlice.js';
import { Tag } from '@/shared/components/ui';
import { safeUrl, safeText } from '@/utils/content.js';
import { useLanguage } from '@/i18n';
import ProjectImage from './ProjectImage.jsx';

const MAX_STACK_TAGS = 4;
const MAP_SECTION_ID = 'projects-map';

/** Asks the map section to fly to this project, going home first if needed. */
function useShowOnMap(project) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return () => {
    dispatch(focusProjectOnMap(project.id));
    if (pathname !== '/') {
      navigate(`/#${MAP_SECTION_ID}`);
      return;
    }
    document.getElementById(MAP_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

/**
 * One card for every project. Navigation happens through an explicit "View details"
 * button (and the cover image), never through underlined text.
 * `variant`: "default" (grid), "featured" (larger), "timeline" (shorter cover for the
 * centre-line layout) — proportions only, there is no second card to keep in sync.
 */
export default function ProjectCard({ project, variant = 'default' }) {
  const { lang, t } = useLanguage();
  const featured = variant === 'featured';
  const timeline = variant === 'timeline';
  const path = getProjectPath(project);
  const isClientWork = project.type === 'client';
  const period = safeText(project.period);
  const typeKey = getProjectType(project);
  const typeColor = PROJECT_TYPE_COLORS[typeKey];
  const showOnMap = useShowOnMap(project);

  // Client engagements have no public code — show the period instead of repo links.
  const code = isClientWork ? null : safeUrl(project.links?.code);
  const live = isClientWork ? null : safeUrl(project.links?.live);

  const visibleStack = project.stack.slice(0, MAX_STACK_TAGS);
  const overflow = project.stack.length - visibleStack.length;
  const dateLabel = isClientWork && period ? period : project.year;

  const displayTitle = lang === 'ar' && project.titleAr ? project.titleAr : project.title;
  const displaySummary = lang === 'ar' && project.summaryAr ? project.summaryAr : project.summary;

  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: (t) => `${t.tokens.RADIUS.lg}px`,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'var(--mui-palette-surfaces-borderStrong)',
          boxShadow: (t) =>
            t.palette.mode === 'dark' ? t.tokens.SHADOWS.cardHoverDark : t.tokens.SHADOWS.cardHover,
        },
        '&:hover img': { transform: 'scale(1.04)' },
      }}
    >
      {/* The cover also opens the project; kept out of the tab order since the button does the same. */}
      <Box
        component={RouterLink}
        to={path}
        tabIndex={-1}
        aria-hidden
        // No link styling may leak into the placeholder text (underline / link colour).
        sx={{ position: 'relative', display: 'block', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}
      >
        <ProjectImage
          project={project}
          sizes={featured || timeline ? '(max-width: 900px) 100vw, 640px' : '(max-width: 900px) 100vw, 400px'}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            gap: 1,
          }}
        >
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: (t) => `${t.tokens.RADIUS.sm}px`,
              backgroundColor: 'background.paper',
              color: 'text.primary',
              fontWeight: 700,
              fontSize: 13,
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
            }}
          >
            {formatProjectNumber(project.id)}
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.5,
              borderRadius: (tTheme) => `${tTheme.tokens.RADIUS.sm}px`,
              backgroundColor: typeColor,
              color: '#fff',
              fontWeight: 700,
              fontSize: 12.5,
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
            }}
          >
            {lang === 'ar'
              ? (typeKey === 'fullstack' ? 'تطوير شامل' : typeKey === 'gis' ? 'نظم جغرافية' : 'ذكاء اصطناعي')
              : getProjectTypeLabel(typeKey)}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: featured || timeline ? { xs: 3, md: 3.5 } : 3,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            mb: 1.25,
            color: 'text.secondary',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {isClientWork
              ? (lang === 'ar' ? 'مشروع عميل' : 'Client project')
              : project.category.map((c) =>
                  lang === 'ar'
                    ? (c === 'GIS' ? 'نظم جغرافية' : c === 'AI' ? 'ذكاء اصطناعي' : c === 'Web' ? 'ويب' : c === 'Backend' ? 'خوادم' : c === '3D' ? 'ثلاثي الأبعاد' : c)
                    : c,
                ).join(' · ')}
          </Typography>
          {dateLabel && <Typography variant="caption">{dateLabel}</Typography>}
        </Box>

        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: featured || timeline ? { xs: 20, md: 22 } : 19,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {displayTitle}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 1.25,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {displaySummary}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2.25 }}>
          {visibleStack.map((tech) => (
            <Tag key={tech} sx={{ fontSize: 12.5, py: 0.5 }}>
              {tech}
            </Tag>
          ))}
          {overflow > 0 && <Tag sx={{ fontSize: 12.5, py: 0.5 }}>+{overflow}</Tag>}
        </Box>

        <Box sx={{ mt: 'auto', pt: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Button
            component={RouterLink}
            to={path}
            variant="outlined"
            endIcon={<ArrowForwardRoundedIcon sx={{ transform: lang === 'ar' ? 'scaleX(-1)' : 'none' }} />}
            aria-label={`View details — ${project.title}`}
          >
            {t('projects.viewDetails', 'View details')}
          </Button>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
            {project.location && (
              <Tooltip title={t('projects.showOnMap', 'Show on map')}>
                <IconButton
                  onClick={showOnMap}
                  aria-label={`Show ${project.title} on the map`}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <TravelExploreRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {code && (
              <Tooltip title={t('projects.sourceCode', 'Source code')}>
                <IconButton
                  href={code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source code — ${project.title}`}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {live && (
              <Tooltip title={t('projects.liveDemo', 'Live demo')}>
                <IconButton
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo — ${project.title}`}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <LaunchRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
