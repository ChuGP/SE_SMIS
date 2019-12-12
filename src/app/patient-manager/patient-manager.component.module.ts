import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientManagerComponent } from './patient-manager.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { LoginServiceModule } from '../login-service/login-service.service.module'
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
@NgModule({
    imports: [
        BrowserModule,
        RouterTestingModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        LoginServiceModule,
        SMISFacadeModule
    ],
    exports:[
        PatientManagerComponent
    ],
    declarations:[
        PatientManagerComponent
    ],
    providers:[
        
    ],
   

})
export class PatientManagerComponentModule{

}