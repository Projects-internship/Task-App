import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8a64fd',
    },
    background: {
      default: '#fafafa',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.85em',
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
