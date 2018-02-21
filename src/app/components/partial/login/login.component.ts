import { Router } from '@angular/router';
import { AuthServiceLogin } from './../../../services/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  public user: SocialUser;

  @Output('loginState') loginState=new EventEmitter();
  constructor(
    private authService: AuthService,
    public authServiceLogin:AuthServiceLogin,
    private route:Router
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user){
        this.authServiceLogin.authenticateUser(user).subscribe(data=>{
          
          if(data.success){
            this.authServiceLogin.storeUserData(data.token,data.userId,data.username, data.chucvu);
            this.loginState.emit({login:true})
          }else{
            return false;
          }
        },
      (err:Response)=>{
        return false;
      })
      }
    });
  }

  ngOnDestroy(){
  }
  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((data)=>{
      //call api
    })
    .catch(err=>{
      return false;
    })
  }

  signInWithFacebook():void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).catch(err=>{
    });;    
  }

  logout(): void {
    this.authService.signOut();
    this.authServiceLogin.logout();
    this.route.navigate(['/']);
    setTimeout(() => {
      this.loginState.emit({login:false})
    }, 1000);
  }


}
