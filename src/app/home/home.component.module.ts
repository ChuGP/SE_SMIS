import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceModule } from '../login-service/login-service.service.module';
import { LoginComponentModule } from '../login/login.component.module';
@NgModule({
    imports:[
        BrowserModule,
        RouterModule,
        RouterTestingModule,
        LoginServiceModule,
        LoginComponentModule,
    ],
    exports:[
        HomeComponent
    ],
    declarations:[
        HomeComponent
    ],
    providers:[]
})
export class HomeComponentModule{
    
}