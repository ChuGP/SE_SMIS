import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../smis-entity/smisentity';

@Component({
  selector: 'app-medical-resource-filter',
  templateUrl: './medical-resource-filter.component.html',
  styleUrls: ['./medical-resource-filter.component.css']
})
export class MedicalResourceFilterComponent implements OnInit {
  private searchParams: SearchParams
  private params: SearchParams
  constructor() {
    this.searchParams = {
      type: 'team',
      "address-city": '',
      name: '',
      serviceName: ''
    }
  }
  ngOnInit() {

  }

  submitParams() {
    this.params = {
      type: this.searchParams.type,
      "address-city": this.searchParams["address-city"],
      name: this.searchParams.name,
      serviceName: this.searchParams.serviceName
    }
  }

}
