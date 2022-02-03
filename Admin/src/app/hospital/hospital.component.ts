import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import  MedicoService  from '../medico.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  public hospitals:any = [];
  

  constructor(private medicoServive:MedicoService) { }

  //this is use for deleting data from API
  // delHospital(hid:number){
  //   this.http.delete(`https://todearhemant.pythonanywhere.com/patient/api/patients/${hid}/`).subscribe(data=>{
  //     this.hospitals = this.hospitals.filter((hos:any)=>hos.id!=hid)
  //   })
  // }

  hosDetails(hosId:any){
    this.medicoServive.setHospitalId(hosId)
    console.log(this.medicoServive.hospitalData)
  }

  ngOnInit(): void {
    this.medicoServive.getHospital().subscribe((data:any)=>{
      this.hospitals = data.data
      console.log("abc")
      console.log(this.hospitals)
      
    });
  }

}
