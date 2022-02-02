import React from "react";
import axios from 'axios';
export default class ConsulyanyAppoint extends React.Component{

    constructor(){
        super()
         this.state = {
            regmsg : '',
            Appointmentconhos:[],
            uplodestutes:false,
            pagestutes:false,
        }
    }  

    componentDidMount(){
      console.log(this.props.Hosdata)
      fetch(`http://localhost:8080/Hospital/Accpetconrequest/${this.props.Hosdata}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmentconhos:data.data})

        }); 
    }

   
    visited=(obj,index,event)=>
   {
       console.log("vitited")
       console.log(obj)
       console.log(index)
       this.setState({uplodestutes:true})
       this.hospitalid=obj.hospitalid
       this.patid=obj.patid
       this.name=obj.pname
       this.appointId=obj.appointId
       this.datev=obj.date
       this.time=obj.time
       this.specialization=obj.specialization
       this.valindex=index
       event.preventDefault();
   }
   


   notvisited(obj,index)
   {
   
    var ob={
        appointId:obj.appointId,
        hospitalid:obj.hospitalid,
        patid:obj.patid,
        pname:obj.pname,
        date: obj.date,
        time:obj.time,
        viname:obj.specialization,
        statusMessage:"Not Visited"
         }
        var appoint=[...this.state.Appointmentconhos]
 
         appoint.splice(index,1)
        
         fetch(`http://localhost:8080/Hospital/visistedcon`,{
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
                 this.setState({Appointmentconhos:appoint})
             }
             else{
               this.setState({regmsg:data.msg})
             }
         }); 
     
         console.log(this.file.value)
         console.log(ob)
     
   }

   uplodefile(event)
   {

    var ob={
        appointId:this.appointId,
        hospitalid:this.hospitalid,
        patid:this.patid,
        pname:this.name.value,
        date: this.datev.value,
        time:this.time.value,
        viname:this.specialization.value,
        statusMessage:"Visited"
         }
        var appoint=[...this.state.Appointmentconhos]
 
         appoint.splice(this.valindex,1)
        
         fetch(`http://localhost:8080/Hospital/visistedcon`,{
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
                 this.setState({Appointmentconhos:appoint})
             }
             else{
               this.setState({regmsg:data.msg})
             }
         }); 
     
         console.log(this.file.value)
         console.log(ob)
         this.setState({uplodestutes:false})
   }
   
   refresh(){
    fetch(`http://localhost:8080/Hospital/Accpetconrequest/${this.props.Hosdata}`)
        
     .then(response=>response.json()).then(data=>{
       console.log(data)
       if(data.status)
       this.setState({Appointmentconhos:data.data})

        }); 

  }
  


    render(){
        if(this.state.uplodestutes){
            return(
                <div class="tab-pane fade" id="Appointcon" role="tabpanel" aria-labelledby="Appointcon-list">
            <div class="container-fluid">
              <div class="card">
                <div class="card-body">
                  <center><h4></h4></center><br/>
                 
                 <div class="row register-form" >
                    <div class="col-md-6"  >
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control"  ref={c=>this.name=c} name="name" placeholder="name" value={this.name}  required disabled />
                    </div>
                    <div class="form-group">
                    <label>Date</label>
                        <input type="text" class="form-control"  ref={c=>this.datev=c}  value={this.datev}  required disabled  />
                    </div>
                    <div class="form-group">
                    <label>Time</label>
                        <input type="text" ref={c=>this.time=c} name="address"  value={this.time} class="form-control" required disabled />
                    </div>
                    </div>  
                    <div class="col-md-6"  >
                    <div class="form-group">
                    <label>Specialization</label>
                        <input ref={c=>this.specialization=c} type="text"  value={this.specialization} class="form-control" required disabled  />
                    </div>
                    <div class="form-group">
                    <label>Specialization</label>
                        <input ref={c=>this.file=c}type="file" accept="application/pd" class="form-control" required  />
                    </div>
                    <button onClick={()=>this.uplodefile()} class="btn btn-success"> visited </button>
                    </div>
                <b style={{color:"red"}}>{this.state.regmsg}</b>
            </div>
                </div>
              </div>
            </div><br/>
          </div>)
            
        }
       
        return(

            <div class="tab-pane fade" id="Appointcon" role="tabpanel" aria-labelledby="Consultancy-list">

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
                      <td><button onClick={()=>this.visited(ob,index)} class="btn btn-success"> visited </button> <button onClick={()=>this.notvisited(ob,index)}  class="btn btn-danger"> Notvisited </button>
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