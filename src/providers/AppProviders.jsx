import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '@/store';
import theme from '@/theme';
import { LanguageProvider } from '@/i18n';

// GitHub data (phase 5) is cached for an hour and never refetched on focus —
// the API is rate-limited for unauthenticated callers.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <InitColorSchemeScript attribute="data-mui-color-scheme" defaultMode="system" />
        <ThemeProvider theme={theme} defaultMode="system" modeStorageKey="as-portfolio-mode">
          <CssBaseline enableColorScheme />
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
