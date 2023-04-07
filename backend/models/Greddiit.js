const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Detail=require('./Userdetails.js')

const subgreditSchema=new Schema({
    name: {
        type:String,
        required:true,
        unique:true,
    },
    description: {
        type:String,
        required:true,
    },
    tags: {
        type:[String],
        required:true,
    },
    banned: {
        type:[String],
        required:true,
    },
    creator: {
        type:String,
        required:true,
    },
    follow: [
        {
            type:Schema.Types.ObjectId,
            ref:'Detail',
        }
    ],
    left: [
        {
            type:Schema.Types.ObjectId,
            ref:'Detail',
        }
    ],
    tryfollow: [
        {
            type:Schema.Types.ObjectId,
            ref:'Detail',
        }
    ],
    createddate: {
        type:Date,
        required:true,
        default: () => Date.now(),
        immutable: true,
    },
});

module.exports=mongoose.model("Subgre",subgreditSchema)
