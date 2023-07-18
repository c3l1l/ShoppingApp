import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(@Inject('apiUrl') private apiUrl:string,private httpClient:HttpClient) { }
  getList(){
    let api=this.apiUrl+"products/getlist";
    return this.httpClient.get(api);
  }
}
