import { TestBed } from '@angular/core/testing';

import { LoginService } from './login-service.service';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';
import { provideConfig } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      RouterTestingModule
    ],
    declarations: [
      
    ],
    providers:[
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
      AuthService,
      LoginService
    ],   
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
