import {NgModule} from '@angular/core'
import { MatTableModule } from '@angular/material' ;
import { SharedInfoManagerComponent } from './shared-info-manager.component';
import { FHIRProxyModule } from '../fhir-proxy/fhirproxy.service.module';
import { SMISEntityModule } from '../smis-entity/smisentity.module';
import { RouterTestingModule } from '@angular/router/testing';
@NgModule({
    imports:[
        MatTableModule,
        FHIRProxyModule,
        SMISEntityModule,
        RouterTestingModule
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