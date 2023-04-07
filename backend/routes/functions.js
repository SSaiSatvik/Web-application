const Detail=require('../models/Userdetails.js')
const bcrypt=require('bcryptjs')
const tockenfun=require('jsonwebtoken')
const Posts = require('../models/Posts.js')
const KEY="It_is_not_the_key"
const awaketime="1d"


const adddetails = async (req,res) => {
    let existingUser
    try
    {
        existingUser=await Detail.findOne({username:req.body.username})
    }
    catch(error)
    {
        console.log(error)
    }
    if(existingUser)
    {
        return res.status(400).json({message:"Already there....Just login"})
    }
    
    const codedpass=bcrypt.hashSync(req.body.password)

    const user=new Detail({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        age:req.body.age,
        email:req.body.email,
        contactnumber:req.body.contactnumber,
        password:codedpass,
    })

    try
    {
        await user.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"registered new user"})
}

exports.adddetails=adddetails;

const checkdetails = async (req,res) => {
    let existingUser
    try
    {
        existingUser=await Detail.findOne({username:req.body.username})
    }
    catch(error)
    {
        console.log(error)
    }

    if(!existingUser)
    {
        return res.status(400).json({message:"Not valid username....login first"})
    }

    const verifypass=bcrypt.compareSync(req.body.password,existingUser.password)
    if(!verifypass)
    {
        return res.status(400).json({message:"Wrong password"})
    }
    else
    {
        const token=tockenfun.sign({id:existingUser._id},KEY,{expiresIn:awaketime})
        return res.status(200).json({message:"Login done",token,existingUser})
    }
}

exports.checkdetails=checkdetails;

const verifyauth = async (req,res) => {
    const token=await req.headers.authorization.split(" ")[1]
    const decodedtoken=await tockenfun.verify(String(token),KEY,(error,user) => {
        if(error)
        {
            res.status(400).json({message:"not authorised"})
        }
        else
        {
            // console.log(user)
            const userid=user.id
            return res.status(200).json({message:"authorised"})
        }
    })
}

exports.verifyauth=verifyauth;

const getuserdetails = async (req,res) => {
    const token=await req.headers.authorization.split(" ")[1]
    const decodedtoken=await tockenfun.verify(String(token),KEY)
    const userid=decodedtoken.id
    let existingUser
    existingUser=await Detail.findOne({_id:userid})

    return res.status(200).json(existingUser)
}

exports.getuserdetails=getuserdetails;

const updateuserdetails = async (req,res) => {
    const existingUser=await Detail.findOne({username:req.body.username})

    existingUser.firstname=req.body.firstname
    existingUser.lastname=req.body.lastname
    existingUser.age=req.body.age
    existingUser.email=req.body.email
    existingUser.contactnumber=req.body.contactnumber

    try
    {
        await existingUser.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({existingUser})
}

exports.updateuserdetails=updateuserdetails

const saved = async(req,res) => {
    const existingUser=await Detail.findOne({username:req.body.username})

    const tobesaved=await Posts.findById(req.body.id)

    const index=existingUser.saved.indexOf(tobesaved._id)

    // console.log(index)

    if(index==-1)
    {
        existingUser.saved.push(tobesaved)
    }
    else
    {
        return res.status(200).json({message:"already done"})
    }

    try
    {
        await existingUser.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({existingUser})
}

exports.saved=saved;

const desave = async(req,res) => {
    const existingUser=await Detail.findOne({username:req.body.username})

    const tobedesaved=await Posts.findById(req.body.id)

    const index=existingUser.saved.indexOf(tobedesaved._id)

    // console.log(index)

    if(index!=-1)
    {
        existingUser.saved.splice(index,1)
    }
    else
    {
        return res.status(200).json({message:"didn't find post in saved"})
    }

    try
    {
        await existingUser.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({existingUser})
}

exports.desave=desave;

const getsave = async(req,res) => {
    const existingUser=await Detail.findOne({username:req.body.username})
    let data=[];

    for(const iterator in existingUser.saved)
    {
        var detailpost=await Posts.findById(existingUser.saved[iterator])
        if(detailpost)
        {
            data.push(detailpost)
        }
        // console.log(detailpost)
    }

    // console.log(data )

    return res.status(200).json({data})
}

exports.getsave=getsave;

const getdetailswithid = async(req,res) => {
    const existingUser=await Detail.findById(req.body.id)

    return res.status(200).json(existingUser)
}

exports.getdetailswithid=getdetailswithid;

const getwithusername = async(req,res) => {
    const existingUser=await Detail.findOne({username:req.body.username})

    return res.status(200).json(existingUser)
}

exports.getwithusername=getwithusername;