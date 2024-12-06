
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Hero } from "@/components/Hero";
import { AuthForm } from "@/components/auth/auth-form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signin" element={<AuthForm type="signin" />} />
        <Route path="/signup" element={<AuthForm type="signup" />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;