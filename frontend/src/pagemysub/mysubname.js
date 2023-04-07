import React, { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../navbar/navbar.js"
import { Nav } from 'rsuite'
import Part1 from './part1.js'
import Part2 from './part2.js'
import Part3 from './part3.js'
import Part4 from './part4.js'

export default function MySubname() {
    const { name } =useParams()

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("DETAILS"))
        {
            navigate("/");
        }
    });

    const[check,setCheck]=useState(0)

    const handleN1 = () => {
        setCheck(1)
    }
    const handleN2 = () => {
        setCheck(2)
    }
    const handleN3 = () => {
        setCheck(3)
    }
    const handleN4 = () => {
        setCheck(4)
    }
    return (
    <React.Fragment>
        <Navbar />
        <Nav appearance="subtle">
            <Nav.Item
                onSelect={handleN1}>
                    Users
            </Nav.Item>
            <Nav.Item
                onSelect={handleN2}>
                    Joining
            </Nav.Item>
            <Nav.Item
                onSelect={handleN3}>
                    Stats
            </Nav.Item>
            <Nav.Item
                onSelect={handleN4}>
                    Report
            </Nav.Item>
        </Nav>
        {check===1 && <Part1 />}
        {check===2 && <Part2 />}
        {check===3 && <Part3 />}
        {check===4 && <Part4 />}
    </React.Fragment>
    );
}
