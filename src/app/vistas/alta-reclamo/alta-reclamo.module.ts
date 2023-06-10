import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaReclamoPageRoutingModule } from './alta-reclamo-routing.module';

import { AltaReclamoPage } from './alta-reclamo.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AltaReclamoPageRoutingModule
  ],
  declarations: [AltaReclamoPage]
})
export class AltaReclamoPageModule {}
