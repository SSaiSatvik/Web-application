import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Nav } from "rsuite";
import { Check, Edit, FolderFill, Page, Tag, Task } from "@rsuite/icons";
import "rsuite/dist/rsuite.min.css";
import './navbar.css'

export default function Navbar() {
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate("/profile");
    }
    const handleSaved = () => {
        navigate("/saved");
    }
    const handleMysub = () => {
        navigate("/mysub");
    }
    const handleSuball = () => {
        navigate("/allsub");
    }
    const handleLogout = () => {
        localStorage.removeItem("DETAILS")
        navigate("/");
    }
    return (
    <React.Fragment>
        <Nav>
            <Nav.Item 
                icon={<Task />}
                onSelect={handleProfile}>
                    Profile 
            </Nav.Item>
            <Nav.Item 
                icon={<FolderFill />}
                onSelect={handleSaved}>
                    Saved Posts
            </Nav.Item>
            <Nav.Item 
                icon={<Check />}
                onSelect={handleMysub}>
                    My Sub Grediit page
            </Nav.Item>
            <Nav.Item 
                icon={<Tag />}
                onSelect={handleSuball}>
                    Sub Grediit page
            </Nav.Item>

            <Nav.Item 
                onSelect={handleLogout}
                id="logout">
                    LOGOUT
            </Nav.Item>
        </Nav>
    </React.Fragment>
    );
}