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
  constructor(private smisFacade:SMISFacadeService, private loginService:LoginService, private actRoute:ActivatedRoute) { 
    if(!this.institution)
      this.setInstitution(this.smisFacade.getDefaultInstitutionInfo())
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.institutionInfo){
      this.setInstitution(changes.institutionInfo.currentValue)
    }
  }

  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(userId)
      this.setInstitution(await this.smisFacade.getInstitution(userId))
  }

  setInstitution(institution:InstitutionInfo){
    this.institution = institution
  }

  addMedicalService() {
    this.institution.medicalServices.push(this.smisFacade.getDefaultMedicalService())
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
