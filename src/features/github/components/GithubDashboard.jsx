import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { PROFILE } from '@/data/profile.js';
import { Section, Reveal, Card } from '@/shared/components/ui';
import useNearViewport from '@/hooks/useNearViewport.js';
import { GithubRateLimitError } from '@services/github/githubService.js';
import { formatRelative } from '@/utils/date.js';
import { safeUrl } from '@/utils/content.js';
import { deriveDashboard } from '../githubData.js';
import { useGithubData } from '../useGithubData.js';
import { useLanguage } from '@/i18n';
import ContributionsCard from './ContributionsCard.jsx';
import GithubStats from './GithubStats.jsx';
import LanguageBreakdown from './LanguageBreakdown.jsx';
import RepoCard from './RepoCard.jsx';
import GithubSkeleton from './GithubSkeleton.jsx';

const pillToggleSx = {
  gap: 1,
  flexWrap: 'wrap',
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '999px !important',
    ml: '0 !important',
    px: 2,
    py: 0.75,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 14,
    color: 'text.secondary',
  },
  '& .Mui-selected': {
    color: 'primary.main !important',
    borderColor: 'primary.main !important',
    backgroundColor: 'var(--mui-palette-surfaces-primarySoft) !important',
  },
};

const VISIBLE_REPOS = 6;

const clockTime = (date) =>
  date?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

function describeError(error, lang) {
  if (error instanceof GithubRateLimitError) {
    const at = clockTime(error.resetAt);
    return lang === 'ar'
      ? `يحدد GitHub عدد الطلبات المجانية بـ 60 طلباً في الساعة، وتم الوصول لهذا الحد مؤقتاً${at ? ` — سيتم إعادة التعيين حوالي الساعة ${at}` : ''}.`
      : `GitHub limits anonymous visitors to 60 requests an hour, and that limit was reached${
          at ? ` — it resets around ${at}` : ''
        }.`;
  }
  return lang === 'ar'
    ? 'تعذر الاتصال بـ GitHub في الوقت الحالي.'
    : 'GitHub could not be reached right now.';
}

function ErrorState({ error, onRetry, retrying }) {
  const { lang, t } = useLanguage();

  return (
    <Card sx={{ textAlign: 'center', py: { xs: 6, md: 8 }, maxWidth: 640, mx: 'auto' }}>
      <GitHubIcon sx={{ fontSize: 44, color: 'text.disabled' }} />
      <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
        {t('github.errorTitle', 'Couldn’t load GitHub data')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5, mb: 4 }} role="alert">
        {describeError(error, lang)}{' '}
        {lang === 'ar' ? 'المستودعات البرمجية متوفرة على ملفي الشخصي.' : 'The repositories are all still on my profile.'}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
        {!(error instanceof GithubRateLimitError) && (
          <Button variant="outlined" startIcon={<RefreshRoundedIcon />} onClick={onRetry} disabled={retrying}>
            {retrying ? (lang === 'ar' ? 'جاري المحاولة…' : 'Trying…') : t('github.tryAgain', 'Try again')}
          </Button>
        )}
        <Button
          variant="contained"
          href={PROFILE.links.github}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
        >
          {t('github.openProfile', 'Open my GitHub')}
        </Button>
      </Box>
    </Card>
  );
}

export default function GithubDashboard() {
  const { lang, t } = useLanguage();
  // Wait until the section is near the screen before spending a request.
  const [ref, near] = useNearViewport('300px');
  const { data, error, refetch, isFetching } = useGithubData({ enabled: near });
  const [view, setView] = useState('featured');
  const [expanded, setExpanded] = useState(false);

  const dashboard = useMemo(() => (data ? deriveDashboard(data) : null), [data]);
  const profileUrl = safeUrl(dashboard?.profileUrl) ?? PROFILE.links.github;

  const repos = dashboard ? (view === 'featured' ? dashboard.featured : dashboard.recent) : [];
  const shown = expanded ? repos : repos.slice(0, VISIBLE_REPOS);

  return (
    <Section
      id="github"
      title={t('github.title', 'GitHub Activity')}
      subtitle={t(
        'github.subtitle',
        'Live from the GitHub API — the code behind the projects above, and what I have been working on lately.',
      )}
    >
      <Box ref={ref}>
        {/* Independent of the repo data: the graph loads (and can fail) on its own. */}
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <ContributionsCard
              enabled={near}
              createdYear={dashboard ? new Date(data.user.createdAt).getFullYear() : undefined}
            />
          </Box>
        </Reveal>

        {!dashboard && !error && <GithubSkeleton />}

        {!dashboard && error && <ErrorState error={error} onRetry={refetch} retrying={isFetching} />}

        {dashboard && (
          <>
            {data.stale && (
              <Alert severity="info" sx={{ mb: 3 }}>
                {data.staleReason instanceof GithubRateLimitError
                  ? 'GitHub’s rate limit was reached, so this is saved data'
                  : 'GitHub could not be reached, so this is saved data'}
                {data.fetchedAt ? ` from ${formatRelative(data.fetchedAt)}` : ''}.
              </Alert>
            )}

            <Reveal>
              <Box
                sx={{
                  display: 'grid',
                  gap: { xs: 3, md: 4 },
                  gridTemplateColumns: { xs: '1fr', lg: '0.95fr 1.05fr' },
                  alignItems: 'stretch',
                }}
              >
                <GithubStats stats={dashboard.stats} />
                <LanguageBreakdown languages={dashboard.languages} />
              </Box>
            </Reveal>

            <Box
              sx={{
                mt: { xs: 5, md: 7 },
                mb: { xs: 3, md: 4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_, v) => {
                  if (!v) return;
                  setView(v);
                  setExpanded(false);
                }}
                aria-label="Which repositories to show"
                sx={pillToggleSx}
              >
                <ToggleButton value="featured">
                  {t('github.portfolioProjects', 'Portfolio projects')} · {dashboard.featured.length}
                </ToggleButton>
                <ToggleButton value="recent">{t('github.recentActivity', 'Recent activity')}</ToggleButton>
              </ToggleButtonGroup>

              <Button
                href={`${profileUrl}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                endIcon={<OpenInNewRoundedIcon sx={{ transform: lang === 'ar' ? 'scaleX(-1)' : 'none' }} />}
              >
                {lang === 'ar'
                  ? `جميع المستودعات (${dashboard.stats.publicRepos})`
                  : `All ${dashboard.stats.publicRepos} repositories`}
              </Button>
            </Box>

            {repos.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'text.secondary', py: 6, textAlign: 'center' }}>
                {t('github.nothingToShow', 'Nothing to show here yet.')}
              </Typography>
            ) : (
              <Box
                key={view}
                sx={{
                  display: 'grid',
                  gap: { xs: 3, md: 4 },
                  gridTemplateColumns: {
                    xs: 'minmax(0, 1fr)',
                    md: 'repeat(2, minmax(0, 1fr))',
                    lg: 'repeat(3, minmax(0, 1fr))',
                  },
                }}
              >
                {shown.map((repo, i) => (
                  <Reveal key={repo.id} delay={(i % 3) * 0.06} sx={{ height: '100%' }}>
                    <RepoCard repo={repo} />
                  </Reveal>
                ))}
              </Box>
            )}

            {repos.length > VISIBLE_REPOS && (
              <Box sx={{ mt: { xs: 4, md: 5 }, display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" size="large" onClick={() => setExpanded((e) => !e)}>
                  {expanded
                    ? t('github.showLess', 'Show less')
                    : lang === 'ar'
                    ? `عرض الكل (${repos.length})`
                    : `Show all ${repos.length}`}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Section>
  );
}
