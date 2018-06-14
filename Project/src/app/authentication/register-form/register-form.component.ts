import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthenticationService } from '../auth.service';
import { ToastrService } from 'ngx-toastr'
import {Router} from '@angular/router'

let userId;
let roleId;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent  {
  public model : RegisterModel;
  public registeredUser : string;
  public registerSuccess : boolean;
  public registerFail : boolean;

  constructor(
    private authService : AuthenticationService,
    private toastr: ToastrService,
    private router:Router
  ) { 
    this.model = new RegisterModel("", "", "", "");
  }

  register() : void {
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.router.navigate(['login'])
          if(data['username'].indexOf('admin') > -1 ){
            userId = data['_id'];
            this.toastr.success('Admin registration successful!')
            this.authService.getRoles().subscribe(
              (data)=> {
                this.authService.assignAdminRole(userId,data[0]['_id']).subscribe(data=>{}) 
               })
          }
          else{
            this.toastr.success('Registration successful!')
          }
      
          this.successfulRegister(data);
        },
        err => {
          this.registerFail = true;
          this.toastr.error('err.message')
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data) : void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }
}
