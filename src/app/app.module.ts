import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MedicalResourceFilterComponent } from './medical-resource-filter/medical-resource-filter.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { PatientManagerComponent } from './patient-manager/patient-manager.component';
import { InstitutionManagerComponent } from './institution-manager/institution-manager.component';
import { SharedInfoManagerComponent } from './shared-info-manager/shared-info-manager.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatGridListModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'account', component:AccountManagerComponent},
      { path: 'login', component:LoginComponent},
      { path: 'create-account', component:CreateAccountComponent},
      { path: 'patient-information-management', component:PatientManagerComponent},
      { path: 'medical-information-sharing', component:SharedInfoManagerComponent},
      { path: 'medical-institution-management', component:InstitutionManagerComponent},
      { path: 'medical-institution-recommend', component:MedicalResourceFilterComponent},
      
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    MedicalResourceFilterComponent,
    AccountManagerComponent,
    PatientManagerComponent,
    InstitutionManagerComponent,
    SharedInfoManagerComponent,
  ],
  bootstrap: [ 
    AppComponent
  ]
    
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/