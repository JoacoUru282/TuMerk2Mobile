import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclamoPage } from './reclamo.page';

const routes: Routes = [
  {
    path: '',
    component: ReclamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamoPageRoutingModule {}
