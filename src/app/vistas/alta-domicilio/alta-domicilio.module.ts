import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaDomicilioPageRoutingModule } from './alta-domicilio-routing.module';

import { AltaDomicilioPage } from './alta-domicilio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaDomicilioPageRoutingModule
  ],
  declarations: [AltaDomicilioPage]
})
export class AltaDomicilioPageModule {}
