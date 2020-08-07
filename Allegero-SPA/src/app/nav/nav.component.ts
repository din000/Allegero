import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/_alertify.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit{

  registerForm: FormGroup; // do formularza rejestracji
  user: User;
  model: any = {};

  modalRef: BsModalRef; // do loginu i rejestracji (okienka modalne)

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
  // private formBuilder: FormBuilder do rejestracji
  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              public authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) {}

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
    this.createRegisterForm(); // pozniej pokombinuje jak przeniesc ta cala rejestracje do osobnego komponentu
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

  // register form
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    });
  }

  // register
  register() {
    if (this.registerForm.valid)
    {
      this.user = Object.assign({}, this.registerForm.value); // {} - obiekt // przypisujemy wartosci z formularza do usera

      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Zarejestrowales sie');
      }, error => {
        this.alertify.error('Cos poszlo nie tak z rejestracja');
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/nav']);
        });
      });
    }
  }
  // sprawdza czy jestesmy zalogowani
  loggedIn() {
    return this.authService.loggedin();
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Zostales wylogowany');
    // this.router.navigate(['/nav']);
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Zalogowaleś się do aplikacji');
    }, error => {
      this.alertify.error('cos poszlo nie tak');
    }, () => {
      // this.router.navigate(['/nav']);
    });
  }
}
