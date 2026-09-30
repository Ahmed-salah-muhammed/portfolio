import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useColorScheme } from '@mui/material/styles';

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  // `mode` is "system" until the visitor chooses; resolve it for the icon.
  const resolved = mode === 'system' ? systemMode : mode;
  if (!resolved) return <IconButton size="small" sx={{ width: 40, height: 40 }} />;

  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <Tooltip title={`Switch to ${next} mode`}>
      <IconButton
        onClick={() => setMode(next)}
        aria-label={`Switch to ${next} mode`}
        sx={{ color: 'text.secondary' }}
      >
        {resolved === 'dark' ? (
          <LightModeRoundedIcon fontSize="small" />
        ) : (
          <DarkModeRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
