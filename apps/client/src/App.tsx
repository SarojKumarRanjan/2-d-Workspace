import { Toaster } from "sonner";
import { Navbar } from "@/components/Header/Navbar";
import Footer from "@/components/Header/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className=" bg-background ">
      <div className="bg-background mb-14">
      <Navbar />
      </div>
      <div className="bg-background">
      <Outlet />
      </div>

      <Toaster position="top-right" richColors />
      <Footer />
      
    </div>
  );
}

export default App;
