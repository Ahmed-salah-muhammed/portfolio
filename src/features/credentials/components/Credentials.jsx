import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { PROFILE, PUBLICATIONS } from '@/data/profile.js';
import { getOtherCertifications } from '@/data/certificates.js';
import { Section, Reveal, Card, Tag } from '@/shared/components/ui';
import { safeUrl, safeText } from '@/utils/content.js';
import { formatMonth } from '@/utils/date.js';
import { useLanguage } from '@/i18n';
import PublicationCard from './PublicationCard.jsx';
import CertificateCarousel from './CertificateCarousel.jsx';

/**
 * Credentials from profile.js that have no scanned certificate to show in the carousel.
 * Grouped by issuer + month, so five Esri courses from the same month read as one line of
 * chips instead of five tall rows.
 */
function OtherCertifications() {
  const { t } = useLanguage();
  const others = getOtherCertifications();
  if (others.length === 0) return null;

  const groups = [];
  others.forEach((cert) => {
    const meta = [safeText(cert.issuer), formatMonth(cert.date)].filter(Boolean).join(' · ');
    const group = groups.find((g) => g.meta === meta);
    if (group) group.titles.push(cert.title);
    else groups.push({ meta, titles: [cert.title] });
  });

  return (
    <Card sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
        {t('credentials.alsoCertified', 'Also certified')}
      </Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {groups.map((group) => (
          <Box key={group.meta}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {group.meta}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.75 }}>
              {group.titles.map((title) => (
                <Tag key={title} sx={{ whiteSpace: 'normal' }}>
                  {title}
                </Tag>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default function Credentials() {
  const { t } = useLanguage();
  const certificatesUrl = safeUrl(PROFILE.links.certificates);
  const publication = PUBLICATIONS[0];

  return (
    <Section
      id="credentials"
      title={t('credentials.title', 'Certifications & Publications')}
      subtitle={t(
        'credentials.subtitle',
        'AWS certified, a peer-reviewed paper, and continuous training across cloud, GIS, development and AI.',
      )}
    >
      <Reveal>
        <CertificateCarousel />
      </Reveal>

      {/* alignItems: start — each card keeps its own height instead of stretching to the taller one. */}
      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          display: 'grid',
          gap: { xs: 3, md: 4 },
          alignItems: 'start',
          gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
        }}
      >
        {publication && (
          <Reveal>
            <PublicationCard publication={publication} />
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <OtherCertifications />
        </Reveal>
      </Box>

      {certificatesUrl && (
        <Reveal sx={{ mt: { xs: 4, md: 5 }, display: 'flex', justifyContent: 'center' }}>
          <Button
            href={certificatesUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="large"
            endIcon={<OpenInNewRoundedIcon />}
          >
            {t('credentials.viewAll', 'View all certificates')}
          </Button>
        </Reveal>
      )}
    </Section>
  );
}
