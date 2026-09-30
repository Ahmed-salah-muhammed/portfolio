import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SKILLS } from '@/data/profile.js';
import { Section, Reveal, Card } from '@/shared/components/ui';
import { useLanguage } from '@/i18n';
import SkillTile from './SkillTile.jsx';

// The two big groups get the full width; the smaller ones share a row.
const WIDE = new Set(['Development', 'GIS & Geospatial']);

const CATEGORY_MAP = {
  Development: 'skills.cat.development',
  'GIS & Geospatial': 'skills.cat.gis',
  'Cloud (AWS)': 'skills.cat.cloud',
  'AI & Automation': 'skills.cat.ai',
  Foundations: 'skills.cat.foundations',
};

function SkillGroup({ group }) {
  const { t } = useLanguage();
  const categoryTitle = t(CATEGORY_MAP[group.category] ?? group.category, group.category);

  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: { xs: 3, md: 4 } }}>
        <Typography variant="h3" component="h3">
          {categoryTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {group.items.length}
        </Typography>
      </Box>

      <Box
        role="list"
        sx={{
          display: 'grid',
          gap: { xs: 2.5, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(auto-fill, minmax(84px, 1fr))',
            md: 'repeat(auto-fill, minmax(104px, 1fr))',
          },
        }}
      >
        {group.items.map((item) => (
          <SkillTile key={item} name={item} />
        ))}
      </Box>
    </Card>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const wide = SKILLS.filter((g) => WIDE.has(g.category));
  const rest = SKILLS.filter((g) => !WIDE.has(g.category));

  return (
    <Section
      id="skills"
      title={t('skills.title', 'Skills')}
      subtitle={t(
        'skills.subtitle',
        'Full-stack first, GIS as the specialism — the languages, frameworks, Esri apps and cloud tools I work with.',
      )}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
        {wide.map((group) => (
          <Reveal key={group.category}>
            <SkillGroup group={group} />
          </Reveal>
        ))}

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' },
          }}
        >
          {rest.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06} sx={{ height: '100%' }}>
              <SkillGroup group={group} />
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
