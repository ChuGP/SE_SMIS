import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { PatientManagerComponent } from './patient-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { Encounter,Patient,Reference } from '../fhir-entity/fhirentity';
describe('PatientManagerComponent', () => {
  let component: PatientManagerComponent;
  let fixture: ComponentFixture<PatientManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientManagerComponent 
      ],
      imports:[
        HttpClientModule,
      ],
      providers:[
        FHIRProxyService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('parseEncounter should work',()=>{
    
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
          text:"過敏"
        },
        {
          coding:[
  
          ],
          text:"過敏"
        }
    ],
      serviceProvider:{
        reference:"Organization/99887",
        display:"Ntut health care team"
      }
    }
    let medicalRecord=component.parseEncounter(encounter);
    expect(medicalRecord.diagnosis.length).toEqual(2)
    expect(medicalRecord.organization).toEqual(encounter.serviceProvider.display)
  })

  it('should parse patient',async()=>{
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
      "link": [
          {
              "other": {
                  "reference": "Patient/6",
                  "display": "dad"
              }
          }
      ]
  }
  
    let info=await component.parsePatient(patient)
    expect(info.medicalRecord.size).toEqual(2)
  })
});
