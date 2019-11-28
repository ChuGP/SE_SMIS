import { Component, OnInit } from '@angular/core';
// import { AppModule } from './app/app.module';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit {
  times=1;
  aliastimes=1;
  constructor() { }

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

}
