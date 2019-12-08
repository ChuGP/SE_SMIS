import {NgModule} from '@angular/core'
import {LoginComponent} from './login.component'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { LoginServiceModule } from '../login-service/login-service.service.module'
import { RouterTestingModule } from '@angular/router/testing'
@NgModule({
    imports:[
        BrowserModule,
        RouterModule,
        RouterTestingModule,
        LoginServiceModule
    ],
    exports:[
        LoginComponent
    ],
    declarations:[
        LoginComponent
    ],
    providers:[]
})
export class LoginComponentModule{

}