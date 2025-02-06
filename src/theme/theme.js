import { createTheme } from '@mui/material/styles';

// Common theme settings
const commonThemeSettings = {
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600, letterSpacing: 0.5 },
    h2: { fontWeight: 600, letterSpacing: 0.5 },
    h3: { fontWeight: 600, letterSpacing: 0.5 },
    h4: { fontWeight: 500, letterSpacing: 0.4 },
    h5: { fontWeight: 500, letterSpacing: 0.4 },
    h6: { fontWeight: 500, letterSpacing: 0.3 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#FF69B4', // Pink
      light: '#FFB6C1',
      dark: '#DB7093',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9370DB', // Purple
      light: '#E6E6FA',
      dark: '#663399',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF5F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#6B4F4F',
    },
    error: {
      main: '#FF6B6B',
      light: '#FFB2B2',
      dark: '#CC5555',
    },
    warning: {
      main: '#FFA07A',
      light: '#FFD1B2',
      dark: '#CC8062',
    },
    info: {
      main: '#87CEEB',
      light: '#B2E2F2',
      dark: '#6CA5BC',
    },
    success: {
      main: '#98FB98',
      light: '#C2FDC2',
      dark: '#79C979',
    },
    action: {
      hover: 'rgba(255, 105, 180, 0.08)',
      selected: 'rgba(255, 105, 180, 0.16)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  components: {
    ...commonThemeSettings.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #FF69B4 0%, #9370DB 100%)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(180deg, #FFF5F7 0%, #FFFFFF 100%)',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF69B4',
      light: '#FFB6C1',
      dark: '#DB7093',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9370DB',
      light: '#E6E6FA',
      dark: '#663399',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#FF6B6B',
      light: '#FFB2B2',
      dark: '#CC5555',
    },
    warning: {
      main: '#FFA07A',
      light: '#FFD1B2',
      dark: '#CC8062',
    },
    info: {
      main: '#87CEEB',
      light: '#B2E2F2',
      dark: '#6CA5BC',
    },
    success: {
      main: '#98FB98',
      light: '#C2FDC2',
      dark: '#79C979',
    },
    action: {
      hover: 'rgba(255, 105, 180, 0.12)',
      selected: 'rgba(255, 105, 180, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  components: {
    ...commonThemeSettings.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
          backgroundImage: 'none',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
}); 