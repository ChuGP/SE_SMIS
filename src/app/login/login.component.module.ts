import {NgModule} from '@angular/core'
import {LoginComponent} from './login.component'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { LoginServiceModule } from '../login-service/login-service.service.module'
import { RouterTestingModule } from '@angular/router/testing'
import { CreateRoleModule } from '../create-role/create-role.component.module'
@NgModule({
    imports:[
        BrowserModule,
        RouterModule,
        RouterTestingModule,
        LoginServiceModule,
        CreateRoleModule
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