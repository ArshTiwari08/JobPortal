import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Sheared/Navbar";

function Layout() {
    return (
    <>
    <Navbar/>
    <Outlet />
    </>
    );
}

export default Layout;
