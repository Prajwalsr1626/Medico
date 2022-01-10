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
            <div>
                <div class="form-v6">
	    <div class="page-content">
		<div class="form-v6-content">
			<div class="form-left">
				<img src="images/form-v6.jpg" alt="form" width="500px" height="700px"/>
			</div>
			<form class="form-detail"  onSubmit={this.register} action="">
				<h2>Hosptial Register</h2>
				<div class="form-row">
					<input type="text" ref={c=>this.hospitalid=c} name="hospitalid" id="hospitalid" class="input-text" placeholder="Hospital Id" required/>
				</div>
                
				<div class="form-row">
					<input type="text" ref={c=>this.hospitalname=c} name="hospitalname" id="hospitalname" class="input-text" placeholder="Hospital Name"  />
				</div>
                <div class="form-row">
					<input type="text" ref={c=>this.address=c} name="address" id="address" class="input-text" placeholder="Address" required/>
				</div>
                <div class="form-row">
					<input type="number" ref={c=>this.contact=c} name="contact" id="contact" class="input-text" placeholder="Contact Number" required/>
				</div>
				<div class="form-row">
					<input type="password" ref={c=>this.password=c} name="password" id="password" class="input-text" placeholder="Password" required/>
				</div>
				<b style={{color:"red"}}>{this.state.regmsg}</b>
				<div class="form-row-last">
                <button style={{borderRadius: '9px', border: 'px solid' ,width:'250px' ,height:'50px' }} type="submit" name="register" class="register" value="Register"> Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>
            </div>
        )
    }

}