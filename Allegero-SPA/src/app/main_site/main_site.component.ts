import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-site',
  templateUrl: './main_site.component.html',
  styleUrls: ['./main_site.component.css']
})
export class MainSiteComponent implements OnInit {

  model: any = {};

  images = ['../../assets/laptop1.jpg',
            '../../assets/laptop2.jpg',
            '../../assets/laptop3.jpg',
            '../../assets/laptop1.jpg',
            '../../assets/laptop2.jpg',
            '../../assets/laptop3.jpg'];

  // do minutnika
  interval; // domyslnie jest 6, dziala dobrze XD
  secondsLeft = 60;
  minLeft = 59;
  hoursLeft = 23;

  constructor() { }

      // do slajderow
      customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {items: 1},
          1: {items: 2},
          2: {items: 3},
          3: {items: 4},
        },
        nav: false
      };

  ngOnInit() {
    this.startTimer();
  }

    // do minitnika
    startTimer() {
      this.interval = setInterval(() => {
        if (this.hoursLeft >= 0 && this.minLeft >= 0 && this.secondsLeft >= 0){
          if (this.hoursLeft > 0 && this.minLeft === 0){
            this.minLeft = 59; // 59 bo petla robi sie gdy jest 0 i traci sie 1 sekunde
            if (this.hoursLeft > 0){
              this.hoursLeft --;
            }
          }
          if (this.secondsLeft > 0){
            this.secondsLeft --;
          }
          else if (this.minLeft > 0 && this.secondsLeft === 0){
            this.secondsLeft = 59; // 59 bo petla robi sie gdy jest 0 i traci sie 1 sekunde
            if (this.minLeft > 0){
              this.minLeft --;
            }
          }
        }
      }, 1000);
    }

  // do minutnika
  pauseTimer() {
    clearInterval(this.interval);
  }
}
