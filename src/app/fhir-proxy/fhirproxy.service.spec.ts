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

  it('should create patient',()=>{
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
          others:{
            reference:`service.baseUrl/Patient/6`,
            display:"dad"
          }
        }
      ]
        }
    let fakePatient:Patient={resourceType:"Patient"};
    const verify=(resp:Patient)=>{
      expect(resp.resourceType).toEqual("Patient");
      expect(resp.resourceType).toEqual("Patient");
    }

    service.createResource(resourceType,fakePatient,verify);
    service.createResource(resourceType,patient,(info:Patient)=>{
      expect(patient.resourceType).toEqual(info.resourceType);
    });

  });

  it('should update patient',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Patient'
    let fakePatient:Patient={
      resourceType:"Patient",
      id:'6'
    };
    service.updateResource(resourceType,fakePatient,(info:Patient)=>{
      expect(info.resourceType).toEqual(resourceType)
    });
  })

  it('should get patient 6',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Patient'
    let patientId='6';
    let verify=(resp:Patient)=>{
      expect(resp.resourceType).toEqual(resourceType)
    }
    service.getResource(resourceType,patientId,verify);

  });

  it('should create Organization',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Organization'
    let fakeOrganization:Organization = {
      'resourceType':"Organization"
    }
    service.createResource(resourceType,fakeOrganization,(info:Organization)=>{
      expect(fakeOrganization.resourceType).toEqual(resourceType)
    })
  });

  it('should get Organization 70466',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Organization'
    let OrganizationId='70466';
    let verify=(resp:Organization)=>{
      expect(resp.id).toEqual(OrganizationId);
      expect(resp.telecom.length).toEqual(3);
    }
    service.getResource(resourceType,OrganizationId,verify);

  });

  it('should update instituiton', ()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Organization'
    let fakeOrganization:Organization={
      resourceType:"Organization",
      id:'6'
    };
    service.updateResource(resourceType,fakeOrganization,(info:Organization)=>{
      expect(info.resourceType).toEqual(resourceType)
    });
  })

  it('should get Encounter', ()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Encounter'
    service.getResource(resourceType,'101990',(info:Encounter)=>{
      expect(info.resourceType).toEqual("Encounter")
    });
  })

  it('should get Resource', ()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Encounter'
    service.getResource(resourceType,'101990',(info:Resource)=>{
      const encounter:Encounter=info
      expect("Patient/101821").toEqual(encounter.subject.reference)
    });

    service.getResource('Organization','102604',(resource:Organization)=>{
      expect(resource.extension[0].url).toEqual("http://hl7.org/fhir/12345")
    })
  })

  it('should get Extension', ()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let resourceType='Encounter'
    service.getResource(resourceType,'101990',(info:Resource)=>{
      const encounter:Encounter=info
      expect("Patient/101821").toEqual(encounter.subject.reference)
      service.getExtensionResource(encounter.subject.reference,(patient:Patient)=>{
        expect(patient.resourceType).toEqual('Patient')
      })
    });
    
  })

});
