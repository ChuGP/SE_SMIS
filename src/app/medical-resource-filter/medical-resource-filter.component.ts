// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
// import {Component} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  alias:string[];
  id: number;
  address: string;
  telecom: string;
  medicalServices:string[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1,  name: 'Hydrogen',alias:['Test1, Test2'], address: 'YC1...', telecom: 'H',  medicalServices:['Service1, Service2']},
  {id: 2,  name: 'Helium'  ,alias:['Test1, Test2'], address: 'YC2...', telecom: 'He', medicalServices:['Service1, Service2']},
  {id: 3,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 4,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 5,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 6,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 7,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 8,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 9,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 10, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 11, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 12, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 13, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 14, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 15, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 16, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 17, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 18, name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},

  
];

@Component({
  selector: 'app-medical-resource-filter',
  templateUrl: './medical-resource-filter.component.html',
  styleUrls: ['./medical-resource-filter.component.css']
})
export class MedicalResourceFilterComponent implements OnInit {

  constructor() { 
    
  }
  displayedColumns: string[] = ['id', 'name', 'alias','address', 'telecom', 'medicalServices'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  display = false;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
