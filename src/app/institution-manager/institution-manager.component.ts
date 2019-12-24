import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { InstitutionInfo } from '../smis-entity/smisentity';
import { LoginService } from '../login-service/login-service.service';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';

@Component({
  selector: 'app-institution-manager',
  templateUrl: './institution-manager.component.html',
  styleUrls: ['./institution-manager.component.css']
})
export class InstitutionManagerComponent implements OnInit, OnChanges {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input('institutionInfo')
  institution: InstitutionInfo
  @Input('disable')
  private disable
  constructor(private smisFacade: SMISFacadeService, private loginService: LoginService, private actRoute: ActivatedRoute) {
    if (!this.institution)
      this.setInstitution(this.smisFacade.getDefaultInstitutionInfo())
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.institutionInfo) {
      this.setInstitution(changes.institutionInfo.currentValue)
    }
  }

  async ngOnInit() {
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if (userId) {
      let institution = await this.smisFacade.getInstitution(userId)
      if (this.smisFacade.isInstitution(institution))
        this.setInstitution(institution)
      else
        this.institution.id = userId
    }

  }

  setInstitution(institution: InstitutionInfo) {
    this.institution = institution
  }

  addMedicalService() {
    this.institution.medicalServices.push(this.smisFacade.getDefaultMedicalService())
  }

  addAlias() {
    this.institution.alias.push({ alias: '' })
  }

  removeAlias() {
    this.institution.alias.pop()
  }

  removeMedicalService() {
    this.institution.medicalServices.pop()
  }

  async confirmSubmit() {
    if (confirm("確認要送出修改嗎!")) {
      let institution: InstitutionInfo = await this.smisFacade.updateInstitution(this.institution)
      if (this.smisFacade.isInstitution(institution)) {
        this.setInstitution(institution)
        alert("更新成功!")
        this.submit.emit(null)
      }
      else
        alert("更新失敗!")
    }
  }
}
