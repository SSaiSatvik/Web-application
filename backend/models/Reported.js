const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Detail=require('./Userdetails.js')
const Subgre=require('./Greddiit.js')
const Post=require('./Posts.js')

const reportSchema=new Schema({
    reportedby: {
        type:Schema.Types.ObjectId,
        ref:'Detail',
        required:true,
    },
    reportedto: {
        type:Schema.Types.ObjectId,
        ref:'Detail',
        required:true,
    },
    relatedpost: {
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    relatedsub: {
        type:Schema.Types.ObjectId,
        ref:'Subgre',
        required:true,
    },
    concern: {
        type:String,
        required:true,
    },
    action: {
        type:Number,
        required:true,
        default:0,
    },
    //1 if block,2 if delete,3 if ignore.
    reporteddate: {
        type:Date,
        required:true,
    }
});

module.exports=mongoose.model("Report",reportSchema)
