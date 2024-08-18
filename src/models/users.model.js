import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const userSchema=new Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    username:{
        type:String,
        required: true,
        lowercase:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required: true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:['true',"Password is required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPassCorrect=async function(password){
        return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username:this.username,
        fullname:this.fullname
    }
    )
}
userSchema.methods.generateRefreshToken=function(){}
export const Users=mongoose.model("Users",userSchema)


