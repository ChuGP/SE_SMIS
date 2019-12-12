import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {InstitutionInfo, PatientInfo, SMISEntityAdapter, MedicalRecord} from '../smis-entity/smisentity'
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { organizationResource, SearchResult, searchResource, Organization, patientResource, Patient } from '../fhir-entity/fhirentity';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';

interface MedicalForm{
  id:string,
  diagnosis:Array<{diagnosis:string}>,
  organization:{
    reference:string,
    display:string
  },
  time:{
    start:string,
    end:string
  }
}


@Component({
  selector: 'app-shared-info-manager',
  templateUrl: './shared-info-manager.component.html',
  styleUrls: ['./shared-info-manager.component.css']
})
export class SharedInfoManagerComponent implements OnInit {
  private dataSource
  private medicalRecord:MedicalForm
  private patientId="";
  private isPrivateCorrect = false;
  institutionColumns: string[] = ['id', 'name' ,'address', 'telecom'];
  patientColumns: string[] = ['time', 'organization', 'diagnosis'];
  showPatient=false;
  display=false;

  constructor(private fhirProxy:FHIRProxyService, private smisAdapter:SMISEntityAdapter, private router:Router, private loginService:LoginService, private smisFacade:SMISFacadeService) {
    this.medicalRecord = this.getDefaultMedicalForm()

  }
  
  async ngOnInit() {
    if(this.loginService.getUserResource().resourceType == patientResource){
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
      if(key == patient.privateKey)
        this.isPrivateCorrect = true
      else{
        if (confirm ("Privacy key Error!\nDo you want to retry?"))
          this.confirmPrivateKey(patient)
      }
    }

  async confirmSubmitRecord(){
    if(confirm('確認要送出嗎?')){
      let medicalRecord:MedicalRecord ={
        organization:{
          reference:`${organizationResource}/${this.loginService.getUserId()}`,
          display:this.loginService.getUserUserAsOrganization().name
        },
        diagnosis:[],
        time:this.medicalRecord.time
      } 
      for(let diagnosis of this.medicalRecord.diagnosis)
        medicalRecord.diagnosis.push(diagnosis.diagnosis)
      let patient:PatientInfo = await this.smisFacade.getPatient(this.patientId)
      patient.medicalRecord.push(medicalRecord)
      let result = await this.smisFacade.updatePatient(patient)
      if(result.resourceType == patientResource)
        alert("新增成功!")
      else
        alert("新增失敗")
    }
  }
  
  getDefaultMedicalForm():MedicalForm{
    return {
      id:"",
      diagnosis:[{diagnosis:''}],
      organization:{
        reference:"",
        display:""
      },
      time:{
         start:"",
         end:""
      }
    } as MedicalForm
  }
  
  showDetail(id){
    this.router.navigate(['medical-institution-management',id],{
      queryParams:{
        disable:true,
      }
    })
  }
}
