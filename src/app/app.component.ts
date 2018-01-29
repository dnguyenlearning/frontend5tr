import { OPEN_MODAL, SHOW_SEARCH_ICON } from './actions/actions';
import { NgRedux, select } from 'ng2-redux';
import { AuthServiceLogin } from './services/auth.service';
import { AuthService } from 'angular4-social-login';
import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { trigger,state,style,transition,animate, keyframes } from '@angular/animations';
import { IAppState } from './store/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  animations:[
    trigger('goInOut', [
      state('void', style({
          transform: 'translateX(-100%)',
      })),
      state('*', style({
          transform: 'translateX(0)',
      })),
      transition('void <=> *', animate('300ms ease-in')),
      ]),
    trigger('login', [
      state('void', style({
          opacity: '0',
      })),
      state('*', style({
        opacity: '1',
      })),
      transition('void <=> *', animate('300ms ease-in')),
      ]),
      trigger('backdrop', [
        state('void', style({
            opacity: '0',
        })),
        state('*', style({
          opacity: '0.5',
        })),
        transition('void <=> *', animate('300ms ease-in')),
        ]),
  ]
})


export class AppComponent implements OnInit {
  user;
  @select('open_modal') open_modal;
  @select('show_search_icon') show_search_icon;
  constructor(
    public authLogin:AuthServiceLogin,
    private authService:AuthService,
    private ngRedux:NgRedux<IAppState>
  ){
    ngRedux.dispatch({type:OPEN_MODAL});
  }

  ngOnInit(){
   setTimeout(() => {
     this.showLogin=false;
   }, 500);
  this.authService.authState.subscribe(user=>{
    this.user=user;
  })
  }
  click(){
    
  }

  title = 'app';
  showLogin:boolean=true;
  changeShowLogin(e){
    this.showLogin=e;
  }
  openModal(){
    this.ngRedux.dispatch({type:OPEN_MODAL});
  }
  
  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    this.showLogin=false;
  }
}
