import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspeccionarProductoPage } from './inspeccionar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: InspeccionarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspeccionarProductoPageRoutingModule {}
