import { NgRedux ,select} from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from './../../../services/post.service';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { IAppState } from '../../../store/store';
import { GETLIST_PRODUCTS, SHOW_SEARCH_ICON } from '../../../actions/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // products:any[]=[];

  loading:boolean=true;
  getSanphamSubscription:Subscription;
  @select('filterProductsHome') products;
  constructor(
    private postService:PostService,
    private ngRedux:NgRedux<IAppState>
  ) {
    ngRedux.dispatch({type: SHOW_SEARCH_ICON, show:true})
   }

  ngOnInit() {
    this.getSanphamSubscription=this.postService.getPostsWithCondition(true).subscribe(data=>{
      if(data.success){
        this.loading=false;
        // this.products=data.posts
        this.ngRedux.dispatch({type: GETLIST_PRODUCTS, listProducts:data.posts});
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
    if(this.getSanphamSubscription){
      this.getSanphamSubscription.unsubscribe();
    }
  }

}
