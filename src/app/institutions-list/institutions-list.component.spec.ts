import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsListComponent } from './institutions-list.component';
import { InstitutionsListModule } from './institutions-list.component.module';

describe('InstitutionsListComponent', () => {
  let component: InstitutionsListComponent;
  let fixture: ComponentFixture<InstitutionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[InstitutionsListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
