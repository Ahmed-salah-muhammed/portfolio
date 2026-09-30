
---
name: Precision & Flow
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464554'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#EEF2FF'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#5654a8'
  on-secondary: '#ffffff'
  secondary-container: '#a7a5ff'
  on-secondary-container: '#393689'
  tertiary: '#8127cf'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c48ea'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#100563'
  on-secondary-fixed-variant: '#3e3c8f'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb7ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6900b3'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  error-alert: '#EF4444'
  background-deep: '#0F172A'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 80px
  container-max: 1280px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for a professional GIS Solution Engineer, blending high-tech precision with a welcoming, human-centric approach. The brand personality is authoritative yet innovative, reflecting the intersection of complex spatial data and elegant software solutions.

The design style utilizes **Modern Corporate** principles with a heavy emphasis on **Glassmorphism** and **Tonal Layering**. It leverages deep indigo foundations to evoke stability, while vibrant indigo and violet accents represent the "data flow" and analytical energy of GIS. The interface should feel expansive, clean, and meticulously organized, using subtle background blurs and micro-interactions to guide the user through the professional journey and technical expertise.

## Colors

The color palette centers on a "Digital Indigo" hierarchy. The primary color is a vibrant indigo (#6366F1), used for interactive elements and key brand moments. The secondary color is a deep, scholarly indigo (#312E81), utilized for typography and high-contrast containers to provide professional weight.

A tertiary violet is introduced to support the GIS-inspired aesthetic, often used in gradients and data visualization. The neutral palette is exceptionally clean, using near-white slate tones to maintain a high-end, airy feel. Dark mode should shift the background to a deep slate (#0F172A) while maintaining the indigo accents for a sophisticated, low-light developer aesthetic.

## Typography

This design system uses a dual-sans approach to balance friendliness with technical rigor. **Plus Jakarta Sans** is the display face, chosen for its modern, geometric construction and warm, open apertures. It should be used for all major headlines and brand touchpoints.

**Inter** serves as the primary body face, ensuring maximum legibility across diverse screen densities and complex technical descriptions. For technical specifications, code snippets, or GIS coordinates, **JetBrains Mono** is employed to signal precision and developer-centric content. High-level headlines should use tighter letter-spacing to create a "locked-in," professional appearance.

## Layout & Spacing

The layout follows a strict **Fixed Grid** system for desktop, centered on a 1280px container with a 12-column structure. Spacing is based on a 4px baseline unit, ensuring all components align to a predictable rhythm.

On mobile, the layout transitions to a single-column fluid flow with 16px side margins. Tablet devices use an 8-column grid with 24px margins. Use "Stack" variables to maintain vertical rhythm—`stack-lg` for section spacing and `stack-md` for component grouping. High-tech patterns (GIS-inspired) should be placed in the background of sections, using absolute positioning and low-opacity masking to ensure they don't interfere with the primary content grid.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Surfaces do not use harsh borders; instead, they rely on soft, multi-layered shadows with a slight indigo tint (`rgba(49, 46, 129, 0.08)`) to lift cards off the background.

To emphasize the high-tech GIS theme, use **Glassmorphism** for navigation bars and floating action elements. These elements should feature a `20px` backdrop blur and a `1px` translucent white border to simulate high-end software interfaces. Depth is communicated by "stacking" lighter indigo surfaces on top of darker neutrals, rather than using heavy blacks or greys.

## Shapes

The shape language is defined by a consistent `0.5rem` (8px) base radius, referred to here as **Rounded**. This provides a friendly, modern feel that avoids the clinical sharpness of brutalism or the extreme playfulness of pill-shapes.

Interactive components like buttons and input fields use the base `rounded` setting. Larger layout containers and portfolio cards should scale up to `rounded-lg` (16px) or `rounded-xl` (24px) to create a soft, approachable frame for technical content. Headshot containers should use a "squircle" shape or a `rounded-xl` to maintain the sophisticated engineering aesthetic.

## Components

### Buttons
Primary buttons use a solid Indigo (#6366F1) fill with white text and a subtle 4px bottom shadow. Hover states should transition to the Secondary Indigo (#312E81) with a slight upward lift. Secondary buttons use a "Ghost" style: a transparent background with a 1px Indigo border.

### Cards
Portfolio and project cards are the core component. They feature a white or `EEF2FF` background, `rounded-lg` corners, and the signature tinted ambient shadow. Images within cards should have a slight zoom-on-hover effect to indicate interactivity.

### Chips & Tags
Technical skills (e.g., "ArcGIS", "Python") are displayed in small chips. These use the `label-sm` typography, a light `EEF2FF` background, and a `rounded-full` pill shape to contrast against the more geometric cards.

### Input Fields
Forms should feel precise. Use a `1px` border in a soft slate tone that shifts to Primary Indigo on focus. Include a subtle inner shadow to provide a "recessed" tactile feel.

### GIS Icon Patterns
Use SVG patterns inspired by topography lines, coordinate grids, and node-link diagrams as background decorative elements. These should be rendered in the primary color at 5-10% opacity to reinforce the GIS Solution Engineer identity without distracting from the text.