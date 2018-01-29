import { KHUVUC_CHANGED, OPEN_MODAL } from './../../../actions/actions';
import { NgRedux,select } from 'ng2-redux';
import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'modal-khuvuc',
  templateUrl: './modal-khuvuc.component.html',
  styleUrls: ['./modal-khuvuc.component.scss']
})
export class ModalKhuvucComponent implements OnInit {

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
    private ngRedux:NgRedux<IAppState>
  ) {

   }

  ngOnInit() {

  }

  khuvucChanged(tinhthanh){
    this.ngRedux.dispatch({type:KHUVUC_CHANGED, khuvuc:tinhthanh.value})
    this.ngRedux.dispatch({type:OPEN_MODAL})
  }

  close(){
    this.ngRedux.dispatch({type:OPEN_MODAL});
  }

}
