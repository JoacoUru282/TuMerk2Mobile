import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AltaReclamoPageRoutingModule } from './alta-reclamo-routing.module';
import { AltaReclamoPage } from './alta-reclamo.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AltaReclamoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AltaReclamoPage]
})
export class AltaReclamoPageModule {}
