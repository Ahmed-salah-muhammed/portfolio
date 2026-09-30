import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { EDUCATION } from '@/data/profile.js';
import { Section, Card, CenterTimeline, TimelineNode } from '@/shared/components/ui';
import { formatRange } from '@/utils/date.js';
import { safeText } from '@/utils/content.js';
import { useLanguage } from '@/i18n';

const TILE = 84; // every logo tile is the same height, so crests and wordmarks line up

/**
 * One logo on a white tile (full-colour crests stay legible in dark mode). The image is
 * contained inside a fixed inner box, so a tall crest and a wide wordmark end up at the
 * same visual weight instead of each filling the tile differently.
 */
function LogoTile({ src, alt }) {
  const wide = /furp/i.test(src);
  return (
    <Box
      sx={{
        height: TILE,
        width: wide ? TILE * 1.9 : TILE,
        flexShrink: 0,
        borderRadius: '18px',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#ffffff',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{
          height: wide ? TILE * 0.46 : TILE * 0.68,
          width: 'auto',
          maxWidth: '82%',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
}

function EducationCard({ entry }) {
  const { lang, t } = useLanguage();
  const range = formatRange(entry.start, entry.end, lang);
  const isIti = entry.id === 'iti';

  const degree = lang === 'ar' ? t(`education.${entry.id}.degree`, entry.degree) : entry.degree;
  const institution =
    lang === 'ar'
      ? isIti
        ? 'معهد تكنولوجيا المعلومات (ITI)'
        : 'جامعة القاهرة — كلية التخطيط الإقليمي والعمراني'
      : entry.institution;
  const department =
    lang === 'ar' ? t(`education.${entry.id}.dept`, safeText(entry.department)) : safeText(entry.department);
  const location =
    lang === 'ar' ? (isIti ? 'القرية الذكية، الجيزة' : 'الجيزة، مصر') : entry.location;
  const description =
    lang === 'ar' ? t(`education.${entry.id}.desc`, safeText(entry.description)) : safeText(entry.description);

  const highlights =
    lang === 'ar'
      ? isIti
        ? [t('education.iti.h1', 'المعدل التراكمي (امتياز A+)'), t('education.iti.h2', 'مشروع التخرج: امتياز مرتفع (A+)')]
        : [
            t('education.cu.h1', 'معدل تراكمي 3.01 / 4.0 (جيد جداً)'),
            t('education.cu.h2', 'الترتيب: الخامس على الدفعة'),
            t('education.cu.h3', 'مشروع التخرج: امتياز (A−)'),
          ]
      : entry.highlights ?? [];

  const logos = entry.logos ?? [];

  return (
    <Card>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
        {logos.length > 0 ? (
          logos.map((logo) => <LogoTile key={logo.src} src={logo.src} alt={logo.alt} />)
        ) : (
          <Box
            sx={{
              width: TILE,
              height: TILE,
              borderRadius: '18px',
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              backgroundColor: 'var(--mui-palette-surfaces-primarySoft)',
            }}
          >
            <SchoolOutlinedIcon />
          </Box>
        )}
      </Box>

      {range && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            mt: 3,
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            color: 'primary.main',
            backgroundColor: 'var(--mui-palette-surfaces-primarySoft)',
          }}
        >
          {range}
        </Box>
      )}

      <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
        {degree}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.primary', mt: 0.5 }}>
        {institution}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1, sm: 3 },
          flexWrap: 'wrap',
          mt: 1,
          color: 'text.secondary',
        }}
      >
        {department && <Typography variant="body2">{department}</Typography>}
        {location && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <PlaceOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        )}
      </Box>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2.5, lineHeight: 1.7 }}>
          {description}
        </Typography>
      )}

      {highlights.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 3 }}>
          {highlights.map((h) => (
            <Box
              key={h}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.75,
                borderRadius: (tTheme) => `${tTheme.tokens.RADIUS.sm}px`,
                fontSize: 13.5,
                fontWeight: 600,
                color: 'text.primary',
                backgroundColor: 'var(--mui-palette-surfaces-muted)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <EmojiEventsOutlinedIcon sx={{ fontSize: 17, color: 'warning.main' }} />
              {h}
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default function Education() {
  const { t } = useLanguage();

  return (
    <Section
      id="education"
      alt
      title={t('education.title', 'Education')}
      subtitle={t(
        'education.subtitle',
        'A planning degree that taught me to read cities spatially, and a professional diploma that made me a developer.',
      )}
    >
      <CenterTimeline
        items={EDUCATION}
        getKey={(entry) => entry.id}
        dense
        renderNode={(entry) => {
          const main = entry.logos?.[0];
          const isIti = entry.id === 'iti';
          return main ? (
            <TimelineNode sx={{ backgroundColor: '#ffffff' }}>
              <Box
                component="img"
                src={main.src}
                alt={main.alt ?? ''}
                sx={{
                  width: isIti ? '62%' : '72%',
                  height: isIti ? '62%' : '72%',
                  objectFit: 'contain',
                }}
              />
            </TimelineNode>
          ) : (
            <TimelineNode>
              <SchoolOutlinedIcon sx={{ fontSize: 20 }} />
            </TimelineNode>
          );
        }}
        renderItem={(entry) => <EducationCard entry={entry} />}
      />
    </Section>
  );
}
