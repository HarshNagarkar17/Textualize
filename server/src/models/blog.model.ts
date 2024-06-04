import mongoose from "mongoose";

const {Schema} = mongoose;

const blogSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
      }
},{
    timestamps:true
})

export const blogModel = mongoose.model("Blogs",blogSchema);
