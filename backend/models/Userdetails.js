const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Post=require('./Posts.js')

const userdetailsSchema=new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    contactnumber: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    saved: [
        {
            type:Schema.Types.ObjectId,
            ref:'Post',
        }
    ],
});

module.exports=mongoose.model("Detail",userdetailsSchema)
