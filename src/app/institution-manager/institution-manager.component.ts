import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { InstitutionInfo, MedicalService } from '../smis-entity/smisentity';
import { healthcareServiceResource, organizationResource } from '../fhir-entity/fhirentity';
import { LoginService } from '../login-service/login-service.service';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit,OnChanges {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input('institutionInfo')
  private institution:InstitutionInfo
  @Input('disable')
  private disable
  @Input('userId')
  private userId
  constructor(private smisFacade:SMISFacadeService, private loginService:LoginService, private actRoute:ActivatedRoute) { 
    this.institution = this.getDefaultInstitutionInfo()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.institutionInfo){
      this.setInstitution(changes.institutionInfo.currentValue)
    }
  }

  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(userId)
      this.userId = userId
    if(this.loginService.isLogin()){
        let institution:InstitutionInfo = await this.smisFacade.getInstitution(this.userId);
        if(institution.resourceType == organizationResource)
          this.setInstitution(institution)
        else
          this.institution.id = this.userId
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
      this.institution.medicalServices = await this.smisFacade.updateMedicalServices(this.institution.medicalServices)
      let institution:InstitutionInfo = await this.smisFacade.updateInstitution(this.institution)
      if(institution.resourceType == organizationResource){
        this.setInstitution(institution)
        alert("更新成功!")
        this.submit.emit(null)
      }
      else
        alert("更新失敗!")
    }
  }
}
