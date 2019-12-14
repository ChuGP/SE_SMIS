import { Injectable } from '@angular/core';
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { FHIREntityAdapter, Patient, patientResource, HealthcareService, healthcareServiceResource, Organization, organizationResource, Encounter, encounterResource, SearchResult, searchResource } from '../fhir-entity/fhirentity';
import { SMISEntityAdapter, PatientInfo, MedicalService, InstitutionInfo, MedicalRecord } from '../smis-entity/smisentity';

@Injectable({
  providedIn: 'root'
})
export class SMISFacadeService {

  constructor(private fhirProxy:FHIRProxyService, private fhirAdapter:FHIREntityAdapter, private smisAdapter:SMISEntityAdapter) {

  }

  async updatePatient(patientInfo:PatientInfo){
    let patient:Patient = this.fhirAdapter.parsePatientInfo(patientInfo)
    if(patient.id)
      patient = await this.fhirProxy.updateResource(patientResource,patient)
    else
      patient = await this.fhirProxy.createResource(patientResource,patient)
    return await this.smisAdapter.parsePatient(patient)
  }

  async getPatient(patientId){
    let patient:Patient = await this.fhirProxy.getResource(patientResource,patientId)     
    return await this.smisAdapter.parsePatient(patient) as PatientInfo
  }

  async getInstitution(id){
    let organization:Organization = await this.fhirProxy.getResource(organizationResource,id)
    return await this.smisAdapter.parseOrganization(organization) as InstitutionInfo
  }

  async updateInstitution(institution:InstitutionInfo){
    let organization:Organization = this.fhirAdapter.parseInstitutionInfo(institution)
    if(organization.id)
      organization = await this.fhirProxy.updateResource(organizationResource,organization)
    else
      organization = await this.fhirProxy.createResource(organizationResource,organization)
    return await this.smisAdapter.parseOrganization(organization)
  }

  async updateMedicalService(medicalService:MedicalService){
    let healthcareService:HealthcareService = this.fhirAdapter.parseMedicalService(medicalService)
    if(healthcareService.id)
      healthcareService = await this.fhirProxy.updateResource(healthcareServiceResource,healthcareService)
    else
      healthcareService = await this.fhirProxy.createResource(healthcareServiceResource,healthcareService)
    return this.smisAdapter.parseHealthCareService(healthcareService)
  }

  async updateMedicalServices(medicalServices:MedicalService[]){
    let result:MedicalService[] = []
    for(let medicalService of medicalServices)
        result.push(await this.updateMedicalService(medicalService))
    return result
  }

  async updateMedicalRecord(medicalRecord:MedicalRecord){
    let encounter:Encounter = this.fhirAdapter.parseMedicalRecord(medicalRecord)
    let result:Encounter;
    if(encounter.id)
      result = await this.fhirProxy.updateResource(encounterResource,encounter)
    else
      result = await this.fhirProxy.createResource(encounterResource,encounter)
    return this.smisAdapter.parseEncounter(result)
  }

  async searchInstitution(params){
    let institutions:InstitutionInfo[] = []
    let institutionResult:SearchResult = await this.fhirProxy.searchResource(organizationResource,params)
    if(institutionResult.resourceType == searchResource && institutionResult.total>0){
      for(let entry of institutionResult.entry){
        let organization:Organization = entry.resource
        institutions.push(await this.smisAdapter.parseOrganization(organization,false))
      }
    }
    return institutions
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

}
