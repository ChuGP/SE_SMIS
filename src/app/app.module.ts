import { NgModule} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MedicalResourceFilterComponent } from './medical-resource-filter/medical-resource-filter.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { PatientManagerComponent } from './patient-manager/patient-manager.component';
import { InstitutionManagerComponent } from './institution-manager/institution-manager.component';
import { SharedInfoManagerComponent } from './shared-info-manager/shared-info-manager.component';
import { CreateRoleComponent } from './create-role/create-role.component'

import { AccountManagerComponentModule } from './account-manager/account-manager.component.module';
import { HomeComponentModule } from './home/home.component.module';
import { LoginComponentModule } from './login/login.component.module'
import { CreateRoleModule } from './create-role/create-role.component.module';
import { SharedInfoManagerComponentModule } from './shared-info-manager/shared-info-manager.component.module';
import { MedicalResourceFilterComponentModule } from './medical-resource-filter/medical-resource-filter.component.module';
import { TopBarComponentModule } from './top-bar/top-bar.component.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'account', component:AccountManagerComponent},
      { path: 'login', component:LoginComponent},
      { path: 'create-role', component:CreateRoleComponent},
      { path: 'patient-information-management', component:PatientManagerComponent},
      { path: 'medical-information-sharing', component:SharedInfoManagerComponent},
      { path: 'medical-institution-management', component:InstitutionManagerComponent},
      { path: 'medical-institution-recommend', component:MedicalResourceFilterComponent}]),
    AccountManagerComponentModule,
    HomeComponentModule,
    LoginComponentModule,
    CreateRoleModule,
    SharedInfoManagerComponentModule,
    MedicalResourceFilterComponentModule,
    TopBarComponentModule
  ],
  declarations: [
    AppComponent,
  ],
  providers:[
  ],
  bootstrap: [ 
    AppComponent
  ],
  schemas:[]
    
})
export class AppModule { }
