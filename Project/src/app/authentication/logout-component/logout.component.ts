import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'


@Component({
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    let name = localStorage.getItem('username')
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.toastr.warning('Good buy' + ' ' + name + '!')
      },
      err=>{
        this.toastr.error(err.message)
      })
  }
}