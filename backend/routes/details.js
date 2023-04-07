const express=require('express')
const router=express.Router()

const functions=require('./functions.js')

router.get('/test', (req, res) => {
    res.send('book route testing!')
    console.log('avhgbs')
});

router.post("/register",functions.adddetails)
router.post("/login",functions.checkdetails)
router.get("/authentication-verify",functions.verifyauth)
router.get("/getuserdetails",functions.getuserdetails)
router.post("/updateuserdetails",functions.updateuserdetails)
router.post("/save",functions.saved)
router.post("/desave",functions.desave)
router.post("/getallsaved",functions.getsave)
router.post("/getdetailswithid",functions.getdetailswithid)
router.post("/getdetailswithusername",functions.getwithusername)


module.exports=router

