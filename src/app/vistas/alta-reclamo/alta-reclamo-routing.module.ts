import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaReclamoPage } from './alta-reclamo.page';

const routes: Routes = [
  {
    path: '',
    component: AltaReclamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaReclamoPageRoutingModule {}
