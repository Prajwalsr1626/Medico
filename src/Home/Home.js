import React from "react";
import Register from "../Register/Register";

export default class Home extends React.Component{

    render(){
        return(
            <div>
                <h1>Home</h1>
                <div>
                    <Register></Register>
                </div>
            </div>
        )
    }

}