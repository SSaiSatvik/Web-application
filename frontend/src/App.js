import React, { useState } from "react"
import {BrowserRouter,Routes,Route,useParams} from "react-router-dom";
import Login from "./pagelr/login.js"
import Registeration from "./pagelr/registeration.js"
import Profile from "./pageprofile/profile.js"
import MySub from "./pagemysub/mysub.js"
import Suball from "./pageallsub/sub.js"
import Saved from "./pagesaved/saved.js"
import MySubname from './pagemysub/mysubname.js'
import Subname from './pageallsub/subname.js'
import "./App.css"

export default function App()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppI/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/mysub" element={<MySub/>}/>
          <Route path="/mysub/:name" element={<MySubname />}/>
          <Route path="/allsub" element={<Suball/>}/>
          <Route path="/sub/:name" element={<Subname />}/>
          <Route path="/saved" element={<Saved/>}/>
        </Routes>
      </BrowserRouter>
    </>
);
}

function AppI()
{
  const [log,setLog]=useState(false);
  const [reg,setReg]=useState(false);
  
  function handleChildupdatereg(newval){
    setReg(newval);
  }

  const handlelogin = () => {
    setReg(false);
    setLog(!log);
  };
  const handleregisteration = () => {
    setReg(!reg);
    setLog(false);
  };
  return (
    <React.Fragment>
      <div class='body'>
        <br></br><br></br>
        <button class="button" onClick={handlelogin}>
          Login
        </button>
        <button class="button" onClick={handleregisteration}>
          Registeration
        </button>
        <br></br><br></br><br></br><br></br>
        
        {
          log && <Login />
        }
        {
          reg && <Registeration value={reg} onChange={handleChildupdatereg}/>
        }
      </div>
    </React.Fragment>
  );
}

