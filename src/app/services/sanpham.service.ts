import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class SanphamService {
  // private backendUrl='http://localhost:3000/';
  private backendUrl='';
  token:string;
  constructor(
    private http:Http
  ) { }

  taoSanPham(sanpham){}

  layTatcaSanpham(){}

  layTatcaSanphamVoiId(id){}
  
  loadToken(){
    const token=localStorage.getItem('greenfood_token');
    this.token=token;
  }
}
