import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ProductModel } from './models/product-model';
import { ErrorService } from '../services/error.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { BasketService } from '../baskets/services/basket.service';
import { BasketModel } from '../baskets/models/basket-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products:ProductModel[]=[];
  quantity:number=1;
  loading:any;
  constructor(private productService:ProductService,private errService:ErrorService,private toastController:ToastController,private basketService:BasketService,private loadingController:LoadingController) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.presentLoading();
    this.productService.getList().subscribe((res:any)=>{
      this.dismissLoading();
 this.products=res.data;
    },(err)=>{
      this.dismissLoading();
      this.errService.errorHandler(err);
    });
  }
  addQuantity(product:ProductModel){
    const quantity=document.getElementById("name-"+product.id).innerHTML;

    if(+quantity +1 > product.inventoryQuantity){
      this.presentToast("Adet stok adedinden fazla olamaz");
      return;
    }
    document.getElementById("name-"+product.id).innerHTML=(+quantity+1).toString();
  }
  outQuantity(product:ProductModel){
    const quantity=document.getElementById("name-"+product.id).innerHTML;

    if(+quantity -1 < 1){
      this.presentToast("Adet en az 1 olmalidir!");
      return;
    }
    document.getElementById("name-"+product.id).innerHTML=(+quantity-1).toString();

  }
  async presentToast(_message:string) {
    const toast = await this.toastController.create({
      message: _message,
      duration: 2000,
      position:'top'
    });
    toast.present();
  }

  addBasket(product:ProductModel){
    this.presentLoading();
    const quantity=document.getElementById("name-"+product.id).innerHTML;
    const basketModel:BasketModel=new BasketModel();
    basketModel.id=0;
    basketModel.productId=product.id;
    basketModel.product=product;
    basketModel.quantity=+quantity;

    this.basketService.addBasket(basketModel).subscribe((res)=>{
      this.dismissLoading();
      this.presentToast("Urun sepete basariyla eklendi !");
      this.getList();
    },(err)=>{
      this.dismissLoading();
      this.errService.errorHandler(err);
    })
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Lutfen bekleyin...'

    });
    await this.loading.present();

  }
   dismissLoading(){
    this.loading.dismiss();
  }

}
