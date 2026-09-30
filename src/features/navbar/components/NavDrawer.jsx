import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { PROFILE } from '@/data/profile.js';
import { NAV_LINKS } from '../navLinks.js';
import Monogram from './Monogram.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useLanguage } from '@/i18n';

export default function NavDrawer({ open, onClose, onNavigate, activeId }) {
  const { t, isRTL } = useLanguage();

  return (
    <Drawer
      anchor={isRTL ? 'left' : 'right'}
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 290, px: 2, py: 2.5 } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Monogram />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LanguageToggle />
          <ThemeToggle />
          <IconButton onClick={onClose} aria-label={isRTL ? 'إغلاق القائمة' : 'Close menu'}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <List sx={{ mt: 2 }}>
        {NAV_LINKS.map((link) => {
          const label = t(`nav.${link.id}`, link.label);
          return (
            <ListItemButton
              key={link.id}
              onClick={() => onNavigate(link.id)}
              selected={activeId === link.id}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText
                primary={label}
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Button
        variant="contained"
        href={PROFILE.links.cv}
        download
        startIcon={<DownloadRoundedIcon />}
        sx={{ mt: 2 }}
      >
        {t('nav.downloadCV', 'Download CV')}
      </Button>
    </Drawer>
  );
}
