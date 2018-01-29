import { NgRedux,select } from 'ng2-redux';
import { SanphamService } from './../../../../services/sanpham.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import * as _ from 'lodash';
import { IAppState } from '../../../../store/store';
import { GETLIST_PRODUCT_RAUSACH } from '../../../../actions/actions';
@Component({
  selector: 'app-rausach',
  templateUrl: './rausach.component.html',
  styleUrls: ['./rausach.component.scss']
})
export class RausachComponent implements OnInit {
  rausach_id:string;
  loaisanphamId:string;
  rausachProducts:Object[]=[];
  loading:boolean=true;
  @select('rausachProductsFilter') rausachProductsNew;
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
        this.rausachProducts=data.products;
        this.rausachProducts=_.filter(this.rausachProducts,{chapnhan:true});
        this.ngRedux.dispatch({type:GETLIST_PRODUCT_RAUSACH, listProducts:this.rausachProducts});
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
