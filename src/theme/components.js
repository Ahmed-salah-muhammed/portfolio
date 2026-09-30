import { RADIUS, LAYOUT } from './tokens.js';

// `var(--mui-palette-*)` keeps every override correct in both colour schemes without
// re-rendering the tree when the theme flips.
export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      // Anchor jumps land below the floating header (its height + its top gap).
      html: { scrollBehavior: 'smooth', scrollPaddingTop: LAYOUT.navHeight + 24 },
      '@media (prefers-reduced-motion: reduce)': {
        html: { scrollBehavior: 'auto' },
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
        },
      },
      body: { overflowX: 'hidden' },
      // Links never look like classic hyperlinks — styling comes from the component.
      a: { color: 'inherit', textDecoration: 'none' },
      ':focus-visible': {
        outline: '2px solid var(--mui-palette-primary-main)',
        outlineOffset: '3px',
        borderRadius: '6px',
      },
      '::selection': {
        background: 'var(--mui-palette-primary-main)',
        color: 'var(--mui-palette-primary-contrastText)',
      },
      '::-webkit-scrollbar': { width: 10, height: 10 },
      '::-webkit-scrollbar-thumb': {
        background: 'var(--mui-palette-surfaces-borderStrong)',
        borderRadius: 999,
      },
    },
  },
  MuiContainer: {
    defaultProps: { maxWidth: false },
    styleOverrides: {
      // Side padding steps up with the screen: phone 20 → tablet 32 → laptop 48 → desktop 64.
      root: ({ theme }) => ({
        maxWidth: LAYOUT.containerMax,
        paddingInline: 20,
        [theme.breakpoints.up('sm')]: { paddingInline: 32 },
        [theme.breakpoints.up('md')]: { paddingInline: 48 },
        [theme.breakpoints.up('lg')]: { paddingInline: 64 },
      }),
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: RADIUS.base,
        paddingInline: 22,
        paddingBlock: 11,
        transition: 'background-color .2s, border-color .2s, color .2s, transform .2s',
      },
      sizeLarge: { paddingInline: 28, paddingBlock: 14, fontSize: 16 },
      sizeSmall: { paddingInline: 14, paddingBlock: 7, fontSize: 14 },
      containedPrimary: {
        '&:hover': { backgroundColor: 'var(--mui-palette-primary-dark)' },
      },
      outlined: {
        borderColor: 'var(--mui-palette-surfaces-borderStrong)',
        color: 'var(--mui-palette-text-primary)',
        '&:hover': {
          borderColor: 'var(--mui-palette-text-primary)',
          backgroundColor: 'transparent',
        },
      },
      text: {
        color: 'var(--mui-palette-text-primary)',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: { borderRadius: RADIUS.base },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      rounded: { borderRadius: RADIUS.lg },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: RADIUS.sm,
        fontWeight: 500,
        fontSize: 13.5,
        height: 30,
        backgroundColor: 'var(--mui-palette-surfaces-muted)',
        color: 'var(--mui-palette-text-primary)',
      },
      label: { paddingInline: 12 },
    },
  },
  MuiLink: {
    defaultProps: { underline: 'none' },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: { fontSize: 12.5, fontWeight: 500, borderRadius: RADIUS.sm },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: RADIUS.base,
        backgroundColor: 'var(--mui-palette-background-paper)',
      },
      notchedOutline: { borderColor: 'var(--mui-palette-divider)' },
    },
  },
};
