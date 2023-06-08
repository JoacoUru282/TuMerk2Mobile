import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaDomicilioPageRoutingModule } from './alta-domicilio-routing.module';

import { AltaDomicilioPage } from './alta-domicilio.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltaDomicilioPageRoutingModule
  ],
  declarations: [AltaDomicilioPage]
})
export class AltaDomicilioPageModule {}
