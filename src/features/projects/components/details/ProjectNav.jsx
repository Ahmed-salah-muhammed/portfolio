import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { Link as RouterLink } from 'react-router-dom';
import { getAdjacentProjects, getProjectPath, formatProjectNumber } from '@/data/projects.js';
import { useLanguage } from '@/i18n';

function NavCard({ project, direction }) {
  const { lang, t, isRTL } = useLanguage();
  const isPrev = direction === 'prev';
  const displayTitle = lang === 'ar' && project.titleAr ? project.titleAr : project.title;

  return (
    <Box
      component={RouterLink}
      to={getProjectPath(project)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 3,
        flex: 1,
        minWidth: 0,
        textDecoration: 'none',
        borderRadius: (themeObj) => `${themeObj.tokens.RADIUS.lg}px`,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        textAlign: isPrev ? (isRTL ? 'right' : 'left') : (isRTL ? 'left' : 'right'),
        transition: 'border-color .2s, transform .2s',
        '&:hover': { borderColor: 'var(--mui-palette-surfaces-borderStrong)', transform: 'translateY(-2px)' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          justifyContent: isPrev
            ? (isRTL ? 'flex-end' : 'flex-start')
            : (isRTL ? 'flex-start' : 'flex-end'),
          color: 'text.secondary',
        }}
      >
        {isPrev && (
          <ArrowBackRoundedIcon
            sx={{ fontSize: 16, transform: isRTL ? 'rotate(180deg)' : 'none' }}
          />
        )}
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'inherit' }}>
          {isPrev ? t('project.prevProject', 'Previous project') : t('project.nextProject', 'Next project')}
        </Typography>
        {!isPrev && (
          <ArrowForwardRoundedIcon
            sx={{ fontSize: 16, transform: isRTL ? 'rotate(180deg)' : 'none' }}
          />
        )}
      </Box>

      <Typography variant="subtitle1" sx={{ color: 'text.primary', mt: 0.5 }}>
        {formatProjectNumber(project.id)} · {displayTitle}
      </Typography>
    </Box>
  );
}

export default function ProjectNav({ project }) {
  const { t } = useLanguage();
  // Wraps around: the last project's "next" is the first one.
  const { prev, next } = getAdjacentProjects(project);

  return (
    <Box sx={{ pt: { xs: 6, md: 8 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        {prev && <NavCard project={prev} direction="prev" />}
        {next && <NavCard project={next} direction="next" />}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          component={RouterLink}
          to="/projects"
          variant="outlined"
          startIcon={<GridViewRoundedIcon />}
        >
          {t('project.backToAll', 'Back to all projects')}
        </Button>
      </Box>
    </Box>
  );
}
