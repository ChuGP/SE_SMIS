import { NgModule } from '@angular/core';
import {MatRadioModule}  from '@angular/material/radio'
import {FormsModule} from '@angular/forms'
import { CreateRoleComponent} from './create-role.component'
import { BrowserModule } from '@angular/platform-browser';
import {PatientManagerComponentModule} from '../patient-manager/patient-manager.component.module'
import {InstitutionManagerComponentModule} from '../institution-manager/institution-manager.component.module'
import { RouterTestingModule } from '@angular/router/testing';
import { SMISFacadeModule } from '../smis-facade/smis-facade.service.module';
@NgModule({
    imports: [
        BrowserModule,
        MatRadioModule,
        FormsModule,
        InstitutionManagerComponentModule,
        PatientManagerComponentModule,
        RouterTestingModule,
        SMISFacadeModule
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