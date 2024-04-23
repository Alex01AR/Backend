 import {asynchandler} from "../utils/asynchandler.js"

 const registerUser  = asynchandler(async (req,res) => {
    res.status(210).json({message:"ok"})
 })




 export {registerUser}