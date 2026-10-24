import mongoose, { trusted } from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{
        type :String,
        required : true
    },
    description:{
        type :String,
        required : true
    },
    requirement:{
        type :String,
        required : true
    },
    salery:{
        type :Number,
        required : true
    },
    location:{
        type :String,
        required : true
    },
    jobType:{
        type :String,
        required : true
    },
    postion:{
        type : String,
        required : true
    },
    company :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company',
        required : true
    },
    createdby:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    application:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Application'
        }
    ]
},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema);