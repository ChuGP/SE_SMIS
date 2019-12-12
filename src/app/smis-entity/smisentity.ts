import {Patient,Encounter, HealthcareService,Reference, Organization, CodeAbleConcept, patientResource, organizationResource} from '../fhir-entity/fhirentity'
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
      let patientInfo:PatientInfo = {
         resourceType:(FHIRPatient.resourceType?FHIRPatient.resourceType:patientResource),
         id:(FHIRPatient.id?FHIRPatient.id:''),
         active:(FHIRPatient.active?FHIRPatient.active:true),
         gender:(FHIRPatient.gender?FHIRPatient.gender:''),
         privateKey:"",
         address:(FHIRPatient.address?FHIRPatient.address:[{city:""}]),
         telecom:(FHIRPatient.telecom?FHIRPatient.telecom:[{}]),
         name:(FHIRPatient.name?FHIRPatient.name:getDefaultName()),
         birthDate:(FHIRPatient.birthDate?FHIRPatient.birthDate:""),
         maritalStatus:(FHIRPatient.maritalStatus?FHIRPatient.maritalStatus:getDefaultCodeAbleConcept()),
         medicalRecord:[],
         family:[]
      }
      if(FHIRPatient.extension){
         for(let extension of FHIRPatient.extension){
         let encounter:Encounter = await this.fhir.getExtensionResource(extension.url)
         patientInfo.medicalRecord.push(this.parseEncounter(encounter))
         }
      }
      if(FHIRPatient.link){
         for(let link of FHIRPatient.link){
            let family:Patient = await this.fhir.getExtensionResource(link.other.reference)
            patientInfo.family.push({
               relation:link.other.display, 
               patient:await this.parsePatient(family)
            })
         }
      }
      if(FHIRPatient.identifier){
         let privateKey = FHIRPatient.identifier.find(x=>(x.system=="privateKey"))
         if(privateKey)
            patientInfo.privateKey = privateKey.value
      }
      return patientInfo
    }
    
    parseEncounter(FHIREncounter:Encounter):MedicalRecord{
      let sympton=[]
      for(let code of FHIREncounter.type)
        sympton.push(code.text)
      
      let medicalRecord:MedicalRecord={
         id:FHIREncounter.id,
         diagnosis:sympton,
         time:FHIREncounter.period,
         organization:FHIREncounter.serviceProvider
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
      if (healthCareService.type){
         for(let service of healthCareService.type){
            if(service.coding){
               for(let display of service.coding)
                  medicalService.serviceType.push({serviceType:display.display})
            }
         }
      }
      return medicalService
    }
    
    async parseOrganization(organization:Organization){
      let institution:InstitutionInfo = {
         resourceType:(organization.resourceType?organization.resourceType:organizationResource),
         id:(organization.id?organization.id:''),
         address:(organization.address?organization.address:getDefaultAddress()),
         telecom:(organization.telecom?organization.telecom:getDefaultTelecom()),
         medicalServices:[],
         type:(organization.type?organization.type:[getDefaultCodeAbleConcept()]),
         alias:[],
         name:(organization.name?organization.name:'')
      }
      if(organization.extension){
         for(let extension of organization.extension)
            institution.medicalServices.push(this.parseHealthCareService(await this.fhir.getExtensionResource(extension.url)))
      }
      if(organization.alias){
         for(let alias of organization.alias)
            institution.alias.push({alias:alias})
      }
      return institution
    }

}

export function getDefaultAddress():Address[]{
   return [{city:""}] as Address[]
}

export function getDefaultTelecom():Telecom[]{
   return [{}] as Telecom[]
}

export function getDefaultCodeAbleConcept(){
   return {
      coding:[],
      text:""
   } as CodeAbleConcept
}

export function getDefaultName():Name[]{
   return [{
      given:[""],
      family:"",
      use:""
   }] as Name[]
}

export interface PatientInfo{
   resourceType:string,
   privateKey:string,
   active?:boolean,
   id?:string,
   name?:Name[],
   telecom?:Telecom[],
   birthDate?:string,
   gender?:string,
   address?:Address[],
   maritalStatus?:CodeAbleConcept,
   family?:Array<{relation:string, patient:PatientInfo}>,
   medicalRecord?:MedicalRecord[];
}

export interface MedicalRecord{
   id?:string
   diagnosis:string[],
   organization:Reference
   time:{
      start:string,
      end:string
   }
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
   type?:CodeAbleConcept[],
   telecom?:Array<Telecom>,
   alias?:Array<{alias:string}>
}
export interface MedicalService{
   resourceType:string,
   id:string,
   name:string,
   serviceType:Array<{serviceType:string}>,
   comment?:string,
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
  use?:string,
  family?:string,
  given?:string[]  
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