import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login() {
    const navigate=useNavigate();

    const [loginname,setLoginname]= useState("")
    const [loginpass,setLoginpass]= useState("")  

    const enterUsername = event =>
    {
        setLoginname(event.target.value);
    }
    const enterPassword = event =>
    {
        setLoginpass(event.target.value);
    }

    const handlesubmit = async event =>
    {
        event.preventDefault();

        const response=await fetch("http://localhost:4000/details/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username:loginname,
                password:loginpass
            })
        });

        const data=await response.json();
        const usr=data.existingUser;
        // console.log(data)
        // console.log(usr)

        if(response.ok)
        {
            console.log("login")
            const declare={"token":data.token,"name":usr.username}
            console.log(declare)
            localStorage.setItem('DETAILS',JSON.stringify(declare))
            navigate("/profile")
        }
        else
        {
            console.log("may be wrong password")
            setLoginpass("")
        }
    }

    return (
    <React.Fragment>
        <form 
            id="q"
            onSubmit={handlesubmit}>
            <label >
                Username :
                <input
                    id="a"
                    type="text"
                    name="loginname"
                    value={loginname}
                    onChange={enterUsername}
                    required
                />
            </label>
            <br></br>
            <label >
                Password :
                <input
                    id="b"
                    type="password"
                    name="loginpass"
                    value={loginpass}
                    onChange={enterPassword}
                    required
                />
            </label>
            <br></br><br></br>
            <button 
                type="submit"
                id="button1"
                disabled={
                            !loginpass || 
                            !loginname
                        }>
                Sign In
            </button>
        </form>
    </React.Fragment>
    );
}