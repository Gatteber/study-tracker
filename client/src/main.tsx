import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import UserProfile from './pages/UserProfile.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Signup from './pages/Signup.tsx';
import DemoTimer from './pages/DemoTimer.tsx';
import StudySession from './pages/StudySession.tsx';

//TODO: add :userId to UserProfile
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/demo',
        element: <DemoTimer />,
      },
      {
        path: '/profile',
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile',
            element: <UserProfile />,
          },
          {
            path: '/profile/study-session',
            element: <StudySession />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
