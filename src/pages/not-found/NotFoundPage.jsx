import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '@/i18n';

export default function NotFoundPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'ar'
        ? 'الصفحة غير موجودة — أحمد صلاح محمد'
        : 'Page not found — Ahmed Salah Muhammed';
  }, [lang]);

  return (
    <Container sx={{ py: { xs: 14, md: 20 }, textAlign: 'center' }}>
      <Typography
        sx={{
          fontFamily: (tTheme) => tTheme.tokens.FONTS.display,
          fontWeight: 800,
          fontSize: { xs: 80, md: 120 },
          lineHeight: 1,
          color: 'text.disabled',
        }}
      >
        404
      </Typography>
      <Typography variant="h2" component="h1" sx={{ mt: 2 }}>
        {t('notfound.title', 'Page not found')}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, mb: 5 }}>
        {t('notfound.desc', 'The page you are looking for does not exist or has moved.')}
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" size="large">
        {t('notfound.backHome', 'Back home')}
      </Button>
    </Container>
  );
}
