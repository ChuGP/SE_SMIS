import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { InstitutionInfo, MedicalService, SMISEntityAdapter } from '../smis-entity/smisentity';
import { healthcareServiceResource, organizationResource, FHIREntityAdapter, Organization, HealthcareService } from '../fhir-entity/fhirentity';
import { LoginService } from '../login-service/login-service.service';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit {
  private institution:InstitutionInfo
  constructor(private fhirProxy:FHIRProxyService, private loginService:LoginService, private smisAdapter:SMISEntityAdapter, private fhirAdapter:FHIREntityAdapter, private actRoute:ActivatedRoute) { 
    this.institution = this.getDefaultInstitutionInfo()
  }

  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(this.loginService.isLogin() && userId){
        let institution:InstitutionInfo = await this.getInstitution(userId);
        if(institution.resourceType == organizationResource)
          this.setInstitution(institution)
    }
  }

  setInstitution(institution:InstitutionInfo){
    this.institution = institution
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

  async getInstitution(id){
    let organization:Organization = await this.fhirProxy.getResource(organizationResource,id)
    return await this.smisAdapter.parseOrganization(organization) as InstitutionInfo
  }

  async updateInstitution(institution:InstitutionInfo){
    let organization:Organization = this.fhirAdapter.parseInstitutionInfo(institution)
    if(organization.id)
      organization = await this.fhirProxy.updateResource(organizationResource,organization)
    else
      organization = await this.fhirProxy.createResource(organizationResource,organization)
    return await this.smisAdapter.parseOrganization(organization)
  }

  async updateMedicalService(medicalService:MedicalService){
    let healthcareService:HealthcareService = this.fhirAdapter.parseMedicalService(medicalService)
    if(healthcareService.id)
      healthcareService = await this.fhirProxy.updateResource(healthcareServiceResource,healthcareService)
    else
      healthcareService = await this.fhirProxy.createResource(healthcareServiceResource,healthcareService)
    return this.smisAdapter.parseHealthCareService(healthcareService)
  }

  async updateMedicalServices(medicalServices:MedicalService[]){
    let result:MedicalService[] = []
    for(let medicalService of medicalServices)
        result.push(await this.updateMedicalService(medicalService))
    return result
  }
  
  async confirmSubmit() {
    if(confirm("確認要送出修改嗎!")){
      let result = "修改失敗!"
      this.institution.medicalServices = await this.updateMedicalServices(this.institution.medicalServices)
      let institution:InstitutionInfo = await this.updateInstitution(this.institution)
      if(institution.resourceType == organizationResource){
        this.setInstitution(institution)
        result = "修改成功!"
      }
      alert(result)
    }
  }
}
