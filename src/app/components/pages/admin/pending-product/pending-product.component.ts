import { IAppState } from './../../../../store/store';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from './../../../../services/post.service';
import { Observable } from 'rxjs/Observable';
import { LoaisanphamService } from './../../../../services/loaisanpham.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import 'rxjs/add/observable/combineLatest';
import { OnDestroy } from '@angular/core';
import { SHOW_SEARCH_ICON } from '../../../../actions/actions';
@Component({
  selector: 'app-pending-product',
  templateUrl: './pending-product.component.html',
  styleUrls: ['./pending-product.component.scss']
})
export class PendingProductComponent implements OnInit,OnDestroy {

  loaisanphams:any=[];
  pendingSanpham:any[]=[];
  loading:boolean=true;
  title=['Rau Sạch', 'Trái Cây', 'Gia Cầm',' Thuỷ Sản','Thực Phẩm Chay'];
  totalSubscription:Subscription;
  constructor(
    private loaisanphamService:LoaisanphamService,
    private flashMsg:FlashMessagesService,
    private postService:PostService,
    private ngRedux:NgRedux<IAppState>
  ) {
    ngRedux.dispatch({type:SHOW_SEARCH_ICON, show:false})
  }
  
  ngOnInit() {

    this.totalSubscription=Observable.combineLatest([
      this.loaisanphamService.getTatcaSanpham(),
      this.postService.getPostsWithCondition(false)
    ]).subscribe(data=>{
      if(data[0].success){
        this.loading=false;
        this.loaisanphams=data[0].loaisanphams;
      }else{
        this.loading=false;
        this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
        return false;
      }
      if(data[1].success){
        this.pendingSanpham=data[1].posts;
      }else{
        this.loading=false;
        this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
        return false;
      }
      
    },(err:Response)=>{
      this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
      return false;
    })

  }

  ngOnDestroy(){
    if(this.totalSubscription){
      this.totalSubscription.unsubscribe();
    }
  }

}
