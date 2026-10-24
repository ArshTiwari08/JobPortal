import mongoose from "mongoose";

const companySchema = new  mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    Website :{
        type : String,
    },
    location:{
        type : String,
    },
    logo:{
        type : String
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : " USer",
        required : true
    }
},{timestamps:true})

export const company = mongoose.model("Company",companySchema);