import React from "react";

export default class AppointmentTest extends React.Component{

    constructor(){
        super()
        this.state = {
            regmsg : '',
            loginmsg : '',
            loginstatus : false,
            hospetial:[],
            Appointmenttest:[]

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
     


     fetch(`http://localhost:8080/Hospital/getAppointbytestid/${this.props.patientidata.patid}`)
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmenttest:data.data})
       console.log(this.state.Appointmenttest)
        }); 
        console.log(this.props.patientidata.name)
        console.log(this.props.patientidata.patid)  
    }

    takeAppointmenttest=(event)=>{
      var ob={
        "hospitalid":this.hospetialid.value,
        "patid":this.props.patientidata.patid,
        "pname":this.props.patientidata.name,
        "testnames":((this.test0.checked == true ?this.test0.value:"")+
                (this.test1.checked == true ?this.test1.value:"")+
                (this.test2.checked == true ?this.test2.value:"")+
                (this.test3.checked == true ?this.test3.value:"")),
        "date":this.datev.value,
        "time":this.time.value,
        "statusMessage":"Pending"
    }
       fetch(`http://localhost:8080/Hospital/addAppointementTest`,{
          method : 'POST',
          headers:{
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(ob)
      }).then(response=>response.json()).then(data=>{
           console.log(data)
          if(data.status)
          {
              this.setState({regmsg:data.msg})
              this.setState({Appointmenttest:[...this.state.Appointmenttest,ob]})
          }
          else{
            this.setState({regmsg:data.msg})
          }
      }); 
      console.log(ob)
     event.preventDefault()
  }
  
  refresh(){
    fetch(`http://localhost:8080/Hospital/getAppointbytestid/${this.props.patientidata.patid}`)
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmenttest:data.data})
       console.log(this.state.Appointmenttest)
        }); 
    
  }


    render(){
        return(
            <>
            <div class="tab-pane fade" id="Appointtest" role="tabpanel" aria-labelledby="Appointcon-list">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <center><h4>Take a Appointment for Test </h4></center><br/>
              <form class="form-group" onSubmit={this.takeAppointmenttest} method="post">
                <div class="row">

                <div class="col-md-4">
                          <label for="spec">Hospital</label>
                        </div>
                        <div class="col-md-8">
                          <select name="spec" ref={c=>this.hospetialid=c} class="form-control" id="spec" >
                                    <option value="" disabled selected>Select Hospital</option>
                               {this.state.hospetial.map(ob=>

                                     <option value={ob.hospitalid}> {ob.hospitalname} {ob.address}</option>
                               )}
                          </select>
                        </div>
                        <br/><br/>

              <div class="col-md-4"><label for="Specialization">Test:</label></div>
                <div class="col-md-8">
                
                <span> <label > 
                     <input  
                       type="checkbox"   
                       ref={c=>this.test0=c}
                       value={"X-ray"}

                     /> X-ray
                      </label>  
                 </span>
                 <span> <label > 
                     <input  
                       type="checkbox"   
                       ref={c=>this.test1=c}
                       value={" CT"}

                     />CT Scan
                      </label>  
                 </span>
                 <span> <label > 
                     <input  
                       type="checkbox"   
                       ref={c=>this.test2=c}
                       value={" MRI"}

                     /> MRI Scanning
                      </label>  
                 </span>
                 <span> <label > 
                     <input  
                       type="checkbox"   
                       ref={c=>this.test3=c}
                       value={" Blood test"}

                     /> Blood test
                      </label>  
                 </span>

                     
                  </div><br/><br/> 

                  <div class="col-md-4"><label>Appointment Date</label></div>
                  <div class="col-md-8"><input type="date" ref={c=>this.datev=c} class="form-control datepicker" min={new Date().toISOString().split('T')[0]} name="appdate"/></div><br/><br/>

                  <div class="col-md-4"><label>Appointment Time</label></div>
                  <div class="col-md-8">
                    <select name="apptime" ref={c=>this.time=c} class="form-control" id="apptime" required="required">
                      <option value="" disabled selected>Select Time</option>
                      <option value="09:00AM To 12:00PM">09:00AM To 12:00PM </option>
                      <option value="12:00PM To 03:00PM">12:00PM To 03:00PM</option>
                      <option value="03:00PM To 06:00PM">03:00PM To 06:00PM</option>
                      <option value="06:00PM To 08:00PM">06:00PM To 08:00PM</option>
                    </select>
                  </div><br/><br/>

                  <div class="col-md-4">
                    <input type="submit" name="app-submit" value="Take Appointment" class="btn btn-primary" id="inputbtn"/>
                  </div>
                  
                  <div class="col-md-8"></div>     
                  <b style={{color:"red"}}>{this.state.regmsg}</b>             
                </div>
              </form>
            </div>
          </div>
        </div><br/>
      </div>



      
      <div class="tab-pane fade" id="testAppoint" role="tabpanel" aria-labelledby="list-pat-list">
      <button type="button" onClick={()=>this.refresh()} class="btn btn-default btn-sm" style={{marginLeft:"800px"}}>
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
                <table class="table table-hover">
                <thead>
                  <tr>
                    
                    <th scope="col">Sl NO</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Appointment Time</th>
                    <th scope="col">Test</th>
                    <th scope="col"></th>
                    <th scope="col">Current Status</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.Appointmenttest.map((ob,index)=>{
                    return <tr key={index}>
                      <td>{index+1}</td>
                      <td>{ob.date}</td>
                      <td>{ob.time}</td>
                      <td>{ob.testnames}</td>
                      <td>{ob.specialization}</td>
                     {ob.status==true?<td style={{color:"green"}}> Accepted </td> :ob.statusMessage=="Pending"?<td style={{color:"yellow"}}>{ob.statusMessage}</td>:<td style={{color:"red"}}>{ob.statusMessage}</td>}
                       </tr>
                  })} 
                       
                </tbody>
              </table>
        <br/>
      </div>
      </>
        )
    }

}
