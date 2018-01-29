import { AuthServiceLogin } from './../../../services/auth.service';
import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { trigger,state,style,transition,animate, keyframes } from '@angular/animations';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('menu', [
      state('void', style({
          transform: 'translateY(-100%)',
      })),
      state('*', style({
        transform: 'translateY(0%)',
      })),
      transition('void <=> *', animate('500ms ease-in-out')),
      ]),
    ]
})
export class HeaderComponent implements OnInit {
  @Output('showLoginToggle') showLoginToggle=new EventEmitter();
  @Input('loginState') showLogin:boolean=false;
  showMenu:boolean=false;

 
  constructor(
     public authServiceLogin:AuthServiceLogin
  ) { }

  
  ngOnInit() {
  }

  showHideMenu(){
    this.showMenu=!this.showMenu;
  }
  showHideLoginForm(){
    this.showLogin=!this.showLogin;
    this.showLoginToggle.emit(this.showLogin);
  }
  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    this.showMenu=false;
  }
}
