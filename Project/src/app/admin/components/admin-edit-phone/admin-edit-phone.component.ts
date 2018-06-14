import { Component, OnInit } from '@angular/core';
import { AdminPhonesService } from '../../services/admin.phones.service'
import {ActivatedRoute} from '@angular/router'
import { PhoneModel } from '../../models/phone'
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr'


@Component({
    selector: 'app-admin-edit-phone',
    templateUrl: './admin-edit-phone.component.html',
    styleUrls: ['./admin-edit-phone.component.css']
})

export class AdminEditPhoneComponent implements OnInit {
   private paramsId:string;
   private phone:any;
   private phoneModel:PhoneModel

    constructor(private adminPhonesService:AdminPhonesService,
                private route : ActivatedRoute,
                private router:Router,
                private toastr:ToastrService) {
                    this.paramsId = this.route.snapshot.params['id'];
                    this.phoneModel = new PhoneModel('','','','','','',)  
                    
                 }
  
     ngOnInit() { 
       this.getPhone()
      
      
    }
     async getPhone(){
         await this.adminPhonesService.getPhone(this.paramsId).subscribe(data=>{
             
             this.phone = data
             this.phoneModel = new PhoneModel(this.phone['name'],this.phone['ram'],this.phone['processor'],this.phone['camera'],this.phone['battery'],this.phone['img'])    
         },
         err=>{
            this.toastr.error(err.message)
          })
         
     }

     async editPhone(model){
        if(model.name == ''){
            this.toastr.warning('Name is empty!')
            return
      
          }
          if(model.ram == ''){
            this.toastr.warning('Ram is empty!')
            return
      
          }
          if(model.processor == ''){
            this.toastr.warning('Processor is empty!')
            return
      
          }
          if(model.camera == ''){
            this.toastr.warning('Camera is empty!')
            return
      
          }
          if(model.battery == ''){
            this.toastr.warning('Battery is empty!')
            return
      
          }
          if(model.img == ''){
            this.toastr.warning('Image is empty!')
            return
      
          }
        
         
        if(model.name[0] !== model.name[0].toUpperCase()){
           this.toastr.warning('Name should start with a capital letter!')
           return;

        }
        if(isNaN(model.ram)){
            this.toastr.warning('RAM must be a number!')
            return;
        }
        if(model.processor[0] !== model.processor[0].toUpperCase()){
            this.toastr.warning('Processor should start with a capital letter!')
            return;
 
         }
         
        
       if(isNaN(model.camera)){
            this.toastr.warning('Camera must be a number!')
            return;
        }
       if(isNaN(model.battery)){
           this.toastr.warning('Battery must be a number!')
           return;
       }
       if(!(model.img).startsWith('https')){
           this.toastr.warning('Image should be an url!')
           return   
       }
         
        await this.adminPhonesService.editPhone(model,this.paramsId).subscribe(data=>{
        this.toastr.success('Edit successful!')
        },
        err=>{
            this.toastr.error(err.message)
          })
        
        this.router.navigate(['/editPhones'])
    
      }
}