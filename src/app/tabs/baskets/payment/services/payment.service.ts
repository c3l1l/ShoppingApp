import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SendPaymentModel } from '../models/send-payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient,@Inject('apiUrl') private apiUrl:string) { }
  sendPayment(sendPaymentModel:SendPaymentModel){
    let api=this.apiUrl+"Orders/addPayment";
    return this.httpClient.post(api,sendPaymentModel);
  }
}
