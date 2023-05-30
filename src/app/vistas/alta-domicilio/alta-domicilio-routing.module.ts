import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaDomicilioPage } from './alta-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: AltaDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaDomicilioPageRoutingModule {}
