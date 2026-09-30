import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { Card, Tag } from '@/shared/components/ui';
import { safeText, safeUrl } from '@/utils/content.js';
import { useLanguage } from '@/i18n';

// Only the actions that actually exist in `links` are rendered.
const ACTIONS = [
  { key: 'live', labelKey: 'project.liveDemo', defaultLabel: 'Live demo', Icon: LaunchRoundedIcon, variant: 'contained' },
  { key: 'code', labelKey: 'project.sourceCode', defaultLabel: 'Source code', Icon: GitHubIcon, variant: 'outlined' },
  { key: 'codeBackend', labelKey: 'project.backendCode', defaultLabel: 'Backend code', Icon: StorageRoundedIcon, variant: 'outlined' },
  { key: 'storymap', labelKey: 'project.storymap', defaultLabel: 'Story map', Icon: MapOutlinedIcon, variant: 'outlined' },
  { key: 'video', labelKey: 'project.video', defaultLabel: 'Video', Icon: PlayCircleOutlineRoundedIcon, variant: 'outlined' },
];

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <Box sx={{ py: 2, borderTop: '1px solid', borderColor: 'divider', '&:first-of-type': { borderTop: 0, pt: 0 } }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

/** Facts, stack and links in one card beside the story. */
export default function ProjectSidebar({ project }) {
  const { lang, t } = useLanguage();
  const isClientWork = project.type === 'client';
  const actions = ACTIONS.map((a) => ({ ...a, href: safeUrl(project.links?.[a.key]) })).filter(
    (a) => a.href,
  );

  const locationLabel = lang === 'ar' && project.location?.labelAr ? project.location.labelAr : project.location?.label;
  const roleLabel = lang === 'ar' && project.roleAr ? project.roleAr : project.role;
  const clientLabel = lang === 'ar' && project.clientAr ? project.clientAr : project.client;

  return (
    <Card sx={{ position: { md: 'sticky' }, top: { md: 100 }, height: 'auto' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2.5 }}>
        {t('project.detailsTitle', 'Project details')}
      </Typography>

      <Box>
        <DetailRow label={t('project.role', 'Role')} value={safeText(roleLabel)} />
        <DetailRow label={t('project.client', 'Client')} value={isClientWork ? safeText(clientLabel) : null} />
        <DetailRow
          label={isClientWork ? t('project.period', 'Period') : t('project.year', 'Year')}
          value={isClientWork ? safeText(project.period) : project.year}
        />
        <DetailRow label={t('project.location', 'Location')} value={locationLabel} />
      </Box>

      {project.stack?.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.25 }}>
            {t('project.techStack', 'Tech stack')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {project.stack.map((tech) => (
              <Tag key={tech} sx={{ fontSize: 12.5, py: 0.5 }}>
                {tech}
              </Tag>
            ))}
          </Box>
        </Box>
      )}

      {actions.length > 0 && (
        <Box sx={{ mt: 3.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {actions.map(({ key, labelKey, defaultLabel, Icon, variant, href }) => (
            <Button
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variant={variant}
              startIcon={<Icon />}
              fullWidth
            >
              {t(labelKey, defaultLabel)}
            </Button>
          ))}
        </Box>
      )}
    </Card>
  );
}
