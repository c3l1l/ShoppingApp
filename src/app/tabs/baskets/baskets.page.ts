import { Component, OnInit } from '@angular/core';
import { BasketService } from './services/basket.service';
import { BasketModel } from './models/basket-model';
import { ErrorService } from '../services/error.service';
import { AlertController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.page.html',
  styleUrls: ['./baskets.page.scss'],
})
export class BasketsPage implements ViewDidEnter {
  total = 0;
  baskets:BasketModel[]=[];
  constructor(private basketService: BasketService,private errorService:ErrorService,private alertController:AlertController) { }
  ionViewDidEnter(): void {
    this.getBasketList();  }



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

  async presentDeleteConfirm(basketModel:BasketModel) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sil?',
      message: `${basketModel.product.name } urununu silmek istiyor musunuz?`,
      buttons: [
        {
          text: 'Vazgec',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sil',
          handler: () => {
            this.basketService.deleteBasket(basketModel).subscribe((res)=>{
              this.getBasketList();
            },(err)=>{
              this.errorService.errorHandler(err);
            })

          },
        },
      ],
    });

    await alert.present();
  }



}
