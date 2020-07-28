import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-responsik',
  templateUrl: './responsik.component.html',
  styleUrls: ['./responsik.component.css']
})
export class ResponsikComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // https://www.npmjs.com/package/aos
    // 1 - instalujemy za pomoca npm
    // 2 - dodajemy script i style do angular.json
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }

}
