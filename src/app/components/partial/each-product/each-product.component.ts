import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceLogin } from './../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'each-product',
  templateUrl: './each-product.component.html',
  styleUrls: ['./each-product.component.scss'],
})
export class EachProductComponent implements OnInit,OnDestroy {
  @Input('product') product:any;
  // username:string;
  over1week:boolean=false;
  userNameSubscription:Subscription;
  noShowDetail:boolean=false;
  constructor(
    private authServiceLogin:AuthServiceLogin,
    private router:Router
  ) { }

  ngOnInit() {

    let ngaypost=new Date(this.product.created_at);
    ngaypost.setDate(3+ngaypost.getDate());
    let currentTime=new Date();
    if(currentTime.getTime()>ngaypost.getTime()){
      if(this.router.url=='/admin/manage-post'){
        this.over1week=true;
      }
    }else{
    }

    if(this.router.url=='/member/your-posts'){
        if(!this.product.chapnhan){
          this.noShowDetail=true;
        }
    }

    // this.userNameSubscription=this.authServiceLogin.getUsernameWithPostId(this.product.nguoidang).subscribe(data=>{
    //   if(data.success){
    //     this.username=data.username;
    //   }else{
    //     return false;
    //   }
    // },
    // (err:Response)=>{
    //   return false;
      
    // })
  }

  ngOnDestroy(){
    if(this.userNameSubscription){
      this.userNameSubscription.unsubscribe();
    }
  }

}
