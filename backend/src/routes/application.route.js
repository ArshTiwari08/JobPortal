import express from "express";
import isAuthenticated from "../middleware/isauthenticated.js";

import {
    applyJob,
    getApplicants,
    getAppliedJobs,
    updateStatus
} from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job
router.route("/apply/:id").post(isAuthenticated, applyJob);

// Get applicants for a particular job
router.route("/applicants/:id").get(isAuthenticated, getApplicants);

// Get jobs applied for by the logged-in user
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Update application status
router.route("/status/:id").put(isAuthenticated, updateStatus);

export default router;