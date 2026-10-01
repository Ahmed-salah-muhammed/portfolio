// src/features/chatbot/components/ChatbotQuickPrompts.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import { QUICK_PROMPTS } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

const ICONS = {
  person: PersonOutlineRoundedIcon,
  services: CodeRoundedIcon,
  projects: RocketLaunchOutlinedIcon,
  contact: WorkOutlineRoundedIcon,
};

export default function ChatbotQuickPrompts({ isDark, onSelectPrompt }) {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 2.25 },
        pb: 1.25,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {QUICK_PROMPTS.map((item) => {
        const IconComponent = ICONS[item.icon] || PersonOutlineRoundedIcon;
        const label = lang === 'ar' ? item.label : item.labelEn;
        const query = lang === 'ar' ? item.query : item.queryEn;

        return (
          <Box
            key={item.id}
            component="button"
            type="button"
            onClick={() => onSelectPrompt(query)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.65,
              borderRadius: '999px',
              border: '1px solid',
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.14)'
                : 'rgba(0, 0, 0, 0.12)',
              backgroundColor: isDark ? '#162238' : '#ffffff',
              color: isDark ? '#e2e8f0' : '#334155',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: isDark ? '#38bdf8' : 'primary.main',
                borderColor: isDark ? '#38bdf8' : 'primary.main',
                backgroundColor: isDark
                  ? 'rgba(56, 189, 248, 0.14)'
                  : 'rgba(37, 99, 235, 0.08)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <IconComponent sx={{ fontSize: 16, color: 'inherit' }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 'inherit', color: 'inherit' }}>
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
