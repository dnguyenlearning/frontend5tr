import { IAppState, rootReducer, INITIAL_STATE } from './store/store';
import { PostService } from './services/post.service';
import { AdminGuard } from './guards/admin.guard';
import { LoaisanphamService } from './services/loaisanpham.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { CarouselComponent } from './components/partial/carousel/carousel.component';
import { SlideComponent } from './components/partial/slide/slide.component';
import { ContentComponent } from './components/partial/content/content.component';
import { ProductDetailComponent } from './components/partial/product-detail/product-detail.component';
import { CreateProductComponent } from './components/pages/create-product/create-product.component';
import { SoluganComponent } from './components/layouts/solugan/solugan.component';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SanphamComponent } from './components/pages/sanpham/sanpham.component';
import { LienheComponent } from './components/pages/lienhe/lienhe.component';
import { TintucComponent } from './components/pages/tintuc/tintuc.component';

import {FlexLayoutModule} from '@angular/flex-layout';

//them carousel
import { DragScrollModule } from 'ngx-drag-scroll';


//add animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PendingProductComponent } from './components/pages/admin/pending-product/pending-product.component';
import { AdminProductDetailComponent } from './components/pages/admin/admin-product-detail/admin-product-detail.component';
import { MemberProductDetailComponent } from './components/pages/member-product-detail/member-product-detail.component';
import { RausachComponent } from './components/pages/sanpham/rausach/rausach.component';
import { TraicayComponent } from './components/pages/sanpham/traicay/traicay.component';
import { GiacamComponent } from './components/pages/sanpham/giacam/giacam.component';
import { FormCreateProductComponent } from './components/partial/form-create-product/form-create-product.component';

//xu li form
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './components/partial/login/login.component';



//login

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import {AuthService} from 'angular4-social-login';
import { AuthServiceLogin } from './services/auth.service';

import {HttpModule} from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { SanphamService } from './services/sanpham.service';

import { EachProductComponent } from './components/partial/each-product/each-product.component';
import { ThuysanComponent } from './components/pages/sanpham/thuysan/thuysan.component';
import { FormatsdtPipe } from './common/formatsdt.pipe';
import { GioithieuComponent } from './components/pages/gioithieu/gioithieu.component';
import { KhuvucComponent } from './components/pages/khuvuc/khuvuc.component';
import { AmthucComponent } from './components/pages/amthuc/amthuc.component';




//flashModule
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ManagePostComponent } from './components/pages/admin/manage-post/manage-post.component';
import { CreateTintucComponent } from './components/pages/create-tintuc/create-tintuc.component';


//editor
import { CKEditorModule } from 'ng2-ckeditor';
import { TintucService } from './services/tintuc.service';
import { ThucphamchayComponent } from './components/pages/sanpham/thucphamchay/thucphamchay.component';
import { YourPostsComponent } from './components/pages/your-posts/your-posts.component';



import {NgRedux, NgReduxModule} from 'ng2-redux';
import { ModalKhuvucComponent } from './components/partial/modal-khuvuc/modal-khuvuc.component';
import { NuocgiaikhatComponent } from './components/pages/sanpham/nuocgiaikhat/nuocgiaikhat.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'sanpham', component:SanphamComponent},
  {path:'tintuc', component:TintucComponent},
  {path:'lienhe', component:LienheComponent},
  {path:'gioithieu', component:GioithieuComponent},
  {path:'khuvuc', component:KhuvucComponent},
  {path:'amthuc', component:AmthucComponent},
  {path:'admin/pending-post', component:PendingProductComponent,canActivate:[AdminGuard]},
  {path:'admin/manage-post', component:ManagePostComponent,canActivate:[AdminGuard]},
  {path:'member/your-posts', component:YourPostsComponent,canActivate:[AuthGuard]},
  {path:'admin/create-tintuc', component:CreateTintucComponent,canActivate:[AdminGuard]},
  {path:'admin/create-tintuc/:tintucId', component:CreateTintucComponent,canActivate:[AdminGuard]},
  {path:'admin/chitiet/:id', component:AdminProductDetailComponent,canActivate:[AdminGuard]},
  {path:'sanpham/taosanpham', component:CreateProductComponent , canActivate:[AuthGuard]},
  {path:'sanpham/chitiet/:id', component:MemberProductDetailComponent},
  {path:'sanpham/rausach/:id', component:RausachComponent},
  {path:'sanpham/nuocgiaikhat/:id', component:NuocgiaikhatComponent},
  {path:'sanpham/traicay/:id', component:TraicayComponent},
  {path:'sanpham/giacam/:id', component:GiacamComponent},
  {path:'sanpham/thuysan/:id', component:ThuysanComponent},
  {path:'sanpham/thucphamchay/:id', component:ThucphamchayComponent},
  {path:'**', redirectTo:'/' }
];



let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebook.appId)
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google.clientId)
  }
]);
export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CarouselComponent,
    SlideComponent,
    ContentComponent,
    ProductDetailComponent,
    CreateProductComponent,
    SoluganComponent,
    HomeComponent,
    SanphamComponent,
    TintucComponent,
    LienheComponent,
    PendingProductComponent,
    AdminProductDetailComponent,
    MemberProductDetailComponent,
    RausachComponent,
    TraicayComponent,
    GiacamComponent,
    FormCreateProductComponent,
    LoginComponent,
    EachProductComponent,
    ThuysanComponent,
    FormatsdtPipe,
    GioithieuComponent,
    KhuvucComponent,
    AmthucComponent,
    ManagePostComponent,
    CreateTintucComponent,
    ThucphamchayComponent,
    YourPostsComponent,
    ModalKhuvucComponent,
    NuocgiaikhatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    DragScrollModule,
    BrowserAnimationsModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    NgReduxModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  AuthService,
  LoaisanphamService,
  AuthServiceLogin, AuthGuard, AdminGuard, SanphamService, PostService, TintucService
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux:NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer,INITIAL_STATE);
  }
}
 