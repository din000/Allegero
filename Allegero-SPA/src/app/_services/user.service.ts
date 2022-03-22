import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from '../_models/Item';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';
import { Item2 } from '../_models/item2';
import { Product_Categories } from '../_models/Product_Categories';

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

  getAuction(id: number){
    return this.http.get<Item>(this.baseUrl + 'auction/' + id);
  }

  getUser(id: number){
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  makeDefaultAuction(userId: number, makeOrDelete?){
    let param = new HttpParams();

    if (makeOrDelete != null){
      param = param.append('makeOrDelete', makeOrDelete);
    }

    return this.http.get<Item>(this.baseUrl + 'default/' + userId, {params: param});
  }

  deletePhoto(userId: number, photoId: number){
    return this.http.delete(this.baseUrl + 'photos/' + userId + '/' + photoId);
  }

  setMainPhoto(userId: number, auctionId: number, photoId: number){
    return this.http.post(this.baseUrl + 'photos/' + userId + '/' + auctionId + '/' + photoId + '/setMain', {});
  }

  setAuctionSecondId(userId: number, auctionId: number, secondId: number){
    return this.http.post(this.baseUrl + 'photos/' + userId + '/' + auctionId + '/secondId/' + secondId, {});
  }

  takeEditingAuction(userId: number){
    return this.http.get<Item>(this.baseUrl + 'editingAuction/' + userId);
  }

  addItem(userId: number, item: Item){
    return this.http.post(this.baseUrl + userId, item);
  }

  addPhoto(userId: number, secondId: number, selectedPhoto: File){
    return this.http.post('http://localhost:5000/api/user/photos/' + userId + '/' + secondId, selectedPhoto); 
  }

  getProduct_Categories(){
    return this.http.get<Product_Categories[]>(this.baseUrl + 'product_categories')
  }
}
