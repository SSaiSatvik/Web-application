import React, { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../navbar/navbar.js"
import { Form, Input, ButtonToolbar, Button } from 'rsuite';
import './subname.css'
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'

export default function Subname() {
    const { name } =useParams()

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("DETAILS"))
        {
            navigate("/");
        }
    });

    return (
    <React.Fragment>
        <Navbar />
        <div class="split left">
            <div class="centered">
                <Left />
            </div>
        </div>
        <div class="split right">
            <div class="centered">
                <Right />
            </div>
        </div>
    </React.Fragment>
    );
}

function Left() {
    const { name } =useParams()

    const [desc,setDesc]=useState("")

    async function test()
    {
        const response=await fetch("http://localhost:4000/subgres/getspecific",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({greddiit:name})
        });
        
        const data=await response.json()
        setDesc(data.description)

        if(response.ok)
        {
            console.log("fetched")
        }
        else
        {
            console.log("error in fetching")
        }
    }

    useEffect(() => {
        test();
    },[])

    return(
        <React.Fragment>
            <div class='pic'>
            </div>
            <h1>{name}</h1>
            <h2>{desc}</h2>
        </React.Fragment>
    )
}

function Right() {
    const [newsub,setNewsub]=useState(false);

    const { name } =useParams()

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']

    const [details,setDetails]=useState({
        text:'',
        in:name,
        by:uname,
    })

    const [account, setAccount] = useState();

    async function test()
    {
        const response=await fetch("http://localhost:4000/posts/getallposts",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({name:name})
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("got all posts")
        }
        else
        {
            console.log("error in getting all posts")
        }

        return data
    }

    useEffect(() => {
        test().then(data => setAccount(data.all))
    },[newsub])

    const handleCreate = () => {
        setNewsub(!newsub)
    }

    const handleSubmit = async () => {
        const response=await fetch("http://localhost:4000/posts/add",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(details)
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("submitted from for new sub greddit")
            setNewsub(!newsub)
        }
        else
        {
            console.log("error in handling submit")
        }
    }
    
    const handleCancel = () => {
        setNewsub(!newsub)
    }

    const enterSomething = event => {
        const {name,value}=event.target;
        setDetails({...details,[name]:value});
    }   

    return(
        <React.Fragment>
            <ButtonToolbar>
            {newsub && 
                <Button 
                    appearance="primary"
                    onClick={handleSubmit}
                    disabled={
                        !details.text ||
                        !details.in ||
                        !details.by}>
                        Save
                </Button>}
            {newsub && 
                <Button 
                    appearance="default"
                    onClick={handleCancel}>
                        Cancel
                </Button>}
            {!newsub && 
                <Button 
                    appearance="primary"
                    onClick={handleCreate}>
                        Create
                </Button>}
            </ButtonToolbar>

            {newsub && (
                <Form layout="horizontal">
                    <Form.Group controlId="name-6">
                        <Form.ControlLabel>Text</Form.ControlLabel>
                        <input 
                            name="text" 
                            value={details.text}
                            onChange={enterSomething}/>
                    </Form.Group>
                </Form>
                )
            }

        {account?.map((acc,index) => <Part account={acc}/>)}
        
        </React.Fragment>
    )
}

function Part({account}) {

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']

    const handleUP = async() => {
        const response=await fetch("http://localhost:4000/posts/like",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:account._id,liked:uname})
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("upvoted")
        }
        else
        {
            console.log("error in upvoted")
        }
    }

    const handleDOWN = async() => {
        const response=await fetch("http://localhost:4000/posts/dislike",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:account._id,liked:uname})
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("downvoted")
        }
        else
        {
            console.log("error in downvoted")
        }
    }

    const handleSave = async() => {
        const response=await fetch("http://localhost:4000/details/save",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:account._id,username:uname})
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("Saved Post")
        }
        else
        {
            console.log("error in saving post")
        }
    }

    const handleFollow = async() => {
        // console.log(account.postedby)

        const response1=await fetch("http://localhost:4000/details/getdetailswithid",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:account.postedby})
        });

        const data1=await response1.json();
        // console.log(data1)

        const response2=await fetch("http://localhost:4000/ffs/add",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({following:data1.username,follower:uname})
        });

        const data2=await response2.json();
        // console.log(data2)

        if(response2.ok)
        {
            console.log("Added to following")
        }
        else
        {
            console.log("error in following the person")
        }
    }

    const [clickreport,setClickreport] = useState(false)

    const handleReport = async() => {
        setClickreport(true)
    }

    const [conserninput,setConcern] = useState("")

    const enter = event => {
        setConcern(event.target.value);
    }

    const handlesubmit = async() => {
        const response=await fetch("http://localhost:4000/reports/report",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({postid:account._id,name:uname,text:conserninput,time:new Date()})
        });

        const data=await response.json();
        console.log(data)

        if(response.ok)
        {
            console.log("Reported")
        }
        else
        {
            console.log("error in reporting")
        }
    }

    const [allcomments,setAllcomments]=useState([])
    const [commentshow,setCommentshow]=useState(false)

    const showComments = () => {
        setCommentshow(!commentshow)
        setAllcomments(account.comments)
    }

    const [createcomment,setCreatecomment]=useState(false)

    const addComment= () => {
        setCreatecomment(!createcomment)
    }

    const [usercomment,setUsercomment]=useState("")

    const handlesubmitcomment = async(req,res) => {
        const response=await fetch("http://localhost:4000/posts/addcomment",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({postid:account._id,name:uname,text:usercomment})
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("Commented")
        }
        else
        {
            console.log("error in commenting")
        }
    }
    
    const entercomment = event => {
        setUsercomment(event.target.value)
    }

    const [postedbyuser,setuserposted]=useState("")

    async function test()
    {
        const response=await fetch("http://localhost:4000/posts/getname",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({detail:account.postedby,postid:account._id})
        });
        
        const data=await response.json()
        // console.log(data)
        setuserposted(data.name)

        if(response.ok)
        {
            // console.log("got username of the post")
        }
        else
        {
            console.log("error in getting username of the post")
        }
    }

    useEffect(() => {
        test();
    },[])


    return(
        <React.Fragment>
            <br></br>
            <br></br>
            <div class='card'>
            <CCard 
                style={{ width: "20%" }}>
                <CCardBody>
                    <br></br>
                    <CCardText>{account.text}</CCardText>
                    <CCardText>posted by : {postedbyuser}</CCardText>
                    <br></br>
                    <CButton
                        onClick={handleUP}>
                        Upvote
                    </CButton>
                    <CButton
                        onClick={handleDOWN}>
                        Downvote
                    </CButton>
                    <br></br>
                    <br></br>
                    <CButton
                        onClick={handleSave}>
                        Save Post
                    </CButton>
                    <br></br>
                    <CButton
                        onClick={handleFollow}>
                        Follow
                    </CButton>
                    <br></br>
                    <CButton
                        onClick={handleReport}>
                        Report
                    </CButton>
                    { clickreport && (
                                        <form
                                            onSubmit={handlesubmit}>
                                            <label >
                                                Concern:
                                                <input
                                                    type="text"
                                                    name="conserninput"
                                                    value={conserninput}
                                                    onChange={enter}
                                                    required
                                                />
                                            </label>
                                            <button 
                                                type="submit"
                                                disabled={!conserninput}>
                                                Report
                                            </button>
                                        </form>
                    )}
                    <br></br>
                    <br></br>
                    <CButton
                        onClick={showComments}>
                        Show Comments
                    </CButton>
                    <br></br>
                    {
                        commentshow &&  allcomments?.map((comm) => <Comment det={comm}/>)
                    }
                    {
                        commentshow &&  (<CButton
                                            onClick={addComment}>
                                            Comment
                                        </CButton>)
                    }
                    {
                        commentshow && createcomment && (
                                                            <form
                                                                onSubmit={handlesubmitcomment}>
                                                                <label >
                                                                    Comment:
                                                                    <input
                                                                        type="text"
                                                                        name="usercomment"
                                                                        value={usercomment}
                                                                        onChange={entercomment}
                                                                        required
                                                                    />
                                                                </label>
                                                                <button 
                                                                    type="submit"
                                                                    disabled={!usercomment}>
                                                                    Submit Comment
                                                                </button>
                                                            </form>
                                                        )
                    }
                </CCardBody>
            </CCard>
            </div>
        </React.Fragment>
    )
}

function Comment({det})
{
    // console.log(det)

    const [text,setText]=useState("")
    const [name,setName]=useState("")

    async function test()
    {
        const response=await fetch("http://localhost:4000/posts/getcommentdetails",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({details:det})
        });
        
        const data=await response.json()
        setText(data.text)
        setName(data.by)

        if(response.ok)
        {
            console.log("got comment details")
        }
        else
        {
            console.log("error in getting comment details")
        }
    }

    useEffect(() => {
        test();
    },[])

    return(
        <React.Fragment>
            <p>{text}</p>
            <p>by: {name}</p>
            <br></br>
        </React.Fragment>
    )
}
