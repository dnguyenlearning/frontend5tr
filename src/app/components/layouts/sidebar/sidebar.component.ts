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

  tinhs=['An Giang','Bà Rịa-Vũng Tàu','Bạc Liêu','Bắc Kạn','Bắc Giang','Bắc Ninh','Bến Tre','Bình Dương',
    'Bình Định','Bình Phước','Bình Thuận','Cà Mau','Cao Bằng','Cần Thơ','Đà Nẵng','Đắk Lắk','Đắk Nông',
    'Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Nội','Hà Tây','Hà Tĩnh','Hải Dương',
    'Hải Phòng','Hòa Bình','Hồ Chí Minh','Hậu Giang','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lào Cai',
    'Lạng Sơn','Lâm Đồng','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình',
    'Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên',
    'Thanh Hóa','Thừa Thiên - Huế','Tiền Giang','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'
  ]

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
        let names=['Rau Sạch', 'Trái Cây', 'Gia Cầm',' Thuỷ Sản','Thực Phẩm Chay'];
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
    }else if(window.pageYOffset<800){
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
