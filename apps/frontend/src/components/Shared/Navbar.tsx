import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthContextType } from '../../contexts/AuthContext';

const Navbar = () => {
    const { logout } = useAuth() as AuthContextType;
  return (
    <div className="flex justify-between p-4 ">
        <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <button onClick={logout}>Logout</button>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Navbar;