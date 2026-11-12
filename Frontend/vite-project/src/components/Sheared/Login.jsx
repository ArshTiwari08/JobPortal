
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login Data:", formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

            <h1 className="text-3xl font-bold text-center mb-2">
            Welcome Back!
            </h1>

            <p className="text-gray-500 text-center mb-6">
            Login to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Email Address
                </label>

                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Password
                </label>

                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Role */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Select Role
                </label>

                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
                </select>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
                Login
            </button>

            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
            >
                Sign Up
            </Link>
            </p>

        </div>
        </div>
    );
    }

export default Login;
