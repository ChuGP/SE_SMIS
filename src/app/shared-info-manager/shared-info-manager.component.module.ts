import { NgModule } from '@angular/core'
import { MatTableModule } from '@angular/material' ;
import { SharedInfoManagerComponent } from './shared-info-manager.component';
import { LoginServiceModule } from '../login-service/login-service.service.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
import { PatientManagerComponentModule } from '../patient-manager/patient-manager.component.module';
import { InstitutionManagerComponentModule } from '../institution-manager/institution-manager.component.module';
@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        MatTableModule,
        LoginServiceModule,
        SMISFacadeModule,
        PatientManagerComponentModule,
        InstitutionManagerComponentModule
    ],
    exports:[
        SharedInfoManagerComponent
    ],
    declarations:[
        SharedInfoManagerComponent
    ],
    providers:[]
})
export class SharedInfoManagerComponentModule{

}