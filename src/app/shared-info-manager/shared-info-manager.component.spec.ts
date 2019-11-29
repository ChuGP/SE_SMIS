import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInfoManagerComponent } from './shared-info-manager.component';
import { MatTableModule } from '@angular/material' ;
describe('SharedInfoManagerComponent', () => {
  let component: SharedInfoManagerComponent;
  let fixture: ComponentFixture<SharedInfoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedInfoManagerComponent ],
      imports:[
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedInfoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
