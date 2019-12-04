import { NgModule } from '@angular/core';
import {MatRadioModule}  from '@angular/material/radio'
import {FormsModule} from '@angular/forms'
import { CreateRoleComponent} from './create-role.component'
@NgModule({
    imports: [
        MatRadioModule,
        FormsModule
    ],
    declarations:[
        CreateRoleComponent
    ],
    providers:[
        
    ],


})
export class CreateRoleModule{

}