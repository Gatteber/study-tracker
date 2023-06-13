import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent.tsx';
import UserProfile from './pages/UserProfile.tsx';
import Home from './pages/Home.tsx';
import Login from './components/Login.tsx';

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
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/profile/',
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
