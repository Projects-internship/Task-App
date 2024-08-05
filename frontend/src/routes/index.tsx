import { Routes, Route } from 'react-router-dom';

import MainLayout from 'layouts/main';
import HomePage from 'pages/home';
import UserTable from 'components/UserTable'; // Importă UserTable

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/users' element={<UserTable />} /> {/* Ruta pentru UserTable */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
