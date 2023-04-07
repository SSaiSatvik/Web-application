const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ffSchema=new Schema({
    follower: {
        type:String,
        required:true,
    },
    following: {
        type:String,
        required:true,
    },
});

module.exports=mongoose.model("FF",ffSchema)
