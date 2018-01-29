import { IAppState } from './../../../../store/store';
import { NgRedux,select } from 'ng2-redux';
import { SanphamService } from './../../../../services/sanpham.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import * as _ from 'lodash';
import { GETLIST_PRODUCT_GIACAM } from '../../../../actions/actions';
@Component({
  selector: 'app-giacam',
  templateUrl: './giacam.component.html',
  styleUrls: ['./giacam.component.scss']
})
export class GiacamComponent implements OnInit {
  rausach_id:string;
  loaisanphamId:string;
  giacamProducts:Object[]=[];
  loading:boolean=true;
  @select('giacamProductsFilter') giacamProductsNew;
  constructor(
    private route:ActivatedRoute,
    private sanphamService:SanphamService,
    private postService:PostService,
    private ngRedux:NgRedux<IAppState>
  ) {
   }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.loaisanphamId=params.get('id');
      return this.postService.getPostWithLoaispId(this.loaisanphamId);
    })
    .subscribe(data=>{
      if(data.success){
        this.loading=false;
        this.giacamProducts=data.products;
        this.giacamProducts=_.filter(this.giacamProducts,{chapnhan:true});
        this.ngRedux.dispatch({type:GETLIST_PRODUCT_GIACAM, listProducts:this.giacamProducts})
      }else{
        this.loading=false;
        return false;
      }
    },(err)=>{
      this.loading=false;
      return false;
    });
  }

}
