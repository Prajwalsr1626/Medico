import React from "react";
import Home from "./Home/Home";
import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import Dashbord from "./Dashbord/Dashbord";
 export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      authenticated:false,
      loading:true
    };
  }

  render(){
    return(
             <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/Dashbord" element={<Dashbord/>}/>
             </Routes>
    )
  }
}
