import React from "react";
import { Avatar, Popover } from "@base-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ user, setUser }) {

    const navigate = useNavigate();

    // Logout Function
    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/logout",
                {},
                {
                    withCredentials: true
                }
            );

            if (response.data.success) {
                setUser(false);

                alert("Logout successful!");

                navigate("/login");
            }

        } catch (error) {
            console.log(
                "Logout Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message || "Logout failed!"
            );
        }
    };

    return (
        <nav className="bg-white shadow-md w-full">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                {/* Logo */}
                <div>
                    <Link to="/">
                        <h1 className="font-bold text-2xl">
                            Job<span className="text-[#F83002]">portal</span>
                        </h1>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div>
                    <ul className="flex gap-8 font-medium items-center">

                        <li>
                            <Link
                                to="/"
                                className="hover:text-[#F83002] transition"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/jobs"
                                className="hover:text-[#F83002] transition"
                            >
                                Jobs
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/browse"
                                className="hover:text-[#F83002] transition"
                            >
                                Browse
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Authentication / Profile */}
                <div className="flex items-center gap-4">

                    {!user ? (

                        /* Login and Signup */
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 font-medium hover:text-[#F83002] transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="bg-[#F83002] text-white px-5 py-2 rounded-md hover:bg-[#d92b02] transition"
                            >
                                Signup
                            </Link>
                        </>

                    ) : (

                        /* Profile Dropdown */
                        <Popover.Root>

                            <Popover.Trigger className="cursor-pointer">

                                <Avatar.Root>
                                    <Avatar.Image
                                        src="https://github.com/shadcn.png"
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full"
                                    />

                                    <Avatar.Fallback>
                                        AT
                                    </Avatar.Fallback>

                                </Avatar.Root>

                            </Popover.Trigger>

                            <Popover.Portal>

                                <Popover.Positioner
                                    side="bottom"
                                    align="end"
                                    sideOffset={8}
                                >

                                    <Popover.Popup className="bg-white shadow-lg rounded-md p-4 w-48">

                                        <div className="flex flex-col gap-3">

                                            <Link
                                                to="/profile"
                                                className="hover:text-[#F83002]"
                                            >
                                                View Profile
                                            </Link>

                                            <Link
                                                to="/my-jobs"
                                                className="hover:text-[#F83002]"
                                            >
                                                My Jobs
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="text-red-500 text-left hover:text-red-700"
                                            >
                                                Logout
                                            </button>

                                        </div>

                                    </Popover.Popup>

                                </Popover.Positioner>

                            </Popover.Portal>

                        </Popover.Root>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;