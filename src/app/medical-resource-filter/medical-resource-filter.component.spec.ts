import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalResourceFilterComponent } from './medical-resource-filter.component';
import { MedicalResourceFilterComponentModule } from './medical-resource-filter.component.module';
describe('MedicalResourceFilterComponent', () => {
  let component: MedicalResourceFilterComponent;
  let fixture: ComponentFixture<MedicalResourceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[
        MedicalResourceFilterComponentModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalResourceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
