import {Company} from "../models/company.model.js"

export const registerCompany = async(req,res)=>{
    try {
        const{name} = req.body;
        const userId = req.id;
        if(!name){
            return res
            .status(401)
            .json({
                message : "Company name is required",
                success : false
            })
        }
        let company = await Company.findOne({name})
        if(company){
            return res
            .status(400)
            .json({
                message : "Company name is already exist"
            })
        }
        company = await Company.create({
            name,
            userId
        });
        return res
        .status(201)
        .json({
            message : "Your Company registration is completed",
            company,
            success : true
        })
    } catch (error) {
        console.error("Company registration error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
    })
    }
}

export const getCompany = async (req, res) => {
    try {
        const userID = req.id;
        const companies = await Company.find({ userId: userID });
        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies found successfully",
            companies,
            success: true
        });

    } catch (error) {
        console.error("Error while getting company information:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getCompanyByID = async(req,res)=>{
    try {
        const companyID = req.params.id;
        const company = await Company.findById(companyID);
        if(!company){
            return res
            .status(404)
            .json({
                message : "Company Not Found",
                success : false
            })
        }
        return res
        .status(200)
        .json({
                company,
                success : true
            })

    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, Website, location } = req.body;
        const file = req.file;

        // Cloudinary image upload work is pending

        const updateData = {
            name,
            description,
            Website,
            location
        };

        const company = await Company.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.id
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error("Error updating company:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};