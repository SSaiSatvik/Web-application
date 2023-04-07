const express=require('express')
const router=express.Router()

const greditfunctions=require('./greditfunctions.js')

router.post("/add",greditfunctions.add)
router.post("/getmyall",greditfunctions.getallmy)
router.get("/getall",greditfunctions.getall)
router.post("/deletesubgr",greditfunctions.subgrdelete)
router.post("/getspecific",greditfunctions.subspecific)
router.post("/joinreq",greditfunctions.joinreq)
router.post("/leavereq",greditfunctions.leavereq)
router.post("/getalljoiningreq",greditfunctions.getalljoiningreq)
router.post("/acceptjoiningreq",greditfunctions.acceptjoiningreq)
router.post("/rejectjoiningreq",greditfunctions.rejectjoiningreq)
router.post("/getallusers",greditfunctions.getallusers)

module.exports=router