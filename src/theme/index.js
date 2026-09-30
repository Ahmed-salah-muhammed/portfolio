import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette.js';
import { typography } from './typography.js';
import { components } from './components.js';
import { RADIUS, SHADOWS, FONTS, MOTION, LAYOUT } from './tokens.js';

// CSS variables + both colour schemes: the theme flips via a data attribute on <html>
// instead of re-rendering the React tree. Spacing stays on MUI's default 8px unit.
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  shape: { borderRadius: RADIUS.base },
  typography,
  components,
  // Tokens MUI has no slot for; read via theme.tokens.* in sx callbacks.
  tokens: { RADIUS, SHADOWS, FONTS, MOTION, LAYOUT },
});

export default theme;
