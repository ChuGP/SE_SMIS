import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Resource, SearchResult} from '../fhir-entity/fhirentity';
@Injectable({
  providedIn: 'root'
})
export class FHIRProxyService {
  baseUrl='http://140.124.181.144:8080/hapi-fhir-jpaserver/fhir/';
  constructor(private http:HttpClient) { 
    
  }

  async createResource(resourceName,info){
    return this.http.post<Resource>(this.baseUrl+`${resourceName}`,info).toPromise()
    .catch(error=>{
      return error.error as Resource
    });
  }

  async getResource(resourceName, id:string){
    return this.http.get<Resource>(this.baseUrl+`${resourceName}/${id}`).toPromise()
    .catch(error=>{
      return error.error as Resource
    });
  }
  
  async updateResource(resourceName, data){
    return this.http.put<Resource>(this.baseUrl+`${resourceName}/${data.id}`,data).toPromise()
    .catch(error=>{
      return error.error as Resource
    });
  }

  async getExtensionResource(extensionUrl){
    return this.http.get<Resource>(this.baseUrl+extensionUrl).toPromise()
    .catch(error=>{
      return error.error as Resource
    });
  }

  async searchResource(resourceName, params){
    return this.http.get<SearchResult>(this.baseUrl+resourceName,{params:params}).toPromise()
    .catch(error=>{
      return error.error as Resource
    })
  }
  
}


