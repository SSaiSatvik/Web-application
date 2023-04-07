const express=require('express')
const router=express.Router()

const FFfunctions=require('./fffunctions.js')

router.post("/add",FFfunctions.add)
router.post("/deleteff",FFfunctions.deleteff)
router.post("/getfollowers",FFfunctions.followerff)
router.post("/getfollowings",FFfunctions.followingff)


module.exports=router


