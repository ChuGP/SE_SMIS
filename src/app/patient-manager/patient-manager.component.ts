import { Component, OnInit, ViewChild } from '@angular/core';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { Router } from '@angular/router'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
   diagnosis:string[],
   organization:string,
   time:{
      start:string,
      end:string
   }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {diagnosis: ['diagnosis1', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis3', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis5', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis7', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis9', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis11', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis13', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis15', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis17', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis19', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  {diagnosis: ['diagnosis21', 'diagnosis2'],  organization: 'organization', time:{start:'Test1', end:'Test2'}},
  
];

@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})
export class PatientManagerComponent implements OnInit {
  constructor(private fhir:FHIRProxyService, private router:Router) { }

  displayedColumns: string[] = ['diagnosis', 'organization', 'time.start', 'time.end'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  display = false;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  window() {
    if(confirm("Submit Success!"))
      this.router.navigate([""]);
  }

}
