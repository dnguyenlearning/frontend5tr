import { SHOW_SEARCH_ICON } from './../../../actions/actions';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { TintucService } from './../../../services/tintuc.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'app-create-tintuc',
  templateUrl: './create-tintuc.component.html',
  styleUrls: ['./create-tintuc.component.scss']
})
export class CreateTintucComponent implements OnInit,OnDestroy {
  ckeditorContent:string='';
  title:string='';
  tintucId:string='';
  getTintucSubscription:Subscription;
  taoTintucSubscription:Subscription;
  updateTintucSubcription:Subscription;
  pages:any[]=[
    {value:'gioithieu', name:'Giới Thiệu'},
    {value:'tintuc', name:'Tin Tức'},
    {value:'amthuc', name:'Ẩm Thực'}
  ]
  pageToPush:string='';
  selectedPage:string='gioithieu';
  constructor(
    private tintucService:TintucService,
    private flashMsg:FlashMessagesService,
    private route:Router,
    private router:ActivatedRoute,
    private ngRedux:NgRedux<IAppState>
  ) { 
    ngRedux.dispatch({type: SHOW_SEARCH_ICON, show:false})
  }

  ngOnInit() {
    this.pageToPush='gioithieu';
    this.ckeditorContent='';
    this.tintucId=this.router.snapshot.params.tintucId;
    if(!this.tintucId) return false;
    this.getTintucSubscription=this.tintucService.getTintucWithId(this.tintucId).subscribe(data=>{
      if(data.success){
        this.title=data.tintuc.title;
        this.ckeditorContent=data.tintuc.body;
        this.selectedPage=data.tintuc.page;
      }else{
        this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
        return false;
      }
    })
  }
  save(e){
    
  }

  pagesChange(p){
    this.pageToPush=p.value;
  }

  ngOnDestroy(){
    if(this.getTintucSubscription) {this.getTintucSubscription.unsubscribe();}
    if(this.taoTintucSubscription) {this.taoTintucSubscription.unsubscribe();}
    if(this.updateTintucSubcription){this.updateTintucSubcription.unsubscribe();}
  }
  createTintuc(){
    let newTintuc={
      title:this.title,
      body:this.ckeditorContent,
      page:this.pageToPush
    }

    let regex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
    var src = regex.exec(this.ckeditorContent);
    
    if(!src) {
      newTintuc['imgTintuc']='assets/images/showFooter@2x.png';
    }else{
      let extention=src[1].slice(-3);
      if(extention=='jpg'|| extention=='png'){
        newTintuc['imgTintuc']=src[1];
      }else{
        newTintuc['imgTintuc']='assets/images/showFooter@2x.png';
      }
    }

    if(!this.tintucId){
      this.taoTintucSubscription=this.tintucService.createTintuc(newTintuc).subscribe(data=>{
        if(data.success){
          this.flashMsg.show('Tạo thành công!', {cssClass:'flashCssSuccess', timeout:3000});
          this.route.navigate([this.pageToPush])
        }else{
          this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
          return false;
        }
      })
    }else{
      this.updateTintucSubcription=this.tintucService.updateTintuc(this.tintucId,newTintuc).subscribe(data=>{
        if(data.success){
          this.flashMsg.show('update thành công!', {cssClass:'flashCssSuccess', timeout:3000});
          this.route.navigate([this.selectedPage])
        }else{
          this.flashMsg.show('Xin vui lòng thử lại sau vài phút!', {cssClass:'flashCssDanger', timeout:3000})
          return false;
        }
      })
    }
    

  }
}
