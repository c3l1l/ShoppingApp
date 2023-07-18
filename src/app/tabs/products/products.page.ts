import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ProductModel } from './models/product-model';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products:ProductModel[]=[];
  quantity:number=1;
  constructor(private productService:ProductService,private errService:ErrorService) { }

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
  addQuantity(){
    this.quantity++;
  }
  outQuantity(){
    this.quantity--;
  }
}
