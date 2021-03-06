import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInfoManagerComponent } from './shared-info-manager.component';
import { SharedInfoManagerComponentModule } from './shared-info-manager.component.module';
describe('SharedInfoManagerComponent', () => {
  let component: SharedInfoManagerComponent;
  let fixture: ComponentFixture<SharedInfoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports:[
        SharedInfoManagerComponentModule
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
