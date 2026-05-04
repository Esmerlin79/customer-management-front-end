import { createTheme } from '@mui/material/styles';

export const colors = {
  navy: '#0F1E47',
  navyDark: '#091537',
  navyLight: '#1B2E5F',
  blue: '#3B5BFF',
  blueDark: '#2845D9',
  blueLight: '#7894FF',
  purple: '#7B2CFF',
  purpleDark: '#5A1ECC',
  purpleLight: '#A66DFF',
  background: '#F4F6FB',
  backgroundSecondary: '#EAEEF7',
  surface: '#FFFFFF',
  textPrimary: '#0F1E47',
  textSecondary: '#5A6789',
  border: '#E2E7F2',
};

export const gradients = {
  brand: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 100%)`,
  brandSoft: `linear-gradient(135deg, ${colors.blue}E6 0%, ${colors.purple}E6 100%)`,
  primary: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.blueDark} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.purpleDark} 100%)`,
  success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  navy: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.blue,
      dark: colors.blueDark,
      light: colors.blueLight,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.purple,
      dark: colors.purpleDark,
      light: colors.purpleLight,
      contrastText: '#FFFFFF',
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    divider: colors.border,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.375rem', fontWeight: 600 },
    h4: { fontSize: '1.125rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          padding: '8px 18px',
          fontWeight: 600,
        },
        containedPrimary: {
          background: gradients.brand,
          '&:hover': {
            background: gradients.brandSoft,
            boxShadow: '0 6px 18px -6px rgba(59, 91, 255, 0.55)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${colors.border}`,
          boxShadow: '0 1px 3px rgba(15, 30, 71, 0.04)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          color: colors.textPrimary,
          boxShadow: '0 1px 0 rgba(15, 30, 71, 0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});
