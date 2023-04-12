import { Fragment, lazy } from 'react';
import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';

import Loadable from '@/components/core/loadable';
import LayoutAuth from '@/components/layouts/auth';
import LayoutMain from '@/components/layouts/main';

const DashboardPage = Loadable(lazy(() => import('@/views/dashboard')));
const HomePage = Loadable(lazy(() => import('@/views/home')));
const LoginPage = Loadable(lazy(() => import('@/views/auth/login')));
const RegisterPage = Loadable(lazy(() => import('@/views/auth/register')));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Fragment>
        <LayoutMain>
          <Outlet />
        </LayoutMain>
      </Fragment>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: 'home',
        element: <HomePage />,
      },
    ],
  },

  {
    path: 'auth',
    element: (
      <Fragment>
        <LayoutAuth>
          <Outlet />
        </LayoutAuth>
      </Fragment>
    ),
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  {
    path: '*',
    element: (
      <LayoutMain>
        <>page not found</>
      </LayoutMain>
    ),
  },
];

export default createBrowserRouter(routes);
