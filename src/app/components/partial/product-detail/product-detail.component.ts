import { Router } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthServiceLogin } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input('chapnhan') chapnhan:boolean;
  @Input('product') product:any=[];
  expried:boolean=false;
  selectedImage:string='';
  username:string;
  btnDisabled:boolean=false;
  loading:boolean=false;

  // getUsernameSubscription:Subscription;
  chophepSubscription:Subscription;
  khongchophepSubscription:Subscription;
  constructor(
    public authServiceLogin:AuthServiceLogin,
    private postService:PostService,
    private route:Router,
    private flashMsg:FlashMessagesService
  ) { }

  ngOnInit() {
    let ngaypost=new Date(this.product.created_at);
    ngaypost.setDate(3+ngaypost.getDate());
    let currentTime=new Date();
    if(currentTime.getTime()>ngaypost.getTime()){
        this.expried=true;
    }else{
    }


    this.selectedImage=this.product['hinhanh'][0];
    // this.getUsernameSubscription=this.authServiceLogin.getUsernameWithPostId(this.product['nguoidang']).subscribe(data=>{
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
    
    if(this.chophepSubscription){this.chophepSubscription.unsubscribe();}
    if(this.khongchophepSubscription){this.khongchophepSubscription.unsubscribe();}
  }

  getSelectedImage(src){
    this.selectedImage=src;
  }
  chophep(){
    this.btnDisabled=true;
    this.loading=true;
    this.chophepSubscription=this.postService.chophepPost(this.product['_id']).subscribe(data=>{
      if(data.success){
        this.flashMsg.show('Thành công!',{cssClass:'flashCssSuccess', timeout:3000})
        this.route.navigate(['/admin/pending-post']);
      }else{
        this.flashMsg.show('Thất bại, Rất Xin Lôi!',{cssClass:'flashCssDanger', timeout:7000})
        return false;
      }
    },(err:Response)=>{
      this.flashMsg.show('Lỗi Đã Xảy ra, Rất Xin Lôi!',{cssClass:'flashCssDanger', timeout:7000})
      return false;
    })
  }

  khongchophep(){
    this.btnDisabled=true;
    this.loading=true;
    let dongy=confirm('Có chắc muốn xoá không ?');
    if(!dongy) return false;

    this.khongchophepSubscription=this.postService.khongchophepPost(this.product['_id']).subscribe(data=>{
      if(data.success){
        this.flashMsg.show('Thành công!',{cssClass:'flashCssSuccess', timeout:3000})
        this.route.navigate(['/admin/pending-post']);
      }else{
        this.flashMsg.show('Lỗi Đã Xảy ra, Rất Xin Lôi!',{cssClass:'flashCssDanger', timeout:7000})
        return false;
      }
    },(err:Response)=>{
      this.flashMsg.show('Lỗi Đã Xảy ra, Rất Xin Lôi!',{cssClass:'flashCssDanger', timeout:7000})
      return false;
    })
  }

}
