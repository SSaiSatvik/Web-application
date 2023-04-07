const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Detail=require('./Userdetails.js')

const CommentSchema=new Schema({
    text: {
        type:String,
        required:true,
    },
    commentedby : {
        type:Schema.Types.ObjectId,
        ref:'Detail',
        required:true,
    },
});

module.exports=mongoose.model("Comment",CommentSchema)
