import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import theme from 'components/theme';
import './App.css';

import UserTable from './components/UserTable'; // Importă UserTable
import AppRoutes from './routes'; // Importă rutele

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <h1>Bine ai venit la aplicația mea React!</h1>

          <UserTable /> {/* Adaugă UserTable */}

          <AppRoutes /> {/* Rutele aplicației */}
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;