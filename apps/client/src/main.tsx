import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from './components/Hero.tsx';
import { SpacesPage } from './components/spaces/SpacesPage.tsx';
import { AuthForm } from './components/auth/auth-form.tsx';

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
    ],
  },
]); 







createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
