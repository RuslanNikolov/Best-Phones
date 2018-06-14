import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesListComponent } from './components/phones-list/phones-list.component';
import { UserService } from './services/user.service'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';
import { BuyPhoneComponent } from './components/buy-phone/buy-phone.component';
import { CartComponent } from './components/cart/cart.component';
import { BoughtListComponent } from './components/bought-list/bought-list.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    PhonesListComponent,
    PhoneDetailsComponent,
    BuyPhoneComponent,
    CartComponent,
    BoughtListComponent,
  ],
  providers:[
   UserService
  ],
  exports:[
    PhonesListComponent,
    
  ]
})
export class UserModule { }