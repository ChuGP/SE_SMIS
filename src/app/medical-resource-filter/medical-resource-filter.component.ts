// import { Component, OnInit } from '@angular/core';
import {Component, OnInit} from '@angular/core';

interface SearchParams{
  type:string,
  "address-city":string,
  name:string,

}
@Component({
  selector: 'app-medical-resource-filter',
  templateUrl: './medical-resource-filter.component.html',
  styleUrls: ['./medical-resource-filter.component.css']
})
export class MedicalResourceFilterComponent implements OnInit {
  private searchParams:SearchParams
  private params:SearchParams
  constructor() { 
    this.searchParams = {
      type:'team',
      "address-city":'',
      name:''
    }
  }
  ngOnInit() {
  
  }

  submitParams(){
    this.params = {
      type:this.searchParams.type,
      "address-city":this.searchParams["address-city"],
      name:this.searchParams.name
    }
  }

}
