import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        min:2
    },
    itemPicturePath:{
        type:Array,
        required:true,
        default:[]
    },
    description:{
        type:Object,
        required:true
    }
})