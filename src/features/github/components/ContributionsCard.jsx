import { lazy, Suspense, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { PROFILE } from '@/data/profile.js';
import { Card, ErrorBoundary } from '@/shared/components/ui';
import { safeUrl } from '@/utils/content.js';
import { useLanguage } from '@/i18n';
import { useActivityBreakdown, useContributions } from '../useContributions.js';
import ContributionCalendar from './ContributionCalendar.jsx';

const ActivityRadar = lazy(() => import('./ActivityRadar.jsx'));

const GREEN = '#2ea043';
// GitHub's order: code review on top, then clockwise issues, pull requests, commits.
const AXES = [
  ['Code review', 'reviews'],
  ['Issues', 'issues'],
  ['Pull requests', 'pullRequests'],
  ['Commits', 'commits'],
];
// Most-contributed types first in the list beside the radar.
const LIST_ORDER = ['commits', 'pullRequests', 'issues', 'reviews'];
const LIST_LABEL = { commits: 'Commits', pullRequests: 'Pull requests', issues: 'Issues', reviews: 'Code review' };

const formatNumber = (n) => n.toLocaleString('en-US');
const shortDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Active days, the longest run of consecutive active days, and the single busiest day. */
function summarize(days) {
  let active = 0;
  let run = 0;
  let streak = 0;
  let busiest = null;
  days.forEach((day) => {
    if (day.count > 0) {
      active += 1;
      run += 1;
      streak = Math.max(streak, run);
    } else {
      run = 0;
    }
    if (!busiest || day.count > busiest.count) busiest = day;
  });
  return { active, streak, busiest: busiest?.count > 0 ? busiest : null };
}

function toShares(breakdown) {
  const total = AXES.reduce((sum, [, key]) => sum + breakdown[key], 0);
  return AXES.map(([axis, key]) => ({
    axis,
    key,
    count: breakdown[key],
    percent: total ? Math.round((breakdown[key] / total) * 100) : 0,
  }));
}

function Stat({ value, label }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, lineHeight: 1.2, color: 'text.primary' }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Box>
  );
}

function ActivityOverview({ shares, period }) {
  const { lang, t } = useLanguage();
  const byKey = Object.fromEntries(shares.map((s) => [s.key, s]));

  const listLabels = {
    commits: t('github.commits', 'Commits'),
    pullRequests: t('github.pullRequests', 'Pull requests'),
    issues: t('github.issues', 'Issues'),
    reviews: t('github.review', 'Code review'),
  };

  return (
    <Box
      sx={{
        mt: 3,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'grid',
        gap: { xs: 2, md: 4 },
        alignItems: 'center',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
      }}
    >
      <Box>
        <Typography variant="h4" component="h4">
          {t('github.activityOverview', 'Activity overview')}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5, mb: 2 }}>
          {lang === 'ar'
            ? `نسبة مساهماتي حسب النوع، ${period === 'the last year' ? 'خلال العام الماضي' : `في عام ${period}`}`
            : `Share of my contributions by type, ${period === 'the last year' ? 'over the last year' : `in ${period}`}`}
        </Typography>

        {/* Also the radar's text alternative. */}
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1.5 }}>
          {LIST_ORDER.map((key) => (
            <Box component="li" key={key}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', flex: 1 }}>
                  {listLabels[key]}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {formatNumber(byKey[key].count)} · {byKey[key].percent}%
                </Typography>
              </Box>
              <Box aria-hidden sx={{ height: 4, borderRadius: 2, backgroundColor: 'var(--mui-palette-surfaces-muted)' }}>
                <Box sx={{ height: '100%', width: `${byKey[key].percent}%`, borderRadius: 2, backgroundColor: GREEN }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ height: { xs: 260, md: 310 } }}>
        <ErrorBoundary name="activity-radar" fallback={<span />}>
          <Suspense fallback={<Skeleton variant="rounded" height="100%" />}>
            <ActivityRadar shares={shares} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

function YearPills({ years, selected, onSelect, thisYear }) {
  return (
    <Box
      role="group"
      aria-label="Choose a year"
      sx={{ display: 'flex', flexDirection: { xs: 'row', lg: 'column' }, flexWrap: 'wrap', gap: 1 }}
    >
      {years.map((year) => {
        const key = year === thisYear ? 'last' : String(year);
        const active = selected === key;
        return (
          <Button
            key={year}
            size="small"
            variant={active ? 'contained' : 'text'}
            aria-pressed={active}
            onClick={() => onSelect(key)}
            sx={{
              justifyContent: { lg: 'flex-start' },
              px: 2,
              borderRadius: '10px',
              fontWeight: 600,
              ...(!active && { color: 'text.secondary' }),
            }}
          >
            {year}
          </Button>
        );
      })}
    </Box>
  );
}

function CalendarSkeleton() {
  return (
    <Box role="status" aria-label="Loading contributions" aria-busy="true">
      <Skeleton variant="text" width={280} height={32} />
      <Card sx={{ mt: 2, p: { xs: 2, md: 3 } }}>
        <Skeleton variant="rounded" height={170} />
      </Card>
    </Box>
  );
}

/**
 * GitHub-style contributions: the year-long heatmap with a year selector and, when the
 * activity function is configured, the "activity overview" radar. Independent of the repo
 * data below it, so a failure of either never affects the other.
 */
export default function ContributionsCard({ enabled, createdYear }) {
  const { lang, t } = useLanguage();
  const thisYear = new Date().getFullYear();
  const [selected, setSelected] = useState('last');

  const calendar = useContributions({ enabled, year: selected });
  const breakdown = useActivityBreakdown({ enabled: enabled && Boolean(calendar.data), year: selected });

  const years = useMemo(() => {
    const first = Math.max(createdYear ?? thisYear - 3, thisYear - 7);
    return Array.from({ length: thisYear - first + 1 }, (_, i) => thisYear - i);
  }, [createdYear, thisYear]);

  const data = calendar.data;
  const stats = useMemo(() => (data ? summarize(data.days) : null), [data]);
  const shares = breakdown.data ? toShares(breakdown.data) : null;
  const showOverview = Boolean(shares?.some((s) => s.count > 0));
  const period = selected === 'last' ? 'the last year' : selected;
  const profileUrl = safeUrl(PROFILE.links.github);

  let main;
  if (!data && calendar.isError) {
    main = (
      <Card sx={{ textAlign: 'center', py: { xs: 4, md: 5 } }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }} role="alert">
          The contribution graph isn&rsquo;t available right now.
        </Typography>
        {profileUrl && (
          <Button href={profileUrl} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<GitHubIcon />}>
            See it on GitHub
          </Button>
        )}
      </Card>
    );
  } else if (!data) {
    main = <CalendarSkeleton />;
  } else {
    main = (
      <>
        <Typography variant="h4" component="h3" sx={{ mb: 2 }} aria-live="polite">
          {lang === 'ar'
            ? `${formatNumber(data.total)} مساهمة ${period === 'the last year' ? 'خلال العام الماضي' : `في عام ${period}`}`
            : `${formatNumber(data.total)} contributions in ${period}`}
        </Typography>
        <Card sx={{ p: { xs: 2, md: 3 }, opacity: calendar.isPlaceholderData ? 0.55 : 1, transition: 'opacity .2s' }}>
          <ContributionCalendar
            days={data.days}
            label={
              lang === 'ar'
                ? `تقويم المساهمات البرمجية: ${formatNumber(data.total)} مساهمة في ${period}`
                : `Contribution calendar: ${formatNumber(data.total)} contributions in ${period}`
            }
          />

          <Box
            sx={{
              mt: 2.5,
              pt: 2.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            }}
          >
            <Stat value={formatNumber(stats.active)} label={t('github.activeDays', 'Active days')} />
            <Stat
              value={
                lang === 'ar'
                  ? `${formatNumber(stats.streak)} ${stats.streak === 1 ? 'يوم' : 'أيام'}`
                  : `${formatNumber(stats.streak)} ${stats.streak === 1 ? 'day' : 'days'}`
              }
              label={t('github.longestStreak', 'Longest streak')}
            />
            <Stat
              value={stats.busiest ? formatNumber(stats.busiest.count) : '—'}
              label={
                stats.busiest
                  ? `${t('github.busiestDay', 'Busiest day')} · ${shortDate(stats.busiest.date)}`
                  : t('github.busiestDay', 'Busiest day')
              }
            />
          </Box>

          {showOverview && <ActivityOverview shares={shares} period={period} />}
        </Card>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, lg: 4 },
        alignItems: 'start',
        gridTemplateAreas: { xs: '"years" "main"', lg: '"main years"' },
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 112px' },
      }}
    >
      <Box sx={{ gridArea: 'main', minWidth: 0 }}>{main}</Box>
      <Box sx={{ gridArea: 'years' }}>
        <YearPills years={years} selected={selected} onSelect={setSelected} thisYear={thisYear} />
      </Box>
    </Box>
  );
}
