import React from "react";

export default class AddlistDoctor extends React.Component{

    constructor(){
        super()
         this.state = {
            regmsg : '',
            Doctor:[]
        }
    }
    componentDidMount ()
  {
    // GET URL
    console.log(this.props.Hosdata)
    fetch(`http://localhost:8080/Hospital/findDoctors/${this.props.Hosdata}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        this.setState({Doctor:data.data})
    })
    .catch(err=>{
      alert("Something Wrong !")
    })
  }
  addDoctor=()=>{
      var ob = {
          
          hospitalname : this.props.Hosdata,
          contact:this.contact.value*1,
          address : this.address.value,
          password: this.password.value,
      }
      fetch(`http://localhost:8080/Hospital/addHospital`,{
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
  }

   

    render(){
        return(
            <>
            <div class="tab-pane fade" id="list-doc" role="tabpanel" aria-labelledby="list-home-list">
              <div class="col-md-8">
        <form class="form-group" action="doctorsearch.php" method="post">
        <div class="row">
        <div class="col-md-10"><input type="text" name="doctor_contact" placeholder="Enter Email ID" class = "form-control"/></div>
        <div class="col-md-2"><input type="submit" name="doctor_search_submit" class="btn btn-primary" value="Search"/></div></div>
        </form>
        </div>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">SL No.</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Specialization</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.Doctor.map((ob,index)=>{
                    return <tr key={index}>
                      <td>{index+1}</td>
                      <td>{ob.name}</td>
                      <td>{ob.phone}</td>
                      <td>{ob.Specialization}</td>
                    </tr>
                  })}
                </tbody>
              </table>
        <br/>
        </div> 
        <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                    <form class="form-group" onSubmit={this.addDoctor} method="">
                      <div class="row">
                       {this.props.Hosdata}
                              <div class="col-md-4"><label>Doctor Name:</label></div>
                              <div class="col-md-8"><input type="text" class="form-control" name="doctor" onkeydown="return alphaOnly(event)," required/></div><br/><br/>
                              <div class="col-md-4"><label>Specialization:</label></div>
                              <div class="col-md-8">
                               <select name="special" class="form-control" id="special" required="required">
                                  <option value="head" name="spec" disabled selected>Select Specialization</option>
                                  <option value="General" name="spec">General</option>
                                  <option value="Cardiologist" name="spec">Cardiologist</option>
                                  <option value="Neurologist" name="spec">Neurologist</option>
                                  <option value="Pediatrician" name="spec">Pediatrician</option>
                                </select>
                                </div><br/><br/>
                              <div class="col-md-4"><label>Email ID:</label></div>
                              <div class="col-md-8"><input type="email"  class="form-control" name="demail" required/></div><br/><br/>
                              <div class="col-md-4"><label>Phone</label></div>
                              <div class="col-md-8"><input type="password" class="form-control"  onkeyup='check(),' name="dpassword" id="dpassword"  required/></div><br/><br/>
                              <div class="col-md-4"><label>Confirm Password:</label></div>
                              <div class="col-md-8"  id='cpass'><input type="password" class="form-control" onkeyup='check(),' name="cdpassword" id="cdpassword" required/>&nbsp &nbsp<span id='message'></span> </div><br/><br/>
                               
                              
                              <div class="col-md-4"><label>Consultancy Fees:</label></div>
                              <div class="col-md-8"><input type="text" class="form-control"  name="docFees" required/></div><br/><br/>
                            </div>
                      <input type="submit" name="docsub" value="Add Doctor" class="btn btn-primary"/>
                    </form>
                  </div>
              <div class="tab-pane fade" id="list-settings1" role="tabpanel" aria-labelledby="list-settings1-list">
                <form class="form-group" method="post" action="admin-panel1.php">
                  <div class="row">
                  
                          <div class="col-md-4"><label>Email ID:</label></div>
                          <div class="col-md-8"><input type="email"  class="form-control" name="demail" required/></div><br/><br/>
                          
                        </div>
                  <input type="submit" name="docsub1" value="Delete Doctor" class="btn btn-primary"/>
                </form>
              </div>
        </>
        )
    }

}