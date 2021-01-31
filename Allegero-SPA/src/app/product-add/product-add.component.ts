import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// https://valor-software.com/ng2-file-upload/
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/_alertify.service';
import { Photo } from '../_models/Photo';
import { Item } from '../_models/Item';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { timer } from 'rxjs';
import { MainResolver } from '../_resolvers/main.resolver';

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

  numberOfDesc = 0;
  partsOfDesc = [];
  // infoAboutParts: any = {};
  parciki = [1, 1, 1, 1, 1];
  liczbaParcikow = 0;

  // https://www.npmjs.com/package/@kolkov/angular-editor
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '350px',
      maxHeight: '350px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://localhost:5000/api/user/photos/' + this.authService.decodedToken.nameid, // url
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  // formularz produktu
  productForm: FormGroup;

  condition = null;
  photos = [];

  // https://github.com/kolkov/ngx-gallery
  // https://github.com/kolkov/ngx-gallery
  // https://github.com/kolkov/ngx-gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images = [944, 1011, 984, 999, 1000].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // uploader
  uploader: FileUploader;
  hasBaseDropZoneOver: true;
  hasAnotherDropZoneOver: true;
  response: string;

  // edytowana aukcja
  editingAuction: Item;

  // aukcja do wyslania do API
  item: Item;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  // ng g component product-add --style=css
  // ng g component product-add --style=css


  ngOnInit(): void {
    
    // laduje edytowana aukcje
    this.loadEditingAuction();
  
    // uploader
    this.initializeUploader();
    // tworzy formularz do dodawania produktu
    this.createProductForm();

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

    /// this.galleryImages = this.getImages();
    //   // ladujemy zdjecia
    // this.photos = this.getImages();
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      numberOfDescParts: this.numberOfDesc,
      // part1: [1],
      // part2: [1],
      // part3: [1],
      // part4: [1],
      // part5: [1],
      // p1_Desc: [''],
      // p2_Desc: [''],
      // p3_Desc: [''],
      // p4_Desc: [''],
      // p5_Desc: [''],
      isOccasion: ['No'],
      name: [''],
      price: [null],
      quantity: [null],
      condition: this.condition,
      newestPrice: [null],
      category: this.categories,
      // szczegoly kategorii laptopow:
      haveDedictedCard: this.dedicedCard,
      graphicCard: [''],
      ram: this.ram,
    });
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

  // usuniecie defaulcikowej aukcji
  deleteEditinfAuction() {
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

  getImages(){
    const images = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.editingAuction.itemPhotos.length; i++) {
      // ogolnie tutaj nie trzeba dawac small medium big bo nie dajemy tego do ngxGalery tylko do zwyklej tablicy zdjec photos[]
      // dodatkowo jezeli tego uzyjemy w ngInit to przez to ze jest to metoda asynchroniczna to komputer nie zdazy zaladowac edytowanej aukcji wiec lepiej to przenisc do lodadEditingAuction()
      images.push({
        small: this.editingAuction.itemPhotos[i].url,
        medium: this.editingAuction.itemPhotos[i].url,
        big: this.editingAuction.itemPhotos[i].url,
      });
    }
    return images;
  }

  initializeUploader() {
      this.uploader = new FileUploader({
        // tslint:disable-next-line: max-line-length
        url: 'http://localhost:5000/api/user/photos/' + this.authService.decodedToken.nameid, // url
        authToken: 'Bearer ' + localStorage.getItem('token'), // 'Bearer ' WAZNE musi byc spacja
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: true,
        maxFileSize: 10 * 1024 * 1024
      });

      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }; // ta linijkia powoduje ze zdj wgl sie wysyla

      this.uploader.onSuccessItem = (item, respons, status, headers) => {
        if (respons) {
          const response: Photo = JSON.parse(respons); // parsujemy na response ktore jest klasy Photo
          const photo = {
            id: response.id,
            url: response.url,
            isMain: response.isMain,
            // publicId: response.publicId,
            // item: response.item,
            // itemId: response.itemId,
            secondId: response.secondId
          };
          console.log(photo);
          if (photo.secondId === 12){
            this.photos.push(photo); // dodajemy do naszej kolekcji zdjec
          }
          this.alertify.success('Dodales zdj');
          // this.galleryImages = this.getImages();

          // const photos = [];
          // if (photos.length === 0){
          //   photos.push(photo); // dodajemy do naszej kolekcji zdjec
          // }

          // if (photo.isMain) {
          // this.authService.changeUserPhoto(photo.url);
          // this.authService.currentUser.photoUrl = photo.url; // aktualizujemy dla aktualnego uzytkownika glowne zdj
          // localStorage.setItem('user', JSON.stringify(this.authService.currentUser)); // a teraz aktualizujemy go w local storage
          // }
        }
      };
  }

  setPhotoSecondId(secondId: number){
    timer(1500).subscribe(x =>
      this.userService.setAuctionSecondId(this.authService.decodedToken.nameid, this.editingAuction.id, secondId)
        .subscribe(response => {
            this.alertify.success('Zmieniono secondId pomyslnie');
            }, error => {
            this.alertify.error(error);
            }));
  }

  deletePhoto(photoId: number){
    this.alertify.confirm('Czy na pewno usunac zdj?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, photoId)
      .subscribe(() => {
        this.photos.splice(this.photos.findIndex(i => i.id === photoId), 1);
        this.alertify.success('Zdj usuniete');
      }, error => {
        this.alertify.error('Nie udalo sie usunac zdj');
      });
    });
  }

  setMainPhoto(photoId: number){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, this.editingAuction.id, photoId)
      .subscribe(response => {
        this.alertify.success('Zmieniles zdj glowne');
      }, error => {
        this.alertify.error(error);
      });
  }

  numberOdDescPlus(){
    if (this.numberOfDesc == null){
      this.numberOfDesc = 0;
    }
    this.numberOfDesc += 1;
    this.liczbaParcikow += 1;
    this.partsOfDesc.push(this.numberOfDesc.toString());
    this.parciki[this.numberOfDesc - 1] = 1;
  }

  tescik(){
    console.log(this.parciki);
  }

  // to tak naprawde ustawia 1 z 3 opcji w parciku
  dodanieParcika(partNumber: string, value: number){
    const idd = Number(partNumber);
    this.parciki[idd - 1] = value;
    this.check(partNumber);
  }

  check(partNumber: string){
    const idd = Number(partNumber);
    console.log('0');
    return this.parciki[idd];
  }

  loadEditingAuction(){
    this.userService.takeEditingAuction(this.authService.decodedToken.nameid)
      .subscribe(response => {
        this.editingAuction = response;
        for (let i = 0; i < this.editingAuction.itemPhotos.length; i++) {
          // ogolnie tutaj nie trzeba dawac small medium big bo nie dajemy tego do ngxGalery tylko do zwyklej tablicy zdjec photos[]
          this.photos.push({
            small: this.editingAuction.itemPhotos[i].url,
            medium: this.editingAuction.itemPhotos[i].url,
            big: this.editingAuction.itemPhotos[i].url,
          });       
        }
      });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  addItem(){
    this.item = Object.assign({}, this.productForm.value);
    console.log(this.condition.value);
    console.log(this.condition);
    // this.item.condition = this.condition;
    // this.item.name = 'asdasdasdasdasd';
    // this.item.condition = 'asd';
    this.userService.addItem(this.authService.decodedToken.nameid, this.item).subscribe(() => {
      this.alertify.success('Dodales item');
    }, error => {
      this.alertify.error('Nie dodales itemku');
    });
  }

  showUser(){
    // console.log(this.authService.decodedToken.nameid);
    // console.log(this.condition);
    // console.log(this.item);
    // console.log(this.productForm.value);
    console.log(this.photos);
    console.log(this.editingAuction.itemPhotos);
  }

  tescikoweLadowanieZdj(){
    this.galleryImages = this.getImages();
  }
}
