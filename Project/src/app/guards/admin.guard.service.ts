import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';
import {ToastrService} from 'ngx-toastr'

import { AuthenticationService } from '../authentication/auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private toastr:ToastrService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAdmin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkAdmin(route.path);
  }
  
  checkAdmin(url : string) : boolean {
    if (this.authService.isAdmin()) {
      return true;
    }
    this.toastr.warning('You must be admin for that!')
    this.router.navigate(['/login']);
    return false;
  }
}