const Post=require('../models/Posts.js')
const Subgre=require('../models/Greddiit.js')
const Detail=require('../models/Userdetails.js')
const Comment=require('../models/Comments.js')
const Report=require('../models/Reported.js')

const addpost = async (req,res) => {
    let existinguser;
    try
    {
        existinguser=await Detail.findOne({username:req.body.by})
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of the posted person"})
    }

    let subgreddiit;
    try
    {
        subgreddiit=await Subgre.findOne({name:req.body.in})
        banned=subgreddiit.banned

        const text=req.body.text.toLowerCase()
        const textwords=text.split(/\s+/);
        let flag=0;

        for(const iterator in banned)
        {
            const index=textwords.indexOf(banned[iterator])
            if(index!=-1)
            {
                flag=1;
            }
        }

        // console.log(flag)

        var newtext=""
        if(flag)
        {
            newtext="* "+req.body.text+" *"
        }
        else
        {
            newtext=req.body.text
        }
        
        // console.log(newtext)
        // console.log(subgreddiit)
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of the posted greddiit"})
    }

    const updatevar=new Post({
        text:newtext,
        postedby:existinguser,
        postedin:subgreddiit,
    })

    try
    {
        await updatevar.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json({message:"posted",updatevar})
}

exports.addpost=addpost;

const getallposts = async (req,res) => {

    let subgreddiit;
    try
    {
        subgreddiit=await Subgre.findOne({name:req.body.name})
        // console.log(subgreddiit)
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of the posted greddiit"})
    }

    const all=await Post.find({postedin:subgreddiit})
    // console.log(all)

    return res.status(200).json({all})
}

exports.getallposts=getallposts;

const upvote = async (req,res) => {

    const posttobe=await Post.findById(req.body.id)

    let userliked;
    try
    {
        userliked=await Detail.findOne({username:req.body.liked})
        // console.log(userliked.username)
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of the user"})
    }

    // console.log(posttobe.upvotes)
    // console.log(userliked)

    const index=posttobe.upvotes.indexOf(userliked._id);
    // console.log(index)
    if(index==-1)
    {
        posttobe.upvotes.push(userliked)
    }
    else
    {
        
        posttobe.upvotes.splice(index,1)
    }

    try
    {
        await posttobe.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json(posttobe)
}

exports.upvote=upvote;

const downvote = async (req,res) => {

    const posttobe=await Post.findById(req.body.id)

    let userdisliked;
    try
    {
        userdisliked=await Detail.findOne({username:req.body.liked})
        // console.log(userdisliked.username)
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({message:"NOT a valid name of the user"})
    }

    // console.log(posttobe.downvotes)
    // console.log(userdisliked)

    const index=posttobe.downvotes.indexOf(userdisliked._id);

    // console.log(index)

    if(index==-1)
    {
        posttobe.downvotes.push(userdisliked)
    }
    else
    {
        
        posttobe.downvotes.splice(index,1)
    }

    try
    {
        await posttobe.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json(posttobe)
}

exports.downvote=downvote;

const addcomment = async (req,res) => {

    const postis = await Post.findById(req.body.postid)

    const commentuser= await Detail.findOne({username:req.body.name})

    const com=new Comment(
        {
            text:req.body.text,
            commentedby:commentuser._id,
        }
    )
    
    console.log(com)

    try
    {
        await com.save()
    }
    catch(error)
    {
        console.log(error)
    }

    postis.comments.push(com._id)

    try
    {
        await postis.save()
    }
    catch(error)
    {
        console.log(error)
    }

    return res.status(200).json(postis)
}

exports.addcomment=addcomment;

const getcomment = async (req,res) => {

    const commentis = await Comment.findById(req.body.details)
    // console.log(commentis)
    const userid=commentis.commentedby
    const user = await Detail.findById(userid)

    const text=commentis.text
    const by=user.username

    return res.status(200).json({text,by})
}

exports.getcomment=getcomment;

const getname = async (req,res) => {

    const postis=await Post.findById(req.body.postid)

    const reports=await Report.find({relatedpost:req.body.postid})

    let flag=0;

    for(const iterator in reports)
    {
        if(reports[iterator].action==2)
        {
            flag=1;
        }
    }

    const user=await Detail.findById(req.body.detail)

    let name=user.username

    if(flag)
    {
        name='Blocked User'
    }

    return res.status(200).json({name})
}

exports.getname=getname;