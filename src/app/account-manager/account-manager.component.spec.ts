import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagerComponent } from './account-manager.component';
import {AccountManagerComponentModule} from './account-manager.component.module'
describe('AccountManagerComponent', () => {
  let component: AccountManagerComponent;
  let fixture: ComponentFixture<AccountManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports:[
        AccountManagerComponentModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
