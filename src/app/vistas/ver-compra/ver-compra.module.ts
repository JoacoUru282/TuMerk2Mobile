import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCompraPageRoutingModule } from './ver-compra-routing.module';

import { VerCompraPage } from './ver-compra.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VerCompraPageRoutingModule
  ],
  declarations: [VerCompraPage]
})
export class VerCompraPageModule {}
