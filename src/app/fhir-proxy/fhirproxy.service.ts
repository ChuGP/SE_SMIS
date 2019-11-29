import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Resource} from '../fhir-entity/fhirentity';
@Injectable({
  providedIn: 'root'
})
export class FHIRProxyService {
  baseUrl='http://hapi.fhir.org/baseR4/';
  constructor(private http:HttpClient) { 
    
  }

  createResource(resourceName,info){
    return this.http.post<Resource>(this.baseUrl+`${resourceName}`,info).toPromise()
  }

  async getResource(resourceName, id:string){
    return this.http.get<Resource>(this.baseUrl+`${resourceName}/${id}`).toPromise();
  }
  async updateResource(resourceName, data){
    return this.http.put<Resource>(this.baseUrl+`${resourceName}/${data.id}`,data).toPromise();
  }

  async getExtensionResource(extensionUrl){
    return this.http.get<Resource>(this.baseUrl+extensionUrl).toPromise()
  }

  async getExtensionAsync(extensionUrl){
    return this.http.get<Resource>(this.baseUrl+extensionUrl).toPromise()
  }
  
  
}


