import { Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className="fixed top-0  w-full  z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container h-14  flex items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <Gamepad className="h-6 w-6" />
              <span className="font-bold">MetaSpace</span>
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
              <a href="#spaces" className="text-sm font-medium hover:text-primary">Spaces</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate("/signin")}>Sign In</Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </nav>
  )
}

export { Navbar };