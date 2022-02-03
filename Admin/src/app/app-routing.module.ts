import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { HospitalDetailsComponent } from './hospital-details/hospital-details.component';
import { HospitalComponent } from './hospital/hospital.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [{path:"hospital",component:HospitalComponent},
{path:"doctor",component:DoctorComponent},
{path:"patients",component:PatientsComponent},
{path:"hospitalDetails",component:HospitalDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
