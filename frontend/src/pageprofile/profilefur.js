import React, { useState,useEffect } from "react"
import Follower from "./followerpart.js"
import Following from "./followingpart.js"

export default function Profilefurther() {

    const [followernum,setfollowernum]=useState(false);
    const [followingnum,setfollowingnum]=useState(false);

    const [numberooffollower,setNumberooffollower]=useState(0)
    const [numberooffollowing,setNumberooffollowing]=useState(0)

    const clickfollower = () => {
        setfollowingnum(false);
        setfollowernum(!followernum);
    };
    const clickfollowing = () => {
        setfollowingnum(!followingnum);
        setfollowernum(false);
    };

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']

    async function test()
    {
        const response1=await fetch("http://localhost:4000/ffs/getfollowers",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({details:uname}),
        });

        const data1=await response1.json();
        // console.log(data1)
        setNumberooffollower(data1.length)
        if(response1.ok)
        {
            console.log("got number of followers")
        }
        else
        {
            console.log("error in getting number of followers")
        }

        const response2=await fetch("http://localhost:4000/ffs/getfollowings",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({details:uname}),
        });

        const data2=await response2.json();
        // console.log(data2)
        setNumberooffollowing(data2.length)
        if(response2.ok)
        {
            console.log("got number of followings")
        }
        else
        {
            console.log("error in getting number of followeings")
        }
    }

    useEffect(() => {
        test();
    })

    return(
    <React.Fragment>
        <h1>Profile Page</h1>
        <button
            type="submit"
            onClick={clickfollower}
            >
                Followers : {numberooffollower}
        </button>
        <button
            type="submit"
            onClick={clickfollowing}
            >
                Following : {numberooffollowing}
        </button>
        {
            followernum ? <Follower /> : null
        }
        {
            followingnum ? <Following /> : null
        }
        
    </React.Fragment>
    )
}
