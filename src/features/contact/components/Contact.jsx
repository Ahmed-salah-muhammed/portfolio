import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { PROFILE } from '@/data/profile.js';
import { Section, Reveal, Card, IconTile, SocialLinks } from '@/shared/components/ui';
import ContactForm from './ContactForm.jsx';
import ContactMapCard from './ContactMapCard.jsx';
import { useLanguage } from '@/i18n';

function WhatsAppRow({ phone, phoneIntl }) {
  const { lang, isRTL } = useLanguage();
  const cleanPhone = (phoneIntl ?? phone).replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً أحمد، اطلعت على معرض أعمالك وأود مناقشة مشروع معك.'
      : 'Hello Ahmed, I saw your portfolio and would like to discuss a project.'
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
        gap: 1.5,
        p: 1.5,
        borderRadius: '12px',
        textDecoration: 'none',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(37, 211, 102, 0.08)' : 'rgba(37, 211, 102, 0.06)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(37, 211, 102, 0.28)' : 'rgba(37, 211, 102, 0.32)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(37, 211, 102, 0.16)' : 'rgba(37, 211, 102, 0.12)',
          borderColor: '#25D366',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 18px rgba(37, 211, 102, 0.18)',
          '& .wa-btn': {
            backgroundColor: '#25D366',
            color: '#ffffff',
          },
          '& .wa-arrow': {
            transform: isRTL ? 'translateX(-3px) rotate(180deg)' : 'translateX(3px)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'rgba(37, 211, 102, 0.16)',
            color: '#25D366',
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 24 }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.25,
              fontSize: '0.88rem',
            }}
          >
            {lang === 'ar' ? 'محادثة عبر واتساب' : 'Chat on WhatsApp'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              mt: 0.25,
              fontWeight: 500,
              overflowWrap: 'anywhere',
            }}
          >
            {lang === 'ar' ? 'مراسلة مباشرة' : 'Direct messaging'} · {phone}
          </Typography>
        </Box>
      </Box>

      <Box
        className="wa-btn"
        sx={{
          flexShrink: 0,
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.5,
          py: 0.6,
          borderRadius: 999,
          backgroundColor: 'rgba(37, 211, 102, 0.14)',
          color: '#25D366',
          fontWeight: 700,
          fontSize: '0.78rem',
          letterSpacing: '0.01em',
          transition: 'all 0.25s ease',
        }}
      >
        <span>{lang === 'ar' ? 'محادثة فورية' : 'Open Chat'}</span>
        <ArrowForwardRoundedIcon
          className="wa-arrow"
          sx={{
            fontSize: '1rem',
            transform: isRTL ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease',
          }}
        />
      </Box>
    </Box>
  );
}

function ContactRow({ icon, label, value, href, iconSx }) {
  if (!value) return null;

  const content = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconTile icon={icon} size={44} sx={iconSx} />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            overflowWrap: 'anywhere',
            transition: 'color .2s ease',
          }}
        >
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
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'block',
        borderRadius: 2,
        textDecoration: 'none',
        '&:hover .MuiTypography-body2': { color: 'primary.main' },
      }}
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
