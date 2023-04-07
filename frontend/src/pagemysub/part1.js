import React, { useState,useEffect } from "react"
import { useParams } from "react-router-dom";
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'

export default function Part1() {
    const { name } =useParams()

    const [account,setAccount]=useState([]);

    async function test()
    {
        const response=await fetch("http://localhost:4000/subgres/getallusers",
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

    

    return(
        <React.Fragment>
            <br></br>
            <br></br>
            <CCard style={{ width: "20%" }}>
                <CCardBody>
                    <br></br>
                    <CCardText>{account}</CCardText>
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}