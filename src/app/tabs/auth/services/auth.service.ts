import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,@Inject('apiUrl') private apiUrl:string) { }

  login(authModel:AuthModel){
    let api=this.apiUrl+"users/login";
    return this.httpClient.post(api,authModel);
    }
    isAuthenticated():boolean{
        if(localStorage.getItem('token')){
       return true;
        }
        return false;
    }
}
