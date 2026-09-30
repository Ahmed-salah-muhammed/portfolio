import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { siWhatsapp } from 'simple-icons';
import { PROFILE } from '@/data/profile.js';
import { Section, Reveal, Card, IconTile, SocialLinks } from '@/shared/components/ui';
import ContactForm from './ContactForm.jsx';
import ContactMapCard from './ContactMapCard.jsx';
import { useLanguage } from '@/i18n';

function WhatsAppRow({ phone, phoneIntl }) {
  const { t } = useLanguage();
  const cleanPhone = (phoneIntl ?? phone).replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Ahmed, I saw your portfolio and would like to discuss a project.'
  )}`;

  return (
    <Box
      component="a"
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: 2,
        textDecoration: 'none',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(37, 211, 102, 0.1)' : 'rgba(37, 211, 102, 0.08)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(37, 211, 102, 0.3)' : 'rgba(37, 211, 102, 0.35)',
        transition: 'all 0.25s ease',
        '&:hover': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(37, 211, 102, 0.2)' : 'rgba(37, 211, 102, 0.16)',
          borderColor: '#25D366',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(37, 211, 102, 0.2)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{ width: 26, height: 26, fill: '#25D366', flexShrink: 0 }}
        >
          <path d={siWhatsapp.path} />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
            {t('contact.whatsappTitle', 'Chat on WhatsApp')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            {t('contact.whatsappSubtitle', 'Direct messaging')} · {phone}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          color: '#25D366',
          px: 1.25,
          py: 0.5,
          borderRadius: 1,
          bgcolor: 'rgba(37, 211, 102, 0.12)',
        }}
      >
        {t('contact.whatsappBtn', 'Open Chat →')}
      </Typography>
    </Box>
  );
}

function ContactRow({ icon, label, value, href }) {
  if (!value) return null;

  const content = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconTile icon={icon} size={44} />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, overflowWrap: 'anywhere' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  if (!href) return content;
  return (
    <Box
      component="a"
      href={href}
      sx={{ display: 'block', borderRadius: 2, '&:hover p': { color: 'primary.main' } }}
    >
      {content}
    </Box>
  );
}

export default function Contact() {
  const { email, phone, phoneIntl } = PROFILE.contact;
  const { t, lang } = useLanguage();

  return (
    <Section
      id="contact"
      alt
      title={t('contact.title', "Let's Talk")}
      subtitle={t(
        'contact.subtitle',
        "I'm always excited to connect — whether it's a WebGIS project, a full-stack build, or an idea you want to make real.",
      )}
    >
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 4, lg: 6 },
          gridTemplateColumns: { xs: '1fr', lg: '0.85fr 1.15fr' },
          // Side by side (lg+) both columns end on the same line: the map grows or the message box does.
          alignItems: { xs: 'start', lg: 'stretch' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Reveal>
            <Card>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <ContactRow
                  icon={EmailOutlinedIcon}
                  label={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  value={email}
                  href={`mailto:${email}`}
                />
                <ContactRow
                  icon={PhoneOutlinedIcon}
                  label={lang === 'ar' ? 'رقم الهاتف' : 'Phone'}
                  value={phone}
                  href={`tel:${phoneIntl ?? phone}`}
                />
                <WhatsAppRow phone={phone} phoneIntl={phoneIntl} />
                <ContactRow
                  icon={PlaceOutlinedIcon}
                  label={lang === 'ar' ? 'الموقع' : 'Based in'}
                  value={lang === 'ar' ? (PROFILE.locationAr ?? 'القرية الذكية، الجيزة، مصر') : PROFILE.location}
                />
              </Box>

              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  {lang === 'ar' ? 'تابعني على المنصات' : 'Find me online'}
                </Typography>
                <Box sx={{ ml: -1 }}>
                  <SocialLinks includeEmail={false} />
                </Box>
              </Box>
            </Card>
          </Reveal>

          <Reveal delay={0.08} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ContactMapCard />
          </Reveal>
        </Box>

        <Reveal delay={0.05} sx={{ height: '100%' }}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" component="h3" sx={{ mb: 0.5 }}>
              {t('contact.sendTitle', 'Send a message')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5 }}>
              {t(
                'contact.sendSubtitle',
                "It lands straight in my inbox — hit reply and I'll answer you directly.",
              )}
            </Typography>
            <ContactForm />
          </Card>
        </Reveal>
      </Box>
    </Section>
  );
}
