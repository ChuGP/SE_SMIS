import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login-service/login-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private loginService:LoginService) { }

  ngOnInit() {
   
  }

  signInWithFB(): void {
    this.loginService.loginWithFb();
  } 

  signInWithGoogle(): void {
    this.loginService.loginWithGoogle();
  }
}