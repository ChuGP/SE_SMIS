import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface institution {
  name: string;
  alias:string[];
  id: number;
  address: string;
  telecom: string;
  medicalServices:string[];
}

export interface patient {
  time: string;
  organization: string;
  diagnosis:string[];
}

const ELEMENT_DATA: institution[] = [
  {id: 1,  name: 'Hydrogen',alias:['Test1, Test2'], address: 'YC1...', telecom: 'H',  medicalServices:['Service1, Service2']},
  {id: 2,  name: 'Helium'  ,alias:['Test1, Test2'], address: 'YC2...', telecom: 'He', medicalServices:['Service1, Service2']},
  {id: 3,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 4,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 5,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},
  {id: 6,  name: 'Lithium' ,alias:['Test1, Test2'], address: 'YC3..',  telecom: 'Li', medicalServices:['Service1, Service2']},

  
];

const ELEMENT_DATA2: patient[] = [
  {time : "20:30",  organization: 'Test', diagnosis:['diagnosis1, diagnosis2']},
  {time : "20:31",  organization: 'Test', diagnosis:['diagnosis1, diagnosis2']},
  {time : "20:32",  organization: 'Test', diagnosis:['diagnosis1, diagnosis2']},
  {time : "20:33",  organization: 'Test', diagnosis:['diagnosis1, diagnosis2']},
  {time : "20:34",  organization: 'Test', diagnosis:['diagnosis1, diagnosis2']},
  {time : "20:35",  organization: 'Test', diagnosis:['diagnosis1, diagnosis2']},
  
];

@Component({
  selector: 'app-shared-info-manager',
  templateUrl: './shared-info-manager.component.html',
  styleUrls: ['./shared-info-manager.component.css']
})
export class SharedInfoManagerComponent implements OnInit {

  constructor() { }
  dataSource
  displayedColumns: string[] = ['id', 'name', 'alias','address', 'telecom', 'medicalServices'];
  displayedColumns2: string[] = ['time', 'organization', 'diagnosis'];
  display=false
  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  }
  
  change() {
    this.display = !this.display
    if(!this.display)
      this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    else
      this.dataSource=new MatTableDataSource<any>(ELEMENT_DATA2);

    
  }
}
