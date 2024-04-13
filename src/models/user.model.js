import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
  },
 fullname: {
        type: String,
        required: true,
  trim: true,
        index: true,
    },
  Avatar: {
        type: String, //cloudnary service will be use 
        required: true,
 },
 coverimage: {
        type: String,//cloudnary url

    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "video"
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshtoken: {
        type: String
    },

}, 
{ timestamps: true })


userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
 return await bcrypt.compare(password ,this.password)
}

userSchema.methods.generateAccessToken = function (){
   return jwt.sign(
        {
            _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
expiresIn:process.env.ACCESS_TOKEN_EXPIRY 
        }
    )

}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
         {
             _id:this._id,
    
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
 expiresIn:process.env.REFRESH_TOKEN_EXPIRY 
         }
     )

 }
userSchema.methods.generateRefreshToken = function (){}

export const User = mongoose.model("User", userSchema)