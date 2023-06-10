import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarReclamosPageRoutingModule } from './listar-reclamos-routing.module';

import { ListarReclamosPage } from './listar-reclamos.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListarReclamosPageRoutingModule
  ],
  declarations: [ListarReclamosPage]
})
export class ListarReclamosPageModule {}
