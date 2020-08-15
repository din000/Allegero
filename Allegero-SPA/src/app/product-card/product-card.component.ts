import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

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

  constructor() { }

  ngOnInit(): void {
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

    this.galleryImages = [
      {
          small: '../../assets/laptop1.jpg',
          medium: '../../assets/laptop1.jpg',
          big: '../../assets/laptop1.jpg'
      },
      {
          small: '../../assets/laptop2.jpg',
          medium: '../../assets/laptop2.jpg',
          big: '../../assets/laptop2.jpg'
      },
      {
          small: '../../assets/laptop3.jpg',
          medium: '../../assets/laptop3.jpg',
          big: '../../assets/laptop3.jpg'
      }
    ];
  }

}
