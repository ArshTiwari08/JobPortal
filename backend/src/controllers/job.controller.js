import {Job} from "../models/job.model.js"
// Admin
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirement,
            experienceLevel,
            salery,
            location,
            jobType,
            position,
            companyID
        } = req.body;

        const userID = req.id;

        // Validate required fields
        if (
            !title?.trim() ||
            !description?.trim() ||
            !location?.trim() ||
            !jobType?.trim() ||
            experienceLevel == null ||
            salery == null ||
            position == null ||
            !companyID ||
            !Array.isArray(requirement) ||
            requirement.length === 0 ||
            requirement.some(
                (item) => typeof item !== "string" || !item.trim()
            )
        ) {
            return res.status(400).json({
                message: "Please provide all required fields",
                success: false
            });
        }

        // Validate numeric fields
        if (
            !Number.isFinite(Number(experienceLevel)) ||
            !Number.isFinite(Number(salery))
        ) {
            return res.status(400).json({
                message: "Experience level and salary must be numbers",
                success: false
            });
        }

        // Create a new job
        const job = await Job.create({
            title: title.trim(),
            description: description.trim(),
            requirement: requirement.map((item) => item.trim()),
            experienceLevel: Number(experienceLevel),
            salery: Number(salery),
            location: location.trim(),
            jobType: jobType.trim(),
            position: String(position),
            company: companyID,
            createdby: userID
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });

    } catch (error) {
        console.error("Error creating job:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
// Student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({path :"company"}).sort({createdAt :-1});

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Error while fetching jobs:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobID = req.params.id;

        const job = await Job.findById(jobID);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error("Error while fetching job:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
// How many job admin created
export const getadminJobs = async (req, res) => {
    try {
        const adminID = req.id;

        const jobs = await Job.find({ createdby: adminID });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs have not been created yet",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Error while fetching admin jobs:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};