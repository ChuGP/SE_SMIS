import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Patient, Organization} from '../fhir-entity/fhirentity';
@Injectable({
  providedIn: 'root'
})
export class FHIRProxyService {
  baseUrl='http://hapi.fhir.org/baseR4';
  constructor(private http:HttpClient) { 
    
  }

  createPatientRequest(patient:Patient, lambda){
    return this.http.post<Patient>(this.baseUrl+'/Patient',patient).subscribe(
      (resp:Patient)=>{
        lambda(resp);
      }
    );
  }

  getPatientByIdRequest(id:string, lambda){
    return this.http.get<Patient>(this.baseUrl+`/Patient/${id}`).subscribe(
      (resp:Patient)=>{
        lambda(resp);
      }
    );
  }
  
  updatePatientRequest(patient:Patient, lambda){
    return this.http.put<Patient>(this.baseUrl+`/Patient/${patient.id}`,patient).subscribe(
      (resp:Patient)=>{
        lambda(resp);
      }
    );
  }

  createInstitustionRequest(info:Organization, lambda){
    return this.http.post<Organization>(this.baseUrl+'/Organization',info).subscribe(
      (resp:Organization)=>{
        lambda(resp);
      }
    );
  }

  getInstitutionByIdRequest(id:string, lambda){
    return this.http.get<Organization>(this.baseUrl+`/Organization/${id}`).subscribe(
      (resp:Organization)=>{
        lambda(resp);
        
      }
    );
  }
  updateInstitutionRequest(info:Organization, lambda){
    return this.http.put<Organization>(this.baseUrl+`/Organization/${info.id}`,info).subscribe(
      (resp:Organization)=>{
        lambda(resp);
      }
    );
  }
  
}
