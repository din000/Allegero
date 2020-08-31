import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../_models/Item';
import { User } from '../_models/User';

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

  przykladowaOcena = 4;
  currentRate = 4.4;

  // konkretna aukcja i uzytkownik
  auction: Item;
  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.auction = data.auction;
      console.log(this.auction);
      this.user = data.user;
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
  }

  // pobiera zdjecia
  getImages(){
    const images = [];
    console.log('dziala');
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
}
