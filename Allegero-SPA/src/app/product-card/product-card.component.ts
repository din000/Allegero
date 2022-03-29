import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../_models/Item';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // https://github.com/kolkov/ngx-gallery
  // https://github.com/kolkov/ngx-gallery
  // https://github.com/kolkov/ngx-gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  photosOfDesc = []; // zdjecia do opisu

  // info o aukcji
  przykladowaOcena = 4;
  currentRate = 4.4;
  quantity = 1;

  // konkretna aukcja i uzytkownik
  auction: Item;
  user: User;
  numberOfDescParts: any; // liczba parcikow do wyswietlania

  // procent obnizki
  percent: string;

  // dostawa
  deliveryDate1 = new Date();
  deliveryDate2 = new Date();

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.auction = data.auction;
      this.photosOfDesc = this.getImagesOfDesc();
      this.numberOfDescParts = new Array(this.auction.numberOfDescParts); // liczba parcikow opisu
      this.percent = (100 - (this.auction.newestPrice / this.auction.price) * 100).toFixed(2);
      this.user = data.user;
      console.log(this.auction);
    });

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
    this.galleryImages = this.getImages();

    this.deliveryDate1.setDate(3);
    this.deliveryDate2.setDate(6);
  }

  // pobiera zdjecia
  getImages(){
    const images = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.auction.itemPhotos.length; i++) {
      images.push({
        small: this.auction.itemPhotos[i].url,
        medium: this.auction.itemPhotos[i].url,
        big: this.auction.itemPhotos[i].url,
      });
    }
    return images;
  }

  getImagesOfDesc(){
    const images = [];
    for (let i = 0; i < this.auction.itemPhotos.length; i++) {
      if (this.auction.itemPhotos[i].secondId != 12){
        images.push({
          photoId: this.auction.itemPhotos[i].id,
          url: this.auction.itemPhotos[i].url,
          secondId: this.auction.itemPhotos[i].secondId,
        });
      }   
    }
    return images;
  }

  quantityMINUS(){
    if (this.quantity > 1){
      this.quantity --;
    }
  }

  quantityPLUS(){
    if (this.quantity < this.auction.quantity){
      this.quantity ++;
    }
  }
}
