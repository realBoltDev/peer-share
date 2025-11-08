import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: { light: 5, dark: 4 },

  colors: {
    blue: [
      '#e3f2fd', // 0
      '#bbdefb',
      '#90caf9',
      '#64b5f6',
      '#42a5f5', // 4
      '#66c0f4', // 5 (your primary)
      '#1e88e5',
      '#1976d2',
      '#1565c0',
      '#0d47a1',
    ],
    gray: [
      '#f8f9fa',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#c7d5e0', // accent
      '#495057',
      '#343a40',
      '#212529',
      '#1b2838', // background
    ],
  },

  white: '#ffffff',
  black: '#000000',

  fontFamily: 'Geist, sans-serif',
  fontFamilyMonospace: 'monospace',
  defaultRadius: 'md',

  // headings: {
  //   fontFamily: 'Inter, sans-serif',
  //   fontWeight: '700',
  //   textWrap: 'balance',
  //   sizes: {
  //     h1: { fontSize: rem(36), lineHeight: '1.25', fontWeight: '800' },
  //     h2: { fontSize: rem(28), lineHeight: '1.3', fontWeight: '700' },
  //     h3: { fontSize: rem(22), lineHeight: '1.35', fontWeight: '700' },
  //     h4: { fontSize: rem(18), lineHeight: '1.4', fontWeight: '600' },
  //     h5: { fontSize: rem(16), lineHeight: '1.45', fontWeight: '600' },
  //     h6: { fontSize: rem(14), lineHeight: '1.5', fontWeight: '600' },
  //   },
  // },

  // spacing: {
  //   xs: rem(6),
  //   sm: rem(10),
  //   md: rem(16),
  //   lg: rem(24),
  //   xl: rem(32),
  // },

  // shadows: {
  //   sm: '0 1px 3px rgba(0, 0, 0, 0.25)',
  //   md: '0 4px 10px rgba(0, 0, 0, 0.2)',
  // },

  // lineHeights: {
  //   xs: '1.3',
  //   sm: '1.4',
  //   md: '1.5',
  //   lg: '1.6',
  //   xl: '1.7',
  // },

  respectReducedMotion: true,
  cursorType: 'pointer',

  // defaultGradient: {
  //   from: '#66c0f4',
  //   to: '#5e9ecf',
  //   deg: 45,
  // },

  // Optional custom background colors or overrides:
  // other: {
  //   background: '#1b2838',
  //   accentText: '#c7d5e0',
  //   highlight: '#5e9ecf',
  // },
});
