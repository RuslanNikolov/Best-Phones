import { Component, OnInit } from '@angular/core';
import {AdminUsersService} from '../../services/admin.users.service'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  private users:any

  constructor(private adminUsersService: AdminUsersService,
              private toastr:ToastrService) { }

  getUsers(){
    this.adminUsersService.getUsers().subscribe(data=>{
     console.log(data)
      this.users = data
      },
      err=>{
        this.toastr.error(err.message)
      })
  }
  ngOnInit() {
    this.getUsers()
  }

   
  

}
