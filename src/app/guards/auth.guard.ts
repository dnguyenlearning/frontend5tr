import { AuthServiceLogin } from './../services/auth.service';
import { AuthService } from 'angular4-social-login';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private route: Router,
    private authServiceLogin:AuthServiceLogin
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return new Promise((resolve, reject) => {
    //   this.authService.authState.subscribe(user=>{
    //     console.log(user);
    //     if(user) {
    //        return resolve(true);
    //     }
    //     else{
    //       this.route.navigate(['/']);
    //       return resolve(false);
    //     }
    //   })
    // })

    if(this.authServiceLogin.isLoggedIn()){
      return true;
    }else{
      this.route.navigate(['/']);
      return false;
    }
    
  }
}
