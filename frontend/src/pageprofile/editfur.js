import React, { useState,useEffect } from "react"
import { Form, Input, ButtonToolbar, Button } from 'rsuite';

export default function Editfurther(props) {
    
    const [edit,setEdit]=useState(false)

    const [details,setDetails]= useState(
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
    
    useEffect (() => 
    {
        async function test()
        {
            const response=await fetch("http://localhost:4000/details/getuserdetails",
            {
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${props.value}`,
                }
            });

            const data=await response.json();
            setDetails(prev => ({
                ...prev,
                firstname:data.firstname,
                lastname:data.lastname,
                username:data.username,
                age:data.age,
                password:data.password,
                contactnumber:data.contactnumber,
                email:data.email,
            }))
        }
        test();
    },[edit])


    const handleEdit = () => {
        setEdit(!edit)
    }

    const handleSubmit = async () => {
        const response=await fetch("http://localhost:4000/details/updateuserdetails",
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
            console.log("handled submit")
            setEdit(!edit)
        }
        else
        {
            console.log("error in handling submit")
        }
    }
    
    const handleCancel = () => {
        setEdit(!edit)
    }

    const enterSomething = event => {
        const {name,value}=event.target;
        setDetails({...details,[name]:value});
    }

    return(
    <React.Fragment>  
        <br></br><br></br>
        <h2> EDIT DETAILS</h2>
        <br></br><br></br>
        <Form layout="horizontal">
            <Form.Group controlId="name-6">
                <Form.ControlLabel>Username</Form.ControlLabel>
                <input 
                    name="username" 
                    value={details.username}
                    disabled/>
            </Form.Group>
            <Form.Group controlId="name-6">
                <Form.ControlLabel>Firstname</Form.ControlLabel>
                <input 
                    name="firstname" 
                    value={details.firstname}
                    disabled={!edit}
                    onChange={enterSomething}/>
            </Form.Group>
            <Form.Group controlId="name-6">
                <Form.ControlLabel>Lastname</Form.ControlLabel>
                <input 
                    name="lastname" 
                    value={details.lastname}
                    disabled={!edit}
                    onChange={enterSomething}/>
            </Form.Group>
            <Form.Group controlId="email-6">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <input 
                    name="email" 
                    type="email" 
                    value={details.email}
                    disabled={!edit}
                    onChange={enterSomething}/>
            </Form.Group>
            <Form.Group controlId="number-6">
                <Form.ControlLabel>Age</Form.ControlLabel>
                <input 
                    name="age" 
                    type="number" 
                    value={details.age}
                    disabled={!edit}
                    onChange={enterSomething}/>
            </Form.Group>
            <Form.Group controlId="number-6">
                <Form.ControlLabel>Contact Number</Form.ControlLabel>
                <input 
                    name="contactnumber" 
                    type="number"
                    pattern="[0-9]{10}" 
                    value={details.contactnumber}
                    disabled={!edit}
                    onChange={enterSomething}/>
            </Form.Group>

            
            <ButtonToolbar>
                {edit && <Button 
                    appearance="primary"
                    onClick={handleSubmit}
                    disabled={
                        !details.firstname || 
                        !details.lastname || 
                        !details.username ||
                        !details.email || 
                        !details.age || 
                        !details.contactnumber ||
                        !details.password
                    }>Save</Button>}
                {edit && <Button 
                    appearance="default"
                    onClick={handleCancel}>Cancel</Button>}
                {!edit && <Button 
                    appearance="primary"
                    onClick={handleEdit}>Edit</Button>}
            </ButtonToolbar>
    
        </Form>
    </React.Fragment>    
    )
}