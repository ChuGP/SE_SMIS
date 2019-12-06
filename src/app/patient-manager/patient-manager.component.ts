import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { Router } from '@angular/router'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PatientInfo, SMISEntityAdapter, Address, MedicalRecord} from '../smis-entity/smisentity'
import { Patient, FHIREntityAdapter,patientResource, Telecom, Resource, CodeAbleConcept } from '../fhir-entity/fhirentity'
import {LoginService} from '../login-service/login-service.service'
export interface PeriodicElement {
   diagnosis?:string[],
   organization?:string,
   time?:{
      start:string,
      end:string
   }
}

@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})
export class PatientManagerComponent implements OnInit {
  private displayRecords:PeriodicElement[]=[ {diagnosis: ['diagnosis1', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis3', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis5', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis7', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis9', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis11', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis13', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis15', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis17', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis19', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  // {diagnosis: ['diagnosis21', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  ]
  private patientInfo:PatientInfo ={
    resourceType:patientResource,
    address:[
      {
        city:""
      }
    ],
    telecom:[{}],
    name:[{
      given:[""],
      family:"",
      use:""
    }],
    birthDate:"",
    maritalStatus:{
      coding:[],
      text:""
    },
    medicalRecord:new Map<string,MedicalRecord>()
  }
  constructor(private fhir:FHIRProxyService, private router:Router, private fhirAdapter:FHIREntityAdapter, private smisAdapter:SMISEntityAdapter, private loginService:LoginService) { 
  }

  displayedColumns: string[] = ['diagnosis', 'organization', 'time.start', 'time.end'];
  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;
  dataSource;
  display = false;
  async ngOnInit() {
    if(this.loginService.isLogin())
      this.setPatientInfo(await this.getPatient(this.loginService.getUserInfo().email.replace('@','')))
  }

  setPatientInfo(patientInfo:PatientInfo){
    this.patientInfo = patientInfo
    this.displayRecords=[]
    if(this.patientInfo.medicalRecord){
      for(let medicalRecord of patientInfo.medicalRecord){
        let record = medicalRecord[1]
        this.displayRecords.push({
          diagnosis:record.diagnosis,
          time:record.time,
          organization:record.organization.display,
        })
      }
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.displayRecords);
    this.dataSource.paginator = this.paginator;
  }

  async window() {
    let patient:Patient = await this.fhirAdapter.parsePatientInfo(this.patientInfo)
    patient.id = this.loginService.getUserInfo().email.replace('@','')
    if(confirm("Submit Success!")){
      let info = await this.updatePatient(patient)
      alert(JSON.stringify(info))
      this.router.navigate([""]);
    }
  }

  async updatePatient(patientInfo:PatientInfo){
    let patient:Patient = this.fhirAdapter.parsePatientInfo(patientInfo)
    return await this.fhir.updateResource(patientResource,patient)
  }

  async createPatient(patientInfo:PatientInfo){
    let patient:Patient = this.fhirAdapter.parsePatientInfo(patientInfo)
    return await this.fhir.createResource(patientResource,patient)
  }

  async getPatient(patientId){
    let patient:Patient = await this.fhir.getResource(patientResource,patientId)   
    if(patient.resourceType==patientResource)   
      return await this.smisAdapter.parsePatient(patient)
    return patient
  }

}
