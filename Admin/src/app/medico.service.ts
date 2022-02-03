import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { server } from '../../package.json';

@Injectable({
  providedIn: 'root'
})

export default class MedicoService {

  server:any="http://localhost:8080";
  hospitalData:any;
  constructor(private http:HttpClient) { }

  public getHospital():Observable<any>
  {
    return this.http.get(`${this.server}/Hospital/findHospital`)
  }
  //get patients details
  public getPatients():Observable<any>
  {
    return this.http.get(`${this.server}/Hospital/findPatients`)
  }
//doctor part
  public getDoctor():Observable<any>
  {
    return this.http.get(`${this.server}/Doctors/findDoctors`)
  }

  public saveDoctor(data:any): Observable<any>
  {
    return this.http.post(`${this.server}/Doctors/addDoctors`,data)
  }

  //global data
  public setHospitalId(data:any){
    this.hospitalData=data
  }
  //find doctor by id
  public findDoctor(data:any):Observable<any>
  {
    return this.http.get(`${this.server}/Hospital/findDoctors/${data}`)
  }
  //find hospital by id
  public findHospital(data:any):Observable<any>
  {
    return this.http.get(`${this.server}/Hospital/findHos/${data}`)
  }
}
