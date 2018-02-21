import { IAppState } from './../../../store/store';
import { KHUVUC_CHANGED } from './../../../actions/actions';
import { NgRedux,select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { LoaisanphamService } from './../../../services/loaisanpham.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { LoaiSanPham } from '../../../modals/loaisanpham';
// import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  // appState:Observable<any>;
  loaisanphams:any[]=[];
  loaisanphamSubscription:Subscription;
  @select('khuvuc') khuvuc;

  

  constructor(
    private loaisanphamService:LoaisanphamService,
    // private store:Store<AppState>,
    private ngRedux:NgRedux<IAppState>
  ) { 
    
  }

  ngOnInit() {
    // this.appState=this.store.select(state=>state.loaisanpham);
    this.ngRedux.dispatch({type:KHUVUC_CHANGED, khuvuc:'tatca'})
    this.loaisanphamSubscription=this.loaisanphamService.getTatcaSanpham().subscribe(data=>{
      if(data.success){
        // this.store.dispatch(new loaisanphamAction.getAllLoaisanphamAction(data.loaisanphams));
        let names=['Rau Sạch', 'Trái Cây', 'Gia Súc Gia Cầm',' Thuỷ Sản','Thực Phẩm Chay','Nước Giải Khát'];
        this.loaisanphams=data.loaisanphams;
        this.loaisanphams.map((sanpham,index)=>{
          sanpham.name= names[index];
          return sanpham;
        });

      }else{
        return false;
      }
    })
  }

  khuvucChanged(khuvuc){
    this.ngRedux.dispatch({type:KHUVUC_CHANGED, khuvuc:khuvuc.value})
  }

  showLogoHeader:boolean=false;
  showLogoFooter:boolean=false;

  @HostListener('window:scroll', ['$event']) 
  doSomething(event) {
    if(window.pageYOffset<300){
      this.showLogoFooter=false;
      this.showLogoHeader=false;
    }else if(window.pageYOffset<500){
      this.showLogoFooter=true;
      this.showLogoHeader=true;
    }else{
      this.showLogoFooter=false;
    }
  }

  ngOnDestroy(){
    if(this.loaisanphamSubscription){
      this.loaisanphamSubscription.unsubscribe();
    }
  }
}
