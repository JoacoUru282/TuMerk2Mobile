import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCarritoPage } from './ver-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: VerCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCarritoPageRoutingModule {}
