import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
    password:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
    firstName:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
    email:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
    profilePicture:{
        type:String,
        default:""
    },
    myFavorites:{
        type:Array,
        default:[]
    }
});

const User =  mongoose.model("User",userSchema);
export default User