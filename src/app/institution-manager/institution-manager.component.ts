import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit {
  times=1;
  aliastimes=1;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  add() {
    this.times++;
  }

  addAlias() {
    this.aliastimes++;
  }

  subAlias() {
    this.aliastimes--;
  }

  sub() {
    this.times--;
  }
  
  window() {
    if(confirm("Submit Success!"))
      this.router.navigate([""]);
  }
}
