import { NgModule } from "@angular/core";
import { AuthServiceConfig, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("12526582446-q11oa9a1p9p7u92seh267hk8c5rg4li6.apps.googleusercontent.com")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("417817125766065")
    }
  ]);
  export function provideConfig() {
    return config;
  }
@NgModule({
    imports:[
      SMISFacadeModule,
      RouterTestingModule
    ],
    providers:[
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
          },
          AuthService,
          
    ],
    declarations:[]
})
export class LoginServiceModule{

}