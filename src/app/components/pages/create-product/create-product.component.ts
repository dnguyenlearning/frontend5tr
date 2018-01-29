import { SHOW_SEARCH_ICON } from './../../../actions/actions';
import { IAppState } from './../../../store/store';
import { NgRedux } from 'ng2-redux';
import { AuthService } from 'angular4-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private ngRedux:NgRedux<IAppState>
  ) { 
    ngRedux.dispatch({type: SHOW_SEARCH_ICON, show:false})
  }

  ngOnInit() {
    
  }

}
