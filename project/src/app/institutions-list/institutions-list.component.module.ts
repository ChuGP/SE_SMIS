import {NgModule} from '@angular/core'
import { MatTableModule } from '@angular/material' ;
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InstitutionsListComponent } from './institutions-list.component'
import { InstitutionManagerComponentModule } from '../institution-manager/institution-manager.component.module';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        MatTableModule,
        InstitutionManagerComponentModule
    ],
    declarations:[
        InstitutionsListComponent
    ],
    providers:[],
    exports:[InstitutionsListComponent]
})
export class InstitutionsListModule{

}