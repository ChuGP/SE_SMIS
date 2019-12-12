import { Component, OnInit, ViewChild, Input,OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
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

export class PatientManagerComponent implements OnInit ,OnChanges {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input('disable')
  private disable:boolean
  private checked=false;
  private typeInput="password";
  @Input('userId')
  private userId
  private displayRecords:MedicalRecord[]=[];
  @Input('patientInfo')
  private patientInfo:PatientInfo;
  private displayedColumns: string[] = ['diagnosis', 'organization', 'time.start', 'time.end'];
  @ViewChild(MatPaginator, {static: true}) 
  private paginator: MatPaginator;
  private dataSource;

  constructor(private smisFacade:SMISFacadeService, private loginService:LoginService,private actRoute:ActivatedRoute) { 
      this.displayPatient(this.smisFacade.getDefaultPatient());
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.patientInfo){
      this.displayPatient(changes.patientInfo.currentValue)
    }
  }

  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(this.loginService.isLogin() && userId){
      this.userId = userId
      let patientInfo:PatientInfo = await this.smisFacade.getPatient(this.userId)
      if(patientInfo.resourceType == patientResource)
        this.displayPatient(patientInfo)
      else
        this.patientInfo.id = this.userId
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
      if(patient.resourceType==patientResource){
        this.displayPatient(patient)
        alert("更新成功")
        this.submit.emit(null)
      }
      else
        alert("更新失敗")
    }
  }

  showPasswd(){
    if(this.checked==true)
      this.typeInput="text";
    else
      this.typeInput="password";
  }
}
