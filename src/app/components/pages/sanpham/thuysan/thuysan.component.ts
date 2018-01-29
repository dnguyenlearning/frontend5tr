import { IAppState } from './../../../../store/store';
import { SanphamService } from './../../../../services/sanpham.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import * as _ from 'lodash';
import { NgRedux,select } from 'ng2-redux';
import { GETLIST_PRODUCT_THUYSAN } from '../../../../actions/actions';
@Component({
  selector: 'app-thuysan',
  templateUrl: './thuysan.component.html',
  styleUrls: ['./thuysan.component.scss']
})
export class ThuysanComponent implements OnInit {
  rausach_id:string;
  loaisanphamId:string;
  thuysanProducts:Object[]=[];
  loading:boolean=true;
  @select('thuysanProductsFilter') thuysanProductsNew;
  constructor(
    private route:ActivatedRoute,
    private sanphamService:SanphamService,
    private postService:PostService,
    private ngRedux: NgRedux<IAppState>
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
        this.thuysanProducts=data.products;
        this.thuysanProducts=_.filter(this.thuysanProducts,{chapnhan:true});
        this.ngRedux.dispatch({type:GETLIST_PRODUCT_THUYSAN, listProducts:this.thuysanProducts});
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
