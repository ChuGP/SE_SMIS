import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PatientInfo, InstitutionInfo} from '../fhir-entity/fhirentity';
@Injectable({
  providedIn: 'root'
})
export class FHIRProxyService {
  baseUrl='http://hapi.fhir.org/baseR4';
  constructor(private http:HttpClient) { 
    
  }

  getPatientByIdRequest(id:string, lambda){
    return this.http.get<PatientInfo>(this.baseUrl+`/Patient/${id}`).subscribe(
      (resp:PatientInfo)=>{
        lambda(resp);
        
      }
    );
  }
  
  getInstitutionByIdRequest(id:string, lambda){
    return this.http.get<InstitutionInfo>(this.baseUrl+`/Organization/${id}`).subscribe(
      (resp:InstitutionInfo)=>{
        lambda(resp);
        
      }
    );
  }
}
