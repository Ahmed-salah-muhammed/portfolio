import { Suspense } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Navbar, { TopBar } from '@/features/navbar';
import Footer from '@/features/footer';
import { Chatbot } from '@/features/chatbot';
import { SectionSkeleton, ScrollTopButton } from '@/shared/components/ui';
import useHashScroll from '@/hooks/useHashScroll.js';

export default function MainLayout() {
  useHashScroll();

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <Navbar />
      <Box component="main" id="main" sx={{ flex: 1 }}>
        <Suspense fallback={<SectionSkeleton />}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
      <ScrollTopButton />
      <Chatbot />
    </Box>
  );
}
