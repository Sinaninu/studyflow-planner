import User from "../models/User.js";

// GET ALL USERS (/api/users)
export const getUsers = async (req,res)=>{
    try {
        const users = (await User.find()).sort({name: 1});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch users!'});
    }
};