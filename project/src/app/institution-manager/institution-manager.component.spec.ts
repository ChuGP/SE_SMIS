import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionManagerComponent } from './institution-manager.component';
import {InstitutionManagerComponentModule} from './institution-manager.component.module'
describe('InstitutionManagerComponent', () => {
  let component: InstitutionManagerComponent;
  let fixture: ComponentFixture<InstitutionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
      ],
      imports:[
        InstitutionManagerComponentModule
      ],
      providers:[
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
