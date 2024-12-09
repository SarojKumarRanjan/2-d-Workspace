import { Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/useAuth";

function Navbar() {
    const navigate = useNavigate();
    const user = useAuth((state) => state.user);
    const unSetUser = useAuth((state) => state.unSetUser);
  return (
    <nav className="fixed top-0  w-full  z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container h-14  flex items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Gamepad className="h-6 w-6" />
              <span className="font-bold">MetaSpace</span>
            </Link>
            
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              {
                user && <p>Hello {user.username}</p>
              }
              {user && <Button variant="ghost" onClick={() =>{ 
                unSetUser();
                navigate("/signin")}}>Sign Out</Button>}
              {!user && <Button variant="ghost" onClick={() => navigate("/signin")}>Sign In</Button>}
              {!user && <Button onClick={() => navigate("/signup")}>Sign Up</Button>}
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </nav>
  )
}

export { Navbar };