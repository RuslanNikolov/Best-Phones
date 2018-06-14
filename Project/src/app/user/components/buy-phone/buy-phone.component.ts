import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import {ActivatedRoute} from '@angular/router'
import {Router} from '@angular/router'
import { BuyModel } from '../../models/bought'
import { ToastrService } from 'ngx-toastr'
import {ViewContainerRef} from '@angular/core'


@Component({
  selector: 'app-buy-phone',
  templateUrl: './buy-phone.component.html',
  styleUrls: ['./buy-phone.component.css']
})
export class BuyPhoneComponent implements OnInit {

  private paramsId:string;
  phone:any
  private buyModel:BuyModel;

  constructor(private userService:UserService,
    private route : ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    
    ) 
    {
      this.paramsId = this.route.snapshot.params['id'];
      this.buyModel = new BuyModel('','','','','','')
     

     }
     

  ngOnInit() {
  
  }
  

  buyPhone(model){
    console.log(model)

    if(model.firstName==''){
      this.toastr.warning('First name should not be empty!')
      return
    }
    if(model.lastName==''){
      this.toastr.warning('Last name should not be empty!')
      return
    }
    if(model.city ==''){
     this.toastr.warning('City should not be empty!')
     return
   }
   if(model.phoneNumber == ''){
     this.toastr.warning('Phone number should not be empty!')
     return
   }
   if(model.shippingAdress== ''){
     this.toastr.warning('Shipping adress should not be empty!')
     return
   }
   if(model.paymentMethod== ''){
    this.toastr.warning('Payment method should not be empty!')
    return
  }
      
    if(model.firstName[0] !== model.firstName[0].toUpperCase()){
      this.toastr.warning('First name should start with a capital letter!')
      return;

   }
   if(model.lastName[0] !== model.lastName[0].toUpperCase()){
    this.toastr.warning('Last name should start with a capital letter!')
    return;
   }

   if(model.city[0] !== model.city[0].toUpperCase()){
    this.toastr.warning('City name should start with a capital letter!')
    return;
   }

   if(isNaN(model.phoneNumber)){
       this.toastr.warning('Phone number must be a number!')
       return;
   }
   
  
    
   
      model.username = localStorage.getItem('username')
      model.phoneId = this.paramsId
     

      this.userService.buyPhone(model).subscribe(data=>{
       this.toastr.success('Phone bought!')
        this.router.navigate(['cart'])
      },
      err=>{
        this.toastr.error(err.message)
      })
  }

}
