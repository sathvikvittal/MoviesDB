import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req,res) => {
    try{
        const {
            username,
            firstName,
            lastName,
            email,
            picturePath,
            password
        } = req.body
        // console.log(username,
        //     firstName,
        //     lastName,
        //     email,
        //     picturePath,
        //     password)

        // console.log(req.body);

        const obj = {
            username,
            password,
            firstName,
            lastName,
            email,
            picturePath,
            myFavorites:[]
        }

        const isUserPresent = await User.findOne({$or:[{username:username},{email:email}]});

        if (isUserPresent){
            return res.status(400).json({error:"Username/email already exists"});
        }

        const newUser = new User(obj);

        const savedUser = await newUser.save();
        delete obj.password
        res.status(200).json(obj);
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

export const login = async (req,res) => {
    try{
        const {
            username,
            password
        } = req.body

        const user = await User.findOne({username:username});
        if (!user) {
            return res.status(400).json({error:"Invalid username/password"});
        }
        else{
            if (password !== user.password){
                return res.status(400).json({error:"Invalid username/password"})
            }
            else{
                const token = jwt.sign({id:user._id},process.env.SECRET);
                user.password="";
                return res.status(200).json({user,token})

            }
        }

    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}