import { ApiError } from "../utils/apierror.js"
// import { asynchandler } from "../utils/asynchandler.js"
import {asynchandler }from "../utils/asynchandler.js"
import { User } from "../models/user.model.js"
import { cloudinary } from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js"


const registerUser = asynchandler(async (req, res) => {


  const { fullName, email, username, password } = req.body

  // console.log("email: ", email);

  // if(fullName === ""){
  //   throw new ApiError(400,"FULLNMAE IS REQUIRED")
  // }

  if (
    [fullName, email, username, password].some((field) => (field?.trim() === ""))
    
  )
  {
    throw new ApiError(400, "All IS REQUIRED")
  }
  const existedUser =await User.findOne({$or:[{username} , {email}]

})
if(existedUser){
  throw new ApiError(409,"User with email or  username alredy existed")
}

   const avatarlocalpath = res.files?.avatar[0]?.path;

   const coverImage = res.files?.coverImage[0]?.path;

   if(!avatarlocalpath){
    throw new ApiError(400,"Avatar img required")
   }

   const avatar = await cloudinary(avatarlocalpath)
  
   const coverimg = await cloudinary(coverImage)
if(!avatar){
  throw new ApiError(400,"avatar is required cloudnary")
}

const user = await User.create({
  fullName,
  avatar:avatar.url,
  coverimage:coverimg?.url || "",
  email,
  password,
  username: username.toLowerCase()

})


 const createduser = User.findById(user._id).select(
  "-password -refreshtoken"
 )

 if(!createduser){
  throw new ApiError(500,"something went wrong during registering user")
 }
 
 return res.status(201).json(
  new Apiresponse(200,createduser,"user registerd successfully")
 )
  })





export {
  registerUser
}