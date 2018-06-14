import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import {ActivatedRoute} from '@angular/router'
import {Router} from '@angular/router'
import { ReviewModel } from '../../models/review'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  phones:any = []
  dataAvailable:boolean
  constructor(private userService:UserService,
    private route : ActivatedRoute,
    private router:Router,
    private toastr:ToastrService) { }
  
  listPhones(){
    this.userService.listPhones().subscribe(data=>{
      
      for (let obj in data) {
        console.log(data[obj])
        this.userService.getPhone(data[obj]['phoneId']).subscribe(data=>{
         
          this.phones.push(data)
        })  
      }
      this.dataAvailable = true
    
    })
  
  }

  ngOnInit() {
    this.listPhones()
  }

}
