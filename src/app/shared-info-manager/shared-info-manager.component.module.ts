import {NgModule} from '@angular/core'
import { MatTableModule } from '@angular/material' ;
import { SharedInfoManagerComponent } from './shared-info-manager.component';
@NgModule({
    imports:[
        MatTableModule 
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