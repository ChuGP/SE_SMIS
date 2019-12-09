import { Injectable } from '@angular/core';
import { MedicalRecord, PatientInfo, MedicalService, InstitutionInfo } from '../smis-entity/smisentity';

export class FHIREntity {
}
@Injectable({
   providedIn: 'root'
 })
export class FHIREntityAdapter{
   constructor(){}

   parseMedicalRecord(medicalRecord:MedicalRecord):Encounter{
      let encounter:Encounter = {
         resourceType:encounterResource,
         id:medicalRecord.id,
         type:[],
         period:medicalRecord.time,
         serviceProvider:medicalRecord.organization 
      }
      if (medicalRecord.diagnosis){
         for(let diagnosis of medicalRecord.diagnosis){
            encounter.type.push({
               coding:[],
               text:diagnosis
            })
         }
      }
      return encounter
   }

   parsePatientInfo(patientInfo:PatientInfo){
      let patient:Patient = {
         resourceType:patientResource,
         identifier:[
            {
               system:"privateKey",
               value:patientInfo.privateKey
            }
         ],
         id:patientInfo.id,
         active:patientInfo.active,
         address:patientInfo.address,
         name:patientInfo.name,
         telecom:patientInfo.telecom,
         birthDate:patientInfo.birthDate,
         gender:patientInfo.gender,
         maritalStatus:patientInfo.maritalStatus
      }      
      patient.link=[]
      patient.extension=[]
      if(patientInfo.family){
         for(let member of patientInfo.family){
            patient.link.push({
               other:{
                  reference:`${patientResource}/${member.patient.id}`,
                  display:member.relation
               }
            })
         }
      }
      if(patientInfo.medicalRecord){
         for(let record of patientInfo.medicalRecord){
            patient.extension.push({
               url:`${encounterResource}/${record[1].id}`,
               valueString:record[0]
            })
         }
      }
      return patient
   }

   parseMedicalService(medicalService:MedicalService){
      let healthcareService:HealthcareService = {
         resourceType:medicalService.resourceType,
         id:medicalService.id,
         comment:medicalService.comment,
         name:medicalService.name
      }
      healthcareService.type=[]
      if(medicalService.serviceType){
         for(let type of medicalService.serviceType){
            healthcareService.type.push({
               coding:[
                  {
                     system:type.serviceType,
                     code:type.serviceType,
                     display:type.serviceType
                  }
               ],
               text:type.serviceType
            })
         }
      }
      return healthcareService
   }

   parseInstitutionInfo(institutionInfo:InstitutionInfo){
      let organization:Organization = {
         resourceType:(institutionInfo.resourceType?institutionInfo.resourceType:organizationResource),
         id:(institutionInfo.id?institutionInfo.id:''),
         extension:[],
         alias:[],
         name:(institutionInfo.name?institutionInfo.name:''),
         telecom:(institutionInfo.telecom?institutionInfo.telecom:[]),
         type:(institutionInfo.type?institutionInfo.type:[]),
         address:(institutionInfo.address?institutionInfo.address:[])
      }
      if(institutionInfo.medicalServices){
         for(let service of institutionInfo.medicalServices){
            let healthcareService:HealthcareService = this.parseMedicalService(service)
            organization.extension.push({
               url:`${healthcareService.resourceType}/${healthcareService.id}`,
               valueString:healthcareService.name
            })
         }
      }
      if(institutionInfo.alias){
         for(let alias of institutionInfo.alias)
            organization.alias.push(alias.alias)
      }
      return organization
   }
}

export const encounterResource="Encounter"
export const patientResource="Patient"
export const organizationResource="Organization"
export const healthcareServiceResource="HealthcareService"

export interface Patient{
   resourceType:string,
   identifier?:Array<{
      system:string,
      value:string
   }>,
   active?:boolean,
   id?:string,
   name?:Name[],
   telecom?:Telecom[],
   birthDate?:string,
   gender?:string,
   address?:Address[],
   extension?:Extension[],
   maritalStatus?:CodeAbleConcept,
   link?:Array<{other:Reference}>,
}
export interface Organization{
   resourceType:string,
   id?:string,
   name?:string,
   address?:Address[],
   type?:CodeAbleConcept[],
   telecom?:Array<{system:string,value:string}>,
   alias?:string[],
   extension?:Extension[]
}

export interface Encounter{
   resourceType:string,
   id?:string,
   type?:CodeAbleConcept[] //use for store symptom
   subject?:Reference, //use for patient referencce
   period?:{ //time
      start:string,
      end:string
   },
   serviceProvider?:Reference, //use for save organization
}

export interface HealthcareService{
   resourceType:string,
   id?:string,
   type?:CodeAbleConcept[],
   name?:string,
   comment?:string
}

export interface Address{
    line?:Array<string>,
    use?:string,
    city?:string,
    state?:string,
    postalCode?:string,
    country?:string
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
 export interface Extension{
    url:string,
    valueString:string
 }

 export interface CodeAbleConcept{
   coding:Coding[],
   text:string
 }

 export interface Coding{
    system:string,
    code:string,
    display:string
 }

 export interface Reference{
    reference?:string, //url
    display:string //display content
 }

 export interface Resource{
    resourceType:string,
    id?:string
 }