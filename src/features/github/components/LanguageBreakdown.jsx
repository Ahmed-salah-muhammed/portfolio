import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Card, ErrorBoundary } from '@/shared/components/ui';
import { useLanguage } from '@/i18n';

const LanguageChart = lazy(() => import('./LanguageChart.jsx'));

export default function LanguageBreakdown({ languages }) {
  const { lang, t } = useLanguage();
  const { slices, total } = languages;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h3">
        {t('github.languagesTitle', 'Languages')}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, mb: 2.5 }}>
        {lang === 'ar'
          ? `حسب اللغة الأساسية في ${total} مستودعاً برمجياً`
          : `By primary language, across ${total} repositories that have one`}
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: 'grid',
          alignItems: 'center',
          gap: { xs: 3, sm: 4 },
          gridTemplateColumns: { xs: '1fr', sm: 'minmax(180px, 220px) 1fr' },
        }}
      >
        <Box sx={{ height: 220, mx: { xs: 'auto', sm: 0 }, width: '100%', maxWidth: 260 }}>
          <ErrorBoundary name="language-chart" fallback={<span />}>
            <Suspense fallback={<Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto' }} />}>
              <LanguageChart slices={slices} total={total} />
            </Suspense>
          </ErrorBoundary>
        </Box>

        {/* Doubles as the chart's text alternative. */}
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {slices.map((slice) => (
            <Box component="li" key={slice.name}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box
                  aria-hidden
                  sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: slice.color }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', flex: 1 }}>
                  {slice.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {slice.count} · {slice.percent}%
                </Typography>
              </Box>
              <Box
                aria-hidden
                sx={{ height: 4, borderRadius: 2, backgroundColor: 'var(--mui-palette-surfaces-muted)' }}
              >
                <Box
                  sx={{ height: '100%', width: `${slice.percent}%`, borderRadius: 2, backgroundColor: slice.color }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
