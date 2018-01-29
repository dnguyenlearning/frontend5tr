import { SHOW_SEARCH_ICON } from './../../../actions/actions';
import { IAppState } from './../../../store/store';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { AuthServiceLogin } from './../../../services/auth.service';
import { TintucService } from './../../../services/tintuc.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import * as _ from 'lodash';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss']
})
export class TintucComponent implements OnInit, OnDestroy {
  tintucs: any[] = [];
  firstTintuc: Object = {};
  loading: boolean = true;
  getTintucSubscription: Subscription;
  deleteTintucSubscription: Subscription;
  constructor(
    private tintucService: TintucService,
    private flashMsg: FlashMessagesService,
    public authServiceLogin: AuthServiceLogin,
    private ngRedux:NgRedux<IAppState>
  ) { 
    ngRedux.dispatch({type: SHOW_SEARCH_ICON, show:false})
  }

  ngOnInit() {
    this.getTintucSubscription = this.tintucService.getTintuc('tintuc').subscribe(data => {
      if (data.success) {

        this.loading = false;
        this.tintucs = data.tintucs;

        setTimeout(() => {
          this.firstTintuc = data.tintucs[0];
          if (this.firstTintuc) {
            this.renderTintuc(this.firstTintuc);
          }
          
        }, 300)
      } else {
        this.loading = false;
        this.flashMsg.show('Lỗi xảy ra!', { cssClass: 'flashCssDanger', timeout: 3000 })
        return false;
      }

    })
  }

  ngOnDestroy() {
    if (this.getTintucSubscription) {
      this.getTintucSubscription.unsubscribe();
    }
    if (this.deleteTintucSubscription) { this.deleteTintucSubscription.unsubscribe(); }
  }
  renderTintuc(tintuc) {
    if (tintuc) {
      let content = document.getElementById('content');
      content.innerHTML = tintuc.body;
      let pElements = document.querySelectorAll("#content p") as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < pElements.length; i++) {
        pElements[i].style.lineHeight = '1.5';
        pElements[i].style.textAlign = 'justify';
      }
    }

  }
  selectedTintuc(tintuc) {
    this.firstTintuc = tintuc;
    this.renderTintuc(tintuc);
    document.body.scrollTop = document.documentElement.scrollTop = 200;
    // this.scrollToTop(400);
  }

  // scrollToTop(scrollDuration) {
  //   const   scrollHeight = window.scrollY,
  //           scrollStep = Math.PI / ( scrollDuration / 15 ),
  //           cosParameter = scrollHeight / 2;
  //   var     scrollCount = 0,
  //           scrollMargin,
  //           scrollInterval = setInterval( function() {
  //               if ( window.scrollY != 0 ) {
  //                   scrollCount = scrollCount + 1;  
  //                   scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
  //                   window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
  //               } 
  //               else clearInterval(scrollInterval); 
  //           }, 15 );
  //   }

  deleteTintuc() {
    let agree = confirm('Bạn chắc là muốn delete?');
    if (!agree) return false;
    let id = this.firstTintuc['_id'];
    let removeIndex = 0;
    let tintuc = _.find(this.tintucs, (tintuc, index) => {
      removeIndex = index;
      return id === tintuc._id
    });

    this.tintucs = this.tintucs.filter(tintuc => {
      return tintuc._id !== id;
    });


    if (this.tintucs.length) {
      this.firstTintuc = this.tintucs[0];
      this.renderTintuc(this.firstTintuc);
    }
    this.deleteTintucSubscription = this.tintucService.deleteTintuc(id).subscribe(data => {
      if (data.success) {
        this.flashMsg.show('Đã xoá thành công!', { cssClass: 'flashCssSuccess', timeout: 3000 })
      } else {
        this.flashMsg.show('Lỗi xảy ra!', { cssClass: 'flashCssDanger', timeout: 3000 })
        return false
      }
    }, (err: Response) => {
      this.flashMsg.show('Lỗi xảy ra!', { cssClass: 'flashCssDanger', timeout: 3000 })
      this.tintucs = this.tintucs.splice(removeIndex, 0, tintuc);
      this.firstTintuc = this.tintucs[0];
      this.renderTintuc(this.firstTintuc);
      return false
    })
  }

}
