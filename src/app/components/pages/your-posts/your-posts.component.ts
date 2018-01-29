import { IAppState } from './../../../store/store';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from './../../../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SHOW_SEARCH_ICON } from '../../../actions/actions';

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.scss']
})
export class YourPostsComponent implements OnInit, OnDestroy {
  products:any[]=[];
  loading:boolean=true;
  getSanphamSubscription:Subscription;
  constructor(
    private postService:PostService,
    private ngRedux:NgRedux<IAppState>
  ) {
    ngRedux.dispatch({type:SHOW_SEARCH_ICON, show:false})
   }

  ngOnInit() {
    const userId=localStorage.getItem('greenfood_userId');
    if(!userId) return false;
    this.getSanphamSubscription=this.postService.getPostWithUserId(userId).subscribe(data=>{
      console.log(data);
      if(data.success){
        this.loading=false;
        this.products=data.posts
      }else{
        this.loading=false;
        return false;
      }
    },
  
    (err:Response)=>{
      this.loading=false;
      return false;
    })
  }

  ngOnDestroy(){

  }

}
