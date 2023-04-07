import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar.js"
import { TagPicker,SelectPicker } from 'rsuite'
import { Card, Input } from 'semantic-ui-react'
import {CCard,CButton,CCardText,CCardTitle,CCardBody} from '@coreui/react'
// import '@coreui/coreui/scss/_card.scss'

export default function Suball() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("DETAILS"))
        {
            navigate("/");
        }
    });

    const [totalData, settotalData] = useState([])
    const [filteredhaveResults, setFilteredhaveResults] = useState([]);
    const [filtereddonthaveResults, setFiltereddonthaveResults] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [mydetails,setMydetails]=useState()

    const accesslocal=JSON.parse(localStorage.getItem("DETAILS"))
    const uname=accesslocal['name']

    async function getdetails()
    {
        const response=await fetch("http://localhost:4000/details/getdetailswithusername",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username:uname})
        });

        const data=await response.json();
        // console.log(data)
        if(response.ok)
        {
            console.log("got my details")
        }
        else
        {
            console.log("error in getting my details")
        }

        return data
    }

    const [first,setFirst]=useState(false)

    useEffect(() => {
        getdetails().then(data => {
                                    setMydetails(data)
                                    setFirst(true)
        })
    },[])

    async function test()
    {
        const response=await fetch("http://localhost:4000/subgres/getall",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        });

        const data=await response.json();
        // console.log(data)
        if(response.ok)
        {
            console.log("got all sub greddit")
        }
        else
        {
            console.log("error in getting all sub greddit")
        }

        return data
    }
    
    useEffect(() => {
        test().then(data => settotalData(data.all))
    }, [])

    // console.log(totalData)

    useEffect(() => {
        if(first)
        {
            if (searchInput !== '') 
            {
                const filteredData = totalData.filter((item) =>  {
                    if(item.name.includes(searchInput))
                    {
                        return true
                    }
                })

                const have=filteredData.filter((wasted) => {return wasted.follow.includes(mydetails._id)})
                const doesnthave=filteredData.filter((wasted) => {return !wasted.follow.includes(mydetails._id)})
                setFilteredhaveResults(have)
                setFiltereddonthaveResults(doesnthave)
            }
            else
            {
                const have=totalData.filter((wasted) => {return wasted.follow.includes(mydetails._id)})
                const doesnthave=totalData.filter((wasted) => {return !wasted.follow.includes(mydetails._id)})
                setFilteredhaveResults(have)
                setFiltereddonthaveResults(doesnthave)
            }
        }
    })

    const updatesearchvalue = (event) => {
        setSearchInput(event.target.value)
    }

    // const check = () => 
    // {
    //     console.log(filteredResults)
    // }

    // console.log(filtereddonthaveResults)

    const sortoption = ['Name in Ascending', 'Name in Descending', 'Number of Followers in Descending', 'Creation date of the Sub Grediitt'].map(
        item => ({ label: item, value: item })
    );

    const [selectedOption, setSelectedOption] = useState('');
    const [aftersorthavedata,setAftersorthavedata]=useState([]);
    const [aftersortdonthavedata,setAftersortdonthavedata]=useState([])

    const sortData = () => {

        let sortedData;

        if(selectedOption==='Name in Ascending')
        {
            sortedData=[...filteredhaveResults].sort((a,b) => a.name > b.name ? 1 : -1)
            setAftersorthavedata(sortedData)
            sortedData=[...filtereddonthaveResults].sort((a,b) => a.name > b.name ? 1 : -1)
            setAftersortdonthavedata(sortedData)
        }
        else if (selectedOption==='Name in Descending')
        {
            sortedData=[...filteredhaveResults].sort((a,b) => b.name > a.name ? 1 : -1)
            setAftersorthavedata(sortedData)
            sortedData=[...filtereddonthaveResults].sort((a,b) => b.name > a.name ? 1 : -1)
            setAftersortdonthavedata(sortedData)
        }
        else if (selectedOption==='Number of Followers in Descending')
        {
            sortedData=[...filteredhaveResults].sort((a,b) => b.follow.length > a.follow.length ? 1 : -1)
            setAftersorthavedata(sortedData)
            sortedData=[...filtereddonthaveResults].sort((a,b) => b.follow.length > a.follow.length ? 1 : -1)
            setAftersortdonthavedata(sortedData)
        }
        else if (selectedOption==='Creation date of the Sub Grediitt')
        {
            sortedData=[...filteredhaveResults].sort((a,b) => b.createddate > a.createddate ? 1 : -1)
            setAftersorthavedata(sortedData)
            sortedData=[...filtereddonthaveResults].sort((a,b) => b.createddate > a.createddate ? 1 : -1)
            setAftersortdonthavedata(sortedData)
        }
    };
    
    useEffect(() => {
        sortData();
    }, [selectedOption]);

    const [selectedTags, setSelectedTags] = useState([]);

    const [afterfilterhavedata,setAfterfilterhavedata]=useState([]);
    const [afterfilterdonthavedata,setAfterfilterdonthavedata]=useState([])

    const alltags=totalData.flatMap((item) => item.tags)
    const uniquetags=alltags.filter((item,index) => {
                                                            if (item.trim() === '') 
                                                            {
                                                                return false;
                                                            }
        
                                                            return alltags.indexOf(item) === index;
    })

    // console.log(uniquetags)

    const filteroptions = uniquetags.map((item) => ({ value: item, label: item }));

    const [filteredOption, setFilteredOption] = useState([]);

    useEffect(() => {
        applyfilteronData();
    });

    const applyfilteronData = () => {
        let afterfilter

        // console.log(filteredOption)

        if(filteredOption.length)
        {
            // console.log(1)

            if(selectedOption)
            {
                afterfilter=aftersorthavedata.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterhavedata(afterfilter)

                afterfilter=aftersortdonthavedata.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterdonthavedata(afterfilter)
            }
            else
            {
                afterfilter=filteredhaveResults.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterhavedata(afterfilter)

                afterfilter=filtereddonthaveResults.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterdonthavedata(afterfilter)
            }
        }
        else
        {
            // console.log(2)
            if(selectedOption)
            {
                // afterfilter=aftersorthavedata.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterhavedata(aftersorthavedata)

                // afterfilter=aftersortdonthavedata.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterdonthavedata(aftersortdonthavedata)
            }
            else
            {
                // afterfilter=filteredhaveResults.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterhavedata(filteredhaveResults)

                // afterfilter=filtereddonthaveResults.filter((item) => filteredOption.every((tag) => item.tags.includes(tag)))
                // console.log(afterfilter)
                setAfterfilterdonthavedata(filtereddonthaveResults)
        }
    }
}  


    return (
    <React.Fragment>
        <Navbar />
        <br></br><br></br>
        <h2>Sub Greddiits page</h2>
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
                onInput={updatesearchvalue}
            />

            <TagPicker 
                data={filteroptions} 
                placeholder="Filter"
                size="s"
                style={{ width: 224 }} 
                onChange={(value) => {setFilteredOption(value)}}
            />

            <SelectPicker 
                placeholder="Sort"
                data={sortoption}
                onChange={(value) => {setSelectedOption(value)}} 
                style={{ width: 224 }} 
            />
            
            {/* {!selectedOption && !filteredOption&& (filteredhaveResults.map((acc) => <Part name={acc.name} user__id={mydetails._id} id={acc._id} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length} f={0}/>))}
            {!selectedOption && !filteredOption&& (filtereddonthaveResults.map((acc) => <Part name={acc.name} user__id={mydetails._id} id={acc._id} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length} f={1}/>))}

            {selectedOption && !filteredOption&& (aftersorthavedata.map((acc) => <Part name={acc.name} user__id={mydetails._id} id={acc._id} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length} f={1}/>))}
            {selectedOption && !filteredOption&& (aftersortdonthavedata.map((acc) => <Part name={acc.name} user__id={mydetails._id} id={acc._id} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length} f={1}/>))} */}

            {(afterfilterhavedata.map((acc) => <Part name={acc.name} user__id={mydetails._id} id={acc._id} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length} f={1}/>))}
            {(afterfilterdonthavedata.map((acc) => <Part name={acc.name} user__id={mydetails._id} id={acc._id} desc={acc.description} ban={acc.banned} numberoffollow={acc.follow.length} f={1}/>))}
        </div>
    </React.Fragment>
    )

}

function Part({name,id,user__id,desc,ban,numberoffollow,f})
{
    // console.log(user__id)
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate(`/sub/${name}`)
    }

    const handleJoin = async() => {
        const response=await fetch("http://localhost:4000/subgres/joinreq",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({gredit_id:id,user_id:user__id})
        });

        const data=await response.json();
        console.log(data)

        if(response.ok)
        {
            console.log("join resquest sent")
        }
        else
        {
            console.log("error in sending join resquest")
        }
    }

    const handleLeave = async() => {
        const response=await fetch("http://localhost:4000/subgres/leavereq",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({gredit_id:id,user_id:user__id})
        });

        const data=await response.json();
        console.log(data)
        if(response.ok)
        {
            console.log("left sub greddit and cannot join again")
        }
        else
        {
            console.log("error in leavinging sub greddit")
        }

        window.location.reload()
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
                    {!f && 
                        (<CButton
                            onClick={handleLeave}>
                            Leave
                        </CButton>)
                    }
                    {f && 
                        (<CButton
                            onClick={handleJoin}>
                            Join
                        </CButton>)
                    }
                </CCardBody>
            </CCard>
        </React.Fragment>
    )
}