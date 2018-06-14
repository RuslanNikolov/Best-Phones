import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Models
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';

const appKey = "kid_SkO3lzTZG" ;
const appSecret = "d81d766b06374fb9b16a882aa6b6cab1" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`

@Injectable()
export class AuthenticationService {
  private currentAuthtoken : string;

  constructor(
    private http : HttpClient
  ) { }

  login(loginModel : LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  register(registerModel : RegisterModel) : Observable<Object> {
    return this.http.post(
      registerUrl, 
      JSON.stringify(registerModel),
      { 
        headers: this.createAuthHeaders('Basic')
      }
    )
  }
assignAdminRole(userId,roleId){
  return this.http.put(
    `https://baas.kinvey.com/user/${appKey}/${userId}/roles/${roleId}`,{},
    {headers: new HttpHeaders({
      'Authorization': `Basic ${btoa(`${appKey}:${'0d92dee164684aa996abd6e451ccb607'}`)}`,
      'Content-Type': 'application/json'
    })}
  )
}
  
    getRoles(){
      return this.http.get(
        `https://baas.kinvey.com/roles/${appKey}`,
        {headers: new HttpHeaders({
          'Authorization': `Basic ${btoa(`${appKey}:${'0d92dee164684aa996abd6e451ccb607'}`)}`,
          'Content-Type': 'application/json'
        })}


        
      )
    }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  isLoggedIn() {
    let authtoken : string = localStorage.getItem('authtoken');

    return authtoken === this.currentAuthtoken;
  }
  
  isAdmin(){
    if(localStorage.getItem('roles') && localStorage.getItem('roles') === 'admin') {
      return true
    }
    else{
      return false
    }
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value : string) {
    this.currentAuthtoken = value;
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