import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketService } from './baskets/services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit,AfterContentChecked {

  total:number=0;
  constructor(private basketService:BasketService) { }
  ngAfterContentChecked(): void {
    this.getBasketTotal();
  }


  ngOnInit() {
   // this.getBasketTotal();
  }

  getBasketTotal(){
    this.basketService.getList().subscribe((res:any)=>{
      this.total=0;
      res.data.forEach((e: { quantity: number; product: { price: number; }; }) => {
        this.total=this.total + e.quantity * e.product.price;
      });
    });
  }

}
