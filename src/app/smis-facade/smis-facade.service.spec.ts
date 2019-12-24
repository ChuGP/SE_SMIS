import { TestBed, async } from '@angular/core/testing';
import { patients } from '../fhir-datas/patients'
import { organizations } from '../fhir-datas/organizations'
import { SMISFacadeService } from './smis-facade.service';
import { SMISFacadeModule } from './smis-facade.service.module';
import { from } from 'rxjs';
import { InstitutionInfo, PatientInfo, MedicalRecord } from '../smis-entity/smisentity';
import { HealthcareService } from '../fhir-entity/fhirentity';

describe('SmisFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      SMISFacadeModule
    ]
  }));

  it('should be created', () => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    expect(service).toBeTruthy();
  });

  it('isPatient()', () => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    expect(service.isPatient(patients[0])).toBeTruthy();
  });

  it('isInstitution()', () => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    let institution:InstitutionInfo={
      resourceType:"Organization"
    }
    expect(service.isInstitution(institution)).toBeTruthy();
  });

  it('getPatient()', () => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    expect(service.getPatient(5)).toBeTruthy();
  });

  it('updatePatient()', async() => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    let patient:PatientInfo={
      resourceType:"Patient",
      privateKey:''
    }
    expect(await service.updatePatient(patient)).toBeTruthy();
    let patientWithID:PatientInfo={
      resourceType:"Patient",
      privateKey:'',
      id:'5'
    }
    expect(await service.updatePatient(patientWithID)).toBeTruthy();
  });

  it('getInstitution()', async() => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    expect(await service.getInstitution(5)).toBeTruthy();
  });

  it('updateInstitution()', async() => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    let institution:InstitutionInfo={
      resourceType:"Organization",
      medicalServices:[]
    }
    expect(await service.updateInstitution(institution)).toBeTruthy();
    let institutionWithID:InstitutionInfo={
      resourceType:"Patient",
      medicalServices:[],
      id:'5'
    }
    expect(await service.updateInstitution(institutionWithID)).toBeTruthy();
  });

  it('updateHealthcareService()', async() => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    let healthcareService:HealthcareService={
      resourceType:"Organization"
    }
    expect(await service.updateHealthcareService(healthcareService)).toBeTruthy();
    let healthcareServiceWithID:HealthcareService={
      resourceType:"Patient",
      id:'5'
    }
    expect(await service.updateHealthcareService(healthcareServiceWithID)).toBeTruthy();
  });

});
