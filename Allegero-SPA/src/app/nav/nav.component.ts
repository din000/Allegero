import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  modalRef: BsModalRef; // do loginu i rejestracji

  images = ['../../assets/laptop1.jpg',
            '../../assets/laptop2.jpg',
            '../../assets/laptop3.jpg',
            '../../assets/laptop1.jpg',
            '../../assets/laptop2.jpg',
            '../../assets/laptop3.jpg'];

  // do loginu i rejestracji
  constructor(private modalService: BsModalService) { }

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
        1: {
          items: 2
        },
        2: {
          items: 3
        },
        3: {
          items: 4
        },
      },
      nav: false
    };


  ngOnInit() {
  }

  // do loginu i rejestracji
  openModalLogin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // do loginu i rejestracji
  openModalRegister(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
  }
}
