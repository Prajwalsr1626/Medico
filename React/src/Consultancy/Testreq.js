import React from "react";

export default class Testreq extends React.Component{

    constructor(){
        super()
         this.state = {
            regmsg : '',
            Appointmenttesthos:[]
        }
    }  

    componentDidMount(){
      console.log(this.props.Hosdata)
      fetch(`http://localhost:8080/Hospital/getAppointbytesthosid/${this.props.Hosdata}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmenttesthos:data.data})

        }); 
    }

   
   Accept(appointId,index)
   {
       console.log(appointId)
       console.log(index)
       var appoint=[...this.state.Appointmenttesthos]
       appoint.splice(index,1)
       
       fetch(`http://localhost:8080/Hospital/Accpettestapp/${appointId}`)
       .then(response=>response.json()).then(data=>{
         console.log(data)
         if(data.status){
            this.setState({Appointmenttesthos:appoint})
         }
          });  

   }
   Reject(appointId,index)
   {
       console.log(appointId)
       console.log(index)
       var appoint=[...this.state.Appointmenttesthos]
       appoint.splice(index,1)
       
       fetch(`http://localhost:8080/Hospital/RejecttestApp/${appointId}`)
       .then(response=>response.json()).then(data=>{
         console.log(data)
         if(data.status){
            this.setState({Appointmenttesthos:appoint})
         }
          });  

   }
   
   refresh(){
    fetch(`http://localhost:8080/Hospital/getAppointbytesthosid/${this.props.Hosdata}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmenttesthos:data.data})

        }); 

  }


    render(){
        return(
            <div class="tab-pane fade" id="testreq" role="tabpanel" aria-labelledby="Consultancy-list">
               <button type="button" onClick={()=>this.refresh()} class="btn btn-default btn-sm" style={{marginLeft:"800px"}}>
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
       <div class="col-md-8">
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
                    <th scope="col">Test</th>
                    
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                      
                      {this.state.Appointmenttesthos.map((ob,index)=>{
               return <tr key={index}>
                      <td>{index+1}</td>
                      <td>{ob.pname}</td>
                      <td>{ob.date}</td>
                      <td>{ob.time}</td>
                      <td>{ob.testnames}</td>
                      <td><button onClick={()=>this.Accept(ob.appointId,index)} class="btn btn-success"> Accept </button> <button onClick={()=>this.Reject(ob.appointId,index)}  class="btn btn-danger">  Reject </button></td>
                      </tr>
                  })}
                </tbody>
              </table>
        <br/>
      </div>

        )
    }

} 