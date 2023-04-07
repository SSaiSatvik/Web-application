const express=require('express')
const router=express.Router()

const functions=require('./rfunctions.js')

router.post("/getallreportsofgrediitt",functions.getallreportsofgrediitt)
router.post("/getdetailswithid",functions.getdetailswithid)
router.post("/ignore",functions.ignore)
router.post("/delete",functions.deleter)
router.post("/block",functions.block)
router.post("/report",functions.report)
router.post("/expired",functions.expired)


module.exports=router