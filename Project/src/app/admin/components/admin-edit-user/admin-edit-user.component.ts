import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from '../../services/admin.users.service'
import {ActivatedRoute} from '@angular/router'
import {Router} from '@angular/router'
import {UserModel} from '../../models/user'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-admin-edit-user',
    templateUrl: './admin-edit-user.component.html',
    styleUrls: ['./admin-edit-user.component.css']
})

export class AdminEditUserComponent implements OnInit {
   private paramsId:string;
   private user:any;
   private userModel:UserModel

    constructor(private adminUsersService:AdminUsersService,
                private route : ActivatedRoute,
                private router:Router,
                private toastr:ToastrService) {
                    this.paramsId = this.route.snapshot.params['id'];
                    this.userModel = new UserModel('','','')  
                    
                 }
  
     ngOnInit() { 
       this.getUser()
      
      
    }

     async getUser(){
         await this.adminUsersService.getUser(this.paramsId).subscribe(data=>{
             this.user = data
             this.userModel = new UserModel(this.user['username'],this.user['firstName'],this.user['lastName'])    
         },
         err=>{
            this.toastr.error(err.message)
          })
         
     }

   async editUser(model){ 

    if(model.username == ''){
        this.toastr.warning('Username is empty!')
        return
    }
    if(model.firstName == ''){
        this.toastr.warning('First Name is empty!')
        return
    }
    if(model.lastName == ''){
        this.toastr.warning('Last Name is empty!')
        return
    }
    if(!isNaN(model.firstName)){
        this.toastr.warning('First Name must be a string!')
        return;
    }

    if(!isNaN(model.lastName)) {
        this.toastr.warning('Last Name must be a string!')
        return;
    }   


      await this.adminUsersService.editUser(model,this.paramsId).subscribe(data=>{
        this.toastr.info('User edited!')
      },
      err=>{
        this.toastr.error(err.message)
      })
          
      
      this.router.navigate(['/editUsers'])
  
    }


}
