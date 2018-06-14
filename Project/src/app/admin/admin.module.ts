import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminPhonesComponent} from './components/admin-phones/admin-phones.component'
import {AdminUsersComponent} from './components/admin-users/admin-users.component'
import {AdminEditPhoneComponent} from './components/admin-edit-phone/admin-edit-phone.component'
import {AdminUsersService} from './services/admin.users.service'
import {AdminPhonesService} from './services/admin.phones.service'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    AdminPhonesComponent,
    AdminUsersComponent,
    AdminEditPhoneComponent,
    AdminEditUserComponent,
   
   
  ],
  providers:[
    AdminUsersService,
    AdminPhonesService
  ],
  exports:[
    AdminPhonesComponent,
    AdminUsersComponent,
    AdminEditPhoneComponent
  ]
})
export class AdminModule { }
