import { useEffect } from 'react';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {
  getProjectByNumber,
  getProjectPath,
  formatProjectNumber,
} from '@/data/projects.js';
import { todoFields } from '@/utils/content.js';
import { useLanguage } from '@/i18n';
import ProjectHeader from '../components/details/ProjectHeader.jsx';
import ProjectSidebar from '../components/details/ProjectSidebar.jsx';
import ProjectGallery from '../components/details/ProjectGallery.jsx';
import ProjectVideos from '../components/details/ProjectVideos.jsx';
import ProjectNav from '../components/details/ProjectNav.jsx';
import {
  ProjectCover,
  ProjectMetrics,
  ProjectStory,
} from '../components/details/ProjectSections.jsx';

function ProjectNotFound() {
  const { lang, t } = useLanguage();
  useEffect(() => {
    document.title =
      lang === 'ar'
        ? 'لم يتم العثور على المشروع — أحمد صلاح محمد'
        : 'Project not found — Ahmed Salah Muhammed';
  }, [lang]);

  return (
    <Container sx={{ py: { xs: 12, md: 18 }, textAlign: 'center' }}>
      <Typography variant="h1" component="h1" sx={{ fontSize: { xs: 34, md: 48 } }}>
        {t('project.notFoundTitle', 'Project not found')}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, mb: 5 }}>
        {t('project.notFoundText', 'There is no published project with that number.')}
      </Typography>
      <Button component={RouterLink} to="/projects" variant="contained" size="large">
        {t('project.backToAll', 'Back to all projects')}
      </Button>
    </Container>
  );
}

export default function ProjectDetailsPage() {
  const { lang, t, isRTL } = useLanguage();
  const { number, slug } = useParams();
  const project = getProjectByNumber(number);

  const canonical = project ? getProjectPath(project) : null;
  const isCanonical = project
    ? slug === project.slug && number === formatProjectNumber(project.id)
    : false;

  useEffect(() => {
    if (!project || !isCanonical) return;

    const displayTitle = lang === 'ar' && project.titleAr ? project.titleAr : project.title;
    document.title = `${formatProjectNumber(project.id)} · ${displayTitle} — ${lang === 'ar' ? 'أحمد صلاح محمد' : 'Ahmed Salah Muhammed'}`;
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (import.meta.env.DEV) {
      const incomplete = todoFields(project);
      if (incomplete.length) {
        console.warn(
          `[project ${formatProjectNumber(project.id)}] hidden from the UI — fields still marked TODO: ${incomplete.join(', ')}`,
        );
      }
    }
  }, [project, isCanonical, lang]);

  if (!project) return <ProjectNotFound />;

  // "/projects/1" and "/projects/01/old-slug" both settle on the canonical URL.
  if (!isCanonical) return <Navigate to={canonical} replace />;

  return (
    <>
      <Box
        component="section"
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 },
          backgroundColor: 'var(--mui-palette-surfaces-alt)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container>
          <Button
            component={RouterLink}
            to="/projects"
            variant="text"
            startIcon={
              <ArrowBackRoundedIcon
                sx={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
              />
            }
            sx={{ mb: 4, [isRTL ? 'mr' : 'ml']: -1.5, color: 'text.secondary' }}
          >
            {t('project.allProjects', 'All projects')}
          </Button>
          <ProjectHeader project={project} />
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <ProjectCover project={project} />

        <Box sx={{ mt: { xs: 5, md: 6 } }}>
          <ProjectMetrics project={project} />
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 8 },
            display: 'grid',
            gap: { xs: 5, md: 8 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 360px' },
            alignItems: 'start',
          }}
        >
          <ProjectStory project={project} />
          <ProjectSidebar project={project} />
        </Box>

        {project.videos?.length > 0 && (
          <Box sx={{ mt: { xs: 6, md: 10 } }}>
            <ProjectVideos project={project} />
          </Box>
        )}

        {project.gallery?.length > 0 && (
          <Box sx={{ mt: { xs: 6, md: 10 } }}>
            <ProjectGallery project={project} />
          </Box>
        )}

        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <ProjectNav project={project} />
        </Box>
      </Container>
    </>
  );
}
