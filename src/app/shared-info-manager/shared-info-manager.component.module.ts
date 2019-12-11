import {NgModule} from '@angular/core'
import { MatTableModule } from '@angular/material' ;
import { SharedInfoManagerComponent } from './shared-info-manager.component';
import { FHIRProxyModule } from '../fhir-proxy/fhirproxy.service.module';
import { SMISEntityModule } from '../smis-entity/smisentity.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceModule } from '../login-service/login-service.service.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        MatTableModule,
        FHIRProxyModule,
        SMISEntityModule,
        RouterTestingModule,
        LoginServiceModule,
        SMISFacadeModule
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