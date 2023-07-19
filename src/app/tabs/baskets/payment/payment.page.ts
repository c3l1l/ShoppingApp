import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController, ViewDidEnter } from '@ionic/angular';
import { BasketModel } from '../models/basket-model';
import { BasketService } from '../services/basket.service';
import { ErrorService } from '../../services/error.service';
import { PaymentModel } from './models/payment-model';
import { PaymentService } from './services/payment.service';
import { SendPaymentModel } from './models/send-payment-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements ViewDidEnter {

  baskets:BasketModel[]=[];
  paymentModel:PaymentModel={
    cartNumber:'',
    cartOwner:'',
    cvv:'',
    date:Date(),
    id:0,
    expirationDate:''

  }
  sendPaymentModel:SendPaymentModel;
  total=0;
  constructor(    private basketService:BasketService,private errorService:ErrorService,private paymentService:PaymentService ,private toastController:ToastController,private router:Router  ) {  }
  ionViewDidEnter(): void {
    this.getBasketList();
  }

  getBasketList() {
    this.basketService.getList().subscribe((res: any) => {
      console.log(res.data);
      this.total = 0;
      this.baskets=res.data;
      res.data.forEach((e: { quantity: number; product: { price: number; }; }) => {
        this.total = this.total + e.quantity * e.product.price;
      });
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }

  payment(paymentModel:PaymentModel){
    console.log(paymentModel);
    this.sendPaymentModel=new SendPaymentModel();
    this.sendPaymentModel.payment=paymentModel;
    this.sendPaymentModel.baskets=this.baskets;
    this.paymentService.sendPayment(this.sendPaymentModel).subscribe((res:any)=>{
       this.presentToast(res.message);
       this.router.navigate(['/tabs/baskets']);
    },(err)=>{
      this.errorService.errorHandler(err);
    })

  }
  async presentToast(_message:string) {
    const toast = await this.toastController.create({
      message: _message,
      duration: 1000,
      position:'top'
    });
    toast.present();
  }
}
