import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  basicPhoto = new BehaviorSubject<string>('../../assets/user.png');
  currentPhoto = this.basicPhoto.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const data = response;
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.decodedToken = this.jwtHelper.decodeToken(data.token);
          this.currentUser = this.jwtHelper.decodeToken(data.user);
          this.changeMainPhoto(this.currentUser.publicPhotoID);
        }
      }));
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedin() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // aktualizuje zdj bez koniecznosci odsw.
  changeMainPhoto(photoUrl: string) {
    this.basicPhoto.next(photoUrl);
  }

}
