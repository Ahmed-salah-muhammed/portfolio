import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getVisibleMetrics } from '@/data/projects.js';
import { Card } from '@/shared/components/ui';
import { safeText } from '@/utils/content.js';
import { useLanguage } from '@/i18n';
import ProjectImage from '../ProjectImage.jsx';

/** Every block here returns null when its data is missing, so sparse projects still read well. */

export function ProjectCover({ project }) {
  return (
    <Box
      sx={{
        borderRadius: (t) => `${t.tokens.RADIUS.xl}px`,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ProjectImage project={project} sizes="(max-width: 1264px) 100vw, 1200px" />
    </Box>
  );
}

export function ProjectMetrics({ project }) {
  const { lang } = useLanguage();
  // Only metrics Ahmed has confirmed are ever shown.
  const metrics = getVisibleMetrics(project);
  if (metrics.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))`,
        },
      }}
    >
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <Typography
            sx={{
              fontFamily: (t) => t.tokens.FONTS.display,
              fontWeight: 800,
              fontSize: 26,
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {metric.value}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
            {lang === 'ar' && metric.labelAr ? metric.labelAr : metric.label}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}

/** Overview, The Challenge, The Approach — the case-study narrative. */
export function ProjectStory({ project }) {
  const { lang, t } = useLanguage();
  const description = lang === 'ar' && project.descriptionAr ? project.descriptionAr : project.description;
  const problem = lang === 'ar' && project.problemAr ? project.problemAr : project.problem;
  const approach = lang === 'ar' && project.approachAr ? project.approachAr : project.approach;

  const blocks = [
    { key: 'overview', title: t('project.overview', 'Overview'), body: safeText(description) },
    { key: 'challenge', title: t('project.challenge', 'The Challenge'), body: safeText(problem) },
    { key: 'approach', title: t('project.approach', 'The Approach'), body: safeText(approach) },
  ].filter((b) => b.body);

  if (blocks.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 6 } }}>
      {blocks.map((block) => (
        <Box key={block.key} component="section" aria-labelledby={`story-${block.key}`}>
          <Typography variant="h3" component="h2" id={`story-${block.key}`} sx={{ mb: 2 }}>
            {block.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {block.body}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
