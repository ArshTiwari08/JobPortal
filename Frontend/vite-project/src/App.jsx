import { Button } from "@/components/ui/button"
import Navbar from "./components/Sheared/Navbar"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App