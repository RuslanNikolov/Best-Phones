import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public model : LoginModel;
  public loginFail : boolean;
  public username : string;

  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private toastr:ToastrService
  ) {
    this.model = new LoginModel("", "");
    this.username = "";
  }

  login () : void {
    this.authService.login(this.model)
      .subscribe(
        data => {
         console.log(data)
          this.successfulLogin(data);
          this.toastr.success('Welcome' + ' ' + data['username'] + '!')
        },
        err => {
          this.loginFail = true;
          this.toastr.error(`Couldn't find user!`)
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data) : void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('id',data['_id'])
    if(data['_kmd']['roles']){
      localStorage.setItem('roles','admin')
    }
    else{
      localStorage.setItem('roles','user')
    }
    
    this.loginFail = false;
    this.router.navigate(['/home']);
  }
}
