import { Component, OnInit } from '@angular/core';
import MedicoService from '../medico.service';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css']
})
export class HospitalDetailsComponent implements OnInit {
  public hospitalDetails:any=[];

  constructor(private medicoServive:MedicoService) { }

  ngOnInit(): void {
    this.medicoServive.findHospital(this.medicoServive.hospitalData).subscribe((data:any)=>{
      this.hospitalDetails = data.data
      console.log("coming from hospitas details")
      console.log(this.medicoServive.hospitalData)
       console.log(this.hospitalDetails)
     });
     console.log(this.medicoServive.hospitalData)
  }

}
