import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionarProductoPageRoutingModule } from './inspeccionar-producto-routing.module';

import { InspeccionarProductoPage } from './inspeccionar-producto.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionarProductoPageRoutingModule
  ],
  declarations: [InspeccionarProductoPage]
})
export class InspeccionarProductoPageModule {}
