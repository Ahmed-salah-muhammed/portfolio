import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { useLanguage } from '@/i18n';

export default function LanguageToggle({ sx }) {
  const { lang, toggleLanguage } = useLanguage();
  const tooltipText = lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English';

  return (
    <Tooltip title={tooltipText} arrow>
      <IconButton
        onClick={toggleLanguage}
        aria-label={tooltipText}
        size="small"
        sx={{
          width: 40,
          height: 40,
          color: 'text.secondary',
          borderRadius: '10px',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'var(--mui-palette-surfaces-muted)',
            transform: 'scale(1.06)',
          },
          '&:active': {
            transform: 'scale(0.96)',
          },
          ...sx,
        }}
      >
        <TranslateRoundedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
