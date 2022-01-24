import React from "react";

export default class ConsultancyReq extends React.Component{

    constructor(){
        super()
         this.state = {
            regmsg : '',
            Appointmentconhos:[]
        }
    }  

    componentDidMount(){
      console.log(this.props.Hosdata)
      fetch(`http://localhost:8080/Hospital/getAppointbyhosid/${this.props.Hosdata}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmentconhos:data.data})

        }); 
    }

   
   Accept(appointId,index)
   {
       console.log(appointId)
       console.log(index)
       var appoint=[...this.state.Appointmentconhos]
       appoint.splice(index,1)

       fetch(`http://localhost:8080/Hospital/AccpetConApp/${appointId}`)
       .then(response=>response.json()).then(data=>{
         console.log(data)
         if(data.status){
            this.setState({Appointmentconhos:appoint})
         }
          });  

   }
   Reject(appointId,index)
   {
       console.log(appointId)
       console.log(index)
       var appoint=[...this.state.Appointmentconhos]
       appoint.splice(index,1)
       
       fetch(`http://localhost:8080/Hospital/RejectConApp/${appointId}`)
       .then(response=>response.json()).then(data=>{
         console.log(data)
         if(data.status){
            this.setState({Appointmentconhos:appoint})
         }
          });  
 
   }
   refresh(){
    fetch(`http://localhost:8080/Hospital/getAppointbyhosid/${this.props.Hosdata}`)
        
    .then(response=>response.json()).then(data=>{
      console.log(data)
      if(data.status)
      this.setState({Appointmentconhos:data.data})

       }); 

  }



    render(){
        return(

            <div class="tab-pane fade" id="Consultancy" role="tabpanel" aria-labelledby="Consultancy-list">

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
                    <th scope="col">Patient Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Specialization</th>
                    
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                      
                      {this.state.Appointmentconhos.map((ob,index)=>{
               return <tr key={index}>
                      <td>{index+1}</td>
                      <td>{ob.pname}</td>
                      <td>{ob.date}</td>
                      <td>{ob.time}</td>
                      <td>{ob.specialization}</td>
                      <td><button onClick={()=>this.Accept(ob.appointId,index)} class="btn btn-success"> Accept </button> <button onClick={()=>this.Reject(ob.appointId,index)}  class="btn btn-danger">  Reject </button>
                      </td>
                      </tr>
                  })}
                     
                
                </tbody>
              </table>
        <br/>
      </div>

        )
    }

} 