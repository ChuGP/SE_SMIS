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

  it('should addAlias', () => {
    let len = component.institution.alias.length
    component.addAlias()
    expect(component.institution.alias.length).toEqual(len+1); 
  });

  it('should removeAlias', () => {
    let len = component.institution.alias.length
    component.removeAlias()
    expect(component.institution.alias.length).toEqual(len-1); 
  });

  it('should addMedicalService', () => {
    let len = component.institution.medicalServices.length
    component.addMedicalService()
    expect(component.institution.medicalServices.length).toEqual(len+1); 
  });

  it('should removeMedicalService', () => {
    let len = component.institution.medicalServices.length
    component.removeMedicalService()
    expect(component.institution.medicalServices.length).toEqual(len-1); 
  });

});
