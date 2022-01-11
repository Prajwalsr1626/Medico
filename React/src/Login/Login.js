import React from "react";
import { Navigate } from 'react-router-dom';
export default class Login extends React.Component{

    constructor(){
        super()
        this.state = {
            regmsg : '',
            loginmsg : '',
            loginstatus : false
        }
    }
    login = (event)=>{
        var ob = {
            hospitalid : this.lhospitalid.value,
            password: this.lpassword.value,
        }
        console.log(this.setState.loginstatus)
        fetch(`http://localhost:8082/Hospital/loginHospital`,{
            method : 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(ob)
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            this.setState({regmsg:data.data})
            if(data.msg===200){
            this.setState({loginstatus:true})
            }
            
        });;
        console.log(this.state.loginstatus)
        console.log(ob)
        event.preventDefault()
    }

    render(){
        if(this.state.loginstatus){
            return(
            <Navigate to={"/Dashbord"}/> )
        }
        return(
            <div class="tab-pane fade show" id="admin" role="tabpanel" aria-labelledby="profile-tab">
            <h3  class="register-heading">Hospital Login</h3>
            <form method="post"  onSubmit={this.login} action="">
            <div class="row register-form">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" ref={c=>this.lhospitalid=c} name="hospitalid" id="hospitalid" placeholder="Hospital ID *" required/>
                    </div>

                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input ref={c=>this.lpassword=c} type="password" class="form-control" placeholder="Password *" id="password" name="password"  required/>
                    </div>
                    
                    <input type="submit" class="btnRegister" name="adsub" value="Login"/>
                </div>
                <b style={{color:"red"}}>{this.state.regmsg}</b>
            </div>
        </form>
        </div>
        )
    }

}