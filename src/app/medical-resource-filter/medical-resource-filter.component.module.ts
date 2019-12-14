import {NgModule} from '@angular/core'
import { MedicalResourceFilterComponent } from './medical-resource-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InstitutionsListModule } from '../institutions-list/institutions-list.component.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports:[
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        InstitutionsListModule
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