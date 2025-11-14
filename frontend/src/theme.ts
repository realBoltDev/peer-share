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

  fontFamily: 'Russo One, sans-serif',
  fontFamilyMonospace: 'monospace',
  defaultRadius: 'md',

  respectReducedMotion: true,
  cursorType: 'pointer',
});
