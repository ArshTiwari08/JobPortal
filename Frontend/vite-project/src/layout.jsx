import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Sheared/Navbar";

function Layout() {
    const [user, setUser] = useState(false);
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <Outlet context={{ setUser }} />
        </>
    );
}
export default Layout;