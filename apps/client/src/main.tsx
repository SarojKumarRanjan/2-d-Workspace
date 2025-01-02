import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from './components/Hero.tsx';
import { SpacesPage } from './components/spaces/SpacesPage.tsx';
import { AuthForm } from './components/auth/auth-form.tsx';
import  AdminPage  from './components/admin/AdminPage.tsx';
import SpaceMainPage  from './components/spacePage/spacePage.tsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/signin",
        element: <AuthForm type="signin" />,
      },
      {
        path: "/signup",
        element: <AuthForm type="signup" />,
      },
      {
        path: "/spaces",
        element: <SpacesPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
     
    ],
  },
  
    {
      path: "/space/:spaceId",
      element: <SpaceMainPage />,
    }
  
]); 







createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
