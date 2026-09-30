import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import { SERVICES } from '@/data/services.js';
import { Section, Reveal, Card, IconTile } from '@/shared/components/ui';

const ICONS = {
  public: PublicRoundedIcon,
  dns: DnsOutlinedIcon,
  analytics: InsightsRoundedIcon,
  view_in_ar: ViewInArRoundedIcon,
  smart_toy: SmartToyOutlinedIcon,
  cloud: CloudQueueRoundedIcon,
};

import { useLanguage } from '@/i18n';

export default function Services() {
  const { t } = useLanguage();

  return (
    <Section
      id="services"
      alt
      title={t('services.title', 'Services')}
      subtitle={t(
        'services.subtitle',
        'What I can build for you — from a field-survey form to a cloud-deployed WebGIS platform.',
      )}
    >
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {SERVICES.map((service, i) => (
          <Reveal key={service.key} delay={(i % 3) * 0.06} sx={{ height: '100%' }}>
            <Card interactive>
              <IconTile icon={ICONS[service.icon] ?? PublicRoundedIcon} />
              <Typography variant="h3" component="h3" sx={{ fontSize: 20, mt: 3, mb: 1.5 }}>
                {t(`services.${service.key}.title`, service.title)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {t(`services.${service.key}.desc`, service.description)}
              </Typography>
            </Card>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
