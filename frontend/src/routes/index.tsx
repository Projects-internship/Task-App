import { Routes, Route } from 'react-router-dom';

import MainLayout from 'layouts/main';
import HomePage from 'pages/home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
