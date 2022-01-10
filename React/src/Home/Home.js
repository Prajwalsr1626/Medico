import React from "react";
//import Register from "../Register/Register";

export default class Home extends React.Component{
    constructor(){
        super()
         this.state = {
            regmsg : '',
            loginmsg : ''
        }
    }
    register = (event)=>{
        var ob = {
            hospitalid : this.hospitalid.value,
            hospitalname : this.hospitalname.value,
            contact:this.contact.value*1,
            address : this.address.value,
            password: this.password.value,
        }
        fetch(`http://localhost:8082/Hospital/addHospital`,{
            method : 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(ob)
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            this.setState({regmsg:data.data})
        });;
        console.log(ob)
        event.preventDefault()
    }
    login = (event)=>{
        var ob = {
            hospitalid : this.lhospitalid.value,
            password: this.lpassword.value,
        }
        fetch(`http://localhost:8082/Hospital/loginHospital`,{
            method : 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(ob)
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            this.setState({regmsg:data.data})
        });;
        console.log(ob)
        event.preventDefault()
    }

    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" >
    <div class="container">

      <a class="navbar-brand js-scroll-trigger" href="#" style={{marginTop: "10px",marginLeft:"-65px",fontFamily: 'IBM Plex Sans'}} ><h4><i class="fa fa-user-plus" aria-hidden="true"></i> MEDICO</h4></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" style={{marginRight: "40px"}}>
            <a class="nav-link js-scroll-trigger" href="index.php" style={{color: "white",fontFamily: 'IBM Plex Sans'}}><h6>HOME</h6></a>
          </li>
  
          <li class="nav-item" style={{marginRight:"40px"}}>
            <a class="nav-link js-scroll-trigger" href="services.html" style={{color: "white",fontFamily: 'IBM Plex Sans'}}><h6>ABOUT US</h6></a>
          </li>

          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="contact.html" style={{color: "white",fontFamily: 'IBM Plex Sans'}}><h6>CONTACT</h6></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

	

<div class="container register" style={{fontFamily: 'IBM Plex Sans'}}>
                <div class="row">
                    <div class="col-md-3 register-left" style={{marginTop:" 10% ",right:" 5%"}}>
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                       
                    </div>
                    <div class="col-md-9 register-right" style={{marginTop:" 40px" ,left: "80px"}}>
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist" style={{width: "60%"}}>
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Patient</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Hosptial Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Hosptial Login</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Register as Patient</h3>
                                <form method="post" action="func2.php">
                                <div class="row register-form">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control"  placeholder="First Name *" name="fname"  onkeydown="return alphaOnly(event);" required/>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Your Email *" name="email"  />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" id="password" name="password" onkeyup='check();' required/>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="maxl">
                                                <label class="radio inline"> 
                                                    <input type="radio" name="gender" value="Male" checked/>
                                                    <span> Male </span> 
                                                </label>
                                                <label class="radio inline"> 
                                                    <input type="radio" name="gender" value="Female"/>
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                            <a href="index1.php">Already have an account?</a>
                                        </div>
                                    </div>
                                
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name *" name="lname" onkeydown="return alphaOnly(event);" required/>
                                        </div>
                                        
                                        <div class="form-group">
                                            <input type="tel" minlength="10" maxlength="10" name="contact" class="form-control" placeholder="Your Phone *"  />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control"  id="cpassword" placeholder="Confirm Password *" name="cpassword"  onkeyup='check();' required/><span id='message'></span>
                                        </div>
                                        <input type="submit" class="btnRegister" name="patsub1" value="Register"/>
                                    </div>

                                </div>
                            </form>
                            </div>

                            
                            <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3  class="register-heading">Register the Hospital</h3>
                                <form method="post" onSubmit={this.register} action="">
                                <div class="row register-form">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control"  ref={c=>this.hospitalid=c} name="hospitalid" id="hospitalid" placeholder="Hospital ID *" required/>
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control"  ref={c=>this.contact=c} name="contact" id="contact" placeholder="Contact Number" required />
                                        </div>
                                        <div class="form-group">
                                            <input ref={c=>this.password=c} type="password" class="form-control" placeholder="Password *" id="password" name="password"  required/>
                                        </div>
                                        
    
                                    </div>
                                
                                    <div class="col-md-6">
                                        <div class="form-group">
                                        <input type="text" class="form-control"  ref={c=>this.hospitalname=c} name="hospitalname" id="hospitalname" placeholder="Hospital Name" />
                                        </div>
                                        
                                        <div class="form-group">
                                            <input type="text" ref={c=>this.address=c} name="address" id="address" placeholder="Address" required class="form-control"   />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" ref={c=>this.cpassword=c}  class="form-control"  id="cpassword" placeholder="Confirm Password *" name="cpassword"  onkeyup='check();' required/><span id='message'></span>
                                        </div>
                                        <input type="submit" class="btnRegister" name="patsub1"  value="Register"/>
                                    </div>
                                    <b style={{color:"red"}}>{this.state.regmsg}</b>
                                </div>
                            </form>
                            </div>


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
                        </div>

                    </div>
                </div>

            </div>

            </div>
        )
    }

}