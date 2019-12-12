import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  private role;
  private userId
  constructor(private actRoute:ActivatedRoute, private loginService:LoginService) {
    this.role = "Organization"
    let userId = this.actRoute.snapshot.paramMap.get('id')
    if(userId){
      this.userId = userId
    }
  }

  ngOnInit() {
  }

  onSubmit(data){
    alert('創建成功!!,請重新登入')
    this.loginService.logoff()
  }

}
