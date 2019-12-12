import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { Router, ActivatedRoute } from '@angular/router'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientInfo, MedicalRecord } from '../smis-entity/smisentity'
import { patientResource } from '../fhir-entity/fhirentity'
import { LoginService } from '../login-service/login-service.service'
import { SMISFacadeService } from '../smis-facade/smis-facade.service';



@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})

export class PatientManagerComponent implements OnInit {
  @Input('disable')
  private disable:boolean
  @Input('patientId')
  private patientId:string
  private checked=false;
  private typeInput="password";
  
  private displayRecords:MedicalRecord[]=[];
  private patientInfo:PatientInfo;
  private displayedColumns: string[] = ['diagnosis', 'organization', 'time.start', 'time.end'];
  @ViewChild(MatPaginator, {static: true}) 
  private paginator: MatPaginator;
  private dataSource;

  constructor(private smisFacade:SMISFacadeService,private fhir:FHIRProxyService, private router:Router,private loginService:LoginService,private actRoute:ActivatedRoute) { 
    this.displayPatient(this.getDefaultPatient());
  }
  
  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(userId)
      this.patientId = userId
    if(this.loginService.isLogin()){
      let patientInfo:PatientInfo = await this.smisFacade.getPatient(this.patientId)
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

  setDisplayRecord(medicalRecords:MedicalRecord[]){
    this.displayRecords=[]
    if(medicalRecords){
      for(let medicalRecord of medicalRecords)
        this.displayRecords.push( medicalRecord)
    }
    this.dataSource = new MatTableDataSource<MedicalRecord>(this.displayRecords);
    this.dataSource.paginator = this.paginator;
  }

  async confirmSubmit() {
    if(confirm("確認要送出嗎?")){
      let patient = await this.smisFacade.updatePatient(this.patientInfo)
      let result = "更新失敗"
      if(patient.resourceType==patientResource){
        this.displayPatient(patient)
        result = "更新成功"
      }
      alert(result)
    }
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
      medicalRecord:[]
    };
  }

  showPasswd(){
    if(this.checked==true)
      this.typeInput="text";
    else
      this.typeInput="password";
  }
}
