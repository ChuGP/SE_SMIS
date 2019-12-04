import { NgModule } from '@angular/core';
import {MatRadioModule}  from '@angular/material/radio'
import {FormsModule} from '@angular/forms'
import { CreateRoleComponent} from './create-role.component'
import { BrowserModule } from '@angular/platform-browser';
import {InstitutionManagerComponent} from '../institution-manager/institution-manager.component'
import {PatientManagerComponent} from '../patient-manager/patient-manager.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material' 

@NgModule({
    imports: [
        BrowserModule,
        MatRadioModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule
    ],
    declarations:[
        CreateRoleComponent,
        InstitutionManagerComponent,
        PatientManagerComponent
    ],
    providers:[
        
    ],
   

})
export class CreateRoleModule{

}