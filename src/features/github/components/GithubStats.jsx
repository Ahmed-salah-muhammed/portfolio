import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Card, IconTile } from '@/shared/components/ui';
import { formatRelative } from '@/utils/date.js';
import { useLanguage } from '@/i18n';

// Deliberately no "stars" or "followers" tile: with a young account they are tiny
// numbers that undersell the work. Stars still show on a repo card when it has any.
const sentenceCase = (text) => (text ? text[0].toUpperCase() + text.slice(1) : text);

export default function GithubStats({ stats }) {
  const { t } = useLanguage();
  const lastPush = stats.lastPush ? sentenceCase(formatRelative(stats.lastPush)) : null;

  const tiles = [
    { icon: FolderOpenOutlinedIcon, value: stats.publicRepos, label: t('github.publicRepos', 'Public repositories') },
    { icon: CodeRoundedIcon, value: stats.languages, label: t('github.languagesUsed', 'Languages used') },
    { icon: UpdateRoundedIcon, value: lastPush, label: t('github.lastCommitPushed', 'Last commit pushed') },
    { icon: CalendarMonthOutlinedIcon, value: stats.since, label: t('github.onGithubSince', 'On GitHub since') },
  ].filter((tItem) => tItem.value !== null && tItem.value !== undefined);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      }}
    >
      {tiles.map(({ icon, value, label }) => (
        <Card key={label} sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <IconTile icon={icon} size={40} />
          <Box>
            <Typography
              sx={{
                fontFamily: (t) => t.tokens.FONTS.display,
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'text.primary',
                fontSize: { xs: 26, md: 32 },
              }}
            >
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {label}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
