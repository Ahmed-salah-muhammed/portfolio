import { FONTS } from './tokens.js';

// Fluid type: every size scales smoothly between a phone (~360px) and a wide desktop
// (~1920px) with clamp(), so there is no jump between breakpoints and large screens
// get genuinely larger text instead of the same small text with more empty space.
const fluid = (minPx, maxPx, minVw = 360, maxVw = 1920) => {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const intercept = minPx - slope * minVw;
  return `clamp(${minPx / 16}rem, ${(intercept / 16).toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxPx / 16}rem)`;
};

export const FLUID = {
  hero: fluid(32, 50),
  h2: fluid(24, 38),
  h3: fluid(18, 22),
  h4: fluid(16, 19),
  body1: fluid(14.5, 16.5),
  body2: fluid(13.5, 15),
};

export const typography = {
  fontFamily: FONTS.body,
  h1: {
    fontFamily: FONTS.display,
    fontWeight: 800,
    fontSize: FLUID.hero,
    lineHeight: 1.08,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontFamily: FONTS.display,
    fontWeight: 800,
    fontSize: FLUID.h2,
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
  },
  h3: {
    fontFamily: FONTS.display,
    fontWeight: 700,
    fontSize: FLUID.h3,
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: FONTS.display,
    fontWeight: 700,
    fontSize: FLUID.h4,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontFamily: FONTS.body,
    fontWeight: 600,
    fontSize: FLUID.body2,
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: FONTS.body,
    fontSize: FLUID.body1,
    lineHeight: 1.75,
  },
  body2: {
    fontFamily: FONTS.body,
    fontSize: FLUID.body2,
    lineHeight: 1.7,
  },
  caption: {
    fontFamily: FONTS.body,
    fontSize: 13.5,
    lineHeight: 1.5,
  },
  button: {
    fontFamily: FONTS.body,
    fontSize: 15.5,
    fontWeight: 600,
    letterSpacing: 0,
    textTransform: 'none',
  },
};
