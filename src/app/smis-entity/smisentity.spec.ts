import { SMISEntity,SMISEntityAdapter, MedicalService } from './smisentity';
import { HttpClientModule } from '@angular/common/http';
import { Encounter,Patient,Reference, HealthcareService } from '../fhir-entity/fhirentity';
import { PatientInfo } from '../smis-entity/smisentity';
import { TestBed } from '@angular/core/testing';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service'

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
    let encounter:Encounter={
      resourceType:"Encounter",
      period:{
        start:"2019-01-01T08:10:12",
        end:"2019-01-01T09:10:12"
      },
      type:[
        {
          coding:[
          ],
          text:"allergy"
        },
        {
          coding:[
  
          ],
          text:"heart attack"
        }
    ],
      serviceProvider:{
        reference:"Organization/99887",
        display:"Ntut health center team"
      }
    }
    let medicalRecord=adapter.parseEncounter(encounter);
    expect(medicalRecord.diagnosis.length).toEqual(2)
    expect(medicalRecord.organization).toEqual(encounter.serviceProvider.display)
  })

  it('should parse patient',async()=>{
    const adapter: SMISEntityAdapter = TestBed.get(SMISEntityAdapter);
    let patient:Patient={
      "resourceType": "Patient",
      "id": "102873",
      "extension": [
          {
              "url": "Encounter/102869",
              "valueString": "fff"
          },
          {
              "url": "Encounter/102870",
              "valueString": "fff"
          }
      ],
      "name": [
          {
            "use":"usual",
              "family": "fff",
              "given":["test"]
          }
      ],
      "address":[
        {
            use: "home",
            line: [
                "Unit 7",
                "76 Clydesdale St"
              ],
              city: "Como",
              state: "WA",
              postalCode: "6152",
              country: "Australia"
        }
    ],
      "link": [
          {
              "other": {
                  "reference": "Patient/6",
                  "display": "dad"
              }
          }
      ]
  }
  
    let info:PatientInfo = await adapter.parsePatient(patient)
    expect(info.medicalRecord.size).toEqual(2)
    expect(info.medicalRecord.get("102869").time).toEqual("2015-09-09T08:10:21")
    expect(info.family.size).toEqual(1)
    expect(info.family.get('dad').id).toEqual('6')
    expect(info.address).toEqual(patient.address)
  })

  it('should parse HealthCareService to MedicalService',()=>{
    const adapter: SMISEntityAdapter = TestBed.get(SMISEntityAdapter);
    const fakeService:HealthcareService={
        "resourceType": "HealthcareService",
        "id": "94148",
        "type": [
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394913002",
                        "display": "Psychotherapy"
                    }
                ],
                "text":""
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Psychiatry"
                    }
                ],
                "text":""
            }
        ],
        "name":"Fake medical service",
        "comment":"This Service is for SMIS demo"
    }
    let medicalService:MedicalService = adapter.parseHealthCareService(fakeService)
    expect(medicalService.name).toEqual(fakeService.name)
    expect(medicalService.serviceType.length).toEqual(2)
    expect(medicalService.comment).toEqual(fakeService.comment)
    expect(medicalService.id).toEqual(fakeService.id)
    expect(medicalService.resourceType).toEqual(fakeService.resourceType)
  })

});


