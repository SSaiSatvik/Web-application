const FF=require('../models/FF.js')
const Detail=require('../models/Userdetails.js')


const add = async (req,res) => {
    let existingUser1;
    let existingUser2;

    try
    {
        const ffin=await FF.findOne({follower:req.body.follower,following:req.body.following})
        // console.log(ffin)
        if(ffin)
        {
            return res.status(200).json({message:"already there in database"})
        }
        
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"error in addind friends list"})
    }

    try
    {
        existingUser1=await Detail.findOne({username:req.body.following})
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of following"})
    }
    try
    {
        existingUser2=await Detail.findOne({username:req.body.follower})
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of follower"})
    }

    if(existingUser1 && existingUser2)
    {
        const updatevar=new FF({
            follower:existingUser2.username,
            following:existingUser1.username,
        })

        try
        {
            await updatevar.save()
        }
        catch(error)
        {
            console.log(error)
        }

        return res.status(200).json({message:"added",updatevar})
    }
}

exports.add=add;

const deleteff = async (req,res) => {
    let existingff;
    
    try
    {
        existingff=await FF.findOne({
                                        following:req.body.following,
                                        follower:req.body.follower,
                                    })
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of following or follower"})
    }

    if(existingff)
    {
        try
        {
            await existingff.delete()
        }
        catch(error)
        {
            console.log(error)
        }

        return res.status(200).json({message:"deleted"})
    }
}

exports.deleteff=deleteff;

const followerff = async (req,res) => {
    let existingff;
    try
    {
        existingff=await FF.find({following:req.body.username})
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name"})
    }
    return res.status(200).json(existingff)
}

exports.followerff=followerff;

const followingff = async (req,res) => {
    let existingff;
    try
    {
        existingff=await FF.find({follower:req.body.username})
        // console.log(existingff)
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name"})
    }
    return res.status(200).json(existingff)
}

exports.followingff=followingff;
