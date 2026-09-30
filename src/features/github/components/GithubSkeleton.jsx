import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Card } from '@/shared/components/ui';

// Same grid as the loaded dashboard, so nothing jumps when the data arrives.
export default function GithubSkeleton() {
  return (
    <Box role="status" aria-label="Loading GitHub data" aria-busy="true">
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: { xs: '1fr', lg: '0.95fr 1.05fr' },
        }}
      >
        <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 }, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          {[0, 1, 2, 3].map((i) => (
            <Card key={i} sx={{ p: { xs: 2.5, md: 3 } }}>
              <Skeleton variant="rounded" width={40} height={40} />
              <Skeleton variant="text" width="55%" height={40} sx={{ mt: 2 }} />
              <Skeleton variant="text" width="80%" />
            </Card>
          ))}
        </Box>
        <Card>
          <Skeleton variant="text" width={120} height={28} />
          <Box sx={{ display: 'flex', gap: 4, mt: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <Skeleton variant="circular" width={190} height={190} />
            <Box sx={{ flex: 1, minWidth: 160 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="text" height={28} />
              ))}
            </Box>
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          mt: { xs: 5, md: 6 },
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {[0, 1, 2].map((i) => (
          <Card key={i}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" height={34} sx={{ mt: 1 }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="85%" />
            <Skeleton variant="rounded" width={120} height={40} sx={{ mt: 3 }} />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
