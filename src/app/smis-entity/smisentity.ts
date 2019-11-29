import {Patient,Encounter, HealthcareService} from '../fhir-entity/fhirentity'
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service'
import { Injectable } from '@angular/core'
export class SMISEntity {
}

@Injectable({
   providedIn: 'root'
 })
export class SMISEntityAdapter{
   constructor(private fhir:FHIRProxyService){

   }

   async parsePatient(FHIRPatient:Patient){
      let patientInfo:PatientInfo = FHIRPatient
      patientInfo.medicalRecord = new Map<string,MedicalRecord>()
      patientInfo.family = new Map<string,PatientInfo>()
      if(FHIRPatient.extension){
         for(let extension of FHIRPatient.extension){
         let encounter:Encounter = await this.fhir.getExtensionResource(extension.url)
         patientInfo.medicalRecord.set(encounter.id,this.parseEncounter(encounter))
         }
      }
      if(FHIRPatient.link){
         for(let link of FHIRPatient.link){
            let family:Patient = await this.fhir.getExtensionResource(link.other.reference)
            patientInfo.family.set(link.other.display, await this.parsePatient(family))
         }
      }
      return patientInfo
    }
  
    parseEncounter(FHIREncounter:Encounter):MedicalRecord{
      let sympton=[]
      for(let code of FHIREncounter.type)
        sympton.push(code)
      let medicalRecord:MedicalRecord={
        diagnosis:sympton,
        time:FHIREncounter.period.start,
        organization:FHIREncounter.serviceProvider.display
      };
      return medicalRecord
    }

    parseHealthCareService(healthCareService:HealthcareService){
      let medicalService:MedicalService={
         resourceType:healthCareService.resourceType,
         id:healthCareService.id,
         name:healthCareService.name,
         comment:healthCareService.comment,
         serviceType:[]
      };
      for(let service of healthCareService.type)
         medicalService.serviceType.push(service.text)
      return medicalService
    }
  
}

export interface PatientInfo{
   resourceType:string,
   active?:boolean,
   id?:string,
   name?:Name[],
   telecom?:Telecom[],
   birthDate?:string,
   gender?:string,
   address?:Address[],
   family?:Map<string,PatientInfo>,
   medicalRecord?:Map<string,MedicalRecord>;
}

export interface MedicalRecord{
   diagnosis:string[],
   organization:string,
   time:string,
}
export interface AccountInfo{
   id:string,
   role:string,
   accountName:string,
   password:string,
   privateKey:string,
   email:string
}
export interface InstitutionInfo{
   resourceType:string,
   id?:string,
   name?:string,
   address?:Address[],
   medicalServices?:MedicalService[],
   type?:string,
   telecom?:Array<{system:string,value:string}>,
   alias?:string[]
}
export interface MedicalService{
   resourceType:string,
   id:string,
   name:string,
   serviceType:string[],
   comment?:string,
}
export interface Address{
    line:Array<string>,
    use:string,
    city:string,
    state:string,
    postalCode:string,
    country:string
 }

 export interface Name{
  use:string,
  family:string,
  given:string[]  
 }

 export interface Telecom{
   system?: string,
	value?: string,
   use?: string,
   rank?:number
 }

 export interface OutCome{
    resourceType:string,
    text:{
       status:string,
       div:string
      }
 }

 export interface Extension{
    url:string,
    valueString:string
 }