import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './authentication/logout-component/logout.component';
import { PhonesListComponent } from './user/components/phones-list/phones-list.component'
import { AboutComponent } from './components/about/about.component'
import { ContactsComponent } from './components/contacts/contacts.component'
//Admin
import {AdminPhonesComponent} from './admin/components/admin-phones/admin-phones.component'
import {AdminUsersComponent} from './admin/components/admin-users/admin-users.component'
import {AdminEditPhoneComponent} from './admin/components/admin-edit-phone/admin-edit-phone.component'
import {AdminEditUserComponent} from './admin/components/admin-edit-user/admin-edit-user.component'



//User
import {PhoneDetailsComponent} from './user/components/phone-details/phone-details.component'
import {BuyPhoneComponent} from './user/components/buy-phone/buy-phone.component'
import {CartComponent} from './user/components/cart/cart.component'
import {BoughtListComponent} from './user/components/bought-list/bought-list.component'

// Guards

import { AdminGuard} from './guards/admin.guard.service'
import { AuthGuard } from './guards/auth.guard.service';

const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about',component: AboutComponent},
  { path: 'contacts',component: ContactsComponent},
  { path: 'home',  component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  //Admin
  { path: 'editUsers',canActivate:[AdminGuard] , component: AdminUsersComponent},
  { path: 'editUser/:id', canActivate:[AdminGuard] ,component: AdminEditUserComponent},
  { path: 'editPhones',canActivate:[AdminGuard] , component: AdminPhonesComponent},
  { path: 'editPhone/:id', canActivate:[AdminGuard] , component: AdminEditPhoneComponent },
  
  
  //User
  { path: 'phones',component:PhonesListComponent},
  { path: 'phoneDetails/:id' ,canActivate:[AuthGuard],component: PhoneDetailsComponent},
  
  { path: 'cart', canActivate:[AuthGuard] ,component: CartComponent},
  { path: 'buyPhone/:id',canActivate:[AuthGuard] , component:BuyPhoneComponent},
  { path: 'boughtPhones',canActivate:[AuthGuard] , component:BoughtListComponent}
    
  

]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutesModule {  }
