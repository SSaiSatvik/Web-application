const Report=require('../models/Reported.js')
const Subgre=require('../models/Greddiit.js')
const Post=require('../models/Posts.js')
const Detail=require('../models/Userdetails.js')

const getallreportsofgrediitt = async(req,res) => {
    // console.log(req.body.name)
    const sub=await Subgre.findOne({name:req.body.name})
    const all=await Report.find({relatedsub:sub._id})
    return res.status(200).json({all})
}

exports.getallreportsofgrediitt=getallreportsofgrediitt;

const getdetailswithid = async(req,res) => {

    const all=await Report.findById(req.body.id)
    const concern=all.concern
    const action=all.action

    const reportedby=await Detail.findById(all.reportedby)
    const byname=reportedby.username

    const reportedto=await Detail.findById(all.reportedto)
    const toname=reportedto.username

    const reportedpost=await Post.findById(all.relatedpost)
    const text=reportedpost.text
    const reporteddate=all.reporteddate
    
    return res.status(200).json({concern,byname,toname,text,action,reporteddate})
}

exports.getdetailswithid=getdetailswithid;

const ignore = async(req,res) => {

    const rep=await Report.findById(req.body.id)

    rep.action=3

    try
    {
        await rep.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"ignored"})
}

exports.ignore=ignore;

const deleter = async(req,res) => {
    const rep=await Report.findById(req.body.id)

    const postid=rep.relatedpost
    const post=await Post.findById(postid)

    const allrep=await Report.find({relatedpost:postid})
    console.log(allrep)
    try
    {
        for(const iterator in allrep)
        {
            await allrep[iterator].delete()
        }

        await post.delete()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"deleted"})
}

exports.deleter=deleter;

const block = async(req,res) => {
    const rep=await Report.findById(req.body.id)

    rep.action=2

    try
    {
        await rep.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"blocked"})
}

exports.block=block;

const report = async(req,res) => {
    const post=await Post.findById(req.body.postid)

    const by=await Detail.findOne({username:req.body.name})

    const rep=new Report({
                            reportedby:by._id,
                            reportedto:post.postedby,
                            relatedpost:post._id,
                            relatedsub:post.postedin,
                            concern:req.body.text,
                            action:0,
                            reporteddate:req.body.time,
    })

    try
    {
        await rep.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"report added"})
}

exports.report=report;

const expired = async(req,res) => {
    const rep=await Report.findById(req.body.id)

    if(!rep.action)
    {
        try
        {
            await rep.delete()
        }
        catch(error)
        {
            console.log(error)
        }

        return res.status(200).json({message:"report expired"})
    }
    else
    {
        return res.status(200).json({message:"no need to expire"})
    }
}

exports.expired=expired;
