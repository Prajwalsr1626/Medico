import React from "react"
 import { Navigate } from "react-router-dom"
import Store from "../Action/Store"
import {ACTION_PATIENT_LOGOUT , ACTION_PATIENT_UPDATE_TOKEN} from "../Action/PatientAction";

import {connect} from 'react-redux'
var mapStateToProps = state => {
    return {
        Patientd: state.Patient,
    }
  }
class PatientDashbord extends React.Component{

    constructor(){
        super()
         this.state = {
            logoinstatus :false,
            Patient:[]
        }
    }
    
    componentDidMount()
    {
     console.log(this.props.Patientd)
     fetch(`http://localhost:8080/Hospital/getPatient/${this.props.Patientd.token}`)
     .then(response=>response.json()).then(data=>{
       console.log(data)
            if(data.status)
            {
                Store.dispatch({...ACTION_PATIENT_UPDATE_TOKEN,payload:{
                    token : data.token
                }})
                this.setState({Patient:data.data})
                //this.setState({hospitalid:data.data.hospitalid})
            }else{
                if(data.code==401)
                    alert("Invalid User !")
                if(data.code==400)
                    alert("Session Lost !")
                    this.setState({logoinstatus:true})  
                Store.dispatch({...ACTION_PATIENT_LOGOUT})                      
            }
        }); 
        console.log(this.props.Hopital)
    }

    logout = (event)=>{
        this.setState({logoinstatus:true}) 
        Store.dispatch({...ACTION_PATIENT_LOGOUT})
      } 

    render(){
        if(this.state.logoinstatus){
            return(<Navigate to={"/patientlogin"}/>)
        }
        return(<>
        
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
  <a class="navbar-brand" href=""><i class="fa fa-user-plus" aria-hidden="true"></i>MEDICO </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
     <ul class="navbar-nav mr-auto">
       <li class="nav-item">
       <button  onClick={this.logout} name="Login" class="btn btn-primary"> <a class="nav-link"  ><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a></button>
      </li>
       <li class="nav-item">
        <a class="nav-link" href="#"></a>
      </li>
    </ul>
  </div>
</nav>
  
  
  <body style={{paddingTop:"50px"}}>
  
   <div class="container-fluid" style={{marginTop:"50px"}}>
    <h3 style = {{marginLeft: "40%",  paddingBottom: "20px", fontFamily: 'IBM Plex Sans'}}> Welcome  
   </h3>
    <div class="row">
  <div class="col-md-4" style={{maxWidth:"25%", marginTop: "3%"}}>
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action active" id="list-dash-list" data-toggle="list" href="#list-dash" role="tab" aria-controls="home">Dashboard</a>
      <a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Book Appointment</a>
      <a class="list-group-item list-group-item-action" href="#app-hist" id="list-pat-list" role="tab" data-toggle="list" aria-controls="home">Appointment History</a>
      <a class="list-group-item list-group-item-action" href="#list-pres" id="list-pres-list" role="tab" data-toggle="list" aria-controls="home">Prescriptions</a>
      
    </div><br/>
  </div>
  <div class="col-md-8" style={{marginTop: "3%"}}>
    <div class="tab-content" id="nav-tabContent" style={{width:" 950px"}}>


      <div class="tab-pane fade  show active" id="list-dash" role="tabpanel" aria-labelledby="list-dash-list">
        <div class="container-fluid container-fullw bg-white" >
              <div class="row">
               <div class="col-sm-4" style={{left: "5%"}}>
                  <div class="panel panel-white no-radius text-center">
                    <div class="panel-body">
                      <span class="fa-stack fa-2x"> <i class="fa fa-square fa-stack-2x text-primary"></i> <i class="fa fa-terminal fa-stack-1x fa-inverse"></i> </span>
                      <h4 class="StepTitle" style={{marginTop:" 5%"}}> Book My Appointment</h4>
                                     
                      <p class="links cl-effect-1">
                        <a href="#list-home" onclick="clickDiv('#list-home-list')">
                          Book Appointment
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-sm-4" style={{left: "10%"}}>
                  <div class="panel panel-white no-radius text-center">
                    <div class="panel-body" >
                      <span class="fa-stack fa-2x"> <i class="fa fa-square fa-stack-2x text-primary"></i> <i class="fa fa-paperclip fa-stack-1x fa-inverse"></i> </span>
                      <h4 class="StepTitle" style={{marginTop: "5%"}}>My Appointments</h4>
                    
                      <p class="cl-effect-1">
                        <a href="#app-hist" onclick="clickDiv('#list-pat-list')">
                          View Appointment History
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                </div>

                <div class="col-sm-4" style={{left:" 20%",marginTop:"5%"}}>
                  <div class="panel panel-white no-radius text-center">
                    <div class="panel-body" >
                      <span class="fa-stack fa-2x"> <i class="fa fa-square fa-stack-2x text-primary"></i> <i class="fa fa-list-ul fa-stack-1x fa-inverse"></i> </span>
                      <h4 class="StepTitle" style={{marginTop: "5%"}}>Prescriptions</h4>
                    
                      <p class="cl-effect-1">
                        <a href="#list-pres" onclick="clickDiv('#list-pres-list')">
                          View Prescription List
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
         
            </div>
          </div>





      <div class="tab-pane fade" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <center><h4>Create an appointment</h4></center><br/>
              <form class="form-group" method="post">
                <div class="row">
                  
        
                    <div class="col-md-4">
                          <label for="spec">Specialization:</label>
                        </div>
                        <div class="col-md-8">
                          <select name="spec" class="form-control" id="spec">
                              <option value="" disabled selected>Select Specialization</option>
                              
                          </select>
                        </div>

                        <br/><br/>


              <div class="col-md-4"><label for="doctor">Doctors:</label></div>
                <div class="col-md-8">
                    <select name="doctor" class="form-control" id="doctor" required="required">
                      <option value="" disabled selected>Select Doctor</option>
                
                    
                    </select>
                  </div><br/><br/> 


                        

                  
                  

                  
                         <div class="col-md-4"><label for="doctor">Doctors:</label></div>
                                <div class="col-md-8">
                                    <select name="doctor" class="form-control" id="doctor1" required="required">
                                      <option value="" disabled selected>Select Doctor</option>
                                      
                                    </select>
                                </div>
                                <br/><br/> 

                               
                        
                  


                  
                  <div class="col-md-4"><label for="consultancyfees">
                                Consultancy Fees
                              </label></div>
                              <div class="col-md-8">
                             <div id="docFees">Select a doctor</div> 
                              <input class="form-control" type="text" name="docFees" id="docFees" readonly="readonly"/>
                  </div><br/><br/>

                  <div class="col-md-4"><label>Appointment Date</label></div>
                  <div class="col-md-8"><input type="date" class="form-control datepicker" name="appdate"/></div><br/><br/>

                  <div class="col-md-4"><label>Appointment Time</label></div>
                  <div class="col-md-8">
                     <input type="time" class="form-control" name="apptime"/> 
                    <select name="apptime" class="form-control" id="apptime" required="required">
                      <option value="" disabled selected>Select Time</option>
                      <option value="08:00:00">8:00 AM</option>
                      <option value="10:00:00">10:00 AM</option>
                      <option value="12:00:00">12:00 PM</option>
                      <option value="14:00:00">2:00 PM</option>
                      <option value="16:00:00">4:00 PM</option>
                    </select>

                  </div><br/><br/>

                  <div class="col-md-4">
                    <input type="submit" name="app-submit" value="Create new entry" class="btn btn-primary" id="inputbtn"/>
                  </div>
                  <div class="col-md-8"></div>                  
                </div>
              </form>
            </div>
          </div>
        </div><br/>
      </div>
      
<div class="tab-pane fade" id="app-hist" role="tabpanel" aria-labelledby="list-pat-list">
        
              <table class="table table-hover">
                <thead>
                  <tr>
                    
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Consultancy Fees</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Appointment Time</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                 
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                          <td>
                    </td>

                        <td></td>
                        </tr>
                       
                </tbody>
              </table>
        <br/>
      </div>



      <div class="tab-pane fade" id="list-pres" role="tabpanel" aria-labelledby="list-pres-list">
        
              <table class="table table-hover">
                <thead>
                  <tr>
                    
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Appointment ID</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Appointment Time</th>
                    <th scope="col">Diseases</th>
                    <th scope="col">Allergies</th>
                    <th scope="col">Prescriptions</th>
                    <th scope="col">Bill Payment</th>
                  </tr>
                </thead>
                
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                       </tr>
                          
              </table>
        <br/>
      </div>




      <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
        <form class="form-group" method="post" action="func.php">
          <label>Doctors name: </label>
          <input type="text" name="name" placeholder="Enter doctors name" class="form-control"/>
          <br/>
          <input type="submit" name="doc_sub" value="Add Doctor" class="btn btn-primary"/>
        </form>
      </div>
       <div class="tab-pane fade" id="list-attend" role="tabpanel" aria-labelledby="list-attend-list">...</div>
    </div>
  </div>
</div>
   </div>
    

  </body>
        </>
        )
    }

}
export default connect(mapStateToProps,null)(PatientDashbord)