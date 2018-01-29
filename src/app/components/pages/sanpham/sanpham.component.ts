import { SHOW_SEARCH_ICON } from './../../../actions/actions';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { LoaisanphamService } from './../../../services/loaisanpham.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss']
})
export class SanphamComponent implements OnInit, OnDestroy {
  loaisanphams:any=[];
  title=['Rau Sạch', 'Trái Cây', 'Gia Cầm',' Thuỷ Sản','Thực Phẩm Chay'];
  getSanphamSubscription:Subscription;
  constructor(
    private loaisanphamService:LoaisanphamService,
    private ngRedux:NgRedux<IAppState>
  ) {
    ngRedux.dispatch({type: SHOW_SEARCH_ICON, show:false})
  }


  ngOnInit() {
    this.getSanphamSubscription=this.loaisanphamService.getTatcaSanpham().subscribe(data=>{
      if(data.success){
        this.loaisanphams=data.loaisanphams;
      }else{
        return false;
      }
    },
    (err:Response)=>{
      return false;
    })
  }

  ngOnDestroy(){
    if(this.getSanphamSubscription){
      this.getSanphamSubscription.unsubscribe();
    }
  }

}
