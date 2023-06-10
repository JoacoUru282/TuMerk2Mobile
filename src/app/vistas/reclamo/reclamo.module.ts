import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclamoPageRoutingModule } from './reclamo-routing.module';

import { ReclamoPage } from './reclamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclamoPageRoutingModule
  ],
  declarations: [ReclamoPage]
})
export class ReclamoPageModule {}
