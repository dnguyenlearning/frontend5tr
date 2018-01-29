import { Subscription } from 'rxjs/Subscription';
import { PostService } from './../../../services/post.service';
import { Component, OnInit, ViewChild, Input, OnDestroy, HostListener } from '@angular/core';
import * as _ from 'lodash';

import { trigger,state,style,transition,animate, keyframes } from '@angular/animations';


@Component({
  selector: 'slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations:[
    trigger('fadeInOut', [
      transition('current <=> left', animate('500ms ease-in', keyframes([
        style({opacity: 0.3, transform: 'translate(50px,0)', offset: 0}),
        style({opacity: 0.5, transform: 'translate(25px,0)',  offset: 0.5}),
        style({opacity: 1, transform: 'translate(0,0)',     offset: 1.0})
      ]))),
      transition('current <=> right', animate('500ms ease-in', keyframes([
        style({opacity: 0.3, transform: 'translate(-50px,0)', offset: 0}),
        style({opacity: 0.5, transform: 'translate(-25px,0)',  offset: 0.5}),
        style({opacity: 1, transform: 'translate(0,0)',     offset: 1.0})
      ])))
    ]),
  ]
})
export class SlideComponent implements OnInit ,OnDestroy {

  state:string='current';
  maxProduct:boolean=false;
  minProduct:boolean=true;
  page:number=0;
  @Input('title') title:string;
  @Input('loaisanphamId') loaisanphamId;
  @Input('time') time:number;
  @Input('chapnhan') chapnhan:number;
  loaisanphamSubscription:Subscription;
  products:Object[]=[];
  productsShow:Object[]=[];
  productsChunk:any[]=[];
  loading:boolean=true;
  filesShow:number=3;
  constructor(
    private postService:PostService
  ) { }

  
  timer2;


  changePage(value){

    if(value=='right'){
      this.page++;
      this.state='right';
    }else{
      this.page--;
      this.state='left';
    }

    this.minProduct=(this.page>0)?false:true;
    this.maxProduct=(this.page>=this.productsChunk.length-1)?true:false;
    this.updateProductShow(this.page);
  }

  updateProductShow(value){
    this.productsShow=this.productsChunk[value];
  }
  animationStart(e){
    this.state='current';
  }
  animationDone(e){
    this.state='current';
  }
  ngOnInit(){
    
    this.loaisanphamSubscription=this.postService.getPostWithLoaispId(this.loaisanphamId).subscribe(data=>{
      if(data.success){
        this.loading=false;
        this.products=data.products;
        this.products=_.filter(this.products,{chapnhan:this.chapnhan})
        
        this.maxProduct=(this.products.length<4)?true:false;
        this.resizeWidth(window.innerWidth);
        this.productsChunk= _.chunk(this.products,this.filesShow)
        this.productsShow=this.productsChunk[0];
      }else{
        this.loading=false;
        return false;
      }
    },(err:Response)=>{
      this.loading=false;
      return false;
    })

    this.onResize(event);


    this.timer2=setInterval(()=>{
      if(this.products.length<=this.filesShow){
        clearInterval(this.timer2);
        return;
      }

      if(!this.maxProduct){
        this.changePage('right');
        this.productsChunk= _.chunk(this.products,this.filesShow)
        this.productsShow=this.productsChunk[0];
      }else{
        this.changePage('left');
        this.productsChunk= _.chunk(this.products,this.filesShow)
        this.productsShow=this.productsChunk[0];
      }
    },this.time);



 
    
  }

  ngOnDestroy(){
    clearInterval(this.timer2);
    if(this.loaisanphamSubscription){
      this.loaisanphamSubscription.unsubscribe();
    }
  }

  resizeWidth(width){
      if(width>=768){
        this.filesShow=3;
      }else if(width>=476){
        this.filesShow=2;
      }else{
        this.filesShow=1;
      }
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.resizeWidth(event.target.innerWidth);
  }

}
