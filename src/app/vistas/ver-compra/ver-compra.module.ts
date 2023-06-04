import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCompraPageRoutingModule } from './ver-compra-routing.module';

import { VerCompraPage } from './ver-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCompraPageRoutingModule
  ],
  declarations: [VerCompraPage]
})
export class VerCompraPageModule {}
