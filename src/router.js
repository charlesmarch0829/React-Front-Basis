import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Authentication
const Login = Loader(lazy(() => import('./components/Auth/login')));

const SignUp = Loader(lazy(() => import('./components/Auth/signup')));

// Chatbot
const Dashboard = Loader(lazy(() => import('./components/Dashboard')));

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'login',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'register',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <Status404 />,
  // },
];

export default routes;
