import { Injectable } from '@angular/core';
import { FacebookLoginProvider,SocialUser,AuthService,GoogleLoginProvider } from "angularx-social-login";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: SocialUser;
  private islogin;
  constructor(private authService:AuthService) {
    this.islogin = false;
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.islogin = (user!=null)
    });
  }

  loginWithFb(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logoff(){
    if(this.isLogin())
      this.authService.signOut();
  }

  isLogin(){
    return this.islogin
  }

  getUserInfo(){
    return this.user
  }

}
