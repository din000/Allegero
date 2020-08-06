import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Subject, Observable, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit{

  modalRef: BsModalRef; // do loginu i rejestracji

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


  // do loginu i rejestracji private modalService: BsModalService
  constructor(private modalService: BsModalService) {}

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

  // do loginu i rejestracji
  openModalLogin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // do loginu i rejestracji
  openModalRegister(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
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
