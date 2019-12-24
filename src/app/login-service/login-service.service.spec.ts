import { TestBed } from '@angular/core/testing';
import { LoginService,getInstitutionMenu,getNewMemberMenu,getPatientMenu } from './login-service.service';
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

  it('should clearSesion()', () => {
    const service: LoginService = TestBed.get(LoginService);
    service.clearSesion()
    expect(service.getUserInfo()).toEqual(undefined);
  });

  it('should loginWithFb()', () => {
    const service: LoginService = TestBed.get(LoginService);
    service.loginWithFb()
    expect(service.isLogin()).toEqual(false);
  });

  it('should loginWithGoogle()', () => {
    const service: LoginService = TestBed.get(LoginService);
    service.loginWithGoogle()
    expect(service.isLogin()).toEqual(false);
  });

  it('should loginWithGoogle()', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service.getUserMenu()).toEqual([]);
  });

  it('should getPatientMenu()', () => {
    let patient = getPatientMenu(5)
    expect(patient.length).toBeGreaterThan(1);
  });

  it('should getInstitutionMenu()', () => {
    let Institution = getInstitutionMenu(5)
    expect(Institution.length).toBeGreaterThan(1);
  });

  it('should getNewMemberMenu()', () => {
    let NewMemberMenu = getNewMemberMenu(5)
    expect(NewMemberMenu.length).toBeGreaterThan(0);
  });

  it('should hashString()', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service.hashString('5')).toEqual(1643);
  });
});
