import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {InstitutionInfo, PatientInfo, SMISEntityAdapter} from '../smis-entity/smisentity'
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { organizationResource, SearchResult, searchResource, Organization, Entry } from '../fhir-entity/fhirentity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-info-manager',
  templateUrl: './shared-info-manager.component.html',
  styleUrls: ['./shared-info-manager.component.css']
})
export class SharedInfoManagerComponent implements OnInit {
  private dataSource
  private institutions:InstitutionInfo[] = []
  private patients:PatientInfo[] = []
  institutionColumns: string[] = ['id', 'name' ,'address', 'telecom'];
  patientColumns: string[] = ['time', 'organization', 'diagnosis'];
  showPatient=false;
  display=false;

  constructor(private fhirProxy:FHIRProxyService, private smisAdapter:SMISEntityAdapter, private router:Router) {

  }
  
  async ngOnInit() {
    this.institutions = await this.searchInstitution({type:'team'})
    this.dataSource = new MatTableDataSource<any>(this.institutions);
  }
  
  async searchInstitution(params){
    let institutions:InstitutionInfo[] = []
    let institutionResult:SearchResult = await this.fhirProxy.searchResource(organizationResource,params)
    if(institutionResult.resourceType == searchResource && institutionResult.total>0){
      for(let entry of institutionResult.entry){
        let organization:Organization = entry.resource
        institutions.push(await this.smisAdapter.parseOrganization(organization))
      }
    }
    return institutions
  }

  change() {
    this.display = !this.display
    if(!this.display)
      this.dataSource = new MatTableDataSource<any>(this.institutions);
    else
      this.dataSource=new MatTableDataSource<any>(this.patients);
  }

  window() {
    let key = prompt("Please Enter Privacy key!", "Privacy key");
    if (key == "GP") { // 記得用你的Privacy key把GP換掉!!!!!!!!!!!!!
      this.showPatient=true;
    }
    else {
      if (confirm ("Privacy key Error!\nDo you want to retry?"))
        this.window();
    }
  }

  showDetail(id){
    this.router.navigate(['medical-institution-management',id],{
      queryParams:{
        disable:true
      }
    })
    // console.log(JSON.stringify(row))
  }
}
