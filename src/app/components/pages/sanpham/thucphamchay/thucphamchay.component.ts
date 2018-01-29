import { NgRedux,select } from 'ng2-redux';
import { PostService } from './../../../../services/post.service';
import { SanphamService } from './../../../../services/sanpham.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IAppState } from '../../../../store/store';
import { GETLIST_PRODUCT_THUCPHAMCHAY } from '../../../../actions/actions';
@Component({
  selector: 'app-thucphamchay',
  templateUrl: './thucphamchay.component.html',
  styleUrls: ['./thucphamchay.component.scss']
})
export class ThucphamchayComponent implements OnInit {
  loaisanphamId:string;
  thucphamchayProducts:Object[]=[];
  loading:boolean=true;
  @select('thucphamchayProductsFilter') thucphamchayProductsNew;
  constructor(
    private route:ActivatedRoute,
    private sanphamService:SanphamService,
    private postService:PostService,
    private ngRedux:NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.loaisanphamId=params.get('id');
      return this.postService.getPostWithLoaispId(this.loaisanphamId);
    })
    .subscribe(data=>{
      if(data.success){
        this.loading=false;
        this.thucphamchayProducts=data.products;
        this.thucphamchayProducts=_.filter(this.thucphamchayProducts,{chapnhan:true});
        this.ngRedux.dispatch({type: GETLIST_PRODUCT_THUCPHAMCHAY, listProducts:this.thucphamchayProducts});
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
