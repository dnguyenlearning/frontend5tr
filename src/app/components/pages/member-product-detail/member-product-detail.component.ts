import { SHOW_SEARCH_ICON } from './../../../actions/actions';
import { IAppState } from './../../../store/store';
import { NgRedux } from 'ng2-redux';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-member-product-detail',
  templateUrl: './member-product-detail.component.html',
  styleUrls: ['./member-product-detail.component.scss']
})
export class MemberProductDetailComponent implements OnInit {

  product;
  loading:boolean=true;
  postId:string;
  constructor(
    private postService:PostService,
    private route:ActivatedRoute,
    private ngRedux:NgRedux<IAppState>
  ) { 
    ngRedux.dispatch({type: SHOW_SEARCH_ICON, show:false})
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
      return false;
    });
  }

}
