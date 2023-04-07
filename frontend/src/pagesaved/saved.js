import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar.js"
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'

export default function Saved() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("DETAILS"))
        {
            navigate("/");
        }
    });
    
    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']

    const [account, setAccount] = useState();

    async function test()
    {
        const response=await fetch("http://localhost:4000/details/getallsaved",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username:uname})
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            // console.log("got all saved posts")
        }
        else
        {
            console.log("error in getting all saved posts")
        }

        return data
    }

    useEffect(() => {
        test().then(data => setAccount(data.data))
    })

    // console.log(account)

    return (
    <React.Fragment>
        <Navbar />
        <br></br><br></br>
        <h2>Saved posts page</h2>
        {account && account.map((acc,index) => <Part account={acc}/>)}
    </React.Fragment>
    );
}

function Part({account}) {

    // console.log(account)

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

    const handleDelete = async() => {
        const response=await fetch("http://localhost:4000/details/desave",
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
            console.log("Deleted from Saved Post")
        }
        else
        {
            console.log("error in Deleted from saved post")
        }
    }

    const handleFollow = async() => {
        const response=await fetch("http://localhost:4000/ffs/add",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({follower:account.postedby.username,following:uname})
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

    return(
        <React.Fragment>
            <br></br>
            <br></br>
            <CCard style={{ width: "20%" }}>
                <CCardBody>
                    <br></br>
                    <CCardText>{account.text}</CCardText>
                    {/* <CCardText>{account.postedin}</CCardText> */}
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
                        onClick={handleDelete}>
                        Delete Post
                    </CButton>
                    <br></br>
                    <CButton
                        onClick={handleFollow}>
                        Follow
                    </CButton>
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}
