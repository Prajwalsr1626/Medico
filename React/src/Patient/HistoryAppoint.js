import React from "react";
import axios from 'axios';
export default class HistoryAppoint extends React.Component{

    constructor(){
        super()
         this.state = {
            regmsg : '',
            Appointment:[],
            uplodestutes:false,
            pagestutes:false,
        }
    }  

    componentDidMount(){
      console.log(this.props.Hosdata)
      fetch(`http://localhost:8080/Hospital/getAppointpatient/${this.props.patientidata.patid}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointment:data.data})

        }); 
    }   

   refresh(){
    fetch(`http://localhost:8080/Hospital/getAppointpatient/${this.props.patientidata.patid}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointment:data.data})


        }); 

  }



    render(){
        
        return(

            <div class="tab-pane fade" id="list-pres" role="tabpanel" aria-labelledby="Consultancy-list">

       <div class="col-md-8">
       <button type="button" onClick={()=>this.refresh()} class="btn btn-default btn-sm" style={{marginLeft:"800px"}}>
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
       
      <form class="form-group" action="patientsearch.php" method="post">
        <div class="row">
        </div>
      </form>
    </div>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                            <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Test/Specialization</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                      
                      {this.state.Appointment.map((ob,index)=>{
               return <tr key={index}>
                      <td>{index+1}</td>
                      <td>{ob.date}</td>
                      <td>{ob.time}</td>
                      <td>{ob.viname}</td>
                      <td>{ob.statusMessage}</td>
                      </tr>
                  })}
                     
                
                </tbody>
              </table>
        <br/>
      </div>
      

        )
    }
} 