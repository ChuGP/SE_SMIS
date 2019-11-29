import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { PatientManagerComponent } from './patient-manager.component';
import { HttpClientModule } from '@angular/common/http';
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

  
});
