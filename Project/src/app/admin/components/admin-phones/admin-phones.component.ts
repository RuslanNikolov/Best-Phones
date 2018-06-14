import { Component, OnInit } from '@angular/core';
import { AdminPhonesService } from '../../services/admin.phones.service'
import { PhoneModel } from '../../models/phone'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-admin-phones',
  templateUrl: './admin-phones.component.html',
  styleUrls: ['./admin-phones.component.css']
})
export class AdminPhonesComponent implements OnInit {
   private phoneModel:PhoneModel;
   phones:any;
   user:any
   

  constructor(private adminPhonesService:AdminPhonesService,
              private toastr:ToastrService) {
    this.phoneModel = new PhoneModel('','','','','','')
    this.user = localStorage.getItem('id')
   }

   listPhones(){
    this.adminPhonesService.getPhones().subscribe(data=>{
      console.log(data)
      console.log(this.user)
      this.phones = data

    },
    err=>{
      this.toastr.error(err.message)
    })
   }
  ngOnInit() {
    this.listPhones()
  }
  async createPhone(model){
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
    if(!model.img.startsWith('http')){
      this.toastr.warning('Not a valid image!')
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
    await this.adminPhonesService.createPhone(model).subscribe(data=>{
      this.toastr.success('Phone created!')
    },
    err=>{
      this.toastr.error(err.message)
    })
    this.phoneModel = new PhoneModel('','','','','','')
    this.listPhones()     
    this.listPhones()
    

  }

   async deletePhone(id){
     await this.adminPhonesService.deleteBoughtPhone(id).subscribe(data=>{
      console.log(data)
    })
     await this.adminPhonesService.deleteCartPhone(id).subscribe(data=>{
      console.log(data)
    })

 this.adminPhonesService.deletePhone(id).subscribe(data=>{
      this.listPhones()
      this.toastr.info('Phone deleted!')
    },
  err=>{
    this.toastr.error(err.message)
  })
    this.listPhones()
    this.listPhones()
    
  }


}
