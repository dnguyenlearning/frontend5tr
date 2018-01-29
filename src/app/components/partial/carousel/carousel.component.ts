import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { DragScrollDirective } from 'ngx-drag-scroll';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;
  constructor() { }
  imagelist = [
    '/assets/images/carousel1@2x.png',
    '/assets/images/carousel2@2x.png',
    '/assets/images/carousel3@2x.png',
  ];
  
  leftNavDisabled = true;
  rightNavDisabled = false;
  clickItem(item) {
  }
  timer1;
  ngOnInit(){
    this.timer1=setInterval(()=>{
      this.ds.moveRight();
      if(this.rightNavDisabled){
        this.ds.moveTo(0);
      }
    }, 7000)
  }
  ngOnDestroy(){
    clearInterval(this.timer1);
  }
  moveLeft() {
    this.ds.moveLeft();
  }
  moveTo(){
    this.ds.moveTo(2);
  }

  moveRight() {
    this.ds.moveRight();
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }
  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }
}
