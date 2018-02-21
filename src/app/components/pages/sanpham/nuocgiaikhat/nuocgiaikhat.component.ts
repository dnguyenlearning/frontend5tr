import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SanphamService } from '../../../../services/sanpham.service';
import { PostService } from '../../../../services/post.service';
import { IAppState } from '../../../../store/store';
import { GETLIST_PRODUCT_NUOCGIAIKHAT } from '../../../../actions/actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-nuocgiaikhat',
  templateUrl: './nuocgiaikhat.component.html',
  styleUrls: ['./nuocgiaikhat.component.scss']
})
export class NuocgiaikhatComponent implements OnInit {

  rausach_id:string;
  loaisanphamId:string;
  nuocgiaikhatProducts:Object[]=[];
  loading:boolean=true;
  @select('nuocgiaikhatProductsFilter') nuocgiaikhatProductsNew;
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
        this.nuocgiaikhatProducts=data.products;
        this.nuocgiaikhatProducts=_.filter(this.nuocgiaikhatProducts,{chapnhan:true});
        this.ngRedux.dispatch({type:GETLIST_PRODUCT_NUOCGIAIKHAT, listProducts:this.nuocgiaikhatProducts})
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
