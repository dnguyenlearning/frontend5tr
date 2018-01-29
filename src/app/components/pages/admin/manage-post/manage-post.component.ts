import { SHOW_SEARCH_ICON } from './../../../../actions/actions';
import { IAppState } from './../../../../store/store';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { LoaisanphamService } from './../../../../services/loaisanpham.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss']
})
export class ManagePostComponent implements OnInit,OnDestroy {
  loaisanphams:any=[];
  loading:boolean=true;
  title=['Rau Sạch', 'Trái Cây', 'Gia Cầm',' Thuỷ Sản','Thực Phẩm Chay'];
  getSanphamSubscription:Subscription;
  constructor(
    private loaisanphamService:LoaisanphamService,
    private flashMsg:FlashMessagesService,
    private ngRedux:NgRedux<IAppState>
  ) { 
    ngRedux.dispatch({type:SHOW_SEARCH_ICON, show:false})
  }

  ngOnInit() {
    this.getSanphamSubscription=this.loaisanphamService.getTatcaSanpham().subscribe(data=>{
      if(data.success){
        this.loading=false;
        this.loaisanphams=data.loaisanphams;
      }else{
        this.loading=true;
        this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
        return false;
      }
    },
    (err:Response)=>{
      this.loading=true;
      this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
    })
  }

  ngOnDestroy(){
    if(this.getSanphamSubscription){
      this.getSanphamSubscription.unsubscribe();
    }
  }

}
