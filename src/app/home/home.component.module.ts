import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
@NgModule({
    imports:[
        BrowserModule,
        RouterModule,
        RouterTestingModule,
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