import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User email already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "You are not authorized for this role",
                success: false
            });
        }

        const token = jwt.sign(
            { userID: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            })
            .json({
                message: "Login successful",
                success: true,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                }
            });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            })
            .json({
                message: "Logged out successfully",
                success: true
            });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        const userID = req.id;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update basic user details only when provided
        if (fullname !== undefined) {
            user.fullname = fullname;
        }
        if (email !== undefined) {
            user.email = email;
        }
        if (phoneNumber !== undefined) {
            user.phoneNumber = phoneNumber;
        }
        // Ensure the profile object exists
        if (!user.profile) {
            user.profile = {};
        }

        if (bio !== undefined) {
            user.profile.bio = bio;
        }

        if (skills !== undefined) {
            user.profile.skills = Array.isArray(skills)
                ? skills
                : skills.split(",").map(skill => skill.trim()).filter(Boolean);
        }

        // Handle profile image if a file was uploaded
        if (file) {
            // Add your cloud storage upload logic here.
            // For example, upload the file and assign its URL:
            // user.profile.profilePhoto = uploadedImageUrl;
        }

        await user.save();

        const updatedUser = await User.findById(userID).select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};