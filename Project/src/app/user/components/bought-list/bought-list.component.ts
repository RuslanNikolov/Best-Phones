import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import {ActivatedRoute} from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-bought-list',
  templateUrl: './bought-list.component.html',
  styleUrls: ['./bought-list.component.css']
})
export class BoughtListComponent implements OnInit {
    phones:any=[]

  constructor(private userService:UserService,
    private route : ActivatedRoute,
    private toastr:ToastrService) { }

    listBoughtPhones(){
      this.userService.listBoughtPhones().subscribe(data=>{
        console.log(data)
        for (let obj in data) {
          console.log(data[obj])
          let paymentMethod = data[obj]['paymentMethod']
          let shippingAdress = data[obj]['shippingAdress']
          this.userService.getPhone(data[obj]['phoneId']).subscribe(data=>{
            data['paymentMethod'] = paymentMethod
            data['shippingAdress'] = shippingAdress
            this.phones.push(data)
          })  
        }
       
      },
      err=>{
        this.toastr.error(err.message)
      })
    }
  ngOnInit() {
    this.listBoughtPhones()
  }

}
