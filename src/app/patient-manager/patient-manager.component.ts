import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { Router, ActivatedRoute } from '@angular/router'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PatientInfo, SMISEntityAdapter, MedicalRecord} from '../smis-entity/smisentity'
import { Patient, FHIREntityAdapter,patientResource} from '../fhir-entity/fhirentity'
import {LoginService} from '../login-service/login-service.service'

@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})

export class PatientManagerComponent implements OnInit {
  private checked=false;
  private typeInput="password";
  private displayRecords:MedicalRecord[]=[];
  private patientInfo:PatientInfo;
  private displayedColumns: string[] = ['diagnosis', 'organization', 'time.start', 'time.end'];
  @ViewChild(MatPaginator, {static: true}) 
  private paginator: MatPaginator;
  private dataSource;

  constructor(private fhir:FHIRProxyService, private router:Router, private fhirAdapter:FHIREntityAdapter, private smisAdapter:SMISEntityAdapter, private loginService:LoginService,private actRoute:ActivatedRoute) { 
    this.displayPatient(this.getDefaultPatient());
  }
  
  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(this.loginService.isLogin() && userId){
      let patientInfo:PatientInfo = await this.getPatient(userId)
      if(patientInfo.resourceType == patientResource)
        this.displayPatient(patientInfo)
    }
  }

  displayPatient(patientInfo:PatientInfo){
    this.setPatientInfo(patientInfo)
    this.setDisplayRecord(patientInfo.medicalRecord)
  }

  setPatientInfo(patientInfo:PatientInfo){
    this.patientInfo = patientInfo
  }

  setDisplayRecord(medicalRecords:Map<string,MedicalRecord>){
    this.displayRecords=[]
    if(medicalRecords){
      for(let medicalRecord of medicalRecords)
        this.displayRecords.push( medicalRecord[1])
    }
    this.dataSource = new MatTableDataSource<MedicalRecord>(this.displayRecords);
    this.dataSource.paginator = this.paginator;
  }

  async confirmSubmit() {
    if(confirm("確認要送出嗎?")){
      let patient = await this.updatePatient(this.patientInfo)
      let result = "更新失敗"
      if(patient.resourceType==patientResource){
        this.displayPatient(patient)
        result = "更新成功"
      }
      alert(result)
    }
  }

  async updatePatient(patientInfo:PatientInfo){
    let patient:Patient = this.fhirAdapter.parsePatientInfo(patientInfo)
    if(patient.id)
      patient = await this.fhir.updateResource(patientResource,patient)
    else
      patient = await this.fhir.createResource(patientResource,patient)
    return await this.smisAdapter.parsePatient(patient)
  }

  async getPatient(patientId){
    let patient:Patient = await this.fhir.getResource(patientResource,patientId)     
    return await this.smisAdapter.parsePatient(patient) as PatientInfo
  }

  getDefaultPatient(){
    return {
      resourceType:patientResource,
      privateKey:"",
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
    };
  }

  showPasswd(){
    if(this.checked==true)
      this.typeInput="text";
    else
      this.typeInput="password";
  }
}
