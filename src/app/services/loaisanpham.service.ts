import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class LoaisanphamService {
  // private backendUrl='http://localhost:3000/';
  private backendUrl='';
  token:string;
  constructor(
    private http:Http
  ) { }

  createLoaisapham(sanpham){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);

    headers.append('Content-Type','application/json');
    return this.http.post(this.backendUrl+'api/loaisanpham/create',sanpham,{headers:headers})
      .map(res=>res.json());
  }


  getTatcaSanpham(){
    
    return this.http.get(this.backendUrl+'api/loaisanpham/all')
      .map(res=>res.json());
  }

  loadToken(){
    const token=localStorage.getItem('greenfood_token');
    this.token=token;
  }
}
