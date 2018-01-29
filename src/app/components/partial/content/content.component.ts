import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input('products') products:any[];

  constructor() {
   }

  ngOnInit() {
    
  }

}
