import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../contexts/AuthContext";

function Profile() {
    const { user } = useAuth() as AuthContextType;
  return (
    <div>
        <h1>Profile</h1>
        <p>Username: {user?.username}</p>
        <p>Role: {user?.role}</p>
    </div>
  )
}

export default Profile