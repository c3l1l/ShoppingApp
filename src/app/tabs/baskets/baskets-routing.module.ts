import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketsPage } from './baskets.page';

const routes: Routes = [
  {
    path: '',
    component: BasketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketsPageRoutingModule {}
