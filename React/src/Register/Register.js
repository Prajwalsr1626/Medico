import React from "react";

export default class Register extends React.Component{

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

    render(){
        return(
            
                            
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

        )
    }

}