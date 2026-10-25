import { application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const existingApplication = await application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        const newApplication = await application.create({
            job: jobId,
            applicant: userId
        });

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job application submitted successfully",
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
// Get all applicants for a particular job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "application",
            populate: {
                path: "applicant",
                select: "-password"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            totalApplicants: job.application.length,
            applicants: job.application,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get jobs applied for by the logged-in user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await application
            .find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });

        if (applications.length === 0) {
            return res.status(404).json({
                message: "You have not applied for any jobs yet",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
// Update application status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        console.log("Application ID:", applicationId);
        console.log("Status:", status);

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const updatedApplication = await application.findByIdAndUpdate(
            applicationId,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Application status updated successfully",
            application: updatedApplication,
            success: true
        });

    } catch (error) {
        console.log("Update Status Error:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};