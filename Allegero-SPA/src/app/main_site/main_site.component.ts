import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from '../_services/user.service';
import { Item } from '../_models/Item';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/_alertify.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main_site.component.html',
  styleUrls: ['./main_site.component.css']
})
export class MainSiteComponent implements OnInit {

  model: any = {};

  // aukcje
  auctions5: Item[];
  auctions3: Item[];
  auctionsToSlider2: Item[];
  defaultAuction: Item;

  // do okazji
  occasion: Item;
  percent: string;
  timer: Date;
  curDate = new Date();

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
  hoursLeft = 2;
  currDayInMins: number; // trza to bylo to, ogolnie lipa ale nie chce mi sie juz tlumaczyc

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              public authService: AuthService,
              private alertify: AlertifyService) { }

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

    // 3 auctions
    this.route.data.subscribe(data => {
      this.auctions5 = data.manyAuctions;
    });

    this.auctions3 = this.auctions5.slice(0, 3);
    this.auctionsToSlider2 = this.auctions5.slice(0, 5);

    // okazja
    this.route.data.subscribe(data => {
      this.occasion = data.mainData;
      this.percent = (100 - (this.occasion.newestPrice / this.occasion.price) * 100).toFixed(2);
      const occasionEnd = new Date(this.occasion.whenOccasionWasStarted);

      // ustawia dobrze minutnik, ALE dziala tylko jezeli jest max 1 dzien promocja bo nie chcialo mi sie myslec
      if (this.curDate.getDate() - occasionEnd.getDate() < 0){
        const currDayInHours = 23 - this.curDate.getHours();
        const currDayInSec = 60 - this.curDate.getSeconds();
        if (currDayInSec > 0) {
          this.currDayInMins = 59 - this.curDate.getMinutes();
        } else {
          this.currDayInMins = 60 - this.curDate.getMinutes();
        }

        const nextDayInHours = occasionEnd.getHours();
        const nextDayInMins = occasionEnd.getMinutes();
        const nextDayInSec = occasionEnd.getSeconds();

        this.hoursLeft = currDayInHours + nextDayInHours;
        this.minLeft = this.currDayInMins + nextDayInMins;
        this.secondsLeft = currDayInSec + nextDayInSec;
      }

      if (this.curDate.getDate() - occasionEnd.getDate() === 0){
        this.hoursLeft = this.curDate.getHours();
        this.minLeft = this.curDate.getMinutes();
        this.secondsLeft = this.curDate.getSeconds();
      }

      // tego przypadku juz nie chcialo mnie sie liczyc XD
      if (this.curDate.getDate() - occasionEnd.getDate() > 0){
        this.hoursLeft = 10;
        this.minLeft = 10;
        this.secondsLeft = 30;
        // this.pauseTimer();
      }
    });

    if (this.secondsLeft >= 60) {
      this.secondsLeft -= 60;
      this.minLeft += 1;
      if (this.minLeft >= 60) {
        this.minLeft -= 60;
        this.hoursLeft += 1;
      }
    }
  }

    // do minitnika
    startTimer() {
      this.interval = setInterval(() => {
        if (this.hoursLeft >= 0 && this.minLeft >= 0 && this.secondsLeft >= 0){
          if (this.minLeft >= 60) {
            this.minLeft -= 60;
            this.hoursLeft += 1;
          }
          if (this.hoursLeft > 0 && this.minLeft === 0){
            this.minLeft = 59; // 59 bo petla robi sie gdy jest 0 i traci sie 1 sekunde
            this.hoursLeft --;
            // if (this.hoursLeft > 0){
            //   this.hoursLeft --;
            // }
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

  // zaladowanie okazji
  loadOccasion() {
    this.userService.getOccasion()
      .subscribe(response => {
          this.occasion = response;
          console.log('okazja:' + this.occasion);
        });
  }

  // tworzy domyslna aukcje do edycji
  makeDefaultAuction() {
    this.userService.makeDefaultAuction(this.authService.decodedToken.nameid, 'make')
      .subscribe(response => {
        this.alertify.success('Poprawnie edutujesz aukcje');
      }, error => {
        this.alertify.error('Dokoncz poprzednia edycje !');
      });
  }
}
