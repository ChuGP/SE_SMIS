import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {MatRadioModule}  from '@angular/material/radio'
import {FormsModule} from '@angular/forms'
import { CreateRoleComponent} from './create-role.component'
import { BrowserModule } from '@angular/platform-browser';
import {PatientManagerComponentModule} from '../patient-manager/patient-manager.component.module'
import {InstitutionManagerComponentModule} from '../institution-manager/institution-manager.component.module'
import { RouterTestingModule } from '@angular/router/testing';
@NgModule({
    imports: [
        BrowserModule,
        MatRadioModule,
        FormsModule,
        InstitutionManagerComponentModule,
        PatientManagerComponentModule,
        RouterTestingModule
    ],
    exports:[
        CreateRoleComponent
    ],
    declarations:[
        CreateRoleComponent,
    ],
    providers:[],
    schemas:[]

})
export class CreateRoleModule{

}