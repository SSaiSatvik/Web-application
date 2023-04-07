const Details= require('../models/Userdetails.js');
const Subgre=require('../models/Greddiit.js')

const add = async (req,res) => {
    
    // console.log(req.body.tags)
    let var1;
    let var2;
    try{
        var1=req.body.tags.split(/\s+/)
    }
    catch(error)
    {
        console.log(error)
    }
    try{
        var2=req.body.banned.split(/\s+/)
    }
    catch(error)
    {
        console.log(error)
    }
    
    // console.log(var1)
    const updatevar=new Subgre({
        creator:req.body.creator,
        name:req.body.name,
        description:req.body.description,
        tags:var1,
        banned:var2
    })
    
    let follow1;
    try
    {
        follow1=await Details.findOne({username:req.body.creator})
        // console.log(follow1)
    }
    catch(error)
    {
        console.log(error)
    }

    updatevar.follow.push(follow1)

    try
    {
        await updatevar.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"created new subgrediit page",updatevar})
}

exports.add=add;

const getallmy = async(req,res) => {
    const exisistingUsername=req.body.username;

    const all=await Subgre.find({creator:exisistingUsername})

    return res.status(200).json({all})
}

exports.getallmy=getallmy;

const getall = async(req,res) => {

    const all=await Subgre.find()

    return res.status(200).json({all})
}

exports.getall=getall;

const subgrdelete = async(req,res) => {
    const gr= await Subgre.findOne({name:req.body.accname})

    try
    {
        await gr.delete()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"deleted subgrediit page"})
}

exports.subgrdelete=subgrdelete;

const subspecific = async(req,res) => {
    const gr= await Subgre.findOne({name:req.body.greddiit})

    if(gr)
    {
        return res.status(200).json(gr)
    }
    else
    {
        return res.status(400).json({message:"doesn't exist"})
    }
}

exports.subspecific=subspecific;

const joinreq = async(req,res) => {
    const gr= await Subgre.findById(req.body.gredit_id)

    const exuser=await Details.findById(req.body.user_id)
    // console.log(exuser._id)
    const leftindex=gr.left.indexOf(exuser._id)
    if(leftindex!=-1)
    {
        return res.status(200).json({message:"already joined and left .so cannot join now"})
    }

    const index=gr.tryfollow.indexOf(exuser._id)
    // console.log(index)
    if(index==-1)
    {
        gr.tryfollow.push(exuser)
    }

    try
    {
        await gr.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"sent joining request"})
}

exports.joinreq=joinreq;

const leavereq = async(req,res) => {
    const gr= await Subgre.findById(req.body.gredit_id)

    const index=gr.follow.indexOf(req.body.user_id)

    if(index!=-1)
    {
        gr.follow.splice(index,1);
        gr.left.push(req.body.user_id)
    }
    else
    {
        return res.status(400).json({message:"error in finding the user in follower of subgredit"})
    }

    try
    {
        await gr.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"sent leaving request"})
}

exports.leavereq=leavereq;

const getalljoiningreq = async(req,res) => {
    const gr= await Subgre.findOne({name:req.body.name})
    
    const all=gr.tryfollow;

    return res.status(200).json({all})
}

exports.getalljoiningreq=getalljoiningreq;

const acceptjoiningreq = async(req,res) => {
    const gr= await Subgre.findOne({name:req.body.name})
    
    const exuser=await Details.findById(req.body.id)

    const index=gr.tryfollow.indexOf(exuser._id)

    gr.tryfollow.splice(index,1)

    gr.follow.push(exuser)

    try
    {
        await gr.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"accepted"})
}

exports.acceptjoiningreq=acceptjoiningreq;

const rejectjoiningreq = async(req,res) => {
    const gr= await Subgre.findOne({name:req.body.name})
    
    const exuser=await Detail.findById(req.body.id)

    const index=gr.tryfollow.indexOf(exuser._id)

    gr.tryfollow.splice(index,1)

    try
    {
        await gr.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"rejected"})
}

exports.rejectjoiningreq=rejectjoiningreq;

const getallusers = async(req,res) => {
    const gr= await Subgre.findOne({name:req.body.name})
    const all=gr.follow;

    return res.status(200).json({all})
}

exports.getallusers=getallusers;