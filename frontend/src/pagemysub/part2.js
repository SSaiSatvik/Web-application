import React, { useState,useEffect } from "react"
import { useParams } from "react-router-dom";
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'

export default function Part2() {
    const { name } =useParams()

    const [account,setAccount]=useState([]);

    async function test()
    {
        const response=await fetch("http://localhost:4000/subgres/getalljoiningreq",
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
            // console.log("got all joining request")
        }
        else
        {
            console.log("error in getting all joining request")
        }

        return data
    }

    useEffect(() => {
        test().then(data => setAccount(data.all))
    })

    // console.log(account)

    return(
        <React.Fragment>
            {account?.map((acc) => <Part det={acc}/>)}
        </React.Fragment>
    )
}

function Part({det}){
    const { name } =useParams()

    const [account,setAccount]=useState();

    async function test()
    {
        const response=await fetch("http://localhost:4000/details/getdetailswithid",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:det,name:name})
        });

        const data=await response.json();
        // console.log(data)
        if(response.ok)
        {
            // console.log("got joining request person")
        }
        else
        {
            console.log("error in getting joining request person")
        }

        return data
    }

    useEffect(() => {
        test().then(data => setAccount(data.username))
    },[])

    const handleAccept = async() => {
        const response=await fetch("http://localhost:4000/subgres/acceptjoiningreq",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:det,name:name})
        });

        const data=await response.json();
        // console.log(data)
        if(response.ok)
        {
            console.log("accepted joining request person")
        }
        else
        {
            console.log("error in accepting joining request person")
        }
    }

    const handleReject = async() => {
        const response=await fetch("http://localhost:4000/subgres/rejectjoiningreq",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:det})
        });

        const data=await response.json();
        // console.log(data)
        if(response.ok)
        {
            console.log("rejected joining request person")
        }
        else
        {
            console.log("error in rejecting joining request person")
        }
    }

    return(
        <React.Fragment>
            <br></br>
            <br></br>
            <CCard style={{ width: "20%" }}>
                <CCardBody>
                    <br></br>
                    <CCardText>{account}</CCardText>
                    <CButton
                        onClick={handleAccept}>
                        Accept
                    </CButton>
                    <CButton
                        onClick={handleReject}>
                        Reject
                    </CButton>
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}