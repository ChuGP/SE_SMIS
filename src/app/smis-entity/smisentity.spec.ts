import { SMISEntity,SMISEntityAdapter, MedicalService, MedicalRecord, InstitutionInfo } from './smisentity';
import { HttpClientModule } from '@angular/common/http';
import { Encounter,Patient, HealthcareService, Organization } from '../fhir-entity/fhirentity';
import { PatientInfo } from '../smis-entity/smisentity';
import { TestBed } from '@angular/core/testing';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service'
import {encounters} from '../fhir-datas/encounters'
import {patients} from '../fhir-datas/patients'
import {healthCareServices} from '../fhir-datas/healthcareServices'
import { organizations} from '../fhir-datas/organizations'
describe('SMISEntity', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [ 
      ],
      imports:[
        HttpClientModule,
      ],
      providers:[
        FHIRProxyService,
        SMISEntityAdapter
      ]
    })
})

  it('should create an instance', () => {
    expect(new SMISEntity()).toBeTruthy();
  });

  
  it('parseEncounter should work',()=>{
    const adapter: SMISEntityAdapter = TestBed.get(SMISEntityAdapter);
    let encounter:Encounter=encounters[0]

    let expectedMedicalRecord:MedicalRecord={
      id:'102869',
      diagnosis:['allergy','heart attack'],
      organization:{
        reference:"Organization/99776",
        display:"Ntut health center team"
      },
      time:{
        start: "2015-09-09T08:10:21",
        end: "2015-09-09T08:50:21"
      }
    }
    let medicalRecord=adapter.parseEncounter(encounter);
    expect(medicalRecord).toEqual(expectedMedicalRecord)
  })

  it('should parse patient',async()=>{
    const adapter: SMISEntityAdapter = TestBed.get(SMISEntityAdapter);
    let patient:Patient = patients[0]
    let info:PatientInfo = await adapter.parsePatient(patient)
    let item=info.family.find(x=>(x.relation=='dad'))
    expect(info.privateKey).toEqual("12345")
    expect(item.patient.resourceType).toEqual(patient.resourceType)
  })

  it('should parse HealthCareService to MedicalService',()=>{
    const adapter: SMISEntityAdapter = TestBed.get(SMISEntityAdapter);
    const fakeService:HealthcareService = healthCareServices[0]

    let expectedMedicalService:MedicalService = {
      resourceType:"HealthcareService",
      id:fakeService.id,
      name:fakeService.name,
      comment:fakeService.comment,
      serviceType:[
        {serviceType:'Psychotherapy'},
        {serviceType:'Psychiatry'}
      ]
    } 
    let medicalService:MedicalService = adapter.parseHealthCareService(fakeService)
    expect(medicalService).toEqual(expectedMedicalService)
  })

  it('should parse Organization to institution',async()=>{
    const adapter: SMISEntityAdapter = TestBed.get(SMISEntityAdapter);
    let organization:Organization = organizations[0]
    let actualInstitution:InstitutionInfo = await adapter.parseOrganization(organization)
    expect(actualInstitution.address).toEqual(organization.address)
    expect(actualInstitution.medicalServices.length).toEqual(2)
    expect(actualInstitution.id).toEqual(organization.id)
  })

});


