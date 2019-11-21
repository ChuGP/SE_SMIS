import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FHIRProxyService } from './fhirproxy.service';
import { PatientInfo, InstitutionInfo } from '../fhir-entity/fhirentity';

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

  it('should get patient 6',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let patientId='6';
    let verify=(resp:PatientInfo)=>{
      expect(resp.id).toEqual(patientId);
      expect(resp.gender).toEqual('male');
      expect(resp.birthDate).toEqual('1990-11-21');
      
    }
    service.getPatientByIdRequest(patientId,verify);

  });

  it('should get institution 70466',()=>{
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    let institutionId='70466';
    let verify=(resp:InstitutionInfo)=>{
      expect(resp.id).toEqual(institutionId);
      expect(resp.telecom.length).toEqual(3);
      // expect(resp).toEqual(undefined);
    }
    service.getInstitutionByIdRequest(institutionId,verify);

  });
});
