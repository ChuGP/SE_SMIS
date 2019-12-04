import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionManagerComponent } from './institution-manager.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterTestingModule } from '@angular/router/testing';
describe('InstitutionManagerComponent', () => {
  let component: InstitutionManagerComponent;
  let fixture: ComponentFixture<InstitutionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InstitutionManagerComponent,
      ],
      imports:[
        RouterTestingModule,
        MatGridListModule,
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
