import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class TintucService {
  // private backendUrl='http://localhost:3000/';
  private backendUrl='';
  token:string;
  constructor(
    private http:Http
  ) { }

  createTintuc(tintuc){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.post(this.backendUrl+'api/tintuc/create', tintuc,{headers:headers})
    .map(res => res.json());
  }

  updateTintuc(tintucId,newTintuc){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.put(this.backendUrl+'api/tintuc/'+tintucId, newTintuc,{headers:headers})
    .map(res => res.json());
  }
  getTintuc(page){
    return this.http.get(this.backendUrl+'api/tintuc/tatca/'+page)
    .map(res => res.json());
  }
  getTintucWithId(tintucId){
    return this.http.get(this.backendUrl+'api/tintuc/'+tintucId)
    .map(res => res.json());
  }

  deleteTintuc(tintucId){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.delete(this.backendUrl+'api/tintuc/'+tintucId,{headers:headers})
    .map(res => res.json());
  }

  loadToken(){
    const token=localStorage.getItem('greenfood_token');
    this.token=token;
  }

}
