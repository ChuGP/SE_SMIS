import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientManagerComponent } from './patient-manager.component';
import {PatientManagerComponentModule} from './patient-manager.component.module'
describe('PatientManagerComponent', () => {
  let component: PatientManagerComponent;
  let fixture: ComponentFixture<PatientManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
      ],
      imports:[
        PatientManagerComponentModule
      ],
      providers:[
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
