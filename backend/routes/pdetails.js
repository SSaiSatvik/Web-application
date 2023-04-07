const express=require('express')
const router=express.Router()

const functions=require('./pfunctions.js')

router.post("/add",functions.addpost)
router.post("/getallposts",functions.getallposts)
router.post("/like",functions.upvote)
router.post("/dislike",functions.downvote)
router.post("/addcomment",functions.addcomment)
router.post("/getcommentdetails",functions.getcomment)
router.post("/getname",functions.getname)


module.exports=router

