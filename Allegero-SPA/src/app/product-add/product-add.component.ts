import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// https://valor-software.com/ng2-file-upload/
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/_alertify.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories = [{value: 'laptops', display: 'Laptopy'},
                {value: 'pc', display: 'PC'}];

  dedicedCard = [{value: 'Yes', display: 'Tak'},
                {value: 'No', display: 'Nie'}];

  ram = [{value: '1', display: '1 GB'},
        {value: '2', display: '2 GB'},
        {value: '4', display: '4 GB'},
        {value: '8', display: '8 GB'},
        {value: '12', display: '12 GB'},
        {value: '16', display: '16 GB'},
        {value: '32', display: '32 GB'}];

  condition = null;
  basicInfo: FormGroup;

  // https://github.com/kolkov/ngx-gallery
  // https://github.com/kolkov/ngx-gallery
  // https://github.com/kolkov/ngx-gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // uploader
  uploader: FileUploader;
  hasBaseDropZoneOver: true;
  hasAnotherDropZoneOver: true;
  response: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  // ng g component product-add --style=css
  // ng g component product-add --style=css

  ngOnInit(): void {
    this.createBasicInfo();

    this.galleryOptions = [
      {
          width: '90%',
          height: '500px',
          thumbnailsColumns: 6,
          imageAnimation: NgxGalleryAnimation.Slide,
          previewCloseOnClick: true,
          previewCloseOnEsc: true,
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];

    // this.galleryImages = this.getImages();

    // uploader
    this.initializeUploader();
  }

  setNew(){
    this.condition = 'New';
  }
  setUsed(){
    this.condition = 'Used';
  }
  setBroken(){
    this.condition = 'Broken';
  }

  createBasicInfo(){
    this.basicInfo = this.formBuilder.group({
      isOccasion: ['No'],
    });
  }

  // usuniecie defaulcikowej aukcji
  deleteDefaultAuction() {
    this.userService.makeDefaultAuction(this.authService.decodedToken.nameid, 'delete')
      .subscribe(next => {
        this.alertify.success('Usunales defaultowa aukcje');
      }, error => {
        this.alertify.error('Nie ma czego usuwac :)');
      });
  }

  // do uploadera
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  initializeUploader() {
      this.uploader = new FileUploader({
        // tslint:disable-next-line: max-line-length
        url: 'http://localhost:5000/api/user/photos/' + this.authService.decodedToken.nameid, // url
        authToken: 'Bearer ' + localStorage.getItem('token'), // 'Bearer ' WAZNE musi byc spacja
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      });

      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }; // ta linijkia powoduje ze zdj wgl sie wysyla
  }
}
