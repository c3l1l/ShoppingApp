import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ProductModel } from './models/product-model';
import { ErrorService } from '../services/error.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products:ProductModel[]=[];
  quantity:number=1;
  constructor(private productService:ProductService,private errService:ErrorService,private toastController:ToastController) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.productService.getList().subscribe((res:any)=>{
 this.products=res.data;
    },(err)=>{
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
    });
    toast.present();
  }
}
