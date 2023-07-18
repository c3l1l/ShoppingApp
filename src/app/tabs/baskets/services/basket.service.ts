import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketModel } from '../models/basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(@Inject('apiUrl') private apiUrl:string ,private httpClient:HttpClient) { }

  getList(){
    const api=this.apiUrl+'baskets/getlist';
    return this.httpClient.get(api);
  }
  addBasket(basketModel:BasketModel){
    const api=this.apiUrl+'baskets/add';
    return this.httpClient.post(api,basketModel);
  }

  
}

