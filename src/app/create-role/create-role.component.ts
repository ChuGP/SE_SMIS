import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  private role;
  constructor() {
    this.role = "Organization"
   }

  ngOnInit() {
  }

}
