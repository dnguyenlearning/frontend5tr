import { AuthServiceLogin } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authServiceLogin:AuthServiceLogin,
    private route:Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authServiceLogin.isAdmin()){
      return true;
    }else{
      this.route.navigate(['/']);
      return false;
    }
    
  }
}
