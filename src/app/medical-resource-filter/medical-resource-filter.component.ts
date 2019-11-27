// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
// import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 2, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 3, symbol: 'Li'},
];

@Component({
  selector: 'app-medical-resource-filter',
  templateUrl: './medical-resource-filter.component.html',
  styleUrls: ['./medical-resource-filter.component.css']
})
export class MedicalResourceFilterComponent implements OnInit {

  constructor() { 
    
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }
}
