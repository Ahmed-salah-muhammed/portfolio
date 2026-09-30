import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import { EXPERIENCE } from '@/data/profile.js';
import { Section, Card, CenterTimeline, TimelineNode } from '@/shared/components/ui';
import { formatRange } from '@/utils/date.js';
import { useLanguage } from '@/i18n';

function DateBadge({ start, end, lang }) {
  const range = formatRange(start, end, lang);
  if (!range) return null;
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: 'primary.main',
        backgroundColor: 'var(--mui-palette-surfaces-primarySoft)',
      }}
    >
      {range}
    </Box>
  );
}

function ExperienceCard({ job }) {
  const { lang, t } = useLanguage();
  const role = lang === 'ar' ? t(`experience.${job.id}.role`, job.role) : job.role;
  const company = lang === 'ar' ? t(`experience.${job.id}.company`, job.company) : job.company;
  const type = lang === 'ar' ? t(`experience.${job.id}.type`, job.type) : job.type;
  const location = lang === 'ar' ? t(`experience.${job.id}.location`, job.location) : job.location;

  const highlights =
    lang === 'ar'
      ? job.highlights.map((h, idx) => t(`experience.${job.id}.h${idx + 1}`, h))
      : job.highlights;

  return (
    <Card>
      <DateBadge start={job.start} end={job.end} lang={lang} />

      <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
        {role}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.primary', mt: 0.5 }}>
        {company}
      </Typography>

      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 3 }, flexWrap: 'wrap', mt: 1, color: 'text.secondary' }}>
        {type && <Typography variant="body2">{type}</Typography>}
        {location && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <PlaceOutlinedIcon sx={{ fontSize: 18, flexShrink: 0 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        )}
      </Box>

      {highlights?.length > 0 && (
        <Box
          component="ul"
          sx={{
            mt: 2.5,
            mb: 0,
            paddingInlineStart: '22px',
            paddingInlineEnd: 0,
            marginInlineStart: 0,
            marginInlineEnd: 0,
            color: 'text.secondary',
            listStylePosition: 'outside',
            '& li::marker': { color: 'var(--mui-palette-surfaces-borderStrong)' },
          }}
        >
          {highlights.map((h) => (
            <Typography
              component="li"
              variant="body2"
              key={h}
              sx={{
                mb: 1,
                paddingInlineStart: '4px',
                lineHeight: 1.6,
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section
      id="experience"
      alt
      title={t('experience.title', 'Experience')}
      subtitle={t(
        'experience.subtitle',
        'Enterprise GIS on national-scale Saudi projects, and GIS & remote sensing for planning and environmental studies.',
      )}
    >
      <CenterTimeline
        items={EXPERIENCE}
        getKey={(job) => job.id}
        dense
        renderNode={() => (
          <TimelineNode>
            <WorkOutlineRoundedIcon sx={{ fontSize: 20 }} />
          </TimelineNode>
        )}
        renderItem={(job) => <ExperienceCard job={job} />}
      />
    </Section>
  );
}
