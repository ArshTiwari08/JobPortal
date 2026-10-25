import express from "express";
import {postJob,getAllJobs,getJobById,getadminJobs} from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isauthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);
router.route("/admin").get(isAuthenticated, getadminJobs);

export default router;