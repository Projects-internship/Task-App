import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import TaskTable from 'components/TaskTable';
import theme from 'components/theme';

import SimpleMap from './components/SimpleMap';
import UserTable from './components/UserTable'; // Importă UserTable
import AppRoutes from './routes'; // Importă rutele

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className='App'>
          {/* <UserTable /> */}
          <AppRoutes />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
