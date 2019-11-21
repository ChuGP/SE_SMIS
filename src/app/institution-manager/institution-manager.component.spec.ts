import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionManagerComponent } from './institution-manager.component';
import { MatGridListModule } from '@angular/material/grid-list';
describe('InstitutionManagerComponent', () => {
  let component: InstitutionManagerComponent;
  let fixture: ComponentFixture<InstitutionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InstitutionManagerComponent,
      ],
      imports:[
        MatGridListModule,
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
