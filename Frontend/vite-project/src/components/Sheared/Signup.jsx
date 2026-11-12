
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Signup() {

    const [formData,setFormData] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
    });

    const[loading,setLoading] = useState(false);
    const [error,setError] = useState("")
    const navigate = useNavigate()
//  to handle input change
    
    const handleChange = (e)=>{
        const{name,value} = e.target;

        setFormData((prev)=>({...prev,[name]:value,}))
    }
    // handle form submission

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        setError("")

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/register",
                formData,
                {withCredentials:true,}
            )
            console.log("Registration successful:",response.data);
            alert("Registration successful!!!")
            setFormData({
                fullname: "",
                email: "",
                phoneNumber: "",
                password: "",
                role: "",
            });
            navigate("/Home");

        } catch (error) {
            console.log(
                "Registration Error:",
                error.response?.data || error.message
            );
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Join our Job Portal and find your dream opportunity.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
                            placeholder="Create a password"
                            required
                            minLength={6}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select your role</option>
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;
