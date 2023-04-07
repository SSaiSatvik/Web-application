import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar.js"
import Profilefurther from "./profilefur.js";
import Editfurther from "./editfur.js"
import './profile.css'

export default function Profile() {
    const navigate = useNavigate();
    const [flickering,setFlickering]=useState(false)

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const token=accesslocal['token']
    useEffect(() => {
        
        if(!localStorage.getItem("DETAILS"))
        {
            navigate("/");
        }
        else
        {
            setFlickering(true)
        }
    });

    useEffect(() => {
        async function test()
        {
            const response=await fetch("http://localhost:4000/details/authentication-verify",
            {
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });

            const data=await response.json();
            
            if(!response.ok)
            {
                console.log("time up...")
                localStorage.removeItem("DETAILS")
                navigate("/");
            }
        }
        test();
    });

    return (
        <React.Fragment>
            <div className='profile'>
                { flickering && <Profilenext value={token}/>}
            </div>
        </React.Fragment>
    );
}

function Profilenext(props){
    const [editactivate,setEdit]=useState(false)

    const handleedit = () =>{
        setEdit(!editactivate);
    }

    return(
        <React.Fragment>
            <Navbar />
            <br></br><br></br>
            <button
                type="submit"
                onClick={handleedit}
                >
                    Edit : Back
            </button>
            {
                !editactivate ? <Profilefurther /> : <Editfurther value={props.value}/>
            }
        </React.Fragment>
    );
}