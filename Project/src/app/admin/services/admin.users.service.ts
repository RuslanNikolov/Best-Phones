import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const appKey = "kid_SkO3lzTZG" ;
const appSecret = "d81d766b06374fb9b16a882aa6b6cab1" // APP SECRET HERE;
const masterSecret = '0d92dee164684aa996abd6e451ccb607'



@Injectable()
export class AdminUsersService {

  constructor( private http : HttpClient) { }
  
  getUsers(){
    return this.http.get(`https://baas.kinvey.com/user/${appKey}`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
  }
  

  getUser(id){
    return this.http.get(`https://baas.kinvey.com/user/${appKey}/${id}`,
    {headers:this.createAuthHeaders('Kinvey')}
     )
  }
  editUser(model,id){
    return this.http.put(
      `https://baas.kinvey.com/user/${appKey}/${id}`,
      JSON.stringify(model),
      {headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${'0d92dee164684aa996abd6e451ccb607'}`)}`,
        'Content-Type': 'application/json'
      })}
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
