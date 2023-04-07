import React, { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../navbar/navbar.js"
import { Form, Input, ButtonToolbar, Button } from 'rsuite';
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'

export default function MySub() {
    const navigate = useNavigate();

    const [newsub,setNewsub]=useState(false);
    const [details,setDetails]=useState({
        creator:'',
        name:'',
        description:'',
        tags:'',
        banned:'',
    })

    
    useEffect(() => {
        if(!localStorage.getItem("DETAILS"))
        {
            navigate("/");
        }
        else
        {
            const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
            const username=accesslocal['name']
            // console.log(username)
            // setDetails({...details,[creater]:username})
            const x = {...details}
            x.creator = username
            setDetails(x)
        }
    },[newsub]);

    const handleCreate = () => {
        setNewsub(!newsub)
    }

    const handleSubmit = async () => {
        const response=await fetch("http://localhost:4000/subgres/add",
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
        setDetails({...details,[name]:value.toLowerCase()});
    }

    const [account, setAccount] = useState();

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']

    async function test()
    {
        const response=await fetch("http://localhost:4000/subgres/getmyall",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username:uname})
        });

        const data=await response.json();

        if(response.ok)
        {
            // console.log("got all my sub greddit")
        }
        else
        {
            console.log("error in getting all my sub greddit")
        }

        return data
    }

    useEffect(() => {
        test().then(data => setAccount(data.all))
    })

    return (
    <React.Fragment>
        <Navbar />
        <br></br><br></br>
        <h1>My Sub Greddiits page</h1>
        <ButtonToolbar>
            {newsub && 
                <Button 
                    appearance="primary"
                    onClick={handleSubmit}
                    disabled={
                        !details.name ||
                        !details.creator ||
                        !details.description}>
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
                <Form.ControlLabel>Name</Form.ControlLabel>
                <input 
                    name="name" 
                    value={details.name}
                    onChange={enterSomething}/>
                <Form.HelpText tooltip>Only lower case.</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="name-6">
                <Form.ControlLabel>Description</Form.ControlLabel>
                <input 
                    name="description" 
                    value={details.description}
                    onChange={enterSomething}/>
                    <Form.HelpText tooltip>Only lower case.</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="name-6">
                <Form.ControlLabel>Tags</Form.ControlLabel>
                <input 
                    name="tags" 
                    value={details.tags}
                    onChange={enterSomething}/>
                    <Form.HelpText tooltip>Only lower case.</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="name-6">
                <Form.ControlLabel>Banned key words</Form.ControlLabel>
                <input 
                    name="banned" 
                    value={details.banned}
                    onChange={enterSomething}/>
                    <Form.HelpText tooltip>Only lower case.</Form.HelpText>
            </Form.Group>
        </Form>
        )}

        {!newsub && (
            account && account.map((acc,index) => <Part name={acc.name} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length}/>)
        )}

    </React.Fragment>
    );
}


function Part({name,desc,ban,numberoffollow})
{
    const handleRemove = async() => {
        const response=await fetch("http://localhost:4000/subgres/deletesubgr",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({accname:name})
        });

        if(response.ok)
        {
            console.log("deleted sub greddit")
        }
        else
        {
            console.log("error in deleting my sub greddit")
        }
    }

    const navigate = useNavigate();

    const handleOpen = () => {
        navigate(`/mysub/${name}`)
    }

    return (
        <React.Fragment>
            <br></br>
            <br></br>
            <CCard style={{ width: "20%" }}>
                <CCardBody>
                    <CCardTitle>{name}</CCardTitle>
                    <br></br>
                    <CCardText>{desc}</CCardText>
                    <CCardText>{numberoffollow}</CCardText>
                    <CCardText>{ban.join()}</CCardText>
                    <CButton
                        onClick={handleOpen}>
                        Open
                    </CButton>
                    <CButton
                        onClick={handleRemove}>
                        Delete
                    </CButton>
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}