import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';
import { PatientInfo, InstitutionInfo } from '../smis-entity/smisentity';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  private role;
  private patient:PatientInfo
  private institution:InstitutionInfo
  constructor(private actRoute:ActivatedRoute, private loginService:LoginService, private smisFacade:SMISFacadeService) {
    this.role = "Organization"
    this.patient = this.smisFacade.getDefaultPatient()
    this.institution = this.smisFacade.getDefaultInstitutionInfo()
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(loginService.isLogin())
      this.patient.photo.push({url:this.loginService.getUserInfo().photoUrl})
    if(userId){
      this.patient.id = userId
      this.institution.id = userId
    }
  }

  ngOnInit() {
  }

  onSubmit(data){
    alert('創建成功!!,請重新登入')
    this.loginService.logoff()
  }

}
