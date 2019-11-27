// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
// import {Component} from '@angular/core';
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
  {id: 1, name: 'Hydrogen',alias:['Test1, Test2'], address: 'YC1...', telecom: 'H', medicalServices:['Service1, Service2']},
  {id: 2, name: 'Helium',alias:['Test1, Test2'], address: 'YC2...', telecom: 'He', medicalServices:['Service1, Service2']},
  {id: 3, name: 'Lithium',alias:['Test1, Test2'], address: 'YC3..', telecom: 'Li', medicalServices:['Service1, Service2']},
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
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }
}
