import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCompraPage } from './ver-compra.page';

const routes: Routes = [
  {
    path: '',
    component: VerCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCompraPageRoutingModule {}
