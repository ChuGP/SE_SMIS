import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { FHIRProxyModule} from '../fhir-proxy/fhirproxy.service.module'
import { InstitutionManagerComponent } from './institution-manager.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceModule } from '../login-service/login-service.service.module';
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
@NgModule({
    imports: [
        BrowserModule,
        RouterTestingModule,
        FHIRProxyModule,
        FormsModule,
        LoginServiceModule,
        SMISFacadeModule
    ],
    exports:[
        InstitutionManagerComponent
    ],
    declarations:[
        InstitutionManagerComponent
    ],
    providers:[
        
    ],
   

})
export class InstitutionManagerComponentModule{

}