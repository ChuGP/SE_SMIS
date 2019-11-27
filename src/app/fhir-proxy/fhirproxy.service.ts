import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Patient, Organization, Encounter, Resource} from '../fhir-entity/fhirentity';
@Injectable({
  providedIn: 'root'
})
export class FHIRProxyService {
  baseUrl='http://hapi.fhir.org/baseR4/';
  constructor(private http:HttpClient) { 
    
  }

  createResource(resourceName,info, lambda){
    return this.http.post<Resource>(this.baseUrl+`${resourceName}`,info).subscribe(
      (resp:Resource)=>{
        lambda(resp);
      }
    );
  }

  getResource(resourceName, id:string, lambda){
    return this.http.get<Resource>(this.baseUrl+`${resourceName}/${id}`).subscribe(
      (resp:Resource)=>{
        lambda(resp);
        
      }
    );
  }
  updateResource(resourceName, data, lambda){
    return this.http.put<Resource>(this.baseUrl+`/${resourceName}/${data.id}`,data).subscribe(
      (resp:Resource)=>{
        lambda(resp);
      }
    );
  }

  getExtensionResource(extensionUrl, lambda){
    return this.http.get<Resource>(this.baseUrl+extensionUrl).subscribe(
      (resp:Resource)=>{
        lambda(resp)
      }
    )
  }
  
  
}


