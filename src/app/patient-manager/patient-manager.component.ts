import { Component, OnInit } from '@angular/core';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})
export class PatientManagerComponent implements OnInit {
  constructor(private fhir:FHIRProxyService, private router:Router) { }

  ngOnInit() {
    
  }


  window() {
    if(confirm("Submit Success!"))
      this.router.navigate([""]);
  }

}
