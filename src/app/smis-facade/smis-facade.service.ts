import { Injectable } from '@angular/core';
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { FHIREntityAdapter, Patient, patientResource, HealthcareService, healthcareServiceResource, Organization, organizationResource, Encounter, encounterResource } from '../fhir-entity/fhirentity';
import { SMISEntityAdapter, PatientInfo, MedicalService, InstitutionInfo, MedicalRecord } from '../smis-entity/smisentity';

@Injectable({
  providedIn: 'root'
})
export class SMISFacadeService {

  constructor(private fhirProxy:FHIRProxyService, private fhirAdapter:FHIREntityAdapter, private smisAdapter:SMISEntityAdapter) {

  }

  async updatePatient(patientInfo:PatientInfo){
    if(patientInfo.medicalRecord){
      let medicalRecords:MedicalRecord[] = []
      for(let medicalRecord of patientInfo.medicalRecord)
        medicalRecords.push(await this.updateMedicalRecord(medicalRecord))
      patientInfo.medicalRecord = medicalRecords
    }
    if(patientInfo.family){
      let family:Array<{relation:string,patient:PatientInfo}> = []
      for(let familyMember of patientInfo.family)
        family.push({
          relation:familyMember.relation,
          patient:await this.updatePatient(familyMember.patient)
        })
      patientInfo.family = family
    }
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

}
