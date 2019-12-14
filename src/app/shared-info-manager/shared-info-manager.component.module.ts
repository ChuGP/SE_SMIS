import { NgModule } from '@angular/core'
import { SharedInfoManagerComponent } from './shared-info-manager.component';
import { LoginServiceModule } from '../login-service/login-service.service.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
import { PatientManagerComponentModule } from '../patient-manager/patient-manager.component.module';
import { InstitutionsListModule } from '../institutions-list/institutions-list.component.module'
@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        LoginServiceModule,
        SMISFacadeModule,
        PatientManagerComponentModule,
        InstitutionsListModule
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