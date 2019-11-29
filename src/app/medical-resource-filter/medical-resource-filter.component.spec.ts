import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalResourceFilterComponent } from './medical-resource-filter.component';
import { MatTableModule } from '@angular/material' ;
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('MedicalResourceFilterComponent', () => {
  let component: MedicalResourceFilterComponent;
  let fixture: ComponentFixture<MedicalResourceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalResourceFilterComponent ],
      imports:[
            BrowserAnimationsModule,
            MatTableModule,
            MatPaginatorModule
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
