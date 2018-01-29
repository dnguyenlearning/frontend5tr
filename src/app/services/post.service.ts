import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class PostService {
  // private backendUrl='http://localhost:3000/';
  private backendUrl='';
  token:string;
  constructor(
    private http:Http
  ) { }

  createPostAndUpload(Formdata){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.post(this.backendUrl+'api/posts/post/upload', Formdata,{headers:headers})
    .map(res => res.json());
  }

  // updataPostInfoWithId(postId, Info){
  //   let headers=new Headers();
  //   this.loadToken();
  //   headers.append('Authorization','gf_token '+this.token);
  //   return this.http.put(this.backendUrl+'api/posts/post/update/'+postId, Info,{headers:headers})
  //   .map(res => res.json());
  // }
  creatNewPost(newProduct){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.post(this.backendUrl+'api/posts/post/create', newProduct,{headers:headers})
    .map(res => res.json());
  }


  getPostsWithCondition(chapnhan){
    return this.http.get(this.backendUrl+'api/posts/tatca/'+chapnhan)
    .map(res => res.json());
  }

  getPostWithUserId(userId){
    return this.http.get(this.backendUrl+'api/posts/yourposts/'+userId)
    .map(res => res.json());
  }

  getPostWithId(postId){
    return this.http.get(this.backendUrl+'api/posts/post/'+postId)
    .map(res => res.json());
  }

  getPostWithLoaispId(loaispId){
    return this.http.get(this.backendUrl+'api/posts/loaisanpham/'+loaispId)
    .map(res => res.json());
  }
  chophepPost(postId){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.put(this.backendUrl+'api/posts/post/'+postId, postId,{headers:headers})
    .map(res => res.json());
  }


  khongchophepPost(postId){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization','gf_token '+this.token);
    return this.http.delete(this.backendUrl+'api/posts/post/'+postId,{headers:headers})
    .map(res => res.json());
  }

  
  loadToken(){
    const token=localStorage.getItem('greenfood_token');
    this.token=token;
  }
}
