import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FHIRProxyService } from './fhirproxy.service';
import { Patient, Organization, Encounter, Resource} from '../fhir-entity/fhirentity';

describe('FHIRProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations:[],
    imports:[
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    expect(service).toBeTruthy();
  });

  it('should create patient',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Patient'
    let patient:Patient={
      resourceType:"Patient",
      gender:"male",
      active:true,
      telecom:[
        {
          system: "phone",
          value: "08 4564 3214",
          use: "home",
          rank:2
        }],
      name:[{
        use: "usual",
        family: "Nguyen",
        given: ["Jimmy"]
         }],
      address: [{
            use: "home",
            line: [
              "Unit 7",
              "76 Clydesdale St"
                ],
            city: "Como",
            state: "WA",
            postalCode: "6152",
            country: "Australia"
          }],
      birthDate:"2020-02-29",
      link:[
        {
          other:{
            reference:`service.baseUrl/Patient/6`,
            display:"dad"
          }
        }
      ]
        }
    let info:Patient=await service.createResource(resourceType,patient)
    expect(patient.resourceType).toEqual(info.resourceType);
  });

  it('should update patient',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Patient'
    let fakePatient:Patient={
      resourceType:"Patient",
      id:'6'
    };
    const info:Patient=await service.updateResource(resourceType,fakePatient);
    expect(info.resourceType).toEqual(resourceType)
  })

  it('should get patient 6',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Patient'
    let patientId='6';
    let patient:Patient=await service.getResource(resourceType,patientId);
    expect(patient.resourceType).toEqual(resourceType)

  });

  it('should create Organization',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Organization'
    let fakeOrganization:Organization = {
      'resourceType':"Organization"
    }
    let org:Organization=await service.createResource(resourceType,fakeOrganization)
    expect(org.resourceType).toEqual(resourceType)
  });

  it('should get Organization 70466',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Organization'
    let OrganizationId='70466';
    let org:Organization=await service.getResource(resourceType,OrganizationId);
    expect(org.id).toEqual(OrganizationId);
    expect(org.telecom.length).toEqual(3);
  });

  it('should update instituiton', async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Organization'
    let fakeOrganization:Organization={
      resourceType:"Organization",
      id:'104021'
    };
    let info=await service.updateResource(resourceType,fakeOrganization)
    expect(info.resourceType).toEqual(resourceType)
  })

  it('should get Encounter', async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Encounter'
    let info:Encounter=await service.getResource(resourceType,'101990')
    expect(info.resourceType).toEqual("Encounter")
  })

  it('should get Resource', async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Encounter'
    const encounter:Encounter=await service.getResource(resourceType,'101990')
    expect("Patient/101821").toEqual(encounter.subject.reference)
    const org:Organization=await service.getResource('Organization','102604')
    expect(org.extension[0].url).toEqual("http://hl7.org/fhir/12345")
  })

  it('should get Extension', async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Encounter'
    const encounter:Encounter=await service.getResource(resourceType,'101990');
    expect("Patient/101821").toEqual(encounter.subject.reference)
    const patient:Patient=await service.getExtensionResource(encounter.subject.reference)
    expect(patient.resourceType).toEqual('Patient')
  })

  it('async getExtension should return',async ()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    const encounter:Encounter=await service.getExtensionAsync('Encounter/102869');
    expect(encounter.resourceType).toEqual('Encounter')
  })

});
