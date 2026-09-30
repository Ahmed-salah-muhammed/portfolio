import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Card, IconTile } from '@/shared/components/ui';
import { safeUrl } from '@/utils/content.js';

import { useLanguage } from '@/i18n';

// Ahmed is the second author ("Salah, A."); bold his name without touching the data.
function AuthorLine({ authors }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {authors.split(/(Salah, A\.)/g).map((part, i) =>
        part === 'Salah, A.' ? (
          <Box key={i} component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
            {part}
          </Box>
        ) : (
          part
        ),
      )}
    </Typography>
  );
}

export default function PublicationCard({ publication }) {
  const { lang, t } = useLanguage();
  const doi = safeUrl(publication.url);
  const title = lang === 'ar' && publication.titleAr ? publication.titleAr : publication.title;
  const summary = lang === 'ar' && publication.summaryAr ? publication.summaryAr : publication.summary;
  const venue = lang === 'ar' && publication.venueAr ? publication.venueAr : publication.venue;

  return (
    <Card sx={{ p: { xs: 2.5, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <IconTile icon={ArticleOutlinedIcon} size={46} />
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            {t('credentials.paperBadge', 'Peer-reviewed publication')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {venue} · {publication.year}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" component="h3" sx={{ mb: 1.5 }}>
        {title}
      </Typography>

      <AuthorLine authors={publication.authors} />

      {summary && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5, lineHeight: 1.7 }}>
          {summary}
        </Typography>
      )}

      {/* Only once a real DOI/journal link exists in the data. */}
      {doi && (
        <Button href={doi} target="_blank" rel="noopener noreferrer" variant="outlined" sx={{ mt: 2.5 }}>
          {t('credentials.readPaper', 'Read publication')}
        </Button>
      )}
    </Card>
  );
}
