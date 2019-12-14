import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {InstitutionInfo, PatientInfo, MedicalRecord} from '../smis-entity/smisentity'
import { organizationResource, patientResource, Patient } from '../fhir-entity/fhirentity';
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
  private medicalRecord:MedicalForm
  private patientId="";
  private patientInfo:PatientInfo
  private isPrivateCorrect = false;

  constructor(private loginService:LoginService, private smisFacade:SMISFacadeService) {
    this.medicalRecord = this.getDefaultMedicalForm()

  }
  
  ngOnInit() {
    
  }

  async searchPatient() {
    let patient:PatientInfo = await this.smisFacade.getPatient(this.patientId)
    if(patient.resourceType == patientResource){
      this.patientInfo = patient
      this.confirmPrivateKey(patient)
    }
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

  async submitRecord(){
    if(confirm('確認要送出嗎?')){
      let organization = this.loginService.getUserResource() as InstitutionInfo
      let medicalRecord = this.parseMedicalForm(this.medicalRecord,organization.name,organization.id)
      medicalRecord = await this.smisFacade.updateMedicalRecord(medicalRecord)
      this.patientInfo.medicalRecord.push(medicalRecord)
      let result = await this.smisFacade.updatePatient(this.patientInfo)
      if(result.resourceType == patientResource){
        alert("新增成功!")
        this.patientInfo = result
      }
      else
        alert("新增失敗")
    }
  }
  
  parseMedicalForm(formData:MedicalForm,organizationName,organizationId){
    let date = new Date()
    let medicalRecord:MedicalRecord ={
      organization:{
        reference:`${organizationResource}/${organizationId}`,
        display:organizationName
      },
      diagnosis:[],
      time:{
        start:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${formData.time.start}:00`,
        end:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${formData.time.end}:00`
      }
    }
    for(let diagnosis of formData.diagnosis)
      medicalRecord.diagnosis.push(diagnosis.diagnosis)
    return medicalRecord as MedicalRecord
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
  
}
