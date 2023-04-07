import React, { useState,useEffect } from "react"
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'

export default function Following() {

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']
    // console.log(uname)
    let data;

    const [varff,setVarff]=useState(0)

    const [refresh,setRefresh]=useState(false)

    const [ff,setFF]=useState()

    async function test()
    {
        const response=await fetch("http://localhost:4000/ffs/getfollowings",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username:uname})
        });

        data=await response.json();
        // console.log(data)
        
        if(response.ok)
        {
            // console.log("got following list")
        }
        else
        {
            console.log("didn't got following list")
        }

        return data
    }

    useEffect(() => {
        test().then(() =>  {setVarff(data.length);setFF(data)});
        setRefresh(false)
    });

    // console.log(varff)

    return (
    <React.Fragment>
        <div className='ShowBookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='display-4 text-center'>Following List</h2>
                    </div>
                </div>
                <div className='list'>
                    {varff && (
                        ff && ff.map((name) => (<Indiviualing name={name.following}/>))
                    )}
                    {!varff && <h4>there is no one following</h4>}
                </div>
            </div>
        </div>
    </React.Fragment>
    );
}

function Indiviualing({name})
{
    const handle = async() =>{
        const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
        const uname=accesslocal['name']
        const response=await fetch("http://localhost:4000/ffs/deleteff",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({following:name,follower:uname})
        });
        
        if(response.ok)
        {
            console.log("deleted")
        }
        else
        {
            console.log("error in deleting")
        }
    }

    return (
        <React.Fragment>
            <br></br>
            <br></br>
            <CCard style={{ width: "20%" }}>
                <CCardBody>
                    <CCardTitle>{name}</CCardTitle>
                    <button
                            onClick={handle}>
                        Unfollow
                    </button>
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}