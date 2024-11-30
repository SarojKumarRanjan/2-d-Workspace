import { Outlet } from "react-router-dom"
import Navbar from "./components/Shared/Navbar"
import Sidebar from "./components/Shared/Sidebar"

export default function App() {
  return (
    <>
      <div className="bg-gray-800 text-white  p-4">
        <Navbar />
        </div>
        <Sidebar />
        <Outlet />
      
    </>
  )
}