import { Routes, Route } from 'react-router-dom';

import MainLayout from 'layouts/main';
import HomePage from 'pages/home/HomePage';
import LoginPage from 'pages/LoginPage'; // Import corect pentru LoginPage
import UserTable from 'components/UserTable';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} /> {/* Pagina de login este ruta implicită */}
      <Route path='/main' element={<MainLayout />}> {/* Pagina principală */}
        <Route index element={<HomePage />} /> {/* Pagina principală */}
        <Route path='users' element={<UserTable />} /> {/* Tabelul de utilizatori */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
