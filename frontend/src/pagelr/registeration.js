import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import "./registeration.css"

export default function Registeration(props) {
    const navigate=useNavigate();

    const [registerdetails,setRegisterdetials]= useState(
        {
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            age:'',
            contactnumber:'',
            password:'',
        }
    );

    const enter = event => {
        const {name,value}=event.target;
        setRegisterdetials({...registerdetails,[name]:value});
    }

    const handlesubmit = event => {
        event.preventDefault();
        further();
    }

    const further = async() => {
        const response=await fetch("http://localhost:4000/details/register",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(registerdetails)
        });

        const data=await response.json();
        // console.log(data)

        if(response.ok)
        {
            console.log("registered")
            props.onChange(false)
        }
        else
        {
            console.log("not registered")
        }
    }
    

    return (
    <React.Fragment>
        <form 
            onSubmit={handlesubmit}
            id="w">
            <label >
                Firstname :
                <input
                    id="c"
                    type="text"
                    name="firstname"
                    value={registerdetails.firstname}
                    onChange={enter}
                    required
                />
            </label>
            <br></br>
            <label >
                Lastname :
                <input
                    id="d"
                    type="text"
                    name="lastname"
                    value={registerdetails.lastname}
                    onChange={enter}
                    required
                />
            </label>
            <br></br>
            <label >
                Username :
                <input
                    id="e"
                    type="text"
                    name="username"
                    value={registerdetails.username}
                    onChange={enter}
                    required
                />
            </label>
            <br></br>
            <label >
                Email ID :
                <input
                    id="f"
                    type="email"
                    name="email"
                    value={registerdetails.email}
                    onChange={enter}
                    required
                />
            </label>
            <br></br>
            <label >
                Age :
                <input
                    id="g"
                    type="number"
                    name="age"
                    value={registerdetails.age}
                    onChange={enter}
                    required
                />
            </label>
            <br></br>
            <label >
                Contact Number :
                <input
                    id="h"
                    type="tel"
                    pattern="[0-9]{10}"
                    name="contactnumber"
                    value={registerdetails.contactnumber}
                    onChange={enter}
                    required
                />
            </label>
            <br></br>
            <label >
                Password :
                <input
                    id="i"
                    type="password"
                    name="password"
                    value={registerdetails.password}
                    onChange={enter}
                    required
                />
            </label>
            <br></br><br></br><br></br>
            <button 
                type="submit"
                id="button2"
                disabled={
                            !registerdetails.firstname || 
                            !registerdetails.lastname || 
                            !registerdetails.username ||
                            !registerdetails.email || 
                            !registerdetails.age || 
                            !registerdetails.contactnumber ||
                            !registerdetails.password
                        }>
                Sign Up
            </button>
        </form>

    </React.Fragment>
    );
}