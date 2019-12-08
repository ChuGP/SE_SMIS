import { FHIREntity, FHIREntityAdapter,Encounter, Patient, HealthcareService, Organization } from './fhirentity';
import { TestBed } from '@angular/core/testing';
import { SMISEntityAdapter, PatientInfo, MedicalRecord, MedicalService, InstitutionInfo } from '../smis-entity/smisentity';
import { encounters} from '../fhir-datas/encounters'
import { patients} from '../fhir-datas/patients'
import { healthCareServices} from '../fhir-datas/healthcareServices'
import {organizations} from '../fhir-datas/organizations'
import {FHIREntityModule} from './fhirentity.module'
import {SMISEntityModule} from '../smis-entity/smisentity.module'
describe('FHIREntity', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations:[],
    imports:[
      FHIREntityModule,
      SMISEntityModule,
    ],
    providers:[
    ]
  }));

  it('should create an instance', () => {
    const adapter=TestBed.get(FHIREntityAdapter)
    expect(adapter).toBeTruthy()
    expect(new FHIREntity()).toBeTruthy();
  });

  it('should parse MedicalRecord to Encounter',()=>{
    const FHIRadapter = TestBed.get(FHIREntityAdapter)
    const SMISadapter = TestBed.get(SMISEntityAdapter)
    let encounter:Encounter = encounters[0]
    let medicalRecord:MedicalRecord = SMISadapter.parseEncounter(encounter)
    let actualResult:Encounter = FHIRadapter.parseMedicalRecord(medicalRecord);
    expect(actualResult).toEqual(encounter)
    
  })

  it('should parse PatientInfo to Patient',async()=>{
    const FHIRadapter = TestBed.get(FHIREntityAdapter)
    const SMISadapter = TestBed.get(SMISEntityAdapter)
    let patient:Patient = patients[0]
    let patientInfo:PatientInfo = await SMISadapter.parsePatient(patient)
    let actualResult:Patient = FHIRadapter.parsePatientInfo(patientInfo)
    expect(actualResult).toEqual(patient)
    expect(actualResult.identifier).toEqual([
        {
        system:"privateKey",
        value:"12345"
      }
    ])
  })

  it('should parse MedicalService to HealthcareService',()=>{
    const FHIRadapter = TestBed.get(FHIREntityAdapter)
    const SMISadapter = TestBed.get(SMISEntityAdapter)
    let healthcareService:HealthcareService = healthCareServices[0]
    let medicalSerive:MedicalService = SMISadapter.parseHealthCareService(healthcareService)
    let actualResult:HealthcareService = FHIRadapter.parseMedicalService(medicalSerive)
    expect(actualResult).toEqual(healthcareService) 
  })

  it('should parse InstitutionInfo to Organization',async()=>{
    const FHIRadapter = TestBed.get(FHIREntityAdapter)
    const SMISadapter = TestBed.get(SMISEntityAdapter)
    let organization:Organization = organizations[0]
    let institutionInfo:InstitutionInfo = await SMISadapter.parseOrganization(organization)
    let actualResult:Organization = FHIRadapter.parseInstitutionInfo(institutionInfo)
    expect(actualResult.address).toEqual(organization.address)
    expect(actualResult.alias.length).toEqual(organization.alias.length)
    expect(actualResult.name).toEqual(organization.name)
    expect(actualResult.extension).toEqual(organization.extension)
  })

});
