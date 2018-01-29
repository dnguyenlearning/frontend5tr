import { IAppState } from './../../../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { PostService } from './../../../../services/post.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoaisanphamService } from './../../../../services/loaisanpham.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { NgRedux } from 'ng2-redux';
import { SHOW_SEARCH_ICON } from '../../../../actions/actions';
@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit,OnDestroy {
  mode:string='pending';
  sanpham={
    ten:'',
  }
  product:Object;
  selectedIcon:string;
  icons=['envira','apple','android','paw','snowflake-o'];
  postId:string;
  loading:boolean=true;
  appState:Observable<any>;
  taosanphamSubscription:Subscription;
  constructor(
    private loaisanphamService: LoaisanphamService,
    private router:Router,
    private postService:PostService,
    private route:ActivatedRoute,
    private ngRedux:NgRedux<IAppState>
  ) {
    ngRedux.dispatch({type:SHOW_SEARCH_ICON, show:false})
   }

  ngOnDestroy(){
    if(this.taosanphamSubscription){
      this.taosanphamSubscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.postId=params.get('id');
      return this.postService.getPostWithId(this.postId);
    })
    .subscribe(data=>{
      if(data.success){
        this.loading=false;
        this.product=data.post;
      }else{
        this.loading=false;
        return false;
      }
    },(err)=>{
      this.loading=false;
    });
  }


  activeIcon(icon){
    this.selectedIcon=icon;
  }

  taoSanpham(){
    let userId=localStorage.getItem('greenfood_userId');
    this.sanpham['userId']=userId;
    this.sanpham['icon']=this.selectedIcon;
    this.taosanphamSubscription=this.loaisanphamService.createLoaisapham(this.sanpham).subscribe(data=>{
      if(data.success){
        this.sanpham.ten='';
        this.selectedIcon='';
      }
    })
  }

}
