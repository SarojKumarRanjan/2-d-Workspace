import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GameRoom from './pages/GameRoom';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import App from './App';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/game-room",
        element: <GameRoom />
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  },
  
]);

export default Router;