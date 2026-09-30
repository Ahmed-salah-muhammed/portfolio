import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CallSplitRoundedIcon from '@mui/icons-material/CallSplitRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import { getProjectPath } from '@/data/projects.js';
import { Card, Tag } from '@/shared/components/ui';
import { safeText, safeUrl } from '@/utils/content.js';
import { formatRelative } from '@/utils/date.js';
import { useLanguage } from '@/i18n';
import { languageColor } from '../githubData.js';

function Metric({ icon: Icon, value, label }) {
  return (
    <Box
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}
      title={label}
    >
      <Icon sx={{ fontSize: 17 }} />
      <Typography variant="caption">{value}</Typography>
    </Box>
  );
}

/**
 * A repo that backs a portfolio project shows that project's own title and summary
 * (vetted copy) with live GitHub data; any other repo shows its name and description.
 */
export default function RepoCard({ repo }) {
  const { lang, t, isRTL } = useLanguage();
  const { project, role } = repo;
  const isBackend = role === 'backend';

  const displayProjectTitle = lang === 'ar' && project?.titleAr ? project.titleAr : project?.title;
  const title = project ? (isBackend ? `${displayProjectTitle} — backend` : displayProjectTitle) : repo.name;
  const displayProjectSummary = lang === 'ar' && project?.summaryAr ? project.summaryAr : project?.summary;
  const description = project ? safeText(displayProjectSummary) : safeText(repo.description);
  const demo = safeUrl(repo.homepage);
  const updated = formatRelative(repo.pushedAt);

  return (
    <Card
      component="article"
      interactive
      sx={{ display: 'flex', flexDirection: 'column', p: { xs: 3, md: 3.5 }, minWidth: 0 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
        {repo.language ? (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
            <Box
              aria-hidden
              sx={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, backgroundColor: languageColor(repo.language) }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }} noWrap>
              {repo.language}
            </Typography>
          </Box>
        ) : (
          <span />
        )}
        {updated && (
          <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            {t('github.updated', 'Updated')} {updated}
          </Typography>
        )}
      </Box>

      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: 19,
          overflowWrap: 'anywhere',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      )}

      {(repo.stars > 0 || repo.forks > 0 || repo.topics.length > 0) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mt: 2 }}>
          {repo.stars > 0 && <Metric icon={StarBorderRoundedIcon} value={repo.stars} label="Stars" />}
          {repo.forks > 0 && <Metric icon={CallSplitRoundedIcon} value={repo.forks} label="Forks" />}
          {repo.topics.slice(0, 3).map((topic) => (
            <Tag key={topic} sx={{ fontSize: 12, py: 0.25 }}>
              {topic}
            </Tag>
          ))}
        </Box>
      )}

      <Box
        sx={{
          mt: 'auto',
          pt: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Button
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<GitHubIcon sx={{ fontSize: '1.05rem !important' }} />}
            aria-label={`View ${repo.name} on GitHub`}
            sx={{
              whiteSpace: 'nowrap',
              px: 1.5,
              py: 0.5,
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '8px',
            }}
          >
            {t('github.viewRepo', 'View repo')}
          </Button>

          {project && !isBackend && (
            <Button
              component={RouterLink}
              to={getProjectPath(project)}
              variant="text"
              size="small"
              sx={{
                whiteSpace: 'nowrap',
                px: 1.25,
                py: 0.5,
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
              endIcon={
                <ArrowForwardRoundedIcon
                  sx={{
                    fontSize: '1rem !important',
                    transform: isRTL ? 'rotate(180deg)' : 'none',
                  }}
                />
              }
            >
              {t('github.caseStudy', 'Case study')}
            </Button>
          )}
        </Box>

        {demo && (
          <Tooltip title={lang === 'ar' ? 'معاينة حية' : 'Live demo'}>
            <IconButton
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label={`Live demo — ${title}`}
              sx={{
                flexShrink: 0,
                alignSelf: 'center',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                p: 0.6,
                transition: 'all .2s ease',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <LaunchRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
}
