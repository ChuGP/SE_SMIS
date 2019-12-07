import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleComponent } from './create-role.component';
import { CreateRoleModule} from './create-role.component.module'
import {MatRadioModule} from '@angular/material/radio'
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
describe('CreateRoleComponent', () => {
  let component: CreateRoleComponent;
  let fixture: ComponentFixture<CreateRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatRadioModule,
        RouterTestingModule,
        FormsModule,
        CreateRoleModule,
        HttpClientModule
      ],
      providers:[
        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
