import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerReclamoPage } from './ver-reclamo.page';

const routes: Routes = [
  {
    path: '',
    component: VerReclamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerReclamoPageRoutingModule {}
