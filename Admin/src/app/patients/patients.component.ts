import { Component, OnInit } from '@angular/core';
import MedicoService from '../medico.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  public patients:any = [];

  constructor(private medicoServive:MedicoService) { }

  ngOnInit(): void  {
    this.medicoServive.getPatients().subscribe((data:any)=>{
      this.patients = data.data
      console.log("ghj")
      console.log(this.patients)
    });
  }

}
