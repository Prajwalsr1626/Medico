import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import  MedicoService  from '../medico.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  public doctor:any ;
  

  constructor(private medicoServive:MedicoService) { }
  //this is use for deleting data from API
  // delDoctor(did:number){
  //   this.http.delete(`https://todearhemant.pythonanywhere.com/patient/api/patients/${did}/`).subscribe(data=>{
  //     this.doctor = this.doctor.filter((doc:any)=>doc.id!=did)
  //   })
  // }

  ngOnInit(): void {
    // this.medicoServive.getDoctor().subscribe((data:any)=>{
    //   this.doctor = data.data
    //   console.log(this.doctor)
    // });
    this.medicoServive.findDoctor(this.medicoServive.hospitalData).subscribe((data:any)=>{
     this.doctor = data.data
      console.log(data)
    });
    console.log(this.medicoServive.hospitalData)
    
  }

}
