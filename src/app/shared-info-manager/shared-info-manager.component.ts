import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {InstitutionInfo, PatientInfo, SMISEntityAdapter} from '../smis-entity/smisentity'
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { organizationResource, SearchResult, searchResource, Organization, patientResource, Patient } from '../fhir-entity/fhirentity';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';

@Component({
  selector: 'app-shared-info-manager',
  templateUrl: './shared-info-manager.component.html',
  styleUrls: ['./shared-info-manager.component.css']
})
export class SharedInfoManagerComponent implements OnInit {
  private dataSource
  // private institutions:InstitutionInfo[] = []
  private patients:PatientInfo[] = []
  private patientId="";
  institutionColumns: string[] = ['id', 'name' ,'address', 'telecom'];
  patientColumns: string[] = ['time', 'organization', 'diagnosis'];
  showPatient=false;
  display=false;

  constructor(private fhirProxy:FHIRProxyService, private smisAdapter:SMISEntityAdapter, private router:Router, private loginService:LoginService, private smisFacade:SMISFacadeService) {

  }
  
  async ngOnInit() {
    if(this.loginService.getRole() == organizationResource)
      this.dataSource = new MatTableDataSource<any>(this.patients);
    else{
      let institutions = await this.searchInstitution({type:'team'})
      this.dataSource = new MatTableDataSource<any>(institutions);
    }
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

  async submit() {
    let patient:PatientInfo = await this.smisFacade.getPatient(this.patientId)
    if(patient.resourceType == patientResource)
      this.confirmPrivateKey(patient)
    else{
      alert("病人不存在,請重新輸入")
      this.patientId = ""
    }
  }

  confirmPrivateKey(patient:PatientInfo){
      let key = prompt("請輸入病患的隱私金鑰", "Privacy key");
      if(key == patient.privateKey){
        this.router.navigate(['patient-information-management',patient.id],{
          queryParams:{
            disable:true
          }
        })
      }
      else{
        if (confirm ("Privacy key Error!\nDo you want to retry?"))
          this.confirmPrivateKey(patient)
      }
    }

  showDetail(id){
    this.router.navigate(['medical-institution-management',id],{
      queryParams:{
        disable:true,
      }
    })
  }
}
