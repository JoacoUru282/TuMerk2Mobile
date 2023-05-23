import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalListPage } from './local-list.page';

const routes: Routes = [
  {
    path: '',
    component: LocalListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalListPageRoutingModule {}
