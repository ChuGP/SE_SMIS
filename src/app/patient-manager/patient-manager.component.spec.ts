import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { PatientManagerComponent } from './patient-manager.component';
import { HttpClientModule } from '@angular/common/http';
import{RouterTestingModule} from '@angular/router/testing'
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from '../app.module';
describe('PatientManagerComponent', () => {
  let component: PatientManagerComponent;
  let fixture: ComponentFixture<PatientManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientManagerComponent 
      ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule
      ],
      providers:[
        FHIRProxyService,
        {
          provide: AuthServiceConfig,
          useFactory: provideConfig
        },
        AuthService
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
