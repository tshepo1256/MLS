import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF69B4', // A sophisticated pink
      light: '#FFB6C1',
      dark: '#DB7093',
    },
    secondary: {
      main: '#9370DB', // Soft purple
      light: '#E6E6FA',
      dark: '#663399',
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
    },
    warning: {
      main: '#FFA07A',
    },
    info: {
      main: '#87CEEB',
    },
    success: {
      main: '#98FB98',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h2: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h4: {
      fontWeight: 500,
      letterSpacing: 0.4,
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0.4,
    },
    h6: {
      fontWeight: 500,
      letterSpacing: 0.3,
    },
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
        contained: {
          boxShadow: '0 4px 12px rgba(255, 105, 180, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(255, 105, 180, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(180deg, #FFF5F7 0%, #FFFFFF 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #FF69B4 0%, #9370DB 100%)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF69B4',
      light: '#FFB6C1',
      dark: '#DB7093',
    },
    secondary: {
      main: '#9370DB',
      light: '#E6E6FA',
      dark: '#663399',
    },
    background: {
      default: '#1A1A1A',
      paper: '#2D2D2D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    action: {
      hover: 'rgba(255, 105, 180, 0.12)', // Customized hover color for dark mode
      selected: 'rgba(255, 105, 180, 0.16)', // Customized selected color for dark mode
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#1A1A1A',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 105, 180, 0.16)',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 180, 0.24)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 105, 180, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#2D2D2D',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#2D2D2D',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  // Inherit other properties from light theme
  ...lightTheme,
});

export { lightTheme, darkTheme }; 