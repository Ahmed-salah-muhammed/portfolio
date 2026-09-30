import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export default function SectionSkeleton({ height = 360 }) {
  return (
    <Container sx={{ py: 10 }}>
      <Skeleton variant="text" width={180} height={24} />
      <Skeleton variant="text" width="60%" height={52} sx={{ mt: 1 }} />
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="rounded" height={height} />
      </Box>
    </Container>
  );
}
