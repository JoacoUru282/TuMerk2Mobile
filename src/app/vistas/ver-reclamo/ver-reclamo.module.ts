import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerReclamoPageRoutingModule } from './ver-reclamo-routing.module';

import { VerReclamoPage } from './ver-reclamo.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VerReclamoPageRoutingModule
  ],
  declarations: [VerReclamoPage]
})
export class VerReclamoPageModule {}
