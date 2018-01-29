import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthServiceLogin {
  userToken:any;
  userId:string;
  chucvu:string;
  // private backendUrl='http://localhost:3000/';
  private backendUrl='';
  
  constructor(private http:Http) { }

  authenticateUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.backendUrl+'api/users/authenticate',user,{headers:headers})
      .map(res=>res.json());
  }
  storeUserData(token,userId, chucvu){
    localStorage.setItem('greenfood_token',token);
    localStorage.setItem('greenfood_userId',userId);
    this.userToken=token;
    this.userId=userId;
    this.chucvu=chucvu;
  }
  getUsernameWithPostId(userId){
    let headers=new Headers();
    return this.http.get(this.backendUrl+'api/users/user/'+userId,{headers:headers})
      .map(res=>res.json());
  }

  isAdmin(){
    if(this.isLoggedIn()){
      if(this.chucvu=='admin') {
        return true;
      }else{
        return false;
      }
    }
    return false;
  }


  isLoggedIn(){
    let jwtHelper=new JwtHelper();
    let token=localStorage.getItem('greenfood_token');
    if(!token){return false};
    let expirationDate=jwtHelper.getTokenExpirationDate(token);
    let isExpired=jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  

  logout(){
    this.userToken=null;
    this.userId=null;
    localStorage.removeItem('greenfood_userId');
    localStorage.removeItem('greenfood_token');
    this.chucvu=null;
  }
}
