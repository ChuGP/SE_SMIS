import {NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginServiceModule } from '../login-service/login-service.service.module';
import { TopBarComponent } from './top-bar.component';
@NgModule({
    imports:[
        BrowserModule,
        RouterModule,
        LoginServiceModule
    ],
    exports:[
        TopBarComponent
    ],
    declarations:[TopBarComponent],
    providers:[]
})
export class TopBarComponentModule{

}