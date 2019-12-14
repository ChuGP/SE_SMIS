import { Injectable } from '@angular/core';
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { FHIREntityAdapter, Patient, patientResource, HealthcareService, healthcareServiceResource, Organization, organizationResource, Encounter, encounterResource, SearchResult, searchResource, operationOutcome, Resource } from '../fhir-entity/fhirentity';
import { SMISEntityAdapter, PatientInfo, MedicalService, InstitutionInfo, MedicalRecord, Extension } from '../smis-entity/smisentity';

@Injectable({
  providedIn: 'root'
})
export class SMISFacadeService {

  constructor(private fhirProxy: FHIRProxyService, private fhirAdapter: FHIREntityAdapter, private smisAdapter: SMISEntityAdapter) {

  }

  async getPatient(patientId) {
    let patient: Patient = await this.fhirProxy.getResource(patientResource, patientId)
    return await this.smisAdapter.parsePatient(patient) as PatientInfo
  }

  async updatePatient(patientInfo: PatientInfo) {
    let patient: Patient = this.fhirAdapter.parsePatientInfo(patientInfo)
    if (patient.id)
      patient = await this.fhirProxy.updateResource(patientResource, patient)
    else
      patient = await this.fhirProxy.createResource(patientResource, patient)
    return await this.smisAdapter.parsePatient(patient)
  }

  async getInstitution(id) {
    let organization: Organization = await this.fhirProxy.getResource(organizationResource, id)
    return await this.smisAdapter.parseOrganization(organization) as InstitutionInfo
  }

  async updateOrganization(organization: Organization) {
    if (organization.id)
      organization = await this.fhirProxy.updateResource(organizationResource, organization)
    else
      organization = await this.fhirProxy.createResource(organizationResource, organization)
    return organization
  }

  async updateInstitution(institution: InstitutionInfo) {
    let healthcareServices: HealthcareService[] = []
    for (let service of institution.medicalServices)
      healthcareServices.push(this.fhirAdapter.parseMedicalService(service))
    let organization: Organization = this.fhirAdapter.parseInstitutionInfo(institution)
    organization = await this.updateOrganization(organization)
    let extensions: Extension[] = []
    for (let service of healthcareServices) {
      service.providedBy = {
        reference: `${organizationResource}/${organization.id}`,
        display: `${organization.name}`
      }
      service = await this.updateHealthcareService(service)
      extensions.push({
        url: `${healthcareServiceResource}/${service.id}`,
        valueString: `${service.name}`
      })
    }
    organization.extension = extensions
    organization = await this.updateOrganization(organization)
    return await this.smisAdapter.parseOrganization(organization)
  }

  async updateHealthcareService(healthcareService: HealthcareService) {
    if (healthcareService.id)
      healthcareService = await this.fhirProxy.updateResource(healthcareServiceResource, healthcareService)
    else
      healthcareService = await this.fhirProxy.createResource(healthcareServiceResource, healthcareService)
    return healthcareService
  }

  async updateMedicalRecord(medicalRecord: MedicalRecord) {
    let encounter: Encounter = this.fhirAdapter.parseMedicalRecord(medicalRecord)
    let result: Encounter;
    if (encounter.id)
      result = await this.fhirProxy.updateResource(encounterResource, encounter)
    else
      result = await this.fhirProxy.createResource(encounterResource, encounter)
    return this.smisAdapter.parseEncounter(result)
  }

  async searchInstitution(params) {
    let institutions: InstitutionInfo[] = []
    let institutionResult: SearchResult = await this.fhirProxy.searchResource(organizationResource, params)
    if (institutionResult.resourceType == searchResource && institutionResult.total > 0) {
      for (let entry of institutionResult.entry) {
        let organization: Organization = entry.resource
        institutions.push(await this.smisAdapter.parseOrganization(organization, false))
      }
    }
    return institutions
  }

  getDefaultPatient() {
    return {
      resourceType: patientResource,
      privateKey: "",
      address: [
        {
          city: ""
        }
      ],
      telecom: [{}],
      name: [{
        given: [""],
        family: "",
        use: ""
      }],
      birthDate: "",
      maritalStatus: {
        coding: [],
        text: ""
      },
      medicalRecord: [],
      photo: []
    };
  }

  getDefaultInstitutionInfo() {
    let institution: InstitutionInfo = {
      resourceType: "Organization",
      id: '',
      name: '',
      address: [
        {
          city: ""
        }
      ],
      medicalServices: [this.getDefaultMedicalService()],
      type: [],
      telecom: [
        {
          system: "",
          value: ""
        }
      ],
      alias: [{ alias: '' }]
    }
    return institution
  }

  getDefaultMedicalService(): MedicalService {
    return {
      resourceType: healthcareServiceResource,
      id: '',
      serviceType: [{ serviceType: '' }],
      name: '',
      comment: ''
    }
  }

}
