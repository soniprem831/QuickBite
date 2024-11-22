import mongoose from "mongoose";

 export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://premsoni8838:prem12345@cluster0.1rkrd.mongodb.net/').then(()=>console.log("DB connected"));
}
