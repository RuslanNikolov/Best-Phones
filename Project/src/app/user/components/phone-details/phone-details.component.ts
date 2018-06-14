import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import {ActivatedRoute} from '@angular/router'
import {Router} from '@angular/router'
import { ReviewModel } from '../../models/review'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {
  reviews:any
  reviewModel:ReviewModel
  private paramsId:string;
  isDataAvailable:boolean
   phone:any
   public previousId:string= '';

  constructor( private userService:UserService,
    private route : ActivatedRoute,
    private router:Router,
    private toastr:ToastrService)
     { 
      this.paramsId = this.route.snapshot.params['id'];
      this.reviewModel = new ReviewModel('')
    }
  
  ngOnInit() {
    this.getPhone()
    this.listReviews()
  }
 

  async getPhone(){
    await this.userService.getPhone(this.paramsId).subscribe(data=>{
        
        this.phone = data
        this.isDataAvailable = true
   },
   err=>{
    this.toastr.error(err.message)
  })
  }
  createReview(model) {
    if(model.content == ''){
      this.toastr.warning('Review is empty!')
      return
    }
    this.userService.createReview(this.paramsId,model.content,localStorage.getItem('username'))
    .subscribe(data=>{
      this.toastr.info('Review created!')
      console.log(data)
    },
    err=>{
      this.toastr.error(err.message)
    })
    this.reviewModel = new ReviewModel('')
    this.listReviews()
    this.listReviews()
  }

  addLike(model){
    if(this.previousId == model._id){
      return
    }
      this.previousId = model._id
      //continue




    this.userService.addLikes(model).subscribe(data=>{
     this.listReviews()
    },
    err=>{
      this.toastr.error(err.message)
    })
  }

   listReviews(){
     this.userService.listReviews(this.paramsId).subscribe(data=>{
       
        this.reviews = data
     },
     err=>{
      this.toastr.error(err.message)
    })
   }
   addToCart(){
     this.userService.addToCart(this.paramsId).subscribe(data=>{
       this.toastr.info('Added to cart')
     },
     err=>{
      this.toastr.error(err.message)
    })
   }

   

}
