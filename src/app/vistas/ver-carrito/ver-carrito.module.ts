import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCarritoPageRoutingModule } from './ver-carrito-routing.module';

import { VerCarritoPage } from './ver-carrito.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VerCarritoPageRoutingModule
  ],
  declarations: [VerCarritoPage]
})
export class VerCarritoPageModule {}
