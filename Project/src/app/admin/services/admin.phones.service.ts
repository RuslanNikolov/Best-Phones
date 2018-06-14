import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const appKey = "kid_SkO3lzTZG" ;
const appSecret = "d81d766b06374fb9b16a882aa6b6cab1" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`

@Injectable()
export class AdminPhonesService {

  constructor( private http : HttpClient) { 
    
  }
   getPhones(){
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/phones`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
   }
   getPhone(id){
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/phones/${id}`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
   }
   createPhone(model){
     return this.http.post(
       `https://baas.kinvey.com/appdata/${appKey}/phones`,
       JSON.stringify(model),
       {headers:this.createAuthHeaders('Kinvey')}
      )
   }  
   deletePhone(id){
     return this.http.delete(
       `https://baas.kinvey.com/appdata/${appKey}/phones/${id}`,
       {headers:this.createAuthHeaders('Kinvey')}
 )
   }
//Why cant i delete the cart phone reference :(
   deleteCartPhone(id){
    
    return this.http.delete(
      `https://baas.kinvey.com/appdata/${appKey}/bought/?query={"phoneId":"${id}"}`,
      {headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${'0d92dee164684aa996abd6e451ccb607'}`)}`,
        'Content-Type': 'application/json'
      })}
)
   }

   //Why cant i delete the bought phones reference :(
  deleteBoughtPhone(id){
    return this.http.delete(
      `https://baas.kinvey.com/appdata/${appKey}/fullybought/?query={"phoneId":"${id}"}`,
      {headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${'0d92dee164684aa996abd6e451ccb607'}`)}`,
        'Content-Type': 'application/json'
      })}
)
   }

   editPhone(model,id){
    return this.http.put(
      `https://baas.kinvey.com/appdata/${appKey}/phones/${id}`,
      JSON.stringify(model),
      {headers:this.createAuthHeaders('Kinvey')}
     )
   }




  private createAuthHeaders(type : string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }

}
