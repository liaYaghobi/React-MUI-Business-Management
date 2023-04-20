import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import UserLayout from './layouts/user';
import SimpleLayout from './layouts/simple';
//

import EmployeePage from './pages/EmployeePage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import InventoryPage from './pages/InventoryPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BranchPage from './pages/BranchPage';
import RegisterPage from './pages/RegisterPage';
import EcommercePage from './pages/EcommercePage';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: '/user',
      element: <UserLayout />,
      children: [
        { element: <Navigate to="/user/app" />},
        { path: 'ecommerce', element: <EcommercePage /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'branches', element: <BranchPage /> },
        { path: 'inventory', element: <InventoryPage /> },
        { path: 'employees', element: <EmployeePage /> },
      ],
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}


