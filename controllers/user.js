import User from "../models/User.js";

export const getUser = async (req,res) => {
    try{
        const {id} = req.params;
        const user = User.findById(id);
        delete user.password;
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json({error:err.message})
    }
}

export const getFavorites = async (req,res) => {
    try{
        const {id} = req.params;
        const user = User.findById(id);
        return res.status(200).json({myFavorites:user.myFavorites});
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

export const addRemoveFavorites = async (req,res) => {
    try{
        const {id,movieName} = req.params;
        const user = await User.findById(id);
        let includes = user.myFavorites.includes(movieName);
        if (includes){
            user.myFavorites.push(movieName);
        }
        else{
            for (let i=0;i< user.myFavorites.length;i++){
                if (user.myFavorites[i]==movieName){
                    user.myFavorites.splice(i,1)
                }
            }
        }
        user.save();
        delete user.password
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}