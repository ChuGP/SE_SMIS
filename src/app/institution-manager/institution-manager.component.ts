import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { InstitutionInfo, MedicalService } from '../smis-entity/smisentity';
import { healthcareServiceResource } from '../fhir-entity/fhirentity';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit {
  private institution:InstitutionInfo
  constructor(private router:Router, private fhirProxy:FHIRProxyService) { 
    this.institution = this.getDefaultInstitutionInfo()
  }

  ngOnInit() {
  }

  getDefaultInstitutionInfo(){
    let institution:InstitutionInfo={
      resourceType:"Organization",
      id:'',
      name:'',
      address:[
        {
          city:""
        }
      ],
      medicalServices:[this.getDefaultMedicalService()],
      type:[],
      telecom:[
        {
          system:"",
          value:""
        }
      ],
      alias:[{alias:''}]
    }
    return institution
  }

  getDefaultMedicalService():MedicalService{
    return {
      resourceType:healthcareServiceResource,
      id:'',
      serviceType:[{serviceType:''}],
      name:'',
      comment:''
    }
  }

  addMedicalService() {
    this.institution.medicalServices.push(this.getDefaultMedicalService())
  }

  addAlias() {
    this.institution.alias.push({alias:''})
  }

  removeAlias() {
    this.institution.alias.pop()
  }

  removeMedicalService() {
    this.institution.medicalServices.pop()
  }
  
  confirmSubmit() {
    console.log(JSON.stringify(this.institution))
    if(confirm("確認要送出修改嗎!")){
      this.router.navigate([""]);
    }
  }
}
