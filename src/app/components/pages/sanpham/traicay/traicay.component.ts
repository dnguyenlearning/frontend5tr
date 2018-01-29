import { GETLIST_PRODUCT_TRAICAY } from './../../../../actions/actions';
import { NgRedux, select } from 'ng2-redux';
import { SanphamService } from './../../../../services/sanpham.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import * as _ from 'lodash';
import { IAppState } from '../../../../store/store';
@Component({
  selector: 'app-traicay',
  templateUrl: './traicay.component.html',
  styleUrls: ['./traicay.component.scss']
})
export class TraicayComponent implements OnInit {
  rausach_id:string;
  loaisanphamId:string;
  traicayProducts:Object[]=[];
  loading:boolean=true;
  @select('traicayProductsFilter') traicayProductsNew;
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
        this.traicayProducts=data.products;
        this.traicayProducts=_.filter(this.traicayProducts,{chapnhan:true});
        this.ngRedux.dispatch({type:GETLIST_PRODUCT_TRAICAY, listProducts:this.traicayProducts});
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
