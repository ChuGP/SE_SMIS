import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FHIRProxyService } from '../fhir-proxy/fhirproxy.service';
import { InstitutionInfo, MedicalService } from '../smis-entity/smisentity';
import { healthcareServiceResource, organizationResource } from '../fhir-entity/fhirentity';
import { LoginService } from '../login-service/login-service.service';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit {
  private institution:InstitutionInfo
  private disable
  constructor(private smisFacade:SMISFacadeService,private fhirProxy:FHIRProxyService, private loginService:LoginService, private actRoute:ActivatedRoute) { 
    this.institution = this.getDefaultInstitutionInfo()
  }

  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    this.disable = this.actRoute.snapshot.queryParamMap.get('disable')
    
    if(this.loginService.isLogin() && userId){
        let institution:InstitutionInfo = await this.smisFacade.getInstitution(userId);
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
  
  async confirmSubmit() {
    if(confirm("確認要送出修改嗎!")){
      let result = "修改失敗!"
      this.institution.medicalServices = await this.smisFacade.updateMedicalServices(this.institution.medicalServices)
      let institution:InstitutionInfo = await this.smisFacade.updateInstitution(this.institution)
      if(institution.resourceType == organizationResource){
        this.setInstitution(institution)
        result = "修改成功!"
      }
      alert(result)
    }
  }
}
