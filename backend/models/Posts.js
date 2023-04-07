const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Detail=require('./Userdetails.js')
const Subgre=require('./Greddiit.js')
const Comment=require('./Comments.js')

const postSchema=new Schema({
    text: {
        type:String,
        required:true,
    },
    postedby: {
        type:Schema.Types.ObjectId,
        ref:'Detail',
        required:true,
    },
    postedin: {
        type:Schema.Types.ObjectId,
        ref:'Subgre',
        required:true,
    },
    upvotes: [
        {
            type:Schema.Types.ObjectId,
            ref:'Detail'
        }
    ],
    downvotes: [
        {
            type:Schema.Types.ObjectId,
            ref:'Detail'
        }
    ],
    comments: [
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
});

module.exports=mongoose.model("Post",postSchema)
