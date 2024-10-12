import mongoose,{ Document, Schema, Model, Types } from "mongoose";

interface IUser extends Document{
    name:string,
    email:string,
    password:string,
}


const userSchema:Schema<IUser> = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel:Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User',userSchema)

export default userModel;






