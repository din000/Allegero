import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-responsik2',
  templateUrl: './responsik2.component.html',
  styleUrls: ['./responsik2.component.css']
})
export class Responsik2Component implements OnInit {

  // slider 1

  // https://www.npmjs.com/package/ngx-owl-carousel-o
  // https://www.npmjs.com/package/ngx-owl-carousel-o
  // https://www.npmjs.com/package/ngx-owl-carousel-o
  // https://www.npmjs.com/package/ngx-owl-carousel-o


  images = ['../../assets/laptop1.jpg',
            '../../assets/laptop2.jpg',
            '../../assets/laptop3.jpg',
            '../../assets/laptop1.jpg',
            '../../assets/laptop2.jpg',
            '../../assets/laptop3.jpg'];

            itemsPerSlide = 1;
            singleSlideOffset = true;
            noWrap = false;
            slidesChangeMessage = '';

              customOptions: OwlOptions = {
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                pullDrag: true,
                dots: false,
                navSpeed: 700,
                navText: ['', ''],
                responsive: {
                  0: {
                    items: 1
                  },
                  400: {
                    items: 2
                  },
                  740: {
                    items: 3
                  },
                  940: {
                    items: 4
                  }
                },
                nav: false
              };

  constructor() {
    setTheme('bs3'); // or 'bs4'
   }

  ngOnInit() {
  }

}
