import {NgModule} from '@angular/core'
import { FHIRProxyModule } from '../fhir-proxy/fhirproxy.service.module';
import { FHIREntityModule } from '../fhir-entity/fhirentity.module';
import { SMISEntityModule } from '../smis-entity/smisentity.module';
@NgModule({
    imports:[
        FHIRProxyModule,
        FHIREntityModule,
        SMISEntityModule
    ]
})
export class SMISFacadeModule{

}