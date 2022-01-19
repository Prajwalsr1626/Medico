import React from "react";

export default class AppointmentTest extends React.Component{

    constructor(){
        super()
        this.state = {
            regmsg : '',
            loginmsg : '',
            loginstatus : false,
            hospetial:[]
        }
    }

    componentDidMount()
    {
     fetch(`http://localhost:8080/Hospital/findHospital`)
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({hospetial:data.data})
        });
     console.log(this.props.patientidata)
     console.log(this.props.PatientName)
    }

    render(){
        return(
            <>
            <div class="tab-pane fade" id="Appointtest" role="tabpanel" aria-labelledby="Appointcon-list">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <center><h4>Take a Appointment for Consultancy </h4></center><br/>
              <form class="form-group" method="post">
                <div class="row">
                  
                    <div class="col-md-4">
                          <label for="spec">Hospital</label>
                        </div>
                        <div class="col-md-8">
                          <select name="spec" class="form-control" id="spec">
                                    <option value="" disabled selected>Select Hospital</option>
                               {this.state.hospetial.map(ob=>

                                     <option value={ob.hospitalid}>{ob.hospitalname} {ob.hospitalid}</option>
                               )}
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



      
      <div class="tab-pane fade" id="testAppoint" role="tabpanel" aria-labelledby="list-pat-list">
        
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
      </>
        )
    }

}
