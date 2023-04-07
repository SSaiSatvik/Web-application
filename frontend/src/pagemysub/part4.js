import React, { useState,useEffect,us } from "react"
import { useParams } from "react-router-dom";
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'
import './part4.css'

export default function Part4() {
    const { name } =useParams()

    const [account,setAccount]=useState([]);

    async function test()
    {
        const response=await fetch("http://localhost:4000/reports/getallreportsofgrediitt",
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
            console.log("error in getting all reports")
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

    const [by,setBy]=useState()
    const [to,setTo]=useState()
    const [concern,setConcern]=useState()
    const [posttext,setPosttext]=useState()
    const [action,setAction]=useState()
    let noofdays=10;
    let datereported;
    let datenow=new Date();

    async function test()
    {
        const response=await fetch("http://localhost:4000/reports/getdetailswithid",
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
            // console.log("got joining request person")
        }
        else
        {
            console.log("error in getting joining request person")
        }

        return data
    }

    async function remove()
    {
        const response=await fetch("http://localhost:4000/reports/expired",
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
            console.log("expired report if no action")
        }
        else
        {
            console.log("error in deleting expired report")
        }
    }

    useEffect(() => {
        test().then(data => {
                                setBy(data.byname)
                                setTo(data.toname)
                                setConcern(data.concern)
                                setPosttext(data.text)
                                setAction(data.action)
                                datereported=data.reporteddate
                                datereported=new Date(datereported)
                                // console.log(datenow)
                                // console.log((datereported))

                                if(datenow-datereported>=(noofdays*24*3600*1000))
                                {
                                    remove();
                                }
                            }
                    )
    },[])

    const handleBlock = async() => {
        console.log("done")
        const response=await fetch("http://localhost:4000/reports/block",
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
            console.log("blocked")
        }
        else
        {
            console.log("error in blocking")
        }
    }

    const handleDelete = async() => {
        console.log("fuck")
        const response=await fetch("http://localhost:4000/reports/delete",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({id:det})
        });

        const data=await response.json();
        console.log(data)
        if(response.ok)
        {
            console.log("deleted")
        }
        else
        {
            console.log("error in deleting")
        }
    }

    const handleIgnore = async() => {
        const response=await fetch("http://localhost:4000/reports/ignore",
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
            setAction(3)
            console.log("ignored")
        }
        else
        {
            console.log("error in ignoring")
        }
    }

    const [but,setasBut]=useState(false)
    const [counter,setCounter]=useState(3)

    var interval
    const handleBlockuser = (e) => {
        setasBut((prev) => true)
        setCounter(3)
        if(counter>0)
        {
            interval=setInterval(() => {
                // console.log('a')
                setCounter((prev) => prev-1)
                
            }, 1000)
        }
    }

    useEffect(() => {
        if(but && counter<=0)
        {
            console.log("a")
            clearInterval(interval)
            setasBut((prev) => false)
            setCounter(3)
            handleBlock()
        }
    })

    const handleCancel = () => {
        clearInterval(interval) 
        setasBut((prev) => false)
        setCounter((prev) => 3)
    }
    

    return(
        <React.Fragment>
            <br></br>
            <br></br>
            <CCard class="ag-courses_item" style={{ width: "20%" }}>
                <CCardBody class="ag-courses-item_link">
                    <div class="ag-courses-item_bg"></div>
                    <CCardText class="ag-courses-item_title">by {by}</CCardText>
                    <CCardText class="ag-courses-item_title">to {to}</CCardText>
                    <CCardText class="ag-courses-item_date-box">text {posttext}</CCardText>
                    <CCardText class="ag-courses-item_date-box">concern {concern}</CCardText>
                    <div class="ag-courses-item_date-box">
                    {!but && (
                        <CButton
                            class="ag-courses-item_date"
                            onClick={handleBlockuser}
                            disabled={!(action-3) || but}>
                            Block User
                        </CButton>
                    )}
                    {but && (
                        <CButton
                            class="ag-courses-item_date"
                            onClick={handleCancel}>
                            Cancel in {counter}s
                        </CButton>
                    )}
                    <CButton
                        class="ag-courses-item_date"
                        onClick={handleDelete}
                        disabled={!(action-3) || but}>
                        Delete Post
                    </CButton>
                    <CButton
                        class="ag-courses-item_date"
                        onClick={handleIgnore}>
                        Ignore
                    </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}