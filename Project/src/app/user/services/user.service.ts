import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const appKey = "kid_SkO3lzTZG" ;
const appSecret = "d81d766b06374fb9b16a882aa6b6cab1" // APP SECRET HERE;
const masterSecret ='0d92dee164684aa996abd6e451ccb607'

@Injectable()
export class UserService {

    
  constructor(private http : HttpClient) { }


  getPhones(){
    if(localStorage.getItem('username')){

    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/phones`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
   }
   else{
    return this.http.get(`https://baas.kinvey.com/appData/${appKey}/phones`,
    {headers:new HttpHeaders({
      Authorization: `Kinvey 178809f7-f284-49ed-abaf-732ad287be3f.QSdgbqn3mQYUPu2Bm2CE88xp5SnwHiJcWENAuLem2dM=`,
      'Content-Type': 'application/json'
    })
   
   }
     )
    
  }
}
   getSearchPhones(name){
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/phones/?query={"name":"${name}"}&sort={"_kmd.ect": -1}`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
   }
   getPhone(id){
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/phones/${id}`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
   }
   addLikes(model){
    model.likes = model.likes + 1;
   return this.http.put(
     `https://baas.kinvey.com/appdata/${appKey}/reviews/${model._id}`,
     JSON.stringify(model),
     {headers:this.createAuthHeaders('Kinvey')}
    )
  }

   listReviews(id){
   
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/reviews/?query={"phoneId":"${id}"}&sort={"_kmd.ect": -1}`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
   }
   
   createReview(phoneId,content,author){
     return this.http.post(`https://baas.kinvey.com/appdata/${appKey}/reviews`,
     JSON.stringify({
      phoneId:phoneId,
      content:content,
      author:author,
      likes:0
     }),
     {headers:this.createAuthHeaders('Kinvey')}
       )
   }

   

   //Messed up the collection name -'bought',should've been cart-phones ,didn't have time to look to delete the collection,
   //the bought collection is called -'fullybought' :D

   addToCart(phoneId){
     let username =  localStorage.getItem('username')
    return this.http.post(`https://baas.kinvey.com/appdata/${appKey}/bought`,
    JSON.stringify({
     phoneId:phoneId,
     username:username,
    }),
    {headers:this.createAuthHeaders('Kinvey')}
      )
  }


  listPhones(){
    let username = localStorage.getItem('username')
   return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/bought/?query={"username":"${username}"}&sort={"_kmd.ect": -1}`,
   {headers:this.createAuthHeaders('Kinvey')}
    )
  }
  buyPhone(model){
    return this.http.post(
      `https://baas.kinvey.com/appdata/${appKey}/fullybought`,
      JSON.stringify(model),
      {headers:this.createAuthHeaders('Kinvey')}
     )
  }

  listBoughtPhones(){
    let username = localStorage.getItem('username')
   return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/fullybought/?query={"username":"${username}"}&sort={"_kmd.ect": -1}`,
   {headers:this.createAuthHeaders('Kinvey')}
    )
  }

  private createAuthHeaders(type : string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else if(type === 'Kinvey'){
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
    else{
      return new HttpHeaders({
         'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
        'Content-Type': 'application/json'
    })
    }
  }
}
//0d266f8b-208e-48f6-9e68-d061ad2cb63f.gtdqWDBa43e6DenecEBhbK/UmDCPe5WhIoSiAtVK2Wo=