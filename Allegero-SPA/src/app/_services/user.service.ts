import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../_models/Item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) { }

  getOccasion(){
    return this.http.get<Item>(this.baseUrl + 'occasion');
  }

  getManyAuctions(num: number){
    return this.http.get<Item[]>(this.baseUrl + 'many/' + num);
  }

}
