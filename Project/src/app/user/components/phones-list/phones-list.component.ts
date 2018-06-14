import { Component, OnInit } from '@angular/core';
import { AdminPhonesService } from '../../../admin/services/admin.phones.service'
import {UserService} from '../../services/user.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-phones-list',
  templateUrl: './phones-list.component.html',
  styleUrls: ['./phones-list.component.css']
})
export class PhonesListComponent implements OnInit {
  private noPhones = false;
  private phones:any;
  private searchModel:any
  constructor(private userService:UserService,
              private toastr:ToastrService) { 
    this.searchModel = {search:''}
  }
  ngOnInit() {
    this.listPhones()
  }
  listPhones(){
    this.userService.getPhones().subscribe(data=>{
      
      this.phones = data
    },
    err=>{
      this.noPhones = true
      
    })
   }
   listSearchPhones(model){
     if(model.search ==''){
       this.toastr.warning('Search is empty!')
       return
     }
     console.log(model.search)

    this.userService.getSearchPhones(model.search).subscribe(data=>{
      
      this.phones = data
    },
    err=>{
      this.toastr.error(err.message)
    })
   }

  

}
