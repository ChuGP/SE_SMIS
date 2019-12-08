import {NgModule} from '@angular/core'
import { MedicalResourceFilterComponent } from './medical-resource-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
@NgModule({
    imports:[
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports:[
        MedicalResourceFilterComponent
    ],
    declarations:[
        MedicalResourceFilterComponent
    ],
    providers:[]
})
export class MedicalResourceFilterComponentModule{

}