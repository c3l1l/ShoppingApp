import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketService } from './baskets/services/basket.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit,AfterContentChecked {
isAuthenticated=false;
  total:number=0;
  constructor(private basketService:BasketService,private authService:AuthService) { }
  ngAfterContentChecked(): void {
    this.isAuthenticated=this.authService.isAuthenticated();
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
logout(){
  localStorage.clear();
}
}
