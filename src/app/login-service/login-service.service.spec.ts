import { TestBed } from '@angular/core/testing';
import { LoginService } from './login-service.service';
import {LoginServiceModule} from './login-service.service.module'

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      LoginServiceModule,
    ],
    declarations: [
      
    ],
    providers:[],   
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
