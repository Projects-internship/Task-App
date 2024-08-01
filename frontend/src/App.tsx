import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import theme from 'components/theme';
import './App.css';

import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
