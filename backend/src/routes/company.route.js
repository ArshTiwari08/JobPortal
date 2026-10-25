import express from "express";
import isAuthenticated from "../middleware/isauthenticated.js";
import { registerCompany,getCompany,getCompanyByID,updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

// Company Routes
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyByID);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;