import { Toaster } from "sonner";
import { Navbar } from "@/components/Header/Navbar";
import Footer from "@/components/Header/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className=" bg-background text-foreground">
      <div className="bg-background text-foreground mb-14">
      <Navbar />
      </div>
      <Outlet />

      <Toaster position="top-right" richColors />
      <Footer />
      
    </div>
  );
}

export default App;
