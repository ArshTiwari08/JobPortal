import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

export const register= async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role}= req.body;
        if(!fullname|| !email ||!phoneNumber||!password||!role){
            return res.status(400).json({
                message : "Credential are missing",
                success  : false
            });
        };
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                massage : "User Email is already Existed",
                success : false
            })
        }
        const hashPassword = await bcrypt.hash(password,10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            passwordm : hashPassword,
            role
        })
    } catch (error) {
        throw error
    }
}
export const login = async(req,res)=>{
    try {
        const {email,password,role}= req.body;
        if(!email || !password ||!role){
            return res.status(400).json({
                message : "invalid Creadential",
                success : false
            });
        };
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Incorrect email or password",
                success : false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,User.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message : "Incorrect email or password",
                success : false
            });
        };
        if(role !== User.role){
            return res.status(400).json({
                message : "user dosn't exit with current role",
                success : false
            });
        };

        const tokenData = {
            userID : User._id
        }
        const accesstoken = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn :'1d'})
        
    } catch (error) {
        throw error
    }
}