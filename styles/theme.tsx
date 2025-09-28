'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0A66C2' }, // LinkedIn blue
    secondary: { main: '#56687A' },
    background: { default: '#f5f6f8', paper: '#ffffff' },
    text: { primary: '#1d2226', secondary: '#5e6b74' }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 999 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } }
  },
  typography: {
    fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  }
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
