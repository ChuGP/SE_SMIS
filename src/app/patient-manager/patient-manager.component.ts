import { Component, OnInit } from '@angular/core';
import {FHIRProxyService} from '../fhir-proxy/fhirproxy.service';
@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})
export class PatientManagerComponent implements OnInit {

  constructor(private fhir:FHIRProxyService) { }

  ngOnInit() {
    
  }


}
