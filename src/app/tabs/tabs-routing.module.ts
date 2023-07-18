import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      }
    ]
  },
  {
    path: 'baskets',
    loadChildren: () => import('./baskets/baskets.module').then( m => m.BasketsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
