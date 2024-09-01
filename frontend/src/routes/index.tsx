import { Routes, Route } from 'react-router-dom';

import TaskTable from 'components/TaskTable';
import UserTable from 'components/UserTable';
import MainLayout from 'layouts/main';
import HomePage from 'pages/home/HomePage';
import LoginPage from 'pages/LoginPage'; // Import corect pentru LoginPage

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} /> {/* Pagina de login este ruta implicită */}
      <Route path='/main' element={<MainLayout />}>
        {' '}
        {/* Pagina principală */}
        <Route index element={<HomePage />} /> {/* Pagina principală */}
        <Route path='users' element={<UserTable />} /> {/* Tabelul de utilizatori */}
        <Route path='tasks' element={<TaskTable />} /> {/* Tabelul de sarcini */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
