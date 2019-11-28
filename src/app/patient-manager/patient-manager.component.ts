import { Component, OnInit } from '@angular/core';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { Patient,Extension, Encounter, Resource } from '../fhir-entity/fhirentity';
import {PatientInfo, MedicalRecord} from '../smis-entity/smisentity'
import { stringify } from 'querystring';
import { resolve } from 'url';
import { reject } from 'q';
@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})
export class PatientManagerComponent implements OnInit {

  constructor(private fhir:FHIRProxyService) { }

  ngOnInit() {
    
  }

  async parsePatient(patient:Patient){
    let info:PatientInfo=patient;
    info.medicalRecord=new Map<string,MedicalRecord>()
    for(let extension of patient.extension){
      let encounter:Encounter=await this.fhir.getExtensionResource(extension.url)
      info.medicalRecord.set(encounter.id,this.parseEncounter(encounter))
    }
    return info
  }

  parseEncounter(encounter:Encounter):MedicalRecord{
    let sympton=[]
    for(let code of encounter.type)
      sympton.push(code)
    let record:MedicalRecord={
      diagnosis:sympton,
      time:encounter.period.start,
      organization:encounter.serviceProvider.display
    };
    return record
  }

}
