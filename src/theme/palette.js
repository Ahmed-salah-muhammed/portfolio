import { COLORS } from './tokens.js';

// Maps the tokens onto MUI's palette shape, once per colour scheme.
const toPalette = (c, mode) => ({
  mode,
  primary: {
    main: c.primary,
    dark: c.primaryHover,
    light: c.primarySoft,
    contrastText: c.onPrimary,
  },
  success: { main: c.success },
  warning: { main: c.warning },
  error: { main: c.error },
  info: { main: c.info },
  background: { default: c.background, paper: c.surface },
  text: { primary: c.text, secondary: c.textMuted, disabled: c.textSubtle },
  divider: c.border,
  // Slots the design needs that MUI has no home for — read as
  // var(--mui-palette-surfaces-*) or theme.palette.surfaces.* in sx.
  surfaces: {
    alt: c.backgroundAlt,
    muted: c.surfaceMuted,
    border: c.border,
    borderStrong: c.borderStrong,
    primarySoft: c.primarySoft,
  },
});

export const lightPalette = toPalette(COLORS.light, 'light');
export const darkPalette = toPalette(COLORS.dark, 'dark');
