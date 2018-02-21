import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LoaiSanPham } from './../../../modals/loaisanpham';
import { LoaisanphamService } from './../../../services/loaisanpham.service';
import { PostService } from './../../../services/post.service';
import { Http, Headers } from '@angular/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'form-create-product',
  templateUrl: './form-create-product.component.html',
  styleUrls: ['./form-create-product.component.scss']
})
export class FormCreateProductComponent implements OnInit, OnDestroy {
  productForm;
  errorUpload: string;
  errorTaoSanpham: string;
  donviValue = ['kg', 'con','chai'];

  allowSubmit:boolean=false;
  //upload
  imgPreview = [];
  filesToUpload: Array<File> = [];
  maximumSize: number = 5242880;
  errSize: boolean = false;
  positionErr: number = 0;
  ngayhethan:number[]=[1,2,3,4,5];
  loaisanphams=[];
  loading:boolean=false;
  btnDisabled:boolean=false;
  titleSelect=['Rau Sạch', 'Trái Cây', 'Gia Súc Gia Cầm',' Thuỷ Sản','Thực Phẩm Chay','Nước Giải Khát'];
  tinhs=['An Giang','Bà Rịa-Vũng Tàu','Bạc Liêu','Bắc Kạn','Bắc Giang','Bắc Ninh','Bến Tre','Bình Dương',
    'Bình Định','Bình Phước','Bình Thuận','Cà Mau','Cao Bằng','Cần Thơ','Đà Nẵng','Đắk Lắk','Đắk Nông',
    'Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Nội','Hà Tây','Hà Tĩnh','Hải Dương',
    'Hải Phòng','Hòa Bình','TP Hồ Chí Minh','Hậu Giang','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lào Cai',
    'Lạng Sơn','Lâm Đồng','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình',
    'Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên',
    'Thanh Hóa','Thừa Thiên - Huế','Tiền Giang','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'
  ]
  loaisanphamSubscription:Subscription;
  taosanphamSubscription:Subscription;
  luuHinhSubscription:Subscription;
  constructor(
    private postService:PostService,
    private loaisanphamService:LoaisanphamService,
    private http:Http,
    private route:Router,
    private flashMsg : FlashMessagesService,
    fb: FormBuilder
  ) {
    this.productForm = fb.group({
      ten: ['', Validators.required],
      gia: ['', Validators.required],
      mota: ['', Validators.required],
      sdt: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.tinhs=this.tinhs.sort();
    this.loaisanphamSubscription=this.loaisanphamService.getTatcaSanpham().subscribe(data=>{
      if(data.success){
        this.loaisanphams=data.loaisanphams;
      }else{
        return false;
      }
    })
  }

  ngOnDestroy(){
    if(this.loaisanphamSubscription){
      this.loaisanphamSubscription.unsubscribe();
    }
    if(this.taosanphamSubscription){
      this.taosanphamSubscription.unsubscribe();
    }
    if(this.luuHinhSubscription){
      this.luuHinhSubscription.unsubscribe();
    }
  }


  createProduct(form, loaisanpham, donvi, xuatxu, khuvuc) {
    if (loaisanpham.value == 'loaisanpham' || donvi.value == 'donvi' || xuatxu.value == 'xuatxu' || khuvuc.value=='khuvuc' ) {
      this.errorTaoSanpham = 'Vui lòng chọn loại sản phẩm, Đơn vị , Khu vực và Ngày hết hạn phù hợp';
      return false;
    }
    this.errorTaoSanpham = null;

    if(this.imgPreview.length==0){
      this.errorUpload='Vui lòng chọn ít nhất 2 tấm hình';
      return false;
    }

    let newProduct = form.value;
    let userId=localStorage.getItem('greenfood_userId');


    if(!userId){return false;}


    newProduct.nguoidang=localStorage.getItem('greenfood_userId');
    newProduct.nameNguoidang=localStorage.getItem('greenfood_username');
    newProduct.loaisanpham = loaisanpham.value;
    newProduct.donvi = donvi.value;
    newProduct.xuatxu = xuatxu.value;
    newProduct.khuvuc=khuvuc.value;
    // newProduct.ngayhethan=ngayhethan.value;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    let fileLength = this.filesToUpload.length;

    for (let i = 0; i < fileLength; i++) {
      for (let j = 0; j < this.imgPreview.length; j++) {
        if (this.filesToUpload[i].name == this.imgPreview[j].name) {
          formData.append('uploads[]', files[i], files[i]['name']);
        }
      }
    }

    this.loading=true;
    this.btnDisabled=true;
    this.luuHinhSubscription=this.postService.createPostAndUpload(formData).subscribe(data=>{
      if(data.success){
        newProduct.link=data.imagesClound;
        newProduct.publicIdClound=data.publicIdClound;
        newProduct.filesName=data.uploadLink;
        this.taosanphamSubscription=this.postService.creatNewPost(newProduct).subscribe(data=>{
          if(data.success){
            this.flashMsg.show('Tạo sản phẩm thành công, Vui Lòng đợi admin xét duyệt!', {cssClass:'flashCssSuccess', timeout:10000})
            this.route.navigate(['/']);
          }else{
            this.loading=false;
            this.btnDisabled=false;
            this.flashMsg.show('Lỗi Đã Xảy ra, Rất Xin Lôi!',{cssClass:'flashCssDanger', timeout:3000})
            return false;
          }
        },(err:Response)=>{
          this.loading=false;
          this.btnDisabled=false;
          this.flashMsg.show('Lỗi Đã Xảy ra, Rất Xin Lôi!',{cssClass:'flashCssDanger', timeout:3000})
          return false;
        })
      }else{
        this.loading=false;
        this.btnDisabled=false;
        this.flashMsg.show(data.msg,{cssClass:'flashCssDanger', timeout:5000})
        return false;
      }
    },(err)=>{
      this.flashMsg.show(err,{cssClass:'flashCssDanger', timeout:5000})
      return false;
    })

   
  }




  fileChangeEvent(e: any) {
    this.filesToUpload = <Array<File>>e.target.files;

    this.errorUpload='';

    this.checkSize(this.filesToUpload);

    this.imgPreview = [];

    if (e.target.files) {

      for (let i = 0; i < this.filesToUpload.length; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          let newImageReview = {
            name: this.filesToUpload[i].name,
            src: event.target.result,
            size: this.filesToUpload[i].size
          }
          this.imgPreview.push(newImageReview);
        }
        reader.readAsDataURL(this.filesToUpload[i]);
      }



    }


  }

  deleteImage(image) {



    this.imgPreview = this.imgPreview.filter((img) => {
      return img.name != image.name;
    })


    // checkSize();
    this.checkSize(this.imgPreview);
  }

  checkSize(restImages) {
    for (let i = 0; i < restImages.length; i++) {
      if (restImages[i].size >= this.maximumSize) {
        this.errSize = true;
        this.positionErr = i;
        break;
      } else {
        this.errSize = false;
        this.positionErr = 0;
      }
    }
  }





  get ten() {
    return this.productForm.get('ten');
  }
  get sdt() {
    return this.productForm.get('sdt');
  }
  get gia() {
    return this.productForm.get('gia');
  }
  get xuatxu() {
    return this.productForm.get('xuatxu');
  }
  get mota() {
    return this.productForm.get('mota');
  }
}
