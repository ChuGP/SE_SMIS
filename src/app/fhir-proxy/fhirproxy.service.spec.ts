import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FHIRProxyService } from './fhirproxy.service';
import { Patient, Organization} from '../fhir-entity/fhirentity';

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
      birthDate:"2020-02-29"
        }
    let fakePatient:Patient={resourceType:"Patient"};
    const verify=(resp:Patient)=>{
      expect(resp.resourceType).toEqual("Patient");
      expect(resp.resourceType).toEqual("Patient");
    }

    service.createPatientRequest(fakePatient,verify);
    service.createPatientRequest(patient,(info:Patient)=>{
      expect(patient).toEqual(info);
    });

  });

  it('should update patient',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let fakePatient:Patient={
      resourceType:"Patient",
      id:'6'
    };
    service.updatePatientRequest(fakePatient,(info:Patient)=>{
      expect(info.resourceType).toEqual("Patient")
    });
  })

  it('should get patient 6',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let patientId='6';
    let verify=(resp:Patient)=>{
      expect(resp.resourceType).toEqual("Patient")
    }
    service.getPatientByIdRequest(patientId,verify);

  });

  it('should create institution',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let fakeInstitution:Organization = {
      'resourceType':"Organization"
    }
    service.createInstitustionRequest(fakeInstitution,(info:Organization)=>{
      console.log(`id:${info.id}`)
      expect(1).toEqual(2)
    })
  });

  it('should get institution 70466',async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let institutionId='70466';
    let verify=(resp:Organization)=>{
      expect(resp.id).toEqual(institutionId);
      expect(resp.telecom.length).toEqual(3);
    }
    service.getInstitutionByIdRequest(institutionId,verify);

  });

  it('should update instituiton', async()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let fakeInstitution:Organization={
      resourceType:"Organization",
      id:'6'
    };
    service.updateInstitutionRequest(fakeInstitution,(info:Organization)=>{
      expect(info.resourceType).toEqual("Organization")
    });
  })

});
