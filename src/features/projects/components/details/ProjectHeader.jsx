import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatProjectNumber } from '@/data/projects.js';
import { Tag } from '@/shared/components/ui';
import { useLanguage } from '@/i18n';

export default function ProjectHeader({ project }) {
  const { lang, t } = useLanguage();
  const displayTitle = lang === 'ar' && project.titleAr ? project.titleAr : project.title;
  const displaySummary = lang === 'ar' && project.summaryAr ? project.summaryAr : project.summary;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: (tTheme) => `${tTheme.tokens.RADIUS.sm}px`,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 700,
            fontSize: 13.5,
          }}
        >
          {t('project.projectNum', 'Project')} {formatProjectNumber(project.id)}
        </Box>
        {project.category.map((cat) => (
          <Tag key={cat}>{cat}</Tag>
        ))}
      </Box>

      <Typography variant="h1" component="h1" sx={{ fontSize: { xs: 34, md: 50 }, maxWidth: 900 }}>
        {displayTitle}
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2.5, maxWidth: 780, fontSize: 18 }}>
        {displaySummary}
      </Typography>
    </Box>
  );
}
