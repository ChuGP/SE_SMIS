import { Injectable } from '@angular/core';
import { FacebookLoginProvider,SocialUser,AuthService,GoogleLoginProvider } from "angularx-social-login";
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { Resource, patientResource, organizationResource } from '../fhir-entity/fhirentity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: SocialUser;
  private menu=[]
  private islogin;
  constructor(private authService:AuthService, private fhirProxy:FHIRProxyService, private router:Router) {
    this.islogin = false;
    this.authService.authState.subscribe(async (user) => {
      if(user){
        this.user = user
        this.islogin = true
        let userId = user.email.replace('@','')
        let patient:Resource = await fhirProxy.getResource(patientResource,userId)
        let organization = await fhirProxy.getResource(organizationResource,userId)
        if(patient.resourceType == patientResource){
          this.menu = getPatientMenu(userId)
          this.router.navigate([''])
        }
        else if(organization.resourceType == organizationResource){
          this.menu = getInstitutionMenu(userId)
          this.router.navigate([''])
        }
        else{
          this.menu = getNewMemberMenu()
          this.router.navigate(['create-role'])
        }
      }
    });
  }

  clearSesion(){
    this.user = undefined
    this.menu = []
    this.islogin = false;
  }

  loginWithFb(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logoff(){
    if(this.isLogin()){
      this.authService.signOut();
      this.clearSesion()
      this.router.navigate(['login'])
    }
  }

  isLogin(){
    return this.islogin
  }

  getUserInfo(){
    return this.user
  }

}

export function getPatientMenu(userId){
  return [
    {
      url:['patient-information-management',userId],
      display:'病人資訊管理功能'
    },
    {
      url:['medical-institution-recommend'],
      display:'醫療機構過濾功能'
    },
    {
      url:['medical-information-sharing'],
      display:'醫療資訊共享功能'
    },
  ]
}

export function getInstitutionMenu(userId){
  return [
    {
      url:['medical-institution-management',userId],
      display:'醫療機構資訊管理功能'
    },
    {
      url:['medical-information-sharing'],
      display:'醫療資訊共享功能'
    },
  ]
}
export function getNewMemberMenu(){
  return [
    {
      url:['create-role'],
      display:'創建角色功能'
    },
  ]
}

